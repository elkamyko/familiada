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
		events: {
			'click .answer': 'chooseAnswer',
			'click .invalid-answer': 'chooseInvalidAnswer'
		},

		chooseAnswer: function (e) {
			var round = this.game.get('currentRound');

			if (!round) return false;

			var question = round.get('currentQuestion');

			if (!question) return false;

			this.game.chooseAnswer(question.get('answers').get({cid: $(e.target).attr('data-cid')}));
		},
		chooseInvalidAnswer: function () {
			this.game.chooseInvalidAnswer();
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
			var answers = [];
			question.get('answers').each(function (answer) {
				var data = answer.toJSON();
				data.cid = answer.cid;
				answers.push(data);
			});
			data.answers = answers;
			//data.cid = question.cid;

			this.$el.html(this.getTemplate()(data));
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return QuestionView;

});