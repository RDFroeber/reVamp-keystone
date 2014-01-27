var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'demo@reVamp.com', password: 'demo', name: { first: 'Jane', last: 'Doe' } },
	{ email: 'john@h2o.com', password: 'h2o', name: { first: 'John', last: 'Smith' } }
];

function createAdmin(admin, done) {
	User.model.findOne({ email: admin.email }).exec(function(err, user) {
		var newAdmin = new User.model(admin);
		newAdmin.isAdmin = true;
		newAdmin.save(function(err) {
			if (err) {
				console.error("Error adding admin " + admin.email + " to the database:");
				console.error(err);
			} else {
				console.log("Added admin " + admin.email + " to the database.");
			}
			done();
		});
	});
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};