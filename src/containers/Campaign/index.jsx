import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { infoTotal } from '@iso/lib/helpers/utility';
import campaignActions from '@iso/redux/campaign/actions';
import { Button, Popconfirm, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TableSearch from '../../components/TableSearch';
import { ShowNotify } from '../../utils/ShowNotify';
import CampaignDrawer from './CampaignDrawer';
// import GiftDrawer from './GiftDrawer';

const { getCampaign, deleteCampaign, exportCampaign } = campaignActions;

const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
};

export const TYPE = {
	ADD: 1,
	EDIT: 2,
};

function Campaign() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { campaign, dataExportCampaign } = useSelector((state) => state.Campaign);
	const [search, setSearch] = useState(initSearch);
	const [showModal, setShowModal] = useState(false);
	const [type, setType] = useState({
		isEdit: false,
		id: '',
	});
	const [dataCSV, setDataCSV] = useState();
	const [loadingExport, setLoadingExport] = useState(false);
	const csvRef = useRef(null);

	useEffect(() => {
		if (dataExportCampaign?.data) {
			const headers = [
				{ label: 'Tên địa điểm', key: 'location' },
				{ label: 'Mô tả', key: 'description' },
				{ label: 'Tỉnh/Thành phố', key: 'label' },
				{ label: 'Link ảnh', key: 'imageLink' },
				{ label: 'Ngày tạo', key: 'addedStamp' },
			];

			setDataCSV({
				headers: headers,
				data: dataExportCampaign?.data?.data,
			});
		}
	}, [dataExportCampaign]);

	useEffect(() => {
		if (dataCSV && loadingExport) {
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	}, [dataCSV]);

	useEffect(() => {
		handleLoad();
	}, [search]);

	const handleLoadAll = (body = { page: 1, limit: 9999 }) => {
		dispatch(exportCampaign(body, notifyError));
	};

	const handleLoad = (body = { page: search.page, limit: search.limit, search: search.searchText, isActive: search.isActive }) => {
		dispatch(getCampaign(body));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deleteCampaign(id, notifySuccess, notifyError));
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoad();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

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
			title: 'Tên Chiến dịch',
			dataIndex: 'campaignName',
			sorter: (a, b) => {
				return a.campaignName < b.campaignName ? -1 : 1;
			},
			render: (value, record) => {
				return (
					<span onClick={() => handleEdit(record.id)} className="title">
						{value}
					</span>
				);
			},
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			ellipsis: true,
			sorter: (a, b) => {
				return a.description < b.description ? -1 : 1;
			},
		},
		{
			title: 'Ngày bắt đầu',
			dataIndex: 'startFrom',
			ellipsis: true,
			sorter: (a, b) => {
				return a.startFrom < b.startFrom ? -1 : 1;
			},
			render: (value, record) => {
				return value?.split(' ')[0] || '';
			},
		},
		{
			title: 'Ngày kết thúc',
			dataIndex: 'endTo',
			ellipsis: true,
			sorter: (a, b) => {
				return a.endTo < b.endTo ? -1 : 1;
			},
			render: (value, record) => {
				return value?.split(' ')[0] || '';
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
			title: 'Thời gian thêm',
			dataIndex: 'addedStamp',
			sorter: (a, b) => {
				return a.addedStamp < b.addedStamp ? -1 : 1;
			},
			render: (value) => {
				return <>{value.split(' ')[0]}</>;
			},
		},
		{
			// title: <IntlMessages id="common.action.action" />,
			fixed: 'right',
			align: 'center',
			width: '10%',
			render: (text, record) => (
				<div>
					<button onClick={() => handleEdit(record.id)} className="mr-2 btn-edit cursor-pointer">
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

	const handleEdit = (id) => {
		setShowModal(!showModal);
		setType({ isEdit: true, id });
		history.push(`/dashboard/campaign/${id}/duration`);
	};

	const handleAddModal = () => {
		setType({ isEdit: false, id: '' });
		setShowModal(!showModal);
	};

	const handleExportFile = () => {
		if (dataExportCampaign?.data) {
			csvRef.current.link.click();
		} else {
			setLoadingExport(true);
			handleLoadAll();
		}
	};

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={true}
				handleAdd={handleAddModal}
				isExport={false}
				isAdd={true}
				handleExport={
					<Button loading={loadingExport} onClick={handleExportFile} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
						Export
					</Button>
				}
			>
				<span>Danh sách chiến dịch</span>
			</PageHeader>

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachDiaDiemTrongCay(${moment(Date.now()).format('DD-MM-YYYY')})`}
				style={{ color: '#fff' }}
			/>

			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row style={{ justifyContent: 'space-between' }}>
						<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
						<TableFilterStatus setSearch={setSearch} search={search} />
					</Row>
				</SearchWrapper>
				<Spin spinning={false}>
					{infoTotal(search.page, search.limit, campaign?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={campaign?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: campaign?.data?.page,
							total: campaign?.data?.total,
							pageSize: campaign?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>
			</TableDemoStyle>
			<CampaignDrawer type={type} onClose={() => setShowModal(false)} open={showModal} onLoad={handleLoad} />
		</LayoutContentWrapper>
	);
}

export default Campaign;
