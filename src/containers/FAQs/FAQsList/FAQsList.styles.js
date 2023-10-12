import styled from 'styled-components';
import { palette } from 'styled-theme';

const SearchWrapper = styled.div`
    margin-bottom: 5px;
    display: inline-block;
    width: 100%;

    .kgb-list-search{
        width: 100%;
        .ant-input{
            border: none;
            padding-left: 30px;
            padding-right: 0px;
            // &:focus{
            //     // box-shadow: none;
            // }
        }
        .ant-input-suffix{
            left: 12px;
            width: fit-content;
        }
        
    }
    .kgb-list-select{
      width: 100%;
    }
    .ant-col{
      padding-right: 10px;
      &:last-child{
        padding-right: 0px;
      }
      @media only screen and (max-width: 768px) {
        padding-right: 0px;
        margin-bottom: 10px
      }
    }
    .col-filter{
      display: flex;
      .kgb-list-select{
        margin-right: 10px;
      }
      .btn-filter{
        padding-left: 8px;
        padding-right: 8px;
        .anticon {
          margin: 0px;
          color: #4482FF;
        }
      }
    }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const ComponentTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${palette('text', 0)};
  margin: 5px 0;
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


const ActionWrapper = styled.div`
  display: flex;
  align-content: center;

  a {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 18px;
      color: ${palette('primary', 0)};

      &:hover {
        color: ${palette('primary', 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette('error', 0)};

        &:hover {
          color: ${palette('error', 2)};
        }
      }
    }
  }
`;

const FormWrap = styled.div`
  .ant-form-item-control {
    line-height: 2.5;
  }
  .ant-input-lg, 
    .ant-select-selection-selected-value,
    .ant-select-selection__placeholder, 
    .ant-btn-lg{
        font-size: 14px;
  }
`;

const ActionIconWrapper = styled.span`
  .anticon-edit{
    color: #4482FF;
    cursor: pointer;
  }
  .anticon-delete{
    color: #F64744;
    cursor: pointer;
  }
  .icon-disable{
    .anticon-edit{
      color: #ccc;
    }
    .anticon-delete{
      color: #ccc;
    }
  }
`;

export {
  Label,
  LabelRequired,
  FormWrap,
  TitleWrapper,
  ActionWrapper,
  ComponentTitle,
  SearchWrapper,
  ActionIconWrapper
};