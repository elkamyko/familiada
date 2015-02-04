'use strict';

require.config({
	baseUrl: 'scripts',
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		window: {
			exports: 'window'
		}
	},
	paths: {
		backbone: '../../bower_components/backbone/backbone',
		bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
		jquery: '../../bower_components/jquery/dist/jquery',
		requirejs: '../../bower_components/requirejs/require',
		underscore: '../../bower_components/underscore/underscore',
		'backbone-paginator': '../../bower_components/backbone.paginator/lib/backbone.paginator',
		async: '../../bower_components/requirejs-plugins/src/async',
		'backbone.paginator': '../../bower_components/backbone.paginator/lib/backbone.paginator',
		depend: '../../bower_components/requirejs-plugins/src/depend',
		font: '../../bower_components/requirejs-plugins/src/font',
		goog: '../../bower_components/requirejs-plugins/src/goog',
		image: '../../bower_components/requirejs-plugins/src/image',
		json: '../../bower_components/requirejs-plugins/src/json',
		mdown: '../../bower_components/requirejs-plugins/src/mdown',
		noext: '../../bower_components/requirejs-plugins/src/noext',
		propertyParser: '../../bower_components/requirejs-plugins/src/propertyParser',
		'Markdown.Converter': '../../bower_components/requirejs-plugins/lib/Markdown.Converter',
		text: '../../bower_components/requirejs-plugins/lib/text'
	},
	packages: [

	]
});


require([
	'views/familiada',
	'jquery',
	'underscore'
], function (
	FamiliadaView,
	$,
    _
	) {

	var mainView;

	_.templateSettings = {
		escape: /\{\{=(.+?)\}\}/g,
		evaluate: /\{\{%(.+?)\}\}/g,
		interpolate: /\{\{(?!=|%)(.+?)\}\}/g
	};

	var familiadaView = new FamiliadaView({
		//el: $('body')
	});
	familiadaView.render();
	console.log('familiada has landed');

});