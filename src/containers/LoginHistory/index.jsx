import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { infoTotal } from '@iso/lib/helpers/utility';
import treePGHistoryActions from '@iso/redux/treePGHistory/actions';
import { Button, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import TableSearch from '../../components/TableSearch';
import LoginHistoryFilter from './LoginHistoryFilter';

const { getTreePGHistory, exportTreePGHistory } = treePGHistoryActions;

const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
	isActive: null,
	DateFrom: '',
	DateTo: '',
};

function LoginHistory() {
	const { treePGHistory } = useSelector((state) => state.TreePGHistory);
	const [dataCSV, setDataCSV] = useState();
	const [search, setSearch] = useState(initSearch);
	const dispatch = useDispatch();
	const csvRef = useRef(null);
	const [loadingExport, setLoadingExport] = useState(false);

	useEffect(() => {
		handleLoadHistory({ ...search, search: search.searchText, isActive: true });
	}, [search]);

	const handleLoadHistory = (body) => {
		dispatch(getTreePGHistory(body));
	};

	const handleLoadAllHistory = (body) => {
		dispatch(exportTreePGHistory(body, dispatchSuccess));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const columns = [
		{
			title: 'Mã cây',
			dataIndex: 'publicCode',
			ellipsis: true,
			sorter: (a, b) => {
				return a.publicCode < b.publicCode ? -1 : 1;
			},
		},
		{
			title: 'Tên cây',
			dataIndex: 'treeName',
			ellipsis: true,
			sorter: (a, b) => {
				return a.treeName < b.treeName ? -1 : 1;
			},
		},
		{
			title: 'Mã PG',
			dataIndex: 'gid',
			ellipsis: true,
			sorter: (a, b) => {
				return a.gid < b.gid ? -1 : 1;
			},
		},
		{
			title: 'Thời gian đăng nhập',
			dataIndex: 'addedStamp',
			ellipsis: true,
			sorter: (a, b) => {
				return a.addedStamp < b.addedStamp ? -1 : 1;
			},
			render: (value) => {
				var localTime = moment.utc(value).toDate();
				return <span>{moment(localTime).format('DD/MM/YYYY HH:mm:ss')}</span>;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (value) => {
				let color = value === true ? '#00B16A' : '#a8a8a8';
				let text = value === true ? 'Đúng' : 'Sai';
				return <Tag color={color}>{text}</Tag>;
			},
		},
	];
	const handleExportFile = () => {
		handleLoadAllHistory({ ...search, search: search.searchText, limit: 9999999, isActive: true });
	};

	const dispatchSuccess = (res) => {
		const headers = [
			{ label: 'Mã cây', key: 'publicCode' },
			{ label: 'Tên cây', key: 'treeName' },
			{ label: 'Mã PG', key: 'gid' },
			{ label: 'Thời gian đăng nhập', key: 'addedStamp' },
			{ label: 'Số lần đăng nhập', key: 'numberOfSpin' },
			{ label: 'Trạng thái', key: 'status' },
		];
		if (res?.data) {
			const dataHistory = res.data.data.map((item) => {
				if (item.status) {
					return {
						...item,
						status: 'Đúng',
						addedStamp: moment(moment.utc(item.addedStamp).toDate()).format('DD/MM/YYYY HH:mm:ss'),
						numberOfSpin: 1,
					};
				} else {
					return {
						...item,
						status: 'Sai',
						addedStamp: moment(moment.utc(item.addedStamp).toDate()).format('DD/MM/YYYY HH:mm:ss'),
						numberOfSpin: 1,
					};
				}
			});
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
				<span>Lịch sử truy cập</span>
			</PageHeader>

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`lich-su-dang-nhap(${search.DateFrom || ''}-${search.DateTo || ''})`}
				style={{ color: '#fff' }}
			/>

			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
						<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
						<TableFilterStatus setSearch={(value) => setSearch(value)} search={search} isHideStatus={true}>
							<LoginHistoryFilter setSearch={(value) => setSearch(value)} search={search} />
						</TableFilterStatus>
					</Row>
				</SearchWrapper>
				<Spin spinning={false}>
					{infoTotal(search.page, search.limit, treePGHistory?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={treePGHistory?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: treePGHistory?.data?.page,
							total: treePGHistory?.data?.total,
							pageSize: treePGHistory?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>
			</TableDemoStyle>
		</LayoutContentWrapper>
	);
}

export default LoginHistory;
