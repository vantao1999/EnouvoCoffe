import http from './http';

export async function login(data) {
  return http.post('/auth/login', data);
}

export async function register(data) {
  return http.post('/auth/register', data);
}

export async function forgotPasswordApi(data) {
  return http.post('/auth/forgotPassword', data);
}

export async function resetPasswordApi(data) {
  return http.post('/auth/confirmCode', data);
}

export async function uploadImageProfile(data) {
  return http.postUploadFile('/user/upload', data);
}

export async function accountBalance() {
  return http.get('/client/users/me/accountbalance');
}

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}

export async function updateProfile(data) {
  return http.put('/client/users/me/updateProfile', data);
}
//For admin
export async function getMany(data) {
  return http.get('/admin/users');
}
export async function createOne(data) {
  return http.post('admin/users', data);
}
export async function getOne(userId) {
  return http.get(`/admin/users/${userId}`);
}
export async function updateOne(userId, data) {
  return http.put(`/admin/users/${userId}`, data);
}
export async function disable(userId, data) {
  return http.put(`/admin/disable/${userId}`, data);
}
