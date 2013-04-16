require.config({
	paths: {
		mustache: "libraries/mustache",
		templates: "../templates",
		text: "libraries/text"
	}
});

require(["application"], function (application) {
	application();
});
