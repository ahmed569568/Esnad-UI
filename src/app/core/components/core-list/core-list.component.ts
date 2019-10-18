import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemProps, ListOptions } from '@app/interfaces';
import { RootService } from '@app/core/root.service';
import { Router } from '@angular/router';
import { AppHelper } from '@app/core/classes/app-helper';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-core-list',
  templateUrl: './core-list.component.html',
  styleUrls: ['./core-list.component.scss']
})
export class CoreListComponent implements OnInit, OnDestroy {
  cid: string;
  columns: ItemProps[];
  listOptions: ListOptions = {
    itemsPerPage: [5, 10, 20, 50, 100],
    archive: true,
    add: true,
    edit: true,
    view: false,
    exportList: false,
    importList: false,
    locate: false,
    clone: true,
    groups: false,
    searchable: false,
    customTitle: '',
    hoverData: { status: false },
    listTypes: [],
    pagination: true
  };
  params: any = { pagination: 20 };
  pageNumber = 1;
  alive = true;

  constructor(public service: RootService, protected utilitiesService?: UtilitiesService, protected router?: Router) {
    this.cid = service.cid;
  }

  ngOnInit() {
    this.utilitiesService.filterObservable$.pipe(takeWhile(() => this.alive)).subscribe(keyword => {
      this.params = { ...this.params, string: keyword };
      return this.loadResources();
    });
    AppHelper.calcListHeight();
    AppHelper.pushResize();
    return this.loadResources().then(() => {
      /**
       * Init the columns from each service
       */
      const colsFromService: ItemProps[] = this.service.featureProps;
      if (colsFromService.length) {
        this.columns = colsFromService;
      }
      this.paginationInit();
    });
  }

  /**
   * Init navigation observables
   */
  paginationInit() {
    /**
     * refresh resources list
     */
    this.service.updateResources.pipe(takeWhile(() => this.alive)).subscribe(() => {
      console.log('update resource');
      return this.loadResources();
    });

    /**
     * Retrieve the page number state from the pagination service
     */
    this.utilitiesService.paginateObservable$.pipe(takeWhile(() => this.alive)).subscribe(page => {
      if (page) {
        this.pageNumber = page;
        return this.loadResources();
      }
    });

    /**
     * Retrieve the item count state from the pagination service
     */
    // this.utilitiesService.countObservable$.pipe(takeWhile(() => this.alive)).subscribe(itemCount => {
    //   if (itemCount) {
    //     this.params.pagination = itemCount;
    //   }
    // });

    /**
     * Emit the default item count per page value to the pagination service
     */
    // this.utilitiesService.countPerPage(this.params.pagination);
  }

  /**
   * Reset list to page 1
   * Refresh lists
   */
  resetList() {
    this.pageNumber = 1;
    this.utilitiesService.navigate(1);
  }

  /**
   * fetch list data from service
   */
  loadResources() {
    return this.service.startAutoLoad(this.pageNumber, this.params);
  }

  doAction(data: any) {
    switch (data.actionType) {
      case 'resetList': {
        return this.loadResources();
      }
      case 'add': {
        return this.router.navigate([this.cid + '/create']);
      }
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
