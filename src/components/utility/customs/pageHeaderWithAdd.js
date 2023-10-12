import React from 'react';
import { Wrapper } from './pageHeaderWithAdd.style';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { PlusOutlined } from '@ant-design/icons';

export default ({
	children,
	hasRoleAdd,
	handleAdd,
	title = 'Thêm mới',
	isExport,
	handleExport,
	isImport,
	handleImport,
	isUpdate,
	isAdd = true,
}) => (
	<Wrapper>
		<h1 className="isoComponentTitle">{children}</h1>
		{hasRoleAdd ? (
			<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
				{isImport && handleImport}
				{isExport && handleExport}
				{isAdd && (
					<Button type="primary" icon={isUpdate ? '' : <PlusOutlined />} className="btn-add" onClick={handleAdd}>
						{title}
					</Button>
				)}
			</div>
		) : (
			<Button type="primary" icon={isUpdate ? '' : <PlusOutlined />} className="btn-add" disabled>
				{title}
			</Button>
		)}
	</Wrapper>
);
