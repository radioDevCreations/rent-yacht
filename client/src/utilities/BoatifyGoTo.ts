import { BaseURL } from './BaseUrl';

const BoatifyGoTo = (to: string) => {
  if (to[0] != '/') return window.open(`${BaseURL}/${to}`, '_self');
  else return window.open(`${BaseURL}${to}`, '_self');
};

const BoatifyGoToInBlank = (to: string) => {
  if (to[0] != '/') return window.open(`${BaseURL}/${to}`, '_blank');
  else return window.open(`${BaseURL}${to}`, '_blank');
};

export {BoatifyGoTo, BoatifyGoToInBlank};
