'use_strict';

define([
//	'models/place',
	'backbone',
    'underscore',
	'jquery',
    'window',
    'views/points',
    'views/chance',
    'views/question'
], function (
//	PlaceModel,
	Backbone,
    _,
    $,
    window,
    PointsView,
    ChanceView,
    QuestionView
) {

	var GameView = Backbone.View.extend({
//		tagName: 'li',
//		className: 'list-group-item clearfix',
        templateId: 'familiada-black-board-tpl',
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
            //'click p': 'test'
		},
        game: null,
		initialize: function (opts) {
            opts = opts || {};
            this.game = opts.game;
            this.templateId = opts.template || this.templateId;

            this.teamAView = opts.teamAView || null;
            this.teamBView = opts.teamBView || null;
            this.roundView = opts.roundView || null;

            this.pointsAView = opts.pointsAView || new PointsView({ model: this.game.get('teamA') });
            this.pointsBView = opts.pointsBView || new PointsView({ model: this.game.get('teamB') });
            this.chanceAView = opts.chanceAView || new ChanceView({ model: this.game.get('teamA') });
            this.chanceBView = opts.chanceBView || new ChanceView({ model: this.game.get('teamB') });
            this.questionView = opts.questionView || new QuestionView({ game: this.game });

		},
        windowHanlder: null,

        openWindow: function () {
            if (!this.windowHanlder) {
                this.windowHanlder = window.open(window.location.href + 'familiada-game');
                this.windowHanlder.onload = _.bind(function(){
                    //console.log('window on load');
                    $('body', this.windowHanlder.document).append(this.$el);
                }, this);
            }
        },

		render: function () {

			var template = this.getTemplate(),
                    data = {};
			
            if (this.model) {
				_.extend(data, this.model.toJSON());
			}
                
			this.$el.html(template(data));

            this.$('.points-a-view').append(this.pointsAView.el);
            this.$('.points-b-view').append(this.pointsBView.el);
            this.$('.question-view').append(this.questionView.el);
            this.$('.chance-a-view').append(this.chanceAView.el);
            this.$('.chance-b-view').append(this.chanceBView.el);

            this.pointsAView.render();
            this.pointsBView.render();

            this.chanceAView.render();
            this.chanceBView.render();

            this.questionView.render();

            if (this.teamAView) this.$('.team-a-view').append(this.teamAView.el);
            if (this.teamBView) this.$('.team-b-view').append(this.teamBView.el);
            if (this.roundView) this.$('.round-view').append(this.roundView.el);

            if (this.teamAView) this.teamAView.render();
            if (this.teamBView) this.teamBView.render();
            if (this.roundView) this.roundView.render();
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return GameView;

});