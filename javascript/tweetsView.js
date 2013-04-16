define(function (require) {
	var Mustache = require("mustache");
	var tweetTemplate = require("text!templates/tweet.html");

	var tweetTemplateCompiled = Mustache.compile(tweetTemplate);

	var TweetsView = function (element, tweetCollection) {
		this.element = element;
		this.tweetCollection = tweetCollection;

		// cached child elements:
		this.renderedTweetsElement = this.element.getElementsByClassName("rendered-tweets")[0];
	};

	TweetsView.prototype.renderTweet = function (tweet) {
		var tweetElement = document.createElement("article");

		tweetElement.innerHTML = tweetTemplateCompiled(tweet);

		this.renderedTweetsElement.appendChild(tweetElement);
	};

	TweetsView.prototype.renderTweets = function (tweets) {
		tweets.forEach(this.renderTweet.bind(this));
	};

	TweetsView.prototype.get = function () {
		var success = function (tweets, tweetsAdded) {
			if (tweetsAdded.length === 0) {
				// TODO
				console.error("No tweets to add.");
			} else {
				this.renderTweets(tweetsAdded);
			}
		}.bind(this);

		var error = function (request) {
			// TODO
			console.error("TweetsView.get error:", request);
		}.bind(this);

		this.tweetCollection.get(success, error);
	};

	return TweetsView;
});
