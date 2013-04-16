Online [here](http://stuartkeith.com/temp/adaptive-lab-test).

Or clone and open index.html (might need to load through a server on localhost to avoid cross-origin issues).


Notes
-----

- I wrote some notes on how to approach this during the day on paper, and then coded it in the evening.
- Used RequireJS for code organisation (along with the text plugin for templates.)
- Used Mustache to render templates.
- Tried to avoid libraries (although using the DOM directly might cause cross-browser issues, IE especially.)
- Split into three parts - getTweets (a light wrapper around XMLHttpRequest), TweetCollection (stores tweets, handles duplicates, etc), and the TweetsView (interacts with TweetCollection and renders tweets.)
- The time between first and last commit is a few hours, but I did take a few breaks, so it didn't quite take that long.


Bugs/Issues/Improvements/Misc
-----------------------------

- Only tested in Chrome/Firefox (did not really worry about cross-browser issues).
- Dates are not in a very readable format (could be formatted before rendering.)
- Very ugly (I assumed this was more about JavaScript than HTML/CSS so didn't spend any time on it.)
- When a sorting mode is selected, new tweets will be appended, not sorted.
- I assumed HTML in messages would be escaped by the API.
