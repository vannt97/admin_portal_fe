import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import treeSiteStoryActions from '@iso/redux/treeSiteStory/actions';
import { Button, Popconfirm, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { infoTotal, SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import TableSearch from '../../components/TableSearch';
import { ShowNotify } from '../../utils/ShowNotify';
import TreeSiteStoryDrawer from './TreeSiteStoryDrawer.jsx';
import { SearchWrapper } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import TableFilterStatus from '@iso/components/TableFilterStatus';

const { getTreeSiteStory, deleteTreeSiteStory, getTreeSiteStoryDetail, exportTreeSiteStory } = treeSiteStoryActions;

const initSearch = {
	page: 1,
	limit: 20,
	searchText: '',
	isActive: null,
};

const actionType = {
	ADD: 1,
	EDIT: 2,
};

function TreeSiteStory({ showModalStory, onClose, onOpen, exportFile }) {
	const { id } = useParams();
	const { treeSiteDetail } = useSelector((state) => state.TreeSite);
	const [visible, setVisible] = useState(false);
	const { treesSiteStory, dataExportTreeSiteStory } = useSelector((state) => state.TreeSiteStory);
	const [search, setSearch] = useState(initSearch);
	const [actions, setActions] = useState(actionType.ADD);
	const dispatch = useDispatch();
	const [dataCSV, setDataCSV] = useState();
	const csvRef = useRef();
	const [loadingExport, setLoadingExport] = useState(false);

	useEffect(() => {
		handleLoadTree(search);
	}, [search]);

	useEffect(() => {
		if (dataCSV) {
			csvRef.current.link.click();
		}
	}, [dataCSV]);

	useEffect(() => {
		if (dataExportTreeSiteStory?.data) {
			const arrValues = dataExportTreeSiteStory?.data?.data?.map((all) => {
				return Object.values(all);
			});
			const arrKeys = dataExportTreeSiteStory?.data?.data?.map((all) => {
				return Object.keys(all);
			});
			setDataCSV({
				headers: arrKeys[0],
				data: arrValues,
			});
			setLoadingExport(false);
		}
	}, [dataExportTreeSiteStory]);

	const handleLoadTree = (search) => {
		dispatch(getTreeSiteStory({ TreePlantingSiteId: id, ...search }));
	};

	const handleLoadAllTreeSiteStory = () => {
		dispatch(exportTreeSiteStory(id, notifyError));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deleteTreeSiteStory(id, notifySuccess, notifyError));
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
			sorter: (a, b) => {
				return a.imageLink < b.imageLink ? -1 : 1;
			},
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
			render: (value, record) => {
				return (
					<div onClick={() => handleEditTree(record)} style={{ width: '200px' }}>
						<p className="title" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
							{value}
						</p>
					</div>
				);
			},
		},
		{
			title: 'Mô tả',
			ellipsis: true,
			dataIndex: 'description',
			sorter: (a, b) => {
				return a.description < b.description ? -1 : 1;
			},
			render: (value) => {
				return (
					<div style={{ width: '600px' }}>
						<p style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{value}</p>
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
		dispatch(getTreeSiteStoryDetail({ id: values.id }));
	};

	const handleAddModal = () => {
		setVisible(!visible);
		setActions(actionType.ADD);
	};

	useEffect(() => {
		if (exportFile) {
			if (dataExportTreeSiteStory?.data) {
				csvRef.current.link.click();
			} else {
				handleLoadAllTreeSiteStory();
				setLoadingExport(true);
			}
		}
	}, [exportFile]);

	return (
		<>
			{/* <PageHeader
				hasRoleAdd={true}
				handleAdd={handleAddModal}
				isExport
				handleExport={
					<Button onClick={handleExportFile} loading={loadingExport} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
						Export
					</Button>
				}
			>
				<span>
					Câu chuyện điểm trồng {treeSiteDetail.location} {treeSiteDetail.label}
				</span>
			</PageHeader> */}

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachCauChuyenTrongCay(${moment(Date.now()).format('DD-MM-YYYY')})`}
				style={{ color: '#fff' }}
			/>

			<SearchWrapper>
				<Row style={{ justifyContent: 'flex-end' }}>
					{/* <TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} /> */}
					<TableFilterStatus setSearch={(value) => setSearch(value)} search={search} />
				</Row>
			</SearchWrapper>
			<Spin spinning={false}>
				{infoTotal(search.page, search.limit, treesSiteStory?.data?.total)}
				<TableWrapper
					columns={columns}
					dataSource={treesSiteStory?.data?.data}
					rowKey="id"
					className="isoCustomizedTable"
					pagination={{
						current: treesSiteStory?.data?.page,
						total: treesSiteStory?.data?.total,
						pageSize: treesSiteStory?.data?.limit,
						onChange: handleChangePage,
						showSizeChanger: true,
					}}
				/>
			</Spin>
			<TreeSiteStoryDrawer actionType={actions} onLoadData={handleLoadTree} visible={showModalStory} onClose={onClose} />
		</>
	);
}

export default TreeSiteStory;
