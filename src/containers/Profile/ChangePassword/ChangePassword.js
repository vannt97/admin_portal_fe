import React, { useEffect, useState } from 'react';
import ChangePasswordStyleWrapper, { ContentWrapper, Label, FormWrap } from './ChangePassword.styles';
import { Form, Input, Row, Col, Button, Upload } from 'antd';
import PageHeader from '@iso/components/utility/pageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import accountActions from '@iso/redux/account/actions';
import authActions from '@iso/redux/auth/actions';
import IntlMessages from '@iso/components/utility/intlMessages';
import { validatePassword } from '@iso/lib/helpers/utility';
import swal from 'sweetalert';
import { PlusOutlined } from '@ant-design/icons';

const { userLoginProfile, changePassword } = accountActions;
const { logout } = authActions;
const domain = process.env.REACT_APP_API_KEY;

function ChangePassword(props) {
	//#region INIT
	const [loading, setLoading] = useState(false);
	const profile = useSelector((state) => state.Account.userLoginProfile);
	const dispatch = useDispatch();
	const { messages } = props.intl;
	const [form] = Form.useForm();

	useEffect(() => {
		dispatch(userLoginProfile());
	}, []);
	//#endregion

	//#region VALIDATE
	function compareToFirstPassword(rule, value) {
		let t = form.getFieldValue('password');
		if (!value || form.getFieldValue('newPassword') === value) {
			return Promise.resolve();
		}
		return Promise.reject('Mật khẩu không trùng khớp!');
	}

	//#enregion

	//#region LOGIC CODE
	function handleSubmit(values) {
		var model = {
			currentPassword: values.currPassword,
			newPassword: values.newPassword,
		};
		setLoading(true);
		dispatch(changePassword(model, _changePwSuccess, _changePwError));
	}
	function _changePwSuccess() {
		setLoading(false);
		swal({
			title: messages['modal.notify.title.success'],
			// text: messages['modal.notify.content.updateSuccess'],
			text: 'Thay đổi mật khẩu thành công. Bạn sẽ được tự động chuyển đến màn hình đăng nhập.',
			icon: 'success',
			buttons: [false, messages['modal.label.ok']],
		});
		setTimeout(() => {
			dispatch(logout());
		}, 5000);
	}
	function _changePwError(res) {
		setLoading(false);
		var err = messages[res] ? messages[res] : messages['modal.notify.content.error'];
		swal({
			title: messages['modal.notify.title.error'],
			text: err,
			icon: 'error',
			buttons: [false, messages['modal.label.ok']],
		});
	}
	//#endregion

	//#region OTHER
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div className="ant-upload-text">
				<IntlMessages id="userMng.label.avatar" />
			</div>
		</div>
	);
	const rowStyle = {
		width: '100%',
		display: 'flex',
		flexFlow: 'row wrap',
	};
	const gutter = 16;
	//#endregion

	return (
		<ChangePasswordStyleWrapper className="kgbChangePasswordPage">
			<PageHeader>
				<IntlMessages id="profileMng.page.changePassword" />
			</PageHeader>
			<ContentWrapper>
				<FormWrap>
					<Form onFinish={handleSubmit} form={form}>
						<Row style={{ ...rowStyle, marginBottom: '25px' }} gutter={gutter} justify="start">
							<Col md={12} sm={12} xs={24}>
								<Upload
									name="avatar"
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									// action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									action={`${domain}/api/Commons/UploadImage`}
									disabled={true}
								>
									{profile.avatarLink ? <img src={profile.avatarLink} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
								</Upload>
								<div className="top-title-avatar">
									<div className="title-block">
										<p className="title-fullname">{profile.fullName} </p>
										<p className="title-sub-email">{profile.email}</p>
										<p className="title-sub-code">{profile.code}</p>
									</div>
								</div>
							</Col>
						</Row>
						<Row style={rowStyle} gutter={gutter} justify="start">
							<Col md={12} sm={12} xs={24}>
								<Label className="kgb-form-item-title kgb-form-item-title-required">
									<IntlMessages id="profileMng.label.currentPassword" />
								</Label>
								<Form.Item name="currPassword" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
									<Input.Password placeholder={messages['profileMng.label.currentPassword']} size="large" />
								</Form.Item>

								<Label className="kgb-form-item-title kgb-form-item-title-required">
									<IntlMessages id="profileMng.label.newPassword" />
								</Label>
								<Form.Item
									name="newPassword"
									rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validatePassword }]}
								>
									<Input.Password placeholder={messages['profileMng.label.newPassword']} size="large" />
								</Form.Item>

								<Label className="kgb-form-item-title kgb-form-item-title-required">
									<IntlMessages id="profileMng.label.confirmPassword" />
								</Label>
								<Form.Item
									name="confirmPassword"
									dependencies={['newPassword']}
									rules={[
										{ required: true, message: messages['common.input.notify.required'] },
										{
											validator: function validatePercent(rule, value, callback) {
												if (!value || form.getFieldValue('newPassword') === value) {
													return Promise.resolve();
												}
												return Promise.reject('Mật khẩu không trùng khớp!');
											},
										},
									]}
									style={{ marginBottom: '15px' }}
								>
									<Input.Password placeholder={messages['profileMng.label.confirmPassword']} size="large" />
								</Form.Item>
							</Col>
							<Col md={24} sm={24} xs={24}>
								<Form.Item>
									<Button size="large" type="primary" htmlType="submit" loading={loading}>
										<IntlMessages id="profileMng.label.save" />
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</FormWrap>
			</ContentWrapper>
		</ChangePasswordStyleWrapper>
	);
}
export default injectIntl(ChangePassword);
