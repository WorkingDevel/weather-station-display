import { SourceDaily } from "../../domain/source-json";

export interface StationDataState {
  daily: FetchData<SourceDaily> | null
}

export interface FetchData<T> {
  data: T,
  lastFetched: string
}
