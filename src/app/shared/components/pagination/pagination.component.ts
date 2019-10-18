import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ListOptions, Pagination, RowData } from '../../../interfaces';
import { UtilitiesService } from '../../services/utilities.service';
import { I18nService } from '../../../core/i18n.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  // Inputs
  @Input() service: any;
  @Input() options: ListOptions;

  // Props
  pages: any[] = [];
  currentPage = 1;
  lang: string;
  itemCount: number;
  pagination: Pagination = {
    current_page: 1,
    last_page: 5,
    total: 0
  };

  constructor(private utilitiesService: UtilitiesService, private i18nService: I18nService) {}

  ngOnInit() {
    this.utilitiesService.languageObservable$.subscribe(() => {
      this.lang = this.i18nService.language;
    });
    this.utilitiesService.paginateObservable$.subscribe(pageNum => {
      if (pageNum) {
        this.currentPage = pageNum;
        this.navigationInit();
      }
    });
    this.utilitiesService.countObservable$.subscribe(itemCount => {
      if (itemCount) {
        this.itemCount = itemCount;
        this.service.updateResources.next();
      }
    });
  }

  /**
   * Retrieve new data to set the pages
   */
  ngOnChanges() {
    this.service.resources.subscribe(() => {
      const paginationInfo: RowData = JSON.parse(JSON.stringify(this.service.resourcesList)); // clone object
      if (paginationInfo.hasOwnProperty('data')) {
        delete paginationInfo.data; // remove data item from object
      }
      this.pagination = { ...paginationInfo };
      this.navigationInit();
    });
  }

  /**
   * setPagesCount() looping based on the last page count
   * if the page number is < 3, render the page number
   * if the page number is within +-2 of the current page, render the page number
   * if the page number is > the total number of pages -3 render the page number
   * if the last page number wasn't rendered and dots haven't already been rendered render dots '...' do indicate a gap
   * else do nothing
   * @returns array of available page numbers
   */
  navigationInit() {
    this.pages = [];
    const dynamicPages = 4;
    // Navigation Logic
    // If there's 4 or more than 4 pages contain data or it's only one page contain data..
    if (dynamicPages >= this.pagination.last_page || this.pagination.last_page === 1) {
      for (let i = 0; i < this.pagination.last_page; i++) {
        this.pages.push(i + 1);
      }
    } else {
      if (this.currentPage === 1) {
        // If it was first page
        for (let i = this.currentPage - 1; i < this.currentPage + 4; i++) {
          this.pages.push(i + 1);
        }
      } else if (this.currentPage === 2) {
        // If it was second page
        for (let i = this.currentPage - 2; i < this.currentPage + 3; i++) {
          this.pages.push(i + 1);
        }
      } else if (this.currentPage === this.pagination.last_page) {
        // If it was the last page
        for (let i = this.currentPage - 5; i < this.currentPage; i++) {
          this.pages.push(i + 1);
        }
        /**
         * If it was the page before 1 of end of the navigation
         */
      } else if (this.currentPage === this.pagination.last_page - 1) {
        for (let i = this.currentPage - 4; i < this.currentPage + 1; i++) {
          this.pages.push(i + 1);
        }
      } else {
        // All centered results
        for (let i = this.currentPage - 3; i < this.currentPage + 2; i++) {
          this.pages.push(i + 1);
        }
      }
    }
  }

  /**
   * setPage() set user event selected page
   * @returns event which update data from API request
   */
  setPage(page: number) {
    if (page === this.currentPage) {
      return;
    }
    this.utilitiesService.navigate(page);
  }

  /**
   * setPageNav() set user event chooses event [previous, next]
   * @returns event which update data from API request
   */
  setPageNav(type: string) {
    let page: number = this.currentPage;
    switch (type) {
      case 'prev':
        page -= 1;
        break;
      case 'next':
        page += 1;
        break;
      case 'first':
        page = 1;
        break;
      case 'last':
        page = this.pagination.last_page;
    }
    this.setPage(page);
  }

  changeItemsPerPage() {
    this.utilitiesService.countPerPage(this.itemCount);
  }
}
