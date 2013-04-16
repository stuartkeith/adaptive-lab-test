define(function (require) {
	var Mustache = require("mustache");
	var tweetTemplate = require("text!templates/tweet.html");
	var tweetSortFunctions = require("tweetSortFunctions");

	var tweetTemplateCompiled = Mustache.compile(tweetTemplate);

	var TweetsView = function (element, tweetCollection) {
		this.element = element;
		this.tweetCollection = tweetCollection;

		// cached child elements:

		this.noUniqueTweetsElement = this.element.getElementsByClassName("no-unique-tweets")[0];
		this.loadMoreButton = this.element.getElementsByClassName("load-more")[0];
		this.renderedTweetsElement = this.element.getElementsByClassName("rendered-tweets")[0];
		this.sortSelect = this.element.getElementsByClassName("sort-select")[0];

		this.loadMoreButton.addEventListener("click", this.get.bind(this));

		this.sortSelect.addEventListener("change", this.sortSelectChange.bind(this));

		// add sort options to sortSelect:

		this.addTweetSortOption("none", "None");

		for (sortKey in tweetSortFunctions) {
			if (tweetSortFunctions.hasOwnProperty(sortKey)) {
				this.addTweetSortOption(sortKey, tweetSortFunctions[sortKey].displayName);
			}
		}
	};

	TweetsView.prototype.sortSelectChange = function (event) {
		var selectedIndex = event.target.selectedIndex;

		if (selectedIndex > 0) {
			var selectedValue = event.target.options[selectedIndex].value;

			var sortSelection = tweetSortFunctions[selectedValue];

			this.sortAndReRender(sortSelection);
		}
	};

	TweetsView.prototype.addTweetSortOption = function (value, displayName) {
		var optionElement = document.createElement("option");

		optionElement.innerText = displayName;
		optionElement.value = value;

		this.sortSelect.appendChild(optionElement);
	};

	TweetsView.prototype.clearRenderedTweets = function () {
		this.renderedTweetsElement.innerHTML = "";
	};

	TweetsView.prototype.renderTweet = function (tweet) {
		var tweetElement = document.createElement("article");

		tweetElement.classList.add("tweet");
		tweetElement.innerHTML = tweetTemplateCompiled(tweet);

		this.renderedTweetsElement.appendChild(tweetElement);
	};

	TweetsView.prototype.renderTweets = function (tweets) {
		tweets.forEach(this.renderTweet.bind(this));
	};

	TweetsView.prototype.sortAndReRender = function (sortSelection) {
		var tweets = this.tweetCollection.tweets;

		tweets.sort(sortSelection.sortFunction);

		this.clearRenderedTweets();
		this.renderTweets(tweets);
	};

	TweetsView.prototype.disableUI = function (value) {
		this.loadMoreButton.disabled = value;
	};

	TweetsView.prototype.get = function () {
		this.disableUI(true);
		this.noUniqueTweetsElement.classList.add("hidden");

		var success = function (tweets, tweetsAdded) {
			this.disableUI(false);

			if (tweetsAdded.length === 0) {
				this.noUniqueTweetsElement.classList.remove("hidden");
			} else {
				this.renderTweets(tweetsAdded);
			}
		}.bind(this);

		var error = function (request) {
			this.disableUI(false);

			// TODO
			console.error("TweetsView.get error:", request);
		}.bind(this);

		this.tweetCollection.get(success, error);
	};

	return TweetsView;
});
