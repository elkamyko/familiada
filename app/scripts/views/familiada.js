'use_strict';

define([
	'models/game',
    'views/game',
	'views/admin',
	'backbone',
    'underscore',
	'jquery'
], function (
	GameModel,
    GameView,
	AdminView,
	Backbone,
    _,
    $
) {

	var FamiliadaView = Backbone.View.extend({
//		tagName: 'li',
//		className: 'list-group-item clearfix',
        templateId: 'familiada-template',
		el: 'body',
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
			'click #familiada-start-button': 'start'
//			'change .address-for-google': 'setModelAddressForGoogle',
//			'keyup .address-for-google': 'setModelAddressForGoogle',
//
//			'blur .custom-lat': 'setModelCustomLocation',
//			'change .custom-lat': 'setModelCustomLocation',
//			'keyup .custom-lat': 'setModelCustomLocation',
//
//			'blur .custom-lng': 'setModelCustomLocation',
//			'change .custom-lng': 'setModelCustomLocation',
//			'keyup .custom-lng': 'setModelCustomLocation',
//
//			'click .geocoding-result li button': 'stopEventPropagation',
//			'click .geocoding-result li input': 'stopEventPropagation',
//			'click .geocoding-result li label': 'stopEventPropagation',
//			'click .geocoding-result li': 'selectLocation',
//
//			'change .geocoding-result input[type="radio"]': 'locationSelected',
//
//			'click .save': 'saveLocation',
//
//			'click .geocoding-trigger': 'geocode',
//
//			'click .show-on-map': 'showOnMap',
//
//			'click .from-map': 'fromMap'

		},
		$scene: null,
		initialize: function (opts) {
            this.$scene = this.$('#scene');
            //this.$scene.append(this.$el);
            this.gameView = new GameView();
            this.adminView = new AdminView();

			this.game = new GameModel();

			this.template = this.getTemplate('familiada-template');

		},
		loadData: function () {
			return $.ajax({
				dataType: "json",
				url: "http://familiada.pkowalczyk.devel.180hb.com/php/sheet.php",
				success: _.bind(function(data){
					this.gameData = data;
					this.game = new GameModel(data);

					this.trigger('dataLoaded');
				}, this)
			});	
		},
		render: function () {
			this.renderPreGame();
		},
		renderPreGame: function () {
			this.$scene.html(this.template({}));
		},
		renderAdmin: function () {
			this.adminView.render();
			this.$scene.html('');
			this.$scene.append(this.adminView.el);
		},
		renderGame: function () {
			this.gameView.render();
		},
        start: function () {
			this.renderGame();
			this.renderAdmin();
        }
		
	}, Backbone.Events);

	return FamiliadaView;

});