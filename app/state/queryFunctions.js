import moment from 'moment';
import http from '../service/http';
import { APIS, LIST_PAGE_SIZE, TABLE_PAGE_SIZE } from '../utils/constants';
import { insertParams } from '../utils/helper';

const {
  LOGIN,
  FILE_UPLOAD,
  USERS,
  USER_TITLE,
  USERS_DELETE,
  LINKS,
  DELETE_LINK,
  QUOTE,
  BIRTHDAYS,
  ANNOUNCEMENT,
  GET_ANNOUNCEMENTS,
  ANNOUNCEMENT_DELETE,
  CEO_MESSAGE,
  EVENTS,
  BLOG,
  GOOGLE_LOGIN,
  CATEGORY,
  LOCATIONS,
  DEPARTMENTS,
  BANNER_IMAGE,
  WORK_ANNIVERSARY,
  DOCUMENTS,
  DOCUMENT_SORT_ORDER,
  DOCUMENT,
  RING_GROUP,
  JOB,
  APPLICANT,
  POLL,
  RESOURCE,
  VOTE,
  PROFIT_CENTER,
  GROUP,
  USERS_BULK_UPDATE,
} = APIS;

// USER CRUD

export const fetchUsers = ({ queryKey }) => {
  let url;
  const {
    sortColumn,
    sortOrder,
    pageNumber,
    pageSize,
    query,
    filters,
    detail,
  } = queryKey[1];
  if (query?.searchString) {
    url = `${USERS}?${insertParams(
      query
    )}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&isPagination=1&pageSize=${pageSize}&detail=${detail}`;
  } else if (filters) {
    url = `${USERS}?${insertParams(
      filters
    )}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&isPagination=1&pageSize=${pageSize}&detail=${detail}`;
  } else {
    url = `${USERS}?sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&isPagination=1&pageSize=${pageSize}&detail=${detail}`;
  }
  return http.get(url);
};

export const deleteUser = (payload) =>
  http.delete(USERS_DELETE, { data: { ids: payload } });

export const submitUser = async () => {};

export const uploadUsers = async () => {};

export const updateUser = (payload) => {
  const { id, updatedData } = payload;
  return http.put(`${USERS}/${id}`, updatedData);
};
export const bulkUserUpdate = (payload) =>
  http.put(`${USERS_BULK_UPDATE}`, payload);

export const getUserById = (id) => http.get(`${USERS}/${id}`);

export const getQuote = () => http.get(`${QUOTE}`);

export const getBirthdays = () => http.get(`${BIRTHDAYS}`);

export const saveQuote = (payload) => http.put(`${QUOTE}`, payload);

export const uploadEmployeeFile = (payload) => http.post(FILE_UPLOAD, payload);

export const createUser = (payload) => http.post(USERS, payload);

export const login = (payload) => http.post(LOGIN, payload);

export const googleLogin = (payload) => http.post(GOOGLE_LOGIN, payload);

// USEFUL LINKS CRUD

export const fetchLinks = () => http.get(`${LINKS}?isPagination=0&`);

export const createLink = (payload) => http.post(LINKS, payload);

export const getLinkById = (id) => http.get(`${LINKS}/${id}`);

export const updateLink = ({ id, ...payload }) =>
  http.put(`${LINKS}/${id}`, payload);

export const deleteLink = (payload) =>
  http.delete(DELETE_LINK, { data: { ids: payload } });
export const createAnnouncement = (payload) => http.post(ANNOUNCEMENT, payload);

export const retrieveActiveAnnouncements = () =>
  http.get(`${GET_ANNOUNCEMENTS}`);

export const retrieveAnnouncements = () =>
  http.get(`${ANNOUNCEMENT}?isPagination=0&`);

export const retrieveAnnouncementById = (id) =>
  http.get(`${ANNOUNCEMENT}/${id}`);

export const updateAnnouncement = (payload) =>
  http.put(`${ANNOUNCEMENT}/${payload.id}`, payload);

export const deleteAnnouncement = (payload) =>
  http.delete(ANNOUNCEMENT_DELETE, { data: { ids: payload } });

export const retrieveAnnouncement = () => http.get(`${GET_ANNOUNCEMENTS}`);

export const getCeoMessage = () => http.get(`${CEO_MESSAGE}`);

export const saveCeoMessage = (payload) => http.put(`${CEO_MESSAGE}`, payload);
// EVENTS CRUD

export const createEvent = (payload) => http.post(EVENTS, payload);

export const fetchEvents = ({ queryKey }) =>
  http.get(`${EVENTS}?isPagination=0&date=${queryKey[1].eventWindowDate}`);

