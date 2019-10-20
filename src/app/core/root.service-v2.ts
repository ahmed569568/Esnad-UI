import { Injectable } from '@angular/core';
import { ApiResponse, ItemProps } from '@app/interfaces-v2';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AppHelper } from '@app/core/classes/app-helper';
import { DynamicDialogComponent } from '@app/shared/components/dynamic-dialog/dynamic-dialog.component';
import { SharedService } from '@app/shared/services/shared.service';
import * as moment from 'moment';
import { ApiRequestV2Service } from '@app/core/http/api-request-v2.service';

@Injectable({
	providedIn: 'root'
})
export abstract class RootV2Service {
	// List Object which store the data from the server once it retrieve
	public resourcesList: any;
	resources: Subject<any> = new Subject();
	updateResources: Subject<any> = new Subject();

	formInputsCategorized: any = {};

	lists: any = {
		// positions: { data: [] },
		// roles: { data: [] },
		// 'roles-create': { data: [] }
		// replaced with key : [] that holds data
	};

	dummyDataLoader = false;

	customCid: string;

	public selectedItems: number[] = []; // for selecting multiple items for delete actions

	importData: any;
	clearInput: Subject<any> = new Subject();

	/**
	 * define the grid list items (columns)
	 */
	featureProps: ItemProps[];

	protected constructor(
		protected router: Router,
		protected api: ApiRequestV2Service,
		public shared: SharedService
	) {
		// Initialize the resourceList as empty array.
		this.resourcesList = {};
	}

	/**
	 * Main method to get resource lists
	 * @param params: params
	 * @param archivedList: Flag to check if list is archived list
	 */
	startAutoLoad(params: {} = {}, archivedList: boolean = false) {
		return this.autoLoadResources(params, archivedList);
	}

	/**
	 * Get list of data
	 * page
	 * params
	 */
	public autoLoadResources(params: {}, archivedList: boolean) {
		if (this.routerPrefix() === '') {
			return;
		}
		return this.doGetLists(
			this.getFunctionURL(null, archivedList ? '/archived' : ''),
			params
		);
	}

	async doGetLists(url: string, params: {} = {}) {
		return this.api
			.get(url, params)
			.pipe(
				map(response => {
					return this.listPrepareOperations(response);
				})
			)
			.subscribe(async (resp: ApiResponse) => {
				this.storeResourceListResponse(resp, params);
			});
	}

	/**
	 * set response list to resourceList variable
	 */
	storeResourceListResponse(resp: any, params?: any) {
		this.resourcesList = resp;
		this.resources.next();
	}

	/**
	 * Helper method to refactor the code before it's returned
	 * @param data: Response
	 */
	listPrepareOperations(data: {}) {
		return data;
	}

	/**
	 * Helper Method, It'll overwrite from child services
	 */
	routerPrefix(val: string = ''): string {
		return val ? val : '';
	}

	/**
	 * @returns the controller id that predefined in child service
	 */
	get cid() {
		return this.routerPrefix();
	}

	getFunctionURL(action: any, suffix: string = '', prefix: string = '') {
		return action
			? prefix + this.routerPrefix() + '/' + action + suffix
			: prefix + this.routerPrefix() + suffix;
	}

	/**
	 * Archive Item
	 */
	archive(id: number) {
		return this.doArchive(this.getFunctionURL('archive'), id);
	}

