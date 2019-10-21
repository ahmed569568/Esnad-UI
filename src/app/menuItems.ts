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
					title: 'active_treatments',
					url: '/treatments/list'
				},
				{
					title: 'expire_treatments',
					url: '/treatments/list'
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
			title: 'forms',
			icon: 'format_align_right',
			children: [
				{
					title: 'forms_list',
					url: '/forms/list'
				},
				{
					title: 'new_form',
					url: '/forms/create'
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
			title: 'employees',
			url: '/employees/list',
			icon: 'person'
		},
		{
			title: 'roles',
			url: '/roles/list',
			icon: 'check_circle_outline'
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
