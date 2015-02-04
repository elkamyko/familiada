define([
    'collections/answers',
	'backbone'
], function (Backbone) {

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