import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { infoTotal } from '@iso/lib/helpers/utility';
import pgActions from '@iso/redux/pg/actions';
import { Button, Col, DatePicker, Input, Popconfirm, Row, Select, Spin, Tag, Upload } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableSearch from '../../components/TableSearch';
import { ShowNotify } from '../../utils/ShowNotify';
import PGDrawer from './PGDrawer';
import { CSVLink } from 'react-csv';

const { getPG, deletePG, importPG, exportPG } = pgActions;
const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
	gid: '',
};

const TreeStatus = [
	{
		value: true,
		text: 'Có cây',
	},
	{
		value: false,
		text: 'Không có cây',
	},
];

function PG() {
	const { dataPG, dataExportPG } = useSelector((state) => state.PG);
	const dispatch = useDispatch();
	const csvListRef = useRef(null);
	const csvGIDRef = useRef(null);
	const [showModal, setShowModal] = useState(false);
	const [PG, setPG] = useState(null);
	const [importLoading, setImportLoading] = useState(false);
	const [search, setSearch] = useState(initSearch);
	const [gid, setGID] = useState('');
	const [dataListCSV, setDataListCSV] = useState();
	const [dataGIDCSV, setDataGIDCSV] = useState();
	const [isExistTree, setIsExistTree] = useState();
	const [date, setDate] = useState({
		DateFrom: '',
		DateTo: '',
	});

	useEffect(() => {
		handleLoadPG();
	}, [search]);

	const handleLoadPG = (
		body = {
			page: search.page,
			limit: search.limit,
			search: search.searchText,
			isActive: search.isActive,
			gid,
			isExistTree,
			type: 'export',
		}
	) => {
		const { type, ...rest } = body;
		type === 'export' && dispatch(getPG({ ...rest, ...{ ...date } }));
		type === 'exportAll' && dispatch(exportPG({ ...rest, ...{ ...date }, limit: 9999 }, { type: 1 }, dispatchSuccess));
		type === 'exportByGID' && dispatch(exportPG({ ...rest, ...{ ...date }, gid: gid, limit: 9999 }, { type: 2 }, dispatchSuccess));
	};

	const columns = [
		{
			title: 'PG Code',
			dataIndex: 'gid',
			ellipsis: true,
			render: (value, record) => {
				return (
					<span onClick={() => handleEditPG(record)} className="title">
						{value}
					</span>
				);
			},
		},
		{
			title: 'Kênh',
			dataIndex: 'channel',
			ellipsis: true,
			sorter: (a, b) => {
				return a.treeName < b.treeName ? -1 : 1;
			},
		},
		{
			title: 'Nhà phân phối',
			ellipsis: true,
			dataIndex: 'dealer',
			sorter: (a, b) => {
				return a.dealer < b.dealer ? -1 : 1;
			},
		},
		{
			title: 'Vùng',
			dataIndex: 'region',
			ellipsis: true,
			sorter: (a, b) => {
				return a.description < b.description ? -1 : 1;
			},
		},
		{
			title: 'Code cửa hàng',
			ellipsis: true,
			dataIndex: 'codeShop',
		},

		{
			title: 'Tỉnh',
			dataIndex: 'province',
			ellipsis: true,
			sorter: (a, b) => {
				return a.province < b.province ? -1 : 1;
			},
		},
		{
			title: 'Tên cửa hàng',
			dataIndex: 'shopName',
			ellipsis: true,
			sorter: (a, b) => {
				return a.shopName < b.shopName ? -1 : 1;
			},
			width: '20%',
		},
		{
			title: 'Ngành hàng',
			ellipsis: true,
			dataIndex: 'category',
			sorter: (a, b) => {
				return a.category < b.category ? -1 : 1;
			},
		},
		{
			title: 'Vị trí',
			ellipsis: true,
			dataIndex: 'position',
			sorter: (a, b) => {
				return a.position < b.position ? -1 : 1;
			},
		},
		{
			title: 'Số lượng cây kích hoạt',
			dataIndex: 'numberTree',
			ellipsis: true,
			width: '10%',
			sorter: (a, b) => {
				return a.numberTree < b.numberTree ? -1 : 1;
			},
		},
		{
			title: 'Số lượng cây truy cập',
			dataIndex: 'numberTreeRef',
			ellipsis: true,
			width: '10%',
			sorter: (a, b) => {
				return a.numberTreeRef < b.numberTreeRef ? -1 : 1;
			},
		},
		{
			title: 'Trạng thái',
			ellipsis: true,
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
			render: (text, record) => (
				<div>
					<button onClick={() => handleEditPG(record)} className="mr-2 btn-edit cursor-pointer">
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

	const handleEditPG = (values) => {
		setShowModal(!showModal);
		setPG(values);
	};

	const handleAddModal = () => {
		setPG(null);
		setShowModal(!showModal);
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deletePG(id, notifySuccess, notifyError));
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 5000);
		handleLoadPG();
		setImportLoading(false);
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 5000);
	};

	const handleUpload = (value) => {
		setImportLoading(true);
		const formData = new FormData();
		formData.set('File', value.file);
		dispatch(importPG(formData, notifySuccess, notifyError));
	};

	const handleExportPgList = () => {
		handleLoadPG({ ...search, type: 'exportAll' });
	};

	const handleExportTreeByPG = () => {
		if (gid) {
			handleLoadPG({ ...search, type: 'exportByGID' });
		} else {
			ShowNotify('Lỗi', 'Nhập GID', 'error', 999999);
		}
	};

	const dispatchSuccess = (res) => {
		const { data, type } = res;
		if (type === 1) {
			let header = [];
			if (date.DateFrom !== '' || date.DateTo !== '') {
				header = [
					{ label: 'Channel', key: 'channel' },
					{ label: 'Dealer', key: 'dealer' },
					{ label: 'Region', key: 'region' },
					{ label: 'Code Shop', key: 'codeShop' },
					{ label: 'Province', key: 'province' },
					{ label: 'Standard P', key: 'standardP' },
					{ label: 'Shop Name', key: 'shopName' },
					{ label: 'GID', key: 'gid' },
					{ label: 'Category', key: 'category' },
					{ label: 'Position', key: 'position' },
					{ label: 'Number of Registered Code', key: 'numberTree' },
					{ label: 'Number of Login Code', key: 'numberTreeRef' },
					{ label: 'From Date', key: 'DateFrom' },
					{ label: 'To Date', key: 'DateTo' },
				];
			} else {
				header = [
					{ label: 'Channel', key: 'channel' },
					{ label: 'Dealer', key: 'dealer' },
					{ label: 'Region', key: 'region' },
					{ label: 'Code Shop', key: 'codeShop' },
					{ label: 'Province', key: 'province' },
					{ label: 'Standard P', key: 'standardP' },
					{ label: 'Shop Name', key: 'shopName' },
					{ label: 'GID', key: 'gid' },
					{ label: 'Category', key: 'category' },
					{ label: 'Position', key: 'position' },
					{ label: 'Number of Registered Code', key: 'numberTree' },
					{ label: 'Number of Login Code', key: 'numberTreeRef' },
				];
			}

			if (data?.data?.data) {
				const exportData = data?.data?.data.map((item) => {
					if (date.DateFrom !== '' || date.DateTo !== '') {
						return {
							...item,
							DateFrom: moment(date.DateFrom).format('DD/MM/YYYY') || '',
							DateTo: moment(date.DateTo).format('DD/MM/YYYY') || '',
						};
					} else {
						return { ...item };
					}
				});
				setDataListCSV({
					headers: header,
					data: exportData,
				});
				csvListRef.current.link.click();
			}
		} else if (type === 2) {
			let headerGID = [];
			if (date.DateFrom !== '' || date.DateTo !== '') {
				headerGID = [
					{ label: 'GID', key: 'gid' },
					{ label: 'Number of Registered Code ', key: 'numberTree' },
					{ label: 'Number of Login Code', key: 'numberTreeRef' },
					{ label: 'Location', key: 'location' },
					{ label: 'Tree Code', key: 'publicCode' },
					{ label: 'Tree Type', key: 'treeName' },
					{ label: 'Ngày tạo', key: 'addedStamp' },
					{ label: 'Channel', key: 'channel' },
					{ label: 'Dealer', key: 'dealer' },
					{ label: 'Region', key: 'region' },
					{ label: 'Code Shop', key: 'codeShop' },
					{ label: 'Province', key: 'province' },
					{ label: 'Standard P', key: 'standardP' },
					{ label: 'Shop Name', key: 'shopName' },
					{ label: 'GID', key: 'gid' },
					{ label: 'Category', key: 'category' },
					{ label: 'From Date', key: 'DateFrom' },
					{ label: 'To Date', key: 'DateTo' },
				];
			} else {
				headerGID = [
					{ label: 'GID', key: 'gid' },
					{ label: 'Number of Registered Code ', key: 'numberTree' },
					{ label: 'Number of Login Code', key: 'numberTreeRef' },
					{ label: 'Location', key: 'location' },
					{ label: 'Tree Code', key: 'publicCode' },
					{ label: 'Tree Type', key: 'treeName' },
					{ label: 'Ngày tạo', key: 'addedStamp' },
					{ label: 'Channel', key: 'channel' },
					{ label: 'Dealer', key: 'dealer' },
					{ label: 'Region', key: 'region' },
					{ label: 'Code Shop', key: 'codeShop' },
					{ label: 'Province', key: 'province' },
					{ label: 'Standard P', key: 'standardP' },
					{ label: 'Shop Name', key: 'shopName' },
					{ label: 'GID', key: 'gid' },
					{ label: 'Category', key: 'category' },
				];
			}
			if (data?.data) {
				let arr = [];
				if (data?.data?.listTree?.length >= 1) {
					arr = data?.data?.listTree.map((item) => {
						return {
							...item,
							...data?.data?.data[0],
							DateFrom: moment(date.DateFrom).format('DD/MM/YYYY') || '',
							DateTo: moment(date.DateTo).format('DD/MM/YYYY') || '',
						};
					});
				} else {
					arr = [
						{
							...data?.data?.data[0],
							DateFrom: moment(date.DateFrom).format('DD/MM/YYYY') || '',
							DateTo: moment(date.DateTo).format('DD/MM/YYYY') || '',
						},
					];
				}
				setDataGIDCSV({
					headers: headerGID,
					data: arr,
				});
				csvGIDRef.current.link.click();
				setGID('');
			}
		}
	};

	const handleChangeDate = (value, type) => {
		if (value) {
			type === 'DateFrom'
				? setDate((prev) => ({ ...prev, [type]: moment(value.startOf('day').utc()).toISOString() }))
				: setDate((prev) => ({ ...prev, [type]: moment(value.endOf('day').utc()).toISOString() }));
		} else {
			setDate((prev) => ({ ...prev, [type]: '' }));
		}
	};

	return (
		<LayoutContentWrapper>
			<Spin spinning={importLoading}>
				<PageHeader
					hasRoleAdd={true}
					handleAdd={handleAddModal}
					isImport
					isExport
					handleImport={
						<Upload
							showUploadList={false}
							onChange={(e) => handleUpload(e)}
							beforeUpload={(file) => {
								const reader = new FileReader();
								reader.readAsText(file);
								return false;
							}}
						>
							<Button className="rounded-50 btn-add" type="primary">
								Tải lên tệp Excel
							</Button>
						</Upload>
					}
					handleExport={
						<Popconfirm
							title={'Chọn loại'}
							okText={'Danh sách PG'}
							cancelText={'Theo mã GID'}
							onConfirm={() => handleExportPgList()}
							onCancel={() => handleExportTreeByPG()}
						>
							<Button className="btn-add" type="primary">
								Export
							</Button>
						</Popconfirm>
					}
				>
					<span>Danh sách PG</span>
				</PageHeader>

				<CSVLink
					data={dataListCSV?.data || []}
					headers={dataListCSV?.headers || []}
					moment
					ref={csvListRef}
					filename={`danh-sach-PG-(${moment(Date.now()).format('DD-MM-YYYY')})`}
					style={{ color: '#fff' }}
				/>

				<CSVLink
					data={dataGIDCSV?.data || []}
					headers={dataGIDCSV?.headers || []}
					moment
					ref={csvGIDRef}
					filename={`danh-sach-cay-theo-GID(${moment(Date.now()).format('DD-MM-YYYY')})`}
					style={{ color: '#fff' }}
				/>

				<TableDemoStyle className="isoLayoutContent">
					<SearchWrapper>
						<Row style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
							<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
							<TableFilterStatus setSearch={setSearch} search={search} searchState={{ gid, isExistTree, ...{ ...date } }}>
								<Col span={4}>
									<Input placeholder="GID" value={gid} onChange={(e) => setGID(e.target.value)} />
								</Col>
								<div style={{ padding: 0, width: '100%', marginRight: '8px' }}>
									<DatePicker style={{ width: '100%' }} onChange={(value) => handleChangeDate(value, 'DateFrom')} />
								</div>
								<div style={{ padding: 0, width: '100%', marginRight: '8px' }}>
									<DatePicker style={{ width: '100%' }} onChange={(value) => handleChangeDate(value, 'DateTo')} />
								</div>
								<Select placeholder={'Trạng thái cây'} className="kgb-list-select" allowClear onChange={(value) => setIsExistTree(value)}>
									{TreeStatus &&
										TreeStatus.map((item) => (
											<Select.Option value={item.value} key={item.value}>
												{item.text}
											</Select.Option>
										))}
								</Select>
							</TableFilterStatus>
						</Row>
					</SearchWrapper>
					<Spin spinning={false}>
						{infoTotal(search.page, search.limit, PG?.data?.total)}
						<TableWrapper
							columns={columns}
							dataPG
							dataSource={dataPG?.data?.data}
							rowKey="id"
							className="isoCustomizedTable"
							pagination={{
								current: dataPG?.data?.page,
								total: dataPG?.data?.total,
								pageSize: dataPG?.data?.limit,
								onChange: handleChangePage,
								showSizeChanger: true,
							}}
						/>
					</Spin>
					{/* ADD */}
				</TableDemoStyle>
				<PGDrawer show={showModal} onClose={() => setShowModal(!showModal)} PG={PG} onLoadData={handleLoadPG} />
			</Spin>
		</LayoutContentWrapper>
	);
}

export default PG;
