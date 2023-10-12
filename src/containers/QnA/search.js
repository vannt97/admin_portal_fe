import { FilterFilled, MenuOutlined } from '@ant-design/icons';
import { Label, SearchWrapper } from '@iso/components/LangMatesStyle/LangMatesList.styles';
import IntlMessages from '@iso/components/utility/intlMessages';
import { CommonModels, LearnerModels } from '@iso/constants/Models';
import { Button, Col, DatePicker, Drawer, Input, Row, Select } from 'antd';
import React from 'react';

const { Search } = Input;
const { Option } = Select;
export default function MultipleChoiceMultipleAnswerSearch(props) {
    const { search, _onSearch, _onSearchText, _handleFilter, messages, visibleAdvanceSearch, _toggleAdvanceSearch, _clearFilter } = props;
    const dateFormat = 'DD/MM/YYYY';
    return (
        <SearchWrapper>
            <Row>
                <Col md={8}>
                    <Search
                        style={{ width: '96%' }}
                        className="kgb-list-search"
                        placeholder={messages['common.label.search.searchText']}
                        onSearch={_onSearchText}
                    />
                </Col>
                <Col md={5}>
                    <Select
                        style={{ width: '96%' }}
                        placeholder={messages['learnermng.page.label.search.type']}
                        className="kgb-list-select"
                        value={search.searchTypeDate || undefined}
                        onChange={(value) => _handleFilter('searchTypeDate', value)}
                        allowClear
                    >
                        {LearnerModels.searchTypeDate &&
                            LearnerModels.searchTypeDate.map((item) => (
                                <Option value={item.value.toString()} key={item.value}>
                                    {item.text}
                                </Option>
                            ))}
                    </Select>
                </Col>
                <Col md={3}>
                    <DatePicker
                        placeholder={messages['learnermng.page.label.search.from']}
                        format={dateFormat}
                        style={{ width: '96%' }}
                        disabled={!search.searchTypeDate}
                        onChange={(value) => _handleFilter('fromSearchDate', value)}
                    />
                </Col>
                <Col md={3}>
                    <DatePicker
                        placeholder={messages['learnermng.page.label.search.to']}
                        format={dateFormat}
                        style={{ width: '96%' }}
                        disabled={!search.searchTypeDate}
                        onChange={(value) => _handleFilter('toSearchDate', value)}
                    />
                </Col>
                <Col md={1} className="col-filter">
                    <Button className="btn-filter" title={messages['common.label.find']} onClick={_onSearch}>
                        <FilterFilled />
                    </Button>
                </Col>
                <Col md={4} style={{ textAlign: 'right' }}>
                    <Button icon={<MenuOutlined style={{ paddingRight: '10px' }} />} onClick={_toggleAdvanceSearch}>
                        <IntlMessages id="common.modal.label.advanceSearch" />
                    </Button>
                </Col>
            </Row>
            <Drawer
                title={messages['common.modal.label.advanceSearch']}
                placement="right"
                closable={false}
                onClose={_toggleAdvanceSearch}
                visible={visibleAdvanceSearch}
                className="kgb-advance-search-drawer"
                width="400px"
            >
                <p onClick={_clearFilter} style={{ textAlign: 'right', color: '#4482FF', textDecoration: 'underline', cursor: 'pointer' }}>
                    <IntlMessages id="common.label.clearFilter" />
                </p>

                <Col md={24}>
                    <Label>
                        <IntlMessages id="common.label.selectbox.status" />
                    </Label>
                    <Select
                        allowClear
                        placeholder={messages['common.label.selectbox.status']}
                        value={search.status || undefined}
                        onChange={(value) => _handleFilter('status', value)}
                    >
                        {CommonModels.status &&
                            CommonModels.status.map((item) => (
                                <Option value={item.value.toString()} key={item.value}>
                                    {item.text}
                                </Option>
                            ))}
                    </Select>
                </Col>
                <Col md={24} style={{ marginTop: '25px' }}>
                    <Button style={{ width: '100%' }} type="primary" onClick={_onSearch}>
                        <IntlMessages id="common.button.search" />
                    </Button>
                </Col>
            </Drawer>
        </SearchWrapper>
    );
}
