import React from 'react';
import { SearchWrapper, Label } from './LearnerMngList.styles';
import { Input, Row, Col, Select, Drawer, Button, InputNumber, DatePicker } from 'antd';
import { CommonModels, LearnerModels } from '@iso/constants/Models';
import IntlMessages from '@iso/components/utility/intlMessages';
import { MenuOutlined, FilterFilled } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
export default function LearnerSearch(props) {
    const {
        search,
        _onSearch,
        _onSearchText,
        _handleFilter,
        messages,
        genders,
        languages,
        careers,
        nations,
        provinces,
        districts,
        subcriptionPackages,
        onChangeNation,
        onChangeProvince,
        visibleAdvanceSearch, _toggleAdvanceSearch,
        _clearFilter
    } = props;
    const dateFormat = 'DD/MM/YYYY';
    return (
        <SearchWrapper>
            <Row>
                <Col md={8}>
                    <Search
                        style={{ width: "96%" }}
                        className="kgb-list-search"
                        placeholder={messages['common.label.search.searchText']}
                        onSearch={_onSearchText}
                    />
                </Col>
                <Col md={5}>
                    <Select
                        style={{ width: "96%" }}
                        placeholder={messages["learnermng.page.label.search.type"]}
                        className="kgb-list-select"
                        value={search.searchTypeDate || undefined}
                        onChange={value => _handleFilter("searchTypeDate", value)}
                        allowClear
                    >
                        {LearnerModels.searchTypeDate && LearnerModels.searchTypeDate.map(item => (
                            <Option value={item.value.toString()} key={item.value}>{item.text}</Option>
                        ))}
                    </Select>
                </Col>
                <Col md={3}>
                    <DatePicker
                        placeholder={messages['learnermng.page.label.search.from']}
                        format={dateFormat} style={{ width: "96%" }}
                        disabled={!search.searchTypeDate}
                        onChange={value => _handleFilter("fromSearchDate", value)}
                    />
                </Col>
                <Col md={3}>
                    <DatePicker
                        placeholder={messages['learnermng.page.label.search.to']}
                        format={dateFormat} style={{ width: "96%" }}
                        disabled={!search.searchTypeDate}
                        onChange={value => _handleFilter("toSearchDate", value)}
                    />
                </Col>
                <Col md={1} className="col-filter">
                    <Button className="btn-filter" title={messages['common.label.find']}
                        onClick={_onSearch}>
                        <FilterFilled />
                    </Button>
                </Col>
                <Col md={4} style={{ textAlign: 'right' }}>
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
                width="400px"
            >
                <p onClick={_clearFilter} style={{ textAlign: 'right', color: '#4482FF', textDecoration: 'underline', cursor: 'pointer' }}>
                    <IntlMessages id="common.label.clearFilter" />
                </p>
                <Col md={24}>
                    <Label><IntlMessages id="learnermng.page.label.year" /></Label>
                    <Row>
                        <Col span={12}><InputNumber min={1920} max={new Date().getFullYear()}
                            allowClear
                            value={search.fromYearBirth || undefined}
                            style={{ width: '96%' }}
                            placeholder={messages['learnermng.page.label.fromYear']}
                            onChange={value => _handleFilter("fromYearBirth", value)}
                        /></Col>
                        <Col span={12}><InputNumber min={1920} max={new Date().getFullYear()}
                            allowClear
                            value={search.toYearBirth || undefined}
                            style={{ width: '100%' }}
                            placeholder={messages['learnermng.page.label.toYear']}
                            onChange={value => _handleFilter("toYearBirth", value)}
                        /></Col>
                    </Row>

                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="learnermng.page.label.gender" /></Label>
                    <Select allowClear
                        placeholder={messages['learnermng.page.label.gender']}
                        value={search.gender || undefined}
                        onChange={value => _handleFilter("gender", value)}
                        // showSearch optionFilterProp="children"
                        // filterOption={(input, option) =>
                        //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                    >
                        {genders && genders.map((item, index) => (
                            <Option value={item.id.toString()} key={index}><IntlMessages id={item.name} /></Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="learnermng.page.label.language" /></Label>
                    <Select allowClear
                        placeholder={messages['learnermng.page.label.language']}
                        value={search.language || undefined}
                        onChange={value => _handleFilter("language", value)}
                        // showSearch optionFilterProp="children"
                        // filterOption={(input, option) =>
                        //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                    >
                        {languages && languages.map((item, index) => (
                            <Option value={item.id.toString()} key={index}><IntlMessages id={item.name} /></Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="learnermng.page.label.career" /></Label>
                    <Select allowClear
                        placeholder={messages['learnermng.page.label.career']}
                        value={search.careerId || undefined}
                        onChange={value => _handleFilter("careerId", value)}
                        showSearch optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {careers && careers.map((item, index) => (
                            <Option value={item.id} key={index}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="common.label.nation" /></Label>
                    <Select allowClear
                        placeholder={messages['common.label.nation']}
                        value={search.nationId || undefined}
                        //onChange={value => _handleFilter("nationId", value)}
                        showSearch optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={onChangeNation}
                    >
                        {nations && nations.map((item, index) => (
                            <Option value={item.id.toString()} key={index}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="common.label.province" /></Label>
                    <Select allowClear
                        placeholder={messages['common.label.province']}
                        value={search.provinceId || undefined}
                        //onChange={value => _handleFilter("provinceId", value)}
                        showSearch optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={onChangeProvince}
                    >
                        {provinces && provinces.map((item, index) => (
                            <Option value={item.id.toString()} key={index}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="common.label.district" /></Label>
                    <Select allowClear
                        placeholder={messages['common.label.district']}
                        value={search.districtId || undefined}
                        onChange={value => _handleFilter("districtId", value)}
                        showSearch optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {districts && districts.map((item, index) => (
                            <Option value={item.id.toString()} key={index}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>
                <Col md={24}>
                    <Label><IntlMessages id="learnermng.page.label.subpack" /></Label>
                    <Select allowClear
                        placeholder={messages['learnermng.page.label.subpack']}
                        value={search.subcriptionPackageId || undefined}
                        onChange={value => _handleFilter("subcriptionPackageId", value)}
                        showSearch optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {subcriptionPackages && subcriptionPackages.map((item, index) => (
                            <Option value={item.id.toString()} key={index}>{item.name}</Option>
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
                <Col md={24} style={{ marginTop: '25px' }}>
                    <Button style={{ width: '100%' }} type="primary" onClick={_onSearch}><IntlMessages id="common.button.search" /></Button>
                </Col>
            </Drawer>
        </SearchWrapper >
    )
}