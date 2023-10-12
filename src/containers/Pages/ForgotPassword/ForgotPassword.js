import React from 'react';
import { Link } from 'react-router-dom';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './ForgotPassword.styles';
import {
  Form,
  // Input
} from 'antd';
import { useDispatch } from "react-redux";
import authAction from '@iso/redux/auth/actions'
import Alert from '@iso/components/Feedback/Alert';
import { injectIntl } from "react-intl";

const { forgotPassword } = authAction;

function ForgotPassword(props) {
  const [loading, setLoading] = React.useState(false);
  const [forgotPwSuccessNotify, setForgotPwSuccessNotify] = React.useState(null);
  const [forgotPwErrorNotify, setForgotPwErrorNotify] = React.useState(null);

  const dispatch = useDispatch();
  const { messages } = props.intl;

  function handleSubmit(values) {
    var model = {
      userName: values.userName,
      webAppHost: window.location && window.location.origin
    }
    setLoading(true);
    dispatch(forgotPassword(model, _forgotPwSuccess, _forgotPwError));
  }
  function _forgotPwSuccess() {
    var message = "Vui lòng kiểm tra email để hoàn tất."
    setForgotPwSuccessNotify(message);
    setLoading(false);
    setTimeout(() => setForgotPwSuccessNotify(null), 5000)
  }
  function _forgotPwError(res) {
    var message = messages[res] ? messages[res] : "Có lỗi xảy ra, vui lòng thử lại.";
    setForgotPwErrorNotify(message);
    setLoading(false);
    setTimeout(() => setForgotPwErrorNotify(null), 5000)
  }

  const alertStyle = {
    marginTop: '10px',
    fontSize: '14px'
  };
  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="kgbSigninLogoBlock">
            <div>              
            </div>
          </div>

          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.forgetPassTitle" />
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              <IntlMessages id="page.forgetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.forgetPassDescription" />
            </p>
            {forgotPwSuccessNotify &&
              <Alert
                message={forgotPwSuccessNotify}
                type="success"
                showIcon
                style={alertStyle}
              />
            }
            {forgotPwErrorNotify &&
              <Alert
                message={forgotPwErrorNotify}
                type="error"
                showIcon
                style={alertStyle}
              />
            }

          </div>
          <Form name="forgotPassword" className="login-form" onFinish={handleSubmit}>
            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Form.Item
                  name="userName"
                  rules={[{ required: true, message: 'Xin vui lòng điền email' }]}
                >
                  <Input size="large" placeholder="Email" autoComplete="true" />
                </Form.Item>
              </div>

              
              <div className="isoInputWrapper">
                <Button type="primary" htmlType="submit" loading={loading}>
                  <IntlMessages id="page.sendRequest" />
                </Button>
              </div>
            </div>

            <div className="isoForgotPwBlock">
                <Link to="/signin" className="isoForgotPass" style={{color: "#4482FF"}}>
                  <IntlMessages id="page.signInButton" />
                </Link>
              </div>
          </Form>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
}

export default injectIntl(ForgotPassword);