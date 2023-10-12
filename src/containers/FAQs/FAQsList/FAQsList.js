import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IntlMessages from '@iso/components/utility/intlMessages';
import { Divider, Spin, Switch, Modal, Input, Form, Button, Row, Col, Select, Tag, Icon, Popconfirm, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { injectIntl } from 'react-intl';
import * as moment from 'moment';
import JoditEditor from 'jodit-react';
import { DeleteOutlined, EditOutlined, NotificationOutlined } from '@ant-design/icons';

import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import FAQsActions from '@iso/redux/FAQs/actions';
import configsActions from '@iso/redux/configs/actions';
import PageSize from '@iso/constants/PageSize';
import { SearchWrapper, FormWrap, Label, LabelRequired, ActionIconWrapper } from './FAQsList.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { CommonModels } from '@iso/constants/Models';
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import { Roles } from '@iso/constants/Models';
import { infoTotal } from '@iso/lib/helpers/utility';

const { Search, TextArea } = Input;
const { Option } = Select;
const { getConfigDetail } = configsActions;
const { getFAQs, deleteFAQ, createFAQ, updateFAQ } = FAQsActions;

const joditConfig = {
	uploader: { insertImageAsBase64URI: true },
};

function FAQsList(props) {
	//#region INIT
	const [search, setSearch] = useState({
		searchText: null,
		isActivated: getUrlParam()['isActivated'] || null,
		page: getUrlParam()['page'] ? parseInt(getUrlParam()['page']) : 1,
		limit: getUrlParam()['limit'] ? parseInt(getUrlParam()['limit']) : PageSize.FAQs,
	});
	const [saveLoading, setSaveLoading] = useState(false);

	const [modal, setModal] = useState({ visible: false, isAdd: true });
	const [detail, setDetail] = useState({ isActivated: false });

	const data = useSelector((state) => state.FAQ.FAQs);
	const { totalItems, loading } = useSelector((state) => state.FAQ);

	const [hasRole, setHasRole] = useState({
		create: true,
		view: true,
		delete: true,
	});
	const { roles } = useSelector((state) => state.Account);
	const [form] = Form.useForm();

	const dispatch = useDispatch();
	const history = useHistory();
	const { messages } = props.intl;

	useEffect(() => {
		getData();
	}, [search.page, search.searchText]);

	useEffect(() => {
		var create = roles.find((e) => e == Roles.FAQ.create);
		var view = roles.find((e) => e == Roles.FAQ.view);
		var del = roles.find((e) => e == Roles.FAQ.delete);
		// setHasRole({ create, view, delete: del });
	}, [roles]);
	//#endregion

	function getData() {
		var model = {
			page: search.page,
			limit: search.limit,
			search: search.searchText,
			isActivated: search.isActivated,
		};
		history.push(createUrl(model));
		dispatch(getFAQs(model));
	}
	function _onFilter() {
		if (search.page !== 1) setSearch({ ...search, page: 1 });
		else getData();
	}

	//#region ONCHANGE
	function _onChangePage(page) {
		setSearch({ ...search, page: page });
	}
	function _onSearchText(value, e) {
		setSearch({ ...search, page: 1, searchText: value });
	}
	const _handleSelectFilter = (name, value) => {
		setSearch({ ...search, [name]: value || null });
	};
	function _onChangeDetail(name, value) {
		setDetail({ ...detail, [name]: value });
	}
	//#endregion

	//#region MODAL
	const handleAddModal = () => {
		// setDetail({})
		dispatch(getConfigDetail('CONTACT_INFO'));
		setModal({ visible: true, isAdd: true });
	};

	function toggleModal() {
		// form.resetFields();
		if (modal.visible) setDetail({});
		setModal({ visible: !modal.visible });
	}
	//#endregion

	//#region DELETE
	function onDelete(id) {
		setSaveLoading(true);
		dispatch(deleteFAQ(id, _deleteSuccess, _deleteError));
	}
	function _deleteSuccess() {
		setSaveLoading(false);
		swal({
			title: messages['modal.notify.title.success'],
			text: messages['modal.notify.content.deleteSuccess'],
			icon: 'success',
			buttons: [false, messages['modal.label.ok']],
		});
		setTimeout(() => {
			getData();
		}, 1000);
	}
	function _deleteError(res) {
		setSaveLoading(false);
		var err = messages[res] ? messages[res] : messages['modal.notify.content.error'];
		swal({
			title: messages['modal.notify.title.error'],
			text: err,
			icon: 'error',
			buttons: [false, messages['modal.label.ok']],
		});
	}
	//#endregion

	//#region ADD || UPDATE
	function handleAddSubmit(values) {
		var body = {
			question: values.question,
			// answer: detail.answer,
			answer: values.answer,
			isActivated: true,
		};
		setSaveLoading(true);
		dispatch(createFAQ(body, _createSuccess, _createError));
	}

	function _createSuccess() {
		form.resetFields();
		setModal({ visible: false });
		setSaveLoading(false);
		setDetail({});
		swal({
			title: messages['modal.notify.title.success'],
			text: messages['modal.notify.content.createSuccess'],
			icon: 'success',
			buttons: [false, messages['modal.label.ok']],
		});
		setTimeout(() => {
			getData();
		}, 1000);
	}

	function _createError(res) {
		var err = messages[res] ? messages[res] : messages['modal.notify.content.error'];
		setSaveLoading(false);
		swal({
			title: messages['modal.notify.title.error'],
			text: err,
			icon: 'error',
			buttons: [false, messages['modal.label.ok']],
		});
	}
	//#endregion

	//#region DATA
	const columns = [
		{
			title: <IntlMessages id="faq.label.question" />,
			dataIndex: 'question',
			ellipsis: 'true',
			width: '40%',
			// render: value => <a style={{ cursor: 'default' }}>{value}</a>,
		},
		{
			title: <IntlMessages id="common.label.status" />,
			dataIndex: 'isActive',
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? messages['common.label.isActive'] : messages['common.label.notActive'];
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Ngày tạo',
			align: 'center',
			render: (record) => <span>{record.addedStamp}</span>,
			sorter: (a, b) =>
				moment(moment(a.addedStamp, 'DD/MM/YYYY')).utc(7).valueOf() - moment(moment(b.addedStamp, 'DD/MM/YYYY')).utc(7).valueOf(),
		},
		{
			title: 'Ngày chỉnh sửa',
			align: 'center',
			render: (record) => <span>{record.changedStamp}</span>,
			sorter: (a, b) =>
				moment(moment(a.changedStamp, 'DD/MM/YYYY')).utc(7).valueOf() - moment(moment(b.changedStamp, 'DD/MM/YYYY')).utc(7).valueOf(),
		},
		{
			// title: <IntlMessages id="common.action.action" />,
			key: 'action',
			width: '10%',
			align: 'center',
			fixed: 'right',
			render: (text, record) => (
				<ActionIconWrapper>
					{hasRole.view ? (
						<Link to={`/dashboard/FAQs/update/${record.id}`}>
							<EditOutlined />
						</Link>
					) : (
						<span className="icon-disable" title={messages['common.label.title.detail']}>
							<Icon type="edit" />
						</span>
					)}
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
				</ActionIconWrapper>
			),
		},
	];
	//#endregion

	return (
		<LayoutContentWrapper>
			<PageHeader hasRoleAdd={hasRole.create} handleAdd={handleAddModal}>
				<IntlMessages id="faq.page.title.list" />
			</PageHeader>
			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row>
						<Col md={10}>
							<Search className="kgb-list-search" placeholder={messages['common.label.search.searchText']} onSearch={_onSearchText} />
						</Col>
						<Col xs={0} md={9}></Col>
						<Col md={5} className="col-filter">
							<Select
								allowClear
								placeholder={messages['common.label.selectbox.status']}
								className="kgb-list-select"
								value={search.isActivated || undefined}
								onChange={(value) => _handleSelectFilter('isActivated', value)}
							>
								{CommonModels.status &&
									CommonModels.status.map((item) => (
										<Option value={item.value.toString()} key={item.value}>
											{item.text}
										</Option>
									))}
							</Select>
							<Button className="btn-filter" title={messages['common.label.find']} onClick={_onFilter}>
								<Icon type="filter" theme="filled" />
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
						}}
					/>
				</Spin>
			</TableDemoStyle>

			{/* ADD */}
			<Modal
				title={messages['faq.page.title.add']}
				visible={modal.visible}
				onCancel={toggleModal}
				footer={[
					<span
						key="cancel"
						style={{ textDecoration: 'underline', marginRight: '30px', cursor: 'pointer', fontWeight: '500' }}
						onClick={toggleModal}
					>
						<IntlMessages id="modal.label._cancel" />
					</span>,
					<Button key="submit" type="primary" form="FaqAddForm" htmlType="submit" loading={saveLoading}>
						<IntlMessages id="modal.label.addNew" />
					</Button>,
				]}
				width="50vw"
			>
				<FormWrap>
					<Form id="FaqAddForm" onFinish={handleAddSubmit} form={form}>
						<LabelRequired>
							<IntlMessages id="faq.label.question" />
						</LabelRequired>
						<Form.Item name="question">
							<TextArea placeholder={messages['faq.label.question']} size="large" rows={4} />
						</Form.Item>

						<LabelRequired>
							<IntlMessages id="faq.label.answer" />
						</LabelRequired>
						<Form.Item name="answer">
							<TextArea placeholder={messages['faq.label.answer']} size="large" rows={4} />
						</Form.Item>

						{/* <Form.Item>
							<Label>
								<IntlMessages id="faq.label.answer" />
							</Label>
							<JoditEditor
								className="content-editor"
								value={detail.answer || ''}
								// config={{ ...joditConfig, placeholder: messages["faq.label.answer.placeholder"] }}
								config={joditConfig}
								onBlur={(content) => _onChangeDetail('answer', content)}
							/>
						</Form.Item> */}
					</Form>
				</FormWrap>
			</Modal>
		</LayoutContentWrapper>
	);
}

export default injectIntl(FAQsList);
