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
    //idAttribute: "_id",
    url: "http://localhost:1337/login",
    defaults: {
      username: "",
      password: ""
    }
  });
  
  App.Views.Login = Backbone.View.extend({
    tagName: 'tr',
    template: template('todoli'),
    initialize: function() {
      this.model.on('all', this.render, this);
      this.model.on('destroy', this.remove, this);
    },
    events: {
      'click .gu': 'replace'
    },
    render: function() {
    var template = this.template(this.model.toJSON());
      this.$el.html( template );
      return this;
    },
    replace: function() {
      //console.log(this.model.url());
      // this.model.destroy();
       $('.gu' +Math.ceil(Math.random()*2)).append('<tr><td>'+this.model.get('username')+'</td></tr>');
    }
    });
  
  App.Collections.Login = Backbone.Collection.extend({
    model: App.Models.Login,
    url: "http://localhost:1337/log"
    });

  window.resultCol = new App.Collections.Login;
  
  App.Views.Result = Backbone.View.extend({
    el: $("#main"),
    initialize: function() {
      this.collection.on('add', this.addOne, this);
     // this.collection.on('change', this.restruct, this);
      this.collection.on('all', this.render, this);
      resultCol.fetch()
    },
    events: {
      "submit": "login"
    },
    addOne: function(log) {
      var logView = new App.Views.Login({model:log});
      $('#result').append(logView.render().el);
    },
    login: function (e) {
      var that = this;
      e.preventDefault();
      var uname = $(e.currentTarget).find('input[type=text]').val();
      var pass = $(e.currentTarget).find('input[type=password]').val();
      console.log(uname);
      console.log(pass);
      window.newLog = new App.Models.Login({'username': uname, 'password': pass});
      //this.collection.add(newLog);
      newLog.save({type: "22"}, {
      wait:true,
       success:function(model, response) {
        console.log('Successfully saved!');
        //that.trigger('login');
       },
        error: function(model, error) {
        console.log(model.toJSON());
        console.log('error.responseText');
      }
});
      //console.log(newLog.url());
      //console.log(newLog.id)
    }
    });
  
  window.logViews = new App.Views.Result({collection:resultCol});
});