import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TemplatesV2Service } from '@app/templates/templates-v2.service';
import { CoreFormV2Component } from '@app/core/components/core-form-v2/core-form-v2.component';
import { GroupByPipe } from 'ngx-pipes';

@Component({
	selector: 'app-templates-form',
	templateUrl: 'templates-form-component.html',
	styleUrls: ['templates-form-component.scss']
})
export class TemplatesFormComponent extends CoreFormV2Component
	implements OnInit, OnDestroy {
	constructor(
		service: TemplatesV2Service,
		fb: FormBuilder,
		activatedRoute: ActivatedRoute,
		groupByPipe: GroupByPipe
	) {
		super(service, fb, activatedRoute, groupByPipe);
	}

	ngOnInit(): void {
		super.ngOnInit();
		if (this.isEdit) {
		}
	}

	get lists() {
		return this._lists;
	}

	set lists(value: any) {
		this._lists = value;
	}

	refactorItem(item: any): any {
		super.refactorItem(item);
		if (item.photo) {
			this.previewImage = item.photo;
		}
		return item;
	}

	prepareFormAfterSubmit() {}

	groupItemsByGroup() {
		const tabGroups = this.groupByPipe.transform(
			this.service.featureProps,
			'form.groupBy.tabGroup.tabGroupName'
		);

		Object.entries(tabGroups).forEach(group => {
			let tabGroupName = group[0];
			if (tabGroupName === 'undefined') {
				tabGroupName = 'defaultGroup';
			}
			this.service.formInputsCategorized[tabGroupName] = {};

			const tabs = this.groupByPipe.transform(
				group[1],
				'form.groupBy.tabGroup.tabName'
			);
			Object.entries(tabs).forEach(tab => {
				let tabName = tab[0];
				if (tabName === 'undefined') {
					tabName = 'defaultTab';
				}
				this.service.formInputsCategorized[tabGroupName][tabName] = {};

				const tabContent = this.groupByPipe.transform(
					tab[1],
					'form.groupBy.section'
				);
				Object.entries(tabContent).forEach(section => {
					let sectionName = section[0];
					if (sectionName === 'undefined') {
						sectionName = 'defaultSection';
					}
					this.service.formInputsCategorized[tabGroupName][tabName][
						sectionName
					] = {};

					const sectionContent = this.groupByPipe.transform(
						section[1],
						'form.groupBy.formInputs'
					);

					Object.entries(sectionContent).forEach(formInputs => {
						let formInputsName = formInputs[0];
						if (formInputsName === 'undefined') {
							formInputsName = 'defaultFormInputs';
						}
						this.service.formInputsCategorized[tabGroupName][tabName][
							sectionName
						][formInputsName] = formInputs[1];
					});
				});
			});
		});
		this.service.formInputsCategorized = {
			...this.service.formInputsCategorized
		};
	}

	addStep() {
		const formData = this.form.value;
		this.service.addStep();
		this.groupItemsByGroup();
		this.createForm();
		this.service.loadSelectLists('form', true);
		this.form.patchValue(formData);

		console.log(this.service.formInputsCategorized);
		console.log(this.form.controls);
	}

	addForm(stepNumber: number) {
		const formData = this.form.value;
		this.service.addForm(stepNumber);
		this.groupItemsByGroup();
		this.createForm();
		this.form.patchValue(formData);

		console.log(this.service.formInputsCategorized);
		console.log(this.form.controls);
	}

	addField(stepNumber: number, formNumber: number) {
		const formData = this.form.value;
		this.service.addField(stepNumber, formNumber);
		this.groupItemsByGroup();
		this.createForm();
		this.form.patchValue(formData);

		console.log(this.service.formInputsCategorized);
		console.log(this.form.controls);
	}
}
