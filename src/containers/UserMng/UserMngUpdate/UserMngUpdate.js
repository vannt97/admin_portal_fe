import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import IntlMessages from '@iso/components/utility/intlMessages';
import PageHeader from '@iso/components/utility/pageHeader';
// import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
// import PageSize from '@iso/constants/PageSize';
// import * as moment from 'moment';
import { Roles } from '@iso/constants/Models';
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import { validateName, validatePassword, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import commonAtions from '@iso/redux/common/actions';
import userActions from '@iso/redux/users/actions';
import { Avatar, Button, Checkbox, Col, Form, Input, Modal, Row, Select, Spin, Switch, Tabs, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { ContentWrapper, FormWrap, Label, LabelRequired, TitleLabel, TreeWrap, Wrapper } from './UserMngUpdate.styles';

const { getUserDetail, updateUser, resetPassword, userAccessPermission, updateUserAccessPermission } = userActions;
const { getGroupsCommon, getProfileTypesCommon } = commonAtions;

const { Option } = Select;
const { TabPane } = Tabs;
const { TreeNode } = Tree;

const UserMngUpdate = (props) => {
  //#region define
  const [user, setUser] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [permissions, setPermissions] = useState({ hasRole: [], roles: [], count: 0, checkAll: false });
  const [currTab, setCurrTab] = useState(getUrlParam()['tab'] || '1');

  const { loading, userDetail } = useSelector((state) => state.User);
  const userPermissions = useSelector((state) => state.User.permissions);
  const { groups, profileTypes } = useSelector((state) => state.Common);

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { messages } = props.intl;
  const [formUserInfo] = Form.useForm();
  const [formChangePw] = Form.useForm();

  const [hasRoleUpdate, setHasRoleUpdate] = useState(false);
  const roles = useSelector((state) => state.Account.roles);

  useEffect(() => {
    var isExist = roles.find((e) => e === Roles.user.edit);
    if (isExist) setHasRoleUpdate(true);
  }, [roles]);

  useEffect(() => {
    dispatch(getUserDetail(params.id));
    dispatch(getGroupsCommon());
    dispatch(getProfileTypesCommon());
    switch (currTab) {
      case '2':
        getAccessPermission();
        break;
      default:
        break;
    }
  }, []);
  useEffect(() => {
    setUser(userDetail);
    formUserInfo.setFieldsValue({
      code: userDetail.profile?.code,
      fullName: userDetail.profile?.fullName,
      email: userDetail.profile?.email,
      profileType: userDetail.profile?.profileType,
      groupId: userDetail.groupRole?.id || undefined,
      isActive: userDetail.isActive,
    });
  }, [userDetail]);
  useEffect(() => {
    var userPer = userPermissions.hasRole ? userPermissions.hasRole : [];
    if (userPermissions.roles) {
      var pers = [];
      var perCount = 0;
      var perMainCount = 0;
      userPermissions.roles.forEach((e) => {
        perCount++;
        var arr = { title: messages[e.title] || e.title, key: e.key };
        var children = e.children.map((item) => {
          perCount++;
          perMainCount++;
          return { title: messages[item.name] || item.name, key: item.id };
        });
        arr = { ...arr, children };
        pers = [...pers, arr];
      });
      setPermissions({
        ...permissions,
        roles: pers,
        count: perCount,
        hasRole: userPer,
        checkAll: perMainCount === userPer.length ? true : false,
        isWeb: userPermissions.isWeb,
        isMobile: userPermissions.isMobile,
      });
    }
  }, [userPermissions]);

  //#region GENERAL_INFO TAB
  function handlSubmit(values) {
    var model = {
      id: user.id,
      code: values.code,
      fullName: values.fullName,
      email: values.email,
      isActive: values.isActive,
      groupId: values.groupId,
      profileType: values.profileType,
    };
    setSaveLoading(true);
    dispatch(updateUser(model, _updateSuccess, _updateError));
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

  //#region CHANGE PASSWORD
  function toggleModal() {
    setVisibleModal(!visibleModal);
  }
  function handleResetPW(values) {
    var model = {
      password: values.newPassword,
      id: user.id,
    };
    setSaveLoading(true);
    dispatch(resetPassword(model, _resetSuccess, _resetError));
  }

  function _resetSuccess(res) {
    setVisibleModal(false);
    formChangePw.resetFields(['newPassword']);
    setSaveLoading(false);
    _swSuccess(messages, { text: `${messages['modal.notify.content.newPassword']} ${res}` });
  }
  function _resetError(res) {
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

    switch (key) {
      case '2':
        getAccessPermission();
        break;
      default:
        break;
    }
  }
  //#endregion

  //#region ACCESS TAB
  function getAccessPermission() {
    dispatch(userAccessPermission(params.id));
  }
  function _onChangeAccess(e) {
    const { name, checked } = e.target;
    setPermissions({ ...permissions, [name]: checked });
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

  //#region ROLE

  const onCheck = (checkedKeys) => {
    var checkAll = checkedKeys.length === permissions.count ? true : false;
    setPermissions({
      ...permissions,
      hasRole: checkedKeys,
      checkAll,
    });
  };
  const renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  function handleCheckAll(e) {
    var checked = e.target.checked;
    if (checked === true) {
      var arr = [];
      permissions.roles.map((item) => {
        arr = [...arr, item.key];
        if (item.children) {
          item.children.map((i) => (arr = [...arr, i.key]));
        }
      });
      setPermissions({ ...permissions, hasRole: arr, checkAll: true });
    } else setPermissions({ ...permissions, hasRole: [], checkAll: false });
  }

  function handleSavePermission() {
    var model = {
      id: params.id,
      roles: permissions.hasRole,
      isWeb: permissions.isWeb,
      isMobile: permissions.isMobile,
    };
    setSaveLoading(true);
    dispatch(updateUserAccessPermission(model, _updatePermissionSuccess, _updatePermissionError));
  }
  function _updatePermissionSuccess() {
    setSaveLoading(false);
    _swSuccess(messages);
  }
  function _updatePermissionError(res) {
    setSaveLoading(false);
    _swError(messages, res);
  }
  //#endregion

  return (
    <Wrapper>
      <PageHeader>
        <IntlMessages id="userMng.page.title.editUser" />
      </PageHeader>
      <Form.Provider
      // onFormFinish={(name, { values, forms }) => { }}
      >
        <ContentWrapper>
          <Tabs onChange={onChangeTab} activeKey={currTab}>
            <TabPane tab={messages['userMng.tab.accountInfo']} key="1">
              {loading !== true ? (
                <Spin tip={messages['common.label.loading']} spinning={saveLoading}>
                  <FormWrap>
                    <Form onFinish={handlSubmit} name="userInfoForm" form={formUserInfo}>
                      <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={12} sm={12} xs={24}>
                          <div className="display-block">
                            <Label>
                              <IntlMessages id="userMng.label.avatar" />
                            </Label>
                            {user.profile?.avatarLink ? (
                              <Avatar size={80} src={user.profile?.avatarLink} />
                            ) : (
                              <Avatar size={80} icon={<UserOutlined />} />
                            )}
                          </div>

                          <LabelRequired>
                            <IntlMessages id="common.label.code" />
                          </LabelRequired>
                          <Form.Item name="code" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
                            <Input placeholder={messages['common.label.code']} size="large" readOnly />
                          </Form.Item>

                          <LabelRequired>
                            <IntlMessages id="common.label.fullname" />
                          </LabelRequired>
                          <Form.Item
                            name="fullName"
                            rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validateName }]}
                          >
                            <Input placeholder={messages['common.label.fullname.placeholder']} size="large" />
                          </Form.Item>

                          <LabelRequired>
                            <IntlMessages id="common.label.email" />
                          </LabelRequired>
                          <Form.Item name="email" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
                            <Input placeholder={messages['common.label.email.placeholder']} size="large" readOnly />
                          </Form.Item>

                          {/* <LabelRequired><IntlMessages id="userMng.label.profileType" /></LabelRequired>
                          <Form.Item
                            name="profileType"
                            rules={[
                              { required: true, message: messages['common.input.notify.required'] },
                            ]}
                          >
                            <Select placeholder={messages['userMng.label.profileType.placeholder']} className="kgb-list-select" size="large"
                              showSearch optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {profileTypes && profileTypes.map((item, index) => (
                                <Option value={item.id} key={index}><IntlMessages id={item.name} /></Option>
                              ))}
                            </Select>
                          </Form.Item> */}

                          {userDetail.groupRole?.id ? (
                            <div>
                              <LabelRequired>
                                <IntlMessages id="userMng.label.groupRole" />
                              </LabelRequired>
                              <Form.Item
                                name="groupId"
                              // rules={[
                              //   { required: true, message: messages['common.input.notify.required'] },
                              // ]}
                              >
                                <Select
                                  placeholder={messages['userMng.label.groupRole.placeholder']}
                                  className="kgb-list-select"
                                  size="large"
                                  showSearch
                                  optionFilterProp="children"
                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                  {groups &&
                                    groups.map((item) => (
                                      <Option value={item.id} key={item.id}>
                                        {item.name}
                                      </Option>
                                    ))}
                                </Select>
                              </Form.Item>
                            </div>
                          ) : (
                            ''
                          )}
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
                          {!user.isDeleted && (
                            <>
                              <Button
                                // disabled={hasRoleUpdate ? false : true}
                                size="large"
                                type="primary"
                                htmlType="submit"
                              >
                                <IntlMessages id="userMng.label.save" />
                              </Button>
                              {user.id && (
                                <Button size="large" type="primary" onClick={toggleModal} className="btn-change-pw">
                                  <IntlMessages id="userMng.label.changePassword" />
                                </Button>
                              )}
                            </>
                          )}
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

            <TabPane tab={messages['userMng.tab.accessPermission']} key="2">
              {loading !== true ? (
                <Spin tip={messages['common.label.loading']} spinning={saveLoading}>
                  {permissions.roles && (
                    <TreeWrap>
                      <TitleLabel>
                        <IntlMessages id="userMng.tab.accessPermission" />
                      </TitleLabel>
                      <div className="check-all">
                        <Checkbox onChange={handleCheckAll} checked={permissions.checkAll}>
                          <IntlMessages id="common.label.selectAll" />
                        </Checkbox>
                      </div>
                      <Tree
                        checkable
                        defaultExpandAll={true}
                        defaultExpandParent={true}
                        onCheck={onCheck}
                        checkedKeys={permissions.hasRole}
                        showIcon={false}
                      >
                        {renderTreeNodes(permissions.roles)}
                      </Tree>
                    </TreeWrap>
                  )}

                  <Row style={{ marginTop: '10px', padding: '10px', rowStyle }} gutter={gutter} justify="start">
                    {!user.isDeleted && (
                      <Button
                        // disabled={hasRoleUpdate ? false : true}
                        size="large"
                        type="primary"
                        onClick={handleSavePermission}
                        loading={saveLoading}
                      >
                        <IntlMessages id="userMng.label.save" />
                      </Button>
                    )}
                  </Row>
                  <div className="action-btn-back">
                    <Link to={`/dashboard/users`}>
                      <ArrowLeftOutlined />
                      <IntlMessages id="common.label.back" />
                    </Link>
                  </div>
                </Spin>
              ) : (
                <div className="main-loading">
                  <Spin />
                </div>
              )}
            </TabPane>

          </Tabs>

          {/* CHANGE PASSWORD MODAL */}
          <Modal
            title={messages['userMng.label.changePassword']}
            visible={visibleModal}
            onCancel={toggleModal}
            footer={[
              <span
                key="cancel"
                style={{ textDecoration: 'underline', marginRight: '30px', cursor: 'pointer', fontWeight: '500' }}
                onClick={toggleModal}
              >
                <IntlMessages id="modal.label._cancel" />
              </span>,
              <Button type="primary" form="userChangePwForm" key="submit" htmlType="submit">
                <IntlMessages id="userMng.label.resetPassword" />
              </Button>,
            ]}
          >
            <FormWrap>
              <Form name="userChangePwForm" id="userChangePwForm" onFinish={handleResetPW} form={formChangePw}>
                <LabelRequired>
                  <IntlMessages id="profileMng.label.newPassword" />
                </LabelRequired>
                <Form.Item
                  name="newPassword"
                  rules={[{ required: true, message: messages['common.input.notify.required'] }, { validator: validatePassword }]}
                >
                  <Input.Password placeholder={messages['profileMng.label.newPassword.placeholder']} size="large" />
                </Form.Item>
              </Form>
            </FormWrap>
          </Modal>
        </ContentWrapper>
      </Form.Provider>
    </Wrapper>
  );
};

export default injectIntl(UserMngUpdate);
