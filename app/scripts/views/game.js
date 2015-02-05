'use_strict';

define([
//	'models/place',
	'backbone',
    'underscore',
	'jquery',
    'window',
    'views/points'
], function (
//	PlaceModel,
	Backbone,
    _,
    $,
    window,
    PointsView
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
            'click p': 'test'
		},
        test: function () {
//            alert('dpa');
                console.log('zadzialalo');
        },
//		$scene: null,
        game: null,
		initialize: function (opts) {
            this.game = opts.game;
            
            this.pointsTeamA = new PointsView({
                model: this.game.get('teamA')
            });

            this.pointsTeamB = new PointsView({
                model: this.game.get('teamB')
            });

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

            this.$('#board').append(this.pointsTeamA.el);
            this.$('#board').append(this.pointsTeamB.el);
            this.pointsTeamA.render();
            this.pointsTeamB.render();
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return GameView;

});