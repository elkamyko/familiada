define([
	'backbone'
], function (Backbone) {

	var AnswerModel = Backbone.Model.extend({
		defaults: {
			'answer': '',
			'points': 0,
			'revealed': false
		},
		initialize: function (data) {

		}
	});

	return AnswerModel;

});