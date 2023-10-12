import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';
import { palette } from 'styled-theme';

const ForgotPasswordStyleWrapper = styled.div`
    padding: 40px 20px;
    display: flex;
    flex-flow: row wrap;
    overflow: hidden;

    @media only screen and (max-width: 767px) {
    padding: 50px 20px;
    }

    @media (max-width: 580px) {
    padding: 15px;
    }

    .kgbFormContentWrapper{
        width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #e9e9e9;
        margin: 0 0 30px;
    }
`;
export const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #e9e9e9;
    margin: 0 0 30px;

    .avatar-uploader{
        float: left;
        width: auto;
        margin-right: 10px;
    }
    .top-title-avatar{
        float: left;
        height: 100%;
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .top-title-avatar>.title-block>.title-fullname{
        width: 100%;
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
        letter-spacing: 0.0015em;
        color: rgba(0, 0, 0, 0.92);
    }
    .top-title-avatar>.title-block>.title-sub-email{
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.0012em;
        color: rgba(0, 0, 0, 0.32);
    }
    .top-title-avatar>.title-block>.title-sub-code{
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.0012em;
        color: rgba(0, 0, 0, 0.62);
    }
    .kgb-form-item-title-required::after{
        display: inline-block;
        margin-left: 4px;
        color: #f5222d;
        font-size: 14px;
        line-height: 1;
        content: '*';
    }
    .ant-input-lg, 
    .ant-select-selection-selected-value,
    .ant-select-selection__placeholder, 
    .ant-btn-lg{
        font-size: 14px;
    }
`;
export const Label = styled.label`
  font-size: 13px;
  color: ${palette('text', 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;

  .title-required::after{
    display: inline-block;
    margin-left: 4px;
    color: #f5222d;
    font-size: 14px;
    line-height: 1;
    content: '*';
  }
`;
export const FormWrap = styled.div`
  .ant-input-lg, 
  .ant-select-lg,
  .ant-btn-lg,
  .ant-picker-large .ant-picker-input > input
  {
      font-size: 14px;
  }
  .ant-row.ant-form-item{
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

export default WithDirection(ForgotPasswordStyleWrapper);