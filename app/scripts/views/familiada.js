'use_strict';

define([
	'models/place',
    'views/game',
	'backbone',
    'underscore',
	'jquery'
], function (
//	PlaceModel,
    GameView,
	Backbone,
    _,
    $
) {

	var FamiliadaView = Backbone.View.extend({
//		tagName: 'li',
//		className: 'list-group-item clearfix',
        templateId: 'familiada-template',
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
			'click #familiada-start-button': 'start',
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
            this.$scene = $('#scene');
            this.$scene.append(this.$el);
            this.gameView = new GameView();
		},
		render: function () {
			var template = this.getTemplate(),
                    data = {};
			
            if (this.model) {
				_.extend(data, this.model.toJSON());
			}
                
			this.$el.html(template(data));
		},
        start: function () {
            this.gameView.render();
        }
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return FamiliadaView;

});