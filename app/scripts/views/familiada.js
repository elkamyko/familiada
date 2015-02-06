'use_strict';

define([
	'models/game',
    'views/game',
	'views/points',
	'views/chance',
	'views/question',
	'views/team',
	'views/round',
	'backbone',
    'underscore',
	'jquery',
	'window'
], function (
	GameModel,
    GameView,
	PointsView,
	ChanceView,
	QuestionView,
	TeamView,
	RoundView,
	Backbone,
    _,
    $,
	window
) {

	var FamiliadaView = Backbone.View.extend({
//		tagName: 'li',
//		className: 'list-group-item clearfix',
        templateId: 'familiada-template',
		el: 'body',
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
			'click #familiada-start-button': 'start'
		},
		$scene: null,
		initialize: function (opts) {
            this.$scene = this.$('#scene');
            //this.$scene.append(this.$el);
			this.template = this.getTemplate('familiada-template');
			window.familiada = this;

		},
		loadData: function () {
			return $.ajax({
				dataType: "json",
				url: "http://familiada.pkowalczyk.devel.180hb.com/php/sheet.php",
				success: _.bind(function(data){
					//this.game = this.game.set(data);
					//console.log(data);
					this.trigger('dataLoaded', data);
				}, this)
			});	
		},
		render: function () {
			this.renderPreGame();
		},
		renderPreGame: function () {
			this.$scene.html(this.template({}));
		},
		renderAdmin: function () {
			this.adminView.render();
			this.$scene.html('');
			this.$scene.append(this.adminView.el);
		},
		renderGame: function () {
			this.gameView.render();
		},
        start: function () {
			this.on('dataLoaded', _.bind(this._start, this));

			this.game = new GameModel();

			this.gameView = new GameView({
				game: this.game
			});

			this.gameView.openWindow();

			var pointsAView = new PointsView({
				template: 'admin-points-template',
				model: this.game.get('teamA')
			});

			var pointsBView = new PointsView({
				template: 'admin-points-template',
				model: this.game.get('teamB')
			});

			var chanceAView = new ChanceView({
				template: 'admin-chance-template',
				model: this.game.get('teamA')
			});

			var chanceBView = new ChanceView({
				template: 'admin-chance-template',
				model: this.game.get('teamB')
			});

			var questionView = new QuestionView({
				template: 'admin-question-template',
				game: this.game
			})

			var teamAView = new TeamView({
				template: 'admin-team-template',
				model: this.game.get('teamA'),
				game: this.game
			});

			var teamBView = new TeamView({
				template: 'admin-team-template',
				model: this.game.get('teamB'),
				game: this.game
			});

			var roundView = new RoundView({
				template: 'admin-round-template',
				//model: this.game.get('teamB'),
				game: this.game
			});

			this.adminView = new GameView({
				template: 'admin-game-template',
				game: this.game,
				pointsAView: pointsAView,
				pointsBView: pointsBView,
				chanceAView: chanceAView,
				chanceBView: chanceBView,
				questionView: questionView,
				teamAView: teamAView,
				teamBView: teamBView,
				roundView: roundView
			});

			this.loadData();
        },
		_start: function (data) {

			this.game.setRounds(data);

			this.renderGame();
			this.renderAdmin();

			this.game.start();

		}
		
	}, Backbone.Events);

	return FamiliadaView;

});