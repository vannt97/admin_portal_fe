// export const Pages = {
//     CREATE: 'CREATE',
//     UPDATE: 'UPDATE',
//     CREATE_TOPIC_SENTENCE: 'CREATE_TOPIC_SENTENCE'
// }
// export const Urls = {
//     SENTENCE: '/dashboard/sentences',
//     TOPIC: '/dashboard/topics'
// }
export const UserModels = {
	status: [
		{ text: 'Hoạt động', value: true },
		{ text: 'Không hoạt động', value: false },
	],
};
export const searchType = [
	{ text: 'Ngày tạo', value: 1 },
	{ text: 'Ngày chỉnh sửa', value: 2 },
];

export const LearnerModels = {
	searchTypeDate: [
		{ text: 'Ngày đăng ký tài khoản', value: 1 },
		{ text: 'Ngày đăng ký gói', value: 2 },
		{ text: 'Ngày hết hạn gói', value: 3 },
	],
	searchSubcriptionDate: [
		{ text: 'Ngày đăng ký', value: 1 },
		{ text: 'Ngày hết hạn', value: 2 },
		{ text: 'Ngày thanh toán', value: 3 },
	],
	statusPayment: [
		{ text: 'Chưa thanh toán', value: false },
		{ text: 'Đã thanh toán', value: true },
	],
};
export const TeacherModels = {
	searchTypeDate: [
		{ text: 'Ngày đăng ký tài khoản', value: 1 },
		{ text: 'Ngày đăng ký gói', value: 2 },
		{ text: 'Ngày hết hạn gói', value: 3 },
	],
	searchSubcriptionDate: [
		{ text: 'Ngày đăng ký', value: 1 },
		{ text: 'Ngày hết hạn', value: 2 },
		{ text: 'Ngày thanh toán', value: 3 },
	],
	statusPayment: [
		{ text: 'Chưa thanh toán', value: false },
		{ text: 'Đã thanh toán', value: true },
	],
};
export const CommonModels = {
	status: [
		{ text: 'Hoạt động', value: true },
		{ text: 'Không hoạt động', value: false },
	],
	orderBy: [
		{ text: 'orderby_add_newest', value: 0 },
		{ text: 'orderby_add_oldest', value: 1 },
		{ text: 'orderby_name_az', value: 2 },
		{ text: 'orderby_name_za', value: 3 },
	],
	sumOrder: {
		name_az: 0,
		name_za: 1,
		add_newest: 2,
		add_oldest: 3,
		update_newest: 4,
		update_oldest: 5,
		code_az: 6,
		code_za: 7,
		email_az: 8,
		email_za: 9,
	},
};
export const LearningQualityModels = {
	timeUnit: [
		{ text: 'Ngày', value: 0 },
		{ text: 'Tuần', value: 1 },
		{ text: 'Tháng', value: 2 },
	],
};

export const DemographicModels = {
	timeUnit: [
		{ text: 'Ngày', value: 0 },
		{ text: 'Tuần', value: 1 },
		{ text: 'Tháng', value: 2 },
		{ text: 'Năm', value: 3 },
	],
};

export const UserStatisticModels = {
	timeUnit: [
		{ text: 'Ngày', value: 0 },
		{ text: 'Tuần', value: 1 },
		{ text: 'Tháng', value: 2 },
		{ text: 'Năm', value: 3 },
	],
	traffic: [{ text: 'Ngày', value: 0 }],
};
export const DashboardModels = {
	filter: [
		{ text: '14 ngày qua', value: 0 },
		{ text: '8 tuần qua', value: 1 },
		{ text: '12 tháng qua', value: 2 },
		{ text: '10 năm qua', value: 3 },
	],
};

export const NotifyModels = {
	types: [
		{ text: 'Thay đổi mật khẩu', value: 1 },
		{ text: 'Đăng ký tài khoản', value: 2 },
		{ text: 'Kích hoạt gói học phí', value: 3 },
		{ text: 'Gói học phí sắp hết hạn', value: 4 },
		{ text: 'Thông báo tự soạn', value: 5 },
	],
};

