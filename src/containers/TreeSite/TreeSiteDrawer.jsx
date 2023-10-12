import { Button, Drawer, Form, Input, message, Modal, Select, Switch, Upload } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import treeSiteActions from '@iso/redux/treeSite/actions';
import { _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { ShowNotify } from '../../utils/ShowNotify';
import provinces from '../../utils/provinces.json';
import { beforeUpload } from '@iso/lib/helpers/utility';
import { useIntl } from 'react-intl';

const { createTreeSite, updateTreeSite } = treeSiteActions;

const domain = process.env.REACT_APP_API_KEY;
const { Option } = Select;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function TreeSiteDrawer(props) {
	const { show, onClose, onLoadData, treeSite } = props;
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const { messages } = useIntl();
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		if (treeSite) {
			form.setFieldsValue({
				Label: treeSite.label,
				Description: treeSite.description,
				Location: treeSite.location,
				IsActive: treeSite.isActive,
				File: treeSite.imageLink,
				Longitude: treeSite.longitude,
				Latitude: treeSite.latitude,
				ProvinceCode: treeSite.provinceCode,
				provinceCodeInMap: treeSite.provinceCodeInMap,
			});
			setFileList([
				{
					uid: '-1',
					name: treeSite.imageName,
					status: 'done',
					url: treeSite.imageLink,
				},
			]);
		} else {
			form.resetFields();
			setFileList([]);
		}
	}, [treeSite]);

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

	const handleAddSubmit = (values) => {
		const { File, Label, Description, Location, IsActive } = values;

		const formData = new FormData();
		formData.append('Description', Description || '');
		formData.append('Label', Label || '');
		formData.append('Location', Location || '');
		formData.append('IsActive', IsActive);
		formData.append('Longitude', values.Longitude || '');
		formData.append('Latitude', values.Latitude || '');
		formData.append('ProvinceCode', values.ProvinceCode || '');
		formData.append('File', typeof File !== 'string' ? File.file.originFileObj : File);
		formData.append('provinceCodeInMap', values.provinceCodeInMap || '');
		if (treeSite) {
			if (typeof File !== 'string') {
				formData.append('IsChangeImage', true);
			}
			dispatch(updateTreeSite(treeSite.id, formData, notifySuccess, notifyError));
		} else {
			dispatch(createTreeSite(formData, notifySuccess, notifyError));
		}
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		onClose();
		onLoadData();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	return (
		<Drawer visible={show} onClose={onClose} title={`${treeSite ? 'Cập Nhật' : 'Đăng Ký'} Địa Điểm Trồng Cây`} width={'50%'}>
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

					<LabelRequired>Địa điểm</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng địa điểm' }]} name="Location">
						<Input placeholder={'Địa điểm'} size="large" />
					</Form.Item>

					<LabelRequired>Tỉnh/Thành phố</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố' }]} name="ProvinceCode">
						<Select
							allowClear
							showSearch
							filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
						>
							{provinces.map((province) => (
								<Option value={province.code}>{province.province}</Option>
							))}
						</Select>
					</Form.Item>

					<LabelRequired>Vĩ độ</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập vĩ độ' }]} name="Latitude">
						<Input
							placeholder={'Vĩ độ'}
							size="large"
							// disabled={treeSite ? true : false}
						/>
					</Form.Item>

					<LabelRequired>Kinh độ</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng kinh độ' }]} name="Longitude">
						<Input
							placeholder={'Kinh độ'}
							size="large"
							// disabled={treeSite ? true : false}
						/>
					</Form.Item>

					<LabelRequired>Mã trên map </LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mã trên map' }]} name="provinceCodeInMap">
						<Input
							placeholder={'Mã trên map'}
							size="large"
							// disabled={treeSite ? true : false}
						/>
					</Form.Item>

					<Label>Kích hoạt</Label>
					<Form.Item name="IsActive" valuePropName="checked">
						<Switch />
					</Form.Item>

					<LabelRequired>Hình</LabelRequired>
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
							{treeSite ? 'Cập Nhật' : 'Thêm Mới'}
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

export default TreeSiteDrawer;
