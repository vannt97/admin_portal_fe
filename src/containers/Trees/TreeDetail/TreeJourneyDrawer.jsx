import { Button, DatePicker, Drawer, Form, Input, Modal, Switch, Upload } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FormWrap, Label, LabelRequired } from '../../LearnerMng/LearnerMngList/LearnerMngList.styles';
import { _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import treeJourneyActions from '@iso/redux/treeJourney/actions';
import { ShowNotify } from '@iso/utils/ShowNotify';
import { useParams } from 'react-router';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { useIntl } from 'react-intl';

const { createTreeJourney, updateTreeJourney } = treeJourneyActions;

const domain = process.env.REACT_APP_API_KEY;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function TreeJourneyDrawer(props) {
	const { show, onClose, treeJourney, onLoadData } = props;
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const { messages } = useIntl();
	const dispatch = useDispatch();

	useEffect(() => {
		if (treeJourney) {
			const { label, timeline, isActive, imageName, imageLink } = treeJourney;
			form.setFieldsValue({ label, isActive, timeline: moment(timeline) });

			setFileList([
				{
					uid: '-1',
					name: imageName,
					status: 'done',
					url: imageLink,
				},
			]);
		} else {
			form.resetFields();
			setFileList([]);
		}
	}, [treeJourney]);

	const handleSubmit = (values) => {
		setLoading(true);
		const { label, isActive, file, timeline } = values;
		const formData = new FormData();
		formData.append('label', label);
		formData.append('isActive', isActive);
		formData.append('timeline', moment(timeline).utc().format());

		if (file?.file?.originFileObj) {
			formData.append('file', file.file.originFileObj);
		}

		if (treeJourney) {
			if (typeof file !== 'string') {
				formData.append('isChangeImage', true);
			}
			formData.append('isDelete', false);
			dispatch(updateTreeJourney(treeJourney.id, formData, notifySuccess, notifyError));
		} else {
			formData.append('treeId', id);
			dispatch(createTreeJourney(formData, notifySuccess, notifyError));
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
				Tải lên
			</div>
		</div>
	);

	const notifySuccess = (message) => {
		setLoading(false);
		ShowNotify('Success', message, 'success', 3000);
		onClose();
		onLoadData();
	};

	const notifyError = (message) => {
		setLoading(false);
		ShowNotify('Error', message, 'error', 3000);
	};

	return (
		<Drawer visible={show} onClose={onClose} title={`${treeJourney ? 'Cập Nhật' : 'Đăng Ký'} Hành Trình Sinh Trưởng`} width={'50%'}>
			<FormWrap>
				<Form initialValues={{ isActive: true }} id="learnerAddForm" onFinish={handleSubmit} form={form}>
					<LabelRequired>Mô tả</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="label">
						<Input placeholder={'Mô tả'} size="large" />
					</Form.Item>

					<LabelRequired>Ngày</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập ngày' }]} name="timeline">
						<DatePicker />
					</Form.Item>

					<Label>Kích hoạt</Label>
					<Form.Item name="isActive" valuePropName="checked">
						<Switch />
					</Form.Item>

					<Label>Hình</Label>
					<Form.Item rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]} name="file">
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

					<div className="form__btn">
						<Button loading={loading} htmlType="submit" type="primary">
							{treeJourney ? 'Cập Nhật' : 'Thêm Mới'}
						</Button>
					</div>
				</Form>
			</FormWrap>

			<Modal title={previewTitle} visible={previewOpen} onCancel={handleCancel} footer={null}>
				<img
					alt="example"
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
		</Drawer>
	);
}

export default TreeJourneyDrawer;
