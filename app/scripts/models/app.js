define([
	'backbone'
], function (Backbone) {

	var AppModel = Backbone.Model.extend({
		defaults: {
			geocoding: false
		}
	});

	return AppModel;

});