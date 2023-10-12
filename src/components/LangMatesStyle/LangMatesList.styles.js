import styled from 'styled-components';
import { palette } from 'styled-theme';

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
	.form__btn {
		display: flex;
		justify-content: flex-end;
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
	.ant-form-item {
		position: relative;
		.ant-input {
			padding-right: 45px;
		}
	}
`;

const ColorPickerStyle = styled.div`
	.chrome-picker {
		top: -190px;
		right: -230px;
		position: absolute;
		z-index: 100;
	}
`;

const ArrInputStyle = styled.div`
	display: flex;
	justify-content: space-between;
	.btn {
		font-size: 18px;
		cursor: pointer;
		padding-top: 30px;
		&:hover {
			color: ${palette('primary', 4)};
		}
	}
	.btn.close {
		&:hover {
			color: red;
		}
	}
`;

const BtnAddNewInput = styled.div`
	width: 100%;
	text-align: center;
	border: 1px dashed black;
	padding: 4px;
	cursor: pointer;
	span {
		margin-left: 8px;
	}
`;

const TextChoose = styled.label`
	font-size: 13px;
	color: ${palette('text', 1)};
	line-height: 1.5;
	font-weight: 500;
	padding: 0;
	margin: 0 0 8px;
	color: #1890ff;
`;

export {
	Label,
	LabelRequired,
	LabelRequiredCorrectAnswer,
	FormWrap,
	TitleWrapper,
	ActionWrapper,
	ComponentTitle,
	SearchWrapper,
	ActionIconWrapper,
	ColorPickerButton,
	FormItemPickerStyle,
	ColorPickerStyle,
	ArrInputStyle,
	BtnAddNewInput,
	TextChoose,
};
