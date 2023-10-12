import { DeleteOutlined, EditOutlined, FilterFilled } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { CommonModels } from '@iso/constants/Models';
import PageSize from '@iso/constants/PageSize';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import { infoTotal, SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import roleActions from '@iso/redux/roles/actions';
import { Button, Col, Divider, Form, Input, Modal, Popconfirm, Row, Select, Spin, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ActionIconWrapper, FormWrap, Label, LabelRequired, SearchWrapper } from './RoleMngList.styles';

const { Search } = Input;
const { Option } = Select;

const { getRoles, createRole, deleteRole } = roleActions;
function RoleMngList(props) {
  //#region INIT
  const [search, setSearch] = useState({
    searchText: null,
    status: getUrlParam()['isActivated'] || null,
    page: getUrlParam()['page'] ? parseInt(getUrlParam()['page']) : 1,
    limit: getUrlParam()['limit'] ? parseInt(getUrlParam()['limit']) : PageSize.title,
  });
  // const [visibleColorPicker, setVisibleColorPicker] = useState(false);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  // const [colorHex, setStateColor] = useState('#000000');

  const [hasRole, setHasRole] = useState({ create: true, view: true, delete: true });
  // const { roles } = useSelector((state) => state.Account);

  const data = useSelector((state) => state.Role.roles);
  const { loading, totalItems } = useSelector((state) => state.Role);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { messages } = props.intl;


  useEffect(() => {
    getData();
  }, [search.page, search.searchText, search.limit]);
  // useEffect(() => {
  //   var create = roles.find(e => e == Roles.roleGroup.create);
  //   var view = roles.find(e => e == Roles.roleGroup.view);
  //   var del = roles.find(e => e == Roles.roleGroup.delete);
  //   setHasRole({ create, view, delete: del })
  // }, [roles])

  //#endregion

  //#region List
  function _onSearchText(value, e) {
    setSearch({ ...search, page: 1, searchText: value });
  }
  const _handleSelectFilter = (name, value) => {
    setSearch({ ...search, [name]: value || null });
  };
  function _onChangePage(page, pageSize) {
    setSearch({ ...search, page: page, limit: pageSize });
  }
  function getData() {
    let model = {
      page: search.page,
      limit: search.limit,
      search: search.searchText,
      isActivated: search.status,
    };
    history.push(createUrl(model));
    dispatch(getRoles(model));
  }
  function _onFilter() {
    if (search.page !== 1) setSearch({ ...search, page: 1 });
    else getData();
  }

  //#endregion

  //#region TABLE
  const columns = [
    {
      title: <IntlMessages id="rolemanagement.page.label.code" />,
      dataIndex: 'code',
      render: (value, record) =>
        hasRole.view ? <Link to={`/dashboard/roles/${record.id}`}>{value}</Link> : <a style={{ cursor: 'default' }}>{value}</a>,
    },
    {
      title: <IntlMessages id="rolemanagement.page.label.name" />,
      dataIndex: 'name',
      render: (value) => <span>{value}</span>,
    },
    {
      title: <IntlMessages id="rolemanagement.page.label.description" />,
      dataIndex: 'description',
      render: (value) => <span>{value}</span>,
    },
    // {
    //   title: <IntlMessages id="rolemanagement.page.label.color" />,
    //   dataIndex: "colorHex",
    //   render: value => {
    //     let textColor = value === "#ffffff" && "#797979"
    //     return <Tag color={value} style={{ color: textColor }}>{value}</Tag>;
    //   }
    // },
    {
      title: <IntlMessages id="rolemanagement.page.label.status" />,
      dataIndex: 'isActivated',
      render: (value) => {
        let color = value ? '#00B16A' : '#a8a8a8';
        let text = value ? messages['common.label.isActive'] : messages['common.label.notActive'];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      // title: <IntlMessages id="common.action.action" />,
      fixed: 'right',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <ActionIconWrapper>
          {hasRole.view ? (
            <Link to={`/dashboard/roles/${record.id}`}>
              <EditOutlined />
            </Link>
          ) : (
            <span className="icon-disable" title={messages['common.label.title.detail']}>
              <EditOutlined />
            </span>
          )}
          {record.canDelete && (
            <>
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
            </>
          )}
        </ActionIconWrapper>
      ),
    },
  ];
  //#endregion

  //#region ADD NEW
  const handleAddModal = () => {
    form.resetFields();
    setVisibleAddModal(true);
  };
  function toggleAddModal() {
    setVisibleAddModal(!visibleAddModal);
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

  function handlAddSubmit(values) {
    var model = {
      code: values.code,
      name: values.name,
      description: values.description,
      isActivated: values.isActive || false,
    };
    setSaveLoading(true);
    dispatch(createRole(model, _createSuccess, _createError));
  }
  //#endregion

  //#region DELETE
  function onDelete(id) {
    setSaveLoading(true);
    dispatch(deleteRole(id, _deleteSuccess, _deleteError));
  }
  function _deleteSuccess() {
    setSaveLoading(false);
    _swSuccess(messages, SWType.DELETE);
    setTimeout(() => {
      getData();
    }, 1000);
  }
  function _deleteError(res) {
    setSaveLoading(false);
    _swError(messages, res);
  }
  //#endregion

  //#region Color picker
  // function toggleColorPicker() {
  // 	setVisibleColorPicker(!visibleColorPicker);
  // }

  // function handleChangeColor(color, event) {
  // 	setStateColor(color.hex);
  // }
  // function handleClosePicker() {
  // 	setVisibleColorPicker(!visibleColorPicker);
  // }

  // const cover = {
  // 	position: 'fixed',
  // 	top: '0px',
  // 	right: '0px',
  // 	bottom: '0px',
  // 	left: '0px',
  // 	zIndex: '2',
  // };
  //#endregion

  return (
    <LayoutContentWrapper>
      <PageHeader hasRoleAdd={hasRole.create} handleAdd={handleAddModal}>
        <IntlMessages id="rolemanagement.page.title.list" />
      </PageHeader>
      <TableDemoStyle className="isoLayoutContent">
        <SearchWrapper>
          <Row>
            <Col md={10}>
              <Search className="kgb-list-search" placeholder={messages['common.label.search.searchText']} onSearch={_onSearchText} />
            </Col>
            <Col xs={0} md={9}></Col>
            <Col md={5} className="col-filter">
              <Select
                placeholder={messages['rolemanagement.page.label.status']}
                className="kgb-list-select"
                value={search.status || undefined}
                onChange={(value) => _handleSelectFilter('status', value)}
                allowClear
              >
                {CommonModels.status &&
                  CommonModels.status.map((item) => (
                    <Option value={item.value.toString()} key={item.value}>
                      {item.text}
                    </Option>
                  ))}
              </Select>
              <Button className="btn-filter" title={messages['common.label.find']} onClick={_onFilter}>
                <FilterFilled />
              </Button>
            </Col>
          </Row>
        </SearchWrapper>

        <Spin tip={messages['common.label.loading']} spinning={loading}>
          {infoTotal(search.page, search.limit, totalItems)}
          <TableWrapper
            columns={columns}
            dataSource={data}
            rowKey="id"
            className="isoCustomizedTable"
            pagination={{
              current: search.page,
              total: totalItems,
              pageSize: search.limit,
              showSizeChanger: true,
              onChange: _onChangePage,
            }}
          />
        </Spin>

        {/* ADD */}
        <Modal
          title={messages['rolemanagement.form.create.title']}
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
            <Button key="submit" type="primary" form="roleAddForm" htmlType="submit" loading={saveLoading}>
              <IntlMessages id="modal.label.addNew" />
            </Button>,
          ]}
        >
          <FormWrap>
            <Form id="roleAddForm" onFinish={handlAddSubmit} form={form}>
              <LabelRequired>
                <IntlMessages id="common.label.code" />
              </LabelRequired>
              <Form.Item name="code" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
                <Input placeholder={messages['common.label.code']} size="large" />
              </Form.Item>

              <LabelRequired>
                <IntlMessages id="rolemanagement.page.label.nameTitle" />
              </LabelRequired>
              <Form.Item name="name" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
                <Input placeholder={messages['rolemanagement.page.label.nameTitle']} size="large" />
              </Form.Item>

              <Label>
                <IntlMessages id="rolemanagement.page.label.description" />
              </Label>
              <Form.Item name="description">
                <Input placeholder={messages['rolemanagement.page.label.description']} size="large" />
              </Form.Item>

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

export default injectIntl(RoleMngList);
