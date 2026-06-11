import nodemailer from 'nodemailer';

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'tanmayshivane79@gmail.com',
    pass: process.env.SMTP_PASS || 'CHANGE_ME',
  },
};

console.log('Testing SMTP connection to Gmail...');
console.log('User:', config.auth.user);
console.log('Pass length:', config.auth.pass.length);
console.log('Pass value:', `"${config.auth.pass}"`);

const transporter = nodemailer.createTransport(config);

try {
  await transporter.verify();
  console.log('✓ Connection verified!');
  
  const info = await transporter.sendMail({
    from: '"Atharv Studio" <tanmayshivane79@gmail.com>',
    to: 'tanmayshivane79@gmail.com',
    subject: 'Test from Atharv Studio',
    text: 'If you see this, email works!',
  });
  console.log('✓ Email sent! ID:', info.messageId);
} catch (err) {
  console.error('✗ Error:', err.message);
  console.error('Code:', err.code);
  console.error('Response:', err.response);
}
