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
			//var answers = new AnswersCollection(data.answers);
            //
			//this.set("answers", answers);
			this.set('answers', new AnswersCollection(this.get('answers')));
		},
		getPoints: function () {

			var revealed = this.get('revealedAnswers'),
				pointsSum = 0;

			this.get('answers').each(_.bind(function (answer) {
				//if (_.indexOf(revealed, answer) !== -1) {

				if (answer.get('revealed')) {
					pointsSum = pointsSum + parseInt(answer.get('points'));
				}
			}, this));

			return pointsSum;
		},
		revealAnswer: function (answer) {

			if (_.indexOf(this.get('revealedAnswers'), answer) !== -1) {
				this.get('revealedAnswers').push(answer);
			}

			answer.set('revealed', true);

		}
	});

	return QuestionModel;

});