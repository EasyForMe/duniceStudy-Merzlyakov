mongoose = require 'mongoose'
User = mongoose.model('User')
passport = require 'passport'

LocalStrategy = require('passport-local').Strategy
VKStrategy = require('passport-vkontakte').Strategy

module.exports = (passport) ->

  # Serialize sessions
  passport.serializeUser (user, done) ->
    done(null, user)
  
  passport.deserializeUser (obj, done) ->
    done(null, obj)

  passport.use "vk", new VKStrategy(
    clientID: '4473532'
    clientSecret: 't5uB5beQ0cvi7EVmvrlk'
    callbackURL: "http://localhost:3000/auth/vk/callback"
  , (accessToken, refreshToken, profile, done) ->
    
    done null,
      name: profile.name.givenName
      username: profile.username
      #_id: profile.id
      surname: profile.name.familyName
  )
  # Define the local auth strategy
  passport.use new LocalStrategy (username, password, done) ->
    User.findOne username: username, (err, user) ->
      if err
        return done err
      if !user
        return done null, false, message: 'Unknown user'
      
      user.comparePassword password, (err, isMatch) ->
        if err
          return done err
        if isMatch
          return done null, user
        else
          return done null, false, message: 'Invalid password'
      
      return
    return
  return

  