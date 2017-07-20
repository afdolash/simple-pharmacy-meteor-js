import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/ui/dashboard_user.js';
import '../imports/ui/dashboard_admin.js';

Router.route('/');

Router.route("/login", {
	name: 'login',
	template: 'login'
});

Router.route("/register", {
	name: 'register',
	template: 'register'
});

// -------------------------------------------------------------------------------- LOGIN ---------------------------------------------------------------------------

Template.login.events({
	'submit .login': function(event) {
		event.preventDefault();
		
		var sEmail = event.target.email.value;
		var sPassword = event.target.password.value;

		Meteor.loginWithPassword(
			sEmail, 
			sPassword, 
			function(error) {
				if (error) {
					console.log(error.reason);
					Materialize.toast(error.reason, 4000);
				}
			});
	}
});

// -------------------------------------------------------------------------------- REGISTER ---------------------------------------------------------------------------

Template.register.events({
	'submit .register': function(event) {
		event.preventDefault();
		
		var sEmail= event.target.email.value;
		var sPassword = event.target.password.value;
		var sName = event.target.name.value;
		var sAddress = event.target.address.value;
		
		Accounts.createUser({
			email: sEmail,
			password: sPassword,
			profile: {
				name: sName,
				address: sAddress,
			},
		}, function(error) {
			if (error) {
				console.log(error.reason);
				Materialize.toast(error.reason, 4000);
			} else {
  				Meteor.call('addRoles');
  				Router.go('/')
			}
		});		
	},
});