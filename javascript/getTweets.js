define(function (require) {
	var tweetURL = "http://adaptive-test-api.herokuapp.com/tweets.json";

	var getTweets = function (success, error) {
		var xmlHttpRequest = new XMLHttpRequest();

		xmlHttpRequest.onreadystatechange = function () {
			if (xmlHttpRequest.readyState === 4) {
				if (xmlHttpRequest.status === 200) {
					if (success) {
						var jsonObject = JSON.parse(xmlHttpRequest.responseText);

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
