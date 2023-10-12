import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Modal, Switch, Upload } from 'antd';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngUpdate/LearnerMngUpdate.styles';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { useIntl } from 'react-intl';
import greenNewsActions from '@iso/redux/greenNews/actions';
import { useDispatch } from 'react-redux';
import { ShowNotify } from '../../utils/ShowNotify';

const domain = process.env.REACT_APP_API_KEY;
const { getGreenNews, createGreenNews, updateGreenNews } = greenNewsActions;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function GreenNewsDrawer(props) {
	const { show, onClose, greenNews, onLoadData } = props;
	const [form] = Form.useForm();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	const [filePdf, setFilePdf] = useState([]);
	const dispatch = useDispatch();
	const { messages } = useIntl();
	// attachmentId;

	useEffect(() => {
		if (greenNews) {
			form.setFieldsValue({
				Label: greenNews.label,
				Title: greenNews.title,
				Description: greenNews.description,
				Link: greenNews.link,
				IsActive: greenNews.isActive,
				File: {
					file: {
						uid: greenNews.attachmentId,
						status: 'done',
						name: greenNews.imageName,
						thumbUrl: greenNews.imageLink,
					},
				},
				FilePDF: {
					file: {
						uid: greenNews?.attachmentId,
						status: 'done',
						name: greenNews?.imageName,
						url: greenNews?.imageLink,
					},
				},
			});
			setFileList([
				{
					uid: greenNews?.attachmentId,
					status: 'done',
					name: greenNews?.imageName,
					thumbUrl: greenNews?.imageLink,
				},
			]);
			if (greenNews?.attachmentIdFilePDF) {
				setFilePdf([
					{
						uid: greenNews?.attachmentIdFilePDF,
						status: 'done',
						name: greenNews?.pdfName,
						url: greenNews?.pdfLink,
					},
				]);
			}
		} else {
			form.resetFields();
			setFileList([]);
			setFilePdf([]);
		}
	}, [greenNews]);

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
	const handleChange = ({ file, fileList }) => {
		let files = fileList.filter((file) => !!file.status);
		setFileList(files);
	};

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

	const handleChangeFilePdf = ({ fileList: newFileList }) => {
		setFilePdf(newFileList);
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		onClose();
		onLoadData();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleSubmit = (values) => {
		const { Title, Label, Description, Link, File, FilePDF, IsActive } = values;

		const formData = new FormData();
		formData.append('Title', Title);
		formData.append('Label', Label);
		formData.append('Description', Description);
		formData.append('Link', Link);
		formData.append('IsActive', IsActive);
		if (FilePDF) {
			formData.append('FilePDF', FilePDF?.file?.originFileObj ? FilePDF.file.originFileObj : FilePDF.file.url);
		}

		formData.append('File', File?.file?.originFileObj ? File.file.originFileObj : File.file.thumbUrl);

		if (greenNews) {
			formData.append('IsDelete', false);

			if (File?.fileList) {
				formData.append('IsChangeImage', true);
			} else {
				formData.append('IsChangeImage', false);
			}

			if (FilePDF?.fileList) {
				formData.append('IsChangePDF', true);
			} else {
				formData.append('IsChangePDF', false);
			}
			dispatch(updateGreenNews(greenNews.id, formData, notifySuccess, notifyError));
		} else {
			dispatch(createGreenNews(formData, notifySuccess, notifyError));
		}
	};

	return (
		<Drawer visible={show} onClose={onClose} title={`${greenNews ? 'Cập Nhật' : 'Đăng Ký'} Bản Tin Xanh`} width={'50%'}>
			<FormWrap>
				<Form initialValues={{ IsActive: true }} id="learnerAddForm" onFinish={handleSubmit} form={form}>
					<LabelRequired>Tiêu đề</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]} name="Title">
						<Input placeholder={'Tiêu đề'} size="large" />
					</Form.Item>

					<LabelRequired>Mô tả</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="Description">
						<Input.TextArea rows={5} placeholder={'Mô tả'} size="large" />
					</Form.Item>

					<Label>Đường dẫn</Label>
					<Form.Item name="Link">
						<Input placeholder={'Đường dẫn'} size="large" />
					</Form.Item>

					<Label>Kích hoạt</Label>
					<Form.Item name="IsActive" valuePropName="checked">
						<Switch />
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

					<Label>File PDF</Label>
					<Form.Item name="FilePDF">
						<Upload multiple={false} action={`${domain}/api/Commons/CheckUpload`} fileList={filePdf} onChange={handleChangeFilePdf}>
							{filePdf.length <= 0 ? (
								<Button>
									<UploadOutlined /> Tải lên
								</Button>
							) : (
								''
							)}
						</Upload>
					</Form.Item>

					<div className="form__btn">
						<Button htmlType="submit" type="primary">
							{greenNews ? 'Cập Nhật' : 'Thêm Mới'}
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

export default GreenNewsDrawer;
