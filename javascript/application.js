define(function (require) {
	var application = function () {
		var TweetCollection = require("tweetCollection");
		var TweetsView = require("tweetsView");

		var tweetsElement = document.getElementById("tweets");

		var tweetCollection = new TweetCollection();
		var tweetsView = new TweetsView(tweetsElement, tweetCollection);

		tweetsView.get();
	};

	return application;
});
