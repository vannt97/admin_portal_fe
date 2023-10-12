import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeaderWithAdd from '@iso/components/utility/customs/pageHeaderWithAdd';
import PageHeader from '@iso/components/utility/pageHeader';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { beforeUpload, infoTotal } from '@iso/lib/helpers/utility';
import treeActions from '@iso/redux/tree/actions';
import treeJourneyActions from '@iso/redux/treeJourney/actions';
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Row, Select, Spin, Switch, Tabs, Tag, Upload } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import TableSearch from '../../../components/TableSearch';
import { ShowNotify } from '../../../utils/ShowNotify';
import { FormWrap, Label, LabelRequired, SearchWrapper } from '../../LearnerMng/LearnerMngList/LearnerMngList.styles';
import { ContentWrapper, Wrapper } from '../../LearnerMng/LearnerMngUpdate/LearnerMngUpdate.styles';
import TreeJourneyDrawer from './TreeJourneyDrawer';

const { TabPane } = Tabs;

const { Option } = Select;

const { getTreeJourney, deleteTreeJourney, exportTreeJourney, updateTreeHistory } = treeJourneyActions;
const domain = process.env.REACT_APP_API_KEY;

const initSearch = {
	page: 1,
	limit: 20,
	searchText: null,
	isActive: null,
};

