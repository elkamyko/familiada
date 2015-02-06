'use_strict';

define([
	'backbone',
	'underscore',
	'jquery',
	'window',
], function (
	Backbone,
	_,
	$,
	window
) {

	var TeamView = Backbone.View.extend({

		templateId: 'admin-team-view',
		pointsRendered: null,
		getTemplate: function (id) {
			var $templateScript = $('#' + (id || this.templateId));
			return _.template($templateScript.html());
		},
		events: {
			'click .activate-team': 'chooseTeam'
		},
		chooseTeam: function () {
			if (!this.game) return;
			this.game.chooseTeam(this.model);
		},
		initialize: function (opts) {
			opts = opts || {};
			this.game = opts.game;
			this.templateId = opts.template || this.templateId;
			this.model.on('change', _.bind(this.render, this));
		},
		render: function () {
			var data = this.model.toJSON()
			this.$el.html(this.getTemplate()(data));
		}

	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return TeamView;

});