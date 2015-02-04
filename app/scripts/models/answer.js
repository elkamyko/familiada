define([
	'backbone'
], function (Backbone) {

	var AnswerModel = Backbone.Model.extend({
		defaults: {
			'answer': '',
			'points': 0
		},
		initialize: function (data) {

		}
	});

	return AnswerModel;

});