	/**
	 * Archive Item Request
	 * url
	 * id
	 */
	doArchive(url: string, id: number) {
		return this.api.put(url, { ids: [id] }).subscribe(
			(res: ApiResponse) => {
				this.afterSuccessListAction();
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.archived'),
					this.shared.translate.instant('common.success')
				);
				this.afterSuccessListAction();
				this.updateResources.next();
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	/**
	 * Archive Items
	 */
	archiveMultiple(ids: {}) {
		return this.doArchiveMultiple(this.getFunctionURL('archive'), { ids });
	}

	/**
	 * Archive Items Request
	 * url
	 * id
	 */
	doArchiveMultiple(url: string, body: any) {
		return this.api.put(url, body).subscribe(
			(res: ApiResponse) => {
				this.afterSuccessListAction();
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.archived'),
					this.shared.translate.instant('common.success')
				);

				this.updateResources.next();
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	/**
	 * Archive Items
	 */
	deleteMultiple(ids: {}) {
		return this.doDeleteMultiple(this.getFunctionURL(''), { ids });
	}

	/**
	 * Archive Items Request
	 * url
	 * id
	 */
	doDeleteMultiple(url: string, body: any) {
		return this.api.request('delete', url, body).subscribe(
			(res: ApiResponse) => {
				this.afterSuccessListAction();
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.deleted'),
					this.shared.translate.instant('common.success')
				);

				this.updateResources.next();
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	/**
	 * Generic Restore
	 * id: Item Id
	 */
	restoreMultiple(ids: any) {
		console.log(ids);
		return this.doRestoreMultiple(this.getFunctionURL(''), { ids });
	}

	/**
	 * Restore Item Request
	 * url
	 * id
	 */
	doRestoreMultiple(url: string, body: any) {
		return this.api.put(url + '/restore', body).subscribe(
			(res: ApiResponse) => {
				this.afterSuccessListAction();
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.restored'),
					this.shared.translate.instant('common.success')
				);

				this.updateResources.next();
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	/**
	 * Delete Item
	 */
	delete(id: number) {
		return this.doDelete(this.getFunctionURL(id));
	}

	/**
	 * Archive Item Request
	 * url
	 * id
	 */
	doDelete(url: string) {
		return this.api.delete(url).subscribe(
			(res: ApiResponse) => {
				this.afterSuccessListAction();
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.deleted'),
					this.shared.translate.instant('common.success')
				);
				this.updateResources.next();
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	/**
	 * selects items by ids as numbers or can use array of items to select them based on passed type: ex [5,2,3] or 5
	 * @param id: ID
	 */
	selectItem(id: any) {
		if (id.constructor === Array) {
			// console.log('selecting array');
			if (this.selectedItems.length) {
				if (this.selectedItems.length === id.length) {
					id.forEach((y: number) => {
						if (this.selectedItems.find(x => x === y)) {
							const i = this.selectedItems.findIndex(x => x === y);
							this.selectedItems.splice(i, 1);
						} else {
							this.selectedItems.push(y);
						}
					});
				} else {
					id.forEach((y: number) => {
						if (this.selectedItems.find(x => x === y)) {
							// const i = this.selectedItems.findIndex(x => x === y);
							// this.selectedItems.splice(i, 1);
						} else {
							this.selectedItems.push(y);
						}
					});
				}
			} else {
				id.forEach((y: number) => {
					this.selectedItems.push(y);
				});
			}
		} else if (typeof id === 'number') {
			if (this.selectedItems.length) {
				if (this.selectedItems.find(x => x === id)) {
					const i = this.selectedItems.findIndex(x => x === id);
					this.selectedItems.splice(i, 1);
				} else {
					this.selectedItems.push(id);
				}
			} else {
				this.selectedItems.push(id);
			}
		}
	}

	/**
	 * Generic Update Status
	 * id: Item Id
	 * data: New Item Data
	 */
	toggleActivate(id: any) {
		return this.doToggleActivateItem(this.getFunctionURL(`${id}/status`), {});
	}

	/**
	 * Generic Restore
	 * id: Item Id
	 */
	restore(id: number) {
		return this.doRestore(this.getFunctionURL('restore'), id);
	}

	/**
	 * Restore Item Request
	 * url
	 * id
	 */
	doRestore(url: string, data: any) {
		return this.api.put(url, { ids: [data] }).subscribe(
			(res: ApiResponse) => {
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.restored'),
					this.shared.translate.instant('common.success')
				);

				this.afterSuccessListAction();
				this.updateResources.next();
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	/**
	 * Generic Update Status
	 */
	async doToggleActivateItem(url: string, data: {}) {
		return this.api.put(url, data).subscribe(
			async (resp: ApiResponse) => {
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.status_changed'),
					this.shared.translate.instant('common.success')
				);

				this.afterSuccessListAction();
				return this.updateResources.next();
				// });
			},
			async err => {
				this.errorHandle(err);
			}
		);
	}

	checkSelected(id: number) {
		return !!this.selectedItems.find(x => x === id);
	}

	/**
	 * Generic Show Action Request
	 * @param id: Item Identifier
	 */
	showItem(id: number) {
		return this.doShow(this.getFunctionURL(`${id}`));
	}

	doShow(url: string) {
		return this.api.get(url).pipe(
			map((response: ApiResponse) => {
				return this.refactorItem(response.data);
			})
		);
	}

	/**
	 * Generic Create Action Request
	 * @param data: New Item Data
	 */
	createItem(data: {}) {
		return this.doCreate(this.getFunctionURL(''), data);
	}

	/**
	 * Create Item Request
	 * url
	 * id
	 */
	doCreate(url: string, data: {}) {
		return this.api.post(url, data);
	}

	/**
	 * Generic Create Action Request
	 * id: Item Id
	 * data: New Item Data
	 */
	updateItem(id: any, data: {}) {
		return this.doUpdateItem(this.getFunctionURL(id), data);
	}

	/**
	 * Generic Update Action Request
	 */
	doUpdateItem(url: string, data: {}) {
		return this.api.put(url, data);
	}

	/**
	 * Generic update Action Request
	 * id: Item Id
	 * data: New Item Data
	 */
	updateItemAsPost(id: any, data: {}) {
		return this.doUpdateItemAsPost(this.getFunctionURL(id), data);
	}

	/**
	 * Generic Update Action Request
	 */
	doUpdateItemAsPost(url: string, data: {}) {
		return this.api.post(url, data);
	}

	errorHandle(err: {}) {
		for (const error of Object.keys(err)) {
			// this.presentToast(err[error], 'danger');
		}
	}

	navigateToList() {
		return this.router.navigate([this.cid]);
	}

	refactorItem(item: {}) {
		return item;
	}

	/**
	 * Load lists Request
	 */
	getLists(field: string, page: number = 1) {
		return this.api
			.get(field)
			.pipe(
				map(response => {
					return this.refactorListsData(field, response);
				})
			)
			.subscribe(
				(resp: ApiResponse) => {
					this.storeListsResponse(field, resp, page);
				},
				err => this.errorHandle(err)
			);
	}

	refactorListsData(field: string, response: any) {
		return response.response.data;
	}

	/**
	 * set field response list to lists variable
	 */
	storeListsResponse(field: string, resp: ApiResponse, page: number) {
		if (page === 1) {
			// this.lists[field].data.length = 0;
			const fieldName = field.replace('/', '-');
			// console.log(resp.data);
			this.lists[fieldName] = resp.data;
			// console.log(this.lists[fieldName]);

			// this.lists[field].data = resp.data;
		} else {
			// this.lists[field].data = this.lists[field].data.concat(resp.response.data);
		}
	}

	/**
	 * // todo : update this function docs
	 * @param url
	 */

	navigateUrl(url: any) {
		return this.router.navigate([url]);
	}

	afterSuccessListAction() {
		this.selectedItems = [];
	}

	refactorFormBeforeSubmit(formValue: any) {
		return formValue;
	}

	/**
	 * Pass the value to deep find method using path and original object
	 * obj
	 * path
	 */
	getValue(obj: any, path: string) {
		return AppHelper.deepFind(obj, path);
	}

	/**
	 * custom actions used in lists
	 * @param action to be done ex open dashboard of vendors
	 * @param row > table row
	 * @param column > table column
	 * @param staticValue to do action on it instead of the row and column and prop method of doing action on a column value
	 */
	listActions(action: string, row: any, column: any, staticValue?: any) {
		if (!action) {
			return;
		}
		let value: any = '';
		if (!staticValue) {
			if (column.list.action.prop) {
				value = this.getValue(row, column.list.action.prop);
			} else {
				value = this.getValue(row, column.prop);
			}
		} else {
			value = staticValue;
		}
		switch (action) {
			case 'mailto': {
				window.open(action + ':' + value);
				// return this.router.navigateByUrl(action + ':' + value);
				break;
			}
			case 'openItemDashboard': {
				this.navigateUrl(`${this.cid}/dashboard/${value}`);
				break;
			}
			case 'goToUrl': {
				window.open(value, '_blank');
				break;
			}
			case null: {
				break;
			}
		}
	}

	/**
	 * Action dialog for actions that need dialog confirmation before doing the action
	 * @param service of the module (usually root service until overridden by specific module that extends from root service)
	 * @param action string for the name of the function in a switch
	 * case inside dialogAction function in root service which could have
	 * generic functions and or specific implementations inside each service that extend from root service
	 * @param title dialog title translation string
	 * @param message dialog message translation string
	 * @param submitText dialog submit text on button
	 * @param cancelText dialog cancel text on button
	 * @param data  data to be passed along to the dialog and from dialog to function executed from service
	 * @param submitCssClass css class of the submit button
	 */
	openActionDialog(
		service: any,
		action: string,
		title: string,
		message: string,
		submitText: string,
		cancelText: string,
		data?: any,
		submitCssClass?: string
	): void {
		this.shared.dialog.open(DynamicDialogComponent, {
			data: {
				service,
				action,
				title,
				message,
				submitText,
				cancelText,
				data,
				submitCssClass
			}
		});
	}

	/**
	 * function for all actions that's passed to and from the dialog
	 * @param action string for action name passed before open dialog
	 * @param data object to be used in each function passed from the function that opened the dialog
	 */
	dialogAction(action: string, data?: any) {
		switch (action) {
			case 'cancel': {
				// this.navigateToList();
				this.goBack();
				break;
			}
			case 'restoreMultiple': {
				this.restoreMultiple(data);
				break;
			}
			case 'restore': {
				this.restore(data);
				break;
			}
			case 'deleteMultiple': {
				this.deleteMultiple(data);
				break;
			}
			case 'delete': {
				this.delete(data);
				break;
			}
			case 'archiveMultiple': {
				this.archiveMultiple(data);
				break;
			}
			case 'archive': {
				this.archive(data);
				break;
			}
		}
	}

	/**
	 * Extend from openActionDialog() method
	 * @param data: id or [ids] of selected items
	 * @param action: action type [restore, archive, delete]
	 */
	openDialog(data: any, action: string) {
		this.openActionDialog(
			this,
			action,
			`common.confirm_${action}.title`,
			`common.confirm_${action}.message`,
			`common.confirm_${action}.submitText`,
			`common.confirm_${action}.cancelText`,
			data,
			'bg-danger'
		);
	}

	/**
	 * Export Items
	 */
	exportMultiple(ids?: number[], all: boolean = false, value?: any) {
		let exportBody: any;
		exportBody = {
			fileType: 'csv'
		};
		if (value) {
			exportBody.fileType = value;
		}
		if (ids && ids.length > 0 && all === false) {
			exportBody.ids = ids;
		}
		return this.doExportMultiple(this.getFunctionURL('export'), exportBody);
	}

	/**
	 * Export Items Request
	 * url
	 * id
	 */
	doExportMultiple(url: string, body: any) {
		const today = new Date();
		const date =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate();
		const time =
			today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
		const dateTime = date + '_' + time;

		const fileName = `${this.cid}_${dateTime}.${body.fileType}`;

		return this.api.request('POST', url, body, {}, {}, 'blob').subscribe(
			res => {
				this.api.fileSaverService.save(res, fileName, body.fileType);
				this.afterSuccessListAction();
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.exported'),
					this.shared.translate.instant('common.success')
				);
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	/**
	 * Get data form server
	 * @param componentName: Component Name
	 * @param itemID: Resource id
	 * @param isCreate: flag
	 * @param headers: Request headers
	 * @param filterMethod: is this method filtering the results
	 */
	getComponentData(
		componentName: string,
		itemID: number,
		headers: {} = {},
		isCreate: boolean = false,
		filterMethod: boolean = false
	) {
		this.api
			.get(this.getFunctionURL(`${itemID}/${componentName}`), headers)
			.pipe(
				map(data => {
					return data;
				})
			)
			.subscribe(obj => {
				return this.storeComponentData(
					componentName,
					obj,
					isCreate,
					filterMethod
				);
			});
	}

	/**
	 * post data to server
	 * @param componentName: Component Name
	 * @param itemID: Resource id
	 * @param data: form data
	 * @param isCreate: Check if post type is Create or update
	 */
	postComponentData(
		componentName: string,
		itemID: number,
		data: any,
		isCreate: boolean = false
	) {
		this.api
			.post(this.getFunctionURL(`${itemID}/${componentName}`), data)
			.pipe(
				map((response: any) => {
					return response;
				})
			)
			.subscribe(
				obj => {
					this.shared.toastr.success(obj.message);
					return this.getComponentData(componentName, itemID, null, isCreate);
				},
				error => {
					if (error && error.status === 422) {
						const errorObj = {
							componentName: componentName,
							error: error.error
						};
						this.shared.dashboardErrors$.next(errorObj);
					}
				}
			);
	}

	/**
	 * Delete Item from resource nested resources
	 * @param componentName: Component Name
	 * @param id: deleting item id
	 * @param itemID: Resource id
	 */
	deleteComponentData(componentName: string, id: number, itemID: number) {
		this.api
			.delete(this.getFunctionURL(`${componentName}/${id}`))
			.pipe(
				map((data: any) => {
					return data;
				})
			)
			.subscribe(obj => {
				this.shared.toastr.success(obj.message);
				this.getComponentData(componentName, itemID);
				return this.shared.handleItemById({ componentName, id });
			});
	}

	/**
	 * store response data in subject subscription
	 * It override in each service
	 * @param componentName: Component Name
	 * @param data: response data
	 * @param isCreate: isCreate
	 * @param filterMethod: is this method filtering the data?
	 */
	storeComponentData(
		componentName: string,
		data: any,
		isCreate: boolean = false,
		filterMethod: boolean = false
	) {
		return { component: componentName, data, isCreate, filterMethod };
	}

	apiRequest(
		method: string,
		url: string,
		body: {} = {},
		headers?: any,
		params?: any,
		responseType?: any
	): Observable<any> {
		return this.api.request(method, url, body, headers, params, responseType);
	}

	/**
	 * generic method to be overridden in specific services to refactor filters in each module service as needed
	 * @param filters passed filters object
	 */
	refactorFilters(filters: any) {
		return filters;
	}

	/**
	 * generic method to be overridden in specific services to refactor sorting in each module service as needed
	 * @param sorting passed sorting object
	 */
	refactorSorting(sorting: any) {
		return sorting;
	}

	/**
	 * compare fn to compare current date to another date by a compare keyword to be overridden as needed in each separate module service
	 * @param inputDate to compare
	 * @param compareKeyword compare string of switch case
	 */
	dateAgoChecker(inputDate: any, compareKeyword?: string): boolean {
		const now = moment(new Date());
		let compareTo = now;
		if (compareKeyword === 'yesterday') {
			compareTo = now.subtract(1, 'days');
		}
		const date = moment(inputDate);
		return date > compareTo;
	}

	/**
	 * helper fn to convert any type of data into date with moment library
	 * @param date string
	 */
	dateConverter(date: any) {
		return moment(date);
		// return moment(new Date());
	}

	onChangeValue_ng_select(column: ItemProps, event: any) {
		if (
			(column.list && column.list.onChange) ||
			(column.form && column.form.onChange)
		) {
			this.onChangedValue(column, event);
		} else {
			return;
		}
	}

	onChangedValue(column: ItemProps, event: any) {
		console.log(column.name, event);
	}

	loadSelectList(fieldName: string, url?: string, type?: string) {
		const field = this.featureProps.find(x => x.name === fieldName);
		if (url && type) {
			this.resourceGet(url).subscribe((result: any) => {
				this.lists[field[type].listPrefix] = result.data;
			});
		} else {
			if (field.list.dataUrl) {
				this.resourceGet(field.list.dataUrl).subscribe((result: any) => {
					this.lists[field.list.listPrefix] = result.data;
				});
			} else if (field.form.dataUrl) {
				this.resourceGet(field.form.dataUrl).subscribe((result: any) => {
					this.lists[field.form.listPrefix] = result.data;
				});
			} else {
				return;
			}
		}
	}

	clearSelectList(fieldName?: string, listPrefix?: string) {
		let _listprefix: string;
		if (fieldName) {
			const field: ItemProps = this.getFieldByName(fieldName);
			if (field.list && field.list.listPrefix) {
				_listprefix = field.list.listPrefix;
			} else if (field.form && field.form.listPrefix) {
				_listprefix = field.form.listPrefix;
			}
		} else if (listPrefix) {
			_listprefix = listPrefix;
		}
		if (this.lists[_listprefix]) {
			this.lists[_listprefix] = [];
		}
	}

	getFieldByName(fieldName: string) {
		if (fieldName) {
			return this.featureProps.find(x => x.name === fieldName);
		}
	}

	loadSelectLists(type?: string, checkExisting?: boolean) {
		this.featureProps.forEach(field => {
			if (
				(field.list &&
					field.list.filterFieldType &&
					field.list.dataUrl &&
					field.list.listPrefix &&
					(field.list.searchable || field.list.searchableInline)) ||
				(field.form &&
					field.form.formFieldType &&
					field.form.dataUrl &&
					field.form.listPrefix)
			) {
				if (type && type === 'list') {
					if (
						field &&
						field.list &&
						field.list.dataUrl &&
						field.list.listPrefix
					) {
						if (
							checkExisting &&
							this.lists[field.list.listPrefix] &&
							this.lists[field.list.listPrefix].length
						) {
							return;
						}
						this.resourceGet(field.list.dataUrl).subscribe((result: any) => {
							this.lists[field.list.listPrefix] = this.refactorListsData(
								field.name,
								result
							);
						});
					}
				} else if (type && type === 'form') {
					if (
						field &&
						field.form &&
						field.form.dataUrl &&
						field.form.listPrefix
					) {
						if (
							checkExisting &&
							this.lists[field.form.listPrefix] &&
							this.lists[field.form.listPrefix].length
						) {
							return;
						}
						this.resourceGet(field.form.dataUrl).subscribe((result: any) => {
							this.lists[field.form.listPrefix] = this.refactorListsData(
								field.name,
								result
							);
						});
					}
				} else {
					if (
						field &&
						field.list &&
						field.list.dataUrl &&
						field.list.listPrefix
					) {
						if (
							checkExisting &&
							this.lists[field.list.listPrefix] &&
							this.lists[field.list.listPrefix].length
						) {
							return;
						}
						this.resourceGet(field.list.dataUrl).subscribe((result: any) => {
							this.lists[field.list.listPrefix] = this.refactorListsData(
								field.name,
								result
							);
						});
					} else if (
						field &&
						field.form &&
						field.form.dataUrl &&
						field.form.listPrefix
					) {
						if (
							checkExisting &&
							this.lists[field.form.listPrefix] &&
							this.lists[field.form.listPrefix].length
						) {
							return;
						}
						this.resourceGet(field.form.dataUrl).subscribe((result: any) => {
							this.lists[field.form.listPrefix] = this.refactorListsData(
								field.name,
								result
							);
						});
					}
				}
			}
		});
	}

	/**
	 * returns observable from component url into a data observable for async loading resources in template
	 * @param apiPath path of api resource request
	 * @param pagination request paginated or not
	 * @param params parameters to the request
	 */
	resourceGet(apiPath: string, pagination: boolean = false, params: any = {}) {
		if (!pagination) {
			params.page = 0;
		}
		return this.apiRequest('GET', apiPath, {}, {}, params);
	}

	downloadSampleFile(url: string, fileType: string) {
		const today = new Date();
		const date =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate();
		const time =
			today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
		const dateTime = date + '_' + time;

		const fileName = `${this.cid}_${dateTime}.${fileType}`;

		return this.api.request('GET', url, null, {}, {}, 'blob').subscribe(
			res => {
				this.api.fileSaverService.save(res, fileName, fileType);
				this.afterSuccessListAction();
				this.shared.toastr.success(
					this.shared.translate.instant(this.cid + '.sampleFileGenerated'),
					this.shared.translate.instant('common.success')
				);
			},
			err => {
				this.errorHandle(err);
			}
		);
	}

	toFormData<T>(formValue: T, _method?: string) {
		const formData = new FormData();

		for (const key of Object.keys(formValue)) {
			const value = formValue[key];
			/**
			 * fix for boolean values in formData method
			 */
			if (value === true) {
				formData.append(key, '1');
			} else if (value === false) {
				formData.append(key, '0');
			} else {
				formData.append(key, value);
			}
		}
		if (_method) {
			formData.append('_method', _method);
		}
		return formData;
	}

	navigateUrlOverride(url: string, type?: string, id?: number) {
		return url;
	}

	closeIssue(id: number) {
		console.log(id);
	}

	reopenIssue(id: number) {
		console.log(id);
	}

	goBack() {
		this.shared.location.back();
	}

	/**
	 * will be overridden in specific service , they just here for reference and for types existance
	 */
	addStep() {}

	addForm(stepNumber: number) {}

	addInput() {}
}
