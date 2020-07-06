import http from './http';

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}

export async function transferMoney(userId, data) {
  return http.post(`/user/transaction/transactionTransfer/${userId}`, data);
}
//get User history transferred
export async function getHistoryTransferIn() {
  return http.get('/user/transaction/historyTransferIn');
}
export async function getHistoryTransferOut() {
  return http.get('/user/transaction/historyTransferOut');
}
//get User history when admin did actions
export async function getHistoryTransactionIn() {
  return http.get('/user/transaction/historyTransactionIn');
}

export async function getHistoryTransactionOut() {
  return http.get('/user/transaction/historyTransactionOut');
}
/******************************************/
/************ Side Admin *************/
/******************************************/

export async function plusMoney(userId, data) {
  return http.post(`/admin/transaction/plusMoney/${userId}`, data);
}
export async function minusMoney(userId, data) {
  return http.post(`/admin/transaction/minusMoney/${userId}`, data);
}
export async function adminGetHistoryTransactionIn() {
  return http.get('/admin/transaction/historyTransactionIn');
}
export async function adminGetHistoryTransactionOut() {
  return http.get('/admin/transaction/historyTransactionOut');
}
