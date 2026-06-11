import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');

// Read .env file directly
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
console.log('=== Full .env file contents ===');
console.log(envContent);
console.log('=== End .env ===');

// Parse SMTP_PASS from env
const passMatch = envContent.match(/^SMTP_PASS=(.+)$/m);
const userMatch = envContent.match(/^SMTP_USER=(.+)$/m);
const pass = passMatch ? passMatch[1].trim() : 'NOT FOUND';
const user = userMatch ? userMatch[1].trim() : 'NOT FOUND';

console.log('\n=== Parsed values ===');
console.log('SMTP_USER:', JSON.stringify(user));
console.log('SMTP_PASS:', JSON.stringify(pass));
console.log('SMTP_PASS length:', pass.length);
console.log('Password contains spaces:', pass.includes(' '));

// Test SMTP
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: { user, pass },
  logger: true,
  debug: true,
});

try {
  console.log('\n=== Verifying connection ===');
  await transporter.verify();
  console.log('✓ SMTP connection OK!');
  
  console.log('\n=== Sending test email ===');
  const info = await transporter.sendMail({
    from: `"Atharv Studio" <${user}>`,
    to: user,
    subject: 'Test from Atharv Studio',
    text: 'If you see this, email works!',
  });
  console.log('✓ Email sent! ID:', info.messageId);
} catch (err) {
  console.error('\n✗ Error:', err.message);
  console.error('Code:', err.code);
  console.error('Command:', err.command);
  console.error('Response:', err.response);
}
