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
		initialize: function (data) {
            var answers = new AnswersCollection(data.answers);
            
            this.set("answers", answers);
		}
	});

	return QuestionModel;

});