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
		initialize: function (team) {

			this.model.on('change:chances', _.bind(this.render, this));

		},
		render: function (domElement) {

			var template = this.getTemplate(),
                    data = {};
			
            if (this.model) {
				_.extend(data, this.model.toJSON());
			}

			this.$el.html(this.getTemplate()(this.model.toJSON()));
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return ChanceView;

});