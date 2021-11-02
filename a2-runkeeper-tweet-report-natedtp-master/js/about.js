function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	var min = Date.parse(tweet_array[0].time);
	for(var i = 1; i < tweet_array.length; i++) {
  		if (Date.parse(tweet_array[i].time) < min)
    		min = Date.parse(tweet_array[i].time);
	}
	var earliestDate = new Date(min);
	
	var max = Date.parse(tweet_array[0].time);
	for(var j = 1; j < tweet_array.length; j++) {
  		if (Date.parse(tweet_array[j].time) > max)
    		max = Date.parse(tweet_array[j].time);
	}
	var latestDate = new Date(max);
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	$('#numberTweets').text(tweet_array.length);
	//This line modifies the DOM, searching for the tag with the firstDate and lastDate ID and updating the text.
	$('#firstDate').text(earliestDate.toLocaleDateString());
	$('#lastDate').text(latestDate.toLocaleDateString());
	
	var compl = 0;
	var liv = 0;
	var ach = 0;
	var mis = 0;
	for(var k = 0; k < tweet_array.length; k++) {
		if(tweet_array[k].source == 'completed_event')
			compl++;
		else if(tweet_array[k].source == 'achievement')
			ach++;
		else if(tweet_array[k].source == 'live_event')
			liv++;
		else
			mis++;
	}
	var complPct = (compl/tweet_array.length)*100;
	var livPct = (liv/tweet_array.length)*100;
	var achPct = (ach/tweet_array.length)*100;
	var misPct = )mis/tweet_array.length)*100;
	$('#completedEventsPct').text(math.format(complPct,2)+'%');
	$('#liveEventsPct').text(math.format(livPct,2)+'%');
	$('#achievementsPct').text(math.format(achPct,2)+'%');
	$('#miscellaneousPct').text(math.format(misPct,2)+'%');
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});
