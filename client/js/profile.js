Template.profile.rendered = function() {
	$("#profile-link").addClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');

}

Template.profile.helpers({
	email: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().emails[0].address;
		}
	},

	username: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().username;
		}
	},

	year: function() {

			return Meteor.user().profile.year;
	},

	school: function() {

			return Meteor.user().profile.school;
	},

	userJokes: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		//return all the jokes belonging to this user
		//returns newest jokes to the top
		var userJokes = Jokes.find({userId: userId}, {sort: {createdAt: -1}});
		return userJokes;
	},
	//to display the respective scores of the users in the profile
	userLaughScore: function() {
		return Meteor.user().profile.laughScore;
	},



	userPukeScore: function() {
		return Meteor.user().profile.pukeScore;
	},

});

Template.profile.events({
	"click #delete-joke": function() {
		//id linked to specific joke
		Meteor.call("removeJoke", this._id);
		Bert.alert("Your Review Was Deleted", "success", "growl-top-right");
	},

	"submit #edit-joke": function(event) {

		Meteor.call("updateJoke", this._id);
		Bert.alert("Your Review was Edited", "success", "growl-top-right");


	}
});
