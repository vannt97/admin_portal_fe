import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { infoTotal } from '@iso/lib/helpers/utility';
import historyRotationActions from '@iso/redux/historyRotation/actions';
import { Button, Popconfirm, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TableSearch from '../../components/TableSearch';
import { ShowNotify } from '../../utils/ShowNotify';
// import TreeDrawer from './TreeDrawer';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import HistoryRotationFilter from './HistoryRotationFilter';

const { getHistoryRotation, exportHistoryRotation } = historyRotationActions;

const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
};

function Trees() {
	const { historyRotation, exportHistoryRotationData } = useSelector((state) => state.HistoryRotation);
	const [dataCSV, setDataCSV] = useState();
	const [search, setSearch] = useState(initSearch);
	const dispatch = useDispatch();
	const csvRef = useRef(null);
	const [loadingExport, setLoadingExport] = useState(false);

	useEffect(() => {
		handleLoadHistory({ ...search, search: search.searchText, isActive: true });
	}, [search]);

	const handleLoadHistory = (body) => {
		dispatch(getHistoryRotation(body));
	};

	const handleLoadAllHistory = (body) => {
		dispatch(exportHistoryRotation(body, dispatchSuccess));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const columns = [
		{
			title: 'Mã cây',
			width: '10%',
			dataIndex: 'publicCode',
			sorter: (a, b) => {
				return a.publicCode < b.publicCode ? -1 : 1;
			},
			render: (value, record) => {
				return record.inBlackList ? <Tag color='black'>{value}</Tag> : <span>{value}</span>;
			},
		},
		{
			title: 'Tên chiến dịch',
			width: '10%',
			dataIndex: 'campaignName',
			sorter: (a, b) => {
				return a.campaignName < b.campaignName ? -1 : 1;
			},
		},
		{
			title: 'Thời gian quay',
			dataIndex: 'addedStamp',
			width: '10%',
			sorter: (a, b) => {
				return a.addedStamp < b.addedStamp ? -1 : 1;
			},
			render: (value) => <span>{value}</span>,
		},
		{
			title: 'Thời gian bắt đầu',
			dataIndex: 'startFromOfDuration',
			width: '10%',
			sorter: (a, b) => {
				return a.startFromOfDuration < b.startFromOfDuration ? -1 : 1;
			},
		},
		{
			title: 'Thời gian kết thúc',
			dataIndex: 'endToOfDuration',
			width: '10%',
			sorter: (a, b) => {
				return a.endToOfDuration < b.endToOfDuration ? -1 : 1;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'giftName',
			width: '10%',
			render: (value) => {
				let color = value !== 'Trượt' ? '#00B16A' : '#a8a8a8';
				let text = value === 'Trượt' ? 'Trượt' : value;
				return <Tag color={color}>{text}</Tag>;
			},
		},
	];
	const handleExportFile = () => {
		handleLoadAllHistory({ ...search, search: search.searchText, limit: 9999, isActive: true });
	};

	const dispatchSuccess = (res) => {
		const headers = [
			{ label: 'Mã cây', key: 'publicCode' },
			{ label: 'Tên chiến dịch', key: 'campaignName' },
			{ label: 'Thời gian quay', key: 'addedStamp' },
			{ label: 'Số lần quay', key: 'numberOfSpin' },
			{ label: 'Thời gian bắt đầu chiến dịch', key: 'startFromOfDuration' },
			{ label: 'Thời gian kết thúc chiến dịch', key: 'endToOfDuration' },
			{ label: 'Trạng thái', key: 'giftName' },
		];
		if (res?.data) {
			const dataHistory = res.data.data.map((item) => ({ ...item, numberOfSpin: 1 }));
			setDataCSV({
				headers: headers,
				data: dataHistory,
			});
			csvRef.current.link.click();
		}
		setLoadingExport(true);
	};

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={true}
				isAdd={false}
				isExport
				handleExport={
					<Button onClick={handleExportFile} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
						Export
					</Button>
				}
			>
				<span>Lịch sử quay</span>
			</PageHeader>

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`lich-su-quay(${moment(Date.now()).format('DD-MM-YYYY')})`}
				style={{ color: '#fff' }}
			/>

			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
						<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
						<TableFilterStatus setSearch={(value) => setSearch(value)} search={search} isHideStatus={true}>
							<HistoryRotationFilter setSearch={(value) => setSearch(value)} search={search} />
						</TableFilterStatus>
					</Row>
				</SearchWrapper>
				<Spin spinning={false}>
					{infoTotal(search.page, search.limit, historyRotation?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={historyRotation?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: historyRotation?.data?.page,
							total: historyRotation?.data?.total,
							pageSize: historyRotation?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>
			</TableDemoStyle>
		</LayoutContentWrapper>
	);
}

export default Trees;
