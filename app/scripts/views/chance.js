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

	var PointsView = Backbone.View.extend({

		templateId: 'board__points',
		
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
            //'click p': 'test'
		},
		initialize: function (team) {

		
		},
		render: function (isTeamA, pointsValue) {
			isTeamA ? this.pointsTeamA.text(pointsValue) : this.pointsTeamB.text(pointsValue);
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return PointsView;
	
});