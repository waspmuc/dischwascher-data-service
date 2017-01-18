# dischwascher
Dischwascher aims for monitoring a dishwasher machine and serve this information via a RESTful interface

##Python Server "ouimeaux" - Installation
* First of all, you need a WeMo Insight Switch by Belkin. Configure it via your mobile and check the basic functionality.
* Download the open source library for interacting with the switch (https://github.com/iancmcc/ouimeaux) and follow installation instructions
* In case you have a raspberry pi with raspian running, follow these steps
    * `sudo apt-get install python-setuptools python-dev`
    * `sudo easy_install ouimeaux` (installation produces some weird output and could take a while and pauses sometimes, but don't worry)
    * `sudo pip install ouimeaux[server]`
    * run `wemo server` to start the server. During startup you should see something like
    
    `INFO:urllib3.connectionpool:Starting new HTTP connection (1): <WEMO_IP>`
    `INFO:urllib3.connectionpool:Starting new HTTP connection (1): <WEMO_IP>`
    `INFO:ouimeaux.environment:Found device <WeMo Insight "wemodishwasher"> at ('<WEMO_IP>', 3076)`
    `INFO:ouimeaux.subscribe:Subscribing to basic events from <WeMo Insight "wemodishwasher">`
    `INFO:urllib3.connectionpool:Starting new HTTP connection (1): <WEMO_IP>`
    `INFO:urllib3.connectionpool:Starting new HTTP connection (1): <WEMO_IP>`

* Now you can access the API via `http://<YOUR_IP>:5000/api/environment` and should see something like
```json{
    "wemodishwasher": {
        "currentpower": 15, 
        "host": "192.168.40.55", 
        "lastchange": "2017-01-18 14:51:53", 
        "model": "Belkin Insight 1.0", 
        "name": "wemodishwasher", 
        "onfor": 12, 
        "ontoday": 5073, 
        "ontotal": 4968, 
        "serialnumber": "221613K12000CB", 
        "state": 8, 
        "todaymw": 0.539152927449725, 
        "totalmw": 32349175, 
        "type": "Insight"
    }
}
```

* And thats it :-)

## NodeJS with Express and MongoDB - Installation

* Install Node.js (https://nodejs.org/en/download/)
    
    `sudo apt-get install nodejs`

* Install NPM (https://www.npmjs.com/)
    
    `sudo apt-get install npm`

* Install express (http://expressjs.com/de/)

    `sudo npm install -g express-generator`

* Install MongoDB
    `sudo apt-get install mongodb` and start with `sudo service mongodb start`
    (Specify data directory if you want)

* Clone this repository to your raspberry (e.g. ~/Development)
`git clone https://github.com/waspmuc/dischwascher.git`

* Navigate to `dischwascher/express/dishwascher/` and run `npm update`

* Now start the app via `npm start`. Now you should see message outcomes like "success", when your dishwasher is turned on.