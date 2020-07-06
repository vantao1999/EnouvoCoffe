import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './AppRedux';
import authReducer from './UserRedux';
import transReducer from './TransactionRedux';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  trans: transReducer,
});

export default rootReducer;
