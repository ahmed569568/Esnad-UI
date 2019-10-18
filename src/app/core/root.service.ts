import { Injectable } from '@angular/core';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ApiResponse, ItemProps } from '@app/interfaces';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export abstract class RootService {
  // List Object which store the data from the server once it retrieve
  public resourcesList: any;
  resources: Subject<any> = new Subject();
  updateResources: Subject<any> = new Subject();
  lists: any = {
    ['drivers-languages']: [],
    users: { data: [] },
    models: { data: [] },
    control: { data: [] },
    parents: []
  };
  centerPoint: { lat?: number; lng?: number; id?: number };

  protected constructor(protected toast: ToastrService, protected router?: Router, protected api?: ApiRequestService) {
    // Initialize the resourceList as empty object.
    this.resourcesList = {};
    this.centerPoint = {};
  }

  showSuccess(msg: string, title: string) {
    this.toast.success(msg, title);
  }

  showError(msg: string, title: string) {
    this.toast.error(msg, title);
  }

  getDashboardData(type: string) {
    return this.api.get(`${type}`, '').pipe(
      map((response: ApiResponse) => {
        return response.data;
      })
    );
  }

  /**
   * Main method to get resource lists
   * @param page: page
   * @param params: params
   */
  startAutoLoad(page: number = 1, params: {} = {}) {
    return this.autoLoadResources(page, params);
  }

  /**
   * Get list of data
   * page
   * params
   */
  public autoLoadResources(page: number, params: {}) {
    if (this.routerPrefix() === '') {
      return;
    }
    return this.doGetLists(this.getFunctionURL('', `/index?page=${page}`), params);
  }

  async doGetLists(url: string, params: {} = {}) {
    return this.api
      .post(url, params)
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
    this.resourcesList = resp.response;
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

  getFunctionURL(action: string, suffix: string = '') {
    return action ? this.routerPrefix() + '/' + action : this.routerPrefix() + suffix;
  }

  /**
   * Archive Item
   */
  archive(id: number) {
    return this.doArchive(this.getFunctionURL(`${id}/archive`));
  }

  /**
   * Archive Item Request
   * url
   * id
   */
  doArchive(url: string) {
    return this.api.delete(url).subscribe(
      (res: ApiResponse) => {
        this.updateResources.next();
        return this.showSuccess(res.message, 'archived');
      },
      err => {
        this.errorHandle(err);
      }
    );
  }

  /**
   * Restore Item
   */
  restore(id: number) {
    return this.doRestore(this.getFunctionURL(id + '/active'));
  }

  /**
   * Restore Item Request
   * url
   * id
   */
  doRestore(url: string) {
    return this.api.get(url).subscribe(
      (res: ApiResponse) => {
        this.updateResources.next();
        // return this.presentToast(res.response.action, 'success');
      },
      err => {
        // this.errorHandle(err);
      }
    );
  }

  /**
   * Generic Show Action Request
   * @param id: Item Identifier
   */
  showItem(id: number) {
    return this.doShow(this.getFunctionURL(`${id}/show`));
  }

  doShow(url: string) {
    return this.api.get(url).pipe(
      map((response: ApiResponse) => {
        return this.refactorItem(response.response);
      })
    );
  }

  /**
   * Generic Create Action Request
   * @param data: New Item Data
   */
  createItem(data: {}) {
    return this.doCreate(this.getFunctionURL('create'), data);
  }

  /**
   * Create Item Request
   * url
   * id
   */
  async doCreate(url: string, data: {}) {
    return this.api.post(url, data).subscribe(
      async (resp: ApiResponse) => {
        this.showSuccess(resp.message, 'created');
        return this.navigateToList();
      },
      async err => {
        this.errorHandle(err);
      }
    );
  }

  /**
   * Generic Create Action Request
   * id: Item Id
   * data: New Item Data
   * slc: Skip Location Change
   */
  updateItem(slc: boolean, id: any, data: {}) {
    return this.doUpdateItem(slc, this.getFunctionURL(`${id}/update`), data);
  }

  /**
   * Generic Update Action Request
   */
  async doUpdateItem(slc: boolean, url: string, data: {}) {
    return this.api.put(url, data).subscribe(
      async (resp: ApiResponse) => {
        this.showSuccess(resp.message, 'updated');
        if (!slc) {
          return this.navigateToList();
        }
      },
      async err => {
        this.errorHandle(err);
      }
    );
  }

  errorHandle(err: any) {
    for (const error of Object.keys(err.error.error)) {
      this.showError(err.error.error[error][0], 'error');
    }
  }

  navigateToList() {
    this.updateResources.next();
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
      .get(`${field}/index`)
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

  refactorListsData(field: string, response: {}) {
    return response;
  }

  /**
   * set field response list to lists variable
   */
  storeListsResponse(field: string, resp: ApiResponse, page: number) {
    if (page === 1) {
      // this.lists[field].data.length = 0;
      field = field.replace('/', '-');
      this.lists[field] = resp.response;
    } else {
      // this.lists[field].data = this.lists[field].data.concat(resp.response.data);
    }
  }

  /**
   * Generic Show Action Request
   * @param id: Item Identifier
   */
  fetchSummary() {
    return this.doFetchSummary(this.getFunctionURL(`summary`));
  }

  doFetchSummary(url: string) {
    return this.api.get(url).pipe(
      map((response: ApiResponse) => {
        return response.response;
      })
    );
  }

  /**
   * define the grid list items (columns)
   */
  abstract get featureProps(): ItemProps[];
}
