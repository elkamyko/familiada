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

	var ChanceView = Backbone.View.extend({

		templateId: 'board__chance',
		pointsRendered: null,
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		initialize: function (opts) {
			opts = opts || {};
			this.game = opts.game;
			this.templateId = opts.template || this.templateId;
			this.model.on('change:lostChances', _.bind(this.render, this));
		},
		render: function () {
			this.$el.html(this.getTemplate()(this.model.toJSON()));
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return ChanceView;

});