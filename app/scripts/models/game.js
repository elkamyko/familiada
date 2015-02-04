define([
	'collections/answer',
	'backbone'
], function (
	AnswersCollection,
	Backbone
) {

	var GameModel = Backbone.Model.extend({
		defaults: {
			teamA: null,
			teamB: null,
			rounds: new AnswersCollection(),
			currentRound: null
		},
		initialize: function () {
//			
		},
		start: function () {
			var rounds = this.get('rounds');

			if (!rounds.length) {
				throw 'Cannot start game, there are no rounds!';
			}

			if (this.currentRound) {
				throw 'Cannot start game, game already started.';
			}

			this.set('currentRound', rounds.at(0));
		}
	});

	return GameModel;

});