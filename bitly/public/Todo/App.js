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
    urlRoot: 'http://localhost:1337/todos'
    defaults: {
      title: "TI JE NICHO NE NAPISAL!!",
      done: false
    },
    initialize: function() {
      if (!$.trim(this.get("title"))) {
        this.set({"title": this.defaults.title});
      }
    },
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  App.Views.Todo = Backbone.View.extend({
    tagName: 'li',
    template: template('todoli'),
    className: 'lil',

    initialize: function() {
      this.model.on('destroy', this.remove, this);
      this.model.on('all', this.render, this);
    },
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html( template );
      if(this.model.get('done')) {
        this.$el.addClass("checked");
      }
      else {
        this.$el.removeClass("checked");
      }
      return this;
    },
    events: {
      'click .edit': 'edit',
      'click .del': 'del',
      'click .check': 'check'
    },
   del: function() {
     this.model.destroy();
    },
    edit: function() {
      var editTodo = prompt('CHO MENYAEM?', this.model.get('title'));
      this.model.set('title', editTodo);
      this.model.save();
    },
    check: function() {
      this.$el.toggleClass("checked");
      this.model.toggle();
    }

  });

  App.Collections.Todo = Backbone.Collection.extend({
    model: App.Models.Todo,
    localStorage: new Store("todos")

  });
  window.todoCollection = new App.Collections.Todo;

  App.Views.All = Backbone.View.extend({

    el: '#main',
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      this.collection.on('all', this.render, this);
      todoCollection.fetch()
    },
    events: {
      'submit' : 'sub',
      'click .checkall' : 'checkall',
      'click .delcheck' : 'delcheck',
      'click .todoDone' : 'todoDone',
      'click .todoUndone' : 'todoUndone',
      'click .todoAll' : 'todoAll'
    },
    render: function() {
      if(this.collection.length) {
        $('.butoni').show();
      }
      else {
        $('.butoni').hide();
      }
    },
    sub: function(e) {
      e.preventDefault();
      var todoit = $(e.currentTarget).find('input[type=text]').val();
      var newTodo = new App.Models.Todo({'title': todoit});
      this.collection.add(newTodo);
      newTodo.save();
    },
    addOne: function(todo) {
      var todoView = new App.Views.Todo({model:todo});
      $('.spisok').append(todoView.render().el);
    },
    checkall: function(){
    var noDone = this.collection.where({done: false});
    var oDone = this.collection.where({done: true});
    if(this.collection.length == oDone.length) {
      _.each(oDone, function(model) {
    model.toggle(); });
    }
      else {
    _.each(noDone, function(model) {
    model.toggle(); });
  };
    },
    delcheck: function() {
      var red = this.collection.where({done: true});
    _.each(red, function(model) {
    model.destroy(); });
    },
    todoDone: function() {
        $('li').hide();
        $('.checked').show();
    },
    todoUndone: function() {
        $('li').show();
        $('.checked').hide();
    },
    todoAll: function() {
      $('li').show();
    }

  });

  window.todoViews = new App.Views.All({collection:todoCollection});
  

});