const { getTreeDetail, getSiteAndType, updateTree } = treeActions;

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

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function TreeDetail() {
	const { id } = useParams();
	const { messages } = useIntl();
	const [showTreeJourney, setShowTreeJourney] = useState(false);
	const [tab, setTab] = useState('1');
	const dispatch = useDispatch();
	const {
		treeDetail,
		typeAndSite: { listTreeType, listTreePlantingSite },
	} = useSelector((state) => state.Tree);
	const { treeJourneys, dataExportTreeJourney } = useSelector((state) => state.TreeJourney);
	const [search, setSearch] = useState(initSearch);
	const [treeJourney, setTreeJourney] = useState();
	const [isShowModal, setIsShowModal] = useState(false);
	const [treeHistoryId, setTreeHistoryId] = useState('');
	const [form] = Form.useForm();
	const [formUpdateDate] = Form.useForm();
	const [typeAndSiteData, setTypeAndSiteData] = useState({
		type: null,
		site: null,
	});
	const [fileList, setFileList] = useState([]);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	useEffect(() => {
		handleLoadTreeDetail();
		handleLoadTreeJourney();
	}, []);
	
	useEffect(() => {
		handleLoadTreeJourney();
	}, [search]);

	useEffect(() => {
		if (treeDetail) {
			form.setFieldsValue({
				phoneNumber: treeDetail?.phoneNumber,
				treePlantingSiteId: treeDetail?.treePlantingSiteId,
				treeTypeId: treeDetail?.treeTypeId,
				publicCode: treeDetail?.publicCode,
				internalCode: treeDetail?.internalCode,
				isActive: treeDetail?.isActive,
				imageSharing: treeDetail?.imageSharing,
				promotionGirlGID: treeDetail?.promotionGirlGID,
			});
			setFileList([
				{
					uid: '-1',
					name: treeDetail?.imageName || '',
					status: 'done',
					url: treeDetail?.imageSharing,
				},
			]);
		}
	}, [treeDetail]);

	useEffect(() => {
		dispatch(getSiteAndType());
	}, []);

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

	const handleLoadTreeDetail = () => {
		dispatch(getTreeDetail(id, notifyError));
	};

	const handleLoadAllTreeJourney = (body = { TreeId: id }) => {
		dispatch(exportTreeJourney(body, notifyError));
	};

	const handleLoadTreeJourney = (
		body = { TreeId: id, Page: search.page, Limit: search.limit, IsActive: search.isActive, Search: search.searchText }
	) => {
		dispatch(getTreeJourney(body));
	};

	const handleSubmitForm = (values) => {
		const { internalCode, isActive, phoneNumber, publicCode, treePlantingSiteId, treeTypeId, imageSharing } = values;
		const formData = new FormData();
		formData.append('internalCode', internalCode || '');
		formData.append('isActive', isActive === undefined ? true : isActive ? true : false);
		formData.append('phoneNumber', phoneNumber || '');
		formData.append('publicCode', publicCode || '');
		formData.append('treePlantingSiteId', treePlantingSiteId || '');
		formData.append('treeTypeId', treeTypeId || '');
		formData.append('id', treeDetail?.id);
		formData.append('SharingAttachment', typeof imageSharing !== 'string' ? imageSharing.file.originFileObj : imageSharing);

		if (typeof imageSharing !== 'string') {
			formData.append('IsChangeImageSharing', true);
		}

		if (treeDetail?.id) {
			dispatch(updateTree(treeDetail?.id, formData, notifySuccess, notifyError));
		}
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoadTreeDetail();
		setIsShowModal(false);
	};

	const handleEditDate = (rowValue) => {
		formUpdateDate.setFieldsValue({
			date: moment(rowValue.estimatedPlantingTime, 'YYYY/MM/DD'),
		});
		setTreeHistoryId(rowValue.id);
		setIsShowModal(true);
	};

	const columnsHistory = [
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
		},
		{
			title: 'Lịch trình',
			dataIndex: 'timeLine',
			render: (value) => {
				return <span>{moment(value).format('DD-MM-YYYY HH:mm:ss')}</span>;
			},
		},
		{
			title: 'Ngày trồng dự kiến',
			dataIndex: 'estimatedPlantingTime',
			render: (value) => {
				return <span>{moment(value).format('DD-MM-YYYY')}</span>;
			},
		},
		{
			fixed: 'right',
			align: 'center',
			width: '10%',
			render: (text, rowValue) => {
				if (rowValue.isAllowEditing) {
					return (
						<div>
							<button onClick={() => handleEditDate(rowValue)} className="mr-2 btn-edit cursor-pointer">
								<EditOutlined />
							</button>
						</div>
					);
				}
			},
		},
	];

	const columns = [
		{
			title: 'Hình ảnh',
			dataIndex: 'imageLink',
			sorter: (a, b) => {
				return a.imageLink < b.imageLink ? -1 : 1;
			},
			render: (value) => {
				return <img className="image-table" src={value} alt="" />;
			},
		},
		{
			title: 'Mô tả',
			dataIndex: 'label',
			ellipsis: true,
			sorter: (a, b) => {
				return a.label < b.label ? -1 : 1;
			},
			render: (value, record) => {
				return (
					<span onClick={() => handleEditTreeJourney(record)} className="title">
						{value}
					</span>
				);
			},
		},
		{
			title: 'Ngày',
			dataIndex: 'timeline',
			sorter: (a, b) => {
				return a.timeline < b.timeline ? -1 : 1;
			},
			render: (value) => {
				return <span>{moment(value).format('DD-MM-YYYY')}</span>;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'isActive',
			sorter: (a, b) => {
				return a.isActive < b.isActive ? -1 : 1;
			},
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? 'Hoạt Động' : 'Không Hoạt Động';
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			fixed: 'right',
			align: 'center',
			width: '10%',
			render: (text, record) => (
				<div>
					<button onClick={() => handleEditTreeJourney(record)} className="mr-2 btn-edit cursor-pointer">
						<EditOutlined />
					</button>
					<Popconfirm
						title={'Bạn có chắc chắn muốn xóa?'}
						okText={'Ok'}
						cancelText={'Hủy'}
						onConfirm={() => handleDeleteTreeJourney(record.id)}
					>
						<button className="btn-delete">
							<DeleteOutlined />
						</button>
					</Popconfirm>
				</div>
			),
		},
	];

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleEditTreeJourney = (record) => {
		setTreeJourney(record);
		setShowTreeJourney(!showTreeJourney);
	};

	const handleDeleteTreeJourney = (id) => {};

	const handleChangePageTreeJourney = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleCreateTreeJourney = () => {
		setShowTreeJourney(!showTreeJourney);
		setTreeJourney();
	};

	const onUpdateDate = (value) => {
		dispatch(updateTreeHistory({ id: treeHistoryId, estimatedPlantingTime: value.date }, notifySuccess, notifyError));
	};

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

	return (
		<>
			<Wrapper>
				{tab === '3' ? (
					<PageHeaderWithAdd hasRoleAdd={true} handleAdd={handleCreateTreeJourney}>
						<div style={{ display: 'block' }}>
							<p>Cây {treeDetail?.treeName}</p>
						</div>
					</PageHeaderWithAdd>
				) : (
					<PageHeader>
						<div style={{ display: 'block' }}>
							<p>Cây {treeDetail?.treeName}</p>
						</div>
					</PageHeader>
				)}
				<Tabs style={{ width: '100%' }} onChange={(tab) => setTab(tab)}>
					<TabPane key={'1'} tab={'Thông tin cây'}>
						<ContentWrapper>
							<FormWrap style={{ width: '500px' }}>
								<Form onFinish={handleSubmitForm} form={form}>
									<LabelRequired>Mã cây</LabelRequired>
									<Form.Item name="publicCode">
										<Input readOnly placeholder={'Nhập mã cây'} size="large" />
									</Form.Item>

									<LabelRequired>Loại cây</LabelRequired>
									<Form.Item rules={[{ required: true, message: 'Vui lòng chọn loại cây' }]} name="treeTypeId">
										<Select placeholder="Chọn loại cây">
											{typeAndSiteData?.type?.map((type) => (
												<Option value={type.value}>{type.name}</Option>
											))}
										</Select>
									</Form.Item>

									<LabelRequired>Điểm trồng</LabelRequired>
									<Form.Item rules={[{ required: true, message: 'Vui lòng chọn điểm trồng cây' }]} name="treePlantingSiteId">
										<Select placeholder="Chọn điểm trồng cây">
											{typeAndSiteData?.site?.map((type) => (
												<Option value={type.value}>{type.name}</Option>
											))}
										</Select>
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

									<Label>PG GID</Label>
									<Form.Item name="promotionGirlGID">
										<Input size="large" />
									</Form.Item>

									<Label>Kích hoạt</Label>
									<Form.Item name="isActive" valuePropName="checked">
										<Switch defaultChecked />
									</Form.Item>

									<div className="form__btn mt-2">
										<Button htmlType="submit" type="primary">
											Cập nhật
										</Button>
									</div>
								</Form>
							</FormWrap>
						</ContentWrapper>
					</TabPane>

					<TabPane tab={'Lịch sử trồng cây'} key="2">
						<ContentWrapper>
							<Spin spinning={false}>
								<TableWrapper
									columns={columnsHistory}
									dataSource={treeDetail?.treeHistory}
									rowKey="id"
									className="isoCustomizedTable"
									pagination={false}
								/>
							</Spin>
						</ContentWrapper>
					</TabPane>

					<TabPane tab={'Hành trình sinh trưởng cây'} key="3">
						<ContentWrapper>
							<TableDemoStyle>
								<SearchWrapper>
									<Row style={{ justifyContent: 'space-between' }}>
										<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
										<TableFilterStatus setSearch={(value) => setSearch(value)} search={search} />
									</Row>
								</SearchWrapper>

								<Spin spinning={false}>
									{infoTotal(search.page, search.limit, treeJourneys?.data?.total)}
									<TableWrapper
										columns={columns}
										dataSource={treeJourneys?.data?.data}
										rowKey="id"
										className="isoCustomizedTable"
										pagination={{
											current: treeJourneys?.data?.page,
											total: treeJourneys?.data?.total,
											pageSize: treeJourneys?.data?.limit,
											onChange: handleChangePageTreeJourney,
											showSizeChanger: true,
										}}
									/>
								</Spin>
							</TableDemoStyle>
						</ContentWrapper>
					</TabPane>
				</Tabs>
			</Wrapper>
			<TreeJourneyDrawer
				treeJourney={treeJourney}
				show={showTreeJourney}
				onClose={() => setShowTreeJourney(!showTreeJourney)}
				onLoadData={handleLoadTreeJourney}
			/>
			<CustomModal
				title="Ngày trồng dự kiến"
				visible={isShowModal}
				onCancel={() => setIsShowModal(false)}
				footer={[
					<Button key="back" onClick={() => setIsShowModal(false)}>
						Hủy
					</Button>,
					<Button form="form-update-date" key="submit" htmlType="submit" className="bg-green-29 text-white-500">
						Cập nhật
					</Button>,
				]}
			>
				<Form form={formUpdateDate} id="form-update-date" onFinish={onUpdateDate}>
					<Form.Item name="date">
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</CustomModal>
			<Modal title={previewTitle} visible={previewOpen} onCancel={() => setPreviewOpen(false)} footer={null}>
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
}

export default TreeDetail;
const CustomModal = styled(Modal)`
	width: 400px !important;
`;
