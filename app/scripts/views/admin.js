'use_strict';

define([
//	'models/place',
	'backbone',
    'underscore',
	'jquery',
    'window',
], function (
//	PlaceModel,
	Backbone,
    _,
    $,
    window
) {

	var AdminView = Backbone.View.extend({
//		tagName: 'li',
//		className: 'list-group-item clearfix',
        templateId: 'admin-template',
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
            //'click p': 'test'
			'click #admin-teamA': 'activateTeam',
			'click #admin-teamB': 'activateTeam'
		},
		game: null,
		initialize: function (opts) {
			this.game = opts.game;
//            this.$scene = $('#scene');
//            this.$scene.append(this.$el);
		},
		render: function () {

			var template = this.getTemplate(),
                    data = {};

			data.teamA = this.game.get('teamA').toJSON();
			data.teamB = this.game.get('teamB').toJSON();

            //if (this.model) {
			//	_.extend(data, this.model.toJSON());
			//}
                
			this.$el.html(template(data));
		},
		activateTeam: function (e) {
			console.log(e);
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return AdminView;

});