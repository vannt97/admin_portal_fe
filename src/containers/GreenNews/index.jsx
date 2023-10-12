import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Row, Spin, Tag } from 'antd';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import greenNewsActions from '@iso/redux/greenNews/actions';
import { _swError, _swSuccess, infoTotal } from '@iso/lib/helpers/utility';
import TableSearch from '../../components/TableSearch';
import { ShowNotify } from '../../utils/ShowNotify';
import GreenNewsDrawer from './GreenNewsDrawer';
import greenNewsService from '../../services/greenNews';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import { SearchWrapper } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';

const { getGreenNews, deleteGreenNews, exportGreenNews } = greenNewsActions;

const initSearch = {
	page: 1,
	limit: 20,
	searchText: '',
	isActive: null,
};

function GreenNews() {
	const [search, setSearch] = useState(initSearch);
	const [form] = Form.useForm();
	const [showDrawer, setShowDrawer] = useState(false);
	const dispatch = useDispatch();
	const { greenNews, exportGreenNews: dataExport } = useSelector((state) => state.GreenNews);
	const [greenNewsData, setGreenNewsData] = useState();
	const [dataCSV, setDataCSV] = useState();
	const csvRef = useRef(null);
	const [loadingExport, setLoadingExport] = useState(false);

	useEffect(() => {
		handleLoadGreenNews();
	}, []);

	useEffect(() => {
		const headers = [
			{ label: 'Tiêu đề', key: 'title' },
			{ label: 'Mô tả', key: 'description' },
			{ label: 'Link hình', key: 'imageLink' },
			{ label: 'Link pdf', key: 'pdfLink' },
			{ label: 'Link', key: 'link' },
			{ label: 'Ngày tạo', key: 'addedStamp' },
		];
		if (dataExport?.data?.data) {
			const values = dataExport?.data?.data?.filter((data) => ({ ...data, addedStamp: moment(data?.addedStamp).format('DD/MM/YYYY') }));

			setDataCSV({
				headers: headers,
				data: values,
			});
		}
	}, [dataExport]);

	useEffect(() => {
		if (dataCSV && loadingExport) {
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	}, [dataCSV]);

	useEffect(() => {
		handleLoadGreenNews();
	}, [search]);

	const handleLoadAllGreenNews = (body = { page: 1, limit: 9999 }) => {
		dispatch(exportGreenNews(body, notifyError));
	};

	const handleLoadGreenNews = (body = { Page: search.page, Limit: search.limit, Search: search.searchText, IsActive: search.isActive }) => {
		dispatch(getGreenNews(body));
	};

	const columns = [
		{
			title: 'Hình',
			dataIndex: 'imageLink',
			render: (value) => {
				return <img className="image-table" src={value} alt="" />;
			},
			sorter: (a, b) => {
				return a.imageLink < b.imageLink ? -1 : 1;
			},
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			ellipsis: true,
			render: (value, record) => {
				return <span  onClick={() => handleEditNews(record)} className="title">{value}</span>;
			},
			sorter: (a, b) => {
				return a.title < b.title ? -1 : 1;
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
			title: 'Trạng thái',
			dataIndex: 'isActive',
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? 'Hoạt Động' : 'Không Hoạt Động';
				return <Tag color={color}>{text}</Tag>;
			},
			sorter: (a, b) => {
				return a.isActive < b.isActive ? -1 : 1;
			},
		},
		{
			// title: <IntlMessages id="common.action.action" />,
			fixed: 'right',
			align: 'center',
			width: '10%',
			render: (text, record) => (
				<div>
					<button onClick={() => handleEditNews(record)} className="mr-2 btn-edit cursor-pointer">
						<EditOutlined />
					</button>

					<Popconfirm title={'Bạn có chắc chắn muốn xóa?'} okText={'Ok'} cancelText={'Hủy'} onConfirm={() => handleDeleteNews(record.id)}>
						<button className="btn-delete">
							<DeleteOutlined />
						</button>
					</Popconfirm>
				</div>
			),
		},
	];

	const handleAddModal = () => {
		setShowDrawer(!showDrawer);
		setGreenNewsData();
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		handleLoadGreenNews();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleChangePage = (page, pageSize) => {
		setSearch({ ...search, page: page, limit: pageSize });
	};

	const handleEditNews = (record) => {
		setShowDrawer(!showDrawer);
		setGreenNewsData(record);
	};

	const handleDeleteNews = (id) => {
		dispatch(deleteGreenNews(id, notifySuccess, notifyError));
	};

	const handleExportFile = () => {
		if (dataExport?.data) {
			csvRef.current.link.click();
		} else {
			setLoadingExport(true);
			handleLoadAllGreenNews();
		}
	};

	return (
		<>
			<LayoutContentWrapper>
				<PageHeader
					hasRoleAdd={true}
					handleAdd={handleAddModal}
					isExport
					handleExport={
						<Button loading={loadingExport} onClick={handleExportFile} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
							Export
						</Button>
					}
				>
					<span>Danh sách bản tin xanh</span>
				</PageHeader>

				<CSVLink
					data={dataCSV?.data || []}
					headers={dataCSV?.headers || []}
					moment
					ref={csvRef}
					filename={`DanhSachBanTinXanh(${moment(Date.now()).format('DD-MM-YYYY')})`}
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
						{infoTotal(search.page, search.limit, greenNews?.data?.total)}
						<TableWrapper
							columns={columns}
							dataSource={greenNews?.data?.data}
							rowKey="id"
							className="isoCustomizedTable"
							pagination={{
								current: greenNews?.data?.page,
								total: greenNews?.data?.total,
								pageSize: greenNews?.data?.limit,
								onChange: handleChangePage,
								showSizeChanger: true,
							}}
						/>
					</Spin>

					{/* ADD */}
				</TableDemoStyle>
				<GreenNewsDrawer
					onLoadData={handleLoadGreenNews}
					show={showDrawer}
					onClose={() => setShowDrawer(!showDrawer)}
					greenNews={greenNewsData}
				/>
			</LayoutContentWrapper>
		</>
	);
}

export default GreenNews;
