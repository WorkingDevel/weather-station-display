declare global {
  interface EnvVars {
    readonly ENV: string,
    readonly SOURCE_URL: URL
  }

  interface Window {
    __ENV: EnvVars;
  }
}
export const ENV_VARS: EnvVars = {
  get ENV(): string {
    return window.__ENV === undefined ? (process.env as any).ENV : window.__ENV.ENV
  },
  get SOURCE_URL(): URL {
    return window.__ENV === undefined ? (process.env as any).SOURCE_URL : window.__ENV.SOURCE_URL
  }
}
