import { FilterFilled } from '@ant-design/icons';
import { CommonModels } from '@iso/constants/Models';
import { Button, Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
const { Option } = Select;

const TableFilterStatus = ({ setSearch, search, searchState, children, isHideStatus = false }) => {
	const [isActive, setIsActive] = useState(null);
	const onFilter = (isActive) => {
		setSearch({ ...search, isActive, ...searchState });
	};

	useEffect(() => {
		setIsActive(null);
	}, []);

	return (
		<Row justify="end" gutter={24} style={{ width: children ? '100%' : 'unset', flexWrap: 'nowrap' }}>
			{children}
			{!isHideStatus ? (
				<Col md={children ? 8 : 24} className="col-filter">
					<Select placeholder={'Trạng thái'} className="kgb-list-select" allowClear onChange={(value) => setIsActive(value)}>
						{CommonModels.status &&
							CommonModels.status.map((item) => (
								<Option value={item.value.toString()} key={item.value}>
									{item.text}
								</Option>
							))}
					</Select>
					<Button className="btn-filter" onClick={() => onFilter(isActive)} style={{ height: '35px' }}>
						<FilterFilled />
					</Button>
				</Col>
			) : (
				<Col className="col-filter">
					<Button className="btn-filter" onClick={() => onFilter(isActive)} style={{ height: '35px' }}>
						<FilterFilled />
					</Button>
				</Col>
			)}
		</Row>
	);
};

export default TableFilterStatus;
