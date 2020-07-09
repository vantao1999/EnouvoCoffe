import http from './http';

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}

export async function transferMoney(userId, data) {
  return http.post(`/client/transactionTransfer/${userId}`, data);
}
//get User history transferred
export async function getHistoryTransferIn() {
  return http.get('/client/transactionIn/history');
}
export async function getHistoryTransferOut() {
  return http.get('/client/transactionOut/history');
}
//get User history when admin did actions
export async function getHistoryTransactionIn() {
  return http.get('/client/transactionTransfer/historyTransferIn');
}

export async function getHistoryTransactionOut() {
  return http.get('/client/transactionTransfer/historyTransferOut');
}
/******************************************/
/************ Side Admin *************/
/******************************************/

export async function plusMoney(userId, data) {
  return http.post(`/admin/transactions/changeMoney/${userId}?type=in`, data);
}
export async function minusMoney(userId, data) {
  return http.post(`/admin/transactions/changeMoney/${userId}?type=out`, data);
}
export async function adminGetHistoryTransactionIn() {
  return http.get('/admin/transactions?type=in');
}
export async function adminGetHistoryTransactionOut() {
  return http.get('/admin/transactions?type=out');
}
