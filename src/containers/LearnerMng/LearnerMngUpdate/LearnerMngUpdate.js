import { ArrowLeftOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import IntlMessages from '@iso/components/utility/intlMessages';
import PageHeader from '@iso/components/utility/pageHeader';
import PageSize from '@iso/constants/PageSize';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import {
	formatCurrency,
	formatLocalDateTime,
	infoTotal,
	SWType,
	validateName,
	validatePhoneNumber,
	_swError,
	_swSuccess,
} from '@iso/lib/helpers/utility';
import commonActions from '@iso/redux/common/actions';
import learnerActions from '@iso/redux/learners/actions';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Spin, Switch, Tabs, Tag } from 'antd';
import Axios from 'axios';
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { ActionIconWrapper, ContentWrapper, FormWrap, Label, LabelRequired, SearchWrapper, Wrapper } from './LearnerMngUpdate.styles';
import LearnerMockTestModal from './LearnerMockTestModal';

const { Search } = Input;
const { Option } = Select;
const {
	getLearnerDetail,
	updateLearner,
	createSubcription,
	getSubcriptions,
	getSubcriptionDetail,
	updateSubcription,
	getLearnVocakeys,
	exportLearner,
	getLearnerMockTest,
	getLearnerMockTestDetail,
} = learnerActions;
const {
	getCareersSelectList,
	// getSubcriptionPackagesSelectList,
	getSubcriptionPackagesSelectListByRole,
	getGendersCommon,
	getLanguagesCommon,
	getNations,
	getProvinces,
	getDistricts,
	// getWards,
} = commonActions;

