#
# Module dependencies
#
mongoose = require 'mongoose'
_ = require 'underscore'

User = mongoose.model 'User'

#
# Show login form
#
exports.login = (req, res) ->
  res.render 'users/login',
    title: 'Login'
    message: req.flash 'error'
  return

exports.signup = (req, res) ->
  if req.user
   res.render 'layout'
  else
   res.render 'users/signup',
    title: 'Sign Up'
    message: req.flash 'error'
   return

#
# Logout
#
exports.logout = (req, res) ->
  req.logout()
  res.redirect '/'
  return

#
# List users
#
exports.index = (req, res) ->
  User.list (err, users) ->
    res.render 'users/index',
      users: users
      message: req.flash 'notice'
    return

#
# Display new user form
#
exports.new = (req, res) ->
  res.render 'users/new',
    user: new User({})
  return

#
# Create user
#
exports.create = (req, res) ->
  pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
  mail = req.body.email
  if pattern.test(mail)
    user = new User req.body
    user.save (err) ->
      if err
        res.render 'users/new',
          errors: err.errors
          user: user

      res.redirect '/users'
      return
  else
    req.flash 'error', 'EMAIL NEVALIDEN!'
    res.redirect '/'
  return
  
#
# Find user by id
#
exports.user = (req, res, next, id) ->
  User.findById(id).exec (err, user) ->
    return next err if err
    return next new Error 'Failed to load user' if not user
        
    req.profile = user
    next()
    return
  return

#
# Show edit form for users
#
exports.edit = (req, res) ->
  res.render 'users/edit',
    user: req.profile
  return

#
# Update user
#
exports.update = (req, res) ->
  user = req.profile

  user.name = req.body.name
  user.username = req.body.username
  user.email = req.body.email

  user.password = req.body.password if req.body.password

  pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
  mail = req.body.email
  if pattern.test(mail)
    user.save (err) ->
      if err
        console.log err
        
        res.render 'users/edit',
          user: user
          errors: err.errors
      else
        req.flash 'notice', 'User was successfully updated'
        res.redirect '/users'
      return
  else
    req.flash 'notice', 'EMAIL NEVALIDEN!'
    res.redirect '/users'
  return

exports.newvk = (req, res) ->
  user = new User({
    name: req.user.name
    surname: req.user.surname
    social: req.user.social
    email: "asd@asd.asd"
    username: req.user.username
    password: "1111"
    })
  user.save (err, res) ->
    if !err
      console.log "ALESHKA ZAHODIT"
  user._id = req.user._id
  res.redirect "/"

###
# Delete user
#
exports.destroy = (req, res) ->
  user = req.profile
  
  user.remove (err) ->
    req.flash 'notice', 'User ' + user.name + ' was successfully deleted.'
    res.redirect '/users'

  return
###