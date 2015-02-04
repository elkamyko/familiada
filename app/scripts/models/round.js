define([
	'collections/questions',
	'backbone'
], function (
	QuestionsCollection,
	Backbone
) {

	var RoundModel = Backbone.Model.extend({
		defaults: {
			questions: new QuestionsCollection(),
			currentQuestion: null,
			multiplier: 1,
			stage: null
		},
		initialize: function (data) {
            //this.set("questions", this.get('questions').set(data.questions));
			this.set('questions', new QuestionsCollection(this.get('questions')));
		},
		start: function () {
			var questions = this.get('questions');

			if (!questions.length) {
				throw 'Cannot start round, there are no questions!';
			}

			if (this.get('currentQuestion')) {
				throw 'Cannot start round, round already started.';
			}

			this.set('currentQuestion', questions.at(0));
			this.set('stage', 'race');
		}
	});

	return RoundModel;

});