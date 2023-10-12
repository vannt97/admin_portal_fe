import { PlusOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import React, { useEffect, useState } from 'react';

import { beforeUpload } from '@iso/lib/helpers/utility';
import staticImageActions from '@iso/redux/staticImage/actions';
import { Button, Drawer, Form, Input, Modal, Spin, Switch, Upload } from 'antd';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ShowNotify } from '../../utils/ShowNotify';
import { ContentWrapper, FormWrap, Label, Wrapper } from '../LearnerMng/LearnerMngUpdate/LearnerMngUpdate.styles';
import DragDrop from './DragDrop';

const { getStaticImageTrialPortal, updateImageTrial, switchSetupBanner } = staticImageActions;
const domain = process.env.REACT_APP_API_KEY;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function Banner() {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [previewLink, setPreviewLink] = useState('');
	const [fileList, setFileList] = useState([]);
	const [videos, setVideos] = useState([]);
	const [fileListAdd, setFileListAdd] = useState([]);
	const [deleteAttchmentId, setDeleteAttachmentId] = useState([]);
	const [orderList, setOrderList] = useState([]);
	const [switchSetup, setSwitchSetup] = useState(false);
	const { messages } = useIntl();
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [formAdd] = Form.useForm();
	const { staticImageTrialPortal } = useSelector((state) => state?.StaticImage);

	useEffect(() => {
		handleLoadStaticImageTrialPortal();
	}, []);

	useEffect(() => {
		if (staticImageTrialPortal) {
			const images = staticImageTrialPortal?.data?.entity?.map((img) => ({
				uid: img.attachmentId,
				status: 'done',
				name: img.image.name,
				thumbUrl: img.url,
				link: img.link,
				id: img.id,
				imgId: img.image.id,
				isVides: false,
				order: img.order,
			}));
			const videos = staticImageTrialPortal?.data?.bannerVideo?.map((video) => ({
				uid: video?.id,
				status: 'done',
				name: video.description,
				link: video.linkVideo,
				order: video.order,
				isVides: true,
				order: video.order,
			}));
			setVideos(videos?.sort((a, b) => a.order - b.order));
			setFileList(images?.sort((a, b) => a.order - b.order));
			setSwitchSetup(staticImageTrialPortal?.data?.bannerIsVideo);
			form.setFieldsValue({
				files: { fileList: images },
				videos: videos,
				bannerIsVideo: staticImageTrialPortal?.data?.bannerIsVideo,
			});
		}
	}, [staticImageTrialPortal]);
	console.log(fileList);
	const handleLoadStaticImageTrialPortal = (body = {}) => {
		dispatch(getStaticImageTrialPortal(body));
	};
	console.log(form.getFieldsValue());
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

	const handleChange1 = ({ file, fileList }) => {
		if (fileListAdd.length === 0) {
			setFileListAdd([file]);
		} else {
			setFileListAdd([]);
		}
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoadStaticImageTrialPortal();
		formAdd.resetFields();
		setOpenDrawer(false);
		setFileListAdd([]);
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};
	const handleSubmit = ({ Titles }) => {
		const body = new FormData();
		const arr = [...fileList];
		arr.forEach((file) => {
			body.append('ImageIds', file.id);
		});

		videos.forEach((video) => body.append('VideoIds', video.uid));
		deleteAttchmentId.forEach((id) => {
			body.append('DeletedAttachmentIds', id);
		});
		dispatch(updateImageTrial(body, notifySuccess, notifyError));
	};

	const handleSubmitAdd = ({ Titles, files }) => {
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

		dispatch(updateImageTrial(body, notifySuccess, notifyError));
	};

	const handleChangeSwitch = () => {
		dispatch(switchSetupBanner(notifySuccess, notifyError));
	};

	return (
		<>
			<Wrapper>
				<PageHeader hasRoleAdd={true} handleAdd={() => setOpenDrawer(true)}>
					Quản lý banner
				</PageHeader>
				<ContentWrapper>
					<Spin spinning={false}>
						<FormWrap>
							<Form form={form} onFinish={handleSubmit}>
								Ảnh Banner
								<Form.Item name="files">
									<ul style={{ display: 'flex' }}>
										<DragDrop
											data={fileList}
											setData={setFileList}
											setDeleteAttachmentId={setDeleteAttachmentId}
											deleteAttchmentId={deleteAttchmentId}
										/>
									</ul>
								</Form.Item>
								Video Banner
								<Form.Item name="videos">
									<ul style={{ display: 'flex' }}>
										<DragDrop
											data={videos}
											setData={setVideos}
											type="video"
											onLoad={handleLoadStaticImageTrialPortal}
											maxLength={videos?.length + fileList?.length}
										/>
									</ul>
								</Form.Item>
								<Form.Item name="bannerIsVideo" label="Video Banner">
									<Switch checked={switchSetup} onChange={handleChangeSwitch} />
								</Form.Item>
								<Form.Item>
									<Button htmlType="submit" type="primary" style={{ marginTop: '20px' }}>
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
			<Drawer visible={openDrawer} title="Thêm banner" width="30%" onClose={() => setOpenDrawer(false)} closable>
				<Form form={formAdd} onFinish={handleSubmitAdd}>
					<Label>URL</Label>
					<Form.Item name="Titles">
						<Input />
					</Form.Item>
					<Label>Ảnh banner</Label>
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

export default Banner;
