import { palette } from 'styled-theme';
import styled from 'styled-components';

const Wrapper = styled.div`
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
`;


const ContentWrapper = styled.div`
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
        font-weight: 600;
        width: 100%;
    }
    .kgb-form-item-title{
    }
    .kgb-form-item-active{
        display: block;
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

    .btn-change-pw{
        color: #4482FF;
        margin-left: 15px;
        background: #fff;
        font-style: normal;
        margin-left: 15px;
        // font-weight: bold;
    }
    .action-btn-back{
        margin-top: 10px;
        cursor: pointer;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
        .anticon{
            margin-right: 10px;
        }
        a{
            color: rgba(0, 0, 0, 0.8);
        }
    }

`;
const Label = styled.label`
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

const LabelRequired = styled.label`
  font-size: 13px;
  color: ${palette('text', 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;
  
  ::after{
    display: inline-block;
    margin-left: 4px;
    color: #f5222d;
    font-size: 14px;
    line-height: 1;
    content: '*';
  }
`;

const FormWrap = styled.div`
  .ant-form-item-control {
    line-height: 2.5;
  }
  .ant-input-lg, 
  .ant-select-lg,
  .ant-btn-lg{
    font-size: 14px;
  }
  .ant-row.ant-form-item{
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .display-block{
      margin-bottom: 10px;
      label{
          display: block;
      }
  }
`;

const TreeWrap = styled.div`
    .ant-tree{
        padding-left: 30px;
        width: 100%;
        display: inline-block;
    }
    .ant-tree li{
        width: 30%;
        float: left;
        margin-right: 20px;
    }
    .ant-tree-child-tree > li{
        width: 100%;
    }
    .ant-tree li span.ant-tree-switcher{
        // display: none;
    }
    .check-all{
        line-height: 40px;
        background: rgba(0, 0, 0, 0.04);
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
    }
`;
const ColorPickerButton = styled.div`
    width: 40px;
    height: 40px;
    background: rgba(194, 194, 194, 0.32);
    text-align: center;
    display: inline-block;
    position: absolute;
    right: 0px;
    border-radius: 0px 5px 5px 0px;
    cursor: pointer;
`;

const FormItemPickerStyle = styled.div`
    .ant-form-item{
        position: relative;
        .ant-input{
            padding-right: 45px;
        }
    }
`;

const ColorPickerStyle = styled.div`
    .chrome-picker{
        top: -190px;
        right: -230px;
        position: absolute;
        z-index: 100;
    }
`;

export {
    Wrapper,
    ContentWrapper,
    Label,
    LabelRequired,
    FormWrap,
    TreeWrap,
    ColorPickerButton,
    FormItemPickerStyle,
    ColorPickerStyle
};