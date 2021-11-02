function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	var runs = 0;
	var walks = 0;
	var swims = 0;
	var bikes = 0;
	var totAct = 0;
	for(var i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].activityType == 'running')
			runs++;
		else if(tweet_array[i].activityType == 'walking')
			walks++;
		else if(tweet_array[i].activityType == 'swimming')
			swims++;
		else if(tweet_array[i].activityType == 'biking')
			bikes++;
		if(tweet_array[i].source == 'completed_event')
			totAct++;
	}
	
	var max1 = 'none';
	var max2 = 'none';
	var max3 = 'none';
	if(runs > bikes && runs > walks)
		max1 = 'running';
	else if(bikes > runs && bikes > walks)
		max1 = 'biking';
	else if(walks > runs && walks > bikes)
		max1 = 'walking';
	if(max1 == 'running') {
		if(walks > bikes)
			max2 = 'walking';
		else if(bikes > walks)
			max2 = 'biking';
	}
	if(max1 == 'walking') {
		if(runs > bikes)
			max2 = 'running';
		else if(bikes > runs)
			max2 = 'biking';
	}
	if(max1 == 'biking') {
		if(walks > runs)
			max2 = 'walking';
		else if(runs > walks)
			max2 = 'running';
	}
	if(max1 != 'running' && max2 != 'running')
		max3 = 'running';
	if(max1 != 'walking' && max2 != 'walking')
		max3 = 'walking';
	if(max1 != 'biking' && max2 != 'biking')
		max3 = 'biking';
	
	$('#numberActivities').text(totAct);
	$('#firstMost').text(max1);
	$('#secondMost').text(max2);
	$('#thirdMost').text(max3);
	
	var weekdays = 0;
	var wdcount = 0;
	var weekends = 0;
	var wecount = 0;
	for(var d = 0; d < tweet_array.length; d++) {
		if(tweet_array[d].time.getDay() == 0 || tweet_array[d].time.getDay() == 6) {
			wecount++;
			weekends += tweet_array[d].distance;
		}
		else {
			wdcount++;
			weekdays += tweet_array[d].distance;
		}
	}
	
	var longerDay = 'none';
	if((weekends/wecount) > (weekdays/wdcount))
		longerDay = 'weekends';
	else
		longerDay = 'weekdays';
	$('#weekdayOrWeekendLonger').text(longerDay);
	
	var minDist = 100000;
	var minAct = 'none';
	for(var j = 0; j < tweet_array.length; j++) {
		if(tweet_array[j].activityType == 'running' || tweet_array[j].activityType == 'walking' || tweet_array[j].activityType == 'swimming' || tweet_array[j].activityType == 'biking'){
			if(tweet_array[j].distance < minDist) {
				minDist = tweet_array[j].distance;
				minAct = tweet_array[j].activityType;
			}
		}
	}
	
	var maxDist = 0;
	var maxAct = 'none';
	for(var k = 0; k < tweet_array.length; k++) {
		if(tweet_array[k].activityType == 'running' || tweet_array[k].activityType == 'walking' || tweet_array[k].activityType == 'swimming' || tweet_array[k].activityType == 'biking'){
			if(tweet_array[k].distance > maxDist) {
				maxDist = tweet_array[k].distance;
				maxAct = tweet_array[k].activityType;
			}
		}
	}
	
	$('#longestActivityType').text(maxAct);
	$('#shortestActivityType').text(minAct);

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": [{"Activity Type": "Running", "Number of Tweets": runs}, {"Activity Type": "Walking", "Number of Tweets": walks}, {"Activity Type": "Biking", "Number of Tweets": bikes},{"Activity Type": "Swimming", "Number of Tweets": swims}]
	  }
	  //TODO: Add mark and encoding
	"mark": "point","encoding": {"x": {"field": "Activity Type", "type": "quantitative"},"y": {"field": "Number of Tweets", "type": "quantitative"}}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	"mark": "point","encoding": {"x": {"field": "day", "type": "quantitative"},"y": {"field": "distance", "type": "quantitative"},"color": {"field": "activityType", "type": "nominal"}}
	};
	
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	"mark": "point","encoding": {"x": {"aggregate": "mean","field": "day", "type": "quantitative"},"y": {"aggregate":"mean","field": "distance", "type": "quantitative"},"color": {"field": "activityType", "type": "nominal"}}
	};
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});
