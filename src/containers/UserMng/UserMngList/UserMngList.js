import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { CommonModels } from '@iso/constants/Models';
import PageSize from '@iso/constants/PageSize';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import {
  infoTotal,
  SWType,
  validateEmail,
  validateName,
  validatePassword,
  _swError,
  _swSuccess,
} from '@iso/lib/helpers/utility';
import commonAtions from '@iso/redux/common/actions';
import userActions from '@iso/redux/users/actions';
import { Avatar, Button, Divider, Form, Input, Modal, Popconfirm, Select, Spin, Switch, Tag } from 'antd';
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ActionIconWrapper, FormWrap, Label, LabelRequired } from './UserMngList.styles';
import AdvanceSearch from './UserSearch';

const { Option } = Select;
const { getUsers, deleteUser, createUser } = userActions;
const { getGroupsCommon, getProfileTypesCommon } = commonAtions;
const { sumOrder } = CommonModels;

function UserMngList(props) {
  //#region INIT
  const [search, setSearch] = useState({
    searchText: null,
    orderBy: getUrlParam()['orderBy'] || null,
    groupId: getUrlParam()['groupId'] || null,
    profileType: getUrlParam()['profileType'] || null,
    status: getUrlParam()['isActivated'] || null,
    page: 1,
    limit: getUrlParam()['limit'] ? parseInt(getUrlParam()['limit']) : PageSize.user,
    // page: getUrlParam()['page'] ? parseInt(getUrlParam()['page']) : 1,
  });
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [profileTypeValue, setProfileTypeValue] = useState();

  const [visibleAdvanceSearch, setVisibleAdvanceSearch] = useState(false);

  const { loading, users, totalItems } = useSelector((state) => state.User);
  const { groups, profileTypes } = useSelector((state) => state.Common);

  const [hasRole, setHasRole] = useState({
    create: true,
    view: true,
    delete: true,
  });
  const { roles } = useSelector((state) => state.Account);

  const dispatch = useDispatch();
  const history = useHistory();
  const { messages } = props.intl;
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getGroupsCommon());
    dispatch(getProfileTypesCommon());
  }, []);
  useEffect(() => {
    getData();
  }, [search.page, search.searchText, search.orderBy, search.limit]);
  // useEffect(() => {
  //     var create = roles.find(e => e == Roles.user.create);
  //     var view = roles.find(e => e == Roles.user.view);
  //     var del = roles.find(e => e == Roles.user.delete);
  //     setHasRole({ create, view, delete: del })
  // }, [roles])

  //#endregion

  //#region TABLE
  const columns = [
    {
      title: <IntlMessages id="userMng.label.list.avatar" />,
      dataIndex: 'avatarLink',
      key: 'avatarLink',
      fixed: 'left',
      align: 'center',
      render: (value, record) =>
        record.profile?.avatarLink ? <Avatar src={record.profile?.avatarLink} /> : <Avatar icon={<UserOutlined />} />,
    },
    {
      title: <IntlMessages id="common.label.code" />,
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
      sorter: true,
      orderValue: search.orderBy !== sumOrder.code_az ? sumOrder.code_az : sumOrder.code_za,
      render: (value, record) => <Link to={`/dashboard/users/${record.id}`}>{record.profile?.code}</Link>,
      // render: (value, record) => hasRole.view
      //     ? <Link to={`/dashboard/user_management/update/${record.id}`}>{value}</Link>
      //     : <a style={{ cursor: 'default' }}>{value}</a>
    },
    {
      title: <IntlMessages id="common.label.fullname" />,
      dataIndex: 'fullName',
      sorter: true,
      orderValue: search.orderBy !== sumOrder.name_az ? sumOrder.name_az : sumOrder.name_za,
      key: 'fullName',
      render: (value, record) => {
        return (
          <>
            <div>{record.profile?.fullName}</div>
          </>
        );
      },
    },
    {
      title: <IntlMessages id="common.label.email" />,
      dataIndex: 'email',
      key: 'contact',
      sorter: true,
      orderValue: search.orderBy !== sumOrder.email_az ? sumOrder.email_az : sumOrder.email_za,
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
      title: <IntlMessages id="userMng.label.profileType" />,
      dataIndex: 'profileType',
      render: (value, record) => {
        return (
          <>
            <IntlMessages id={record.profile?.profileType} />
          </>
        );
      },
    },
    // {
    //   title: <IntlMessages id="userMng.label.groupRole" />,
    //   dataIndex: 'groupName',
    //   render: (value, record) => {
    //     return <span>{record.groupRole?.name}</span>;
    //     // let textColor = record.groupRole?.groupColor === "#ffffff" && "#797979"
    //     // return <Tag color={record.groupRole?.groupColor} style={{ color: textColor }}>{record.groupRole?.name}</Tag >
    //   },
    // },
    {
      title: <IntlMessages id="common.label.add" />,
      key: 'addedBy',
      //sorter: true,
      orderValue: search.orderBy !== sumOrder.update_newest ? sumOrder.update_newest : sumOrder.update_oldest,
      render: (value, record) => {
        var date = record.addedBy?.changedStamp
          ? moment(new Date(record.addedBy?.time)).format('DD/MM/YYYY HH:mm:ss')
          : undefined;
        return (
          <>
            <div>{record.addedBy?.fullName}</div>
            <div>{record.addedBy?.email}</div>
            <div>{date}</div>
          </>
        );
      },
    },
    {
      title: <IntlMessages id="common.label.update" />,
      key: 'changedBy',
      //sorter: true,
      orderValue: search.orderBy !== sumOrder.update_newest ? sumOrder.update_newest : sumOrder.update_oldest,
      render: (value, record) => {
        var date = record.changedBy?.changedStamp
          ? moment(new Date(record.changedBy.time)).format('DD/MM/YYYY HH:mm:ss')
          : undefined;
        return (
          <>
            <div>{record.changedBy?.fullName}</div>
            <div>{record.changedBy?.email}</div>
            <div>{date}</div>
          </>
        );
      },
    },
    {
      // title: <IntlMessages id="common.action.action" />,
      width: '10%',
      align: 'center',
      fixed: 'right',
      render: (value, record) => (
        <ActionIconWrapper>
          {hasRole.view ? (
            <Link to={`/dashboard/users/${record.id}`}>
              <EditOutlined />
            </Link>
          ) : (
            <span className="icon-disable" title={messages['common.label.title.detail']}>
              <EditOutlined />
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
  const _handleTableChange = (pagination, filters, sorter) => {
    let isOrderChange = false;
    let order = sorter.column && sorter.column.orderValue;
    if (order !== search.orderBy) isOrderChange = true;

    setSearch({
      ...search,
      orderBy: order !== undefined ? order : null,
      page: isOrderChange ? 1 : pagination.current,
      limit: pagination.pageSize,
    });
  };
  //#endregion

  function getData() {
    var model = modelSearch();
    history.push(createUrl(model));
    dispatch(getUsers(model));
  }
  function _onAdvanceSearch() {
    if (search.page !== 1) setSearch({ ...search, page: 1 });
    else getData();
  }
  function modelSearch() {
    var model = {
      page: search.page,
      limit: search.limit,
      orderBy: search.orderBy,
      search: search.searchText,
      isActivated: search.status,
      profileType: search.profileType,
      groupId: search.groupId,
    };
    return model;
  }
  //#region ONCHANGE
  // function _onChangePage(page, pageSize) {
  //     setSearch({ ...search, page: page });
  // }
  function _onSearchText(value, e) {
    setSearch({ ...search, page: 1, searchText: value });
  }
  const _handleSelectFilter = (name, value) => {
    setSearch({ ...search, [name]: value || null });
  };
  const _toggleAdvanceSearch = (e) => {
    setVisibleAdvanceSearch(!visibleAdvanceSearch);
  };
  const _clearFilter = () => {
    setSearch({ ...search, page: 1, orderBy: null, profileType: null, groupId: null, status: null });
  };
  //#endregion

  //#region DELETE
  function onDelete(id) {
    setSaveLoading(true);
    dispatch(deleteUser(id, _deleteSuccess, _deleteError));
  }
  function _deleteSuccess() {
    setSaveLoading(false);
    _swSuccess(messages, { type: SWType.DELETE });
    setTimeout(() => {
      getData();
    }, 1000);
  }
  function _deleteError(res) {
    setSaveLoading(false);
    _swError(messages, res);
  }
  //#endregion

  //#region ADD NEW
  const handleAddModal = () => {
    form.resetFields();
    setVisibleAddModal(true);
  };
  function toggleAddModal() {
    setVisibleAddModal(!visibleAddModal);
  }

  function handlAddSubmit(values) {
    var model = {
      code: values.code,
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      isActive: values.isActive || false,
      groupId: values.groupId,
      profileType: values.profileType,
    };
    setSaveLoading(true);
    dispatch(createUser(model, _createSuccess, _createError));
  }
  function _createSuccess() {
    form.resetFields();
    setVisibleAddModal(false);
    setSaveLoading(false);
    _swSuccess(messages, { type: SWType.ADD });
    setTimeout(() => {
      getData();
    }, 1000);
  }
  function _createError(res) {
    setSaveLoading(false);
    _swError(messages, res);
  }
  //#endregion
  function handleChangeProfileType(value) {
    setProfileTypeValue(value);
  }
  return (
    <LayoutContentWrapper>
      <PageHeader hasRoleAdd={true} handleAdd={handleAddModal}>
        <IntlMessages id="userMng.page.title.userList" />
      </PageHeader>
      <TableDemoStyle className="isoLayoutContent">
        <AdvanceSearch
          search={search}
          _onSearch={_onAdvanceSearch}
          _onSearchText={_onSearchText}
          _handleFilter={_handleSelectFilter}
          messages={messages}
          groups={groups}
          profileTypes={profileTypes}
          visibleAdvanceSearch={visibleAdvanceSearch}
          _toggleAdvanceSearch={_toggleAdvanceSearch}
          _clearFilter={_clearFilter}
        />

        <Spin tip={messages['common.label.loading']} spinning={loading}>
          {infoTotal(search.page, search.limit, totalItems)}
          <TableWrapper
            columns={columns}
            dataSource={users}
            rowKey="id"
            className="isoCustomizedTable"
            pagination={{
              current: search.page,
              total: totalItems,
              pageSize: search.limit,
              // onChange: _onChangePage
            }}
            onChange={_handleTableChange}
          />
        </Spin>

        {/* ADD */}
        <Modal
          title={messages['userMng.page.title.createNewUser']}
          visible={visibleAddModal}
          onCancel={toggleAddModal}
          footer={[
            <span
              key="cancel"
              style={{ textDecoration: 'underline', marginRight: '30px', cursor: 'pointer', fontWeight: '500' }}
              onClick={toggleAddModal}
            >
              <IntlMessages id="modal.label._cancel" />
            </span>,
            <Button key="submit" type="primary" loading={saveLoading} form="createUserForm" htmlType="submit">
              <IntlMessages id="modal.label.addNew" />
            </Button>,
          ]}
        >
          <FormWrap>
            <Form form={form} id="createUserForm" onFinish={handlAddSubmit}>
              {/* <LabelRequired><IntlMessages id="common.label.code" /></LabelRequired>
                            <Form.Item
                                name="code"
                                rules={[{ required: true, message: messages['common.input.notify.required'] },]}
                            >
                                <Input placeholder={messages["common.label.code"]} size="large" />
                            </Form.Item> */}
              <LabelRequired>
                <IntlMessages id="common.label.fullname" />
              </LabelRequired>
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: messages['common.input.notify.required'] },
                  { validator: validateName },
                ]}
              >
                <Input placeholder={messages['common.label.fullname.placeholder']} size="large" />
              </Form.Item>
              <LabelRequired>
                <IntlMessages id="common.label.email" />
              </LabelRequired>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: messages['common.input.notify.required'] },
                  { validator: validateEmail },
                ]}
              >
                <Input placeholder={messages['common.label.email.placeholder']} size="large" />
              </Form.Item>

              <LabelRequired>
                <IntlMessages id="userMng.label.password" />
              </LabelRequired>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: messages['common.input.notify.required'] },
                  { validator: validatePassword },
                ]}
              >
                <Input.Password placeholder={messages['userMng.label.password.placeholder']} size="large" />
              </Form.Item>

              <LabelRequired>
                <IntlMessages id="userMng.label.profileType" />
              </LabelRequired>
              <Form.Item
                name="profileType"
                rules={[{ required: true, message: messages['common.input.notify.required'] }]}
              >
                <Select
                  placeholder={messages['userMng.label.profileType.placeholder']}
                  className="kgb-list-select"
                  size="large"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={handleChangeProfileType}
                >
                  {profileTypes &&
                    profileTypes.map((item, index) => {
                      return (
                        <Option value={item.id} key={index}>
                          <IntlMessages id={item.name} />
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              {/* {profileTypeValue === '3' ? (
								''
							) : (
								<div>
									<LabelRequired>
										<IntlMessages id="userMng.label.groupRole" />
									</LabelRequired>
									<Form.Item
										name="groupId"
										rules={[{ required: true, message: messages['common.input.notify.required'] }]}
									>
										<Select
											placeholder={messages['userMng.label.groupRole.placeholder']}
											className="kgb-list-select"
											size="large"
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
											}
										>
											{groups &&
												groups.map((item, index) => (
													<Option value={item.id} key={index}>
														{item.name}
													</Option>
												))}
										</Select>
									</Form.Item>
								</div>
							)} */}
              <Label>
                <IntlMessages id="common.label.active" />
              </Label>
              <Form.Item name="isActive" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Form>
          </FormWrap>
        </Modal>
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export default injectIntl(UserMngList);
