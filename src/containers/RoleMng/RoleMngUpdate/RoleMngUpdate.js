import { ArrowLeftOutlined } from '@ant-design/icons';
import IntlMessages from '@iso/components/utility/intlMessages';
import PageHeader from '@iso/components/utility/pageHeader';
// import commonAtions from "@iso/redux/common/actions";
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import PageSize from "@iso/constants/PageSize";
import { createUrl, getUrlParam } from '@iso/lib/helpers/url_handler';
import { _swError, _swSuccess } from '@iso/lib/helpers/utility';
import roleActions from '@iso/redux/roles/actions';
import { Button, Checkbox, Col, Form, Input, Row, Spin, Switch, Tabs, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { ContentWrapper, FormWrap, Label, LabelRequired, TreeWrap, Wrapper } from './RoleMngUpdate.styles';

const { getRoleDetail, updateRole, roleAccessPermission, updateRoleAccessPermission } = roleActions;

const { TabPane } = Tabs;
const { TreeNode } = Tree;

const RoleMngUpdate = (props) => {
	//#region define
	const [detail, setDetail] = useState({});
	// const [visibleColorPicker, setVisibleColorPicker] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [objCheckAll, setCheckAll] = useState({
		indeterminate: false,
		checkAll: false,
	});
	const [permissions, setPermissions] = useState({
		hasRole: [],
		roles: [],
		count: 0,
		checkAll: false,
	});
	const [currTab, setCurrTab] = useState(getUrlParam()['tab'] || '1');

	const { roleDetail, loading } = useSelector((state) => state.Role);
	const rolePermissions = useSelector((state) => state.Role.permissions);

	const params = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { messages } = props.intl;
	const [form] = Form.useForm();

	const [hasRoleUpdate, setHasRoleUpdate] = useState(true);
	const roles = useSelector((state) => state.Account.roles);

	useEffect(() => {
		cbSetCheckIndeterminate();
	}, [detail]);
	useEffect(() => {
		dispatch(getRoleDetail(params.id));
		switch (currTab) {
			case '2':
				getAccessPermission();
				break;
			default:
				break;
		}
	}, []);
	useEffect(() => {
		setDetail(roleDetail);

		form.setFieldsValue({
			code: roleDetail.code,
			name: roleDetail.name,
			description: roleDetail.description,
			isActive: roleDetail.isActivated,
		});
	}, [roleDetail]);
	useEffect(() => {
		var titlePer = rolePermissions.hasRole ? rolePermissions.hasRole : [];
		if (rolePermissions.roles) {
			var pers = [];
			var perCount = 0;
			var perMainCount = 0;
			rolePermissions.roles.forEach((e) => {
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
			const filterPers = pers.filter(
				(per) =>
					per.key !== 'learner' &&
					per.key !== 'subscription_package' &&
					per.key !== 'report' &&
					per.key !== 'file' &&
					per.key !== 'notification' &&
					per.key !== 'GetStoryAndHistoryTreePlantingSite' &&
					per.key !== 'CreateTreeFO' &&
					per.key !== 'GetListGreenNewsletterManagement' &&
					per.key !== 'TrackYourTree' &&
					per.key !== 'YourGraden' &&
					per.key !== 'AccessToTree'
			);
			setPermissions({
				...permissions,
				roles: filterPers,
				count: perCount,
				hasRole: titlePer,
				checkAll: perMainCount === titlePer.length ? true : false,
			});
		}
	}, [rolePermissions]);

	//#endregion

	//#region GENERAL_INFO TAB

	function handlSubmit(values) {
		var model = {
			id: detail.id,
			code: detail.code,
			name: values.name,
			description: values.description,
			isActivated: values.isActive,
		};
		setSaveLoading(true);
		dispatch(updateRole(model, _updateSuccess, _updateError));
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

		switch (key) {
			case '2':
				getAccessPermission();
				break;
			// case "3":
			//   getHistories();
			//   break;
			default:
				break;
		}
	}
	//#endregion

	//#region ACCESS TAB
	function getAccessPermission() {
		dispatch(roleAccessPermission(params.id));
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
		data
			.filter((item) => item.key !== 'learner')
			.map((item) => {
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
		};
		setSaveLoading(true);
		dispatch(updateRoleAccessPermission(model, _updatePermissionSuccess, _updatePermissionError));
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

	//#region Access
	function cbSetCheckIndeterminate() {
		const { isMobile, isWeb } = detail;
		setCheckAll({
			...objCheckAll,
			checkAll: isMobile === true && isWeb === true ? true : false,
			indeterminate: isMobile !== isWeb,
		});
	}
	return (
		<Wrapper>
			<PageHeader>
				<IntlMessages id="rolemanagement.form.editRole" />
			</PageHeader>

			<ContentWrapper>
				<Tabs onChange={onChangeTab} activeKey={currTab}>
					<TabPane tab={messages['rolemanagement.form.tab_detail']} key="1">
						{loading !== true ? (
							<Spin tip={messages['common.label.loading']} spinning={saveLoading}>
								<FormWrap>
									<Form onFinish={handlSubmit} form={form}>
										<Row style={rowStyle} gutter={gutter} justify="start">
											<Col md={12} sm={12} xs={24}>
												<LabelRequired>
													<IntlMessages id="common.label.code" />
												</LabelRequired>
												<Form.Item name="code" rules={[{ required: true, message: messages['common.input.notify.required'] }]}>
													<Input placeholder={messages['common.label.code']} size="large" readOnly />
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
													<Input.TextArea placeholder={messages['rolemanagement.page.label.description']} size="large" />
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
												<Button disabled={hasRoleUpdate ? false : true} size="large" type="primary" htmlType="submit">
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
					{/* <TabPane tab={messages['userMng.tab.accessPermission']} key="2">
            {loading !== true ? (
              <Spin tip={messages['common.label.loading']} spinning={saveLoading}>
                {permissions.roles && (
                  <TreeWrap TreeWrap >
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
                  <Button
                    loading={saveLoading}
                    disabled={hasRoleUpdate ? false : true}
                    size="large"
                    type="primary"
                    onClick={handleSavePermission}
                  >
                    <IntlMessages id="userMng.label.save" />
                  </Button>
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
              </Spin>
            ) : (
              <div className="main-loading">
                <Spin />
              </div>
            )}
          </TabPane> */}
				</Tabs>
			</ContentWrapper>
		</Wrapper>
	);
};

export default injectIntl(RoleMngUpdate);
