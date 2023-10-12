import TableFilterStatus from '@iso/components/TableFilterStatus';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { infoTotal } from '@iso/lib/helpers/utility';
import historiesQuizGameActions from '@iso/redux/historiesQuizGame/actions';
import { Button, Popconfirm, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import TableSearch from '../../components/TableSearch';
import HistoryQuizGameFilter from './HistoryQuizGameFilter';

// import GiftDrawer from './GiftDrawer';

const { getHistoriesQuizGame, exportHistoriesQuizGame } = historiesQuizGameActions;

const initSearch = {
	page: 1,
	limit: 10,
	search: '',
	isCompleted: null,
};

function HistoriesQuizGame() {
	const dispatch = useDispatch();
	const { historiesQuizGame, dataExportHistoriesQuizGame } = useSelector((state) => state.HistoriesQuizGame);
	const [search, setSearch] = useState(initSearch);
	const [dataCSV, setDataCSV] = useState();
	const [loadingExport, setLoadingExport] = useState(false);
	const csvRef = useRef(null);


	useEffect(() => {
		handleLoad();
	}, [search]);

	const handleLoad = (body = { ...search, page: search.page, limit: search.limit, search: search.searchText, isCompleted: search.isCompleted }) => {
		dispatch(getHistoriesQuizGame(body));
	};

	const handleLoadAllHistory = (body) => {
		dispatch(exportHistoriesQuizGame(body, dispatchSuccess));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const columns = [
		{
			title: 'Tên trò chơi',
			dataIndex: 'quizGameName',
			ellipsis: true,
		},
		{
			title: 'Người chơi',
			dataIndex: 'playerName',
			ellipsis: true,
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'playerPhone',
			ellipsis: true,
		},
		{
			title: 'Lượt chơi',
			dataIndex: 'playerTurn',
			ellipsis: true,
			render: (value) => {
				let color = value === 1 ? '#FF6347' : value === 2 ? '#990099' : '#3300CC';
				let text = 'Lượt ' + value;
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Kết quả',
			dataIndex: 'result',
		},
		{
			title: 'Trả lời',
			dataIndex: 'isCompleted',
			render: (value) => {
				let color = value === 'Hoàn thành' ? '#00B16A' : '#a8a8a8';
				let text = value;
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Mã cây',
			dataIndex: 'treeCode',
			ellipsis: true,
		},
		{
			title: 'Phần quà',
			dataIndex: 'giftName',
			ellipsis: true,
		},
		{
			title: 'Bắt lượt chơi',
			dataIndex: 'dateTimeStart',
		},
		{
			title: 'Kết thúc lượt chơi',
			dataIndex: 'dateTimeEnd',
		},

	];

	const handleExportFile = () => {
		handleLoadAllHistory({ ...search, search: search.searchText, limit: 9999 });
	};

	const dispatchSuccess = (res) => {
		console.log(res)
		const headers = [
			{ label: 'Tên trò chơi', key: 'quizGameName' },
			{ label: 'Người chơi', key: 'playerName' },
			{ label: 'Số điện thoại', key: 'playerPhone' },
			{ label: 'Lượt chơi', key: 'playerTurn' },
			{ label: 'Kết quả', key: 'result' },
			{ label: 'Trả lời', key: 'isCompleted' },
			{ label: 'Mã cây', key: 'treeCode' },
			{ label: 'Phần quà', key: 'giftName' },
			{ label: 'Bắt lượt chơi', key: 'dateTimeStart' },
			{ label: 'Kết thúc lượt chơi', key: 'dateTimeEnd' },
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
				<span>Danh sách lịch sử câu hỏi</span>
			</PageHeader>

			<CSVLink
				data={dataCSV?.data || []}
				headers={dataCSV?.headers || []}
				moment
				ref={csvRef}
				filename={`DanhSachLichSuCauHoi(${moment(Date.now()).format('DD-MM-YYYY')})`}
				style={{ color: '#fff' }}
			/>

			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row style={{ justifyContent: 'space-between' , flexWrap: 'nowrap' }}>
						<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
						<TableFilterStatus setSearch={(value) => setSearch(value)} search={search} isHideStatus={true}>
							<HistoryQuizGameFilter setSearch={(value) => setSearch(value)} search={search} />
						</TableFilterStatus>
					</Row>
				</SearchWrapper>
				<Spin spinning={false}>
					{infoTotal(search.page, search.limit, historiesQuizGame?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={historiesQuizGame?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: historiesQuizGame?.data?.page,
							total: historiesQuizGame?.data?.total,
							pageSize: historiesQuizGame?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>
			</TableDemoStyle>

		</LayoutContentWrapper>
	);
}

export default HistoriesQuizGame;
