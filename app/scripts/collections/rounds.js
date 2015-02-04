define([
	'models/round',
	'underscore'
], function (RoundModel, _) {

	var RoundsCollection = Backbone.Collection.extend({
		model: RoundModel,
		initialize: function (data, opts) {
            
		}
	});

	return RoundsCollection;

});