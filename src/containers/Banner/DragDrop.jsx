import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { Input, InputNumber, Modal, Popconfirm, Upload } from 'antd';
import { useRef } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Label } from '../LearnerMng/LearnerMngUpdate/LearnerMngUpdate.styles';
import VideoDrawer from '../Video/VideoDrawer';
import videoActions from '@iso/redux/video/actions';
import { useDispatch } from 'react-redux';
import { ShowNotify } from '../../utils/ShowNotify';

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const domain = process.env.REACT_APP_API_KEY;
const { deleteVideo } = videoActions;

const DragDrop = ({ children, data, setData, type, deleteAttchmentId, setDeleteAttachmentId, onLoad, maxLength }) => {
	const dispatch = useDispatch();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [previewLink, setPreviewLink] = useState('');
	const [videoType, setVideoType] = useState({
		isEdit: true,
		id: '',
		isUseToBanner: true,
	});
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [videoPosition, setVideoPosition] = useState([]);

	const { messages } = useIntl();
	const [draggingIndex, setDraggingIndex] = useState(-1);
	const dragItemRef = useRef();
	const dragItemNodeRef = useRef();

	const handleCancel = () => setPreviewOpen(false);

	function handleDragStart(event, index) {
		setDraggingIndex(index);
		dragItemRef.current = data[index];
		dragItemNodeRef.current = event.target;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/html', dragItemNodeRef.current);
		event.dataTransfer.setDragImage(dragItemNodeRef.current, 20, 20);
	}

	function handleDragOver(event, index) {
		event.preventDefault();
		if (draggingIndex === index) {
			return;
		}
		const itemsCopy = [...data];
		const draggingItem = itemsCopy[draggingIndex];
		itemsCopy.splice(draggingIndex, 1);
		itemsCopy.splice(index, 0, draggingItem);
		setData(itemsCopy);
		setDraggingIndex(index);
	}

	function handleDragEnd() {
		setDraggingIndex(-1);
	}

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

		let files = data.filter((fileItem) => fileItem.uid !== file.uid);
		setData(files);
	};

	const changeVideo = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('click');
	};

	const handleEditVideo = (item) => {
		setShowVideoModal(true);
		setVideoType((prev) => ({ ...prev, id: item.uid }));
	};

	const handleDelete = (item) => {
		dispatch(deleteVideo(item.uid, notifySuccess, notifyError));
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 5000);
		onLoad && onLoad();
		setVideoType((prev) => ({ ...prev, id: '' }));
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 5000);
	};

	const loadData = () => {
		setShowVideoModal(false);
		onLoad && onLoad();
	};

	return (
		<>
			<ul style={{ display: 'flex', gap: '20px' }}>
				{data?.map((item, index) => (
					<li
						key={item.uid}
						draggable
						onDragStart={(event) => handleDragStart(event, index)}
						onDragOver={(event) => handleDragOver(event, index)}
						onDragEnd={handleDragEnd}
						style={{ opacity: draggingIndex === index ? 0.5 : 1 }}
					>
						{type === 'video' ? (
							<ChangeVideoContainer onClick={changeVideo} style={{ display: 'block' }}>
								<iframe
									width="400"
									height="300"
									src={`https://www.youtube.com/embed/${item.link}`}
									title="YouTube video player"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen
								/>
								<div className="video-desc">
									<div>
										<div>
											<span>Tên Video: </span>
											<span>{item.name}</span>
										</div>
									</div>

									<div>
										<ButtonEdit onClick={() => handleEditVideo(item)} className="mr-2 cursor-pointer">
											<EditOutlined />
										</ButtonEdit>
										<Popconfirm title={'Bạn có chắc chắn muốn xóa?'} okText={'Ok'} cancelText={'Hủy'} onConfirm={() => handleDelete(item)}>
											<ButtonDelete className="btn-delete">
												<DeleteOutlined />
											</ButtonDelete>
										</Popconfirm>
									</div>
								</div>
							</ChangeVideoContainer>
						) : (
							<Upload
								action={`${domain}/api/Commons/CheckUpload`}
								listType="picture-card"
								fileList={[item]}
								onPreview={handlePreview}
								onChange={handleChange}
								beforeUpload={(file, fileList) => beforeUpload(file, messages)}
							/>
						)}
					</li>
				))}
			</ul>
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
			<VideoDrawer onClose={() => setShowVideoModal(false)} open={showVideoModal} type={videoType} onLoad={loadData} />
		</>
	);
};

export default DragDrop;

const ChangeVideoContainer = styled.div`
	.video-desc {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 20px;
		> div {
			display: block;
			div {
				display: flex;
				gap: 8px;
			}
		}
	}
`;
const ButtonEdit = styled.button`
	outline: none;
	border: none;
	cursor: pointer;
	color: #1890ff;
	background-color: transparent;
`;
const ButtonDelete = styled.button`
	outline: none;
	border: none;
	cursor: pointer;
	color: red;
	background-color: transparent;
`;
const InputNumberContainer = styled(InputNumber)`
	.ant-input-number-handler-wrap {
		display: none !important;
	}
	input {
		width: 100px;
	}
`;
