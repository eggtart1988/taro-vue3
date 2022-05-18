
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

export const CONSTANTS = {
  SESSION_KEY: 'token_session',
  SESSION_USERINFO_KEY: 'user_info_session',
  SESSION_USERID_KEY: 'user_id_session',
  SESSION_USERLOCATION_KEY: 'user_location_session',
  SESSION_AREA_KEY: 'area_session',
  SESSION_SERVER_KEY: 'server_session',
  SESSION_SUBJECT_KEY: 'subject_session',
  SESSION_CARKIND_KEY: 'carkind_session',
  HEADER_AUTH: 'Authorization',
  CONTENT_TYPE: 'content-type',
  CONTENT_TYPE_VALUE: 'application/json; charset=utf-8',
  STORAGE_BUSINESS_INFO: 'corporate_business_info',
  STORAGE_SETTLED_REALNAME: 'settled_real_name',
  STORAGE_SETTLED_INFO: 'settled_all_info',
  STORAGE_SCENE: 'scene_code',
  CONTENT_LOGIN_SCENE: 'login_code'
}