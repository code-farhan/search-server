# Find Server

Get available server from a list of servers with lowest priority number.

# Instructions to Run

1) clone the repo
2) run npm install
3) run npm start
4) server is now running on port 3000
5) make a get request using postman or any other software on "localhost:3000/server/get" and provide "servers" array in raw json body.

Example of json body with servers array :-
{
	"servers":[
		{
			"url": "https://beeceptor.com/",
			"priority": 2
		},
		{
		    "url": "http://l.com/",
			"priority": 1
		},
		{
		    "url": "https://www.wix.com/",
			"priority": 3
		},
		{
		    "url": "https://www.geeksforgeeks.org/",
			"priority": 1
		}
	]
}

# Unit testing

1) run npm test

# Happy Coding!




