const _ = require("lodash");
const util = require("../enums/util");

async function queryValidator(req, res, next) {
    try {
        const body = req.body;
        if (!(body.hasOwnProperty("servers") && body["servers"].constructor === Array)) {
            throw util.error("Incorrect request params", 102, 401);
        }

        body["servers"].forEach((server) => {
            if (!(server.hasOwnProperty("url") && server.hasOwnProperty("priority"))) {
                throw util.error("Incorrect request params", 102, 401);
            }
        })
        next();
    }
    catch (error) {
        if (!error.hasOwnProperty("http_code")) {
            error = util.error(error.message, "102");
        }
        let statusCode = error.http_code;
        delete (error.http_code);
        res.status(statusCode).send(error);
    }
}

module.exports = queryValidator;