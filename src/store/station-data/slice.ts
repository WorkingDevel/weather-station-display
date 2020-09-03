import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StationDataState, FetchData } from "./types"
import { SourceDaily } from "../../domain/source-json"

export const stationDataSlice = createSlice({
  name: 'time',
  initialState: {
    daily: null
  } as StationDataState,
  reducers: {
    setStationDailyData: (state: StationDataState, action: PayloadAction<FetchData<SourceDaily>>) => {
      state.daily = action.payload
    },
    yieldStationDataFailed: (state:StationDataState) => {
      state.daily = null;
    }
  }
})

export const { setStationDailyData, yieldStationDataFailed } = stationDataSlice.actions

export default stationDataSlice.reducer