export const deleteEvents = (payload) =>
  http.delete(EVENTS, { data: { ids: payload } });

export const getEventById = ({ queryKey }) =>
  http.get(`${EVENTS}/${queryKey[1]}`);

export const updateEvent = ({ id, ...payload }) =>
  http.put(`${EVENTS}/${id}`, payload);

// BLOG CRUD
export const getBlogs = ({ queryKey }) => {
  const url = `${BLOG}?sortColumn=id&sortOrder=desc&pageSize=${TABLE_PAGE_SIZE}&pageNumber=${queryKey[1]}&isPagination=1`;
  return http.get(url);
};
export const createBlog = (payload) => http.post(BLOG, payload);

export const updateBlog = (payload) => {
  const id = payload.get('id');
  payload.delete('id');
  return http.put(`${BLOG}/${id}`, payload);
};

export const getBlogById = ({ queryKey }) => http.get(`${BLOG}/${queryKey[1]}`);

export const deleteBlog = (payload) =>
  http.delete(BLOG, { data: { id: payload } });

export const getLinkCategory = () => http.get(`${CATEGORY}`);

export const getUsefulLinksByCategoryId = ({ queryKey }) =>
  http.get(`${LINKS}?isPagination=0&categoryId=${queryKey[1]}`);
// LINK CATEGORY CRUD
export const createLinkCategory = (payload) => http.post(CATEGORY, payload);

export const getLinkCategoryById = ({ queryKey }) =>
  http.get(`${CATEGORY}/${queryKey[1]}`);

export const updateLinkCategory = ({ id, ...payload }) =>
  http.put(`${CATEGORY}/${id}`, payload);

export const deleteLinkCategory = (id) => http.delete(`${CATEGORY}/${id}`);
export const getCategories = () => http.get(CATEGORY);

export const getLocations = () => http.get(`${LOCATIONS}?isPagination=0&`);

export const deleteLocation = (payload) =>
  http.delete(LOCATIONS, { data: { ids: payload } });

export const createLocation = (payload) => http.post(LOCATIONS, payload);

export const getLocationById = ({ queryKey }) =>
  http.get(`${LOCATIONS}/${queryKey[1]}`);

export const updateLocation = ({ id, ...payload }) =>
  http.put(`${LOCATIONS}/${id}`, payload);
export const getDepartments = () => http.get(`${DEPARTMENTS}?isPagination=0&`);

export const getBannerImage = () => http.get(BANNER_IMAGE);

export const updateBannerImage = (payload) => http.put(BANNER_IMAGE, payload);
export const deleteDepartment = (payload) =>
  http.delete(DEPARTMENTS, { data: { ids: payload } });

export const createDepartment = (payload) => http.post(DEPARTMENTS, payload);

export const getDepartmentById = ({ queryKey }) =>
  http.get(`${DEPARTMENTS}/${queryKey[1]}`);

export const updateDepartment = ({ id, ...payload }) =>
  http.put(`${DEPARTMENTS}/${id}`, payload);

export const getWorkAnniversaries = () => http.get(`${WORK_ANNIVERSARY}`);

export const getDepartmentDocuments = () => http.get(DOCUMENTS);

export const updateDocumentOrder = (payload) => {
  const { updatedData } = payload;
  return http.put(`${DOCUMENT_SORT_ORDER}`, updatedData);
};
export const createDocument = (payload) => http.post(DOCUMENT, payload);

export const updateDocument = (payload) => {
  const id = payload.get('id');
  payload.delete('id');
  payload.delete('url');
  return http.put(`${DOCUMENT}/${id}`, payload);
};

export const getDocumentById = ({ queryKey }) =>
  http.get(`${DOCUMENT}/${queryKey[1]}`);

export const deleteDocument = (payload) =>
  http.delete(DOCUMENTS, { data: { ids: payload } });
export const createRingGroup = (payload) => http.post(RING_GROUP, payload);

export const updateRingGroup = ({ id, ...payload }) =>
  http.put(`${RING_GROUP}/${id}`, payload);
export const getRingGroupById = ({ queryKey }) =>
  http.get(`${RING_GROUP}/${queryKey[1]}`);
export const getRingGroups = ({ queryKey }) => {
  let url = `${RING_GROUP}?isPagination=0&`;
  const { query, filters } = queryKey[1];
  if (query.searchString) {
    url = `${RING_GROUP}?isPagination=0&${insertParams(query)}`;
  } else if (filters) {
    url = `${RING_GROUP}?isPagination=0&${insertParams(filters)}`;
  }
  return http.get(url);
};

