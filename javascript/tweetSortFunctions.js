define(function (require) {
	var tweetSortFunctions = {};

	tweetSortFunctions.created_at = {
		displayName: "Created At"
	};

	tweetSortFunctions.sentiment = {
		displayName: "Sentiment"
	};

	return tweetSortFunctions;
})
