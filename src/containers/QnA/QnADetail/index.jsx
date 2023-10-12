import qnaActions from '@iso/redux/QnA/actions';
import { Button, Col, Form, Input, Modal, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import swal from 'sweetalert';

const { putQna, getQna } = qnaActions;

const QnADetail = ({ isVisible, onSetIsVisible, id }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const { dataGetQnaDetail } = useSelector((state) => state?.QnA);

	const [data, setData] = useState({});
	const [switchValue, setSwitchValue] = useState(false);

	useEffect(() => {
		dataGetQnaDetail && setData(dataGetQnaDetail);
	}, [dataGetQnaDetail]);

	useEffect(() => {
		if (data) {
			form.setFieldsValue({
				name: data?.name,
				email: data?.email,
				phone: `0${data?.phone}`,
				taskTitle: data?.taskTitle,
				message: data?.message,
			});
			setSwitchValue(data?.isActive);
		}
	}, [data]);

	const onFinish = (values) => {
		dispatch(
			putQna(
				{
					id,
					isActive: switchValue,
					...values,
				},
				_success
			)
		);
	};

	const _success = () => {
		swal({
			title: 'Success',
			text: 'Update Update Successfully',
			icon: 'success',
		});
		onSetIsVisible(false);
		dispatch(getQna({}));
	};

	return (
		<CustomModal
			title="Chi tiết câu hỏi"
			visible={isVisible}
			onCancel={() => onSetIsVisible(false)}
			footer={[
				<Button onClick={() => onSetIsVisible(false)}>Cancel</Button>,
				<Button form="form" key="submit" htmlType="submit">
					Ok
				</Button>,
			]}
		>
			<Form name="basic" onFinish={onFinish} autoComplete="off" id="form" form={form}>
				<Col>
					<Form.Item label="Họ và tên" name="name">
						<Input disabled />
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label="Email" name="email">
						<Input disabled />
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label="Số Điện Thoại" name="phoneNumber">
						<Input disabled />
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label="Task" name="taskTitle">
						<Input disabled />
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label="Câu hỏi" name="message">
						<Input disabled />
					</Form.Item>
				</Col>
				<Col>
					<Form.Item label="Trạng thái">
						<Switch value={switchValue} checked={switchValue} onChange={(e) => setSwitchValue(e)} />
					</Form.Item>
				</Col>
			</Form>
		</CustomModal>
	);
};

export default QnADetail;
const CustomModal = styled(Modal)`
	.ant-row.ant-form-item.ant-form-item-has-success {
		margin: 8px 0;
	}
	.ant-form-item-label {
		label {
			width: 100px;
		}
	}
`;
