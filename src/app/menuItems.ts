export class MenuItems {
	items: MenuItem[] = [
		{
			title: 'control',
			url: '/dashboard',
			icon: 'desktop_windows'
		},
		{
			title: 'treatments',
			icon: 'swap_vert',
			children: [
				{
					title: 'special_treatments',
					url: '/treatments/list'
				},
				{
					title: 'active_treatments',
					url: '/treatments/list'
				},
				{
					title: 'expire_treatments',
					url: '/treatments/list'
				}
			]
		},
		{
			title: 'templates',
			icon: 'format_align_right',
			children: [
				{
					title: 'templates_list',
					url: '/templates/list'
				},
				{
					title: 'new_templates',
					url: '/templates/create'
				}
			]
		},
		// {
		// 	title: 'reminders',
		// 	url: '/reminders',
		// 	icon: 'person'
		// },
		{
			title: 'clients',
			icon: 'contact_mail',
			children: [
				{
					title: 'clients_list',
					url: '/clients/list'
				},
				{
					title: 'new_client',
					url: '/clients/create'
				}
			]
		},
		{
			title: 'employees',
			url: '/employees/list',
			icon: 'person'
		},
		{
			title: 'roles',
			url: '/roles/list',
			icon: 'check_circle_outline'
		},
		{
			title: 'prices',
			icon: 'attach_money',
			children: [
				{
					title: 'prices_list',
					url: '/prices/list'
				},
				{
					title: 'new_price',
					url: '/prices/create'
				}
			]
		},
		{
			title: 'groups',
			icon: 'group',
			children: [
				{
					title: 'groups_list',
					url: '/groups/list'
				},
				{
					title: 'new_group',
					url: '/groups/create'
				}
			]
		},
		{
			title: 'categories',
			icon: 'category',
			children: [
				{
					title: 'categories_list',
					url: '/categories/list'
				},
				{
					title: 'new_category',
					url: '/categories/create'
				}
			]
		},
		{
			title: 'cities',
			icon: 'location_city',
			children: [
				{
					title: 'cities_list',
					url: '/cities/list'
				},
				{
					title: 'new_city',
					url: '/cities/create'
				}
			]
		},
		{
			title: 'reports',
			icon: 'note',
			children: [
				{
					title: 'report_employees',
					url: '/#'
				},
				{
					title: 'report_treatments',
					url: '/#'
				},
				{
					title: 'report_income',
					url: '/#'
				},
				{
					title: 'report_expenses',
					url: '/#'
				},
				{
					title: 'report_banks',
					url: '/#'
				}
			]
		}
		// {
		// 	title: 'inputs',
		// 	url: '/inputs',
		// 	icon: 'settings_applications',
		// }
	];
}

interface MenuItem {
	title: string;
	url?: string;
	icon?: string;
	children?: MenuItem[];
}
