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
                console.log('zadzialalo');
        },
//		$scene: null,
		initialize: function (opts) {

            console.log(opts);

            this.pointsA = new PointsView({ 'points': 70 });
            this.pointsB = new PointsView();

            this.pointsA.render();

		},

        windowHanlder: null,
		render: function () {
            
            if (!this.windowHanlder) {
                this.windowHanlder = window.open(window.location.href + 'familiada-game');
                this.windowHanlder.onload = _.bind(function(){
                    $('body', this.windowHanlder.document).append(this.$el);    
                }, this);
            }
    
			var template = this.getTemplate(),
                    data = {};
			
            if (this.model) {
				_.extend(data, this.model.toJSON());
			}
                
			this.$el.html(template(data));

            console.log(template(data));
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return GameView;

});