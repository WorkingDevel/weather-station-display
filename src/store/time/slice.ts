
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TimeState } from './types'
import { toISO, toDate } from '../../utils/time'

export const timeSlice = createSlice({
  name: 'time',
  initialState: {
    displayTime: toISO(new Date())
  } as TimeState,
  reducers: {
    setStationTime: (state: TimeState, action: PayloadAction<string>) => {
      state.stationTime = toISO(toDate(action.payload))
    },
    setLocalTime: (state: TimeState, action: PayloadAction<string>) => {
      state.displayTime = toISO(toDate(action.payload))
    }
  }
})

export const { setStationTime, setLocalTime } = timeSlice.actions

export default timeSlice.reducer
