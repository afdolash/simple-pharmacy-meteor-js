import { Meteor } from 'meteor/meteor';

import '../imports/api/medicine.js';
import '../imports/api/order.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  addRoles: function () {
    Roles.setUserRoles(Meteor.user(), 'user');
  }
});
