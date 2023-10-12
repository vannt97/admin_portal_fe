import campaignActions from '@iso/redux/campaign/actions';
import campaignDuration from '@iso/redux/campaignDuration/actions';
import { Col, DatePicker, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
const { getCampaign } = campaignActions;
const { getCampaignDuration } = campaignDuration;

const CommonModels = [{
    text: 'Trúng thưởng',
    value: true
}, {
    text: 'Trượt',
    value: false
}];
const HistoryRotationFilter = ({ search, setSearch }) => {
    const dispatch = useDispatch();
    const { campaign } = useSelector((state) => state.Campaign);
    const { campaignDuration } = useSelector((state) => state.CampaignDuration);
    const [isWinPrizes, setIsWinPrizes] = useState(null);
    const [filter, setFilter] = useState({
        CampaignId: '',
        CampaignDurationId: '',
        DateFrom: '',
        DateTo: '',
    });

    const handleLoadCampaign = (body = { page: 1, limit: 99999 }) => {
        dispatch(getCampaign(body));
    };
    const handleGetCampaignDuration = (body = { page: 1, limit: 99999, id: filter.CampaignId }) => {
        dispatch(getCampaignDuration(body));
    };

    useEffect(() => {
        handleLoadCampaign();
    }, []);

    useEffect(() => {
        filter.CampaignId && handleGetCampaignDuration();
    }, [filter.CampaignId]);

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
                return { ...search, ...{ ...filter }, isWinPrizes }
            })
        } else if (filter.DateTo === "Invalid date") {
            setSearch(() => {
                delete search["DateTo"];
                delete filter["DateTo"];
                return { ...search, ...{ ...filter }, isWinPrizes }
            })
        } else {
            setSearch({ ...search, ...{ ...filter }, isWinPrizes });
        }
    }, [filter, isWinPrizes]);

    return (
        <Col span={16} style={{ paddingRight: '0 !important' }}>
            <Row gutter={8} className="col-filter" style={{ flexWrap: 'nowrap', width: '100%' }}>
                <Col span={5}>
                    <Select placeholder={'Chiến dịch'} className="kgb-list-select" allowClear onChange={(value) => onChange(value, 'CampaignId')}>
                        {campaign?.data?.data?.length &&
                            campaign?.data?.data.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.campaignName}
                                </Option>
                            ))}
                    </Select>
                </Col>
                <Col span={5}>
                    <Select placeholder={'Giai đoạn'} className="kgb-list-select" allowClear onChange={(value) => onChange(value, 'CampaignDurationId')}>
                        {campaignDuration?.data?.data &&
                            campaignDuration?.data?.data?.map((item) => (
                                <Option value={item?.id} key={item?.id}>
                                    {item?.label}
                                </Option>
                            ))}
                    </Select>
                </Col>
                <Col span={5}>
                    <DatePicker placeholder='Ngày bắt đầu' onChange={(value) => onChange(value, 'DateFrom')} />
                </Col>
                <Col span={5}>
                    <DatePicker placeholder='Ngày kết thúc' onChange={(value) => onChange(value, 'DateTo')} />
                </Col>
                <Col span={4}>
                    <Select placeholder={'Trạng thái'} className="kgb-list-select" allowClear onChange={(value) => setIsWinPrizes(value)}>
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

export default HistoryRotationFilter;
