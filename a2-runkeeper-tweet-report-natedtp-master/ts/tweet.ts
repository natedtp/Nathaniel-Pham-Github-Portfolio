class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
	if(this.text.includes('completed') || this.text.includes('posted')) {
		return "completed_event";
	}
	else if(this.text.includes('Achieved')) {
		return "achievement";
	}
	else if(this.text.includes('right now') {
		return "live_event";
    	}
	else {
		return "miscellaneous";
	}
        return "unknown";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        return false;
        //TODO: identify whether the tweet is written
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
	else {
		if(this.text.includes('run')
			return "running";
		else if(this.text.includes('bike'))
			return "biking";
		else if(this.text.includes('walk'))
			return "walking";
		else if(this.text.includes('swim'))
			return "swimming";
	}
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
	const m = ' mi ';
	const k = ' km ';
	if(this.text.includes(m)) {
		const i1 = this.text.indexOf(m)-5;
		return this.text[i1]+this.text[i1+1]+this.text[i1+2]+this.text[i1+3];
	}
	else if(this.text.includes(k)) {
		const i2 = this.text.indexOf(m)-5;
		var km = this.text[i2]+this.text[i2+1]+this.text[i2+2]+this.text[i2+3];
		return km/1.609;
	}
        return 0;
    }

    get day():string {
	    return this.time.getDay();
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
	var linkRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    	var newText = text.replace(linkRegex, function(url) {
        	return '<a href="' + link + '">' + link + '</a>';
    	});
        return "<tr>"+newText+"</tr>";
    }
}
