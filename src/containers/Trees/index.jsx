import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import treeActions from '@iso/redux/tree/actions';
import { Button, Popconfirm, Spin, Tag, Row, Col, Modal, Form, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { infoTotal, SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TableSearch from '../../components/TableSearch';
import { ShowNotify } from '../../utils/ShowNotify';
import TreeDrawer from './TreeDrawer';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import { Label } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import Axios from 'axios';

const { getTree, deleteTree, exportTree, getTreeShare, getTreeShareAll } = treeActions;

const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
};

function Trees() {
	const [visible, setVisible] = useState(false);
	const { trees, dataExportTrees } = useSelector((state) => state.Tree);
	const [treeDetail, setTreeDetail] = useState();
	const [dataCSV, setDataCSV] = useState();
	const [dataTreeShareCSV, setDataTreeShareCSV] = useState();
	const [dataTreeShareAllCSV, setDataTreeShareAllCSV] = useState();
	const [search, setSearch] = useState(initSearch);
	const history = useHistory();
	const dispatch = useDispatch();
	const csvRef = useRef(null);
	const csvTreeShareRef = useRef(null);
	const csvTreeShareAllRef = useRef(null);
	const [loadingExport, setLoadingExport] = useState(false);
	const [formDate] = Form.useForm();
	const [openModalDate, setOpenModalDate] = useState(false);
	const [openModalExportType, setOpenModalExportType] = useState(false);
	const [exportType, setExportType] = useState('');

	useEffect(() => {
		handleLoadTree();
	}, [search]);

	useEffect(() => {
		if (!dataCSV?.data) {
			const headers = [
				{ label: 'Mã cây', key: 'publicCode' },
				{ label: 'Tên cây', key: 'treeName' },
				{ label: 'Địa điểm trồng', key: 'location' },
				{ label: 'Lượt share', key: 'totalShareCertificate' },
				{ label: 'Ngày tạo', key: 'addedStamp' },
				{ label: 'Ngày trồng dự kiến', key: 'treeHistory[0].estimatedPlantingTime' },
				{ label: 'PG', key: 'promotionGirlGID' },
			];
			if (dataExportTrees?.data) {
				setDataCSV({
					headers: headers,
					data: dataExportTrees?.data?.data,
				});
			}
		}
	}, [dataExportTrees]);

	useEffect(() => {
		if (dataCSV && loadingExport) {
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	}, [dataCSV]);

	const handleLoadTree = (body = { page: search.page, limit: search.limit, search: search.searchText, isActive: search.isActive }) => {
		dispatch(getTree(body));
	};

	const handleLoadAllTree = (body = { page: 1, limit: 9999 }) => {
		dispatch(exportTree(body));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deleteTree(id, notifySuccess, notifyError));
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoadTree();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const columns = [
		{
			title: 'Mã cây',
			width: '10%',
			dataIndex: 'publicCode',
			sorter: (a, b) => {
				return a.publicCode < b.publicCode ? -1 : 1;
			},
			render: (value, record) => (
				<span onClick={() => handleRedirectTreeInfo(record)} className="title">
					{value}
				</span>
			),
		},
		{
			title: 'Loại Cây',
			width: '10%',
			dataIndex: 'treeName',
			sorter: (a, b) => {
				return a.treeName < b.treeName ? -1 : 1;
			},
		},
		{
			title: 'Địa điểm',
			dataIndex: 'location',
			width: '10%',
			sorter: (a, b) => {
				return a.location < b.location ? -1 : 1;
			},
		},

		{
			title: 'Thời gian',
			dataIndex: 'addedStamp',
			width: '10%',
			sorter: (a, b) => {
				return a.addedStamp < b.addedStamp ? -1 : 1;
			},
			render: (value) => <span>{value.split(' ')[0]}</span>,
		},
		{
			title: 'Lượt share',
			dataIndex: 'totalShareCertificate',
			width: '10%',
			sorter: (a, b) => {
				return a.totalShareCertificate < b.totalShareCertificate ? -1 : 1;
			},
		},
		{
			title: 'PG GID',
			dataIndex: 'promotionGirlGID',
			width: '10%',
			sorter: (a, b) => {
				return a.promotionGirlGID < b.promotionGirlGID ? -1 : 1;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'isActive',
			width: '10%',

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
					<button onClick={() => handleRedirectTreeInfo(record)} className="mr-2 btn-edit cursor-pointer">
						<EditOutlined />
					</button>
					<Popconfirm title={'Bạn có chắc chắn muốn xóa?'} okText={'Ok'} cancelText={'Hủy'} onConfirm={() => handleDelete(record.id)}>
						<button className="btn-delete">
							<DeleteOutlined />
						</button>
					</Popconfirm>
				</div>
			),
		},
	];

	const handleAddModal = () => {
		setVisible(!visible);
		setTreeDetail();
	};

	const handleRedirectTreeInfo = (record) => {
		history.push(`/dashboard/trees/${record.id}`);
	};

	const handleExportFile = () => {
		if (dataExportTrees?.data) {
			csvRef.current.link.click();
		} else {
			setLoadingExport(true);
			handleLoadAllTree();
		}
	};

	const onSubmitForm = async (values) => {
		const { DateFrom, DateTo } = values;
		if (DateFrom && DateTo) {
			if (moment(DateTo).isAfter(moment(DateFrom))) {
				if (exportType === 'all') {
					dispatch(
						getTreeShareAll(
							{
								dateFrom: moment(DateFrom).format('MM/DD/YYYY'),
								dateTo: moment(DateTo).format('MM/DD/YYYY'),
								search: search.searchText,
								limit: 10000000,
							},
							exportTreeShareAllSuccess
						)
					);
				} else {
					dispatch(
						getTreeShare(
							{ dateFrom: moment(DateFrom).format('MM/DD/YYYY'), dateTo: moment(DateTo).format('MM/DD/YYYY') },
							exportTreeShareSuccess
						)
					);
				}
			} else {
				ShowNotify('Error', 'Ngày bắt đầu phải bé hơn ngày kết thúc', 'error');
			}
		} else {
			ShowNotify('Error', 'Nhập ngày bắt đầu và ngày kết thúc', 'error');
		}
	};

	const exportTreeShareSuccess = (res) => {
		if (res) {
			const headers = [
				{ label: 'Mã cây', key: 'publicCode' },
				{ label: 'Số lượt chia sẻ', key: 'total' },
				{ label: 'Số lần trúng thưởng', key: 'totalNumberOfPrizeWinnings' },
				{ label: 'Số lần quay', key: 'totalNumberOfSpins' },
				{ label: 'Từ ngày', key: 'dateFrom' },
				{ label: 'Đến ngày', key: 'dateTo' },
			];
			const arr = res?.data?.map((item) => {
				if (item.listDate.length === 0) {
					return {
						...item,
						dateFrom: moment(item.dateFrom).format('DD/MM/YYYY HH:mm:ss'),
						dateTo: moment(item.dateTo).format('DD/MM/YYYY HH:mm:ss'),
						listDate: '',
					};
				} else {
					const arrDate = item.listDate.map((item) => moment(item).format('DD/MM/YYYY HH:mm'));
					return {
						...item,
						dateFrom: moment(item.dateFrom).format('DD/MM/YYYY HH:mm:ss'),
						dateTo: moment(item.dateTo).format('DD/MM/YYYY HH:mm:ss'),
						listDate: JSON.stringify(arrDate),
					};
				}
			});
			setDataTreeShareCSV({
				headers: headers,
				data: arr,
			});
			csvTreeShareRef.current.link.click();
			formDate.resetFields();
			setOpenModalDate(false);
		}
	};

	const handleExportAll = () => {};

	const exportTreeShareAllSuccess = (res) => {
		if (res) {
			const headers = [
				{ label: 'Mã cây', key: 'publicCode' },
				{ label: 'Tên cây', key: 'treeName' },
				{ label: 'Địa điểm trồng', key: 'location' },
				{ label: 'Số lần chia sẻ', key: 'numberShare' },
				{ label: 'Số lần quay', key: 'numberRotation' },
				{ label: 'Ngày chia sẻ', key: 'dateShare' },
				{ label: 'Ngày tạo', key: 'addedStamp' },
				{ label: 'Tên chiến dịch', key: 'campaignName' },
				{ label: 'Thời gian quay', key: 'datePlayCampaign' },
				{ label: 'Thời gian bắt đầu chiến dịch', key: 'startDateCampaign' },
				{ label: 'Thời gian kết thúc chiến dịch', key: 'endDateCampaign' },
				{ label: 'Trạng thái', key: 'status' },
				{ label: 'PG', key: 'pg' },
			];
			setDataTreeShareAllCSV({
				headers: headers,
				data: res?.data?.datas.length === 0 ? [] : res?.data?.datas,
			});
			csvTreeShareAllRef.current.link.click();
			formDate.resetFields();
			setOpenModalDate(false);
		}
	};

	const handleExport = (value) => {
		setOpenModalDate(true);
		setExportType(value);
	};

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={true}
				handleAdd={handleAddModal}
				isExport
				handleExport={
					<Button type="primary" onClick={() => setOpenModalExportType(true)}>
						Export
					</Button>
				}
			>
				<span>Danh sách cây</span>
			</PageHeader>

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachCay(${moment(Date.now()).format('DD-MM-YYYY')})`}
				style={{ color: '#fff' }}
			/>
			<CSVLink
				data={dataTreeShareCSV?.data || []}
				headers={dataTreeShareCSV?.headers || []}
				moment
				ref={csvTreeShareRef}
				filename={`DanhSachChiaSeCay(${moment(formDate.getFieldValue('DateFrom')).format('DD/MM/YYYY')}-${moment(
					formDate.getFieldValue('DateTo')
				).format('DD/MM/YYYY')})`}
				style={{ color: '#fff' }}
			/>
			<CSVLink
				data={dataTreeShareAllCSV?.data || []}
				headers={dataTreeShareAllCSV?.headers || []}
				moment
				ref={csvTreeShareAllRef}
				filename={`DanhSachChiaSe`}
				style={{ color: '#fff' }}
			/>

			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row style={{ justifyContent: 'space-between' }}>
						<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
						<TableFilterStatus setSearch={(value) => setSearch(value)} search={search} />
					</Row>
				</SearchWrapper>
				<Spin spinning={false}>
					{infoTotal(search.page, search.limit, trees?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={trees?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: trees?.data?.page,
							total: trees?.data?.total,
							pageSize: trees?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>
			</TableDemoStyle>
			<TreeDrawer treeDetail={treeDetail} onLoadData={handleLoadTree} visible={visible} onClose={() => setVisible(!visible)} />

			<Modal
				onCancel={() => setOpenModalDate(false)}
				visible={openModalDate}
				okText="Export"
				width="50%"
				title="Chọn thời gian"
				footer={[
					<Button onClick={() => setOpenModalDate(false)}>Hủy</Button>,
					<Button form="formDate" type="primary" key="submit" htmlType="submit">
						Export
					</Button>,
				]}
			>
				<Form onFinish={onSubmitForm} form={formDate} id="formDate">
					<Row justify="center" gutter={24}>
						<Col span={10}>
							<Label>Ngày bắt đầu</Label>
							<Form.Item name="DateFrom">
								<DatePicker style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={10}>
							<Label>Ngày kết thúc</Label>
							<Form.Item name="DateTo">
								<DatePicker style={{ width: '100%' }} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>

			<Modal
				onCancel={() => setOpenModalExportType(false)}
				visible={openModalExportType}
				okText="Export"
				width="50%"
				title="Chọn loại export"
				footer={[<Button onClick={() => setOpenModalExportType(false)}>Hủy</Button>]}
			>
				<Row justify="space-around" gutter={24}>
					<Col span={8}>
						<Button style={{ width: '100%' }} onClick={() => handleExport('all')}>
							Export tất cả
						</Button>
					</Col>
					<Col span={8}>
						<Button style={{ width: '100%' }} onClick={() => handleExport('share')}>
							Export theo danh sách chia sẻ
						</Button>
					</Col>
					<Col span={8}>
						<Button style={{ width: '100%' }} onClick={() => handleExportFile()}>
							Export danh sách cây
						</Button>
					</Col>
				</Row>
			</Modal>
		</LayoutContentWrapper>
	);
}

export default Trees;
