import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getStaticImageTrial = (body) => {
  const url = `${ApiRouters.MANAGEMENT_IMAGE_TRIAL}`;
  return api.get(url, body);
};

const getStaticImageTrialPortal = (body) => {
  const url = `${ApiRouters.MANAGEMENT_IMAGE_TRIAL_PORTAL}`;
  return api.get(url, body);
};

const updateStaticImageTrial = (body) => {
  const url = `${ApiRouters.MANAGEMENT_IMAGE_TRIAL}`;
  return api.put(url, body);
};

const getImgPartners = (body) => {
  const url = `${ApiRouters.MANAGEMENT_IMAGE_PARTNERS}`;
  return api.get(url, body);
};

const getImgPartnersPortal = (body) => {
  const url = `${ApiRouters.MANAGEMENT_IMAGE_PARTNERS_PORTAL}`;
  return api.get(url, body);
};

const updateImgPartners = (body) => {
  const url = `${ApiRouters.MANAGEMENT_IMAGE_PARTNERS}`;
  return api.put(url, body);
};

const switchSetupBanner = () => {
  const url = `${ApiRouters.SWITCH_SETUP_BANNER}`;
  return api.post(url);
}


const staticImageTrialService = {
  getStaticImageTrial,
  getStaticImageTrialPortal,
  updateStaticImageTrial,
  getImgPartners,
  getImgPartnersPortal,
  updateImgPartners,
  switchSetupBanner
};

export default staticImageTrialService;
