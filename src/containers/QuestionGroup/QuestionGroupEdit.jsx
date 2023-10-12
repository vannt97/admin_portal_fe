import { Button, Form, Input, Switch, Upload, Radio, Space, Modal } from 'antd';
import React, { useEffect } from 'react';
import { beforeUpload } from '@iso/lib/helpers/utility';
import PageHeaderNoAdd from '@iso/components/utility/pageHeader';
import { useDispatch, useSelector } from 'react-redux';
import TableDemoStyle from '@iso/containers/Tables/AntTables/Demo.styles';
import { FormWrap, Label, LabelRequired, AnswerStyle } from '../LearnerMng/LearnerMngList/LearnerMngList.styles';
import questiopGroupActions from '@iso/redux/questionGroup/actions';
import { useState } from 'react';
import { ShowNotify } from '../../utils/ShowNotify';
import { PlusOutlined } from '@ant-design/icons';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { useParams } from 'react-router';
import { useIntl } from 'react-intl';
import TextArea from 'antd/lib/input/TextArea';

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const domain = process.env.REACT_APP_API_KEY;
const { getQuestionGroupDetail, updateQuestionGroup } = questiopGroupActions;
const QuestionGroupEdit = ({ open, onClose, onLoad }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { id } = useParams();
	const { guidEmpty } = useState('-1');
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const { messages } = useIntl();
	const [fileList, setFileList] = useState([]);
	const { questionGroupDetail } = useSelector((state) => state.QuestionGroup);
	const [questions, setQuestions] = useState(questionGroupDetail?.questions);

	useEffect(() => {
		dispatch(getQuestionGroupDetail({ id: id }, dispatchError))
	}, [id]);

	const setData = () => {
		const qs = {
			Name: questionGroupDetail?.name,
			GiftName: questionGroupDetail?.giftName,
			MaxAttempts: questionGroupDetail?.maxAttempts,
			IsActive: questionGroupDetail?.active,
			File: questionGroupDetail?.imageLink,
			Questions: questionGroupDetail?.questions?.map((question) => ({
				Id: question?.id,
				ImageUrl: question?.imageUrl,
				Content: question?.content,
				FileBase64: question?.fileBase64 || '',
				FileName: question?.fileName || '',
				IsChangeImage: question?.isChangeImage || false,
				FileList: [
					{
						uid: question?.id,
						name: question.fileName || '',
						status: "done",
						url: question.imageUrl,
					},
				],
				Answers: question.answers?.map((answer) => ({
					Id: answer?.id,
					Content: answer?.content,
					IsCorrect: answer?.isCorrect,
					QuestionId: question?.id,
				})),

			})),
		};

		setFileList([
			{
				uid: '-1',
				name: questionGroupDetail?.fileImage || '',
				status: 'done',
				url: questionGroupDetail?.imageLink,
			},
		]);


		const newQuestions = questionGroupDetail?.questions.map((question) => {
			return {
				...question,
				id: question?.id,
				imageUrl: question?.imageUrl,
				content: question?.content,
				fileBase64: question?.fileBase64 || '',
				fileName: question?.fileName || '',
				isChangeImage: question?.isChangeImage || false,
				fileList: [
					{
						uid: question?.id,
						name: question.fileName || '',
						status: "done",
						url: question.imageUrl,
					},
				],
				answers: question.answers?.map((answer) => ({
					id: answer?.id,
					content: answer?.content,
					isCorrect: answer?.isCorrect,
					questionId: question?.id,
				})),
			};
		});
		setQuestions(newQuestions)
		console.log(newQuestions)
		form.setFieldsValue(qs);
	}

	useEffect(() => {
		setData()
	}, [questionGroupDetail, form]);

	const handleAddQuestion = () => {
		if (questions?.length > 9) {
			return;
		}
		const newQuestions = [...questions, {
			Id: '-1',
			Content: '',
			ImageUrl: '',
			FileBase64: '',
			FileName: '',
			FileType: '',
			IsChangeImage: '',
			FileList: [],
			Answers: []
		}];
		setQuestions(newQuestions);
		form.setFieldsValue({
			Questions: newQuestions.map((question, index) => ({
				Id: question?.id || null,
				Content: question?.content || '',
				ImageUrl: question?.imageUrl || '',
				IsChangeImage: question?.isChangeImage || false,
				Answers: question?.answers?.map((answer) => ({
					Id: answer?.id || null,
					Content: answer?.content || '',
					IsCorrect: answer?.isCorrect || false,
					QuestionId: question?.id || null,
				})),
			})),
		});
	};

	const handleImageUploadQuestion = (file, fileList, questionId) => {
		const reader = new FileReader();
		console.log(file)
		reader.onload = (e) => {
			console.log(e)
			const newQuestions = questions.map((question) => {
				if (question.id === questionId) {
					return {
						...question,
						fileList: fileList,
						fileBase64: e.target.result,
						fileName: file.name,
						fileType: file.type,
						isChangeImage: true
					};
				}
				return question;
			});

			setQuestions(newQuestions);
			form.setFieldsValue({
				Questions: newQuestions.map((question, index) => ({
					Id: question?.id || null,
					Content: question?.content || '',
					ImageUrl: question?.imageUrl || '',
					FileBase64: question?.fileBase64 || '',
					FileName: question?.fileName || '',
					FileType: question?.fileType || '',
					IsChangeImage: question?.isChangeImage || false,
					FileList: question?.fileList || '',
					Answers: question?.answers?.map((answer) => ({
						Id: answer?.id || null,
						Content: answer?.content || '',
						IsCorrect: answer?.isCorrect || false,
						QuestionId: question?.id || null,
					})),
				})),
			});
		};
		reader.readAsDataURL(file);
	};

	const handleImageRemoveQuestion = (questionId) => {
		const newQuestions = questions.map((question) => {
			if (question.id === questionId) {
				return {
					...question,
					fileList: [],
					fileBase64: null,
					fileName: null,
				};
			}
			return question;
		});
		setQuestions(newQuestions);
		form.setFieldsValue({
			Questions: newQuestions.map((question, index) => ({
				Id: question?.id || null,
				Content: question?.content || '',
				ImageUrl: question?.imageUrl || '',
				FileBase64: question?.fileBase64 || '',
				FileName: question?.fileName || '',
				FileList: question?.fileList || '',
				Answers: question?.answers?.map((answer) => ({
					Id: answer?.id || null,
					Content: answer?.content || '',
					IsCorrect: answer?.isCorrect || false,
					QuestionId: question?.id || null,
				})),
			})),
		});
	};


	const handleDeleteQuestion = (questionIndex) => {
		const newQuestions = questions.filter((_, index) => index !== questionIndex);
		setQuestions(newQuestions);
		form.setFieldsValue({
			Questions: newQuestions.map((question, index) => ({
				Id: question?.id || guidEmpty,
				Content: question?.content || '',
				ImageUrl: question?.imageUrl || '',
				Answers: question?.answers?.map((answer) => ({
					Id: answer?.id || guidEmpty,
					Content: answer?.content || '',
					IsCorrect: answer?.isCorrect || false,
					QuestionId: question?.id || null,
				})),
			})),
		});
	};

	const handleAddAnswer = (questionIndex) => {
		const currentQuestion = questions[questionIndex];
		if (currentQuestion?.answers?.length > 3) {
			return;
		}
		const newAnswers = [...(currentQuestion?.answers || []), { Id: guidEmpty, content: '', isCorrect: false }];
		const newQuestions = [
			...questions.slice(0, questionIndex),
			{ ...currentQuestion, answers: newAnswers },
			...questions.slice(questionIndex + 1),
		];
		setQuestions(newQuestions);

		form.setFieldsValue({
			Questions: newQuestions.map((question, index) => ({
				Id: question?.id || guidEmpty,
				Content: question?.content || '',
				ImageUrl: question?.imageUrl || '',
				Answers: question?.answers?.map((answer) => ({
					Id: answer?.id || guidEmpty,
					Content: answer?.content || '',
					IsCorrect: answer?.isCorrect || false,
					QuestionId: question?.id || null,
				})),
			})),
		});
	};

	const handleDeleteAnswer = (questionIndex, answerIndex) => {
		const currentQuestion = questions[questionIndex];
		const newAnswers = currentQuestion?.answers?.filter((_, index) => index !== answerIndex);
		const newQuestions = [
			...questions.slice(0, questionIndex),
			{ ...currentQuestion, answers: newAnswers },
			...questions.slice(questionIndex + 1),
		];
		setQuestions(newQuestions);
		form.setFieldsValue({
			Questions: newQuestions.map((question, index) => ({
				Id: question?.id || guidEmpty,
				Content: question?.content || '',
				ImageUrl: question?.imageUrl || '',
				Answers: question?.answers?.map((answer) => ({
					Id: answer?.id || guidEmpty,
					Content: answer?.content || '',
					IsCorrect: answer?.isCorrect || false,
					QuestionId: question?.id || null,
				})),
			})),
		});
	};

	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			if (file.originFileObj) {
				file.preview = await getBase64(file.originFileObj);
			} else {
				file.preview = file.thumbUrl;
			}
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);

	const dispatchSuccess = (message) => {
		ShowNotify('Success', message, 'success', 3000);
		onLoad();
		onClose();
	};

	const dispatchError = (message) => {
		ShowNotify('Error', message, 'error', 3000);
	};

	const handleSubmit = (values) => {
		const questions = form.getFieldValue('Questions').map((question) => {
			console.log(question)
			const answers = question.Answers.map((answer) => ({
				id: answer.Id || guidEmpty,
				content: answer.Content || '',
				isCorrect: answer.IsCorrect || false,
			}));

			return {
				id: question?.Id || guidEmpty,
				content: question?.Content || '',
				imageUrl: question?.ImageUrl || '',
				fileBase64: question?.FileBase64 || '',
				fileName: question?.FileName || '',
				fileType: question?.FileType || '',
				isChangeImage: question?.IsChangeImage || false,
				answers,
			};
		});
		const formData = new FormData();

		if (typeof values.File !== 'string') {
			formData.append('IsChangeImage', true);
			formData.append('File', values.File.fileList[0].thumbUrl);
			formData.append('FileName', values.File.fileList[0].name);
			formData.append('FileType', values.File.fileList[0].type);
		} else {
			formData.append('IsChangeImage', false);
		}
		const data = {
			name: form.getFieldValue('Name') || '',
			giftName: form.getFieldValue('GiftName') || '',
			maxAttempts: form.getFieldValue('MaxAttempts') || 0,
			active: form.getFieldValue('IsActive') || false,
			fileBase64: formData.get('File') || '',
			fileName: formData.get('FileName') || '',
			fileType: formData.get('FileType') || '',
			isChangeImage: formData.get('IsChangeImage') || null,
			questions,
		};
		console.log(data)
		dispatch(updateQuestionGroup(id, data, dispatchSuccess));
	};

	return (
		<LayoutContentWrapper>
			<PageHeaderNoAdd
				hasRoleAdd={true}
				isExport={false}
				isAdd={true}>
				<span>Chi tiết Quiz Game</span>
			</PageHeaderNoAdd>
			<TableDemoStyle className="isoLayoutContent">
				<FormWrap>
					<Form form={form} onFinish={handleSubmit}>
						<LabelRequired>Tên</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên' }]} name="Name">
							<Input placeholder={'Nhập tên'} size="large" />
						</Form.Item>

						<LabelRequired>Tên quà tặng</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên quà tặng' }]} name="GiftName">
							<Input placeholder={'Nhập tên quà tặng'} size="large" />
						</Form.Item>

						<LabelRequired>Lượt chơi tối đa</LabelRequired>
						<Form.Item rules={[{ required: true, message: 'Vui lòng lượt chơi tối đa' }]} name="MaxAttempts">
							<Input placeholder={'Lượt chơi tối đa'} size="large" />
						</Form.Item>
						<Form.Item rules={[{ required: true, message: 'Vui lòng tải ảnh lên' }]} name="File">
							<Upload
								action={`${domain}/api/Commons/CheckUpload`}
								listType="picture-card"
								fileList={fileList}
								onPreview={handlePreview}
								onChange={handleChange}
								beforeUpload={(file, fileList) => beforeUpload(file, messages)}
							>
								{fileList.length >= 1 ? null : uploadButton}
							</Upload>
						</Form.Item>
						<Label>Kích hoạt</Label>
						<Form.Item name="IsActive" valuePropName="checked">
							<Switch defaultChecked />
						</Form.Item>

						<div className="form__btn">
							<Button htmlType="submit" type="primary">

							</Button>
						</div>
						{questions?.map((question, questionIndex) => (
							<div key={`question-${questionIndex}`}>
								<Form.Item rules={[{ required: true, message: 'Vui nhập nôi dung câu hỏi' }]} label={`Câu hỏi ${questionIndex + 1} :`} >
									<div style={{ display: 'flex', gap: '10px' }}>
										<TextArea
											value={question?.content}
											onChange={(e) => {
												const newQuestions = [
													...questions.slice(0, questionIndex),
													{ ...question, content: e.target.value },
													...questions.slice(questionIndex + 1),
												];
												setQuestions(newQuestions);
												form.setFieldsValue({
													Questions: newQuestions.map((question, index) => ({
														Id: question?.id || null,
														Content: question?.content || '',
														ImageUrl: question?.imageUrl || '',
														IsChangeImage: question?.isChangeImage || false,
														Answers: question?.answers?.map((answer) => ({
															Id: answer?.id || null,
															Content: answer?.content || '',
															IsCorrect: answer?.isCorrect || false,
															AnswerId: answer?.id || null,
															QuestionId: question?.id || null,
														})),
													})),
												});
											}}
										/>
										<Button onClick={() => handleDeleteQuestion(questionIndex)}>Xóa</Button>
									</div>
								</Form.Item>
								<Form.Item style={{ marginLeft: '72px' }} >
									<Upload
										action={`${domain}/api/Commons/CheckUpload`}
										listType="picture-card"
										fileList={question.fileList}
										onPreview={handlePreview}
										onChange={(info) => {
											info.fileList.forEach((file) =>
												handleImageUploadQuestion(file.originFileObj, info.fileList, question.id)
											);
										}}
										onRemove={() => handleImageRemoveQuestion(question.id)} // Gọi hàm xóa ảnh tương ứng
										beforeUpload={(file, fileList) => beforeUpload(file, messages)}
									>
										{question?.fileList?.length >= 1 ? null : uploadButton}
									</Upload>
								</Form.Item>
								<Button style={{ marginLeft: ' 72px' }} onClick={() => handleAddAnswer(questionIndex)}>Thêm câu trả lời</Button>
								{question?.answers?.map((answer, answerIndex) => (
									<AnswerStyle>
										<div key={`answer-${questionIndex}-${answerIndex}`} className="answer">
											<Label>{`Câu trả lời ${answerIndex + 1} :`}</Label>
											<Form.Item>
												<Radio
													checked={answer?.isCorrect || false}
													onChange={(e) => {
														const currentQuestion = questions[questionIndex];
														const newAnswers = currentQuestion?.answers?.map((a, index) => ({
															...a,
															isCorrect: index === answerIndex && true,
														}
														));
														const newQuestions = [
															...questions.slice(0, questionIndex),
															{ ...currentQuestion, answers: newAnswers },
															...questions.slice(questionIndex + 1),
														];
														setQuestions(newQuestions);
														form.setFieldsValue({
															Questions: newQuestions.map((question, index) => ({
																Id: question?.id || guidEmpty,
																Content: question?.content || '',
																ImageUrl: question?.imageUrl || '',
																Answers: question?.answers?.map((answer) => ({
																	Id: answer?.id || guidEmpty,
																	Content: answer?.content || '',
																	IsCorrect: answer?.isCorrect,
																	QuestionId: question?.id || null,
																})),
															})),
														});
													}}

													value={true}
												>
												</Radio>
											</Form.Item>
											<Form.Item rules={[{ required: true, message: 'Vui nhập nội dung câu trả lời' }]}>
												<TextArea style={{ width: '600px' }}
													rows={1}
													size="large"
													value={answer?.content}
													onChange={(e) => {
														const currentQuestion = questions[questionIndex];
														const newAnswers = [
															...currentQuestion?.answers?.slice(0, answerIndex),
															{ ...answer, content: e.target.value },
															...currentQuestion?.answers?.slice(answerIndex + 1),
														];
														const newQuestions = [
															...questions.slice(0, questionIndex),
															{ ...currentQuestion, answers: newAnswers },
															...questions.slice(questionIndex + 1),
														];
														setQuestions(newQuestions);
														form.setFieldsValue({
															Questions: newQuestions.map((question, index) => ({
																Id: question?.id || guidEmpty,
																Content: question?.content || '',
																ImageUrl: question?.imageUrl || '',
																Answers: question?.answers?.map((answer) => ({
																	Id: answer?.id || guidEmpty,
																	Content: answer?.content || '',
																	IsCorrect: answer?.isCorrect || false,
																	QuestionId: question?.id || null,
																})),
															})),
														});
													}}
												/>
											</Form.Item>
											<Button onClick={() => handleDeleteAnswer(questionIndex, answerIndex)}>Xóa</Button>
										</div>
									</AnswerStyle>
								))}
							</div>

						))}

						<Button onClick={handleAddQuestion}>Thêm câu hỏi</Button>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Save
							</Button>
						</Form.Item>
					</Form>
				</FormWrap>

			</TableDemoStyle>
			<Modal title={previewTitle} visible={previewOpen} onCancel={handleCancel} footer={null}>
				<img
					alt="example"
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
		</LayoutContentWrapper>
	);
};




export default QuestionGroupEdit;
