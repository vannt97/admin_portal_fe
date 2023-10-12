import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { SearchWrapper } from '@iso/containers/RoleMng/RoleMngList/RoleMngList.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { infoTotal } from '@iso/lib/helpers/utility';
import questionGroupActions from '@iso/redux/questionGroup/actions';
import { Button, Popconfirm, Row, Spin, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TableSearch from '../../components/TableSearch';

const { getQuestionGroup} = questionGroupActions;

const initSearch = {
	page: 1,
	limit: 10,
	searchText: '',
};

function QuestionGroup() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { questionGroup } = useSelector((state) => state.QuestionGroup);
	const [search, setSearch] = useState(initSearch);

	useEffect(() => {
		handleLoad();
	}, [search]);

	const handleLoad = (body = { page: search.page, limit: search.limit, search: search.searchText }) => {
		dispatch(getQuestionGroup(body));
	};

	const handleChangePage = (page, limit) => {
		setSearch((prev) => ({ ...prev, page, limit }));
	};

	const columns = [
		{
			title: 'Hình ảnh',
			dataIndex: 'imageUrl',
			sorter: (a, b) => {
				return a.imageUrl < b.imageUrl ? -1 : 1;
			},
			render: (value) => {
				return <img className="image-table" src={value} alt="" />;
			},
		},
		{
			title: 'Tên trò chơi',
			dataIndex: 'name',
			sorter: (a, b) => {
				return a.name < b.name ? -1 : 1;
			},
			render: (value, record) => {
				return (
					<span onClick={() => handleEdit(record.id)} className="title">
						{value}
					</span>
				);
			},
		},
		{
			title: 'Quà tặng',
			dataIndex: 'giftName',
			ellipsis: true,
			sorter: (a, b) => {
				return a.giftName < b.giftName ? -1 : 1;
			},
		},
		{
			title: 'Lượt chơi tối đa',
			dataIndex: 'maxAttempts',
			ellipsis: true,
			sorter: (a, b) => {
				return a.maxAttempts < b.maxAttempts ? -1 : 1;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'active',
			sorter: (a, b) => {
				return a.active < b.active ? -1 : 1;
			},
			render: (value) => {
				let color = value ? '#00B16A' : '#a8a8a8';
				let text = value ? 'Hoạt Động' : 'Không Hoạt Động';
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: 'Thời gian thêm',
			dataIndex: 'addedStamp',
			sorter: (a, b) => {
				return a.addedStamp < b.addedStamp ? -1 : 1;
			},
			render: (value) => {
				return <>{value.split(' ')[0]}</>;
			},
		},
		{
			// title: <IntlMessages id="common.action.action" />,
			fixed: 'right',
			align: 'center',
			width: '10%',
			render: (text, record) => (
				<div>
					<button onClick={() => handleEdit(record.id)} className="mr-2 btn-edit cursor-pointer">
						<EditOutlined />
					</button>				
				</div>
			),
		},
	];

	const handleEdit = (id) => {
		history.push(`/dashboard/question-group/${id}`);
	};

	return (
		<LayoutContentWrapper>
			<PageHeader
				hasRoleAdd={true}
				isExport={false}
				isAdd={false}
			>
				<span>Danh sách trò chơi câu hỏi</span>
			</PageHeader>
			<TableDemoStyle className="isoLayoutContent">
				<SearchWrapper>
					<Row style={{ justifyContent: 'space-between' }}>
						<TableSearch onSearchText={(value) => setSearch({ ...search, searchText: value })} />
					</Row>
				</SearchWrapper>
				<Spin spinning={false}>
					{infoTotal(search.page, search.limit, questionGroup?.data?.total)}
					<TableWrapper
						columns={columns}
						dataSource={questionGroup?.data?.data}
						rowKey="id"
						className="isoCustomizedTable"
						pagination={{
							current: questionGroup?.data?.page,
							total: questionGroup?.data?.total,
							pageSize: questionGroup?.data?.limit,
							onChange: handleChangePage,
							showSizeChanger: true,
						}}
					/>
				</Spin>
			</TableDemoStyle>
			
		</LayoutContentWrapper>
	);
}

export default QuestionGroup;
