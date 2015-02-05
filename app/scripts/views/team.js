'use_strict';

define([
	'models/team',
	'backbone',
    'underscore',
	'jquery'
], function (
	TeamModel,
	Backbone,
    _,
    $
) {

	var TeamView = Backbone.View.extend({
//		tagName: 'li',
//		className: 'list-group-item clearfix',
        
		events: {
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
		
		initialize: function (opts) {
			opts = opts || {};
			this.game = opts.game;
			this.templateId = opts.template || this.templateId;
		},
		render: function () {
			var data = PlaceModel.prototype.defaults, template = this.getTemplate();

			if (this.model) {
				_.extend(data, this.model.toJSON());
			}

			if (!data.address_for_google) data.address_for_google = data.address;

			this.$el.html(template(data));

		}
		
	}, {
//		template: null,
//		geocodingResultTemplate: null
	});

	return TeamView;

});