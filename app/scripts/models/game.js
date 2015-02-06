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
		block: false,
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

			if (this.get('currentRound')) {
				throw 'Cannot start game, game already started.';
			}

			this.startRound(firstRound);

		},
		startRound: function (round) {
			this.set('currentRound', round);
			var firstQuestion = round.get('questions').at(0);
			this.startQuestion(firstQuestion);
		},
		startQuestion: function (question) {
			this.block = true;
			setTimeout(_.bind(function () {
				var round = this.get('currentRound');
				round.set('currentQuestion', question);
				round.set('stage', 'race');
				this.get('teamA').set('racePoints', null);
				this.get('teamA').set('lostChances', 0);
				this.get('teamB').set('racePoints', null);
				this.get('teamB').set('lostChances', 0);
				this.deactivateTeams();
				this.block = false;
			}, this), 5000);
		},
		chooseTeam: function (team) {
			var round = this.get('currentRound');
			if (!round) return;
			var stage = round.get('stage');
			if (stage !== 'race') return;
			if ((this.get('teamA').get('racePoints') !== null) || (this.get('teamB').get('racePoints') !== null)) return;
			this.activateTeam(team);
		},
		activateTeam: function (team) {

			if (this.get('activeTeam')) {
				this.get('activeTeam').set('active', false);
			}
			this.set('activeTeam', team);
			team.set('active', true);
		},
		deactivateTeams: function () {
			if (!this.get('activeTeam')) return;
			this.get('activeTeam').set('active', false);
			this.set('activeTeam', null);
		},
		toggleTeam: function () {
			if (!this.get('activeTeam')) return;
			this.activateTeam(this.get('activeTeam') === this.get('teamA') ? this.get('teamB') : this.get('teamA'));
		},
		nextRound: function () {
			var round = this.get('currentRound');
			var rounds = this.get('rounds');
			var roundIndex = rounds.indexOf(round);
			var nextRound = rounds.at(roundIndex + 1);

			if (!nextRound) {
				var teamA = this.get('teamA');
				var teamB = this.get('teamB');
				var msg;

				if (teamA.get('points') == teamB.get('points')) {
					msg = 'Gratulacje dla obu drużyn, remis';
				} else if (teamA.get('points') > teamB.get('points')) {
					msg = 'Gratulacje dla drużyny A';
				} else {
					msg = 'Gratulacje dla drużyny B';
				}

				alert(msg);
			} else {
				this.startRound(nextRound);
			}
		},
		nextQuestion: function (addPoints) {

			var team = this.get('activeTeam');
			var round = this.get('currentRound');
			var question = round.get('currentQuestion');
			var questions = round.get('questions');

			if (addPoints) {
				var points = question.getPoints() * (this.get('rounds').indexOf(round) + 1);
				team.set('points', team.get('points') + points);
			}

			var questionIndex = questions.indexOf(question);

			var nextQuestion = questions.at(questionIndex + 1);

			if (!nextQuestion) {
				this.nextRound();
			} else {
				this.startQuestion(nextQuestion);
			}

		},
		chooseInvalidAnswer: function () {

			if (this.block) return;

			var team = this.get('activeTeam');

			if (!team) {
				throw 'Cannot choose answer, there are no active team!';
			}

			var round = this.get('currentRound');

			if (!round) {
				throw 'Cannot choose answer, there are no active round!';
			}

			var question = round.get('currentQuestion');

			if (!question) {
				throw 'Cannot choose answer, there are no active question!';
			}

			if (round.get('stage') === 'race') {

				team.set('racePoints', 0);
				team.set('lostChances', 1);

				var otherTeam = this.get('teamA') === team ? this.get('teamB') : this.get('teamA');

				if (otherTeam.get('racePoints') !== null) {

					if (otherTeam.get('racePoints') === 0) {

						this.block = true;
						setTimeout(_.bind(function () {

							team.set('lostChances', 0);
							otherTeam.set('lostChances', 0);
							team.set('racePoints', null);
							otherTeam.set('racePoints', null);
							this.toggleTeam();
							this.block = false;
						}, this), 5000);

					} else {

						this.activateTeam(otherTeam);
						team.set('lostChances', 0);
						otherTeam.set('lostChances', 0);
						team.set('racePoints', null);
						otherTeam.set('racePoints', null);
						round.set('stage', 'answering');
					}

				} else {
					this.toggleTeam();
				}

			} else if (round.get('stage') == 'answering') {

				team.set('lostChances', team.get('lostChances') + 1);

				if (team.get('lostChances') == 3) {
					this.toggleTeam();
					round.set('stage', 'takeover');
				}

			} else if (round.get('stage') == 'takeover') {
				team.set('lostChances', team.get('lostChances') + 1);
				this.nextQuestion(false);
			}


		},
		chooseAnswer: function (answer) {

			if (this.block) return;

			var team = this.get('activeTeam');

			if (!team) {
				throw 'Cannot choose answer, there are no active team!';
			}

			var round = this.get('currentRound');

			if (!round) {
				throw 'Cannot choose answer, there are no active round!';
			}

			var question = round.get('currentQuestion');

			if (!question) {
				throw 'Cannot choose answer, there are no active question!';
			}

			var answerIndex = question.get('answers').indexOf(answer);

			if (answerIndex === -1) {
				throw 'Cannot choose answer not from active question!';
			}

			question.revealAnswer(answer);

			if (round.get('stage') === 'race') {

				team.set('racePoints', answer.get('points'));

				var otherTeam = this.get('teamA') === team ? this.get('teamB') : this.get('teamA');

				if (otherTeam.get('racePoints') !== null) {

					var activeTeam = parseInt(team.get('racePoints')) > parseInt(otherTeam.get('racePoints')) ? team : otherTeam;
					this.activateTeam(activeTeam);
					team.set('racePoints', null);
					otherTeam.set('racePoints', null);

					team.set('lostChances', 0);
					otherTeam.set('lostChances', 0);

					round.set('stage', 'answering');

				} else {
					this.toggleTeam();
				}

			} else if (round.get('stage') == 'answering') {

				var unrevealedAnswer = question.get('answers').findWhere({
					revealed: false
				});

				if (!unrevealedAnswer) {
					this.nextQuestion(true);
				}

			} else if (round.get('stage') == 'takeover') {
				this.nextQuestion(true);
			}

		}
	});

	return GameModel;

});