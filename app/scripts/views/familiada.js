'use_strict';

define([
	'models/game',
    'views/game',
	'views/admin',
	'backbone',
    'underscore',
	'jquery',
	'window'
], function (
	GameModel,
    GameView,
	AdminView,
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

			this.loadData();
        },
		_start: function (data) {

			this.game.setRounds(data);

			this.adminView = new AdminView({
				game: this.game
			});

			this.renderGame();
			this.renderAdmin();

			this.game.start();

		}
		
	}, Backbone.Events);

	return FamiliadaView;

});