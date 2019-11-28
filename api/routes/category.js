import { Router } from 'express';
import Category from '../models/category';
import utils from '../utils';

const router = Router();


router.route('/')
    .post((req, res) => {
        new Category({ ...req.body })
        .save()
        .then(category => res.status(200).json({ payload: category, message: null }))
        .catch(err => {
            if (err && err.code === 11000) return utils.handleError(res, 409, `Category already exists.`);
            return utils.handleError(res, 500, err.message || err)
        });
    })
    .get((req, res) => {
        Category.find()
        .then(categories => res.status(200).json({ payload: { categories }, message: null }))
        .catch(err => utils.handleError(res, 500, err.message || err));
    });


router.route('/:id')
    .get((req, res) => {
        Category.findById(req.params.id)
        .then(category => {
            if (!category) return res.status(404).json({ payload: null, message: `Category does not exist.` });
            return res.status(200).json({ payload: { categories }, message: null });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    })
    .put((req, res) => {
        Category.findById(req.params.id)
        .then(category => {
            if (!category) return res.status(404).json({ payload: null, message: `Category does not exist.` });
            Object.assign(category, req.body);
            category
            .save()
            .then(category => res.status(200).json({ payload: category, message: null }))
            .catch(err => {
                if (err && err.code === 11000) return utils.handleError(res, 409, `Category already exists.`);
                return utils.handleError(res, 500, err.message || err)
            });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    })
    .delete((req, res) => {
        Category.findByIdAndDelete(req.params.id)
        .then(category => {
            if (!category) return res.status(404).json({ payload: null, message: `Category does not exist.` });
            return res.status(200).json({ payload: { categories }, message: null });
        })
        .catch(err => utils.handleError(res, 500, err.message || err));
    });


export default router;