if (Meteor.isServer) {
	//tell meteor that this is run on server
	Meteor.methods({
		// Method for adding jokes
		//add more parameters if i have more entries
		addJokes: function(jokeName, semester, recommendation, diff, workload, steepness, jokePost) {
			//cannot add if you are not logged in
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var username = Meteor.user().username;
				var school = Meteor.user().profile.school;
				var yr = Meteor.user().profile.year;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				//bec jan is 0
				var day = new Date().getDate();
				//create own kind of string
				var date = (month + "/" + day + "/" + year).toString();
				//insert into collection
				Jokes.insert({
					//add more if i have more entries
					jokeName: jokeName,
					jokePost: jokePost,
					year: yr,
					school: school,
					semester: semester,
					diff: diff,
					recommendation: recommendation,
					workload: workload,
					steepness: steepness,
					author: username,
					date: date,
					createdAt: new Date(),
					laughScore: 0,
					frownScore: 0,
					pukeScore: 0,
					voted: [username],
					userId: Meteor.userId(),
				});

			}
		},

		removeJoke: function(jokesId) {
			//if user of joke is not logged in, they can't
			//delete the joke
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Jokes.remove(jokesId);
			}
		},

		updateJoke: function(jokesId) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Jokes.update(jokesId);
			}
		},

		countVote: function(thisJoke, Name) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Jokes.update(thisJoke, { $addToSet: { voted: Name}});
			}
		},

		userPointLaugh: function(jokeAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(jokeAuthor, { $inc: {'profile.laughScore': +1}});
			}
		},

		laughVote: function(thisUser, thisJoke) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Jokes.update(thisJoke, {$inc: {laughScore: +1}});
			}
		},

		userPointFrown: function(jokeAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(jokeAuthor, { $inc: {'profile.frownScore': +1}});
			}
		},

		frownVote: function(thisUser, thisJoke) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Jokes.update(thisJoke, {$inc: {frownScore: +1}});
			}
		},

		userPointPuke: function(jokeAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(jokeAuthor, { $inc: {'profile.pukeScore': +1}});
			}
		},

		pukeVote: function(thisUser, thisJoke) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Jokes.update(thisJoke, {$inc: {pukeScore: +1}});
			}
		},

	});

}
