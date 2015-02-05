define([
	'backbone'
], function (Backbone) {

	var TeamModel = Backbone.Model.extend({
		defaults: {
			name: '',
			points: 50,
			lostChances: 1
		},
		initialize: function () {
//			
		}
	});

	return TeamModel;
});