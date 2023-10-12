import { Roles } from '@iso/constants/Models';

const { user, roleGroup, learner, career, subscriptionPackage, FAQ } = Roles;

const options = [
	{
		key: 'dashboard',
		label: 'sidebar.home',
		leftIcon: 'ion-home',
		withoutDashboard: true,
		isNotRole: true,
	},

	{
		key: 'green-news',
		label: 'Bản tin xanh',
		leftIcon: 'ion-android-calendar',
		isNotRole: true,
	},
	{
		key: 'tree-site',
		label: 'Địa điểm trồng cây',
		leftIcon: 'ion-android-locate',
		isNotRole: true,
	},
	{
		key: 'trees',
		label: 'Cây',
		leftIcon: 'ion-leaf',
		isNotRole: true,
	},

	{
		key: 'tree-type',
		label: 'Loại cây',
		leftIcon: 'ion-ios-rose',
		isNotRole: true,
	},
	{
		key: 'gift',
		label: 'Quà tặng',
		leftIcon: 'ion-cash',
		isNotRole: true,
	},
	{
		key: 'campaign',
		label: 'Chiến dịch',
		leftIcon: 'ion-ios-star',
		isNotRole: true,
	},
	{
		key: 'history-rotation',
		label: 'Lịch sử quay',
		leftIcon: 'ion-help-buoy',
		isNotRole: true,
	},
	{
		key: 'pg',
		label: 'PG',
		leftIcon: 'ion-person',
		isNotRole: true,
	},
	{
		key: 'quizGame',
		label: 'sidebar.quizGame',
		leftIcon: 'ion-ios-game-controller-a',
		children: [
			{
				key: 'question-group',
				label: 'Câu hỏi',
				role: user.list,
			},
			{
				key: 'histories-quiz-game',
				label: 'Lịch sử câu hỏi',
				role: user.list,
			},
		
		],
	},
	// {
	// 	key: 'login-history',
	// 	label: 'Lịch sử truy cập',
	// 	leftIcon: 'ion-person',
	// 	isNotRole: true,
	// },
	{
		key: 'video',
		label: 'Video',
		leftIcon: 'ion-ios-videocam',
		isNotRole: true,
	},
	{
		key: 'systemManagement',
		label: 'sidebar.systemManagement',
		leftIcon: 'ion-android-settings',
		children: [
			{
				key: 'banners',
				label: 'Quản lý ảnh bìa',
				role: roleGroup.list,
			},

			{
				key: 'partners',
				label: 'Quản lý ảnh đối tác',
				role: roleGroup.list,
			},

			{
				key: 'users',
				label: 'sidebar.accounts',
				role: user.list,
			},
			// {
			// 	key: 'roles',
			// 	label: 'sidebar.roles',
			// 	role: roleGroup.list,
			// },
		],
	},
];

export default options;
