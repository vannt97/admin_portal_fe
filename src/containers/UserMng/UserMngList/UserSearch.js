import React from 'react';
import { SearchWrapper, Label } from './UserMngList.styles';
import { Input, Row, Col, Select, Drawer, Button } from 'antd';
import { CommonModels } from '@iso/constants/Models';
import IntlMessages from '@iso/components/utility/intlMessages';
import { MenuOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

export default function UserSearch(props) {
    const {
        search,
        _onSearch,
        _onSearchText,
        _handleFilter,
        messages,
        groups,
        profileTypes,
        visibleAdvanceSearch, _toggleAdvanceSearch,
        _clearFilter
    } = props;
    return (
        <SearchWrapper>
            <Row>
                <Col md={8}>
                    <Search
                        className="kgb-list-search"
                        placeholder={messages['common.label.search.searchText']}
                        onSearch={_onSearchText}
                    // prefix={<SearchOutlined />}
                    />
                    {/* <Input
                        className="kgb-list-search"
                        placeholder={messages['common.label.search.searchText']}
                        prefix={<SearchOutlined onClick={_onSearchText} />}
                        onPressEnter={e => _onSearchText(e.target.value)}
                    /> */}
                </Col>
                <Col md={16} style={{ textAlign: 'right' }}>
                    <Button icon={<MenuOutlined style={{ paddingRight: '10px' }} />} onClick={_toggleAdvanceSearch}><IntlMessages id='common.modal.label.advanceSearch' /></Button>
                </Col>
            </Row>

            <Drawer
                title={messages['common.modal.label.advanceSearch']}
                placement="right"
                closable={false}
                onClose={_toggleAdvanceSearch}
                visible={visibleAdvanceSearch}
                className="kgb-advance-search-drawer"
                width="320px"
            >
                <p onClick={_clearFilter} style={{ textAlign: 'right', color: '#4482FF', textDecoration: 'underline', cursor: 'pointer' }}>
                    <IntlMessages id="common.label.clearFilter" />
                </p>
                <Col md={24}>
                    <Label><IntlMessages id="common.label.selectbox.profileType" /></Label>
                    <Select allowClear
                        placeholder={messages['common.label.selectbox.profileType']}
                        value={search.profileType || undefined}
                        onChange={value => _handleFilter("profileType", value)}
                        showSearch optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {profileTypes && profileTypes.map((item, index) => (
                            <Option value={item.id.toString()} key={index}><IntlMessages id={item.name} /></Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="common.label.selectbox.groupRole" /></Label>
                    <Select allowClear
                        placeholder={messages['common.label.selectbox.groupRole']}
                        value={search.groupId || undefined}
                        onChange={value => _handleFilter("groupId", value)}
                        showSearch optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {groups && groups.map((item, index) => (
                            <Option value={item.id} key={index}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="common.label.selectbox.status" /></Label>
                    <Select allowClear
                        placeholder={messages['common.label.selectbox.status']}
                        value={search.status || undefined}
                        onChange={value => _handleFilter("status", value)}>
                        {CommonModels.status && CommonModels.status.map(item => (
                            <Option value={item.value.toString()} key={item.value}>{item.text}</Option>
                        ))}
                    </Select>
                </Col>
                {/* <Col md={24}>
                    <Label><IntlMessages id="common.label.orderBy" /></Label>
                    <Select
                        placeholder={messages['common.label.orderBy']}
                        value={search.orderBy || undefined}
                        onChange={value => _handleFilter("orderBy", value)}
                        allowClear
                    >
                        {CommonModels.orderBy && CommonModels.orderBy.map(item => (
                            <Option value={item.value.toString()} key={item.value}>{messages[item.text]}</Option>
                        ))}
                    </Select>
                </Col> */}

                <Col md={24} style={{ marginTop: '25px' }}>
                    <Button style={{ width: '100%' }} type="primary" onClick={_onSearch}><IntlMessages id="common.button.search" /></Button>
                </Col>
            </Drawer>
        </SearchWrapper >
    )
}