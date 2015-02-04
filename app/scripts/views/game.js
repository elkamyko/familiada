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

	var GameView = Backbone.View.extend({
//		tagName: 'li',
//		className: 'list-group-item clearfix',
        templateId: 'game-template',
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
            'click p': 'test'
//			'blur .address-for-google': 'setModelAddressForGoogle',
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
        test: function () {
//            alert('dpa');
                console.log('zadzialalo');
        },
//		$scene: null,
		initialize: function (opts) {
//            this.$scene = $('#scene');
//            this.$scene.append(this.$el);
		},
        windowHanlder: null,
		render: function () {
            
            if (!this.windowHanlder) {
                this.windowHanlder = window.open();
                $('body', this.windowHanlder.document).append(this.$el);
            }
            
			var template = this.getTemplate(),
                    data = {};
			
            if (this.model) {
				_.extend(data, this.model.toJSON());
			}
                
			this.$el.html(template(data));
		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return GameView;

});