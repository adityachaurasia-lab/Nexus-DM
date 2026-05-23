import { User } from '../lib/db/models/User';
import { ConsentLog } from '../lib/db/models/ConsentLog';
import * as authExports from '../auth';

// Simple command-line test runner
const args = process.argv.slice(2);
const testArg = args.find(a => a.startsWith('--test='))?.split('=')[1];

async function run() {
  console.log(`[Test Runner] Running test: ${testArg || 'all'}`);

  try {
    if (!testArg || testArg === 'auth-config') {
      console.log('Testing auth-config...');
      
      // Verify Mongoose models can compile
      if (!User || typeof User.findOne !== 'function') {
        throw new Error('User model compile failed');
      }
      if (!ConsentLog || typeof ConsentLog.findOne !== 'function') {
        throw new Error('ConsentLog model compile failed');
      }

      // Verify NextAuth exports
      if (!authExports.auth || !authExports.handlers || !authExports.signIn || !authExports.signOut) {
        throw new Error('NextAuth v5 exports are missing from auth.ts');
      }

      console.log('✅ auth-config passed');
    }

    if (!testArg || testArg === 'redis-otp') {
      console.log('Testing redis-otp...');
      
      const { redis } = require('../lib/cache/redis');
      if (redis === undefined) {
        throw new Error('Redis import failed');
      }
      console.log('✅ redis-otp passed (Redis client initialised successfully)');
    }

    if (!testArg || testArg === 'whatsapp-client') {
      console.log('Testing whatsapp-client...');
      
      const whatsapp = require('../lib/utils/whatsapp');
      if (!whatsapp || typeof whatsapp.sendWhatsAppOTP !== 'function') {
        throw new Error('whatsapp module lacks sendWhatsAppOTP export');
      }
      console.log('✅ whatsapp-client passed');
    }

    if (!testArg || testArg === 'middleware') {
      console.log('Testing middleware...');
      
      const middleware = require('../middleware');
      if (!middleware || typeof middleware.default !== 'function') {
        throw new Error('middleware default export is missing or not a function');
      }
      console.log('✅ middleware passed');
    }

    if (!testArg || testArg === 'csp-headers') {
      console.log('Testing csp-headers...');
      
      const nextConfig = require('../next.config.js');
      if (typeof nextConfig.headers !== 'function') {
        throw new Error('next.config.js lacks headers function');
      }
      
      const headers = await nextConfig.headers();
      const hasCSP = headers.some((h: any) => 
        h.headers.some((header: any) => header.key === 'Content-Security-Policy')
      );
      const hasFrame = headers.some((h: any) => 
        h.headers.some((header: any) => header.key === 'X-Frame-Options')
      );
      
      if (!hasCSP || !hasFrame) {
        throw new Error('next.config.js missing critical CSP or X-Frame-Options headers');
      }
      console.log('✅ csp-headers passed');
    }

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY');
    process.exit(0);
  } catch (error: any) {
    console.error(`\n❌ TEST FAILED: ${error?.message || error}`);
    process.exit(1);
  }
}

run();
