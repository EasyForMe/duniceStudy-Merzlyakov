$(function() {

	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};
	window.template = function(id) {
		return _.template($('#' +id).html());
	};

	App.Models.Todo = Backbone.Model.extend({
		initialize: function() {
			console.log('Hello MAZAFAKERI!!');
		},
		defaults: {
			count: 1,
			name: "Stepan"
		}
	});

	App.Views.Todo = Backbone.View.extend({
		template: template('taskTemplate'),
		initialize: function() {
			this.model.on('change', this.render, this);
		},
		tagName: 'span',
		className: 'text',
		id: '22',
		render: function() {
			var template = this.template(this.model.toJSON());
			this.$el.html( template );
			return this;
		},
		events: {
			'click .but': 'schet'
		},
		schet: function() {
			var all = this.model.get('count')+1;
			this.model.set('count', all, {validate:true});
			this.model.set('name', 'JORA');
			var todos = this.model.attributes;
   			localStorage.setItem('todos', todos);
   			return false;
		}
	});

	window.todo = new App.Models.Todo;
	window.todoView = new App.Views.Todo({model:todo});

	$('.main').append(todoView.render().el);

	$('.clear').click( function() {
	window.localStorage.clear();
	//location.reload();
	return false;
	});
});