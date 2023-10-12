import { Col, DatePicker, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const CommonModels = [{
    text: 'Hoàn thành',
    value: true
}, {
    text: 'Chưa hoàn thành',
    value: false
}];
const HistoryQuizGameFilter = ({ search, setSearch }) => {
    const [isCompleted, setisCompleted] = useState(null);
    const [filter, setFilter] = useState({
        DateFrom: '',
        DateTo: '',
    });

    const onChange = (value, type) => {
        if (type === 'DateFrom' || type === 'DateTo') {
            setFilter((prev) => ({ ...prev, [type]: moment(value).format('MM/DD/YYYY') }));
        } else {
            setFilter((prev) => ({ ...prev, [type]: value }));
        }
    };

    useEffect(() => {
        if (filter.DateFrom === "Invalid date") {
            setSearch(() => {
                delete search["DateFrom"];
                delete filter["DateFrom"];
                return { ...search, ...{ ...filter }, isCompleted }
            })
        } else if (filter.DateTo === "Invalid date") {
            setSearch(() => {
                delete search["DateTo"];
                delete filter["DateTo"];
                return { ...search, ...{ ...filter }, isCompleted }
            })
        } else {
            setSearch({ ...search, ...{ ...filter }, isCompleted });
        }
    }, [filter, isCompleted]);

    return (
        <Col span={16} style={{ paddingRight: '0 !important' }}>
            <Row gutter={8} className="col-filter" style={{ flexWrap: 'nowrap', width: '100%' }}>
                <Col span={5}>      
                </Col>
                <Col span={3}>   
                </Col>
                <Col span={5}>
                    <DatePicker placeholder='Ngày bắt đầu' onChange={(value) => onChange(value, 'DateFrom')} />
                </Col>
                <Col span={5}>
                    <DatePicker placeholder='Ngày kết thúc' onChange={(value) => onChange(value, 'DateTo')} />
                </Col>
                <Col span={6}>
                    <Select placeholder={'Trạng thái'} className="kgb-list-select" allowClear onChange={(value) => setisCompleted(value)}>
                        {CommonModels.map((item) => (
                            <Select.Option value={item.value} key={item.value}>
                                {item.text}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </Col>
    );
};

export default HistoryQuizGameFilter;
