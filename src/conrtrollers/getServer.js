const axios = require('axios');
const config = require("../config/config");
const util = require("../enums/util");
const validUrl = require("valid-url");

async function findServer(req, res) {
    let start = process.hrtime();
    try {
        //logging started
        util.log("findServer started");

        //Initialize Varables
        const body = req.body;
        let servers = body["servers"];
        let infoMap = new Map();
        let urlArray = [];
        let results = [], positiveResults = [], sortedResults = [];

        //Prepare promise array of valid http get requests with timeout of 5 seconds
        servers.forEach((server) => {
            if (validUrl.isUri(server["url"])) {
                urlArray.push(axios.get(server["url"], { timeout: config.axios.timeout }));
                infoMap.set(server["url"], {
                    url: server["url"],
                    priority: server["priority"]
                })
            }
        })

        //Fire each url parallelly and populate results array
        await Promise.allSettled(urlArray).then((res) => {
            res.forEach((elem) => {
                let obj = {};
                if (elem.status == "rejected") {
                    obj["url"] = elem.reason.config.url;
                    obj["status"] = elem.reason.code;
                }
                else {
                    obj["url"] = elem.value.config.url;
                    obj["status"] = elem.value.status;
                }
                let info = infoMap.get(obj["url"]);
                if (info) {
                    info["code"] = obj["status"];
                    results.push(info);
                }
            })
        })

        //Filter out success results 
        positiveResults = results.filter((item) => {
            return (item.code == 200)
        })

        //Take out the url with least priority number
        if (positiveResults.length) {
            sortedResults = positiveResults.sort((a, b) => {
                return a.priority - b.priority;
            })
        }
        else {
            throw util.error("All url gave errors", 101, 400)
        }

        //End logger 
        util.print();
        util.log("findServer Ended", start);

        //Send Response
        res.send(sortedResults[0]);
    }
    catch (error) {

        //End Logger 
        util.print();
        util.log("Error in findServer", start, "error", error);

        //Prepare Error
        if (!error.hasOwnProperty("http_code")) {
            error = util.error(error.message, "102");
        }
        let statusCode = error.http_code;
        delete (error.http_code);

        //Send error 
        res.status(statusCode).send(error);
    }
}

module.exports = findServer;