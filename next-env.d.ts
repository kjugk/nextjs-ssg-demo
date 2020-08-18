/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  export interface ProcessEnv {
    CMS_API_URL: string;
    CMS_API_KEY: string;
  }
}
