module.exports = {
    port: 3000,
    axios: {
        timeout: 5000 //http call timeout in milliseconds
    },
    logging: {
        debug_speed: 0, //get logs for only those requests which took time > min_speed milliseconds
        min_speed: 500, // 500 ms
        logLevel: "error",//info or error (choose error if want only error logs)
    },
    test: {
        "servers": [
            {
                "url": "https://beeceptor.com/",
                "priority": 3
            },
            {
                "url": "http://l.com/",
                "priority": 1
            },
            {
                "url": "https://www.wix.com/",
                "priority": 4
            },
            {
                "url": "https://www.geeksforgeeks.org/",
                "priority": 2
            }
        ]
    }
}   