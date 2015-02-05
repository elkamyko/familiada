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
			teamA: new TeamModel({
				name: 'Team A',
				pointsClass: 'left'
			}),
			teamB: new TeamModel({
				name: 'Team B',
				pointsClass: 'right'
			}),
			activeTeam: null,
			rounds: new RoundsCollection(),
			currentRound: null
		},
		initialize: function (data) {
			//console.log(this.get('rounds'));
			this.setRounds(this.get('rounds'));
			//this.get('rounds').set(data);
		},
		setRounds: function (data) {
			this.set('rounds', new RoundsCollection(data));
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