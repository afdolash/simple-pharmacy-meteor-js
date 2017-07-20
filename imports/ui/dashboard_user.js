import { Template } from 'meteor/templating';
import { Medicine } from '../api/medicine.js';
import { Orders } from '../api/order.js';

import './dashboard_user.html';

Router.route('/user_medicine', {
	name: 'user_medicine',
	template: 'user_medicine',
});

Router.route('/user_orders', {
	name: 'user_orders',
	template: 'user_orders',
});

// -------------------------------------------------------------------------------- DASHBOARD ADMIN ---------------------------------------------------------------------------

Template.dashboard_user.events({
	'click .logout': function(event) {
		event.preventDefault();
		
		Meteor.logout();
		Router.go('/');
	}
});

// -------------------------------------------------------------------------------- USER MEDICINE ---------------------------------------------------------------------------

Template.user_medicine.helpers({
  user_db_medicine() {
    // Show newest tasks at the top
    return Medicine.find({});
  }
});

// -------------------------------------------------------------------------------- USER ORDER ---------------------------------------------------------------------------

Template.user_orders.helpers({
  user_db_orders_onProgress() {
    // Show newest tasks at the top
    var user = Meteor.user();
	var sEmail = user && user.emails && user.emails[0].address;
    
    return Orders.find({email: sEmail, status: "On Progress"});
  },

  user_db_orders_onTheAir() {
    // Show newest tasks at the top
    var user = Meteor.user();
	var sEmail = user && user.emails && user.emails[0].address;
    
    return Orders.find({email: sEmail, status: "On The Air"});
  }
});

// -------------------------------------------------------------------------------- ITEM DRUG ---------------------------------------------------------------------------

Template.user_drug.events({
	'submit .order': function(event) {
		event.preventDefault();
		
		var user = Meteor.user();
		var sEmail = user && user.emails && user.emails[0].address;
		var sId = event.target._id.value;
		var sNameDrug = event.target.name_drug.value;
		var sStock = event.target.stock.value;
		var sQuantity = event.target.quantity.value;
		var sRest = sStock - sQuantity;
		var sPrice = event.target.price.value;
		var sTotalPrice = sQuantity * sPrice
		var sNamePhar = user && user.profile.name;
		var sAddress = user && user.profile.address;
		var sStatus = "On Progress"

		Orders.insert({
			name_drug: sNameDrug,
			quantity: sQuantity,
			total_price: sTotalPrice,
			name_phar: sNamePhar,
			email: sEmail,
			address: sAddress,
			status: sStatus
		}, function (error) {
			if (error) {
				console.log(error.reason);
				Materialize.toast(error.reason, 4000);
			}
		});

		Medicine.update(sId, {
			$set: {
				stock: sRest
			}
		})
	}
});

// -------------------------------------------------------------------------------- ITEM ORDER ---------------------------------------------------------------------------

Template.user_order.events({
	'click .cancel': function(event) {
		event.preventDefault();

		Orders.update(this._id, {
			$set: {
				status: "Canceled"
			}
		}, function(error) {
			if (error) {
				console.log(error.reason);
				Materialize.toast(error.reason, 4000);
			}
		})
	} 
});