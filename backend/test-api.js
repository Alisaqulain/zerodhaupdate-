// Simple API test script
// Run with: node test-api.js

const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

// Test endpoints
async function testAPI() {
  console.log('🧪 Testing Zerodha Clone API...\n');

  try {
    // Test 1: Stock Search (Public)
    console.log('1. Testing Stock Search...');
    const searchRes = await axios.get(`${BASE_URL}/stocks/search?query=RELIANCE`);
    console.log('✅ Stock Search:', searchRes.data.length, 'results found');
    
    // Test 2: Signup
    console.log('\n2. Testing User Signup...');
    const signupRes = await axios.post(`${BASE_URL}/signup`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'test123456'
    });
    console.log('✅ Signup:', signupRes.data.msg);

    // Test 3: Login
    console.log('\n3. Testing User Login...');
    const loginRes = await axios.post(`${BASE_URL}/login`, {
      email: 'test@example.com', // Use existing or create first
      password: 'test123456'
    });
    
    if (loginRes.data.token) {
      const token = loginRes.data.token;
      console.log('✅ Login: Token received');
      
      // Test 4: Portfolio Analytics
      console.log('\n4. Testing Portfolio Analytics...');
      try {
        const analyticsRes = await axios.get(`${BASE_URL}/portfolio/analytics`, {
          headers: { Authorization: token }
        });
        console.log('✅ Portfolio Analytics:', 'Data received');
      } catch (err) {
        console.log('⚠️  Portfolio Analytics:', err.response?.data?.msg || 'Needs holdings data');
      }

      // Test 5: Watchlist
      console.log('\n5. Testing Watchlist...');
      try {
        const watchlistRes = await axios.get(`${BASE_URL}/watchlist`, {
          headers: { Authorization: token }
        });
        console.log('✅ Watchlist:', watchlistRes.data.length, 'items');
      } catch (err) {
        console.log('⚠️  Watchlist:', err.response?.data?.msg || 'Error');
      }

      // Test 6: Alerts
      console.log('\n6. Testing Price Alerts...');
      try {
        const alertsRes = await axios.get(`${BASE_URL}/alerts`, {
          headers: { Authorization: token }
        });
        console.log('✅ Alerts:', alertsRes.data.length, 'alerts');
      } catch (err) {
        console.log('⚠️  Alerts:', err.response?.data?.msg || 'Error');
      }
    } else {
      console.log('⚠️  Login: No token (user may not exist)');
    }

    // Test 7: Holdings (Public)
    console.log('\n7. Testing Holdings...');
    const holdingsRes = await axios.get(`${BASE_URL}/allHoldings`);
    console.log('✅ Holdings:', holdingsRes.data.length, 'items');

    // Test 8: Orders (Public)
    console.log('\n8. Testing Orders...');
    const ordersRes = await axios.get(`${BASE_URL}/orders`);
    console.log('✅ Orders:', ordersRes.data.length, 'orders');

    console.log('\n✅ All API tests completed!');
    console.log('\n📝 Note: Some endpoints require authentication and data in database');

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Run tests
testAPI();

