define([
	'backbone'
], function (Backbone) {

	var TeamModel = Backbone.Model.extend({
		defaults: {
			name: '',
			points: 0
		},
		initialize: function () {
//			
		}
	});

	return TeamModel;

});