import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { timeSlice } from './time/slice'
import watchRequestStationDataSaga from './station-data/fetch.saga'
import { stationDataSlice } from './station-data/slice'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    time: timeSlice.reducer,
    stationData: stationDataSlice.reducer
  },
  middleware: [sagaMiddleware, ...getDefaultMiddleware()]
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export const useRootDispatch = () => useDispatch<RootDispatch>() // Export a hook that can be reused to resolve types

// then run the saga
sagaMiddleware.run(watchRequestStationDataSaga)

export default store
