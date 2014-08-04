$(function() {

  window.App = {
    Models: {},
    Views: {},
    Collections: {}
  };

  window.template = function(id) {
    return _.template($('#' +id).html());
  };

  App.Models.Login = Backbone.Model.extend({
    url: "http://localhost:1337/login",
    defaults: {
      Username: "",
      Password: ""
    }
  });
  
  App.Views.Login = Backbone.View.extend({
    el: $("li"),
    template: template('todoli'),
    initialize: function() {
      this.model.on('all', this.render, this);
    },

    login: function () {
      this.model.save({username: this.$el.find("#username"),
                password: this.$el.find("#password")}, {
                success: function () {
                    console.log("VSE HOROSHO");
                },
                error: function () {
                    console.log("Error 499");
                }
            });
        }  
    });
  
  App.Collections.Login = Backbone.Collection.extend({
    model: App.Models.Login,
    
    });
  window.resultCol = App.Collections.Login;
  
  App.Views.Result = Backbone.View.extend({
    el: $("#main"),
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      //this.collection.on('all', this.render, this);
      resultCol.fetch()
    },
    events: {
      "click #login": "login"
    },
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html( template );
      return this;
    },
    addOne: function(log) {
      var logView = new App.Views.Login({model:log});
      $('#result').append(logView.render().el);
    },
    login: function () {
      var newLog = new App.Models.Login({'username': this.$el.find("#username"), 'password': this.$el.find("#password")});
      this.collection.add(newLog);
      this.model.save();
        },
    })
  
  window.logViews = new App.Views.Result({collection:resultCol});
});