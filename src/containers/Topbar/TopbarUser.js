import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@iso/components/uielements/popover';
import IntlMessages from '@iso/components/utility/intlMessages';
// import userpic from '@iso/assets/images/user1.png';
import authAction from '@iso/redux/auth/actions';
import commonActions from '@iso/redux/common/actions';
import { Avatar } from 'antd';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import { UserOutlined } from '@ant-design/icons';

const { logout } = authAction;
export default function TopbarUser() {
  const { profileAvatar } = useSelector(state => state.Common);
  const { getProfileAvatarCommon } = commonActions;
  const [visible, setVisibility] = React.useState(false);
  useEffect(() => {
    dispatch(getProfileAvatarCommon());
  }, []);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }
  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link className="isoDropdownLink" to={'/dashboard/my-profile'}>
        <IntlMessages id="topbar.myprofile" />
      </Link>
      <Link className="isoDropdownLink" to={'/dashboard/change-password'}>
        <IntlMessages id="topbar.changepassword" />
      </Link>
      <a
        className="isoDropdownLink"
        onClick={() => dispatch(logout())}
        href="# "
      >
        <IntlMessages id="topbar.logout" />
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        {
          profileAvatar ?  <img alt="user" src={profileAvatar}  /> : <Avatar icon={<UserOutlined />} />
        }
        {/* <img alt="user" src={profileAvatar} />
        <span className="userActivity online" /> */}
      </div>
    </Popover>
  );
}
