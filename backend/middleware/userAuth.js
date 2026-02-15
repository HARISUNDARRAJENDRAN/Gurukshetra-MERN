import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json({ success: false, message: 'Not authorized. Please login again.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.json({ success: false, message: 'Invalid token.' });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;