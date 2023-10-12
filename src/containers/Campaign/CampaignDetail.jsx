import PageHeader from '@iso/components/utility/customs/pageHeaderWithAdd';
import PageHeaderNoAdd from '@iso/components/utility/pageHeader';
import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import CampaignDrawer from './CampaignDrawer';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import CampaignDuration from '../CampaignDuration';

const CampaignDetail = () => {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState({ isEdit: false, id: '' });
	const [tab, setTab] = useState('1');

	const handleAddModal = () => {
		setOpen(!open);
		setType({ isEdit: false, id: '' });
	};

	const loadingExport = () => {};
	const handleExportFile = () => {};
	const { id } = useParams();
	return (
		<LayoutContentWrapper>
			{tab === '1' ? (
				<PageHeaderNoAdd
					hasRoleAdd={true}
					handleAdd={handleAddModal}
					isExport={false}
					isAdd={true}
					handleExport={
						<Button loading={loadingExport} onClick={handleExportFile} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
							Export
						</Button>
					}
				>
					<span>Chi tiết chiến dịch</span>
				</PageHeaderNoAdd>
			) : (
				<PageHeader
					hasRoleAdd={true}
					handleAdd={handleAddModal}
					isExport={false}
					isAdd={true}
					handleExport={
						<Button loading={loadingExport} onClick={handleExportFile} className="btn-add" type="primary" style={{ marginLeft: '16px' }}>
							Export
						</Button>
					}
				>
					<span>Chi tiết chiến dịch</span>
				</PageHeader>
			)}

			<TableDemoStyle className="isoLayoutContent">
				<Tabs defaultActiveKey="1" onChange={(value) => setTab(value)}>
					<Tabs.TabPane tab="Thông tin chiến dịch" key="1">
						<CampaignDrawer type={{ isEdit: true, id }} />
					</Tabs.TabPane>
					<Tabs.TabPane tab="Thời gian chiến dịch" key="2">
						<CampaignDuration open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(!open)} type={type} setType={setType} />
					</Tabs.TabPane>
				</Tabs>
			</TableDemoStyle>
		</LayoutContentWrapper>
	);
};

export default CampaignDetail;
