passport = require 'passport'
module.exports = (app, passport, auth) ->
  
  # User routes
  users = require '../app/controllers/users'
  app.get '/login', users.login
  app.get '/', users.signup
  app.post '/login', passport.authenticate('local',
    failureRedirect: '/login'
    failureFlash: true),

    (req, res) ->
      res.redirect '/'
      return


  app.get '/logout', users.logout
  
  app.get '/users', users.index
  app.get '/users/new', users.new
  app.post '/',  users.create
  app.get '/users/:userId/edit', auth.requiresLogin, users.edit
  app.put '/users/:userId', auth.requiresLogin, users.update
  #app.get '/users/:userId/destroy', auth.requiresLogin, users.destroy
  app.get "/auth/vk", passport.authenticate("vk",
   scope: ["friends"]
  ), 
  (req, res) ->

  app.get "/auth/vk/callback", passport.authenticate("vk",
  failureRedirect: "/login"
  ), (req, res) ->
    req.user
    users.newvk(req, res)
    return

  app.param 'userId', users.user

  # Article routes
  articles = require '../app/controllers/articles'
  app.get '/', articles.index
  app.get '/articles', articles.manage
  app.get '/articles/new', auth.requiresLogin, articles.new
  app.get '/articles/:articleId', articles.show
  app.post '/articles', auth.requiresLogin, articles.create
  app.get '/articles/:articleId/edit', auth.requiresLogin, articles.edit
  app.put '/articles/:articleId', auth.requiresLogin, articles.update
  app.get '/articles/:articleId/destroy', auth.requiresLogin, articles.destroy

  app.param 'articleId', articles.article

  return