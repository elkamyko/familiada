define([
	'models/team',
	'collections/rounds',
	'backbone'
], function (
	TeamModel,
	RoundsCollection,
	Backbone
) {

	var GameModel = Backbone.Model.extend({
		defaults: {
			teamA: new TeamModel(),
			teamB: new TeamModel(),
			rounds: new RoundsCollection(),
			currentRound: null
		},
		initialize: function (data) {
            var rounds = new RoundsCollection(data);
            
			this.set("rounds", rounds);
		},
		start: function () {
			var rounds = this.get('rounds'),
				firstRound = rounds.at(0);

			if (!rounds.length) {
				throw 'Cannot start game, there are no rounds!';
			}

			if (this.currentRound) {
				throw 'Cannot start game, game already started.';
			}

			this.set('currentRound', firstRound);
			firstRound.start();

		}
	});

	return GameModel;

});