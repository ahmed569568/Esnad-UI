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
					title: 'special_treatments',
					url: '/treatments'
				}, {
					title: 'active_treatments',
					url: '/treatments'
				}, {
					title: 'expire_treatments',
					url: '/treatments'
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
					url: '/clients'
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
					url: '/prices'
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
					url: '/groups'
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
					url: '/categories'
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
					url: '/forms'
				}, {
					title: 'new_form',
					url: '/forms/create'
				}
			]
		},
		{
			title: 'employees',
			url: '/employees',
			icon: 'settings_applications',
		}, {
			title: 'roles',
			url: '/roles',
			icon: 'settings_applications',
		}, {
			title: 'inputs',
			url: '/inputs',
			icon: 'settings_applications',
		}
	];
}

interface MenuItem {
	title: string;
	url?: string;
	icon?: string;
	children?: MenuItem[];
}
