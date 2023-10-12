import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import { getUrlParam } from '@iso/lib/helpers/url_handler';
import dashboardActions from '@iso/redux/dashboard/actions';
import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

function Dashboard(props) {
	const { getStatistics, getDashboard } = dashboardActions;
	const { dashboardData } = useSelector((state) => state.Dashboard);
	const dispatch = useDispatch();
	const [search, setSearch] = useState({
		filterType: getUrlParam()['filterType'] || null,
	});

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		dispatch(getStatistics(search.filterType));
	}

	const [dashboard, setDashboard] = useState({});

	useEffect(() => {
		dispatch(getDashboard({}));
	}, []);

	useEffect(() => {
		dashboardData && setDashboard(dashboardData);
	}, [dashboardData]);

	//#endregion
	return (
		<LayoutContentWrapper>
			<PageHeader>
				<IntlMessages id="dashboard.title" />
			</PageHeader>

			<Wrapper>
				<div className="total">
					<Row align="middle">
						{/* <div className="item flex bg-white">
							<span>Tổng số cây trồng</span>
							<span style={{ fontSize: '70px', marginTop: '20px', color: '#1890ff' }} className="bold">
								0
							</span>
						</div> */}

						<div className="item flex bg-white">
							<span>Tổng số điểm trồng</span>
							<span style={{ fontSize: '70px', marginTop: '20px', color: '#1890ff' }} className="bold">
								{13}
							</span>
						</div>
					</Row>
				</div>
			</Wrapper>
			{/* </LayoutContent> */}
		</LayoutContentWrapper>
	);
}
export default injectIntl(Dashboard);

const Wrapper = styled.div`
	width: 100%;
	padding: 20px 40px;
	.total {
		margin-bottom: 28px;
		.ant-row {
			width: 100%;
			gap: 20px;
			flex-wrap: nowrap;
			align-items: stretch;
			.item {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
				border-radius: 8px;
				.flex {
					display: flex !important;
				}
				&:first-child {
					width: 50%;
				}
				&:last-child {
					width: 50%;
				}
				span {
					/* width: 100%; */
					display: block;
					&:first-child {
						font-size: 30px;
						margin-right: 20px;
					}
					&:last-child {
						font-size: 30px;
					}
				}
				&.flex {
					display: flex !important;
				}
				.ant-progress-inner {
					width: 120px !important;
					height: 120px !important;
				}
				p {
					font-size: 30px;
				}
			}
		}
	}

	.bg-white {
		background-color: #fff;
		padding: 20px 28px;
	}
	.bold {
		font-weight: 700;
		margin-top: 30px;
	}
`;
