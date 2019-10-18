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
					url: '/treatments?type=special'
				}, {
					title: 'active_treatments',
					url: '/treatments?type=active'
				}, {
					title: 'expire_treatments',
					url: '/treatments?type=expire'
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
		}, {
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
