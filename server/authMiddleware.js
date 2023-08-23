import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  console.log(token,'token')
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
  
    try {
      const decoded = jwt.verify(token, 'shhhhh'); // Replace with your actual secret key
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token', error: error.message });
    }
  };