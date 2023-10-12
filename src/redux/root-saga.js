import { all } from 'redux-saga/effects';
import authSaga from '@iso/redux/auth/saga';
import accountSaga from '@iso/redux/account/saga';
import commonSaga from '@iso/redux/common/saga';
import userSaga from '@iso/redux/users/saga';
import roleSaga from '@iso/redux/roles/saga';
import careerSaga from '@iso/redux/careers/saga';
import learnerSaga from '@iso/redux/learners/saga';
import dashboardSaga from '@iso/redux/dashboard/saga';
import treeSiteSaga from '@iso/redux/treeSite/saga';
import FAQSagas from '@iso/redux/FAQs/saga';
import treeTypeSaga from '@iso/redux/treeType/saga';
import treeJourneySaga from '@iso/redux/treeJourney/saga';
import staticImageSaga from '@iso/redux/staticImage/saga';
import treeSaga from '@iso/redux/tree/saga';
import greenNewsSaga from '@iso/redux/greenNews/saga';
import QnA from '@iso/redux/QnA/saga';
import treeSiteStorySaga from '@iso/redux/treeSiteStory/saga';
import treeSiteHistorySaga from '@iso/redux/treeSiteHistory/saga';
import giftSaga from '@iso/redux/gift/saga';
import campaignSaga from '@iso/redux/campaign/saga';
import pgSaga from '@iso/redux/pg/saga';
import campaignDurationSaga from '@iso/redux/campaignDuration/saga';
import historyRotationSaga from '@iso/redux/historyRotation/saga';
import videoSaga from '@iso/redux/video/saga';
import treePGHistorySaga from '@iso/redux/treePGHistory/saga';
import questionGroupSaga from '@iso/redux/questionGroup/saga';
import historiesQuizGameSaga from '@iso/redux/historiesQuizGame/saga';
export default function* rootSaga(getState) {
	yield all([
		authSaga(),
		accountSaga(),
		commonSaga(),
		userSaga(),
		roleSaga(),
		careerSaga(),
		learnerSaga(),
		dashboardSaga(),
		FAQSagas(),
		treeSiteSaga(),
		treeTypeSaga(),
		QnA(),
		treeSaga(),
		treeJourneySaga(),
		staticImageSaga(),
		greenNewsSaga(),
		treeSiteStorySaga(),
		treeSiteHistorySaga(),
		giftSaga(),
		campaignSaga(),
		campaignDurationSaga(),
		pgSaga(),
		historyRotationSaga(),
		videoSaga(),
		treePGHistorySaga(),
		questionGroupSaga(),
		historiesQuizGameSaga()
	]);
}
