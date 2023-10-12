import { DeleteOutlined, EditOutlined, NotificationOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageSize from '@iso/constants/PageSize';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import moment from 'moment';

import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import {
	formatLocalDateTime,
	infoTotal,
	SWType,
	validateEmail,
	validateName,
	validatePassword,
	validatePhoneNumber,
	_swError,
	_swSuccess,
} from '@iso/lib/helpers/utility';
import commonActions from '@iso/redux/common/actions';
import learnerActions from '@iso/redux/learners/actions';
import ClassicEditor from '@sur97c/ckeditor5-build-classic-font-image-alignment';
import {
	Button,
	Checkbox,
	Col,
	Divider,
	Form,
	Input,
	Modal,
	Popconfirm,
	Radio,
	Row,
	// Select,
	Spin,
	Switch,
	Tag,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CSVLink, CSVDownload } from 'react-csv';
import { ActionIconWrapper, FormWrap, Label, LabelRequired } from './LearnerMngList.styles';
import AdvanceSearch from './LearnerSearch';

// const { Search, TextArea } = Input;
// const { Option } = Select;
const notifyType = {
	NOTIFY: '1',
	EMAIL: '2',
	ALL: '3',
};
const { getLearners, createLearner, deleteLearner, exportAllLearner } = learnerActions;
const {
	getGendersCommon,
	getLanguagesCommon,
	getCareersSelectList,
	getNations,
	getProvinces,
	getDistricts,
	getSubcriptionPackagesSelectListWithTrial,
} = commonActions;
function LearnerMngList(props) {
	//#region INIT
	const btnRef = useRef(null);
	const [search, setSearch] = useState({
		searchText: null,
		status: getUrlParam()['isActivated'] || null,
		searchTypeDate: getUrlParam()['searchTypeDate'] || null,
		gender: getUrlParam()['gender'] || null,
		language: getUrlParam()['language'] || null,
		careerId: getUrlParam()['careerId'] || null,
		nationId: getUrlParam()['nationId'] || null,
		provinceId: getUrlParam()['provinceId'] || null,
		districtId: getUrlParam()['districtId'] || null,
		subcriptionPackageId: getUrlParam()['subcriptionPackageId'] || null,
		page: getUrlParam()['page'] ? parseInt(getUrlParam()['page']) : 1,
		limit: getUrlParam()['limit'] ? parseInt(getUrlParam()['limit']) : PageSize.title,
	});
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [visibleAddModal, setVisibleAddModal] = useState(false);
	const [visibleNotificationModal, setVisibleNotificationModal] = useState(false);
	const [editor, setEditor] = useState(null);
	const [saveLoading, setSaveLoading] = useState(false);
	const [hasRole] = useState({ create: true, view: true, delete: true });
	const data = useSelector((state) => state.Learner.learners);
	const { loading, totalItems, allExport } = useSelector((state) => state.Learner);
	const { genders, languages, careers, nations, provinces, districts, subcriptionPackagesWithTrial } = useSelector((state) => state.Common);
	const [form] = Form.useForm();
	const [notificationForm] = Form.useForm();
	const dispatch = useDispatch();
	const history = useHistory();
	const { messages } = props.intl;
	const [visibleAdvanceSearch, setVisibleAdvanceSearch] = useState(false);
	const [rdValue, setRdValue] = useState(notifyType.NOTIFY);
	const [sendAll, setSendAll] = useState(false);
	const [dataCSV, setDataCSV] = useState({});
	useEffect(() => {
		getData();
	}, [search.page, search.searchText, search.limit]);
	useEffect(() => {
		dispatch(getGendersCommon());
		dispatch(getLanguagesCommon());
		dispatch(getCareersSelectList());
		dispatch(getNations());
		dispatch(getSubcriptionPackagesSelectListWithTrial());
	}, [dispatch]);
	function onChangeNation(value) {
		setSearch({ ...search, nationId: value || null });
		dispatch(getProvinces(value));
		//dispatch(getDistricts(null));
	}
	function onChangeProvince(value) {
		setSearch({ ...search, provinceId: value || null });
		dispatch(getDistricts(value));
	}
	//#region List
	function _onSearchText(value, e) {
		setSearch({ ...search, page: 1, searchText: value });
	}
	const _handleSelectFilter = (name, value) => {
		setSearch({ ...search, [name]: value || null });
	};
	function _onChangePage(page, pageSize) {
		setSearch({ ...search, page: page, limit: pageSize });
	}
	function getData() {
		var model = modelSearch();
		history.push(createUrl(model));
		dispatch(getLearners(model));
	}
	function _onAdvanceSearch() {
		if (search.page !== 1) setSearch({ ...search, page: 1 });
		else getData();
	}
	function modelSearch() {
		var model = {
			page: search.page,
			limit: search.limit,
			// orderBy: search.orderBy,
			search: search.searchText,
			isActivated: search.status,
			gender: search.gender,
			language: search.language,
			careerId: search.careerId,
			nationId: search.nationId,
			provinceId: search.provinceId,
			districtId: search.districtId,
			subcriptionPackageId: search.subcriptionPackageId,
			//yearBirth: search.yearBirth,
			fromYearBirth: search.fromYearBirth,
			toYearBirth: search.toYearBirth,
			searchTypeDate: search.searchTypeDate,
			fromSearchDate: search.fromSearchDate ? new Date(search.fromSearchDate) : undefined,
			toSearchDate: search.toSearchDate ? new Date(search.toSearchDate) : undefined,
		};
		return model;
	}
	const _toggleAdvanceSearch = (e) => {
		setVisibleAdvanceSearch(!visibleAdvanceSearch);
	};
	const _clearFilter = () => {
		setSearch({
			...search,
			page: 1,
			orderBy: null,
			careerId: null,
			language: null,
			gender: null,
			fromYearBirth: null,
			toYearBirth: null,
			status: null,
			nationId: null,
			provinceId: null,
			districtId: null,
			subcriptionPackageId: null,
		});
	};
	//#region TABLE
	const columns = [
		{
			title: <IntlMessages id="learnermng.page.label.code" />,
			fixed: 'left',
			render: (record) => (
				<div>
					<Link to={`/dashboard/learners/${record.id}`}>{record.profile?.code}</Link>
				</div>
			),
		},
		{
			title: <IntlMessages id="learnermng.page.label.name" />,
			render: (record) => <span>{record.profile?.fullName}</span>,
		},
		{
			title: <IntlMessages id="learnermng.page.label.username" />,
			render: (record) => <span>{record.profile?.user?.userName}</span>,
		},
		// {
		//   title: <IntlMessages id="learnermng.page.label.email" />,
		//   render: (record) => <span>{record.profile?.email}</span>
		// },
		{
			title: <IntlMessages id="learnermng.page.label.registerDate" />,
			render: (value, record) => {
				var date = record.profile?.user?.addedStamp ? formatLocalDateTime(record.profile?.user?.addedStamp, 'DD/MM/YYYY') : undefined;
				return (
					<>
						<div>{date}</div>
					</>
				);
			},
		},
		{
			title: <IntlMessages id="learnermng.page.label.status" />,
			dataIndex: 'isActive',
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? messages['common.label.isActive'] : messages['common.label.notActive'];
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: <IntlMessages id="learnermng.page.label.phone" />,
			render: (record) => <span>{record.profile?.phoneNumber}</span>,
		},
		{
			title: <IntlMessages id="learnermng.page.label.dob" />,
			render: (value, record) => {
				var date = record.profile?.dob ? formatLocalDateTime(record.profile?.dob, 'DD/MM/YYYY') : undefined;
				return (
					<>
						<div>{date}</div>
					</>
				);
			},
		},
		{
			title: <IntlMessages id="learnermng.page.label.gender" />,
			render: (record) => <span>{record.profile?.gender}</span>,
		},
		{
			title: <IntlMessages id="learnermng.page.label.career" />,
			render: (record) => <span>{record.profile?.career?.name}</span>,
		},
		{
			title: <IntlMessages id="learnermng.page.label.nation" />,
			render: (record) => <span>{record.profile?.address?.nation}</span>,
		},
		{
			title: <IntlMessages id="common.label.province" />,
			render: (record) => <span>{record.profile?.address?.province}</span>,
		},
		{
			title: <IntlMessages id="common.label.district" />,
			render: (record) => <span>{record.profile?.address?.district}</span>,
		},
		{
			title: <IntlMessages id="learnermng.page.label.language" />,
			render: (record) => <span>{record.profile?.language}</span>,
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.name" />,
			render: (record) => <span>{record.subcriptionPackageName ? record.subcriptionPackageName : 'Trial'}</span>,
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.days" />,
			render: (record) => {
				var days = record.subcriptionPackageDays > 0 ? <span>{record.subcriptionPackageDays}</span> : undefined;
				return (
					<>
						<div>{days}</div>
					</>
				);
			},
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.begin" />,
			render: (value, record) => {
				var date = record.beginDate ? formatLocalDateTime(record.beginDate, 'DD/MM/YYYY') : undefined;
				return (
					<>
						<div>{date}</div>
					</>
				);
			},
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.expired" />,
			render: (value, record) => {
				var date = record.expiredDate ? formatLocalDateTime(record.expiredDate, 'DD/MM/YYYY') : undefined;
				return (
					<>
						<div>{date}</div>
					</>
				);
			},
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.paymentDate" />,
			render: (value, record) => {
				// let color = "#a8a8a8";
				// let text = messages['learnermng.subcription.notPaid'];
				var date = record.paymentDate ? formatLocalDateTime(record.paymentDate, 'DD/MM/YYYY HH:mm:ss') : undefined;
				// <Tag color={color}>{text}</Tag>
				return (
					<>
						<div>{date}</div>
					</>
				);
			},
		},
		{
			// title: <IntlMessages id="common.action.action" />,
			fixed: 'right',
			align: 'center',
			width: '10%',
			render: (text, record) => (
				<ActionIconWrapper>
					{hasRole.view ? (
						<Link to={`/dashboard/learners/${record.id}`}>
							<EditOutlined />
						</Link>
					) : (
						<span className="icon-disable" title={messages['common.label.title.detail']}>
							<EditOutlined />
						</span>
					)}
					{
						// record.canDelete &&
						<>
							<Divider type="vertical" />
							{hasRole.delete ? (
								<Popconfirm
									title={messages['common.notify.areYouSureDelete']}
									okText={messages['common.label.yes']}
									cancelText={messages['common.label.no']}
									onConfirm={() => onDelete(record.id)}
								>
									<DeleteOutlined />
								</Popconfirm>
							) : (
								<span className="icon-disable" title={messages['common.label.title.delete']}>
									<DeleteOutlined />
								</span>
							)}
						</>
					}
				</ActionIconWrapper>
			),
		},
	];
	//#endregion

	//#region ADD NEW
	const handleAddModal = () => {
		form.resetFields();
		setVisibleAddModal(true);
	};
	function toggleAddModal() {
		setVisibleAddModal(!visibleAddModal);
	}

	function _createSuccess() {
		form.resetFields();
		setVisibleAddModal(false);
		setSaveLoading(false);
		_swSuccess(messages, { type: SWType.ADD });
		setTimeout(() => {
			getData();
		}, 1000);
	}
	function _createError(res) {
		setSaveLoading(false);
		_swError(messages, res);
	}

	function handleAddSubmit(values) {
		var model = {
			userName: values.userName,
			email: values.email,
			fullName: values.fullName,
			phoneNumber: values.phoneNumber,
			password: values.password,
			isActive: values.isActive,
		};
		setSaveLoading(true);
		dispatch(createLearner(model, _createSuccess, _createError));
	}
	//#endregion

	//#region DELETE
	function onDelete(id) {
		setSaveLoading(true);
		dispatch(deleteLearner(id, _deleteSuccess, _deleteError));
	}
	function _deleteSuccess() {
		setSaveLoading(false);
		_swSuccess(messages, SWType.DELETE);
		setTimeout(() => {
			getData();
		}, 1000);
	}
	function _deleteError(res) {
		setSaveLoading(false);
		_swError(messages, res);
	}
	//#endregion
	//#region NOTIFICATION
	const rowSelection = {
		selectedRowKeys,
		// onSelectAll: (isSelected) => {
		//   if (isSelected) {
		//     setSendAll(true);
		//   } else
		//     return [];
		// },
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRowKeys(selectedRowKeys);
		},
	};
	const handleNotificationModal = () => {
		notificationForm.resetFields();
		setVisibleNotificationModal(true);
	};
	function toggleNotificaionModal() {
		setVisibleNotificationModal(!visibleNotificationModal);
	}
	function _createSuccess() {
		notificationForm.resetFields();
		setVisibleAddModal(false);
		setSaveLoading(false);
		_swSuccess(messages, { type: SWType.SEND_NOTI });
		setTimeout(() => {
			getData();
			setVisibleNotificationModal(false);
		}, 2000);
	}
	function _createError(res) {
		setSaveLoading(false);
		_swError(messages, res);
	}

	function handleSendNotificationSubmit(values) {
		// var model = {
		// 	title: values.title,
		// 	content: editor,
		// 	ListIds: selectedRowKeys,
		// 	notifyType: rdValue,
		// 	isSendAll: sendAll,
		// 	//1 learner 2 teacher
		// 	userType: 1,
		// 	//
		// 	search: search.searchText,
		// 	isActivated: search.status,
		// 	gender: search.gender,
		// 	language: search.language,
		// 	careerId: search.careerId,
		// 	nationId: search.nationId,
		// 	provinceId: search.provinceId,
		// 	districtId: search.districtId,
		// 	subcriptionPackageId: search.subcriptionPackageId,
		// 	//yearBirth: search.yearBirth,
		// 	fromYearBirth: search.fromYearBirth,
		// 	toYearBirth: search.toYearBirth,
		// 	searchTypeDate: search.searchTypeDate,
		// 	fromSearchDate: search.fromSearchDate ? new Date(search.fromSearchDate) : undefined,
		// 	toSearchDate: search.toSearchDate ? new Date(search.toSearchDate) : undefined,
		// };
		// setSaveLoading(true);
	}
	function onChangeCheckbox(e) {
		if (e.target.checked) setSendAll(true);
		else setSendAll(false);
	}
	const onChangeRadio = (e) => {
		setRdValue(e.target.value);
	};
	const editorConfiguration = {
		minHeight: 500,
	};

	useEffect(() => {
		dispatch(exportAllLearner({}));
	}, []);

	useEffect(() => {
		if (allExport) {
			const arrValues = allExport?.map((all) => {
				return Object.values(all);
			});
			const arrKeys = allExport?.map((all) => {
				return Object.keys(all);
			});
			setDataCSV({
				headers: arrKeys[0],
				data: arrValues,
			});
		}
	}, [allExport]);
	//#endregion

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={hasRole.create}
				handleAdd={handleAddModal}
				isExport
				handleExport={
					<Button className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
						<CSVLink
							data={dataCSV?.data || []}
							headers={dataCSV?.headers || []}
							moment
							filename={`DanhSachHocVien(${moment(Date.now()).format('DD-MM-YYYY')})`}
							style={{ color: '#fff' }}
						>
							Export
						</CSVLink>
					</Button>
				}
			>
				<IntlMessages id="learnermng.page.title.list" />
			</PageHeader>

			<TableDemoStyle className="isoLayoutContent">
				<AdvanceSearch
					search={search}
					_onSearch={_onAdvanceSearch}
					_onSearchText={_onSearchText}
					_handleFilter={_handleSelectFilter}
					messages={messages}
					genders={genders}
					languages={languages}
					careers={careers}
					nations={nations}
					provinces={provinces}
					districts={districts}
					onChangeNation={onChangeNation}
					onChangeProvince={onChangeProvince}
					subcriptionPackages={subcriptionPackagesWithTrial}
					visibleAdvanceSearch={visibleAdvanceSearch}
					_toggleAdvanceSearch={_toggleAdvanceSearch}
					_clearFilter={_clearFilter}
				/>

				<Spin tip={messages['common.label.loading']} spinning={loading}>
					{selectedRowKeys.length > 0 ? (
						<Row style={{ marginTop: '10px' }}>
							<Col md={2}>
								<Button onClick={handleNotificationModal} icon={<NotificationOutlined />}>
									{' '}
									<IntlMessages id="learnermng.page.btn.popupNoti" />
								</Button>
							</Col>
						</Row>
					) : (
						''
					)}

					{infoTotal(search.page, search.limit, totalItems)}
					<TableWrapper
						rowSelection={rowSelection}
						columns={columns}
						dataSource={data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: search.page,
							total: totalItems,
							pageSize: search.limit,
							onChange: _onChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>

				{/* ADD */}
				<Modal
					title={messages['learnermng.form.create.title']}
					visible={visibleAddModal}
					onCancel={toggleAddModal}
					footer={[
						<span
							key="cancel"
							style={{ textDecoration: 'underline', marginRight: '30px', cursor: 'pointer', fontWeight: '500' }}
							onClick={toggleAddModal}
						>
							<IntlMessages id="modal.label._cancel" />
						</span>,
						<Button key="submit" type="primary" form="learnerAddForm" htmlType="submit" loading={saveLoading}>
							<IntlMessages id="modal.label.addNew" />
						</Button>,
					]}
				>
					<FormWrap>
						<Form id="learnerAddForm" onFinish={handleAddSubmit} form={form}>
							<LabelRequired>
								<IntlMessages id="learnermng.page.label.email" />
							</LabelRequired>
							<Form.Item
								name="email"
								rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validateEmail }]}
							>
								<Input placeholder={messages['learnermng.page.label.email']} size="large" />
							</Form.Item>

							<LabelRequired>
								<IntlMessages id="learnermng.page.label.password" />
							</LabelRequired>
							<Form.Item
								name="password"
								rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validatePassword }]}
							>
								<Input.Password placeholder={messages['learnermng.page.label.password']} size="large" />
							</Form.Item>

							<LabelRequired>
								<IntlMessages id="learnermng.page.label.name" />
							</LabelRequired>
							<Form.Item
								name="fullName"
								rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validateName }]}
							>
								<Input placeholder={messages['learnermng.page.label.name']} size="large" />
							</Form.Item>

							<Label>
								<IntlMessages id="learnermng.page.label.phone" />
							</Label>
							<Form.Item name="phoneNumber" rules={[{ validator: validatePhoneNumber }]}>
								<Input placeholder={messages['learnermng.page.label.phone']} size="large" />
							</Form.Item>

							<Label>
								<IntlMessages id="common.label.active" />
							</Label>
							<Form.Item name="isActive" valuePropName="checked">
								<Switch />
							</Form.Item>
						</Form>
					</FormWrap>
				</Modal>

				{/* NOTIFICATION */}
				<Modal
					title={messages['learnermng.page.addNotification']}
					visible={visibleNotificationModal}
					onCancel={toggleNotificaionModal}
					footer={[
						<span
							key="cancel"
							style={{ textDecoration: 'underline', marginRight: '30px', cursor: 'pointer', fontWeight: '500' }}
							onClick={toggleNotificaionModal}
						>
							<IntlMessages id="modal.label._cancel" />
						</span>,
						<Button key="submit" type="primary" form="learnerNotificationForm" htmlType="submit" loading={saveLoading}>
							<IntlMessages id="modal.label.send" />
						</Button>,
					]}
				>
					<FormWrap>
						<Form id="learnerNotificationForm" onFinish={handleSendNotificationSubmit} form={notificationForm}>
							<Row>
								<Col span={14}>
									<LabelRequired>
										<IntlMessages id="learnermng.page.form.title" />
									</LabelRequired>
								</Col>
								<Col span={10}>
									<Checkbox onChange={onChangeCheckbox}>
										<IntlMessages id="learnermng.page.form.sendAll" />
									</Checkbox>
								</Col>
							</Row>
							<Form.Item name="title" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
								<Input placeholder={messages['learnermng.page.form.title']} size="large" />
							</Form.Item>

							<LabelRequired>
								<IntlMessages id="learnermng.page.form.content" />
							</LabelRequired>
							<Form.Item name="content" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
								{/* <Input.TextArea placeholder={messages["learnermng.page.form.content"]} size="large" /> */}
								<CKEditor
									editor={ClassicEditor}
									onChange={(event, editor) => {
										const data = editor.getData();
										setEditor(data);
									}}
									config={editorConfiguration}
								/>
							</Form.Item>
							<Form.Item>
								<Radio.Group onChange={onChangeRadio} value={rdValue}>
									<Radio value={notifyType.NOTIFY}>
										<IntlMessages id="learnermng.page.form.noti" />
									</Radio>
									<Radio value={notifyType.EMAIL}>
										<IntlMessages id="learnermng.page.form.email" />
									</Radio>
								</Radio.Group>
							</Form.Item>
						</Form>
					</FormWrap>
				</Modal>
			</TableDemoStyle>
		</LayoutContentWrapper>
	);
}

export default injectIntl(LearnerMngList);
