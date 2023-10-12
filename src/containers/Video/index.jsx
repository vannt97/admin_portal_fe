import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import videoActions from '@iso/redux/video/actions';
import { Button, Popconfirm, Spin, Tag, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import TableSearch from '../../components/TableSearch';
import { infoTotal, SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { ShowNotify } from '../../utils/ShowNotify';
import VideoDrawer from './VideoDrawer';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableFilterStatus from '@iso/components/TableFilterStatus';

const { getVideo, deleteVideo, exportVideo } = videoActions;
const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
};

function Video() {
	const [showModal, setShowModal] = useState(false);
	const { videos, dataExportVideo } = useSelector((state) => state.Video);
	const [type, setType] = useState({ isEdit: false, id: '' });
	const [search, setSearch] = useState(initSearch);
	const dispatch = useDispatch();
	const [dataCSV, setDataCSV] = useState();
	const csvRef = useRef();
	const [loadingExport, setLoadingExport] = useState(false);

	useEffect(() => {
		handleLoadTreeType();
	}, [search]);

	const handleLoadTreeType = (body = { page: search.page, limit: search.limit, search: search.searchText, isActive: search.isActive }) => {
		dispatch(getVideo(body));
	};

	const handleLoadAllTreeType = (body = { page: 1, limit: 9999 }) => {
		dispatch(exportVideo(body, exportSuccess, notifyError));
	};

	const exportSuccess = (res) => {
		if (res?.data) {
			const headers = [
				{ label: 'Tên video', key: 'title' },
				{ label: 'Mô tả', key: 'description' },
				{ label: 'Link video', key: 'linkVideo' },
				{ label: 'Trạng thái', key: 'isActive' },
				{ label: 'Ngày thêm', key: 'addedStamp' },
			];
			const arr = res?.data?.data?.map((item) => {
				if (item.isActive === true) {
					return { ...item, isActive: 'Hoạt động' };
				} else {
					return { ...item, isActive: 'Không hoạt động' };
				}
			});
			setDataCSV({
				headers: headers,
				data: arr,
			});
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	};

	const columns = [
		{
			title: 'Tên',
			dataIndex: 'title',
			ellipsis: true,
			with: '25%',
			sorter: (a, b) => {
				return a.title < b.title ? -1 : 1;
			},
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
			with: '30%',
			sorter: (a, b) => {
				return a.description < b.description ? -1 : 1;
			},
		},
		{
			title: 'URL',
			dataIndex: 'linkVideo',
			ellipsis: true,
			with: '30%',
			sorter: (a, b) => {
				return a.linkVideo < b.linkVideo ? -1 : 1;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'isActive',
			width: '10%',
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
			title: 'Ngay thêm',
			dataIndex: 'addedStamp',
			ellipsis: true,
			with: '8%',
			sorter: (a, b) => {
				return a.addedStamp < b.addedStamp ? -1 : 1;
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
		setType({ isEdit: true, id: values.id });
	};

	const handleAddModal = () => {
		setShowModal(!showModal);
		setType({ isEdit: false, id: '' });
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deleteVideo(id, notifySuccess, notifyError));
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 5000);
		handleLoadTreeType();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 5000);
	};

	const handleExportFile = () => {
		setLoadingExport(true);
		handleLoadAllTreeType();
	};

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={true}
				handleAdd={handleAddModal}
				isExport={false}
				handleExport={
					<Button onClick={handleExportFile} loading={loadingExport} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
						Export
					</Button>
				}
			>
				<span>Danh sách video</span>
			</PageHeader>

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachVideo(${moment(Date.now()).format('DD-MM-YYYY')})`}
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
					{infoTotal(search.page, search.limit, videos?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={videos?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: videos?.data?.page,
							total: videos?.data?.total,
							pageSize: videos?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>

				{/* ADD */}
			</TableDemoStyle>

			<VideoDrawer open={showModal} onClose={() => setShowModal(!showModal)} type={type} onLoad={handleLoadTreeType} />
		</LayoutContentWrapper>
	);
}

export default Video;
