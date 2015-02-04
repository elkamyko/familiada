define([
	'models/question',
	'underscore'
], function (
	QuestionModel,
	_
) {

	var QuestionsCollection = Backbone.Collection.extend({
		model: QuestionModel,
		initialize: function (data, opts) {
            
		}
	});

	return QuestionsCollection;

});