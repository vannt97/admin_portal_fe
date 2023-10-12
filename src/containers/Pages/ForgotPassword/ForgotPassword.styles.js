import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/sign.jpg';
import WithDirection from '@iso/lib/helpers/rtl';

const ForgotPasswordStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .isoFormContentWrapper {
    width: 500px;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    position: relative;
  }

  .isoFormContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px 50px;
    position: relative;
    background-color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }

    .isoLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 30px;
      justify-content: center;

      a {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        text-transform: uppercase;
        color: ${palette('secondary', 2)};
      }
    }

    .isoFormHeadText {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      justify-content: center;

      h3 {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.2;
        margin: 0 0 7px;
        color: ${palette('text', 0)};
      }

      p {
        font-size: 13px;
        font-weight: 400;
        line-height: 1.2;
        margin: 0;
        color: ${palette('text', 2)};
      }
    }

    .isoForgotPwBlock{
        text-align: center;
        margin-top: 20px;
        .isoForgotPass {
          font-weight: 500;
          text-decoration-line: underline;
          color: rgba(0, 0, 0, 0.6);
          font-size: 14px;
          line-height: 24px;
  
          &:hover {
            color: ${palette('primary', 0)};
          }
        }
      }

    .isoForgotPassForm {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        input {
          &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
          }
        }

        button {
          height: 42px;
          width: 100%;
          font-weight: 500;
          font-size: 13px;
        }
      }
    }
    .kgbSigninLogoBlock{
      margin-top: 20px;
      margin-bottom: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
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

export const LabelRequired = styled.label`
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

export const FormWrap = styled.div`
  .ant-form-item-control {
    line-height: 2.5;
  }
  .ant-input-lg, 
    .ant-select-selection-selected-value,
    .ant-select-selection__placeholder, 
    .ant-btn-lg{
        font-size: 14px;
  }
  
  .title{
    font-style: italic;
    margin-bottom: 5px;
    /* &::before {
      color: red;
      content: '*';
      padding-right: 5px;
    } */
  }
  .sub-title{
    margin-top: 10px;
    a{
      text-decoration: underline;
      /* font-style: italic; */
      font-weight: 600;
      padding-left: 5px;
    }
    .disable{
      color: #ccc;
      text-decoration: underline;
      font-weight: 600;
      padding-left: 5px;
    }
  }
 
`;

export default WithDirection(ForgotPasswordStyleWrapper);
