define([
	'models/question',
	'backbone',
	'underscore'
], function (
	QuestionModel,
	Backbone,
	_
) {

	var QuestionsCollection = Backbone.Collection.extend({
		model: QuestionModel,
		initialize: function (data, opts) {
            
		}
	});

	return QuestionsCollection;

});