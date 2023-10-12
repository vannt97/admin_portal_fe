import { Button, Drawer, Form, Input, Row, Col, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ShowNotify } from '../../utils/ShowNotify';
import { FormWrap, Label, LabelRequired } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import pgActions from '@iso/redux/pg/actions';

const { createPG, updatePG } = pgActions;

function PGDrawer(props) {
	const { show, onClose, PG, onLoadData } = props;
	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();
	const dispatch = useDispatch();


	useEffect(() => {
		form.resetFields();
		if (PG) {
			form.setFieldsValue(PG);
		} else {
			form.setFieldsValue({
				position: 'PG',
			});
		}
	}, [PG]);

	const handleSubmit = (values) => {
		if (PG) {
			dispatch(updatePG(PG.id, { ...values, standardP: values.province }, notifySuccess, notifyError));
		} else {
			dispatch(createPG({ ...values, standardP: values.province, isActive: true }, notifySuccess, notifyError));
		}
	};

	const notifySuccess = (message) => {
		setLoading(false);
		ShowNotify('Success', message, 'success', 3000);
		onClose();
		onLoadData();
	};

	const notifyError = (message) => {
		setLoading(false);
		ShowNotify('Error', message, 'error', 3000);
	};

	return (
		<Drawer visible={show} onClose={onClose} title={`${PG ? 'Cập Nhật' : 'Thêm mới'} PG`} width={'30%'}>
			<FormWrap>
				<Form initialValues={{ isActive: true }} id="learnerAddForm" onFinish={handleSubmit} form={form}>
					<Row gutter={24}>
						<Col md={12}>
							<LabelRequired>Kênh</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập kênh' }]} name="channel">
								<Input placeholder={'Vd: MM'} size="large" />
							</Form.Item>
						</Col>
						<Col md={12}>
							<LabelRequired>Nhà phân phối</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập nhà phân phối' }]} name="dealer">
								<Input placeholder={'Vd: Cao Phong'} size="large" />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={24}>
						<Col md={12}>
							<LabelRequired>Vùng</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập vùng' }]} name="region">
								<Input placeholder={'Vd: HCM'} size="large" />
							</Form.Item>
						</Col>
						<Col md={12}>
							<LabelRequired>Code cửa hàng</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập code cửa hàng' }]} name="codeShop">
								<Input placeholder={'Vd: C016'} size="large" />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={24}>
						<Col md={12}>
							<LabelRequired>Tỉnh</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tỉnh' }]} name="province">
								<Input placeholder={'Vd: HCM'} size="large" />
							</Form.Item>
						</Col>
						<Col md={12}>
							<LabelRequired>Tên cửa hàng</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng' }]} name="shopName">
								<Input placeholder={'Vd: Cao Phong - Linh Dong'} size="large" />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={24}>
						<Col md={12}>
							<LabelRequired>PG code</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập PG code' }]} name="gid">
								<Input placeholder={'Nhập vào PG code'} size="large" />
							</Form.Item>
						</Col>
						<Col md={12}>
							<LabelRequired>Ngành hàng</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập ngành hàng' }]} name="category">
								<Input placeholder={'Vd: HA'} size="large" />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={24}>
						<Col md={PG ? 12 : 24}>
							<LabelRequired>Vị trí</LabelRequired>
							<Form.Item rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]} name="position">
								<Input placeholder={'Vd: PG'} size="large" />
							</Form.Item>
						</Col>

						<Col md={12}>
							{PG && (
								<>
									<Label>Kích hoạt</Label>
									<Form.Item name="isActive" valuePropName="checked">
										<Switch />
									</Form.Item>
								</>
							)}
						</Col>
					</Row>

					<div className="form__btn">
						<Button style={{ width: '100%', marginTop: '8px' }} loading={loading} htmlType="submit" type="primary">
							{PG ? 'Cập Nhật' : 'Thêm Mới'}
						</Button>
					</div>
				</Form>
			</FormWrap>
		</Drawer>
	);
}

export default PGDrawer;
