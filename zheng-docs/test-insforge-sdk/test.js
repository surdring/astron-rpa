import { createClient } from '@insforge/sdk';

const BASE_URL = 'http://172.16.100.211:7130';
const ANON_KEY = 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f';

async function main() {
  console.log('Initializing InsForge SDK client...');
  console.log('Base URL:', BASE_URL);

  const insforge = createClient({
    baseUrl: BASE_URL,
    anonKey: ANON_KEY,
  });

  console.log('Client created successfully.\n');

  // Test 1: Health check via raw fetch
  console.log('Test 1: Health check');
  try {
    const health = await fetch(`${BASE_URL}/api/health`).then(r => r.json());
    console.log('  OK:', health);
  } catch (err) {
    console.error('  FAILED:', err.message);
  }

  // Test 2: Get public authentication configuration via REST API
  console.log('\nTest 2: Public auth config (REST API)');
  try {
    const res = await fetch(`${BASE_URL}/api/auth/config`, {
      headers: { Authorization: `Bearer ${ANON_KEY}` },
    });
    const data = await res.json();
    console.log('  Status:', res.status, 'OK:', data);
  } catch (err) {
    console.error('  FAILED:', err.message || err);
  }

  // Test 3: Query api_keys table via REST API (InsForge wraps PostgREST)
  console.log('\nTest 3: Database query api_keys (REST API)');
  try {
    const res = await fetch(`${BASE_URL}/api/database/records/api_keys?limit=1`, {
      headers: { Authorization: `Bearer ${ANON_KEY}` },
    });
    const text = await res.text();
    console.log('  Status:', res.status, 'Body:', text.slice(0, 500));
  } catch (err) {
    console.error('  FAILED:', err.message || err);
  }

  // Test 4: Query via SDK database API (for comparison)
  console.log('\nTest 4: Database query via SDK (api_keys)');
  try {
    const { data, error } = await insforge.database
      .from('api_keys')
      .select('*')
      .limit(1);
    if (error) throw error;
    console.log('  OK:', data);
  } catch (err) {
    console.error('  FAILED:', err.message || err);
  }

  // Test 5: Sign up a test user via SDK
  console.log('\nTest 5: Auth sign up (test user)');
  try {
    const { data, error } = await insforge.auth.signUp({
      email: `test_${Date.now()}@example.com`,
      password: 'TestPassword123!',
    });
    if (error) throw error;
    console.log('  OK:', data);
  } catch (err) {
    console.error('  FAILED:', err.message || err);
  }

  console.log('\nAll tests completed.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
