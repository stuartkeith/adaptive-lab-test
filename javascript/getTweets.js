define(function (require) {
	var tweetURL = "http://adaptive-test-api.herokuapp.com/tweets.json";

	var getTweets = function (success, error) {
		var xmlHttpRequest = new XMLHttpRequest();

		xmlHttpRequest.onreadystatechange = function () {
			if (xmlHttpRequest.readyState === 4) {
				if (xmlHttpRequest.status === 200) {
					if (success) {
						var jsonObject = JSON.parse(xmlHttpRequest.responseText);

						jsonObject.forEach(function (tweet) {
							tweet.created_at_date = new Date(tweet.created_at);
						});

						success(jsonObject);
					}
				} else if (error) {
					error(xmlHttpRequest);
				}
			}
		};

		xmlHttpRequest.open("GET", tweetURL);
		xmlHttpRequest.send();

		return xmlHttpRequest;
	};

	return getTweets;
});
