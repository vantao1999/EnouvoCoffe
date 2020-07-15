import http from './http';

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}

export async function transferMoney(data) {
  return http.post('/client/users/me/transactions', data);
}
//get User history transferred
export async function getHistoryTransferIn() {
  return http.get('/client/users/me/transactions?filter={"type":"TRANSFER","status":"in"}');
}
export async function getHistoryTransferOut() {
  return http.get('/client/users/me/transactions?filter={"type":"TRANSFER","status":"out"}');
}
//get User history when admin did actions
export async function getHistoryTransactionIn() {
  return http.get('/client/users/me/transactions?filter={"type":"TRANSACTION","status":"in"}');
}

export async function getHistoryTransactionOut() {
  return http.get('/client/users/me/transactions?filter={"type":"TRANSACTION","status":"out"}');
}
/******************************************/
/************ Side Admin *************/
/******************************************/

export async function plusMoney(data) {
  return http.post('/admin/transactions', data);
}
export async function minusMoney(data) {
  return http.post('/admin/transactions', data);
}
export async function adminGetHistoryTransactionIn() {
  return http.get('/admin/transactions?filter={"type":"TRANSACTION","status":"in"}');
}
export async function adminGetHistoryTransactionOut() {
  return http.get('/admin/transactions?filter={"type":"TRANSACTION","status":"out"}');
}
