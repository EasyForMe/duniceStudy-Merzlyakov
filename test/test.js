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
    defaults: {
      title: "TI JE NICHO NE NAPISAL!!",
      done: false,
      //order: todoCollection.nextOrder()
    },
    initialize: function() {
      if (!$.trim(this.get("title"))) {
        this.set({"title": this.defaults.title});
      }
    },
    toggle: function() {
      this.save({done: !this.get('done')});
    },
    clear: function() {
      this.destroy();
    }
  });
  //var Todo = new App.Models.Todo;

  App.Views.Todo = Backbone.View.extend({
    tagName: 'li',
    template: template('todoli'),

    initialize: function() {
      this.model.on('destroy', this.remove, this);
      //this.model.on('change', this.render, this);
      this.model.bind('change', this.render, this);
    },
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html( template );
      return this;
    },
    events: {
      'click .edit': 'edit',
      'click .del': 'clear',
      "click .check"   : "toggleDone"
    },
   // del: function() {
     // this.model.destroy();
    //},
    edit: function() {
      var editTodo = prompt('CHO MENYAEM?', this.model.get('title'));
      this.model.set('title', editTodo);
      this.model.save();
    },
    toggleDone: function() {
      this.model.toggle();
    },
    clear: function() {
      this.model.clear();
    }

  });

  App.Collections.Todo = Backbone.Collection.extend({
    model: App.Models.Todo,
    localStorage: new Store("todos")

  });
  var todoCollection = new App.Collections.Todo;

  App.Views.All = Backbone.View.extend({

    el: '#main',
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      this.collection.on('remove', this.render, this);
      todoCollection.fetch()
    },
    events: {
      'submit' : 'sub',
      'click .delall' : 'delall'
    },
    render: function() {
       console.log('CHTOTO');
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
    delall: function() {
      this.collection.reset();
      localStorage.clear();
    }

  });

  window.todoViews = new App.Views.All({collection: todoCollection});
  

});