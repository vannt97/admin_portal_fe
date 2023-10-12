import { ArrowLeftOutlined } from '@ant-design/icons';
import IntlMessages from '@iso/components/utility/intlMessages';
import PageHeader from '@iso/components/utility/pageHeader';
// import commonAtions from "@iso/redux/common/actions";
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import PageSize from "@iso/constants/PageSize";
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import { _swError, _swSuccess } from '@iso/lib/helpers/utility';
import careerActions from '@iso/redux/careers/actions';
import { Button, Col, Form, Input, Row, Spin, Switch, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { ContentWrapper, FormWrap, Label, LabelRequired, Wrapper } from './CareerMngUpdate.styles';

const { getCareerDetail, updateCareer } = careerActions;

const { TabPane } = Tabs;

const CareerMngUpdate = (props) => {
	//#region define
	const [detail, setDetail] = useState({});
	const [saveLoading, setSaveLoading] = useState(false);
	const [currTab, setCurrTab] = useState(getUrlParam()['tab'] || '1');

	const { careerDetail, loading } = useSelector((state) => state.Career);

	const params = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { messages } = props.intl;
	const [form] = Form.useForm();

	const [hasCareerUpdate, setHasCareerUpdate] = useState(true);
	const careers = useSelector((state) => state.careers);
	useEffect(() => {
		dispatch(getCareerDetail(params.id));
	}, []);
	useEffect(() => {
		setDetail(careerDetail);

		form.setFieldsValue({
			name: careerDetail.name,
			isActive: careerDetail.isActive,
		});
	}, [careerDetail]);

	//#endregion

	//#region GENERAL_INFO TAB

	function handlSubmit(values) {
		var model = {
			id: detail.id,
			name: values.name,
			isActive: values.isActive,
		};
		setSaveLoading(true);
		dispatch(updateCareer(model, _updateSuccess, _updateError));
	}
	function _updateSuccess() {
		setSaveLoading(false);
		_swSuccess(messages);
	}
	function _updateError(res) {
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
				<IntlMessages id="careermng.form.editCareer" />
			</PageHeader>

			<ContentWrapper>
				<Tabs onChange={onChangeTab} activeKey={currTab}>
					<TabPane tab={messages['careermng.form.tab_detail']} key="1">
						{loading !== true ? (
							<Spin tip={messages['common.label.loading']} spinning={saveLoading}>
								<FormWrap>
									<Form onFinish={handlSubmit} form={form}>
										<Row style={rowStyle} gutter={gutter} justify="start">
											<Col md={12} sm={12} xs={24}>
												<LabelRequired>
													<IntlMessages id="careermng.page.label.nameTitle" />
												</LabelRequired>
												<Form.Item
													name="name"
													rules={[{ required: true, message: messages['common.input.notify.required'] }]}
												>
													<Input placeholder={messages['careermng.page.label.nameTitle']} size="large" />
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
												<Button disabled={hasCareerUpdate ? false : true} size="large" type="primary" htmlType="submit">
													<IntlMessages id="userMng.label.save" />
												</Button>
											</Form.Item>
										</Row>
										<div className="action-btn-back">
											<span
												onClick={() => {
													history.goBack();
												}}
											>
												<ArrowLeftOutlined />
												<IntlMessages id="common.label.back" />
											</span>
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
				</Tabs>
			</ContentWrapper>
		</Wrapper>
	);
};

export default injectIntl(CareerMngUpdate);
