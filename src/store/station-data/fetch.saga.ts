import { call, put, takeLatest } from 'redux-saga/effects'
import { ENV_VARS } from '../../utils/env';
import { setStationDailyData, yieldStationDataFailed } from './slice';
import { ActionID } from '../actions';
import { fetchDailyData } from '../../services/StationApi';
import { toISO } from '../../utils/time';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchStationData(): any {
  try {
    console.log("START fetch")
    const sourceDailyData = yield call(fetchDailyData, ENV_VARS.SOURCE_URL);
    console.log("FETCHED",sourceDailyData);
    yield put(
      setStationDailyData({
        data: sourceDailyData,
        lastFetched: toISO(new Date())
      }));
  } catch (e) {
    yield put(yieldStationDataFailed());
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* watchRequestStationDataSaga() {
  yield takeLatest(ActionID.FETCH_STATION_DATA_REQUEST, fetchStationData);
}

export default watchRequestStationDataSaga;
