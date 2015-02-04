define([
	'models/round',
	'underscore'
], function (AnswerModel, _) {

	var AnswersCollection = Backbone.Collection.extend({
		model: AnswerModel,
		initialize: function (data, opts) {
            
		}
	});

	return AnswersCollection;

});