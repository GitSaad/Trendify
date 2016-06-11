/**
 * Created by Ali on 2016-06-11.
 */

var express = require('express');
var router = express.Router();

router.route('/api/twitter')
    .get(function getTweets(req, res, next) {
            var test = {
                "message":"From the server"
            };
            return res.status(200).send(test);
    });

//router.post()
module.exports = router;