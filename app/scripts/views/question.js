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

	var QuestionView = Backbone.View.extend({

		templateId: 'board__question',
		pointsRendered: null,
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		initialize: function (opts) {
			opts = opts || {};
			this.game = opts.game;
			this.templateId = opts.template || this.templateId;

			var thisRender = _.bind(this.render, this);

			this.game.on('change:currentRound', _.bind(function () {
				var round = this.game.get('currentRound');
				if (!round) return;
				round.on('change:currentQuestion', _.bind(function () {
					thisRender();
					round.get('questions').each(_.bind(function (question) {
						question.get('answers').each(_.bind(function (answer) {
							answer.on('change:revealed', thisRender);
						}, this));
					}, this));
				}, this));
			}, this));
			//this.game.get('rounds').each(function (round) {
			//	round.on('change:currentQuestion', thisRender);
			//});

			/*this.model.on('change:points', _.bind(this.render, this));*/

		},
		render: function () {
			var round = this.game.get('currentRound');

			if (!round) return;

			var question = round.get('currentQuestion');

			if (!question) return;

			var data = question.toJSON();
			data.answers = data.answers.toJSON();

			this.$el.html(this.getTemplate()(data));
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return QuestionView;

});