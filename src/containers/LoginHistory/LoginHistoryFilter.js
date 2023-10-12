import { Col, DatePicker, Row } from 'antd'
import React from 'react'
import moment from 'moment'

const LoginHistoryFilter = ({ search, setSearch }) => {

  const onChange = (value, type) => {
    if (value) {
      if (type === 'DateFrom') {
        setSearch((prev) => ({ ...prev, [type]: moment(moment(moment.utc(value).toDate()).format('MM/DD/YYYY')).startOf('day').format('MM/DD/YYYY HH:mm:ss') }));
      } else {
        setSearch((prev) => ({ ...prev, [type]: moment(moment(moment.utc(value).toDate()).format('MM/DD/YYYY')).endOf('day').format('MM/DD/YYYY HH:mm:ss') }));
      }
    } else {
      setSearch((prev) => ({ ...prev, [type]: '' }));
    }
  }

  return (
    <Col span={16} style={{ paddingRight: '0 !important' }}>
      <Row gutter={8} className="col-filter" style={{ flexWrap: 'nowrap', width: '100%' }} justify="end">
        <Col span={8}>
          <DatePicker placeholder='Ngày bắt đầu' onChange={(value) => onChange(value, 'DateFrom')} style={{ width: '100%' }} />
        </Col>
        <Col span={8}>
          <DatePicker placeholder='Ngày kết thúc' onChange={(value) => onChange(value, 'DateTo')} style={{ width: '100%' }} />
        </Col>
        {/* <Col span={4}>
          <Select placeholder={'Trạng thái'} className="kgb-list-select" allowClear onChange={(value) => setIsWinPrizes(value)}>
            {CommonModels.map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Col> */}
      </Row>
    </Col>
  )
}

export default LoginHistoryFilter