// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface SourceDaily {
  location: string;
  time: string;
  lat: string;
  lon: string;
  alt: string;
  hardware: string;
  uptime: string;
  serverUptime: string;
  weewxVersion: string;
  stats: Stat[];
}

export interface Stat {
  name: string;
  label: string;
  unit?: string;
  type: string;
  currentValue: string;
  maxValue?: string;
  maxTime?: string;
  minValue?: string;
  minTime?: string;
  avgDay?: string;
  rms?: string;
  additional?: AdditionalValue[];
  timePeriod?: string;
  sumDay?: string;
}

export interface AdditionalValue {
  name: string;
  value: string;
}