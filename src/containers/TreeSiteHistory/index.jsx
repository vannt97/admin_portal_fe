import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import treeSiteHistoryActions from '@iso/redux/treeSiteHistory/actions';
import { Button, Image, Popconfirm, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import TableSearch from '../../components/TableSearch';
import { infoTotal, SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { ShowNotify } from '../../utils/ShowNotify';
import TreeSiteHistoryDrawer from './TreeSiteHistoryDrawer.jsx';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import { SearchWrapper } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';

const { getTreeSiteHistory, deleteTreeSiteHistory, getTreeSiteHistoryDetail, exportTreeSiteHistory } = treeSiteHistoryActions;

const initSearch = {
	page: 1,
	limit: 20,
	searchText: '',
};

const actionType = {
	ADD: 1,
	EDIT: 2,
};

function TreeSiteHistory({ showModalHistory, onClose, onOpen }) {
	const { id } = useParams();
	const { treeSiteDetail } = useSelector((state) => state.TreeSite);
	const [visible, setVisible] = useState(false);
	const { treesSiteHistory, dataExportTreeSiteHistory } = useSelector((state) => state.TreeSiteHistory);
	const [search, setSearch] = useState(initSearch);
	const [actions, setActions] = useState(actionType.ADD);
	const dispatch = useDispatch();
	const [dataCSV, setDataCSV] = useState();
	const [loadingExport, setLoadingExport] = useState(false);
	const csvRef = useRef(null);

	useEffect(() => {
		handleLoadTree(search);
	}, [search]);

	useEffect(() => {
		if (dataExportTreeSiteHistory?.data) {
			const arrValues = dataExportTreeSiteHistory?.data?.data?.map((all) => {
				return Object.values(all);
			});
			const arrKeys = dataExportTreeSiteHistory?.data?.data?.map((all) => {
				return Object.keys(all);
			});
			setDataCSV({
				headers: arrKeys[0],
				data: arrValues,
			});
			setLoadingExport(false);
		}
	}, [dataExportTreeSiteHistory]);

	useEffect(() => {
		if (dataCSV) {
			csvRef.current.link.click();
		}
	}, [dataCSV]);

	const handleLoadTree = (search) => {
		dispatch(getTreeSiteHistory({ TreePlantingSiteId: id, ...search }));
	};

	const handleLoadAllTreeSite = (body = { page: 1, limit: 9999 }) => {
		dispatch(exportTreeSiteHistory(body, notifyError));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deleteTreeSiteHistory(id, notifySuccess, notifyError));
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
			title: 'Hình ảnh',
			dataIndex: 'imageLink',
			width: 200,
			sorter: (a, b) => {
				return a.imageLink < b.imageLink ? -1 : 1;
			},
			render: (value, record) => {
				return (
					<div style={{ width: '120px', height: '100px', lineHeight: '100px', overflow: 'hidden' }}>
						<Image src={value} alt={record.imageName} />
					</div>
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
			render: (value, record) => {
				return (
					<div onClick={() => handleEditTree(record)} style={{ width: '600px' }}>
						<p className="title" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
							{value}
						</p>
					</div>
				);
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
			title: 'Thời gian',
			dataIndex: 'time',
			sorter: (a, b) => {
				return a.time < b.time ? -1 : 1;
			},
			render: (value) => {
				return <div>{moment(value).format('DD/MM/YYYY')}</div>;
			},
		},
		{
			fixed: 'right',
			align: 'center',
			render: (text, record) => (
				<div>
					<button onClick={() => handleEditTree(record)} className="mr-2 btn-edit cursor-pointer">
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

	const handleEditTree = (values) => {
		onOpen();
		setActions(actionType.EDIT);
		dispatch(getTreeSiteHistoryDetail({ id: values.id }));
	};

	const handleAddModal = () => {
		setActions(actionType.ADD);
	};

	const handleExportFile = () => {
		if (dataExportTreeSiteHistory?.data) {
			csvRef.current.link.click();
		} else {
			setLoadingExport(true);
			handleLoadAllTreeSite();
		}
	};

	return (
		<>
			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachLichSuDiemTrong(${moment(Date.now()).format('DD-MM-YYYY')})`}
				style={{ color: '#fff' }}
			/>

			<SearchWrapper>
				<Row style={{ justifyContent: 'flex-end' }}>
					{/* <TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} /> */}
					<TableFilterStatus setSearch={(value) => setSearch(value)} search={search} />
				</Row>
			</SearchWrapper>
			<Spin spinning={false}>
				{infoTotal(search.page, search.limit, treesSiteHistory?.data?.total)}
				<TableWrapper
					columns={columns}
					dataSource={treesSiteHistory?.data?.data}
					rowKey="id"
					className="isoCustomizedTable"
					pagination={{
						current: treesSiteHistory?.data?.page,
						total: treesSiteHistory?.data?.total,
						pageSize: treesSiteHistory?.data?.limit,
						onChange: handleChangePage,
						showSizeChanger: true,
					}}
				/>
			</Spin>
			<TreeSiteHistoryDrawer actionType={actions} onLoadData={handleLoadTree} visible={showModalHistory} onClose={onClose} />
		</>
	);
}

export default TreeSiteHistory;
