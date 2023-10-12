import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import treeSiteActions from '@iso/redux/treeSite/actions';
import { Button, Popconfirm, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { infoTotal, SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import TableSearch from '../../components/TableSearch';
import { ShowNotify } from '../../utils/ShowNotify';
import TreeSiteDrawer from './TreeSiteDrawer';

const { getTreeSite, deleteTreeSite, exportTreeSite } = treeSiteActions;

const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
};

function TreeSiteList() {
	const [showModal, setShowModal] = useState(false);
	const { treeSites, dataExportTreeSites } = useSelector((state) => state.TreeSite);
	const [dataCSV, setDataCSV] = useState();
	const [search, setSearch] = useState(initSearch);
	const [treeSite, setTreeSite] = useState();
	const dispatch = useDispatch();
	const history = useHistory();
	const [loadingExport, setLoadingExport] = useState(false);
	const csvRef = useRef(null);
	useEffect(() => {
		if (dataExportTreeSites?.data) {
			const headers = [
				{ label: 'Tên địa điểm', key: 'location' },
				{ label: 'Mô tả', key: 'description' },
				{ label: 'Tỉnh/Thành phố', key: 'label' },
				{ label: 'Link ảnh', key: 'imageLink' },
				{ label: 'Ngày tạo', key: 'addedStamp' },
			];

			setDataCSV({
				headers: headers,
				data: dataExportTreeSites?.data?.data,
			});
		}
	}, [dataExportTreeSites]);

	useEffect(() => {
		if (dataCSV && loadingExport) {
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	}, [dataCSV]);

	useEffect(() => {
		handleLoadTreeSite();
	}, [search]);

	const handleLoadAllTreeSite = (body = { page: 1, limit: 9999 }) => {
		dispatch(exportTreeSite(body, notifyError));
	};

	const handleLoadTreeSite = (body = { page: search.page, limit: search.limit, search: search.searchText, isActive: search.isActive }) => {
		dispatch(getTreeSite(body));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deleteTreeSite(id, notifySuccess, notifyError));
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoadTreeSite();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const columns = [
		{
			title: 'Hình ảnh',
			dataIndex: 'imageLink',
			ellipsis: true,
			sorter: (a, b) => {
				return a.imageLink < b.imageLink ? -1 : 1;
			},
			width: 120,
			render: (value) => {
				return <img className="image-table" src={value} alt="" />;
			},
		},
		{
			title: 'Tên',
			dataIndex: 'label',
			ellipsis: true,
			sorter: (a, b) => {
				return a.label < b.label ? -1 : 1;
			},
			width: '10%',
			render: (value, record) => {
				return (
					<span onClick={() => handleEditTreeSite(record)} className="title">
						{value}
					</span>
				);
			},
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			ellipsis: true,
			width: '20%',
			sorter: (a, b) => {
				return a.description < b.description ? -1 : 1;
			},
		},
		{
			title: 'Địa điểm',
			dataIndex: 'location',
			ellipsis: true,
			width: '20%',
			sorter: (a, b) => {
				return a.location < b.location ? -1 : 1;
			},
		},
		{
			title: 'Kinh độ',
			dataIndex: 'longitude',
			ellipsis: true,
			width: '10%',
			sorter: (a, b) => {
				return a.longitude < b.longitude ? -1 : 1;
			},
		},
		{
			title: 'Vĩ độ',
			dataIndex: 'latitude',
			ellipsis: true,
			width: '10%',
			sorter: (a, b) => {
				return a.latitude < b.latitude ? -1 : 1;
			},
		},

		{
			title: 'Trạng thái',
			dataIndex: 'isActive',
			ellipsis: true,
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
			title: 'Ngày thêm',
			dataIndex: 'addedStamp',
			sorter: (a, b) => {
				return a.addedStamp < b.addedStamp ? -1 : 1;
			},
			ellipsis: true,
			width: '10%',
			render: (value) => {
				return <>{value?.split(' ')[0]}</>;
			},
		},
		{
			// title: <IntlMessages id="common.action.action" />,
			fixed: 'right',
			align: 'center',
			width: '5%',
			render: (text, record) => (
				<div>
					<button onClick={() => handleEditTreeSite(record)} className="mr-2 btn-edit cursor-pointer">
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

	const handleEditTreeSite = (values) => {
		setShowModal(!showModal);
		setTreeSite(values);
		history.push(`/dashboard/tree-site/${values.id}`);
	};

	const handleAddModal = () => {
		console.log('click');
		setShowModal(true);
		history.push(`/dashboard/tree-site`);
	};
	console.log(showModal);
	const handleExportFile = () => {
		if (dataExportTreeSites?.data) {
			csvRef.current.link.click();
		} else {
			setLoadingExport(true);
			handleLoadAllTreeSite();
		}
	};

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={true}
				handleAdd={handleAddModal}
				isExport
				// isAdd={false}
				handleExport={
					<Button loading={loadingExport} onClick={handleExportFile} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
						Export
					</Button>
				}
			>
				<span>Danh sách địa điểm trồng cây</span>
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
					{infoTotal(search.page, search.limit, treeSites?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={treeSites?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: treeSites?.data?.page,
							total: treeSites?.data?.total,
							pageSize: treeSites?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>

				{/* ADD */}
				<TreeSiteDrawer show={showModal} />
			</TableDemoStyle>
		</LayoutContentWrapper>
	);
}

export default TreeSiteList;
