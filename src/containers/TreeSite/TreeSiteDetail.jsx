import { PlusOutlined } from '@ant-design/icons';
import PageHeaderWithAdd from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import treeSiteActions from '@iso/redux/treeSite/actions';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Switch, Tabs, Upload } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import provinces from '../../utils/provinces.json';
import { ShowNotify } from '../../utils/ShowNotify';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import TreeSiteHistory from '../TreeSiteHistory';
import TreeSiteStory from '../TreeSiteStory';
import treeSiteHistoryActions from '@iso/redux/treeSiteHistory/actions';
import treeSiteStoryActions from '@iso/redux/treeSiteStory/actions';
import { CSVLink } from 'react-csv';
import { ContentWrapper } from '../LearnerMng/LearnerMngUpdate/LearnerMngUpdate.styles';
import TreeSiteDrawer from './TreeSiteDrawer';

const { updateTreeSite, getTreeSiteDetail } = treeSiteActions;

const { Option } = Select;
const domain = process.env.REACT_APP_API_KEY;

const { getTreeSiteStory, deleteTreeSiteStory, getTreeSiteStoryDetail, exportTreeSiteStory } = treeSiteStoryActions;
const { getTreeSiteHistory, deleteTreeSiteHistory, getTreeSiteHistoryDetail, exportTreeSiteHistory } = treeSiteHistoryActions;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const TreeSiteDetail = (props) => {
	const { id } = useParams();
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	const [fileSign, setFileSign] = useState([]);
	const { dataExportTreeSiteHistory } = useSelector((state) => state.TreeSiteHistory);
	const { dataExportTreeSiteStory } = useSelector((state) => state.TreeSiteStory);
	const [tab, setTab] = useState('1');
	const [showModalStory, setShowModalStory] = useState(false);
	const [showModalHistory, setShowModalHistory] = useState(false);
	const [exportFile, setExportFile] = useState({
		story: false,
		history: false,
	});
	const [dataCsvHistory, setDataCsvHistory] = useState();
	const [dataCsvStory, setDataCsvStory] = useState();
	const [dataCsvCurrent, setDataCsvCurrent] = useState();
	const { treeSiteDetail } = useSelector((state) => state.TreeSite);
	const [loadingExport, setLoadingExport] = useState(false);
	const csvRef = useRef();

	useEffect(() => {
		if (dataExportTreeSiteHistory?.data) {
			const headers = [
				{ label: 'Mô tả', key: 'description' },
				{ label: 'Link ảnh', key: 'imageLink' },
				{ label: 'Ngày tạo', key: 'addedStamp' },
			];

			if (tab === '3') {
				setDataCsvCurrent({
					headers: headers,
					data: dataExportTreeSiteHistory?.data?.data,
				});
				setDataCsvHistory({
					headers: headers,
					data: dataExportTreeSiteHistory?.data?.data,
				});
			}
		}
	}, [dataExportTreeSiteHistory]);

	useEffect(() => {
		if (dataExportTreeSiteStory?.data) {
			const headers = [
				{ label: 'Mô tả', key: 'description' },
				{ label: 'Link ảnh', key: 'imageLink' },
				{ label: 'Ngày tạo', key: 'addedStamp' },
			];

			if (tab === '2') {
				setDataCsvCurrent({
					headers: headers,
					data: dataExportTreeSiteStory?.data?.data,
				});
				setDataCsvStory({
					headers: headers,
					data: dataExportTreeSiteStory?.data?.data,
				});
			}
		}
	}, [dataExportTreeSiteStory]);

	useEffect(() => {
		if (dataCsvStory && loadingExport) {
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	}, [dataCsvStory]);

	useEffect(() => {
		if (dataCsvHistory && loadingExport) {
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	}, [dataCsvHistory]);

	useEffect(() => {
		dispatch(getTreeSiteDetail(id));
	}, [id]);

	const handleLoadAllTreeSiteHistory = (body = { page: 1, id: id, limit: 9999 }) => {
		dispatch(exportTreeSiteHistory(body, notifyError));
	};

	const handleLoadAllTreeSiteStory = () => {
		dispatch(exportTreeSiteStory({ id: id, page: 1, limit: 9999 }, notifyError));
	};

	useEffect(() => {
		if (treeSiteDetail) {
			form.setFieldsValue({
				Label: treeSiteDetail.label,
				Description: treeSiteDetail.description,
				Location: treeSiteDetail.location,
				IsActive: treeSiteDetail.isActive,
				File: treeSiteDetail.imageLink,
				FileCertificate: treeSiteDetail.imageCertificate,
				Longitude: treeSiteDetail.longitude,
				Latitude: treeSiteDetail.latitude,
				ProvinceCode: treeSiteDetail.provinceCode,
				provinceCodeInMap: treeSiteDetail.provinceCodeInMap,
				Jobtitle: treeSiteDetail.jobtitle,
				Fullname: treeSiteDetail.fullname,
				treeCaretakerByLocation: treeSiteDetail.treeCaretakerByLocation,
				estimatedPlantingTime: moment(treeSiteDetail.estimatedPlantingTime, 'DD/MM/YYYY') || moment(new Date(), 'DD/MM/YYYY'),
				estimatedPlantingTimeSecond: moment(treeSiteDetail.estimatedPlantingTimeSecond, 'DD/MM/YYYY') || moment(new Date(), 'DD/MM/YYYY'),
				estimatedPlantingTimeFirst: moment(treeSiteDetail.estimatedPlantingTimeFirst, 'DD/MM/YYYY') || moment(new Date(), 'DD/MM/YYYY'),
			});
			setFileList([
				{
					uid: '-1',
					name: treeSiteDetail.imageName,
					status: 'done',
					url: treeSiteDetail.imageLink,
				},
			]);
			setFileSign([
				{
					uid: '-1',
					name: treeSiteDetail.fullname,
					status: 'done',
					url: treeSiteDetail.imageCertificate,
				},
			]);
		} else {
			form.resetFields();
			setFileList([]);
		}
	}, [treeSiteDetail]);

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
	const handleChangeSign = ({ fileList: newFileList }) => setFileSign(newFileList);
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
	const handleAddSubmit = (values) => {
		const { File, FileCertificate, Label, Description, Location, IsActive, Jobtitle, Fullname } = values;
		const formData = new FormData();
		formData.append('Description', Description || '');
		formData.append('Label', Label || '');
		formData.append('Location', Location || '');
		formData.append('IsActive', IsActive);
		formData.append('Longitude', values.Longitude || '');
		formData.append('Latitude', values.Latitude || '');
		formData.append('ProvinceCode', values.ProvinceCode || '');
		formData.append('File', typeof File !== 'string' ? File.file.originFileObj : File);
		formData.append('FileCertificate', typeof FileCertificate !== 'string' ? FileCertificate.file.originFileObj : FileCertificate);
		formData.append('provinceCodeInMap', values.provinceCodeInMap || '');
		formData.append('Fullname', values.Fullname || '');
		formData.append('Jobtitle', values.Jobtitle || '');
		formData.append('estimatedPlantingTime', `${moment(values.estimatedPlantingTime).format('MM/DD/YYYY')}` || '');
		formData.append('estimatedPlantingTimeSecond', `${moment(values.estimatedPlantingTimeSecond).format('MM/DD/YYYY')}` || '');
		formData.append('estimatedPlantingTimeFirst', `${moment(values.estimatedPlantingTimeFirst).format('MM/DD/YYYY')}` || '');
		formData.append('treeCaretakerByLocation', values.treeCaretakerByLocation || '');
		if (Object.keys(treeSiteDetail).length) {
			if (typeof File !== 'string') {
				formData.append('IsChangeImage', true);
			}
			if (typeof FileCertificate !== 'string') {
				formData.append('IsChangeCertificate', true);
			}
			dispatch(updateTreeSite(id, formData, notifySuccess, notifyError));
		}
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleAddModal = () => {
		tab === '2' && setShowModalStory(true);
		tab === '3' && setShowModalHistory(true);
	};

	const handleChangeTabs = (tab) => {
		setTab(tab);
		setShowModalHistory(false);
		setShowModalStory(false);
	};

	const handleExportFile = () => {
		setLoadingExport(true);
		if (tab === '2') {
			handleLoadAllTreeSiteStory();
		}
		if (tab === '3') {
			handleLoadAllTreeSiteHistory();
		}
	};

	return (
		<LayoutContentWrapper>
			{tab === '1' ? (
				<PageHeader>
					<span>
						{treeSiteDetail.location} {treeSiteDetail.label}
					</span>
				</PageHeader>
			) : (
				<PageHeaderWithAdd
					hasRoleAdd={true}
					handleAdd={handleAddModal}
					isExport
					handleExport={
						<Button onClick={() => handleExportFile()} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
							Export
						</Button>
					}
				>
					<span>
						{treeSiteDetail.location} {treeSiteDetail.label}
					</span>

					<CSVLink
						data={dataCsvCurrent?.data || []}
						headers={dataCsvCurrent?.headers || []}
						moment
						ref={csvRef}
						filename={`DanhSach${tab === '2' ? 'CauChuyen' : 'LichSu'}TrongCay(${moment(Date.now()).format('DD-MM-YYYY')})`}
						style={{ color: '#fff' }}
					/>
				</PageHeaderWithAdd>
			)}

			<Tabs style={{ width: '100%' }} onChange={(tab) => handleChangeTabs(tab)}>
				<Tabs.TabPane tab="Chi tiết điểm trồng cây" key="1">
					<ContentWrapper>
						<FormWrap>
							<Form
								initialValues={{ IsActive: true }}
								id="learnerAddForm"
								onFinish={handleAddSubmit}
								form={form}
								style={{ padding: '20px' }}
							>
								<LabelRequired>Tên</LabelRequired>
								<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên' }]} name="Label">
									<Input placeholder={'tên'} size="large" />
								</Form.Item>
								<LabelRequired>Mô tả</LabelRequired>
								<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]} name="Description">
									<Input.TextArea rows={5} placeholder={'Mô tả'} size="large" />
								</Form.Item>
								<Row gutter={24}>
									<Col span={24}>
										<LabelRequired>Địa điểm</LabelRequired>
										<Form.Item rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]} name="Location">
											<Input placeholder={'Địa điểm'} size="large" />
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={24}>
									<Col span={12}>
										<LabelRequired>Tỉnh/Thành phố</LabelRequired>
										<Form.Item name="ProvinceCode">
											<CustomSelect
												allowClear
												showSearch
												filterOption={(input, option) => option.children.toString().toLowerCase().includes(input.toLowerCase())}
											>
												{provinces.map((province) => (
													<Option value={province.code}>{province.province}</Option>
												))}
											</CustomSelect>
										</Form.Item>
									</Col>

									<Col span={12}>
										<Label>Người chăm sóc</Label>
										<Form.Item name="treeCaretakerByLocation">
											<Input style={{ height: '42px' }} placeholder={'Người chăm sóc'} size="large" />
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={24}>
									<Col span={8}>
										<LabelRequired>Thời gian cây được thêm vào danh sách trồng </LabelRequired>
										<Form.Item name="estimatedPlantingTime">
											<CustomDatePicker style={{ width: '100%' }} />
										</Form.Item>
									</Col>

									<Col span={8}>
										<LabelRequired>Thời gian phát quang, sẵn sàng đón cây về rừng </LabelRequired>
										<Form.Item name="estimatedPlantingTimeSecond">
											<CustomDatePicker style={{ width: '100%' }} />
										</Form.Item>
									</Col>

									<Col span={8}>
										<LabelRequired>Thời gian trồng cây dự kiến </LabelRequired>
										<Form.Item name="estimatedPlantingTimeFirst">
											<CustomDatePicker style={{ width: '100%' }} />
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={24}>
									<Col span={8}>
										<LabelRequired>Vĩ độ</LabelRequired>
										<Form.Item rules={[{ required: true, message: 'Vui lòng nhập vĩ độ' }]} name="Latitude">
											<Input placeholder={'Vĩ độ'} size="large" />
										</Form.Item>
									</Col>
									<Col span={8}>
										<LabelRequired>Kinh độ</LabelRequired>
										<Form.Item rules={[{ required: true, message: 'Vui lòng nhập kinh độ' }]} name="Longitude">
											<Input placeholder={'Kinh độ'} size="large" />
										</Form.Item>
									</Col>

									<Col span={8}>
										<LabelRequired>Mã trên map </LabelRequired>
										<Form.Item rules={[{ required: true, message: 'Vui lòng nhập mã trên map' }]} name="provinceCodeInMap">
											<Input placeholder={'Mã trên map'} size="large" />
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={24}>
									<Col span={12}>
										<LabelRequired>Tên người quản lý</LabelRequired>
										<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên' }]} name="Fullname">
											<Input placeholder={'Tên người quản lý'} size="large" />
										</Form.Item>
									</Col>
									<Col span={12}>
										<LabelRequired>Chức vụ</LabelRequired>
										<Form.Item rules={[{ required: true, message: 'Vui lòng nhập chức vụ' }]} name="Jobtitle">
											<Input placeholder={'Chức vụ'} size="large" />
										</Form.Item>
									</Col>
								</Row>

								<LabelRequired>Hình địa điểm</LabelRequired>
								<Form.Item rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]} name="File">
									<Upload
										action={`${domain}/api/Commons/CheckUpload`}
										listType="picture-card"
										fileList={fileList}
										onPreview={handlePreview}
										onChange={handleChange}
									>
										{fileList.length >= 1 ? null : uploadButton}
									</Upload>
								</Form.Item>

								<LabelRequired>Hình chữ ký</LabelRequired>
								<Form.Item name="FileCertificate">
									<Upload
										action={`${domain}/api/Commons/CheckUpload`}
										listType="picture-card"
										fileList={fileSign}
										onPreview={handlePreview}
										onChange={handleChangeSign}
									>
										{fileSign.length >= 1 ? null : uploadButton}
									</Upload>
								</Form.Item>

								<Label>Kích hoạt</Label>
								<Form.Item name="IsActive" valuePropName="checked">
									<Switch />
								</Form.Item>

								<div className="form__btn">
									<Button htmlType="submit" type="primary">
										{Object?.keys(treeSiteDetail).length ? 'Cập Nhật' : 'Thêm Mới'}
									</Button>
								</div>
							</Form>
						</FormWrap>
					</ContentWrapper>
					<Modal title={previewTitle} visible={previewOpen} onCancel={handleCancel} footer={null}>
						<img
							alt="example"
							style={{
								width: '100%',
							}}
							src={previewImage}
						/>
					</Modal>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Câu chuyện điểm trồng" key="2">
					<ContentWrapper>
						<TreeSiteStory
							showModalStory={showModalStory}
							onClose={() => setShowModalStory(false)}
							onOpen={() => setShowModalStory(true)}
							exportFile={exportFile.story}
						/>
					</ContentWrapper>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Lịch sử điểm trồng" key="3">
					<ContentWrapper>
						<TreeSiteHistory
							showModalHistory={showModalHistory}
							onClose={() => setShowModalHistory(false)}
							onOpen={() => setShowModalHistory(true)}
							exportFile={exportFile.history}
						/>
					</ContentWrapper>
				</Tabs.TabPane>
			</Tabs>
		</LayoutContentWrapper>
	);
};

export default TreeSiteDetail;
const CustomDatePicker = styled(DatePicker)`
	padding: 8.2px 11px 8.2px !important;
`;
const CustomSelect = styled(Select)`
	.ant-select-selector {
		height: 40.3px !important;
		padding: 5px 11px !important;
	}
`;
const CustomTabs = styled(Tabs)`
	.ant-tabs-nav-wrap {
		margin-left: 20px;
	}
`;
