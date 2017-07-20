import { Template } from 'meteor/templating';
import { Medicine } from '../api/medicine.js';
import { Orders } from '../api/order.js';

import './dashboard_admin.html';

Router.route('/admin_medicine', {
	name: 'medicine',
	template: 'admin_medicine',
});

Router.route('/admin_order', {
	name: 'order',
	template: 'admin_order',
});

// -------------------------------------------------------------------------------- DASHBOARD ADMIN ---------------------------------------------------------------------------

Template.dashboard_admin.events({
	'click .logout': function(event) {
		event.preventDefault();
		
		Meteor.logout();
		Router.go('/');
	}
});

// -------------------------------------------------------------------------------- ADMIN MEDICINE ---------------------------------------------------------------------------

Template.admin_medicine.helpers({
  medicine() {
    // Show newest tasks at the top
    return Medicine.find({});
  }
});

Template.admin_medicine.events({
	'submit .insert': function(event) {
		event.preventDefault();
		
		var sName = event.target.name.value;
		var sDesc = event.target.desc.value;
		var sStok = event.target.stock.value;
		var sPrice = event.target.price.value;
		
		console.log(sName);
		console.log(sDesc);
		console.log(sStok);
		console.log(sPrice);

		Medicine.insert({
			name: sName,
			desc: sDesc,
			stock: sStok,
			price: sPrice
		}, function(error) {
			if (error) {
				console.log(error.reason);
				Materialize.toast(error.reason, 4000);
			} else {
				event.target.name.value = "";
				event.target.desc.value = "";
				event.target.stock.value = "";
				event.target.price.value = "";
			}
		});		
	},
});

// -------------------------------------------------------------------------------- ADMIN ORDER ---------------------------------------------------------------------------

Template.admin_order.helpers({
  orders() {
    // Show newest tasks at the top
    return Orders.find({});
  }
});

// -------------------------------------------------------------------------------- ITEM DRUG ---------------------------------------------------------------------------

Template.drug.events({
	'submit .update': function(event) {
		event.preventDefault();
		
		var sName = event.target.name.value;
		var sDesc = event.target.desc.value;
		var sStok = event.target.stock.value;
		var sPrice = event.target.price.value;
		
		console.log(sName);
		console.log(sDesc);
		console.log(sStok);
		console.log(sPrice);

		Medicine.update(this._id, {
			$set: {
				name: sName,
				desc: sDesc,
				stock: sStok,
				price: sPrice
			}
		}, function(error) {
			if (error) {
				console.log(error.reason);
				Materialize.toast(error.reason, 4000);
			}
		})	
	},

	'click .delete': function(event) {
		event.preventDefault();

		Medicine.remove(this._id);
	}
});

// -------------------------------------------------------------------------------- ITEM ORDER ---------------------------------------------------------------------------

Template.order.events({
	'click .delete': function(event) {
		event.preventDefault();

		Orders.remove(this._id);
	},

	'click .send': function(event) {
		event.preventDefault();

		Orders.update(this._id, {
			$set: {
				status: "On The Air"
			}
		}, function(error) {
			if (error) {
				console.log(error.reason);
				Materialize.toast(error.reason, 4000);
			}
		})
	}
});