export const deleteRingGroup = (payload) =>
  http.delete(RING_GROUP, { data: { ids: payload } });

export const getJobs = ({ queryKey }) => {
  let url = `${JOB}?isPagination=0&`;
  const { query, filters } = queryKey[1];
  if (query.searchString) {
    url = `${JOB}?isPagination=0&${insertParams(query)}`;
  } else if (filters) {
    url = `${JOB}?isPagination=0&${insertParams(filters)}`;
  }
  return http.get(url);
};

export const deleteJob = (payload) =>
  http.delete(JOB, { data: { ids: payload } });

export const createApplicant = (payload) => http.post(APPLICANT, payload);

export const getApplicants = ({ queryKey }) =>
  http.get(`${APPLICANT}?jobId=${queryKey[1]}`);

export const getJobById = ({ queryKey }) => http.get(`${JOB}/${queryKey[1]}`);

export const createJob = (payload) => http.post(JOB, payload);

export const updateJob = ({ id, ...payload }) =>
  http.put(`${JOB}/${id}`, payload);

export const getPolls = ({ queryKey }) => {
  const { date, currentPage, query, filters } = queryKey[1];
  let url = `${POLL}?date=${date}&sortColumn=id&sortOrder=desc&pageSize=${LIST_PAGE_SIZE}&pageNumber=${currentPage}&isPagination=1`;
  if (query.searchString) {
    url = `${POLL}?date=${date}&sortColumn=id&sortOrder=desc&pageSize=${LIST_PAGE_SIZE}&pageNumber=${currentPage}&isPagination=1&${insertParams(
      query
    )}`;
  } else if (filters) {
    url = `${POLL}?date=${date}&sortColumn=id&sortOrder=desc&pageSize=${LIST_PAGE_SIZE}&pageNumber=${currentPage}&isPagination=1&${insertParams(
      filters
    )}`;
  }
  return http.get(url);
};
export const createPolls = ({ date, ...payload }) =>
  http.post(`${POLL}?date=${date}`, payload);

export const updatePoll = ({ id, date, ...payload }) =>
  http.put(`${POLL}?id=${id}&date=${date}`, payload);

export const getPollById = ({ queryKey }) => {
  const date = moment(new Date()).format('MM-DD-YYYY');
  return http.get(`${POLL}/${queryKey[1]}/${date}`);
};
export const deletePoll = (payload) =>
  http.delete(POLL, { data: { ids: payload } });

export const vote = ({ date, ...payload }) =>
  http.post(`${VOTE}?date=${date}`, payload);

export const createProfitCenter = (payload) =>
  http.post(PROFIT_CENTER, payload);

export const getProfitCenterById = ({ queryKey }) =>
  http.get(`${PROFIT_CENTER}/${queryKey[1]}`);

export const updateProfitCenter = ({ id, ...payload }) =>
  http.put(`${PROFIT_CENTER}/${id}`, payload);

export const getProfitCenters = ({ queryKey }) => {
  let url = `${PROFIT_CENTER}?isPagination=0&`;
  const { query } = queryKey[1];
  if (query?.searchString) {
    url = `${PROFIT_CENTER}?isPagination=0&${insertParams(query)}`;
  }
  return http.get(url);
};

export const deleteProfitCenter = (payload) =>
  http.delete(PROFIT_CENTER, { data: { ids: payload } });

export const getUserTitles = () => {
  const url = `${USER_TITLE}`;
  return http.get(url);
};
export const getResources = ({ queryKey }) => {
  let url;
  const filters = queryKey[1];
  if (filters) {
    url = `${RESOURCE}?${insertParams(filters)}`;
  } else {
    url = RESOURCE;
  }
  return http.get(url);
};

export const createGroup = (payload) => http.post(GROUP, payload);

export const getGroupById = ({ queryKey }) =>
  http.get(`${GROUP}/${queryKey[1]}`);

export const updateGroup = ({ id, ...payload }) =>
  http.put(`${GROUP}/${id}`, payload);

export const getUsersByGroupId = ({ queryKey }) =>
  http.get(`${GROUP}/${queryKey[1]}/users`);
export const getGroups = ({ queryKey }) => {
  let url;
  const filters = queryKey[1];
  if (filters) {
    url = `${GROUP}?${insertParams(filters)}`;
  } else {
    url = `${GROUP}?isPagination=0&`;
  }
  return http.get(url);
};

export const deleteGroup = (payload) =>
  http.delete(GROUP, { data: { ids: payload } });
