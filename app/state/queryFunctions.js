import http from '../service/http';
import { APIS, PAGE_SIZE } from '../utils/constants';
import { insertParams } from '../utils/helper';

const {
  LOGIN,
  FILE_UPLOAD,
  USERS,
  USERS_LIST,
  USERS_DELETE,
  RETRIEVE_LINKS,
  CREATE_LINK,
  GET_LINK,
  UPDATE_LINK,
  DELETE_LINK,
  QUOTE,
  BIRTHDAYS,
  ANNOUNCEMENT,
  GET_ANNOUNCEMENTS,
  ANNOUNCEMENT_DELETE,
  CEO_MESSAGE,
  CREATE_EVENT,
  EVENTS,
  DELETE_EVENTS,
  GET_EVENT,
  UPDATE_EVENTS,
  BLOG,
  GET_BLOG,
  DELETE_BLOG,
  CREATE_BLOG,
  UPDATE_BLOG,
  GOOGLE_LOGIN,
  CATEGORY,
  GET_USEFUL_LINKS,
  CREATE_LINK_CATEGORY,
  GET_LINK_CATEGORY,
  UPDATE_LINK_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  LOCATIONS,
  CREATE_LOCATION,
  GET_LOCATION,
  UPDATE_LOCATION,
  DEPARTMENTS,
  GET_BANNER_IMAGE,
  UPDATE_BANNER_IMAGE,
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
  } = queryKey[1];
  if (query.searchString) {
    url = `${USERS_LIST}?${insertParams(
      query
    )}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  } else if (filters) {
    url = `${USERS_LIST}?${insertParams(
      filters
    )}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  } else {
    url = `${USERS_LIST}?sortColumn=${sortColumn}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
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

export const getUserById = (id) => http.get(`${USERS}/${id}`);

export const getQuote = () => http.get(`${QUOTE}`);

export const getBirthdays = () => http.get(`${BIRTHDAYS}`);

export const saveQuote = (payload) => http.put(`${QUOTE}`, payload);

export const uploadEmployeeFile = (payload) => http.post(FILE_UPLOAD, payload);

export const createUser = (payload) => http.post(USERS, payload);

export const login = (payload) => http.post(LOGIN, payload);

export const googleLogin = (payload) => http.post(GOOGLE_LOGIN, payload);

// USEFUL LINKS CRUD

export const fetchLinks = () => http.get(`${RETRIEVE_LINKS}?pageSize=1000&`);

export const createLink = (payload) => http.post(CREATE_LINK, payload);

export const getLinkById = (id) => http.get(`${GET_LINK}/${id}`);

export const updateLink = ({ id, ...payload }) =>
  http.put(`${UPDATE_LINK}/${id}`, payload);

export const deleteLink = (payload) =>
  http.delete(DELETE_LINK, { data: { ids: payload } });
export const createAnnouncement = (payload) => http.post(ANNOUNCEMENT, payload);

export const retrieveActiveAnnouncements = () =>
  http.get(`${GET_ANNOUNCEMENTS}`);

export const retrieveAnnouncements = () =>
  http.get(`${ANNOUNCEMENT}?pageSize=1000&`);

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

export const createEvent = (payload) => http.post(CREATE_EVENT, payload);

export const fetchEvents = () => http.get(`${EVENTS}?pageSize=1000&`);

export const deleteEvents = (payload) =>
  http.delete(DELETE_EVENTS, { data: { ids: payload } });

export const getEventById = ({ queryKey }) =>
  http.get(`${GET_EVENT}/${queryKey[1]}`);

export const updateEvent = ({ id, ...payload }) =>
  http.put(`${UPDATE_EVENTS}/${id}`, payload);

// BLOG CRUD
export const getBlogs = ({ queryKey }) => {
  const url = `${BLOG}?sortColumn=updatedAt&sortOrder=desc&pageSize=${PAGE_SIZE}&pageNumber=${queryKey[1]}`;
  return http.get(url);
};
export const createBlog = (payload) => http.post(CREATE_BLOG, payload);

export const updateBlog = (payload) => {
  const id = payload.get('id');
  payload.delete('id');
  return http.put(`${UPDATE_BLOG}/${id}`, payload);
};

export const getBlogById = ({ queryKey }) =>
  http.get(`${GET_BLOG}/${queryKey[1]}`);

export const deleteBlog = (payload) =>
  http.delete(DELETE_BLOG, { data: { id: payload } });

export const getLinkCategory = () => http.get(`${CATEGORY}`);

export const getUsefulLinksByCategoryId = ({ queryKey }) =>
  http.get(`${GET_USEFUL_LINKS}?pageSize=1000&categoryId=${queryKey[1]}`);
// LINK CATEGORY CRUD
export const createLinkCategory = (payload) =>
  http.post(CREATE_LINK_CATEGORY, payload);

export const getLinkCategoryById = ({ queryKey }) =>
  http.get(`${GET_LINK_CATEGORY}/${queryKey[1]}`);

export const updateLinkCategory = ({ id, ...payload }) =>
  http.put(`${UPDATE_LINK_CATEGORY}/${id}`, payload);

export const deleteLinkCategory = (id) => {
  http.delete(`${DELETE_CATEGORY}/${id}`);
};
export const getCategories = () => http.get(GET_CATEGORIES);

export const getLocations = () => http.get(`${LOCATIONS}?pageSize=1000&`);

export const deleteLocation = (payload) =>
  http.delete(LOCATIONS, { data: { ids: payload } });

export const createLocation = (payload) => http.post(CREATE_LOCATION, payload);

export const getLocationById = ({ queryKey }) =>
  http.get(`${GET_LOCATION}/${queryKey[1]}`);

export const updateLocation = ({ id, ...payload }) =>
  http.put(`${UPDATE_LOCATION}/${id}`, payload);
export const getDepartments = () => http.get(`${DEPARTMENTS}?pageSize=1000&`);

export const getBannerImage = () => http.get(GET_BANNER_IMAGE);

export const updateBannerImage = (payload) =>
  http.put(UPDATE_BANNER_IMAGE, payload);