const { TabPane } = Tabs;
const LearnerMngUpdate = (props) => {
	//#region define
	const [detail, setDetail] = useState({});
	const [saveLoading, setSaveLoading] = useState(false);
	const [visibleAddSubcriptionModal, setVisibleAddSubcriptionModal] = useState(false);
	const [visibleEditSubcriptionModal, setVisibleEditSubcriptionModal] = useState(false);
	const [currTab, setCurrTab] = useState(getUrlParam()['tab'] || '1');
	const [hasRole] = useState({ create: true, view: true, delete: true });
	const {
		subcriptions,
		learnerDetail,
		subcriptionDetail,
		loading,
		totalItems,
		export: fileExport,
		learnerMockTestData,
	} = useSelector((state) => state.Learner);
	const dateFormat = 'DD/MM/YYYY';
	const params = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { messages } = props.intl;
	const [formUpdateLearner] = Form.useForm();
	const [formAddSubcription] = Form.useForm();
	const [formUpdateSubcription] = Form.useForm();
	const { careers, subcriptionPackages, genders, languages, nations, provinces, districts, wards } = useSelector((state) => state.Common);
	const [hasLearnerUpdate, setHasLearnerUpdate] = useState(true);
	// const [hasSubcriptionUpdate, setHasSubcriptionUpdate] = useState(true);
	const [querySearchSubcriptions, setQuerySearchSubcriptions] = useState({
		search: getUrlParam()['search'],
		//status: getUrlParam()["isActivated"] || null,
		page: getUrlParam()['page'] ? parseInt(getUrlParam()['page']) : 1,
		limit: getUrlParam()['limit'] ? parseInt(getUrlParam()['limit']) : PageSize.title,
	});

	const [queryMockTest, setQueryMockTest] = useState({
		search: getUrlParam()['search'],
		//status: getUrlParam()["isActivated"] || null,
		page: getUrlParam()['page'] ? parseInt(getUrlParam()['page']) : 1,
		limit: getUrlParam()['limit'] ? parseInt(getUrlParam()['limit']) : PageSize.title,
	});
	const [isVisibleMockTest, setIsVisibleMockTest] = useState(false);

	useEffect(() => {
		dispatch(getCareersSelectList());
		dispatch(getSubcriptionPackagesSelectListByRole({ subcriptionType: 1 }));
		dispatch(getGendersCommon());
		dispatch(getLanguagesCommon());
		dispatch(getNations());
		dispatch(getLearnerMockTest(params.id));
		dispatch(getLearnerDetail(params.id));
	}, []);

	useEffect(() => {
		setDetail(learnerDetail);
		formUpdateLearner.setFieldsValue({
			fullName: learnerDetail.fullName,
			email: learnerDetail.email,
			dob: learnerDetail.dob ? moment(new Date(learnerDetail.dob), 'DD/MM/YYYY HH:mm:ss') : undefined,
			gender: learnerDetail.gender,
			phoneNumber: learnerDetail.phoneNumber,
			userName: learnerDetail.userName,
			code: learnerDetail.code,
			addedStamp: learnerDetail.addedStamp ? formatLocalDateTime(learnerDetail.addedStamp, dateFormat) : undefined,
			isActive: learnerDetail.isActive,
			careerId: learnerDetail.careerId,
			language: learnerDetail.language,
			nationId: learnerDetail.nationId,
			provinceId: learnerDetail.provinceId,
			districtId: learnerDetail.districtId,
			// wardId: learnerDetail.wardId,
		});
		if (learnerDetail.nationId) dispatch(getProvinces(learnerDetail.nationId));
		if (learnerDetail.provinceId) dispatch(getDistricts(learnerDetail.provinceId));
		// if (learnerDetail.districtId)
		//   dispatch(getWards(learnerDetail.wardId));
	}, [learnerDetail]);
	//#endregion
	//#region GENERAL_INFO TAB
	function handleSubmit(values) {
		if (currTab == 1) {
			let model = {
				...detail,
				...{
					fullName: values.fullName,
					isActive: values.isActive,
				},
			};
			setSaveLoading(true);

			dispatch(updateLearner(model, _updateLearnerSuccess, _updateLearnerError));
		} else if (currTab == 2) {
			let model = {
				...detail,
				...{
					phoneNumber: values.phoneNumber,
					dob: values.dob ? formatLocalDateTime(values.dob, 'MM/DD/YYYY') : null,
					careerId: values.careerId,
					gender: values.gender,
					language: values.language,
					nationId: values.nationId,
					provinceId: values.provinceId,
					districtId: values.districtId,
					//wardId: values.wardId
				},
			};

			setSaveLoading(true);
			dispatch(updateLearner(model, _updateLearnerSuccess, _updateLearnerError));
		} else if (currTab === '4') {
		}
	}
	function _updateLearnerSuccess() {
		setSaveLoading(false);
		_swSuccess(messages);
		// setTimeout(() => {
		//   history.push('/dashboard/learners');
		// }, 2000);
	}
	function _updateLearnerError(res) {
		setSaveLoading(false);
		_swError(messages, res);
	}
	//#endregion

	//#region Tab
	function onChangeTab(key) {
		setCurrTab(key);
		var model = {
			tab: key,
		};
		history.push(createUrl(model));
		// switch (key) {
		//   case "3":
		//     handleGetSubcriptions();
		//     break;
		//   default: break;
		// }
	}
	function onChangeNation(value) {
		formUpdateLearner.resetFields(['provinceId', 'districtId']);
		dispatch(getProvinces(value));
		dispatch(getDistricts(null));
	}
	function onChangeProvince(value) {
		formUpdateLearner.resetFields(['districtId']);
		dispatch(getDistricts(value));
	}
	// function onChangeDistrict(value) {
	//   dispatch(getWards(value));
	// }
	//#endregion
	//#region Style - other
	const rowStyle = {
		width: '100%',
		display: 'flex',
		flexFlow: 'row wrap',
	};
	const paddingStyle = {
		paddingLeft: '8px',
		paddingRight: '8px',
	};
	const inputReadOnly = {
		backgroundColor: '#f9f9f9',
	};
	const gutter = 16;
	//#endregion
	//#region ADD NEW SUBCRIPTION
	const handleAddSubcriptionModal = () => {
		formAddSubcription.resetFields();
		setVisibleAddSubcriptionModal(true);
	};
	function toggleAddSubcriptionModal() {
		setVisibleAddSubcriptionModal(!visibleAddSubcriptionModal);
	}

	function _createSuccess() {
		formAddSubcription.resetFields();
		setVisibleAddSubcriptionModal(false);
		setSaveLoading(false);
		_swSuccess(messages, { type: SWType.ADD });
		setTimeout(() => {
			handleGetSubcriptions();
			dispatch(getLearnerDetail(params.id));
		}, 1000);
	}
	function _createError(res) {
		setSaveLoading(false);
		_swError(messages, res);
	}

	function handleAddSubcriptionSubmit(values) {
		var model = {
			subcriptionPackageId: values.subcriptionPackageId,
			comment: values.comment,
			isPaid: !values.isPaid ? false : values.isPaid,
			isActive: !values.isActive ? false : values.isActive,
		};
		setSaveLoading(true);
		dispatch(createSubcription(model, params.id, _createSuccess, _createError));
	}
	//#endregion

	useEffect(() => {
		setDetail(subcriptionDetail);
		formUpdateSubcription.setFieldsValue({
			isPaid: subcriptionDetail.isPaid,
			isActive: subcriptionDetail.isActive,
			comment: subcriptionDetail.comment,
		});
	}, [subcriptionDetail]);
	//#region EDIT SUBCRIPTION
	const handleEditSubcriptionModal = (value) => {
		dispatch(getSubcriptionDetail(value));
		//handleGetSubcriptions();
		setVisibleEditSubcriptionModal(true);
	};
	function toggleEditSubcriptionModal() {
		setVisibleEditSubcriptionModal(!visibleEditSubcriptionModal);
	}

	function _updateSubcriptionSuccess() {
		setSaveLoading(false);
		_swSuccess(messages);
		setTimeout(() => {
			handleGetSubcriptions();
			dispatch(getSubcriptionDetail(detail.id));
		}, 1000);
	}
	function _updateSubcriptionError(res) {
		setSaveLoading(false);
		_swError(messages, res);
	}

	function handleEditSubcriptionSubmit(values) {
		var model = {
			id: detail.id,
			isPaid: values.isPaid,
			isActive: values.isActive,
			comment: values.comment,
		};
		setSaveLoading(true);
		dispatch(updateSubcription(model, _updateSubcriptionSuccess, _updateSubcriptionError));
	}
	//#endregion

	//#region LIST SUBCRIPTIONS
	useEffect(() => {
		handleGetSubcriptions();
	}, [querySearchSubcriptions.page, querySearchSubcriptions.search, querySearchSubcriptions.limit]);
	function handleGetSubcriptions() {
		let model = {
			page: querySearchSubcriptions.page,
			limit: querySearchSubcriptions.limit,
			search: querySearchSubcriptions.search,
			//isActivated: search.status
		};
		history.push(createUrl(model));
		dispatch(getSubcriptions(model, params.id));
	}

	function _onSearchTextSubcriptions(value, e) {
		setQuerySearchSubcriptions({ ...querySearchSubcriptions, page: 1, search: value });
	}
	function _onChangePageSubcriptions(page, pageSize) {
		setQuerySearchSubcriptions({ ...querySearchSubcriptions, page: page, limit: pageSize });
	}
	function _onChangePageMockTest(page, pageSize) {
		setQueryMockTest({ ...querySearchSubcriptions, page: page, limit: pageSize });
	}
	//#endregion

	//#region tableSubcriptions
	const columnSubcriptions = [
		{
			title: <IntlMessages id="learnermng.subcription.label.name" />,
			fixed: 'left',
			render: (record) => <span>{record.subcriptionPackageName}</span>,
		},
		{
			align: 'center',
			title: <IntlMessages id="learnermng.subcription.label.days" />,
			render: (record) => <span>{record.subcriptionPackageDays}</span>,
		},
		{
			align: 'center',
			title: <IntlMessages id="learnermng.subcription.label.price" />,
			render: (record) => (
				<p>
					<span>{formatCurrency(record?.subcriptionPackagePrice)}</span>
				</p>
			),
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.request" />,
			render: (value, record) => {
				var date = record.addedStamp ? formatLocalDateTime(record.addedStamp, 'DD/MM/YYYY HH:mm:ss') : undefined;
				return (
					<>
						<div>{date}</div>
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
			title: <IntlMessages id="learnermng.subcription.label.payment" />,
			dataIndex: 'isPaid',
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? messages['learnermng.subcription.paid'] : messages['learnermng.subcription.notPaid'];
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.paymentDate" />,
			render: (value, record) => {
				var date = record.paymentDate ? formatLocalDateTime(record.paymentDate, 'DD/MM/YYYY HH:mm:ss') : undefined;
				return (
					<>
						<div>{date}</div>
					</>
				);
			},
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.paymentStatus" />,
			dataIndex: 'isExpired',
			render: (value) => {
				let color = value ? '#FF3300' : '#a8a8a8';
				let text = value ? messages['common.label.isExpired'] : messages['common.label.notExpired'];
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: <IntlMessages id="learnermng.subcription.label.status" />,
			dataIndex: 'isActive',
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? messages['common.label.isActivePayment'] : messages['common.label.notActivePayment'];
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: <IntlMessages id="learnermng.comment_subpack" />,
			render: (record) => <span>{record.comment}</span>,
		},
		{
			fixed: 'right',
			align: 'center',
			title: <IntlMessages id="learnermng.edit_subcription" />,
			render: (text, record) => (
				<ActionIconWrapper>
					{hasRole.view ? (
						!record.isExpired ? (
							<Link onClick={() => handleEditSubcriptionModal(record.id)}>
								<EditOutlined />
							</Link>
						) : (
							<span className="icon-disable" title={messages['common.label.title.detail']}>
								<EditOutlined />
							</span>
						)
					) : (
						<span className="icon-disable" title={messages['common.label.title.detail']}>
							<EditOutlined />
						</span>
					)}
					{
						//record.canDelete &&
						<>
							{/* <Divider type="vertical" />
              {
                hasRole.delete
                  ? <Popconfirm
                    title={messages['common.notify.areYouSureDelete']}
                    okText={messages['common.label.yes']}
                    cancelText={messages['common.label.no']}
                    onConfirm={() => onDelete(record.id)}>
                    <DeleteOutlined />
                  </Popconfirm>
                  : <span className="icon-disable" title={messages['common.label.title.delete']}><DeleteOutlined /></span>
              } */}
						</>
					}
				</ActionIconWrapper>
			),
		},
	];
	const columnMockTest = [
		{
			title: 'Thứ tự',
			dataIndex: 'order',
		},
		{
			title: 'Tên',
			dataIndex: 'name',
		},
		{
			title: 'Kết quả',
			dataIndex: 'result',
		},
		{
			title: 'Thời gian',
			dataIndex: 'time',
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'isTestCompleted',
			render: (value) => {
				return value ? <Tag color={'#00B16A'}>Đã hoàn thành</Tag> : <Tag color={'#a8a8a8'}>Chưa hoàn thành</Tag>;
			},
		},
		{
			fixed: 'right',
			align: 'center',
			title: <IntlMessages id="learnermng.edit_subcription" />,
			render: (text, record) => (
				<ActionIconWrapper>
					{hasRole.view ? (
						!record.isExpired ? (
							<Link onClick={() => handleOpenMockTestDetail(record)}>
								<EditOutlined />
							</Link>
						) : (
							<span className="icon-disable" title={messages['common.label.title.detail']}>
								<EditOutlined />
							</span>
						)
					) : (
						<span className="icon-disable" title={messages['common.label.title.detail']}>
							<EditOutlined />
						</span>
					)}
				</ActionIconWrapper>
			),
		},
	];
	//#endregion
	function handleDatePickerChange(date, dateString) {}
	//#region table LearnVocakeys

	const downloadCSV = async () => {
		dispatch(
			exportLearner({
				id: params.id,
				name: formUpdateLearner.getFieldValue('fullName'),
				date: moment(Date.now()).format('DD-MM-YYYY'),
			})
		);
	};

	const handleOpenMockTestDetail = (record) => {
		setIsVisibleMockTest(true);
		dispatch(
			getLearnerMockTestDetail({
				learnerId: record.learnerId,
				learningTestExamId: record.learningTestExamId,
			})
		);
	};

	//#endregion
	return (
		<Wrapper>
			<PageHeader>
				<IntlMessages id="learnermng.form.editLearner" />
				<Button onClick={() => downloadCSV()} size="large" type="primary">
					Export
				</Button>
			</PageHeader>
			<ContentWrapper>
				<Tabs onChange={onChangeTab} activeKey={currTab}>
					<TabPane tab={messages['learnermng.form.tab_account']} key="1">
						{loading !== true ? (
							<Spin tip={messages['common.label.loading']} spinning={saveLoading}>
								<FormWrap>
									<Form onFinish={handleSubmit} form={formUpdateLearner}>
										<Row style={rowStyle} gutter={gutter} justify="start">
											<Col md={12} sm={12} xs={24}>
												<LabelRequired>
													<IntlMessages id="learnermng.page.label.code" />
												</LabelRequired>
												<Form.Item name="code">
													<Input placeholder={messages['learnermng.page.label.code']} style={inputReadOnly} size="large" readOnly />
												</Form.Item>

												<LabelRequired>
													<IntlMessages id="learnermng.page.label.username" />
												</LabelRequired>
												<Form.Item name="userName">
													<Input placeholder={messages['learnermng.page.label.username']} style={inputReadOnly} size="large" readOnly />
												</Form.Item>

												{/* <LabelRequired><IntlMessages id="learnermng.page.label.email" /></LabelRequired>
                        <Form.Item
                          name="email"
                          rules={[
                            { required: true, message: messages['common.input.notify.required'] },
                            { validator: validateEmail }
                          ]}
                        >
                          <Input placeholder={messages['learnermng.page.label.email']} style={inputReadOnly} size="large" readOnly />
                        </Form.Item> */}
												<LabelRequired>
													<IntlMessages id="learnermng.page.label.name" />
												</LabelRequired>
												<Form.Item
													name="fullName"
													rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validateName }]}
												>
													<Input placeholder={messages['learnermng.page.label.name']} size="large" />
												</Form.Item>
												<LabelRequired>
													<IntlMessages id="learnermng.page.label.registerDate" />
												</LabelRequired>
												<Form.Item name="addedStamp">
													<Input placeholder={messages['learnermng.page.registerDate']} style={inputReadOnly} size="large" readOnly />
												</Form.Item>

												<Label className="kgb-form-item-active">
													<IntlMessages id="common.label.activeStatus" />
												</Label>
												<Form.Item name="isActive" valuePropName="checked">
													<Switch />
												</Form.Item>
											</Col>
										</Row>

										<Row style={{ marginTop: '10px', rowStyle }} gutter={gutter} justify="start">
											<Form.Item style={paddingStyle}>
												<Button disabled={hasLearnerUpdate ? false : true} size="large" type="primary" htmlType="submit">
													<IntlMessages id="userMng.label.save" />
												</Button>
											</Form.Item>
											<Form.Item style={paddingStyle}>
												<Button onClick={() => downloadCSV()} size="large" type="primary">
													Xuất Excel
												</Button>
											</Form.Item>
										</Row>
										<div className="action-btn-back">
											<Link to={`/dashboard/learners`}>
												<ArrowLeftOutlined />
												<IntlMessages id="common.label.back" />
											</Link>
										</div>
									</Form>
								</FormWrap>
							</Spin>
						) : (
							<div className="main-loading">
								<Spin />
							</div>
						)}
					</TabPane>
					<TabPane tab={messages['learnermng.form.tab_profile']} key="2">
						{loading !== true ? (
							<Spin tip={messages['common.label.loading']} spinning={saveLoading}>
								<FormWrap>
									<Form onFinish={handleSubmit} form={formUpdateLearner}>
										<Row style={rowStyle} gutter={gutter} justify="start">
											<Col md={12} sm={12} xs={24}>
												<Label>
													<IntlMessages id="learnermng.page.label.dob" />
												</Label>
												<Form.Item name="dob">
													<DatePicker
														size="large"
														placeholder="01/01/1996"
														picker="date"
														//showTime={{ defaultValue: moment(getTimeZoneLocal()) }} showNow={false}
														//onChange={{}}
														onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
														format={dateFormat}
														style={{ width: '100%' }}
													/>
												</Form.Item>

												<Label>
													<IntlMessages id="learnermng.page.label.gender" />
												</Label>
												<Form.Item name="gender">
													<Select
														placeholder={messages['learnermng.page.label.gender']}
														className="kgb-list-select"
														size="large"
														showSearch
														optionFilterProp="children"
														filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
													>
														{genders &&
															genders.map((item, index) => (
																<Option value={item.id} key={index}>
																	{item.name}
																</Option>
															))}
													</Select>
												</Form.Item>

												<Label>
													<IntlMessages id="learnermng.page.label.career" />
												</Label>
												<Form.Item name="careerId">
													<Select
														placeholder={messages['learnermng.page.label.career']}
														className="kgb-list-select"
														size="large"
														showSearch
														optionFilterProp="children"
														filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
													>
														{careers &&
															careers.map((item, index) => (
																<Option value={item.id} key={index}>
																	{item.name}
																</Option>
															))}
													</Select>
												</Form.Item>

												<Label>
													<IntlMessages id="learnermng.page.label.phone" />
												</Label>
												<Form.Item name="phoneNumber" rules={[{ validator: validatePhoneNumber }]}>
													<Input placeholder={messages['learnermng.page.label.phone']} size="large" />
												</Form.Item>
											</Col>
											{/* Right */}
											<Col md={12} sm={12} xs={24}>
												<Label>
													<IntlMessages id="common.label.nation" />
												</Label>
												<Form.Item name="nationId">
													<Select
														placeholder={messages['common.label.nation.placeholder']}
														className="kgb-list-select"
														size="large"
														showSearch
														optionFilterProp="children"
														filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
														onChange={onChangeNation}
													>
														{nations &&
															nations.map((item, index) => (
																<Option value={item.id} key={index}>
																	{item.name}
																</Option>
															))}
													</Select>
												</Form.Item>

												<Label>
													<IntlMessages id="common.label.province" />
												</Label>
												<Form.Item name="provinceId">
													<Select
														placeholder={messages['common.label.province.placeholder']}
														className="kgb-list-select"
														size="large"
														showSearch
														optionFilterProp="children"
														filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
														onChange={onChangeProvince}
													>
														{provinces &&
															provinces.map((item, index) => (
																<Option value={item.id} key={index}>
																	{item.name}
																</Option>
															))}
													</Select>
												</Form.Item>

												<Label>
													<IntlMessages id="common.label.district" />
												</Label>
												<Form.Item name="districtId">
													<Select
														placeholder={messages['common.label.district.placeholder']}
														className="kgb-list-select"
														size="large"
														showSearch
														optionFilterProp="children"
														filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
														// onChange={onChangeDistrict}
													>
														{districts &&
															districts.map((item, index) => (
																<Option value={item.id} key={index}>
																	{item.name}
																</Option>
															))}
													</Select>
												</Form.Item>

												{/* <Label><IntlMessages id="common.label.ward" /></Label>
                        <Form.Item
                          name="wardId"
                        >
                          <Select placeholder={messages['common.label.ward.placeholder']} className="kgb-list-select" size="large"
                            showSearch optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {wards && wards.map((item, index) => (
                              <Option value={item.id} key={index}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item> */}

												<Label>
													<IntlMessages id="learnermng.page.label.language" />
												</Label>
												<Form.Item name="language">
													<Select
														placeholder={messages['learnermng.page.label.language']}
														className="kgb-list-select"
														size="large"
														showSearch
														optionFilterProp="children"
														filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
													>
														{languages &&
															languages.map((item, index) => (
																<Option value={item.id} key={index}>
																	{item.name}
																</Option>
															))}
													</Select>
												</Form.Item>
											</Col>
										</Row>

										<Row style={{ marginTop: '10px', rowStyle }} gutter={gutter} justify="start">
											<Form.Item style={paddingStyle}>
												<Button disabled={hasLearnerUpdate ? false : true} size="large" type="primary" htmlType="submit">
													<IntlMessages id="userMng.label.save" />
												</Button>
											</Form.Item>
										</Row>
										<div className="action-btn-back">
											<Link to={`/dashboard/learners`}>
												<ArrowLeftOutlined />
												<IntlMessages id="common.label.back" />
											</Link>
										</div>
									</Form>
								</FormWrap>
							</Spin>
						) : (
							<div className="main-loading">
								<Spin />
							</div>
						)}
					</TabPane>
					<TabPane tab={messages['learnermng.form.tab_subcription']} key="3">
						<SearchWrapper>
							<Row>
								<Col span={10}>
									<Search
										className="kgb-list-search"
										placeholder={messages['common.label.search.searchText']}
										onSearch={_onSearchTextSubcriptions}
									/>
								</Col>
								<Col span={9}></Col>
								<Col span={5}>
									<Button type="primary" icon={<PlusOutlined />} onClick={handleAddSubcriptionModal} style={{ float: 'right' }}>
										<IntlMessages id="learnermng.add_subcription" />
									</Button>
								</Col>
							</Row>
						</SearchWrapper>
						<Spin tip={messages['common.label.loading']} spinning={loading}>
							{infoTotal(querySearchSubcriptions.page, querySearchSubcriptions.limit, totalItems)}
							<TableWrapper
								columns={columnSubcriptions}
								dataSource={subcriptions}
								rowKey="code"
								className="isoCustomizedTable"
								pagination={{
									current: querySearchSubcriptions.page,
									total: totalItems,
									pageSize: querySearchSubcriptions.limit,
									onChange: _onChangePageSubcriptions,
									showSizeChanger: true,
								}}
							/>
						</Spin>
						<div className="action-btn-back">
							<Link to={`/dashboard/learners`}>
								<ArrowLeftOutlined />
								<IntlMessages id="common.label.back" />
							</Link>
						</div>
					</TabPane>
					<TabPane tab={'Chi tiết Mock Test'} key="4">
						<Spin tip={messages['common.label.loading']} spinning={loading}>
							{infoTotal(queryMockTest.page, queryMockTest.limit, learnerMockTestData?.length)}
							<TableWrapper
								columns={columnMockTest}
								dataSource={learnerMockTestData}
								// rowKey="code"
								className="isoCustomizedTable"
								pagination={{
									current: queryMockTest.page,
									total: learnerMockTestData?.length,
									pageSize: queryMockTest.limit,
									onChange: _onChangePageMockTest,
									showSizeChanger: true,
								}}
							/>
						</Spin>
						<div className="action-btn-back">
							<Link to={`/dashboard/learners`}>
								<ArrowLeftOutlined />
								<IntlMessages id="common.label.back" />
							</Link>
						</div>
					</TabPane>
				</Tabs>

				{/* ADD SUBCRIPTION*/}
				<Modal
					title={messages['learnermng.add_subcription']}
					visible={visibleAddSubcriptionModal}
					onCancel={toggleAddSubcriptionModal}
					footer={[
						<span
							key="cancel"
							style={{ textDecoration: 'underline', marginRight: '30px', cursor: 'pointer', fontWeight: '500' }}
							onClick={toggleAddSubcriptionModal}
						>
							<IntlMessages id="modal.label._cancel" />
						</span>,
						<Button key="submit" type="primary" form="learnerAddSubcriptionForm" htmlType="submit" loading={saveLoading}>
							<IntlMessages id="modal.label.addNew" />
						</Button>,
					]}
				>
					<FormWrap>
						<Form id="learnerAddSubcriptionForm" onFinish={handleAddSubcriptionSubmit} form={formAddSubcription}>
							<LabelRequired>
								<IntlMessages id="learnermng.choose_subpack" />
							</LabelRequired>
							<Form.Item name="subcriptionPackageId" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
								<Select
									placeholder={messages['learnermng.choose_subpack']}
									className="kgb-list-select"
									size="large"
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
								>
									{subcriptionPackages &&
										subcriptionPackages.map((item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										))}
								</Select>
							</Form.Item>
							<Label>
								<IntlMessages id="learnermng.comment_subpack" />
							</Label>
							<Form.Item name="comment">
								<Input.TextArea placeholder={messages['learnermng.comment_subpack']} size="large" />
							</Form.Item>
							<Row style={rowStyle} gutter={gutter} justify="start">
								<Col md={12} sm={12} xs={24}>
									<Label className="kgb-form-item-active">
										<IntlMessages id="learnermng.subcription.label.payment" />
									</Label>
									<Form.Item name="isPaid" valuePropName="checked">
										<Switch />
									</Form.Item>
								</Col>
								<Col md={12} sm={12} xs={24}>
									<Label>
										<IntlMessages id="common.label.active" />
									</Label>
									<Form.Item name="isActive" valuePropName="checked">
										<Switch />
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</FormWrap>
				</Modal>
				{/* EDIT SUBCRIPTION*/}
				<Modal
					title={messages['learnermng.edit_subcription']}
					visible={visibleEditSubcriptionModal}
					onCancel={toggleEditSubcriptionModal}
					footer={[
						<span
							key="cancel"
							style={{ textDecoration: 'underline', marginRight: '30px', cursor: 'pointer', fontWeight: '500' }}
							onClick={toggleEditSubcriptionModal}
						>
							<IntlMessages id="modal.label._cancel" />
						</span>,
						<Button key="submit" type="primary" form="learnerEditSubcriptionForm" htmlType="submit" loading={saveLoading}>
							<IntlMessages id="userMng.label.save" />
						</Button>,
					]}
				>
					<FormWrap>
						<Form id="learnerEditSubcriptionForm" onFinish={handleEditSubcriptionSubmit} form={formUpdateSubcription}>
							<Label>
								<IntlMessages id="learnermng.comment_subpack" />
							</Label>
							<Form.Item name="comment">
								<Input.TextArea placeholder={messages['learnermng.comment_subpack']} size="large" />
							</Form.Item>
							<Row style={rowStyle} gutter={gutter} justify="start">
								<Col md={12} sm={12} xs={24}>
									<Label className="kgb-form-item-active">
										<IntlMessages id="learnermng.subcription.label.payment" />
									</Label>
									<Form.Item name="isPaid" valuePropName="checked">
										{/* <Checkbox /> */}
										<Switch />
									</Form.Item>
								</Col>
								<Col md={12} sm={12} xs={24}>
									<Label>
										<IntlMessages id="common.label.active" />
									</Label>
									<Form.Item name="isActive" valuePropName="checked">
										<Switch />
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</FormWrap>
				</Modal>
			</ContentWrapper>
			<LearnerMockTestModal isVisibleMockTest={isVisibleMockTest} onSetIsVisibleMockTest={setIsVisibleMockTest} />
		</Wrapper>
	);
};

export default injectIntl(LearnerMngUpdate);
