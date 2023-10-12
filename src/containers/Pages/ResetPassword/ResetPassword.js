import Alert from '@iso/components/Feedback/Alert';
// import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import { getUrlParam } from '@iso/lib/helpers/url_handler';
import { validatePassword } from '@iso/lib/helpers/utility';
import authAction from '@iso/redux/auth/actions';
import {
  Form,
  Input
} from 'antd';
import React from 'react';
import { injectIntl } from "react-intl";
import { useDispatch } from 'react-redux';
import {
  useHistory, useParams
} from 'react-router';
import { Link } from 'react-router-dom';
import ResetPasswordStyleWrapper, { Label } from './ResetPassword.styles';

const { checkTokenResetPassword, resetPassword } = authAction;

function ResetPassword(props) {
  const [loading, setLoading] = React.useState(false);
  const [resetPwSuccessNotify, setResetPwSuccessNotify] = React.useState(null);
  const [resetPwErrorNotify, setResetPwErrorNotify] = React.useState(null);
  const { messages } = props.intl;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const params = useParams();
  const history = useHistory();
  const alertStyle = { marginTop: '10px', fontSize: '14px' };

  React.useEffect(() => {
    var model = {
      token: getUrlParam()['token'] || null,
      userName: getUrlParam()['email'] || null,
    };
    dispatch(checkTokenResetPassword(model, history));
  }, [])

  //#region VALIDATE
  // function validatePassword(rule, value, callback) {
  //   if (value && !(/^[a-zA-Z]{5,}$/.test(value))) {
  //     callback("Mật khẩu phải có ít nhất 5 kí tự");
  //   }
  //   callback();
  // };
  function compareToFirstPassword(rule, value) {
    let t = form.getFieldValue('newPassword');
    if (!value || form.getFieldValue('newPassword') === value) {
      return Promise.resolve();
    }
    return Promise.reject('Mật khẩu không trùng khớp!');
  };
  //#endregion

  //#region SUBMIT
  function handleSubmit(values) {
    var model = {
      token: getUrlParam()['token'] || null,
      userName: getUrlParam()['email'] || null,
      password: values.newPassword,
    }
    setLoading(true);
    dispatch(resetPassword(model, _resetPwSuccess, _resetPwError));
  }
  function _resetPwSuccess() {
    var message = "Thay đổi mật khẩu thành công. Bạn sẽ được chuyển về trang đăng nhập."
    setResetPwSuccessNotify(message);
    setLoading(false);
    setTimeout(() => {
      setResetPwSuccessNotify(null);
      history.push('/signin');
    }, 6000)
  }
  function _resetPwError(res) {
    var message = messages[res] ? messages[res] : "Có lỗi xảy ra, vui lòng thử lại.";
    setResetPwErrorNotify(message);
    setLoading(false);
    setTimeout(() => setResetPwErrorNotify(null), 5000)
  }
  //#endregion

  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="kgbSigninLogoBlock">
            <div>
              
            </div>
          </div>
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.resetPassTitle" />
            </Link>
          </div>
          <div className="isoFormHeadText">
            {/* <h3>
              <IntlMessages id="page.resetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.resetPassDescription" />
            </p> */}
            {resetPwSuccessNotify &&
              <Alert
                message={resetPwSuccessNotify}
                type="success"
                showIcon
                style={alertStyle}
              />
            }
            {resetPwErrorNotify &&
              <Alert
                message={resetPwErrorNotify}
                type="error"
                showIcon
                style={alertStyle}
              />
            }
          </div>
          <div className="isoResetPassForm">
            <Form name="resetPassword" className="login-form" onFinish={handleSubmit} form={form}>
              <div className="isoInputWrapper">
                <Label>Email</Label>
                <Form.Item name="email">
                  <Input size="large" defaultValue={getUrlParam()['email'] || null} placeholder="Email" readOnly />
                </Form.Item>
              </div>

              <div className="isoInputWrapper">
                <Label> <IntlMessages id="common.label.newPassword" /></Label>
                <Form.Item
                  name="newPassword"
                  rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validatePassword }]}
                >
                  <Input.Password size="large" placeholder={messages['common.label.newPassword.placeholder']} />
                </Form.Item>
              </div>

              <div className="isoInputWrapper">
                <Label> <IntlMessages id="common.label.confirmNewPassword" /></Label>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: messages['common.input.notify.required'] },
                    {
                      validator: function validatePercent(
                        rule,
                        value,
                        callback
                      ) {
                        let t = form.getFieldValue('newPassword');
                        if (!value || form.getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Mật khẩu không trùng khớp!');
                      },
                    }
                  ]}
                  style={{ marginBottom: '15px' }}
                >
                  <Input.Password size="large" placeholder={messages['common.label.confirmPassword']} />
                </Form.Item>
              </div>

              <div className="isoInputWrapper" style={{ marginTop: '40px' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  <IntlMessages id="page.resetPassSave" />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  );
}

export default injectIntl(ResetPassword);