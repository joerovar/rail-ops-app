// src/config.js
const API_HOSTNAME = "https://bus-control-backend-w2rgrlldoq-uc.a.run.app";
// todo old hostname: https://bus-control-web-demo.ue.r.appspot.com

const API_URLS = {
  ALL_RAIL: `${API_HOSTNAME}/headway/all`,
  PUSH_RAIL: `${API_HOSTNAME}/push`,
};

export default API_URLS;
