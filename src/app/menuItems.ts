export class MenuItems {
	items: MenuItem[] = [
		{
			title: 'control',
			url: '/dashboard',
			icon: 'desktop_windows'
		},
		{
			title: 'treatments',
			icon: 'directions_bus',
			children: [
				{
					title: 'active_treatments',
					url: '/treatments/list'
				}, {
					title: 'expire_treatments',
					url: '/treatments/list'
				},
			]
		},
		// {
		// 	title: 'reminders',
		// 	url: '/reminders',
		// 	icon: 'person'
		// },
		{
			title: 'clients',
			icon: 'school',
			children: [
				{
					title: 'clients_list',
					url: '/clients/list'
				}, {
					title: 'new_client',
					url: '/clients/create'
				}
			]
		},
		{
			title: 'prices',
			icon: 'school',
			children: [
				{
					title: 'prices_list',
					url: '/prices/list'
				}, {
					title: 'new_price',
					url: '/prices/create'
				}
			]
		},
		{
			title: 'groups',
			icon: 'school',
			children: [
				{
					title: 'groups_list',
					url: '/groups/list'
				}, {
					title: 'new_group',
					url: '/groups/create'
				}
			]
		},
		{
			title: 'categories',
			icon: 'school',
			children: [
				{
					title: 'categories_list',
					url: '/categories/list'
				}, {
					title: 'new_category',
					url: '/categories/create'
				}
			]
		},
		{
			title: 'forms',
			icon: 'school',
			children: [
				{
					title: 'forms_list',
					url: '/forms/list'
				}, {
					title: 'new_form',
					url: '/forms/create'
				}
			]
		},
		{
			title: 'cities',
			icon: 'school',
			children: [
				{
					title: 'cities_list',
					url: '/cities/list'
				}, {
					title: 'new_city',
					url: '/cities/create'
				}
			]
		},
		{
			title: 'employees',
			url: '/employees/list',
			icon: 'settings_applications',
		},
		{
			title: 'roles',
			url: '/roles/list',
			icon: 'settings_applications',
		},
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
