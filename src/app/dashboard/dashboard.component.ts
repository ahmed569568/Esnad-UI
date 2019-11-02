import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/dashboard/dashboard.service';
import { environment } from '@env/environment';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	public summary: Array<any> = [
		{
			name: 'under_evaluation',
			quantity: 0,
			color: '#F59C1A',
			footerBgColor: '#935E10'
		},
		{
			name: 'closed',
			quantity: 0,
			color: '#E02551',
			footerBgColor: '#861631'
		},
		{
			name: 'under_audit',
			quantity: 0,
			color: '#5DA5E8',
			footerBgColor: '#38638B'
		},
		{
			name: 'under_accreditation',
			quantity: 0,
			color: '#348FE2',
			footerBgColor: '#1F5688'
		},
		{
			name: 'accredited',
			quantity: 0,
			color: '#00ACAC',
			footerBgColor: '#006767'
		},
		{
			name: 'archived',
			quantity: 0,
			color: '#2D353C',
			footerBgColor: '#1B2024'
		}
	];

	public weekDays: Array<any> = [
		{ day: 'Saturday', date: '2-11-2019', noHold: 0 },
		{ day: 'Sunday', date: '3-11-2019', noHold: 0 },
		{ day: 'Monday', date: '4-11-2019', noHold: 0 },
		{ day: 'Tuesday', date: '5-11-2019', noHold: 0 },
		{ day: 'Wednesday', date: '6-11-2019', noHold: 0 },
		{ day: 'Thursday', date: '7-11-2019', noHold: 0 },
		{ day: 'Friday', date: '8-11-2019', noHold: 0 }
	];

	public buttons: Array<object> = [
		{ name: 'clients_follow_up' },
		{ name: 'previewers_follow_up' },
		{ name: 'appraisers_follow_up' },
		{ name: 'open_treatment' }
	];

	data: any;
	clients: Client[] = [];
	employees: Employee[] = [];
	environment = environment;

	constructor(private service: DashboardService) {}

	ngOnInit() {
		this.service.getDashboardData().subscribe((dashboard: any) => {
			console.log(dashboard);
			this.data = dashboard;
			this.initStatus(dashboard.by_status);
			this.initWeekdays(dashboard.by_week_days);
			this.initClients(dashboard.by_clients);
			this.initEmployees(dashboard.by_employees);
		});
	}
	initEmployees(data: Employee[]) {
		this.employees = data;
	}

	initClients(data: Client[]) {
		this.clients = data;
	}

	initStatus(data: any) {
		for (const item of this.summary) {
			item.quantity = data[item.name];
		}
	}

	initWeekdays(data: any) {
		for (const weekday of this.weekDays) {
			weekday.noHold = data[weekday.day]['count'];
			weekday.date = data[weekday.day]['date'];
		}
	}
}

interface Client {
	Accredited: number;
	archived: number;
	closed: number;
	email: string;
	full_name: string;
	id: number;
	phone: number;
	photo: string;
	sent: number;
	under_accreditation: number;
	under_audit: number;
	under_evaluation: number;
}

interface Employee {
	full_name: string;
	photo: string;
	treatments: number;
}
