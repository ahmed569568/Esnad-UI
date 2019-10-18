import { Validators } from '@angular/forms';

export interface ApiResponse {
  response?: any;
  data: {
    token?: {
      access_token: string;
      refresh_token: string;
    };
    user?: {
      name: string;
      role_id: number;
      id: number;
      image: string;
    };
    data?: {};
  };
  errors: {};
  message: string;
  status_code: number;
}

export interface ItemProps {
  name: string;
  prop: string;
  listing: boolean;
  translate?: boolean;
  clickable?: boolean;
  route?: string;
  width?: number;
  formField: boolean;
  formFieldType?: string;
  required?: boolean;
  listPrefix?: string;
  displayType?: string;
  imagePath?: string;
  validations?: Validators[];
  condition?: any;
  initValue?: any;
}

export interface Row {
  data?: any[];
}

export interface Pagination {
  last_page: number;
  current_page: number;
  from?: number;
  to?: number;
  total?: number;
}

export interface RowData {
  last_page: number;
  current_page: number;
  from?: number;
  to?: number;
  total?: number;
  data: any;
}

export interface ListOptions {
  customTitle: string;
  mode?: string;
  itemsPerPage: number[];
  archive: boolean;
  add: boolean;
  edit: boolean;
  view: boolean;
  exportList: boolean;
  importList: boolean;
  locate: boolean;
  clone: boolean;
  groups: boolean;
  hoverData: object;
  searchable?: boolean;
  listTypes?: string[];
  pagination?: boolean;
}
