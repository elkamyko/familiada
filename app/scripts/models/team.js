define([
	'backbone'
], function (Backbone) {

	var TeamModel = Backbone.Model.extend({
		defaults: {
			name: '',
			points: 0,
			lostChances: 0,
			active: false,
			racePoints: null
		},
		initialize: function () {
//			
		}
	});

	return TeamModel;
});