import { Drawer, Form, Input, Switch, Button, Upload, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@iso/components/Select';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import treeActions from '@iso/redux/tree/actions';
import { useState } from 'react';
import { ShowNotify } from '../../utils/ShowNotify';
import { PlusOutlined } from '@ant-design/icons';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { useIntl } from 'react-intl';

const domain = process.env.REACT_APP_API_KEY;
const { Option } = Select;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const { getSiteAndType, createTree, updateTree, getTreeDetail } = treeActions;
const TreeDrawer = ({ visible, onClose, treeDetail, onLoadData }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const { messages } = useIntl();
	const [fileList, setFileList] = useState([]);

	const {
		typeAndSite: { listTreeType, listTreePlantingSite },
		treeDetail: detail,
	} = useSelector((state) => state.Tree);

	const [typeAndSiteData, setTypeAndSiteData] = useState({
		type: null,
		site: null,
	});

	useEffect(() => {
		dispatch(getSiteAndType());
	}, []);
	useEffect(() => {
		treeDetail?.id && dispatch(getTreeDetail({ id: treeDetail?.id }, dispatchError));
	}, [treeDetail]);

	useEffect(() => {
		listTreeType &&
			setTypeAndSiteData((prev) => ({
				...prev,
				type: listTreeType?.map((item) => ({ key: item.id, value: item.id, name: item.treeName })),
			}));
		listTreePlantingSite &&
			setTypeAndSiteData((prev) => ({
				...prev,
				site: listTreePlantingSite?.map((item) => ({ key: item.id, value: item.id, name: item.location })),
			}));
	}, [listTreeType, listTreePlantingSite]);

	useEffect(() => {
		detail?.id && treeDetail?.id
			? form.setFieldsValue({
					phoneNumber: detail?.phoneNumber,
					treePlantingSiteId: detail?.treePlantingSiteId,
					treeTypeId: detail?.treeTypeId,
					publicCode: detail?.publicCode,
					internalCode: detail?.internalCode,
					isActive: detail?.isActive,
			  })
			: form.resetFields();
	}, [detail, treeDetail]);

	const handleSubmit = (values) => {
		const { internalCode, isActive, phoneNumber, publicCode, treePlantingSiteId, treeTypeId, imageSharing } = values;
		const formData = new FormData();
		formData.append('internalCode', internalCode || '');
		formData.append('isActive', isActive === undefined ? true : isActive ? true : false);
		formData.append('phoneNumber', phoneNumber || '');
		formData.append('publicCode', publicCode || '');
		formData.append('treePlantingSiteId', treePlantingSiteId || '');
		formData.append('treeTypeId', treeTypeId || '');
		formData.append('imageSharing', typeof imageSharing !== 'string' ? imageSharing.file.originFileObj : imageSharing);
		if (treeDetail?.id) {
			formData.append('id', treeDetail?.id);
			dispatch(updateTree(formData, dispatchSuccess, dispatchError));
		} else {
			dispatch(createTree(formData, dispatchSuccess, dispatchError));
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
		onLoadData();
		onClose();
	};

	const dispatchError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	return (
		<>
			<Drawer title={`${treeDetail ? 'Cập nhật' : 'Thêm'} cây`} placement="right" onClose={onClose} visible={visible} width="50%">
				<FormWrap>
					<Form onFinish={handleSubmit} form={form}>
						<LabelRequired>Mã cây</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mã cây' }]} name="publicCode">
							<Input placeholder={'Nhập mã cây'} size="large" />
						</Form.Item>

						<LabelRequired>Loại cây</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng chọn loại cây' }]} name="treeTypeId">
							<Select options={typeAndSiteData?.type} placeholder="Chọn loại cây" />
						</Form.Item>

						<LabelRequired>Điểm trồng</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập điểm trồng' }]} name="treePlantingSiteId">
							<Select options={typeAndSiteData?.site} placeholder="Chọn điểm trồng cây" />
						</Form.Item>

						<LabelRequired>Ảnh chia sẻ cây</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]} name="imageSharing">
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
						<Form.Item name="isActive" valuePropName="checked">
							<Switch defaultChecked />
						</Form.Item>

						<div className="form__btn">
							<Button htmlType="submit" type="primary">
								{treeDetail ? 'Cập nhật' : 'Thêm'}
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

export default TreeDrawer;
