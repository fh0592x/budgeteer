import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import utils from '../utils';

const router = Router();


router.route('/signup')
    .post((req, res) => {
        new User({ ...req.body })
        .save()
        .then(_ => res.status(200).json({ payload: null, message: null }))
        .catch(err => {
            if (err && err.code === 11000) return utils.handleError(res, 409, `User already exists.`);
            return utils.handleError(res, 500, err.message || err)
        });
    });


router.route('/login')
    .post((req, res) => {
        User.findOne({ username: req.body.username }).select('username password').exec()
        .then(user => {
            if (!user) return res.status(404).json({ payload: null, message: `User does not exist.` });
            user.comparePassword(req.body.password)
            .then(result => {
                if (result) {
                    const token = jwt.sign({ id: user._id }, process.env.SECRET, { algorithm: 'HS512' });
                    return res.status(200).json({ payload: { username: user.username, token } });
                } else {
                    return utils.handleError(res, 400, `Incorrect credentials.`)
                }
            })
            .catch(err => utils.handleError(res, 500, err.message || err));
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    })


export default router;