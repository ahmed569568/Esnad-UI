import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {
	paginateObservable$: Observable<number>;
	countObservable$: Observable<number>;
	_itemsCount: number;
	menuObservable$: Observable<boolean>;
	_menuState = false;

	filterObservable$: Observable<string>;
	dialogActionObservable$: Observable<any>;
	languageObservable$: Observable<any>;

	private paginate$: Subject<number>;
	private _dialogAction$: Subject<any>;

	private count$: BehaviorSubject<number>;

	private menu$: BehaviorSubject<boolean>;

	private language$: Subject<string>;

	private filter$: Subject<string>;

	filterPanelObservable$: Observable<boolean>;
	private _filterPanel$: BehaviorSubject<boolean>;
	_filterPanelState = false;

	constructor() {
		this.initSubjects();
	}

	/**
	 * Fire the paginate$ Subject with paginate param
	 * to change the current page in view
	 * @param page: page
	 */
	navigate(page: number) {
		this.paginate$.next(page);
	}

	/**
	 * Fire the count$ BehaviorSubject with count param
	 * to change the items per page values
	 * @param count: count
	 */
	countPerPage(count: number) {
		this.count$.next(count);
	}

	dialog(data: any) {
		this._dialogAction$.next(data);
	}

	filter(keyword: string) {
		this.filter$.next(keyword);
	}

	changeLanguage(lang: any) {
		this.language$.next(lang);
	}

	toggleFilterPanel(status: boolean) {
		this._filterPanel$.next(status);
	}

	initSubjects() {
		this.paginate$ = new Subject();
		this.paginateObservable$ = this.paginate$.asObservable();

		this.count$ = new BehaviorSubject(this._itemsCount);
		this.countObservable$ = this.count$.asObservable();

		this.menu$ = new BehaviorSubject(this._menuState);
		this.menuObservable$ = this.menu$.asObservable();

		this._filterPanel$ = new BehaviorSubject(this._filterPanelState);
		this.filterPanelObservable$ = this._filterPanel$.asObservable();

		this.filter$ = new Subject();
		this.filterObservable$ = this.filter$.asObservable();

		this._dialogAction$ = new Subject();
		this.dialogActionObservable$ = this._dialogAction$.asObservable();

		this.language$ = new Subject();
		this.languageObservable$ = this.language$.asObservable();
	}
}
