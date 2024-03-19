/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_ROOT: string
  readonly VITE_AUTH_ROOT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}