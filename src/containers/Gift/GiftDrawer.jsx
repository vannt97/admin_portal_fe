import { Drawer, Form, Input, Switch, Button, Upload, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@iso/components/Select';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import giftActions from '@iso/redux/gift/actions';
import { useState } from 'react';
import { ShowNotify } from '../../utils/ShowNotify';
import { PlusOutlined } from '@ant-design/icons';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { useIntl } from 'react-intl';
const domain = process.env.REACT_APP_API_KEY;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const { createGift, updateGift, getGiftDetail } = giftActions;
const GiftDrawer = ({ open, onClose, onLoad, type }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const { messages } = useIntl();
	const [fileList, setFileList] = useState([]);

	const { giftDetail } = useSelector((state) => state.Gift);

	useEffect(() => {
		type.isEdit && dispatch(getGiftDetail({ id: type.id }, dispatchError));
	}, [type]);

	useEffect(() => {
		if (type.isEdit && giftDetail.id) {
			form.setFieldsValue({
				Label: giftDetail?.label,
				GiftName: giftDetail?.giftName,
				Description: giftDetail?.description,
				GiftType: giftDetail?.giftType,
				IsActive: giftDetail?.isActive,
				File: giftDetail?.imageLink,
			});
			setFileList([
				{
					uid: '-1',
					name: giftDetail?.imageName || '',
					status: 'done',
					url: giftDetail?.imageLink,
				},
			]);
		} else {
			setFileList([]);
			form.resetFields();
		}
	}, [giftDetail, type]);

	const handleSubmit = (values) => {
		const { Label, GiftName, Description, GiftType, IsActive, File } = values;
		const formData = new FormData();
		formData.append('Label', Label || '');
		formData.append('GiftName', GiftName || '');
		formData.append('Description', Description || '');
		formData.append('GiftType', Number(GiftType) || 0);
		formData.append('File', typeof File !== 'string' ? File.file.originFileObj : File);
		formData.append('IsActive', IsActive === undefined ? true : IsActive ? true : false);
		if (type.isEdit) {
			formData.append('id', giftDetail?.id);
			if (typeof File !== 'string') {
				formData.append('IsChangeImage', true);
			}
			dispatch(updateGift(giftDetail.id, formData, dispatchSuccess, dispatchError));
		} else {
			dispatch(createGift(formData, dispatchSuccess, dispatchError));
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
		onLoad();
		onClose();
	};

	const dispatchError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};
	return (
		<>
			<Drawer title={`${type.isEdit ? 'Cập nhật' : 'Thêm'} quà`} placement="right" onClose={onClose} visible={open} width="50%">
				<FormWrap>
					<Form onFinish={handleSubmit} form={form}>
						<LabelRequired>Tên</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên' }]} name="Label">
							<Input placeholder={'Nhập tên'} size="large" />
						</Form.Item>

						<LabelRequired>Tên quà tặng</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên quà tặng' }]} name="GiftName">
							<Input placeholder={'Nhập tên quà tặng'} size="large" />
						</Form.Item>

						<LabelRequired>Mô tả</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="Description">
							<Input.TextArea placeholder={'Nhập mô tả'} size="large" />
						</Form.Item>

						{!type.isEdit && (
							<>
								<LabelRequired>Loại (1 - 5, nếu trượt = 6)</LabelRequired>
								<Form.Item
									rules={[
										{ required: true, message: 'Vui lòng nhập loại' },
										{ max: 6, message: 'Tối đa là 6' },
										{ min: 1, message: 'Tối thiểu là 1' },
									]}
									name="GiftType"
								>
									<Input type="number" />
								</Form.Item>
							</>
						)}

						<LabelRequired>Ảnh quà tặng</LabelRequired>
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
								{type.isEdit ? 'Cập nhật' : 'Thêm'}
							</Button>
						</div>
					</Form>
				</FormWrap>
			</Drawer>

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

export default GiftDrawer;
