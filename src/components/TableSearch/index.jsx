import React from 'react';
import { Col, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import { SearchWrapper } from '../LangMatesStyle/LangMatesList.styles';

function TableSearch({ onSearchText }) {
	return (
		<Col md={7}>
			<Search style={{ width: '96%' }} className="kgb-list-search" placeholder="Tìm kiếm tại đây" onSearch={onSearchText} />
		</Col>
	);
}

export default TableSearch;
