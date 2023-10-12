import { Col, Modal, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LearnerMockTestModal = ({ isVisibleMockTest, onSetIsVisibleMockTest }) => {
    const { learnerMockTestDetailData } = useSelector(state => state.Learner);
    return (
        <Wrapper title="Chi tiết Mock Test" visible={isVisibleMockTest} onCancel={() => onSetIsVisibleMockTest(false)} footer={[false]}>
            <Row gutter={24}>
                {learnerMockTestDetailData?.map((d, index) => {
                    return <Col span={8} key={d.idQuestion}>
                        <Row gutter={24}>
                            <Col><b>Câu {index + 1}</b></Col>
                            <Col>{d.questionOrParagraph}</Col>
                        </Row>
                        <Row gutter={24}>
                            <Col>Câu trả lời</Col>
                            <Col>{d.questionOrParagraph}</Col>
                        </Row>
                        <span></span>
                    </Col>;
                })}
            </Row>
        </Wrapper>
    );
};

export default LearnerMockTestModal;
const Wrapper = styled(Modal)`
    width: 1200px !important;
    max-width: 100%;
`;