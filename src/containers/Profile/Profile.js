import React, { useEffect, useState } from 'react';
import PageHeader from '@iso/components/utility/pageHeader';
import Wrapper, { ContentWrapper, Label, PartTitle, FormWrap } from './Profile.styles';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Input, DatePicker, Select, Button, Upload, Spin } from 'antd';
import accountActions from '@iso/redux/account/actions';
import commonActions from '@iso/redux/common/actions';
import * as moment from 'moment';
import { injectIntl } from "react-intl";
import { beforeUpload, getBase64, validateName } from '@iso/lib/helpers/utility';
import IntlMessages from '@iso/components/utility/intlMessages';
import swal from 'sweetalert';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { userLoginProfile, updateUserLoginProfile } = accountActions;
const { getGroupsCommon } = commonActions;
const { Option } = Select;

const domain = process.env.REACT_APP_API_KEY

const MyProfile = props => {

  //#region define
  const [profile, setProfile] = useState({});
  const [uploading, setUploading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const { loading } = useSelector(state => state.Account);
  const userProfile = useSelector(state => state.Account.userLoginProfile);
  const { groups } = useSelector(state => state.Common);

  const dispatch = useDispatch();
  const { messages } = props.intl;
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(userLoginProfile());
    dispatch(getGroupsCommon());
  }, []);
  useEffect(() => {
    setProfile(userProfile);
    form.setFieldsValue({
      fullName: userProfile.fullName,
      dob: userProfile.dob ? moment(new Date(userProfile.dob), dateFormat) : undefined,
      gender: userProfile.gender != null ? userProfile.gender : undefined,
      groupId: userProfile.groupId || undefined,
    })
  }, [userProfile]);
  //#endregion

  //#region OTHER
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  };

  const paddingCol = {
    paddingLeft: '30px',
    paddingRight: '30px'
  }
  const gutter = 16;
  const dateFormat = 'DD/MM/YYYY';
  //#endregion

  //#region UPLOAD
  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text"><IntlMessages id="userMng.label.avatar" /></div>
    </div>
  );
  function handleChangeUpload(info) {
    setProfile({ ...profile, avatarLink: null });
    if (info.file.status === 'uploading') {
      setUploading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj,
        imgUrl => {
          setUploading(false);
          setProfile({ ...profile, avatarLink: imgUrl })
          setImageUpload(info.file);
        }
      );
    }
  };

  //#endregion

  //#region ONCHANGE/SUBMIT
  function handlSubmit(values) {
    var body = new FormData();
    body.set("fullName", values.fullName);
    body.set("gender", values.gender != null ? values.gender : '');
    body.set("dob", values.dob ? values.dob.toJSON() : '');
    body.set("provinceId", values.provinceId || '');
    body.set("districtId", values.districtId || '');
    body.set("wardId", values.wardId || '');
    body.set("street", values.street || '');

    if (imageUpload)
      body.append('avatarImage', imageUpload.originFileObj);
    setSaveLoading(true);
    dispatch(updateUserLoginProfile(body, _updateSuccess, _updateError));
  }
  function _updateSuccess() {
    setSaveLoading(false);
    swal({
      title: messages['modal.notify.title.success'],
      text: messages['modal.notify.content.updateSuccess'],
      icon: "success",
      buttons: [false, messages['modal.label.ok']],
    });
    setTimeout(() => {
      dispatch(userLoginProfile());
    }, 1000);
  }
  function _updateError(res) {
    setSaveLoading(false);
    var err = messages[res] ? messages[res] : messages['modal.notify.content.error'];
    swal({
      title: messages['modal.notify.title.error'],
      text: err,
      icon: "error",
      buttons: [false, messages['modal.label.ok']],
    });
  }
  //#endregion

  return (
    <Wrapper>
      <PageHeader><IntlMessages id="profileMng.page.profile" /></PageHeader>
      <ContentWrapper>
        {loading !== true ? (
          <FormWrap>
            <Form form={form} onFinish={handlSubmit} name="profile-form"
            // initialValues={{ fullName: profile.fullName }}
            >
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${domain}/api/Commons/UploadImage`}
                    beforeUpload={file => beforeUpload(file, messages)}
                    onChange={handleChangeUpload}
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

              <PartTitle><IntlMessages id="profileMng.label.userInfo" /></PartTitle>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={paddingCol}>
                  <Label className="kgb-form-item-title kgb-form-item-title-required"><IntlMessages id="common.label.fullname" /></Label>
                  <Form.Item
                    name="fullName"
                    rules={[
                      { required: true, message: messages['common.input.notify.required'] },
                      { validator: validateName }
                    ]}
                  >
                    <Input placeholder={messages['common.label.fullname']} size="large" />
                  </Form.Item>

                  <Label className="kgb-form-item-title"><IntlMessages id="userMng.label.dob" /></Label>
                  <Form.Item
                    name="dob"
                  >
                    <DatePicker size="large" placeholder="01/01/1996" format={dateFormat} style={{ width: "100%" }} />
                  </Form.Item>

                  <Label className="kgb-form-item-title"><IntlMessages id="userMng.label.gender" /></Label>
                  <Form.Item
                    name="gender"
                  >
                    <Select allowClear placeholder={messages['userMng.label.gender']} size="large">
                      <Option value={1}><IntlMessages id="common.label.male" /></Option>
                      <Option value={0}><IntlMessages id="common.label.female" /></Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col md={12} sm={12} xs={24} style={paddingCol}>
                  <Label className="kgb-form-item-title"><IntlMessages id="userMng.label.groupRole" /></Label>
                  <Form.Item name="groupId">
                    <Select placeholder={messages['userMng.label.groupRole']} className="kgb-list-select" size="large" open={false}>
                      {groups && groups.map(item => (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ marginTop: '30px', paddingLeft: '22px' }}>
                <Button size="large" type="primary" htmlType="submit" loading={saveLoading}><IntlMessages id="common.action.saveChange" /></Button>
              </Form.Item>
            </Form>
          </FormWrap>
        ) :
          <div className="main-loading" ><Spin /></div>
        }
      </ContentWrapper>

    </Wrapper >
  );
};

export default injectIntl(MyProfile);
