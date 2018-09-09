import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from "./auth";
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';

export function* watchAuth() {
  // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
  // Above yields can be achieved also as follows.
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
  // We can use takeLatest instead takeEvery, but in takeLatest it will cancel all current actions and continue with the latest.
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

