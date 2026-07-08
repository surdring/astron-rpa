interface ImportMetaEnv {
  readonly VITE_INSFORGE_URL?: string
  readonly VITE_INSFORGE_ANON_KEY?: string
  readonly VITE_RPA_SERVICES_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
