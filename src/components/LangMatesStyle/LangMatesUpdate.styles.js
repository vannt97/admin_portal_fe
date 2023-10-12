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

	.avatar-uploader {
		float: left;
		width: auto;
		margin-right: 10px;
	}
	.ant-upload.ant-upload-select-picture-card {
		width: 120px;
		height: 120px;
	}
	.top-title-avatar {
		float: left;
		height: 100%;
		padding-bottom: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top-title-avatar > .title-block > .title-fullname {
		font-weight: 600;
		width: 100%;
	}
	.kgb-form-item-title {
	}
	.kgb-form-item-active {
		display: block;
	}
	.kgb-form-item-title-required::after {
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
	.ant-btn-lg {
		font-size: 14px;
	}

	.btn-change-pw {
		color: #4482ff;
		margin-left: 15px;
		background: #fff;
		font-style: normal;
		margin-left: 15px;
		// font-weight: bold;
	}
	.action-btn-back {
		margin-top: 10px;
		cursor: pointer;
		font-weight: bold;
		color: rgba(0, 0, 0, 0.8);
		.anticon {
			margin-right: 10px;
		}
		a {
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

	.title-required::after {
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

	::after {
		display: inline-block;
		margin-left: 4px;
		color: #f5222d;
		font-size: 14px;
		line-height: 1;
		content: '*';
	}
`;

const LabelRequiredCorrectAnswer = styled.label`
	font-size: 13px;
	color: ${palette('text', 1)};
	line-height: 1.5;
	font-weight: 500;
	padding: 0;
	margin: 0 0 8px;
	color: green;

	::after {
		display: inline-block;
		margin-left: 4px;
		color: #f5222d;
		font-size: 14px;
		line-height: 1;
		content: '*';
	}
`;

const ActionIconWrapper = styled.span`
	.anticon-edit {
		color: #4482ff;
		cursor: pointer;
	}
	.anticon-delete {
		color: #f64744;
		cursor: pointer;
	}
	.icon-disable {
		.anticon-edit {
			color: #ccc;
		}
		.anticon-delete {
			color: #ccc;
		}
	}
`;

const FormWrap = styled.div`
	.ant-form-item-control {
		line-height: 2.5;
	}
	.ant-input-lg,
	.ant-select-lg,
	.ant-btn-lg {
		font-size: 14px;
	}
	.ant-row.ant-form-item {
		margin-top: 5px;
		margin-bottom: 10px;
	}
	.display-block {
		margin-bottom: 10px;
		label {
			display: block;
		}
	}
	.ck-editor__editable {
		min-height: 150px;
	}
`;

const Paragraph = styled.div`
	display: flex;
	flex-wrap: wrap;
	.highlight {
		color: #1890ff;
		font-weight: bold;
	}
`;

const SearchWrapper = styled.div`
	margin-bottom: 5px;
	display: inline-block;
	width: 100%;

	.kgb-list-search {
		width: 100%;
		.ant-input {
			border: none;
			padding-right: 0px;
		}
		.ant-input-suffix {
			left: 12px;
			width: fit-content;
		}
	}
	.kgb-list-select {
		width: 100%;
	}
	.col-filter {
		display: flex;
		.kgb-list-select {
			margin-right: 10px;
		}
		.btn-filter {
			padding-left: 8px;
			padding-right: 8px;
			.anticon {
				margin: 0px;
				color: #4482ff;
			}
		}
	}
`;

const SolutionWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	span {
		font-size: 18px;
		cursor: pointer;
		margin-left: 4px;
		&:hover {
			color: blue;
		}
	}
`;

const FlexWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LabelCorrect = styled.label`
	font-size: 13px;
	font-weight: 500;
	color: green;
`;

export {
	Wrapper,
	ContentWrapper,
	Label,
	LabelRequired,
	LabelRequiredCorrectAnswer,
	ActionIconWrapper,
	FormWrap,
	SearchWrapper,
	SolutionWrapper,
	Paragraph,
	FlexWrapper,
	LabelCorrect
};
