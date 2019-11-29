import { Router } from 'express';
import Budget from '../models/budget';
import utils from '../utils';

const router = Router();


router.route('/')
    .post(utils.verifyToken, (req, res) => {
        new Budget({ ...req.body, user: req.user })
        .save()
        .then(budget => res.status(200).json({ payload: budget, message: null }))
        .catch(err => {
            if (err && err.code === 11000) return utils.handleError(res, 409, `Budget already exists.`);
            return utils.handleError(res, 500, err.message || err)
        });
    })
    .get(utils.verifyToken, (req, res) => {
        Budget.find({ user: req.user })
        .then(budgets => res.status(200).json({ payload: { budgets }, message: null }))
        .catch(err => utils.handleError(res, 500, err.message || err));
    });


router.route('/:id')
    .get(utils.verifyToken, (req, res) => {
        Budget.findById({ _id: req.params.id, user: req.user })
        .then(budget => {
            if (!budget) return res.status(404).json({ payload: null, message: `Budget does not exist.` });
            return res.status(200).json({ payload: { budget }, message: null });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    })
    .put(utils.verifyToken, (req, res) => {
        Budget.findById({ _id: req.params.id, user: req.user })
        .then(budget => {
            if (!budget) return res.status(404).json({ payload: null, message: `Budget does not exist.` });
            Object.assign(budget, req.body);
            budget
            .save()
            .then(budget => res.status(200).json({ payload: { budget }, message: null }))
            .catch(err => {
                if (err && err.code === 11000) return utils.handleError(res, 409, `Budget already exists.`);
                return utils.handleError(res, 500, err.message || err)
            });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    })
    .delete(utils.verifyToken, (req, res) => {
        Budget.findByIdAndDelete({ _id: req.params.id, user: req.user })
        .then(budget => {
            if (!budget) return res.status(404).json({ payload: null, message: `Budget does not exist.` });
            return res.status(200).json({ payload: { budget }, message: null });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    });


export default router;