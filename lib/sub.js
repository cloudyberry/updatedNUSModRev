//to make our jokes visible on the page
//because we need to publish and subscribe to make collections visible
if (Meteor.isClient) {
	Meteor.subscribe('Jokes');
	Meteor.subscribe('Users');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');
}