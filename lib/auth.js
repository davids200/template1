import jwt from 'jsonwebtoken';

const authenticate = (handler) => async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    return handler(req, res);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports={
  authenticate
}