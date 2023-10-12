import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import Account from '@iso/redux/account/reducer';
import Common from '@iso/redux/common/reducer';
import User from '@iso/redux/users/reducer';
import Role from '@iso/redux/roles/reducer';
import Career from '@iso/redux/careers/reducer';
import Learner from '@iso/redux/learners/reducer';
import Dashboard from '@iso/redux/dashboard/reducer';
import FAQ from '@iso/redux/FAQs/reducer';
import Config from '@iso/redux/configs/reducer';
import TreeSite from '@iso/redux/treeSite/reducer';
import TreeJourney from '@iso/redux/treeJourney/reducer';
import TreeType from '@iso/redux/treeType/reducer';
import Tree from '@iso/redux/tree/reducer';
import StaticImage from '@iso/redux/staticImage/reducer';
import GreenNews from '@iso/redux/greenNews/reducer';

import TreeSiteStory from '@iso/redux/treeSiteStory/reducer';
import TreeSiteHistory from '@iso/redux/treeSiteHistory/reducer';

import Gift from '@iso/redux/gift/reducer';
import Campaign from '@iso/redux/campaign/reducer';
import PG from '@iso/redux/pg/reducer';
import CampaignDuration from '@iso/redux/campaignDuration/reducer';
import HistoryRotation from '@iso/redux/historyRotation/reducer';
import TreePGHistory from '@iso/redux/treePGHistory/reducer';
// QnA
import QnA from '@iso/redux/QnA/reducer';
import Video from '@iso/redux/video/reducer';

import QuestionGroup from '@iso/redux/questionGroup/reducer';
import HistoriesQuizGame from '@iso/redux/historiesQuizGame/reducer';
export default combineReducers({
	Auth,
	App,
	ThemeSwitcher,
	LanguageSwitcher,
	Account,
	Common,
	User,
	Role,
	Career,
	Learner,
	Dashboard,
	FAQ,
	Config,
	TreeSite,
	QnA,
	TreeType,
	Tree,
	GreenNews,
	TreeJourney,
	StaticImage,
	TreeSiteStory,
	TreeSiteHistory,
	Gift,
	Campaign,
	CampaignDuration,
	PG,
	HistoryRotation,
	Video,
	TreePGHistory,
	QuestionGroup,
	HistoriesQuizGame
});
