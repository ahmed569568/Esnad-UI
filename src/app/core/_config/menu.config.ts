export class MenuConfig {
	public defaults: Menu = {
		header: {
			self: {},
			items: [
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{section: 'Components'},
				{
					title: 'eCommerce',
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					root: true,
					permission: 'accessToECommerceModule',
					submenu: [
						{
							title: 'Customers',
							page: '/ecommerce/customers'
						},
						{
							title: 'Products',
							page: '/ecommerce/products'
						},
					]
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Users',
							page: '/user-management/users'
						},
						{
							title: 'Roles',
							page: '/user-management/roles'
						}
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}

interface Menu {
	header: {
		self?: any;
		items?: MenuItems[];
	};
	aside?: {
		self?: any;
		items?: MenuItems[];
	};
}

interface MenuItems {
	title?: string;
	root?: boolean;
	alignment?: string;
	icon?: string;
	page?: string;
	translate?: string;
	bullet?: string;
	section?: string;
	permission?: string;
	toggle?: string;
	submenu?: MenuItems[];
}
