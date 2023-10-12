const baseRouter = '/api/';
const staticPages = 'StaticPages/';
const speaking = 'Speakings/';
const listening = 'Listenings/';
const writing = 'Writings/';
const reading = 'Readings/';
const learningTests = 'LearningTests/';
const treeManagements = 'TreeManagements/';
const staticPage = 'StaticPages/';

export const ApiRouters = {
  LOGIN: baseRouter + 'Auth/PortalLogin',
  FORGOT_PASSWORD: baseRouter + 'Auth/ForgotPassword',
  CHECK_TOKEN_RESET_PW: baseRouter + 'Auth/CheckResetPassword',
  RESET_PASSWORD: baseRouter + 'Auth/ResetPassword',

  ACCOUNT: baseRouter + 'Account',
  USER_LOGIN_PROFILE: baseRouter + 'Account/Profile',
  CHANGE_PASSWORD: baseRouter + 'Account/ChangePassword',

  CUSTOMER: baseRouter + 'Customers',
  CUSTOMER_TYPE: baseRouter + 'CustomerTypes',
  USER: baseRouter + 'Users',
  COMMON: baseRouter + 'Commons',
  ROLE: baseRouter + 'Groups',
  CAREER: baseRouter + 'Careers',
  SUBCRIPTIONPACKAGE: baseRouter + 'SubcriptionPackages',
  TOPIC: baseRouter + 'Topics',
  SENTENCE: baseRouter + 'Sentences',
  SENTENCEVOCAKEY: baseRouter + 'SentenceVocakeys',
  LEARNER: baseRouter + 'Learners',
  GRAMMARDESCRIPTION: baseRouter + 'GrammarDescriptions',
  STATICPAGE: baseRouter + 'StaticPages',
  SETTING: baseRouter + 'Settings',
  REPORT: baseRouter + 'Reports',
  IMPORT: baseRouter + 'Import',
  EXPORT: baseRouter + 'Export',
  NOTIFICATION: baseRouter + 'Notification',
  LEARNINGPROCESS: baseRouter + 'LearningProcess',
  DASHBOARD: baseRouter + 'Dashboard',
  DASHBOARD_BO: baseRouter + 'Dashboard/DashbroadBO',
  HOMEPAGE: baseRouter + 'HomePages',
  SUBSCRIPTIONREQUEST: baseRouter + 'LearnerSubscriptions',
  SUBSCRIPTIONTEACHERREQUEST: baseRouter + 'TeacherSubscriptions',
  TEACHER: baseRouter + 'Teachers',
  LEVEL: baseRouter + 'Levels',
  CLASS: baseRouter + 'Class',

  FAQs: baseRouter + staticPages + 'FrequentlyAskedQuestion',

  //TreeSite
  MANAGEMENTS_TREE_SITE: baseRouter + treeManagements + 'TreePlantingSite',

  //Tree Type
  MANAGEMENTS_TREE_TYPE: baseRouter + treeManagements + 'TreeType',

  //Tree Journey
  MANAGEMENTS_TREE_JOURNEY: baseRouter + treeManagements + 'TreeGrouwthJourney',

  //Tree Management
  MANAGEMENTS_TREE: baseRouter + treeManagements + 'Tree',
  GET_SITE_AND_TYPE: baseRouter + treeManagements + 'Tree/GetAllTreePlantingSiteAndTreeType',

  //Banner
  MANAGEMENT_IMAGE_TRIAL: baseRouter + staticPage + 'ImageTrial',
  MANAGEMENT_IMAGE_TRIAL_PORTAL: baseRouter + staticPage + 'ImageTrialPortal',

  // Partners Logo
  MANAGEMENT_IMAGE_PARTNERS: baseRouter + staticPage + 'ImagesLogo',
  MANAGEMENT_IMAGE_PARTNERS_PORTAL: baseRouter + staticPage + 'ImagesLogoPortal',

  //News
  MANAGEMENT_GREEN_NEWS: baseRouter + treeManagements + 'GreenNewsletterManagement',
  MANAGEMENT_TREE_SITE_STORY: baseRouter + treeManagements + 'TreePlantingSiteStory',
  //News
  MANAGEMENT_GREEN_NEWS: baseRouter + treeManagements + 'GreenNewsletterManagement',
  MANAGEMENT_TREE_SITE_STORY: baseRouter + treeManagements + 'TreePlantingSiteStory',

  MANAGEMENT_TREE_SITE_HISTORY: baseRouter + treeManagements + 'TreePlantingSiteHystory',

  // TreeHistory
  UPDATE_TREE_HISTORY: baseRouter + treeManagements + 'TreeHistory',

  //Gift
  MANAGEMENT_GIFT: baseRouter + treeManagements + 'Gift',
  //Campaign
  MANAGEMENT_CAMPAIGN: baseRouter + treeManagements + 'Campaign',
  //CampaignDuration
  MANAGEMENT_CAMPAIGN_DURATION: baseRouter + treeManagements + 'CampaignDuration',
  //History Rotation
  MANAGE_HISTORY_ROTATION: baseRouter + treeManagements + 'HistoryRotaionLuckOfCampaign',
  
  //QuestionGroup
  MANAGEMENT_QUESTION_GROUP: baseRouter + 'QuestionGroups',
  
  //Manage PG
  MANAGE_PG: baseRouter + treeManagements + 'PromotionGirl',
  IMPORT_PG: baseRouter + treeManagements + 'ImportPG',
  VIDEO: baseRouter + treeManagements + 'Video',
  GET_TREE_SHARE: baseRouter + treeManagements + 'Tree/ReportTreeShare',
  GET_TREE_SHARE_ALL: baseRouter + treeManagements + 'ReportTreeAll',
  GET_TREE_PG_HISTORY: baseRouter + treeManagements + 'TreePGHistory',


  SWITCH_SETUP_BANNER: baseRouter + staticPage + 'ChangeSetUpBanner'
};
