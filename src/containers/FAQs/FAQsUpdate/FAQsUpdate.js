import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Switch, Tabs } from 'antd';
import JoditEditor from 'jodit-react';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import IntlMessages from '@iso/components/utility/intlMessages';
import PageHeader from '@iso/components/utility/pageHeader';
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import FAQActions from '@iso/redux/FAQs/actions';
import Spin from '@iso/ui/Antd/Spin/Spin';
import { ContentWrapper, Label, LabelRequired, Wrapper } from './FAQsUpdate.styles';

const joditConfig = {
	readonly: false,
	minHeight: 300,
	maxHeight: 450,
	uploader: { insertImageAsBase64URI: true },
};
const { getFAQDetail, updateFAQ } = FAQActions;

const { TextArea } = Input;
const { TabPane } = Tabs;

const FAQsUpdate = (props) => {
	//#region define
	const [detail, setDetail] = React.useState({});
	const [saveLoading, setSaveLoading] = React.useState(false);
	const [currTab, setCurrTab] = React.useState(getUrlParam()['tab'] || '1');

	const loading = useSelector((state) => state.FAQ.loading);
	const FAQDetail = useSelector((state) => state.FAQ.FAQDetail);

	const [FaqUpdateForm] = Form.useForm();

	const params = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	// const { getFieldDecorator } = form;
	const { messages } = props.intl;

	const [hasRoleUpdate, setHasRoleUpdate] = React.useState(true);
	const roles = useSelector((state) => state.Account.roles);
	// useEffect(() => {
	// 	var isExist = roles.find((e) => e == Roles.FAQ.edit);
	// 	if (isExist) setHasRoleUpdate(true);
	// }, [roles]);

	useEffect(() => {
		dispatch(getFAQDetail(params.id));
	}, []);

	useEffect(() => {
		setDetail(FAQDetail);
	}, [FAQDetail]);
	//#endregion

	useEffect(() => {
		FaqUpdateForm.setFieldsValue({
			isActive: detail.isActive,
			question: detail.question,
			answer: detail.answer,
			addedStamp: detail.addedStamp,
			changedStamp: detail.changedStamp,
		});
	}, [detail]);

	//#region GENERAL_INFO TAB

	function handlSubmit(values) {
		var model = {
			id: detail.id,
			isActive: values.isActive,
			question: values.question,
			answer: values.answer,
		};
		setSaveLoading(true);
		dispatch(updateFAQ(model, _updateSuccess, _updateError));
	}
	function _updateSuccess() {
		setSaveLoading(false);
		swal({
			title: messages['modal.notify.title.success'],
			text: messages['modal.notify.content.updateSuccess'],
			icon: 'success',
			buttons: [false, messages['modal.label.ok']],
		});
	}
	function _updateError(res) {
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

	//#region Tab
	function onChangeTab(key) {
		setCurrTab(key);
		var model = {
			tab: key,
		};
		history.push(createUrl(model));
	}
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
	const gutter = 16;
	//#endregion

	return (
		<Wrapper>
			<PageHeader>
				<IntlMessages id="faq.page.title.edit" />
			</PageHeader>
			<ContentWrapper>
				<Tabs onChange={onChangeTab} activeKey={currTab}>
					<TabPane tab={messages['industries.tab.generalInfo']} key="1">
						{loading !== true ? (
							<Spin tip={messages['common.label.loading']} spinning={saveLoading}>
								<Form onFinish={handlSubmit} id="FaqUpdateForm" form={FaqUpdateForm}>
									<Row style={rowStyle} gutter={gutter} justify="start">
										<Col xs={24} md={6}>
											<Label>Ngày tạo</Label>
											<Form.Item name="addedStamp">
												<Input disabled size="large" />
											</Form.Item>
										</Col>
										<Col xs={24} md={6}>
											<Label>Ngày chỉnh sửa</Label>
											<Form.Item name="changedStamp">
												<Input disabled size="large" />
											</Form.Item>
										</Col>
									</Row>
									<Row style={rowStyle} gutter={gutter} justify="start">
										<Col md={12} sm={12} xs={24}>
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

											<LabelRequired>
												<IntlMessages id="faq.label.answer" />
											</LabelRequired>
{/* 
{/* 
											<Form.Item name="answer">
												<JoditEditor
													className="content-editor"
													// value={detail.answer || ' '}
													// config={{ ...joditConfig, placeholder: messages["faq.label.answer.placeholder"] }}
													tabIndex={1}
													config={joditConfig}
												/>
											</Form.Item> */}

											<Label style={{ marginTop: '15px' }} className="kgb-form-item-active">
												<IntlMessages id="common.label.activeStatus" />
											</Label>
											<Form.Item name="isActive" valuePropName="checked">
												<Switch />
											</Form.Item>
										</Col>
									</Row>

									<Row style={{ marginTop: '15px', rowStyle }} gutter={gutter} justify="start">
										<Form.Item style={paddingStyle}>
											<Button disabled={hasRoleUpdate ? false : true} form="FaqUpdateForm" size="large" type="primary" htmlType="submit">
												Lưu
											</Button>

											<div className="action-btn-back">
												<span onClick={() => history.goBack()}>
													<ArrowLeftOutlined />
													<IntlMessages id="common.label.back" />
												</span>
											</div>
										</Form.Item>
									</Row>
								</Form>
							</Spin>
						) : (
							<div
								style={{
									minHeight: '150px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Spin />
							</div>
						)}
					</TabPane>
				</Tabs>
			</ContentWrapper>
		</Wrapper>
	);
};

export default injectIntl(FAQsUpdate);
