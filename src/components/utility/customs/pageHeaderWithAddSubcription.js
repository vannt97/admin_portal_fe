import React from 'react';
import { Wrapper } from './pageHeaderWithAdd.style';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { PlusOutlined } from '@ant-design/icons';

export default props => (
  <Wrapper>
    <h1 className="isoComponentTitle">
      {props.children}
    </h1>
    {props.hasRoleAdd
      ? <Button type="primary" icon={<PlusOutlined />} className="btn-add" onClick={props.handleAdd}><IntlMessages id="learnermng.add_subcription" /></Button>
      : <Button type="primary" icon={<PlusOutlined />} className="btn-add" disabled ><IntlMessages id="learnermng.add_subcription" /></Button>
    }
  </Wrapper>
);
