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
