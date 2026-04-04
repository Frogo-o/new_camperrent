const service = require("./adminAuth.service");

async function postLogin(req, res, next) {
    try {
        res.json(await service.login(req.body, res));
    } catch (e) {
        next(e);
    }
}

async function postLogout(req, res, next) {
    try {
        res.json(service.logout(res));
    } catch (e) {
        next(e);
    }
}

module.exports = { postLogin, postLogout };
