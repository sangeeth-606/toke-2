const jwt = require('jsonwebtoken');

const encrypt = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
};

module.exports = encrypt;

const payload = {
    userId: 123,
    username: 'exampleUser'
};

const secret = 'sdfkjkfdkh43jkd';

const token = encrypt(payload, secret);
console.log('Generated Token:', token);

try {
    const decoded = jwt.verify(token, secret);
    console.log('Decoded Token:', decoded);
} catch (err) {
    if (err.name === 'TokenExpiredError') {
        console.log('Token has expired');
    } else {
        console.log('Token is invalid');
    }
}

setTimeout(() => {
    try {
        const decoded = jwt.verify(token, secret);
        console.log('Decoded Token after 1 hour:', decoded);
    } catch (err) {
        console.log('Error after 1 hour:', err.message);
    }
}, 3600000); 
