const jwt = require('jsonwebtoken');
const secretKey = "your_secret_key"; // Use the same secret key from login

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(403).json({ error: 'No token provided, access denied' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded; // Attach the decoded token data to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
