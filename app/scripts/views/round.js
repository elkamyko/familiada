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

	var RoundView = Backbone.View.extend({

		templateId: 'admin-round-view',
		pointsRendered: null,
		getTemplate: function (id) {
			var $templateScript = $('#' + (id || this.templateId));
			return _.template($templateScript.html());
		},
		events: {
		},
		initialize: function (opts) {
			opts = opts || {};
			this.game = opts.game;
			this.templateId = opts.template || this.templateId;
			var thisRender = _.bind(this.render, this);
			//this.model.on('change', );
			this.game.on('change:currentRound', _.bind(function () {
				thisRender();
				var prevRound = this.game.previous('currentRound');
				if (prevRound) {
					prevRound.off('change:stage',thisRender);
				}
				var currentRound = this.game.get('currentRound');
				if (currentRound) {
					currentRound.on('change:stage', thisRender);
				}
			}, this));
		},
		render: function () {

			var round = this.game.get('currentRound');

			if (!round) return;
			var data = round.toJSON();
			data.number = this.game.get('rounds').indexOf(round) + 1;

			this.$el.html(this.getTemplate()(data));
		}

	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return RoundView;

});