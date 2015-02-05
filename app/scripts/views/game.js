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

            this.pointsAView = opts.pointsAView || new PointsView({ model: this.game.get('teamA') });
            this.pointsBView = opts.pointsBView || new PointsView({ model: this.game.get('teamB') });
            this.chanceAView = opts.chanceAView || new ChanceView({ model: this.game.get('teamA') });
            this.chanceBView = opts.chanceBView || new ChanceView({ model: this.game.get('teamB') });
            this.questionView = opts.QuestionView || new QuestionView({ game: this.game });

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

            this.$('#board').append(this.pointsAView.el);
            this.$('#board').append(this.pointsBView.el);
            this.$('#board .board__question__wrapper').append(this.questionView.el);
            this.$('#board .board__validation--left .validation__wrapper').append(this.chanceAView.el);
            this.$('#board .board__validation--right .validation__wrapper').append(this.chanceBView.el);

            this.pointsAView.render();
            this.pointsBView.render();

            this.chanceAView.render();
            this.chanceBView.render();

            this.questionView.render();
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return GameView;

});