import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ActionIconWrapper } from '@iso/components/LangMatesStyle/LangMatesList.styles';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { infoTotal, SWType, _swSuccess } from '@iso/lib/helpers/utility';
import qnaActions from '@iso/redux/QnA/actions';
import { Divider, Popconfirm, Spin, Tabs, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import AdvanceSearch from './search';
import ModalDetail from './QnADetail';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { getQna, deleteQna, getQnaDetail } = qnaActions;
function QnA(props) {
	const dispatch = useDispatch();
	const { messages } = props.intl;

	const { dataGetQna, dataGetQnaDetail } = useSelector((state) => state?.QnA);

	const [data, setData] = useState();
	const [key, setKey] = useState(1);
	const [isVisible, setIsVisible] = useState(false);
	const [id, setId] = useState('');
	const [search, setSearch] = useState({
		search: '',
		limit: 10,
		page: 1,
	});
	const [hasRole] = useState({ create: true, view: true, delete: true });

	useEffect(() => {
		dispatch(getQna({}));
	}, []);

	useEffect(() => {
		if (dataGetQna) {
			const arr = dataGetQna?.data?.filter((d) => d.formSubmitType === key);
			setData(arr);
		}
	}, [dataGetQna, key]);

	const onChange = (key) => {
		setKey(Number(key));
	};
	//#region INIT
	function _onAdvanceSearch() {
		if (search.page !== 1) setSearch({ ...search, page: 1 });
	}
	const _clearFilter = () => {
		setSearch({
			...search,
			page: 1,
			orderBy: null,
			status: null,
		});
	};
	function _onChangePage(page, pageSize) {
		setSearch({ ...search, page: page, limit: pageSize });
	}

	function _onSearchText(value, e) {
		setSearch({ ...search, page: 1, searchText: value });
	}
	const _handleSelectFilter = (name, value) => {
		setSearch({ ...search, [name]: value || null });
	};
	const onDelete = (id) => {
		dispatch(deleteQna(id, _success));
	};
	const _success = () => {
		_swSuccess(messages, SWType.DELETE);
		dispatch(getQna({}));
	};
	const handleRowClick = (id) => {
		setIsVisible(true);
		dispatch(getQnaDetail(id));
		setId(id);
	};
	const columns = [
		{
			title: 'Họ Tên',
			dataIndex: 'name',
			width: '20%',
			sorter: (a, b) => a.code.localeCompare(b.code),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: '30%',
		},
		{
			title: 'Câu hỏi',
			dataIndex: 'message',
			width: '30%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'watched',
			width: '6.5%',
			render: (value) => {
				if (value) {
					return <Tag color="#00B16A">Đã xem</Tag>;
				} else {
					return <Tag color="#a8a8a8">Chưa xem</Tag>;
				}
			},
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'addedStamp',
			width: '6.5%',
			sorter: (a, b) =>
				moment(moment(a.addedStamp, 'DD/MM/YYYY')).utc(7).valueOf() - moment(moment(b.addedStamp, 'DD/MM/YYYY')).utc(7).valueOf(),
		},
		{
			fixed: 'right',
			align: 'center',
			width: '7%',
			render: (text, record) => (
				<ActionIconWrapper>
					{hasRole.view ? (
						<Link onClick={() => handleRowClick(record.id)}>
							<EditOutlined />
						</Link>
					) : (
						<div className="icon-disable" title={messages['common.label.title.detail']}>
							<EditOutlined />
						</div>
					)}
					{
						<>
							<Divider type="vertical" />
							{hasRole.delete ? (
								<Popconfirm
									title={messages['common.notify.areYouSureDelete']}
									okText={messages['common.label.yes']}
									cancelText={messages['common.label.no']}
									onConfirm={() => onDelete(record.id)}
								>
									<DeleteOutlined />
								</Popconfirm>
							) : (
								<span className="icon-disable" title={messages['common.label.title.delete']}>
									<EditOutlined />
								</span>
							)}
						</>
					}
				</ActionIconWrapper>
			),
		},
	];

	return (
		<LayoutContentWrapper>
			<PageHeader hasRoleAdd={hasRole.create}>Ask For Help</PageHeader>

			<Tabs onChange={onChange} type="card" style={{ width: '100%' }}>
				<TabPane tab="New Client" key="1">
					<TableDemoStyle className="isoLayoutContent">
						<AdvanceSearch
							search={search}
							_onSearch={_onAdvanceSearch}
							_onSearchText={_onSearchText}
							_handleFilter={_handleSelectFilter}
							messages={messages}
							_clearFilter={_clearFilter}
						/>

						<Spin tip={messages['common.label.loading']} spinning={false}>
							{infoTotal(search.page, search.limit, data?.total)}
							<TableWrapper
								columns={columns}
								dataSource={data}
								rowKey="id"
								className="isoCustomizedTable"
								pagination={{
									current: search.page,
									total: data?.total,
									pageSize: search.limit,
									onChange: _onChangePage,
									showSizeChanger: true,
								}}
							/>
						</Spin>
					</TableDemoStyle>
				</TabPane>
				<TabPane tab="Student" key="2">
					<TableDemoStyle className="isoLayoutContent">
						<AdvanceSearch
							search={search}
							_onSearch={_onAdvanceSearch}
							_onSearchText={_onSearchText}
							_handleFilter={_handleSelectFilter}
							messages={messages}
							_clearFilter={_clearFilter}
						/>

						<Spin tip={messages['common.label.loading']} spinning={false}>
							{infoTotal(search.page, search.limit, data?.total)}
							<TableWrapper
								columns={columns}
								dataSource={data}
								rowKey="id"
								className="isoCustomizedTable"
								pagination={{
									current: search.page,
									total: data?.total,
									pageSize: search.limit,
									onChange: _onChangePage,
									showSizeChanger: true,
								}}
							/>
						</Spin>
					</TableDemoStyle>
				</TabPane>
			</Tabs>
			<ModalDetail isVisible={isVisible} onSetIsVisible={setIsVisible} id={id} />
		</LayoutContentWrapper>
	);
}

export default injectIntl(QnA);
