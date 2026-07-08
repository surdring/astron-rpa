import { createClient } from '@insforge/sdk'

const INSFORGE_BASE_URL = import.meta.env.VITE_INSFORGE_URL || 'http://172.16.100.211:7130'
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f'

export const insforge = createClient({
  baseUrl: INSFORGE_BASE_URL,
  anonKey: INSFORGE_ANON_KEY,
})

export function setInsforgeBaseUrl(url: string) {
  // SDK client currently does not support dynamic baseUrl changes after creation.
  // Use env variables or recreate the client if necessary.
  console.warn('[insforge] setInsforgeBaseUrl is not supported yet, baseUrl:', url)
}
