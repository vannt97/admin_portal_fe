import { PlusOutlined } from '@ant-design/icons';
import treeSiteStoryActions from '@iso/redux/treeSiteStory/actions';
import { Button, Drawer, Form, Input, Modal, Switch, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ShowNotify } from '../../utils/ShowNotify';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import { useIntl } from 'react-intl';

const { createTreeSiteStory, updateTreeSiteStory } = treeSiteStoryActions;

const domain = process.env.REACT_APP_API_KEY;
const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function TreeSiteStoryDrawer(props) {
	const { visible, onClose, onLoadData, treeSite, actionType } = props;
	const { treeSiteStoryDetail } = useSelector((state) => state.TreeSiteStory);
	const { id } = useParams();
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { messages } = useIntl();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		if (treeSiteStoryDetail && Object?.keys(treeSiteStoryDetail) && actionType === 2) {
			form.setFieldsValue({
				Label: treeSiteStoryDetail.label,
				Description: treeSiteStoryDetail.description,
				IsActive: treeSiteStoryDetail.isActive,
				File: treeSiteStoryDetail.imageLink,
			});
			setFileList([
				{
					uid: '-1',
					name: treeSiteStoryDetail.imageName,
					status: 'done',
					url: treeSiteStoryDetail.imageLink,
				},
			]);
		} else {
			form.resetFields();
			setFileList([]);
		}
	}, [treeSiteStoryDetail, actionType]);

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

	const handleAddSubmit = (values) => {
		const { File, Label, Description, IsActive } = values;

		const formData = new FormData();
		formData.append('Description', Description);
		formData.append('Label', Label);
		formData.append('IsActive', IsActive);
		formData.append('File', typeof File !== 'string' ? File.file.originFileObj : File);
		formData.append('TreePlantingSiteId', id);
		if (actionType === 2) {
			if (typeof File !== 'string') {
				formData.append('IsChangeImage', true);
			}
			dispatch(updateTreeSiteStory(treeSiteStoryDetail.id, formData, notifySuccess, notifyError));
		} else {
			dispatch(createTreeSiteStory(formData, notifySuccess, notifyError));
		}
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		onClose();
		onLoadData();
		form.resetFields();
		setFileList([]);
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleCancel = () => setPreviewOpen(false);

	return (
		<>
			<Drawer
				visible={visible}
				onClose={onClose}
				title={`${actionType === 2 ? 'Cập Nhật' : 'Tạo'} Câu Chuyện Điểm Trồng Cây`}
				width={'50%'}
			>
				<FormWrap>
					<Form initialValues={{ IsActive: true }} id="learnerAddForm" onFinish={handleAddSubmit} form={form}>
						<LabelRequired>Tên</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên' }]} name="Label">
							<Input placeholder={'tên'} size="large" />
						</Form.Item>

						<LabelRequired>Mô tả</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="Description">
							<Input.TextArea rows={5} placeholder={'Mô tả'} size="large" />
						</Form.Item>

						<Label>Kích hoạt</Label>
						<Form.Item name="IsActive" valuePropName="checked">
							<Switch checked />
						</Form.Item>

						<Label>Hình</Label>
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

						<div className="form__btn">
							<Button htmlType="submit" type="primary">
								{actionType === 2 ? 'Cập Nhật' : 'Thêm Mới'}
							</Button>
						</div>
					</Form>
				</FormWrap>
			</Drawer>
			<Modal title={previewTitle} visible={previewOpen} footer={null} onCancel={handleCancel}>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	);
}

export default TreeSiteStoryDrawer;
