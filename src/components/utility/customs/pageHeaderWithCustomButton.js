import React from 'react';
import { Wrapper } from './pageHeaderWithAdd.style';
import { Button } from 'antd';

export default props => (
  <Wrapper>
    <h1 className="isoComponentTitle">
      {props.children}
    </h1>
    {props.hasRoleUpdate
      ? <Button type="primary" icon={props.btnIcon} className="btn-add" onClick={props.handleClick}>{props.btnTitle}</Button>
      : <Button type="primary" icon={props.btnIcon} className="btn-add" disabled>{props.btnTitle}</Button>
    }

  </Wrapper>
);
