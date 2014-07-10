$(function() {

	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};

	window.template = function(id) {
		return _.template($('#' +id).html());
	};

	App.Models.Task = Backbone.Model.extend({
		defaults: {
			priority: 4
		},
		initialize: function() {
			//this.save();
		},
		validate: function(attrs) {
			if(! $.trim(attrs.title)) {
			return 'NUJNO IMYA!';
			console.log('DA TI CHO!');
			}
		}
	});
	App.Views.Task = Backbone.View.extend ({
		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		tagName: 'li',
		template: template('taskTemplate'),
		render: function() {
			var template = this.template(this.model.toJSON());
			this.$el.html( template );
			return this;
		},
		events: {
			'click .edit': 'editTask',
			'click .del': 'delTask'
		},
		editTask: function() {
			var newTaskQ = prompt('KAAAK?', this.model.get('title'));
			this.model.set('title', newTaskQ, {validate:true});
			this.model.save();
		},
		delTask: function() {
			this.model.destroy();
		}
	});

	App.Views.Add = Backbone.View.extend({
		el: '#add',
		events: {
			'submit': 'submit'
		},
		submit: function(e) {
			e.preventDefault();
			//var pr = prompt('Введите приоритетность задачи');
			var Taskit = $(e.currentTarget).find('input[type=text]').val();
			var newTask = new App.Models.Task({'title': Taskit});
			this.collection.add(newTask);
			newTask.save();
		}
	});

	App.Collections.Task = Backbone.Collection.extend({
		model: App.Models.Task,
		localStorage: new Store("todos"),
		//add.save()
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',
		initialize: function() {
			this.collection.on('add', this.addOne, this);
			tasksCollection.fetch();
		},
		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(task) {
			var taskView = new App.Views.Task({model:task});
			this.$el.append(taskView.render().el);
		}
		
	});
	
	var tasksCollection = new App.Collections.Task([
	{
		title: 'убить человеков',
		priority: 10
	},
	{
		title: 'съесть банан',
		priority: 9
	},
	{
		title: 'посмотреть прогноз погоды',
		priority: 5
	},
	{
		title: 'дружить с хорьками',
		priority: 8
	},
	]);
	
	var tasksView = new App.Views.Tasks({collection:tasksCollection});

	$('.task').html(tasksView.render().el);

	var add = new App.Views.Add({collection:tasksCollection});

});