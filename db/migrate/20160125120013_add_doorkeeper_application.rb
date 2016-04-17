class AddDoorkeeperApplication < ActiveRecord::Migration
  def up
    case Rails.env
      when 'production'
        redirect_uri         = ENV['REDIRECT_URI']

        origin_uid           = ENV['ORIGIN_UID']
        origin_secret        = ENV['ORIGIN_SECRET']
        android_uid          = ENV['ANDROID_UID']
        android_secret       = ENV['ANDROID_SECRET']
      else
        redirect_uri         = 'https://localhost:3000/callback'

        origin_uid           = '065f4885f56888e8646e867bc7299236be3786d27f3d915aa7ded697a212ba1aa51baf7980e926e931e431d3e9b28ddf32c6d90ad23efc0a354c84f0ba6f94a5'
        origin_secret        = '59d451ef53403e92962157507ba15f9aac058629ff6ce7648b1c3ab824666daa39cdbe7471604f57e6a426abe26073599055b47df74a29cd5e77e3553f0791c0'
        android_uid          = '4064788ee2734e308df2dff6cf4272b7e17628b676fca559a6a27d0191094de6268c06c6d55e30b0a3703201af4fe5ab382d85fb6fb9df03c03090a56d72c229'
        android_secret       = '1db7337754f206dc0eba0d860503229abd8cb7e29054d086292f6e50d3f1046deb2be7262159ffec8b5fc245dea97d6dee3ded54ec555c681cdb9cc4c09e9efa'
    end

    Doorkeeper::Application.create(name: 'origin', uid: origin_uid, secret: origin_secret, redirect_uri: redirect_uri)
    Doorkeeper::Application.create(name: 'android', uid: android_uid, secret: android_secret, redirect_uri: redirect_uri)
  end

  def down
    Doorkeeper::Application.destroy_all
  end
end
