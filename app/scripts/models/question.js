define([
    'collections/answers',
	'backbone'
], function (
	AnswersCollection,
	Backbone
) {

	var QuestionModel = Backbone.Model.extend({
		defaults: {
			'question': '',
			'answers': new AnswersCollection(),
			'revealedAnswers': []
		},
		initialize: function () {
//			
		}
	});

	return QuestionModel;

});