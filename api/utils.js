import User from './models/user';
import jwt from 'jsonwebtoken';

const utils = {
    handleError(res, status, message) {
        return res.status(status).json({ payload: null, message });
    },
    verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!!authHeader) {
            const id = jwt.decode(authHeader, { json: true, key: process.env.SECRET }).id;
            User.findById(id)
            .then(user => {
                if (!user) return utils.handleError(res, 404, `User does not exist.`);
                req.user = user._id;
                return next();
            })
            .catch(err => utils.handleError(res, 500, err.message || err));
        } else {
            return utils.handleError(res, 400, `Invalid authorization header.`);
        }
    }
};

export default utils;