#!/usr/bin/env node

/**
 * SUKUNERGY Deployment Status Checker
 * Verifies that all core features are working after deployment
 */

const https = require('https');
const http = require('http');

// Configuration
const config = {
  baseUrl: process.env.DEPLOYMENT_URL || 'http://localhost:3000',
  timeout: 10000,
};

// Test cases
const tests = [
  {
    name: 'Landing Page',
    path: '/',
    expectedStatus: 200,
    expectedContent: ['SUKUNERGY', 'Smart fuel for your day'],
  },
  {
    name: 'Products Page',
    path: '/products',
    expectedStatus: 200,
    expectedContent: ['Produk SUKUNERGY', 'Original', 'Chocolate'],
  },
  {
    name: 'Team Page',
    path: '/team',
    expectedStatus: 200,
    expectedContent: ['Tim SUKUNERGY', 'Galih Aji Pangestu'],
  },
  {
    name: 'FAQ Page',
    path: '/faq',
    expectedStatus: 200,
    expectedContent: ['Pertanyaan yang Sering Diajukan', 'sukun'],
  },
  {
    name: 'Contact Page',
    path: '/contact',
    expectedStatus: 200,
    expectedContent: ['Hubungi Kami', 'WhatsApp'],
  },
  {
    name: 'Cart Page',
    path: '/cart',
    expectedStatus: 200,
    expectedContent: ['Keranjang', 'kosong'],
  },
  {
    name: 'Why Breadfruit Page',
    path: '/why-breadfruit',
    expectedStatus: 200,
    expectedContent: ['Mengapa Sukun', 'superfood'],
  },
  {
    name: 'Sitemap',
    path: '/sitemap.xml',
    expectedStatus: 200,
    expectedContent: ['<?xml', 'urlset'],
  },
  {
    name: 'Robots.txt',
    path: '/robots.txt',
    expectedStatus: 200,
    expectedContent: ['User-agent', 'Sitemap'],
  },
];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const request = client.get(url, { timeout: config.timeout }, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve({
          status: response.statusCode,
          data,
          headers: response.headers,
        });
      });
    });

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Main test runner
async function runTests() {
  log('🌱 SUKUNERGY Deployment Status Checker', 'green');
  log('=====================================', 'green');
  log(`Testing deployment at: ${config.baseUrl}`, 'blue');
  log('');

  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    const url = `${config.baseUrl}${test.path}`;
    
    try {
      log(`Testing: ${test.name} (${test.path})...`, 'blue');
      
      const response = await makeRequest(url);
      
      // Check status code
      if (response.status !== test.expectedStatus) {
        log(`  ✗ Status: Expected ${test.expectedStatus}, got ${response.status}`, 'red');
        failedTests++;
        continue;
      }
      
      // Check content
      let contentPassed = true;
      for (const expectedText of test.expectedContent) {
        if (!response.data.toLowerCase().includes(expectedText.toLowerCase())) {
          log(`  ✗ Content: Missing "${expectedText}"`, 'red');
          contentPassed = false;
        }
      }
      
      if (contentPassed) {
        log(`  ✓ ${test.name} - OK`, 'green');
        passedTests++;
      } else {
        failedTests++;
      }
      
    } catch (error) {
      log(`  ✗ ${test.name} - Error: ${error.message}`, 'red');
      failedTests++;
    }
  }

  // Summary
  log('');
  log('Test Results:', 'blue');
  log(`✓ Passed: ${passedTests}`, 'green');
  log(`✗ Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green');
  log(`Total: ${passedTests + failedTests}`, 'blue');

  if (failedTests === 0) {
    log('');
    log('🎉 All tests passed! Your SUKUNERGY deployment is working correctly.', 'green');
    log('');
    log('Next steps:', 'blue');
    log('1. Test WhatsApp checkout flow manually', 'yellow');
    log('2. Verify team Instagram links work', 'yellow');
    log('3. Check admin panel (when implemented)', 'yellow');
    log('4. Test on mobile devices', 'yellow');
    log('5. Submit sitemap to Google Search Console', 'yellow');
  } else {
    log('');
    log('⚠️  Some tests failed. Please check the errors above.', 'yellow');
    process.exit(1);
  }
}

// Additional checks
async function checkEnvironment() {
  log('Environment Check:', 'blue');
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_WA_NUMBER',
    'NEXT_PUBLIC_BRAND_NAME',
  ];
  
  let envIssues = 0;
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      log(`  ✗ Missing: ${envVar}`, 'red');
      envIssues++;
    } else {
      log(`  ✓ Found: ${envVar}`, 'green');
    }
  }
  
  if (envIssues > 0) {
    log(`⚠️  ${envIssues} environment variables missing`, 'yellow');
  }
  
  log('');
}

// Run the tests
async function main() {
  try {
    await checkEnvironment();
    await runTests();
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv[2]) {
  config.baseUrl = process.argv[2];
}

main();
