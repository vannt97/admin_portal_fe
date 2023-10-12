import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import treeJourneyActions from '@iso/redux/treeJourney/actions';
import { Button, Popconfirm, Spin, Tag } from 'antd';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import TreeInfoDrawer from './TreeInfoDrawer';
import { ShowNotify } from '@iso/utils/ShowNotify';
import TableSearch from '@iso/components/TableSearch';

const { getTreeJourney, deleteTreeJourney, exportTreeJourney } = treeJourneyActions;

const initSearch = {
	page: 1,
	limit: 20,
	searchText: '',
};

function TreeInfo() {
	const { id, name } = useParams();
	const { treeJourneys, dataExportTreeJourney } = useSelector((state) => state.TreeJourney);
	const [search, setSearch] = useState(initSearch);
	const [showDrawer, setShowDrawer] = useState(false);
	const [treeJourney, setTreeJourney] = useState();
	const dispatch = useDispatch();
	const [dataCSV, setDataCSV] = useState();
	const [loadingExport, setLoadingExport] = useState(false);
	const csvRef = useRef(null);

	useEffect(() => {
		handleLoadTreeInfo();
	}, [search]);

	useEffect(() => {
		if (dataCSV) {
			csvRef.current.link.click();
		}
	}, [dataCSV]);

	useEffect(() => {
		if (dataExportTreeJourney?.data) {
			const arrValues = dataExportTreeJourney?.data?.data?.map((all) => {
				return Object.values(all);
			});
			const arrKeys = dataExportTreeJourney?.data?.data?.map((all) => {
				return Object.keys(all);
			});

			setDataCSV({
				headers: arrKeys[0],
				data: arrValues,
			});
			setLoadingExport(false);
		}
	}, [dataExportTreeJourney]);

	const handleLoadAllTreeInfo = (body = { TreeId: id, page: 1, limit: 9999 }) => {
		dispatch(exportTreeJourney(body, notifyError));
	};

	const handleLoadTreeInfo = (body = { TreeId: id, Page: search.page, Limit: search.limit, Keyword: search.searchText }) => {
		dispatch(getTreeJourney(body));
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
			title: 'Mô tả',
			dataIndex: 'label',
			sorter: (a, b) => {
				return a.label < b.label ? -1 : 1;
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

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoadTreeInfo();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleEditTree = (values) => {
		setTreeJourney(values);
		setShowDrawer(!showDrawer);
	};

	const handleChangePage = (page, pageSize) => {
		setSearch({ ...search, page: page, limit: pageSize });
	};

	const handleDelete = (id) => {
		dispatch(deleteTreeJourney(id, notifySuccess, notifyError));
	};

	const handleAddModal = () => {
		setShowDrawer(!showDrawer);
		setTreeJourney();
	};

	const handleExportFile = () => {
		if (dataExportTreeJourney?.data) {
			csvRef.current.link.click();
		} else {
			handleLoadAllTreeInfo();
			setLoadingExport(true);
		}
	};

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={true}
				handleAdd={handleAddModal}
				isExport
				handleExport={
					<Button onClick={handleExportFile} loading={loadingExport} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
						Export
					</Button>
				}
			>
				<span>Danh sách hành trình sinh trưởng cây {name}</span>
			</PageHeader>

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachHanhTrinhSinhTruongCay(${moment(Date.now()).format('DD-MM-YYYY')})`}
				style={{ color: '#fff' }}
			/>

			<TableDemoStyle className="isoLayoutContent">
				<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
				<Spin spinning={false}>
					<TableWrapper
						columns={columns}
						dataSource={treeJourneys?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: treeJourneys?.data?.page,
							total: treeJourneys?.data?.total,
							pageSize: treeJourneys?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>

				{/* ADD */}
			</TableDemoStyle>

			<TreeInfoDrawer
				onLoadData={handleLoadTreeInfo}
				show={showDrawer}
				onClose={() => setShowDrawer(!showDrawer)}
				treeJourney={treeJourney}
			/>
		</LayoutContentWrapper>
	);
}

export default TreeInfo;
