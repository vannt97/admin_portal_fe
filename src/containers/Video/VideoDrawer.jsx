import { PlusOutlined } from '@ant-design/icons';
import { beforeUpload } from '@iso/lib/helpers/utility';
import videoActions from '@iso/redux/video/actions';
import { Button, Drawer, Form, Input, Modal, Select, Slider, Switch, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ShowNotify } from '../../utils/ShowNotify';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
const domain = process.env.REACT_APP_API_KEY;

const { createVideo, updateVideo, getVideoDetail } = videoActions;
const VideoDrawer = ({ open, onClose, onLoad, type }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { videoDetail } = useSelector((state) => state.Video);

	useEffect(() => {
		type.isEdit && dispatch(getVideoDetail(type.id, dispatchError));
	}, [type]);

	useEffect(() => {
		if (type.isEdit && videoDetail.id) {
			form.setFieldsValue({
				Title: videoDetail?.title,
				Description: videoDetail?.description,
				LinkVideo: videoDetail?.linkVideo,
				IsActive: videoDetail?.isActive,
			});
		} else {
			form.resetFields();
		}
	}, [videoDetail, type]);

	const handleSubmit = (values) => {
		const { Title, Description, LinkVideo, IsActive, UseToBanner } = values;
		const formData = new FormData();
		formData.append('Title', Title || '');
		formData.append('LinkVideo', LinkVideo || '');
		formData.append('Description', Description || '');
		formData.append('UseToBanner', type?.isUseToBanner ? 2 : UseToBanner);
		formData.append('IsActive', IsActive === undefined ? true : IsActive ? true : false);
		if (type.isEdit) {
			dispatch(updateVideo(videoDetail.id, formData, dispatchSuccess, dispatchError));
		} else {
			dispatch(createVideo(formData, dispatchSuccess, dispatchError));
		}
	};

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
			<Drawer title={`${type.isEdit ? 'Cập nhật' : 'Thêm'} video`} placement="right" onClose={onClose} visible={open} width="50%">
				<FormWrap>
					<Form onFinish={handleSubmit} form={form}>
						<LabelRequired>Tên Video</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên Video' }]} name="Title">
							<Input placeholder={'Nhập tên Video'} size="large" />
						</Form.Item>

						<Label>Mô tả</Label>
						<Form.Item name="Description">
							<Input placeholder={'Nhập mô tả'} size="large" />
						</Form.Item>

						<LabelRequired>Link Video</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="LinkVideo">
							<Input.TextArea placeholder={'Nhập mô tả'} size="large" />
						</Form.Item>

						{!type.isEdit && (
							<>
								<LabelRequired>Loại Video</LabelRequired>
								<Form.Item rules={[{ required: true, message: 'Vui lòng chọn loại video' }]} name="UseToBanner">
									<Select>
										{[
											{ value: 2, name: 'Banner' },
											{ value: 0, name: 'Video' },
										].map((item) => (
											<Select.Option value={item.value}>{item.name}</Select.Option>
										))}
									</Select>
								</Form.Item>
							</>
						)}

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
		</>
	);
};

export default VideoDrawer;
