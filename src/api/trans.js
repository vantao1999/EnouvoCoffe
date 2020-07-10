import http from './http';

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}

export async function transferMoney(userId, data) {
  return http.post(`/client/users/me/transactionTransfer/${userId}`, data);
}
//get User history transferred
export async function getHistoryTransferIn() {
  return http.get('/client/users/me/transactionTransfer?type=in');
}
export async function getHistoryTransferOut() {
  return http.get('/client/users/me/transactionTransfer?type=out');
}
//get User history when admin did actions
export async function getHistoryTransactionIn() {
  return http.get('/client/users/me/transactions?type=in');
}

export async function getHistoryTransactionOut() {
  return http.get('/client/users/me/transactions?type=out');
}
/******************************************/
/************ Side Admin *************/
/******************************************/

export async function plusMoney(userId, data) {
  return http.post(`/admin/transactions/${userId}?type=in`, data);
}
export async function minusMoney(userId, data) {
  return http.post(`/admin/transactions/${userId}?type=out`, data);
}
export async function adminGetHistoryTransactionIn() {
  return http.get('/admin/transactions?type=in');
}
export async function adminGetHistoryTransactionOut() {
  return http.get('/admin/transactions?type=out');
}
