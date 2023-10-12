const actions = {
  GET_STATIC_IMAGE_TRIAL: 'GET_STATIC_IMAGE_TRIAL',
  GET_STATIC_IMAGE_TRIAL_SUCCESS: 'GET_STATIC_IMAGE_TRIAL_SUCCESS',
  GET_STATIC_IMAGE_TRIAL_ERROR: 'GET_STATIC_IMAGE_TRIAL_ERROR',

  GET_STATIC_IMAGE_TRIAL_PORTAL: 'GET_STATIC_IMAGE_TRIAL_PORTAL',
  GET_STATIC_IMAGE_TRIAL_PORTAL_SUCCESS: 'GET_STATIC_IMAGE_TRIAL_PORTAL_SUCCESS',
  GET_STATIC_IMAGE_TRIAL_PORTAL_ERROR: 'GET_TREE_SITE_DETAIL_ERROR',

  UPDATE_STATIC_IMAGE_TRIAL: 'UPDATE_STATIC_IMAGE_TRIAL',
  SWITCH_SETUP_BANNER: 'SWITCH_SETUP_BANNER',

  // Partners
  GET_IMG_PARTNERS: 'GET_IMG_PARTNERS',
  GET_IMG_PARTNERS_SUCCESS: 'GET_IMG_PARTNERS_SUCCESS',
  GET_IMG_PARTNERS_ERROR: 'GET_IMG_PARTNERS_ERROR',

  GET_IMG_PARTNERS_PORTAL: 'GET_IMG_PARTNERS_PORTAL',
  GET_IMG_PARTNERS_PORTAL_SUCCESS: 'GET_IMG_PARTNERS_PORTAL_SUCCESS',
  GET_IMG_PARTNERS_PORTAL_ERROR: 'GET_IMG_PARTNERS_PORTAL_ERROR',

  UPDATE_IMG_PARTNERS: 'UPDATE_IMG_PARTNERS',

  //#region CRUD

  getStaticImageTrial: (body) => ({
    type: actions.GET_STATIC_IMAGE_TRIAL,
    body,
  }),

  getStaticImageTrialPortal: (body) => ({
    type: actions.GET_STATIC_IMAGE_TRIAL_PORTAL,
    body,
  }),
  updateImageTrial: (body, cbSuccess, cbError) => ({
    type: actions.UPDATE_STATIC_IMAGE_TRIAL,
    body,
    cbSuccess,
    cbError,
  }),

  // Partners
  getImgPartners: (body) => ({
    type: actions.GET_IMG_PARTNERS,
    body,
  }),

  getImgPartnersPortal: (body) => ({
    type: actions.GET_IMG_PARTNERS_PORTAL,
    body,
  }),

  updateImgPartners: (body, cbSuccess, cbError) => ({
    type: actions.UPDATE_IMG_PARTNERS,
    body,
    cbSuccess,
    cbError,
  }),

  switchSetupBanner: (cbSuccess, cbError) => ({
    type: actions.SWITCH_SETUP_BANNER,
    cbSuccess,
    cbError,
  })
};

export default actions;
