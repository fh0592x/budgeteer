import { Router } from 'express';
import Budget from '../models/budget';
import utils from '../utils';

const router = Router();


router.route('/')
    .post((req, res) => {
        new Budget({ ...req.body })
        .save()
        .then(budget => res.status(200).json({ payload: budget, message: null }))
        .catch(err => {
            if (err && err.code === 11000) return utils.handleError(res, 409, `Budget already exists.`);
            return utils.handleError(res, 500, err.message || err)
        });
    })
    .get((req, res) => {
        Budget.find()
        .then(budgets => res.status(200).json({ payload: { budgets }, message: null }))
        .catch(err => utils.handleError(res, 500, err.message || err));
    });


router.route('/:id')
    .get((req, res) => {
        Budget.findById(req.params.id)
        .then(budget => {
            if (!budget) return res.status(404).json({ payload: null, message: `Budget does not exist.` });
            return res.status(200).json({ payload: { budgets }, message: null });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    })
    .put((req, res) => {
        Budget.findById(req.params.id)
        .then(budget => {
            if (!budget) return res.status(404).json({ payload: null, message: `Budget does not exist.` });
            Object.assign(budget, req.body);
            budget
            .save()
            .then(budget => res.status(200).json({ payload: budget, message: null }))
            .catch(err => {
                if (err && err.code === 11000) return utils.handleError(res, 409, `Budget already exists.`);
                return utils.handleError(res, 500, err.message || err)
            });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    })
    .delete((req, res) => {
        Budget.findByIdAndDelete(req.params.id)
        .then(budget => {
            if (!budget) return res.status(404).json({ payload: null, message: `Budget does not exist.` });
            return res.status(200).json({ payload: { budgets }, message: null });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    });


export default router;