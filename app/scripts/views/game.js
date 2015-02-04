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
        templateId: 'familiada-black-board-tpl',
        getTemplate: function (id) {
            var $templateScript = $('#' + (id || this.templateId));
            return _.template($templateScript.html());
        },
		events: {
            'click p': 'test'
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