define([
	'models/round',
	'underscore'
], function (TeamModel, _) {

	var TeamsCollection = Backbone.Collection.extend({
		model: TeamModel,
		initialize: function (data, opts) {
            
		}
	});

	return TeamsCollection;

});