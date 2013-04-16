define(function (require) {
	var tweetSortFunctions = {};

	tweetSortFunctions.created_at = {
		displayName: "Created At",

		sortFunction: function (a, b) {
			return a.created_at_date - b.created_at_date;
		}
	};

	tweetSortFunctions.sentiment = {
		displayName: "Sentiment",

		sortFunction: function (a, b) {
			return a.sentiment - b.sentiment;
		}
	};

	return tweetSortFunctions;
})
