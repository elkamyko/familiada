'use_strict';

define([
	'models/game',
    'views/game',
	'backbone',
    'underscore',
	'jquery'
], function (
	GameModel,
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
			'click #familiada-start-button': 'start'

		},
		$scene: null,
		initialize: function (opts) {

            this.$scene = $('#scene');
            this.$scene.append(this.$el);
            this.gameView = new GameView();
            this.gameData = null;
            
            $.ajax({
                dataType: "json",
                url: "http://familiada.pkowalczyk.devel.180hb.com/php/sheet.php",
                success: _.bind(function(data){
                    this.gameData = data;
                    this.game = new GameModel(this.gameData);
                    
                    this.trigger('dataLoaded');
                }, this)
            });

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
		
	}, Backbone.Events);

	return FamiliadaView;
});