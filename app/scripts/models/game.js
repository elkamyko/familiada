define([
	'collections/rounds',
	'backbone'
], function (
	RoundsCollection,
	Backbone
) {

	var GameModel = Backbone.Model.extend({
		defaults: {
			teamA: null,
			teamB: null,
			rounds: new RoundsCollection(),
			currentRound: null
		},
		initialize: function (data) {
            var rounds = new RoundsCollection(data);
            
			this.set("rounds", rounds);
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