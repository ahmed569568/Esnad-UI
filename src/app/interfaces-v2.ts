import { Validators } from '@angular/forms';

export interface ApiResponse {
	data: {
		token?: {
			access_token: string;
			refresh_token: string;
		};
		user?: {
			name: string;
			role_id: number;
			id: number;
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
	additionalProp?: string;
	hints?: {};
	showIf?: any;
	editDisabled?: boolean;
	list?: {
		name?: string; // for a case when you want the key passed to list translation is different than the main one
		sortable?: boolean; // Sortable Flag
		translate?: boolean; // Translate grid cell text
		clickable?: boolean; // clickable grid cell
		route?: string; // if clickable is true, where it should navigate
		displayType?: string; // determine the grid cell type/style [color, image]
		width?: number; // determine entire column width
		height?: number; // determine entire column height
		cssClass?: string; // Custom CSS class for columns
		cellCssClass?: string; // Custom CSS class for cells
		cellInnerCssClass?: string; // custom inner css class for each item displayed in list-grid-content
		prefixCssClass?: string;
		suffixCssClass?: string;
		additionalContentCssClass?: string;
		trueValue?: string;
		customValue?: string;
		falseValue?: string;
		searchable?: boolean; // add field in list's search form
		searchableInline?: boolean; // add field in list's search form
		filterFieldType?: string; // [text, email, select, color_picker, number, file_input]
		showIf?: string; // show if is flag which determine which list shown this column [both, archive, active]
		link?: string;
		hidden?: boolean;
		placeHolder?: string;
		arrayList?: ArrayList; // if displayType: 'array',
		staticText?: string;
		tooltip?: Tooltip;
		action?: Actions;
		icon?: Icon;

		listPrefix?: string; // if formFieldType is select, It defines the list prefix which filled in service.lists[prefix]
		dataUrl?: string; // if formFieldType is select, it defines the list api url which fills the service.lists[prefix]

		onChange?: boolean;

		groupBy?: {
			section?: string;
		};

		dateOptions?: DateOptions;

		filterOptions?: FilterOptions;

		prefix?: {
			prop?: string;
			list: List;
		}[]; // array of prefixes to display inside cell < is selected from another cell identifier keys
		suffix?: {
			prop?: string;
			list: List;
		}[]; // array of suffixes to display inside cell < is selected from another cell identifier keys
		additionalContent?: {
			prop?: string;
			list: List;
		}[]; // array of suffixes to display inside cell < is selected from another cell identifier keys
	};
	form?: {
		name?: string; // for a case when you want the key passed to form translation is different than the main one
		Validators: Validators[]; // Validators => Required
		inputValueType?: string; // [formData, base64_img] (images)
		formFieldType: string; // [text, email, select, color_picker, number, file_input]
		listPrefix?: string; // if formFieldType is select, It defines the list prefix which filled in service.lists[prefix]
		dataUrl?: string; // if formFieldType is select, it defines the list api url which fills the service.lists[prefix]
		placeHolder?: string; // if formFieldType is image can set a placeholder when image isn't set
		initValue?: any; // Init Value if provided then form will init with it
		cssClass?: string;
		ngSelectOptions?: NgSelectOptions;
		grid?: {
			lg?: string;
			md?: string;
			sm?: string;
		};
		groupBy?: {
			section?: string;
			tabGroup?: {
				tabGroupName: string;
				tabName: string;
			};
		};
		onChange?: boolean;
		prefix?: {
			prop?: string;
			list: List;
		}[]; // array of prefixes to display inside cell < is selected from another cell identifier keys
		suffix?: {
			prop?: string;
			list: List;
		}[]; // array of suffixes to display inside cell < is selected from another cell identifier keys
	};
}

export interface DateOptions {
	// date Options to be used if display type is date
	timeAgo?: boolean; // display the date as a 5 hours ago method
	timeAgoCompareTo?: string; // only display date as ago if the compare function returns true, // root.service > dateAgoChecker
	displayDateAs?: string;
}

export interface FilterOptions {
	prefix?: FilterOptionsList[];
	suffix?: FilterOptionsList[];
}

export interface NgSelectOptions {
	prefix?: NgSelectOptionsList[];
	suffix?: NgSelectOptionsList[];
}

export interface FilterOptionsList {
	prop?: string;
	displayType?: string;
	cssClass?: string;
	placeHolder?: string;
}

export interface NgSelectOptionsList {
	prop?: string;
	displayType?: string;
	cssClass?: string;
	placeHolder?: string;
}

export interface ArrayList {
	arrayOfType?: string; // string or object type of object inside array
	arrayLimit?: number; // how many items to display from array
	arrayItemDisplayType?: string; // how to display items inside array ex image, text
	placeHolder?: string; // if arrayItemDisplayType is image use this image placeholder
	prop?: string; // if arrayType object use this to get a nested obj data
	tooltip?: Tooltip; // if you want tooltip on each of the items on array
}

export interface Tooltip {
	prop?: string;
	text?: string;
	translated?: boolean;
	cssClass?: string;
	tippy?: boolean;
	displayType?: string;
	arrayList?: ArrayList;
	title?: {
		prop?: string;
		text?: string;
		translated?: boolean;
	};
}

export interface Actions {
	name: string;
	prop?: string;
}

export interface Icon {
	name: string;
	type?: string;
	size?: string;
	trueIcon?: string;
	tooltip?: Tooltip;
}

export interface List {
	name?: string; // for a case when you want the key passed to list translation is different than the main one
	displayType?: string;
	width?: number; // determine entire column width
	link?: string;
	arrayList?: ArrayList; // if displayType: 'array',
	staticText?: string;
	action?: Actions;
	icon?: Icon;
	trueValue?: string;
	falseValue?: string;
	translate?: boolean; // Translate grid cell text
	cellCssClass?: string; // custom css class for each prefix
	cellInnerCssClass?: string; // custom inner css class for each item displayed in list-grid-content
	placeHolder?: string;
	tooltip?: Tooltip;
	dateOptions?: DateOptions;
	filterOptions?: FilterOptions;
}

export interface Row {
	data?: any[];
}

export interface Pagination {
	lastPage?: number;
	currentPage?: number;
	from?: number;
	to?: number;
	perPage?: number;
	totalRecords?: number;
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
	itemsPerPage?: number[];
	archive?: boolean;
	restore?: boolean;
	add?: boolean;
	edit?: boolean;
	view?: boolean;
	exportList?: boolean;
	importList?: boolean;
	clone?: boolean;
	groups?: boolean;
	hoverData?: object;
	selectable?: boolean;
	archivedList?: boolean;
	close?: boolean;
	reopen?: boolean;
	pagination?: boolean;
	checkFields?: {
		archiveField?: string;
		deleteField?: string;
		editField?: string;
		activateField?: string;
		deactivateField?: string;
		downloadableField?: string;
		openField?: string;
		closeField?: string;
	};
	activate?: boolean;
	deactivate?: boolean;
	delete?: boolean;
	downloadable?: boolean;
	actionsCssClass?: string;
	issue?: boolean;

	filterContainerCssClass?: string;
}

export class DialogData {
	title: string;
	message: string;
	showOKBtn = false;
	showCancelBtn = false;
}
