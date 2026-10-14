const jwt = require('jsonwebtoken');

// verify the jwt before allowing protected api requests
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // reject requests without a bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication token required.'
    });
  }

  const token = authHeader.slice(7).trim();

  try {
    // verify the token using the server's secret
    req.auth = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired authentication token.'
    });
  }
};

module.exports = requireAuth;