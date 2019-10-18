import { Subject } from 'rxjs';

export class AppHelper {
  static reSize: Subject<any> = new Subject();

  static pushResize() {
    AppHelper.reSize.next({});
  }

  static calcListHeight() {
    let deletedSpaces = 0;
    const header = document.getElementById('header');
    const tableOptions = document.getElementById('tableOptions');
    const pagination = document.getElementById('pagination');
    if (header) {
      deletedSpaces += header.offsetHeight;
    }
    if (pagination) {
      deletedSpaces += pagination.offsetHeight;
    }
    if (tableOptions) {
      deletedSpaces += tableOptions.offsetHeight;
    }
    const listHeight = window.innerHeight - deletedSpaces - 30;
    const mapHeight = window.innerHeight - (header ? header.offsetHeight : 0);
    document.documentElement.style.setProperty('--allHeight', listHeight + 'px');
    document.documentElement.style.setProperty('--mapHeight', mapHeight + 'px');
  }

  /**
   * this method retrieve value from deep object
   * @param obj => whole object
   * @param path => path to value
   */
  static deepFind(obj: {}, path: string) {
    const paths = path.split('.');
    let current = obj;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < paths.length; ++i) {
      if (!current[paths[i]]) {
        return '';
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  }

  constructor() {}
}
