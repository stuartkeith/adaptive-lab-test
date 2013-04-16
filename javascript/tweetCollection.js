define(function (require) {
	var getTweets = require("getTweets");

	var TweetCollection = function () {
		this.tweetIDMap = {}; // look up tweets by ID
		this.tweets = []; // tweets stored
	};

	TweetCollection.prototype.addTweet = function (tweet) {
		// add the tweet (if unique).
		// return true if tweet was unique. otherwise return false.

		if (!this.tweetIDMap[tweet.id]) {
			this.tweetIDMap[tweet.id] = tweet;

			this.tweets.push(tweet);

			return true;
		} else {
			return false;
		}
	};

	TweetCollection.prototype.addTweets = function (tweets) {
		// add unique tweets only.
		// returns the tweets added.

		var tweetsAdded = [];

		tweets.forEach(function (tweet) {
			if (this.addTweet(tweet))
				tweetsAdded.push(tweet);
		}.bind(this));

		return tweetsAdded;
	};

	TweetCollection.prototype.get = function (success, error) {
		// success: function(total tweets, new tweets)
		// error: function(status, message)

		var getTweetsSuccess = function (tweets) {
			var tweetsAdded = this.addTweets(tweets);

			if (success)
				success(this.tweets, tweetsAdded);
		}.bind(this);

		var getTweetsError = function (request) {
			if (error) {
				var message;
				var status = "" + request.status; // convert to string

				if (request.status === 0) {
					message = "Internal browser error";
				} else {
					message = "'" + JSON.parse(request.responseText).error.message + "'";
				}

				error(status, message);
			}
		}.bind(this);

		getTweets(getTweetsSuccess, getTweetsError);
	};

	return TweetCollection;
});
