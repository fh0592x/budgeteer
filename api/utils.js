const utils = {
    handleError(res, status, message) {
        return res.status(status).json({ payload: null, message });
    }
};

export default utils;