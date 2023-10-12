import { DeleteOutlined, EditOutlined, FilterFilled } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { CommonModels } from '@iso/constants/Models';
import PageSize from '@iso/constants/PageSize';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import { infoTotal, SWType, _swDeleteError, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import careerActions from '@iso/redux/careers/actions';
import { Button, Col, Divider, Form, Input, Modal, Popconfirm, Row, Select, Spin, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ActionIconWrapper, FormWrap, Label, LabelRequired, SearchWrapper } from './CareerMngList.styles';

const { Search } = Input;
const { Option } = Select;

const { getCareers, createCareer, deleteCareer } = careerActions;
function CareerMngList(props) {
	//#region INIT
	const [search, setSearch] = useState({
		searchText: null,
		status: getUrlParam()['isActive'] || null,
		page: getUrlParam()['page'] ? parseInt(getUrlParam()['page']) : 1,
		limit: getUrlParam()['limit'] ? parseInt(getUrlParam()['limit']) : PageSize.title,
	});
	const [visibleColorPicker, setVisibleColorPicker] = useState(false);
	const [visibleAddModal, setVisibleAddModal] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [setStateColor] = useState('#000000');

	const [hasRole] = useState({ create: true, view: true, delete: true });
	const data = useSelector((state) => state.Career.careers);
	const { loading, totalItems } = useSelector((state) => state.Career);
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const history = useHistory();
	const { messages } = props.intl;

	useEffect(() => {
		getData();
	}, [search.page, search.searchText, search.limit]);

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
		let model = {
			page: search.page,
			limit: search.limit,
			search: search.searchText,
			isActive: search.status,
		};
		history.push(createUrl(model));
		dispatch(getCareers(model));
	}
	function _onFilter() {
		if (search.page !== 1) setSearch({ ...search, page: 1 });
		else getData();
	}

	//#endregion

	//#region TABLE
	const columns = [
		{
			title: <IntlMessages id="careermng.page.label.name" />,
			dataIndex: 'name',
			render: (value) => <span>{value}</span>,
		},
		{
			title: <IntlMessages id="careermng.page.label.status" />,
			dataIndex: 'isActive',
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? messages['common.label.isActive'] : messages['common.label.notActive'];
				return <Tag color={color}>{text}</Tag>;
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
						<Link to={`/dashboard/careers/${record.id}`}>
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

	function handlAddSubmit(values) {
		var model = {
			name: values.name,
			isActive: values.isActive,
		};
		setSaveLoading(true);
		dispatch(createCareer(model, _createSuccess, _createError));
	}
	//#endregion

	//#region DELETE
	function onDelete(id) {
		setSaveLoading(true);
		dispatch(deleteCareer(id, _deleteSuccess, _deleteError));
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
		_swDeleteError(messages, res);
	}
	//#endregion

	//#region Color picker
	// function toggleColorPicker() {
	// 	setVisibleColorPicker(!visibleColorPicker);
	// }

	// function handleChangeColor(color, event) {
	// 	setStateColor(color.hex);
	// }
	// function handleClosePicker() {
	// 	setVisibleColorPicker(!visibleColorPicker);
	// }

	// const cover = {
	// 	position: 'fixed',
	// 	top: '0px',
	// 	right: '0px',
	// 	bottom: '0px',
	// 	left: '0px',
	// 	zIndex: '2',
	// };
	//#endregion

	return (
		<LayoutContentWrapper>
			<PageHeader hasRoleAdd={hasRole.create} handleAdd={handleAddModal}>
				<IntlMessages id="careermng.page.title.list" />
			</PageHeader>
			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row>
						<Col md={10}>
							<Search
								className="kgb-list-search"
								placeholder={messages['common.label.search.searchText']}
								onSearch={_onSearchText}
							/>
						</Col>
						<Col xs={0} md={9}></Col>
						<Col md={5} className="col-filter">
							<Select
								placeholder={messages['careermng.page.label.status']}
								className="kgb-list-select"
								value={search.status || undefined}
								onChange={(value) => _handleSelectFilter('status', value)}
								allowClear
							>
								{CommonModels.status &&
									CommonModels.status.map((item) => (
										<Option value={item.value.toString()} key={item.value}>
											{item.text}
										</Option>
									))}
							</Select>
							<Button className="btn-filter" title={messages['common.label.find']} onClick={_onFilter}>
								<FilterFilled />
							</Button>
						</Col>
					</Row>
				</SearchWrapper>

				<Spin tip={messages['common.label.loading']} spinning={loading}>
					{infoTotal(search.page, search.limit, totalItems)}
					<TableWrapper
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
					title={messages['careermng.form.create.title']}
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
						<Button key="submit" type="primary" form="careerAddForm" htmlType="submit" loading={saveLoading}>
							<IntlMessages id="modal.label.addNew" />
						</Button>,
					]}
				>
					<FormWrap>
						<Form id="careerAddForm" onFinish={handlAddSubmit} form={form}>
							<LabelRequired>
								<IntlMessages id="careermng.page.label.nameTitle" />
							</LabelRequired>
							<Form.Item name="name" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
								<Input placeholder={messages['careermng.page.label.nameTitle']} size="large" />
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
			</TableDemoStyle>
		</LayoutContentWrapper>
	);
}

export default injectIntl(CareerMngList);
