import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
	{
		path: '',
		component: lazy(() => import('./DashboardHomePage')),
		exact: true,
	},

	//#region
	{
		path: 'my-profile',
		component: lazy(() => import('@iso/containers/Profile/Profile')),
	},
	{
		path: 'change-password',
		component: lazy(() => import('@iso/containers/Profile/ChangePassword/ChangePassword')),
	},
	{
		path: 'users',
		component: lazy(() => import('@iso/containers/UserMng/UserMngList/UserMngList')),
		exact: true,
	},
	{
		path: 'users/:id',
		component: lazy(() => import('@iso/containers/UserMng/UserMngUpdate/UserMngUpdate')),
	},
	// {
	//   path: 'roles',
	//   component: lazy(() => import('@iso/containers/RoleMng/RoleMngList/RoleMngList')),
	//   exact: true,
	// },
	// {
	//   path: 'roles/:id',
	//   component: lazy(() => import('@iso/containers/RoleMng/RoleMngUpdate/RoleMngUpdate')),
	// },
	{
		path: 'tree-site',
		component: lazy(() => import('@iso/containers/TreeSite')),
		exact: true,
	},
	{
		path: 'tree-site/:id',
		component: lazy(() => import('@iso/containers/TreeSite/TreeSiteDetail')),
		exact: true,
	},
	{
		path: 'trees',
		component: lazy(() => import('@iso/containers/Trees')),
		exact: true,
	},
	{
		path: 'trees/:id',
		component: lazy(() => import('@iso/containers/Trees/TreeDetail')),
		exact: true,
	},

	{
		path: 'tree-type',
		component: lazy(() => import('@iso/containers/TreeType')),
		exact: true,
	},

	{
		path: 'tree-site/story/:id',
		component: lazy(() => import('@iso/containers/TreeSiteStory')),
		exact: true,
	},
	{
		path: 'tree-site/history/:id',
		component: lazy(() => import('@iso/containers/TreeSiteHistory')),
		exact: true,
	},

	{
		path: 'banners',
		component: lazy(() => import('@iso/containers/Banner')),
		exact: true,
	},
	{
		path: 'partners',
		component: lazy(() => import('@iso/containers/Partners')),
		exact: true,
	},
	{
		path: 'green-news',
		component: lazy(() => import('@iso/containers/GreenNews')),
		exact: true,
	},

	{
		path: 'gift',
		component: lazy(() => import('@iso/containers/Gift')),
		exact: true,
	},
	{
		path: 'gift/:id',
		component: lazy(() => import('@iso/containers/Gift')),
		exact: true,
	},
	{
		path: 'campaign',
		component: lazy(() => import('@iso/containers/Campaign')),
		exact: true,
	},
	{
		path: 'campaign/:id/duration',
		component: lazy(() => import('@iso/containers/Campaign/CampaignDetail')),
		exact: true,
	},
	{
		path: 'campaign/duration/:id',
		component: lazy(() => import('@iso/containers/CampaignDuration')),
		exact: true,
	},
	{
		path: 'history-rotation',
		component: lazy(() => import('@iso/containers/HistoryRotation')),
		exact: true,
	},
	{
		path: 'pg',
		component: lazy(() => import('@iso/containers/PromotionGirl')),
		exact: true,
	},
	{
		path: 'video',
		component: lazy(() => import('@iso/containers/Video')),
		exact: true,
	},
	{
		path: 'login-history',
		component: lazy(() => import('@iso/containers/LoginHistory')),
		exact: true,
	},
	{
		path: 'question-group',
		component: lazy(() => import('@iso/containers/QuestionGroup')),
		exact: true,
	},
	{
		path: 'question-group/:id',
		component: lazy(() => import('@iso/containers/QuestionGroup/QuestionGroupEdit')),
		exact: true,
	},
	{
		path: 'histories-quiz-game',
		component: lazy(() => import('@iso/containers/HistoriesQuizGame')),
		exact: true,
	}
	//#endregion
];

export default function AppRouter() {
	const { url } = useRouteMatch();
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				{routes.map((route, idx) => (
					<Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
						<route.component />
					</Route>
				))}
				<Redirect to="/404" />
			</Switch>
		</Suspense>
	);
}
