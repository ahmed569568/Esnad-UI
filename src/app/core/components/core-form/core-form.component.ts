import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AppHelper } from '@app/core/classes/app-helper';
import { AppConfig } from '@app/core/classes/app-config';
import { RootService } from '@app/core/root.service';
import { environment } from '@env/environment';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-core-form',
  templateUrl: './core-form.component.html',
  styleUrls: ['./core-form.component.scss']
})
export class CoreFormComponent implements OnInit, OnDestroy {
  get lists() {
    return this._lists;
  }

  set lists(value: any) {
    this._lists = value;
  }

  /**
   * Identify the Form fields in each form controller
   */
  get formFields(): any {
    let formFields = {};
    for (const field of this.service.featureProps) {
      if (field.formField) {
        formFields = {
          ...formFields,
          [field.name]: [field.initValue ? field.initValue : '', field.validations ? field.validations : null]
        };
      }
    }
    return formFields;
  }
  extraCondition: Params;

  cid: string;
  form: FormGroup;
  isEdit = false;
  itemId: number;
  item: any;
  config = AppConfig;
  helper = AppHelper;
  alive = true;
  mapConfigs = {
    type: 'single',
    drawing: true,
    drawingType: 'Point'
  };

  environment = environment;
  imageFieldName: any[] = [];

  currentField: string;

  protected _lists: any = [];

  constructor(
    public service: RootService,
    protected fb: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    private us: UtilitiesService
  ) {
    this.cid = service.cid;
  }

  ngOnInit(): void {
    this.initLists();
    this.fillLists();
    this.createForm();
    /**
     * Check if for is edit form
     */
    this.activatedRoute.params.pipe(takeWhile(() => this.alive)).subscribe((routeInfo: any) => {
      if (routeInfo.id) {
        this.isEdit = true;
        this.loadResources(routeInfo.id);
      }
    });
    this.activatedRoute.queryParams.pipe(takeWhile(() => this.alive)).subscribe(data => {
      this.extraCondition = data;
    });
  }

  checkConditions(condition: string) {
    if (!condition || this.isEdit) {
      return true;
    } else {
      if (condition !== this.extraCondition.condition) {
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * Pick color
   * @param field: field name
   * @param color: HEX color
   */
  setColor(field: string, color: string) {
    this.form.controls[field].setValue(color);
  }

  uploadPhoto(event: any, field: string) {
    this.currentField = field;
    this.imageFieldName.push(field);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.convertImage.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  convertImage(readerEvt: any) {
    const binaryString = readerEvt.target.result;
    return this.setImagesValue(btoa(binaryString));
  }

  setImagesValue(base64: string) {
    if (Object.keys(this.imageFieldName)) {
      this.imagePath(null, base64);
    }
    for (const fieldName of this.imageFieldName) {
      if (fieldName === this.currentField) {
        this.form.controls[fieldName].setValue(this.imagePath(fieldName, base64));
      }
    }
  }

  imagePath(prefix: string, value: any, preview?: boolean) {
    if (value.length < 100) {
      return prefix + value;
    } else {
      if (preview) {
        return value;
      } else {
        return 'data:image/png;base64,' + value;
      }
    }
  }

  /**
   * Init form lists
   */
  initLists(): void {
    this.lists = [];
  }

  /**
   * fetch single item data from service
   * and fill form with it in Edit forms
   */
  loadResources(id: number): void {
    this.itemId = id;
    this.service
      .showItem(id)
      .pipe(
        map(item => {
          return this.refactorItem(item);
        })
      )
      .subscribe(
        response => {
          const obj = JSON.parse(JSON.stringify(response)); // clone response object
          return this.patchFormValue(obj);
        },
        err => {
          this.service.errorHandle(err);
        }
      );
  }

  patchFormValue(form: any) {
    return this.form.patchValue(form);
  }

  /**
   * Do operation on response before subscription
   * @param item: Response
   */
  refactorItem(item: any): any {
    return item;
  }

  trackByFn() {
    return;
  }

  /**
   * Create the form controls
   * param => formFields fills from each inheritance component
   */
  createForm(): void {
    this.form = this.fb.group(this.formFields);
  }

  /**
   * Load necessary lists to fill specific fields
   */
  getLists(field: any): Subscription {
    return this.service.getLists(field);
  }

  /**
   * get data and fill & cache it in service
   */
  fillLists(): void {
    for (const item of this.lists) {
      for (const key of Object.keys(item)) {
        this.getLists(key);
      }
    }
  }

  /**
   * submit form data to createItem method in root service
   */
  prepareFormAfterSubmit(): void {
    return;
  }

  /**
   * Post form data to API
   */
  formSubmission(skipLocationChange: boolean = false) {
    this.prepareFormAfterSubmit();
    for (const field of Object.keys(this.form.value)) {
      if (this.form.value[field] === '' || this.form.value[field] === null || this.form.value[field] === []) {
        delete this.form.value[field];
      }
    }
    if (this.isEdit) {
      return this.service.updateItem(skipLocationChange, this.itemId, this.form.value).then(() => {
        this.service.updateResources.next();
        if (!skipLocationChange) {
          return this.service.navigateToList();
        }
      });
    } else {
      return this.service.createItem(this.form.value);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
