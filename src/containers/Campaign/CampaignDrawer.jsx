import { PlusOutlined } from '@ant-design/icons';
import { beforeUpload } from '@iso/lib/helpers/utility';
import campaignActions from '@iso/redux/campaign/actions';
import { Button, Col, DatePicker, Drawer, Form, Input, Modal, Row, Switch, Upload } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ShowNotify } from '../../utils/ShowNotify';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';

const domain = process.env.REACT_APP_API_KEY;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const { createCampaign, updateCampaign, getCampaignDetail } = campaignActions;
const CampaignDrawer = ({ open, onClose, onLoad, type }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const { messages } = useIntl();
	const [fileList, setFileList] = useState([]);

	const { campaignDetail } = useSelector((state) => state.Campaign);
	useEffect(() => {
		type.isEdit && dispatch(getCampaignDetail({ id: type.id }, dispatchError));
	}, [type]);

	useEffect(() => {
		if (type.isEdit && campaignDetail.id) {
			form.setFieldsValue({
				Label: campaignDetail?.label,
				CampaignName: campaignDetail?.campaignName,
				Description: campaignDetail?.description,
				StartFrom: moment(campaignDetail?.startFrom, 'DD/MM/YYYY'),
				EndTo: moment(campaignDetail?.endTo, 'DD/MM/YYYY'),
				IsActive: campaignDetail?.isActive,
				File: campaignDetail?.imageLink,
			});
			setFileList([
				{
					uid: '-1',
					name: campaignDetail?.imageName || '',
					status: 'done',
					url: campaignDetail?.imageLink,
				},
			]);
		} else {
			form.resetFields();
		}
	}, [campaignDetail, type]);

	const handleSubmit = (values) => {
		const { Label, CampaignName, Description, StartFrom, EndTo, IsActive, File } = values;
		const formData = new FormData();
		formData.append('Label', Label || '');
		formData.append('CampaignName', CampaignName || '');
		formData.append('Description', Description || '');
		formData.append('StartFrom', moment(StartFrom, 'YYYY/MM/DD').format('MM/DD/YYYY') || '');
		formData.append('EndTo', moment(EndTo, 'YYYY/MM/DD').format('MM/DD/YYYY') || '');
		formData.append('File', typeof File !== 'string' ? File.file.originFileObj : File);
		formData.append('IsActive', IsActive === undefined ? true : IsActive ? true : false);
		if (type.isEdit) {
			formData.append('id', campaignDetail?.id);
			if (typeof File !== 'string') {
				formData.append('IsChangeImage', true);
			}
			dispatch(updateCampaign(campaignDetail.id, formData, dispatchSuccess, dispatchError));
		} else {
			dispatch(createCampaign(formData, dispatchSuccess, dispatchError));
		}
	};

	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			if (file.originFileObj) {
				file.preview = await getBase64(file.originFileObj);
			} else {
				file.preview = file.thumbUrl;
			}
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};
	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);

	const dispatchSuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		onLoad ? onLoad() : dispatch(getCampaignDetail({ id: type.id }, dispatchError));
		onClose && onClose();
	};

	const dispatchError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const FormContainer = () => {
		return (
			<FormWrap>
				<Form onFinish={handleSubmit} form={form}>
					<LabelRequired>Tên</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên' }]} name="Label">
						<Input placeholder={'Nhập tên'} size="large" />
					</Form.Item>

					<LabelRequired>Tên chiến dịch</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên quà tặng' }]} name="CampaignName">
						<Input placeholder={'Nhập tên quà tặng'} size="large" />
					</Form.Item>

					<LabelRequired>Mô tả</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="Description">
						<Input.TextArea placeholder={'Nhập mô tả'} size="large" />
					</Form.Item>

					<Row gutter={24}>
						<Col span={12}>
							<LabelRequired>Ngày bắt đầu</LabelRequired>
							<Form.Item name="StartFrom">
								<DatePicker style={{ width: '100%' }} disabled={type.isEdit} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<LabelRequired>Ngày kết thúc</LabelRequired>
							<Form.Item name="EndTo">
								<DatePicker style={{ width: '100%' }} disabled={type.isEdit} />
							</Form.Item>
						</Col>
					</Row>

					<LabelRequired>Ảnh chiến dịch</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]} name="File">
						<Upload
							action={`${domain}/api/Commons/CheckUpload`}
							listType="picture-card"
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
							beforeUpload={(file, fileList) => beforeUpload(file, messages)}
						>
							{fileList.length >= 1 ? null : uploadButton}
						</Upload>
					</Form.Item>

					<Label>Kích hoạt</Label>
					<Form.Item name="IsActive" valuePropName="checked">
						<Switch defaultChecked />
					</Form.Item>

					<div className="form__btn">
						<Button htmlType="submit" type="primary">
							{campaignDetail.id ? 'Cập nhật' : 'Thêm'}
						</Button>
					</div>
				</Form>
			</FormWrap>
		);
	};

	return (
		<>
			{type.isEdit ? (
				<FormContainer />
			) : (
				<Drawer
					title={`${campaignDetail.id ? 'Cập nhật' : 'Thêm'} chiến dịch`}
					placement="right"
					onClose={onClose}
					visible={open}
					width="50%"
				>
					<FormContainer />
				</Drawer>
			)}

			<Modal title={previewTitle} visible={previewOpen} onCancel={handleCancel} footer={null}>
				<img
					alt="example"
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
		</>
	);
};

export default CampaignDrawer;
