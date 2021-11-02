function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
    let input = document.getElementById('textFilter').value; 
    input=input.toLowerCase(); 
    var count = 0;
    for (var i = 0; i < tweet_array.length; i++) {  
        if (!tweet_array[i].text.toLowerCase().includes(input)) { 
            tweet_array[i].text.style.display="none"; 
        } 
        else { 
            tweet_array[i].text.style.display="list-item";
		count++;
        } 
    }
	$('#searchCount).text(count);
	$('#searchText').text(input);
}

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});
