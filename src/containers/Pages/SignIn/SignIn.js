import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '@iso/redux/auth/actions';
// import appAction from '@iso/redux/app/actions';
import SignInStyleWrapper, { Label } from './SignIn.styles';
// import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import { injectIntl } from "react-intl";

import { Form, Alert, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { login } = authAction;
// const { clearMenu } = appAction;

function SignIn(props) {
  // let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const { messages } = props.intl;

  const [loading, setLoading] = useState(false);
  const [loginErrorNotify, setLoginErrorNotify] = useState(null);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const isLoggedIn = useSelector(state => state.Auth.idToken);

  useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  // function handleLogin(e, token = false) {
  //   e.preventDefault();
  //   if (token) {
  //     dispatch(login(token));
  //   } else {
  //     dispatch(login());
  //   }
  //   dispatch(clearMenu());
  //   history.push('/dashboard');
  // }

  let { from } = location.state || { from: { pathname: '/dashboard' } };
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const handleLogin = values => {
    var model = {
      userName: values.userName,
      password: values.password,
    }
    setLoading(true);
    dispatch(login(model, _loginError));
  };
  function _loginError(res) {
    var message = messages[res] ? messages[res] : "Có lỗi xảy ra, vui lòng thử lại.";
    setLoginErrorNotify(message);
    setLoading(false);
    setTimeout(() => setLoginErrorNotify(null), 5000)
  }

  const alertStyle = { marginBottom: '10px', fontSize: '14px' };
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          {loginErrorNotify &&
            <Alert message={loginErrorNotify} type="error" showIcon style={alertStyle} />
          }
          <div className="isoSignInForm">
            <Form
              name="normal_login"
              className="login-form"
              // initialValues={{ userName: "admin@dispostable.com" }}
              onFinish={handleLogin}
            >
              <div className="isoInputWrapper">
                <Label>Tên đăng nhập:</Label>
                <Form.Item
                  name="userName"
                  rules={[{ required: true, message: 'Xin vui lòng điền email' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nhập tên đăng nhập" size="large" />
                </Form.Item>
              </div>
              <div className="isoInputWrapper">
                <Label>Mật khẩu:</Label>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Xin vui lòng điền mật khẩu đăng nhập' }]}
                // initialValue="123456x@X"
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={messages['userMng.label.password.placeholder']} size="large" />
                  {/* <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder={messages['userMng.label.password.placeholder']} size="large" /> */}
                </Form.Item>
              </div>

              <div className="isoForgotPwBlock">
                <Link to="/forgotpassword" className="isoForgotPass" style={{color: "#4482FF"}}>
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
              </div>
              <div className="isoInputSubmit">
                <Button type="primary" htmlType="submit" loading={loading}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
export default injectIntl(SignIn);
