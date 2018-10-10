var config_deploy = {

    // obligatory fields

    // the experimentID is needed to recover data from the _babe server app
	// you receive the experimentID when you create the experiment using the _babe server app
	"experimentID": "5",
	// if you use the _babe server app, specify its URL here
	"serverAppURL" : "https://mcmpact.ikw.uni-osnabrueck.de/babe/",

    // set deployment method; use one of:
    //'debug', 'localServer', 'MTurk',
    // 'MTurkSandbox', 'Prolific', 'directLink'
  "deployMethod" : "Prolific",

    // optional fields

    // who to contact in case of trouble
  "contact_email": "ptsvilodub@uni-osnabrueck.de",

	"prolificURL": "https://app.prolific.ac/submissions/complete?cc=U3OI6L4V"
};
