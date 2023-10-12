import { PlusOutlined } from '@ant-design/icons';
import { beforeUpload } from '@iso/lib/helpers/utility';
import campaignDurationActions from '@iso/redux/campaignDuration/actions';
import giftActions from '@iso/redux/gift/actions';
import { Button, Col, DatePicker, Drawer, Form, Input, Modal, Row, Select, Switch, Upload } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
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

const { createCampaignDuration, updateCampaignDuration, getCampaignDurationDetail } = campaignDurationActions;
const { getGift } = giftActions;
const CampaignDurationDrawer = ({ open, onClose, onLoad, type }) => {
	const { id } = useParams();
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { campaignDurationDetail } = useSelector((state) => state.CampaignDuration);
	const { gift } = useSelector((state) => state.Gift);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);

	const [giftList, setGiftList] = useState([
		{
			giftId: '',
			numberOfGifts: 0,
			winningCode: 0,
			randomFrom: 0,
			randomTo: 0,
		},
	]);
	useEffect(() => {
		if (type.isEdit) {
			dispatch(getCampaignDurationDetail({ id: type.id }, dispatchError));
		}
		dispatch(getGift({ page: 1, limit: 10000000 }));
	}, [type]);

	useEffect(() => {
		if (type.isEdit && campaignDurationDetail.id) {
			form.setFieldsValue({
				Label: campaignDurationDetail?.label,
				Description: campaignDurationDetail?.description,
				StartFrom: moment(campaignDurationDetail?.startFromOfDuration, 'YYYY/MM/DD'),
				EndTo: moment(campaignDurationDetail?.endToOfDuration, 'YYYY/MM/DD'),
				IsActive: campaignDurationDetail?.isActive,
				File: campaignDurationDetail?.imageLink,
			});
			setFileList([
				{
					uid: '-1',
					name: campaignDurationDetail?.imageName || '',
					status: 'done',
					url: campaignDurationDetail?.imageLink,
				},
			]);
			if (campaignDurationDetail.giftOfCampaign.length > 0) {
				const arr = campaignDurationDetail.giftOfCampaign.map((item) => ({
					giftId: item.giftId,
					numberOfGifts: item.numberOfGifts,
					winningCode: item.winningCode,
					randomFrom: item.randomFrom,
					randomTo: item.randomTo,
				}));
				setGiftList(arr);
			} else {
				return setGiftList([
					{
						giftId: '',
						numberOfGifts: 0,
						winningCode: 0,
						randomFrom: 0,
						randomTo: 0,
					},
				]);
			}
		} else {
			form.resetFields();
			setGiftList([
				{
					giftId: '',
					numberOfGifts: 0,
					winningCode: 0,
					randomFrom: 0,
					randomTo: 0,
				},
			]);
		}
	}, [campaignDurationDetail, type]);

	const handleSubmit = (values) => {
		const { Label, Description, StartFrom, EndTo, IsActive, File } = values;
		const formData = new FormData();
		formData.append('Label', Label || '');
		formData.append('Description', Description || '');
		formData.append('StartFrom', moment(StartFrom, 'YYYY/MM/DD').format('MM/DD/YYYY') || '');
		formData.append('EndTo', moment(EndTo, 'YYYY/MM/DD').format('MM/DD/YYYY') || '');
		formData.append('IsActive', IsActive === undefined ? true : IsActive ? true : false);
		if (type.isEdit) {
			formData.append('id', campaignDurationDetail?.id);
			dispatch(
				updateCampaignDuration(
					type.id,
					formData,
					{
						campaignDurationId: campaignDurationDetail?.id,
						gifts: giftList,
					},
					dispatchSuccess,
					dispatchError
				)
			);
		} else {
			formData.append('Id', id);
			dispatch(createCampaignDuration({ id }, formData, dispatchSuccess, dispatchError));
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
		onLoad ? onLoad() : dispatch(getCampaignDurationDetail({ id: type.id }, dispatchError));
		onClose && onClose();
	};

	const dispatchError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleChangeGiftList = (e, type, index) => {
		setGiftList((prev) => {
			prev[index][type] = e;
			return [...prev];
		});
	};

	const handleAddRow = (index) => {
		setGiftList((prev) => {
			if (index === 0) {
				return [...prev, { giftId: '', numberOfGifts: 0, winningCode: 0, randomFrom: 0, randomTo: 0 }];
			} else {
				return prev.filter((giftItem, i) => index !== i);
			}
		});
	};

	const FormContainer = () => {
		return (
			<FormWrap>
				<Form onFinish={handleSubmit} form={form}>
					<LabelRequired>Tên</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên' }]} name="Label">
						<Input placeholder={'Nhập tên'} size="large" />
					</Form.Item>

					<LabelRequired>Mô tả</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="Description">
						<Input.TextArea placeholder={'Nhập mô tả'} size="large" />
					</Form.Item>

					<Row gutter={12}>
						<Col span={12}>
							<LabelRequired>Ngày bắt đầu</LabelRequired>
							<Form.Item name="StartFrom">
								<DatePicker style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<LabelRequired>Ngày kết thúc</LabelRequired>
							<Form.Item name="EndTo">
								<DatePicker style={{ width: '100%' }} />
							</Form.Item>
						</Col>
					</Row>

					{type.isEdit &&
						giftList?.map((giftItem, index) => (
							<>
								<Row align="center" justify="space-between">
									<LabelRequired>Quà</LabelRequired>
									<div onClick={() => handleAddRow(index)}>{index < 1 ? 'Thêm quà' : 'Xóa'}</div>
								</Row>
								<Row gutter={12}>
									<Col span={8}>
										<p>Tên quà</p>
										<CustomSelect
											value={!!giftItem.giftId ? giftItem.giftId : 'Chọn phần quà'}
											onChange={(e) => handleChangeGiftList(e, 'giftId', index)}
										>
											{gift?.data?.data?.map((d) => {
												return <Select.Option value={d.id}>{d.giftName}</Select.Option>;
											})}
										</CustomSelect>
									</Col>
									<Col span={4}>
										<p>Số lượng</p>
										<Input
											value={giftItem.numberOfGifts}
											onChange={(e) => handleChangeGiftList(Number(e.target.value), 'numberOfGifts', index)}
										/>
									</Col>
									<Col span={4}>
										<p>Số trúng</p>
										<Input value={giftItem.winningCode} onChange={(e) => handleChangeGiftList(e.target.value, 'winningCode', index)} />
									</Col>
									<Col span={4}>
										<p>Bé nhất</p>
										<Input
											type="number"
											value={giftItem.randomFrom}
											onChange={(e) => handleChangeGiftList(e.target.value, 'randomFrom', index)}
										/>
									</Col>
									<Col span={4}>
										<p>Lớn nhất</p>
										<Input
											type="number"
											value={giftItem.randomTo}
											onChange={(e) => handleChangeGiftList(e.target.value, 'randomTo', index)}
										/>
									</Col>
								</Row>
							</>
						))}

					<Label>Kích hoạt</Label>
					<Form.Item name="IsActive" valuePropName="checked">
						<Switch defaultChecked />
					</Form.Item>

					<div className="form__btn">
						<Button htmlType="submit" type="primary">
							{type.id ? 'Cập nhật' : 'Thêm'}
						</Button>
					</div>
				</Form>
			</FormWrap>
		);
	};
	return (
		<>
			<Drawer
				title={`${type.id ? 'Cập nhật' : 'Thêm'} thời gian chiến dịch`}
				placement="right"
				onClose={onClose}
				visible={open}
				width="50%"
			>
				<FormContainer />
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

export default CampaignDurationDrawer;
const CustomSelect = styled(Select)`
	width: 100% !important;
`;
