import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	public summary: Array<object> = [
		{
			name: 'under_pricing',
			quantity: 246,
			color: '#F59C1A',
			footerBgColor: '#935E10'
		},
		{
			name: 'held_treatments',
			quantity: 81,
			color: '#E02551',
			footerBgColor: '#861631'
		},
		{
			name: 'audit_treatments',
			quantity: 99,
			color: '#5DA5E8',
			footerBgColor: '#38638B'
		},
		{
			name: 'accreditation_treatments',
			quantity: 87,
			color: '#348FE2',
			footerBgColor: '#1F5688'
		},
		{
			name: 'approved_treatments',
			quantity: 21,
			color: '#00ACAC',
			footerBgColor: '#006767'
		},
		{
			name: 'archived_treatments',
			quantity: 170,
			color: '#2D353C',
			footerBgColor: '#1B2024'
		}
	];

	public weekDays: Array<object> = [
		{ day: 'saturday', date: '2-11-2019', noHold: 0 },
		{ day: 'sunday', date: '3-11-2019', noHold: 0 },
		{ day: 'monday', date: '4-11-2019', noHold: 0 },
		{ day: 'tuesday', date: '5-11-2019', noHold: 0 },
		{ day: 'wednesday', date: '6-11-2019', noHold: 0 },
		{ day: 'thursday', date: '7-11-2019', noHold: 0 },
		{ day: 'friday', date: '8-11-2019', noHold: 0 }
	];

	public buttons: Array<object> = [
		{ name: 'clients_follow_up' },
		{ name: 'previewers_follow_up' },
		{ name: 'appraisers_follow_up' },
		{ name: 'open_treatment' }
	];

	constructor() {}

	ngOnInit() {}
}
