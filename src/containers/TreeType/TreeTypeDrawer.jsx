import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import { SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import treeTypeActions from '@iso/redux/treeType/actions';
import { Button, Drawer, Form, Input, Modal, Switch, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ShowNotify } from '../../utils/ShowNotify';
import { beforeUpload } from '@iso/lib/helpers/utility';

const { createTreeType, updateTreeType } = treeTypeActions;
const domain = process.env.REACT_APP_API_KEY;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function TreeTypeDrawer(props) {
	const { show, onClose, treeType, onLoadData } = props;
	const { messages } = useIntl();
	const [loading, setLoading] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('Hình ảnh');
	const [fileList, setFileList] = useState([]);

	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		if (treeType) {
			const {
				treeName,
				description,
				matureTreeDescription,
				treeNameFunny,
				currentCO2AbsorptionCapacity,
				abilityToAbsorbCO2AsAnAdult,
				isActive,
			} = treeType;
			form.setFieldsValue({
				treeName,
				matureTreeDescription,
				description,
				treeNameFunny,
				currentCO2AbsorptionCapacity,
				abilityToAbsorbCO2AsAnAdult,
				isActive,
				file: treeType.imageLink,
			});
			setFileList([
				{
					uid: treeType.attachmentId,
					name: treeType.imageName,
					status: 'done',
					url: treeType.imageLink,
				},
			]);
		} else {
			setFileList([]);
			form.resetFields();
			setFileList([]);
		}
	}, [treeType]);

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

	const handleSubmit = (values) => {
		const {
			abilityToAbsorbCO2AsAnAdult,
			currentCO2AbsorptionCapacity,
			treeNameFunny,
			description,
			file,
			isActive,
			matureTreeDescription,
			treeName,
		} = values;
		const formData = new FormData();

		formData.append('abilityToAbsorbCO2AsAnAdult', abilityToAbsorbCO2AsAnAdult);
		formData.append('currentCO2AbsorptionCapacity', currentCO2AbsorptionCapacity);
		formData.append('description', description);
		formData.append('isActive', isActive);
		formData.append('matureTreeDescription', matureTreeDescription);
		formData.append('treeName', treeName);
		formData.append('treeNameFunny', treeNameFunny);
		formData.append('file', typeof file !== 'string' ? file.file?.originFileObj : file);

		if (treeType) {
			if (typeof file !== 'string') {
				formData.append('isChangeImage', true);
			}
			dispatch(updateTreeType(treeType.id, formData, notifySuccess, notifyError));
		} else {
			dispatch(createTreeType(formData, notifySuccess, notifyError));
		}
	};

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
		<Drawer visible={show} onClose={onClose} title={`${treeType ? 'Cập Nhật' : 'Đăng Ký'} Loại Cây`} width={'50%'}>
			<FormWrap>
				<Form initialValues={{ isActive: true }} id="learnerAddForm" onFinish={handleSubmit} form={form}>
					<LabelRequired>Tên Cây</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên cây' }]} name="treeName">
						<Input placeholder={'Tên cây'} size="large" />
					</Form.Item>

					<LabelRequired>Tên vui vẻ</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên vui vẻ' }]} name="treeNameFunny">
						<Input placeholder={'Tên vui vẻ'} size="large" />
					</Form.Item>

					<LabelRequired>Mô tả</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="description">
						<Input.TextArea placeholder={'Mô tả'} size="large" />
					</Form.Item>

					<LabelRequired>Mô tả trên ảnh chia sẻ</LabelRequired>
					<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả trên ảnh chia sẻ' }]} name="matureTreeDescription">
						<Input.TextArea placeholder={'Mô tả trên ảnh chia sẻ'} size="large" />
					</Form.Item>

					<LabelRequired>Khả năng hấp thụ CO2 hiện tại</LabelRequired>
					<Form.Item
						rules={[{ required: true, message: 'Vui lòng nhập khả năng hấp thụ CO2 hiện tại' }]}
						name="currentCO2AbsorptionCapacity"
					>
						<Input placeholder={'Khả năng hấp thụ CO2 hiện tại'} size="large" />
					</Form.Item>

					<LabelRequired>Khả năng hấp thụ CO2 trưởng thành</LabelRequired>
					<Form.Item
						rules={[{ required: true, message: 'Vui lòng nhập khả năng hấp thụ CO2 trưởng thành' }]}
						name="abilityToAbsorbCO2AsAnAdult"
					>
						<Input.TextArea rows={5} placeholder={'Khả năng hấp thụ CO2 trưởng thành'} size="large" />
					</Form.Item>

					<Label>Kích hoạt</Label>
					<Form.Item name="isActive" valuePropName="checked">
						<Switch />
					</Form.Item>

					<LabelRequired>Hình ảnh</LabelRequired>
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
							{treeType ? 'Cập Nhật' : 'Thêm Mới'}
						</Button>
					</div>
				</Form>
			</FormWrap>

			<Modal title={previewTitle} visible={previewOpen} footer={null} onCancel={() => setPreviewOpen(!previewOpen)}>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</Drawer>
	);
}

export default TreeTypeDrawer;
