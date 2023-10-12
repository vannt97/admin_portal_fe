import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import treeTypeActions from '@iso/redux/treeType/actions';
import { Button, Popconfirm, Spin, Tag, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import TableSearch from '../../components/TableSearch';
import { infoTotal, SWType, _swError, _swSuccess } from '@iso/lib/helpers/utility';
import { ShowNotify } from '../../utils/ShowNotify';
import TreeTypeDrawer from './TreeTypeDrawer';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableFilterStatus from '@iso/components/TableFilterStatus';

const { getTreeType, deleteTreeType, exportTreeType } = treeTypeActions;
const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
};

function TreeType() {
	const [showModal, setShowModal] = useState(false);
	const { treeTypes, dataExportTreeType } = useSelector((state) => state.TreeType);
	const [treeType, setTreeType] = useState();
	const [search, setSearch] = useState(initSearch);
	const dispatch = useDispatch();
	const [dataCSV, setDataCSV] = useState();
	const csvRef = useRef();
	const [loadingExport, setLoadingExport] = useState(false);

	useEffect(() => {
		if (dataExportTreeType?.data) {
			const headers = [
				{ label: 'Tên loại cây', key: 'treeName' },
				{ label: 'Khả năng hấp thụ CO2 hiện tại', key: 'currentCO2AbsorptionCapacity' },
				{ label: 'Khả năng hấp thụ CO2 khi trưởng thành', key: 'abilityToAbsorbCO2AsAnAdult' },
				{ label: 'Mô tả', key: 'description' },
				{ label: 'Mô tả trên ảnh chia sẻ', key: 'matureTreeDescription' },
				{ label: 'Link ảnh', key: 'imageLink' },
				{ label: 'Ngày tạo', key: 'addedStamp' },
			];
			setDataCSV({
				headers: headers,
				data: dataExportTreeType?.data?.data,
			});
		}
	}, [dataExportTreeType]);

	useEffect(() => {
		if (dataCSV && loadingExport) {
			csvRef.current.link.click();
			setLoadingExport(false);
		}
	}, [dataCSV]);

	useEffect(() => {
		handleLoadTreeType();
	}, [search]);

	const handleLoadTreeType = (body = { page: search.page, limit: search.limit, search: search.searchText, isActive: search.isActive }) => {
		dispatch(getTreeType(body));
	};

	const handleLoadAllTreeType = (body = { page: 1, limit: 9999 }) => {
		dispatch(exportTreeType(body, notifyError));
	};

	const columns = [
		{
			title: 'Tên',
			dataIndex: 'treeName',
			sorter: (a, b) => {
				return a.treeName < b.treeName ? -1 : 1;
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
			title: 'Tên vui vẻ',
			dataIndex: 'treeNameFunny',
			sorter: (a, b) => {
				return a.treeNameFunny < b.treeNameFunny ? -1 : 1;
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
			title: 'Khả năng hấp thụ CO2 hiện tại',
			dataIndex: 'currentCO2AbsorptionCapacity',
			sorter: (a, b) => {
				return a.currentCO2AbsorptionCapacity < b.currentCO2AbsorptionCapacity ? -1 : 1;
			},
		},
		{
			title: 'Khả năng hấp thụ CO2 khi trưởng thành',
			dataIndex: 'abilityToAbsorbCO2AsAnAdult',
			sorter: (a, b) => {
				return a.abilityToAbsorbCO2AsAnAdult < b.abilityToAbsorbCO2AsAnAdult ? -1 : 1;
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
			// title: <IntlMessages id="common.action.action" />,
			fixed: 'right',
			align: 'center',
			width: '10%',
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
		setTreeType(values);
	};

	const handleAddModal = () => {
		setShowModal(!showModal);
		setTreeType();
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const handleDelete = (id) => {
		dispatch(deleteTreeType(id, notifySuccess, notifyError));
	};

	const notifySuccess = (message) => {
		ShowNotify('Success', message, 'success', 5000);
		handleLoadTreeType();
	};

	const notifyError = (message) => {
		ShowNotify('Error', message, 'error', 5000);
	};

	const handleExportFile = () => {
		if (dataExportTreeType?.data) {
			csvRef.current.link.click();
		} else {
			setLoadingExport(true);
			handleLoadAllTreeType();
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
				<span>Danh sách loại cây</span>
			</PageHeader>

			{/* <ReactSpreadsheetImport isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} onSubmit={onSubmit} fields={fields} /> */}

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachLoaiCay(${moment(Date.now()).format('DD-MM-YYYY')})`}
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
					{infoTotal(search.page, search.limit, treeType?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={treeTypes?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: treeTypes?.data?.page,
							total: treeTypes?.data?.total,
							pageSize: treeTypes?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>

				{/* ADD */}
			</TableDemoStyle>

			<TreeTypeDrawer show={showModal} onClose={() => setShowModal(!showModal)} treeType={treeType} onLoadData={handleLoadTreeType} />
		</LayoutContentWrapper>
	);
}

export default TreeType;
