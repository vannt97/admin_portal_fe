import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';

import { ContentWrapper, FormWrap, Label, Wrapper } from '../LearnerMng/LearnerMngUpdate/LearnerMngUpdate.styles';
import { Button, Drawer, Form, Input, Modal, Spin, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import staticImageActions from '@iso/redux/staticImage/actions';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { useIntl } from 'react-intl';
import { ShowNotify } from '../../utils/ShowNotify';

const { getImgPartnersPortal, updateImgPartners } = staticImageActions;
const domain = process.env.REACT_APP_API_KEY;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function Partners() {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [previewLink, setPreviewLink] = useState('');
	const [fileList, setFileList] = useState([]);
	const [fileListAdd, setFileListAdd] = useState([]);
	const [deleteAttchmentId, setDeleteAttachmentId] = useState([]);
	const { messages } = useIntl();
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [formAdd] = Form.useForm();
	const { imgParnersPortal } = useSelector((state) => state?.StaticImage);

	useEffect(() => {
		handleLoadimgParnersPortal();
	}, []);

	useEffect(() => {
		if (imgParnersPortal) {
			const images = imgParnersPortal?.data?.map((img) => ({
				uid: img.attachmentId,
				status: 'done',
				name: img.image.name,
				thumbUrl: img.url,
				link: img.link,
			}));
			setFileList(images);
			form.setFieldsValue({ files: { fileList: images } });
		}
	}, [imgParnersPortal]);

	const handleLoadimgParnersPortal = (body = {}) => {
		dispatch(getImgPartnersPortal(body));
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
		setPreviewLink(file.link || '');
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};
	const handleChange = ({ file, fileList }) => {
		if (!file.originFileObj) {
			setDeleteAttachmentId([...deleteAttchmentId, file.uid]);
		}

		let files = fileList.filter((file) => !!file.status);
		setFileList(files);
	};
	const handleChange1 = ({ file, fileList }) => {
		if (fileListAdd.length === 0) {
			setFileListAdd([file]);
		} else {
			setFileListAdd([]);
		}
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoadimgParnersPortal();
		formAdd.resetFields();
		setOpenDrawer(false);
		setFileListAdd([]);
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleSubmit = ({ Titles, files }) => {
		const { fileList } = files;
		const body = new FormData();
		const getFiles = fileList.map((file) => file.originFileObj);
		const dataFile = getFiles.filter((file) => file !== undefined);
		dataFile.forEach((file) => {
			body.append('Files', file);
		});
		body.append('Titles', [Titles] || '');
		deleteAttchmentId.forEach((id) => {
			body.append('DeletedAttachmentIds', id);
		});

		dispatch(updateImgPartners(body, notifySuccess, notifyError));
	};

	return (
		<>
			<Wrapper>
				<PageHeader hasRoleAdd={true} handleAdd={() => setOpenDrawer(true)}>
					Quản lý ảnh đối tác
				</PageHeader>
				<ContentWrapper>
					<Spin spinning={false}>
						<FormWrap>
							<Form form={form} onFinish={handleSubmit}>
								<Form.Item name="files">
									<Upload
										action={`${domain}/api/Commons/CheckUpload`}
										listType="picture-card"
										fileList={fileList}
										onPreview={handlePreview}
										onChange={handleChange}
										beforeUpload={(file, fileList) => beforeUpload(file, messages)}
									></Upload>
								</Form.Item>

								<span style={{ color: 'red', fontStyle: 'italic' }}>*Kích thước chuẩn: 1200 x 1200</span>

								<Form.Item>
									<Button htmlType="submit" type="primary">
										Lưu thông tin
									</Button>
								</Form.Item>
							</Form>
						</FormWrap>
					</Spin>
				</ContentWrapper>
			</Wrapper>
			<Modal title={previewTitle} visible={previewOpen} onCancel={handleCancel} footer={null}>
				<div style={{ marginBottom: '16px' }}>
					<Label>URL: </Label>
					<span>{previewLink}</span>
				</div>
				<img
					alt="example"
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
			<Drawer visible={openDrawer} title="Thêm ảnh đối tác" width="30%" onClose={() => setOpenDrawer(false)} closable>
				<Form form={formAdd} onFinish={handleSubmit}>
					{/* <Label>URL</Label>
					<Form.Item name="Titles">
						<Input />
					</Form.Item> */}
					<Label>Ảnh đối tác</Label>
					<Form.Item name="files">
						<Upload
							action={`${domain}/api/Commons/CheckUpload`}
							listType="picture-card"
							fileList={fileListAdd}
							onPreview={handlePreview}
							onChange={handleChange1}
							showUploadList={true}
							beforeUpload={(file, fileListAdd) => beforeUpload(file, messages)}
						>
							{fileListAdd.length >= 1 ? null : (
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
							)}
						</Upload>
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" type="primary">
							Lưu thông tin
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
}

export default Partners;