export const SettingModels = {
	types: [
		{ text: 'Số điện thoại', value: 'PHONE_NUMBER' },
		{ text: 'Tên công ty', value: 'COMPANY_NAME' },
		{ text: 'Tên ngân hàng', value: 'BANK_NAME' },
		{ text: 'Tài khoản ngân hàng', value: 'BANK_ACCOUNT' },
		{ text: 'Người thụ hưởng', value: 'BENEFICIARY' },
		{ text: 'Giới hạn số từ chưa được ôn bao giờ', value: 'LIMIT_VOCAKEY_NOT_REVIEW' },
		{ text: 'Giới hạn số từ đang chờ học', value: 'LIMIT_VOCAKEY_WAITING_FOR_LEARN' },
		{ text: 'Giới hạn số từ được học (lưu) của gói Trial', value: 'LIMIT_TRIAL_VOCAKEYS_ADDED' },
		{ text: 'Giới hạn số câu được học (lưu) của gói Trial', value: 'LIMIT_TRIAL_SENTENCES_ADDED' },
		{ text: 'Giới hạn số câu được hiển thị của gói Trial', value: 'LIMIT_TRIAL_SENTENCES' },
		{ text: 'Ví dụ', value: 'EXAMPLE' },
		{ text: 'Nội dung', value: 'CONTENT' },
	],
};

export const Roles = {
	user: {
		create: 'user_management_create',
		view: 'user_management_view',
		edit: 'user_management_edit',
		delete: 'user_management_delete',
		list: 'user_management_list',
	},
	roleGroup: {
		create: 'group_permission_management_create',
		view: 'group_permission_management_view',
		edit: 'group_permission_management_edit',
		delete: 'group_permission_management_delete',
		list: 'group_permission_management_list',
	},
	career: {
		create: 'career_management_create',
		view: 'career_management_view',
		edit: 'career_management_edit',
		delete: 'career_management_delete',
		list: 'career_management_list',
	},
	topic: {
		create: 'topic_management_create',
		view: 'topic_management_view',
		edit: 'topic_management_edit',
		delete: 'topic_management_delete',
		list: 'topic_management_list',
	},
	learner: {
		create: 'learner_management_create',
		view: 'learner_management_view',
		edit: 'learner_management_edit',
		delete: 'learner_management_delete',
		list: 'learner_management_list',
		subscriptionCreate: 'learner_subscription_management_create',
		subscriptionView: 'learner_subscription_management_view',
		subscriptionEdit: 'learner_subscription_management_edit',
		subscriptionList: 'learner_subscription_management_list',
		learnVocakeyDelete: 'learner_learn_vocakey_management_list',
	},
	subscriptionPackage: {
		create: 'subscription_package_management_create',
		view: 'subscription_package_management_view',
		edit: 'subscription_package_management_edit',
		delete: 'subscription_package_management_delete',
		list: 'subscription_package_management_list',
	},
	FAQ: {
		create: 'faq_management_create',
		view: 'faq_management_view',
		edit: 'faq_management_edit',
		delete: 'faq_management_delete',
		list: 'faq_management_list',
	},
};

export const AddressModels = {
	type: {
		PROVINCE: 1,
		DISTRICT: 2,
		WARD: 3,
	},
};
export const Setting = {
	unit: {
		METTER: 1,
		HOUR: 2,
		BOOL: 3,
		NUMBER: 4,
		TEXT: 5,
	},
};

export const toastMessage = {
	addSuccess: 'Thêm mới thành công',
	addError: 'Thêm mới không thành công',
	updateSuccess: 'Cập nhật thành công',
	updateError: 'Cập nhật không thành công',
	deleteSuccess: 'Xóa thành công',
	deleteError: 'Xóa không thành công',
	exportError: 'Xuất file không thành công',
	importError: 'Tải lên thất bại',
	importSuccess: 'Tải lên và thêm vào dữ liệu thành công',
};
