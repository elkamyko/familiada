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
			multiplier: 1
		},
		initialize: function () {

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
		}
	});

	return RoundModel;

});