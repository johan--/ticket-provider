class AddDoorkeeperApplication < ActiveRecord::Migration
  def up
    case Rails.env
      when "production"
        redirect_uri         = "https://ticket-provider-staging.herokuapp.com/callback"

        origin_uid           = "132f2ad79126e9326560deb6aa84d630f79a0b711ff57edd2d4c17ce1ff094986b89ca75ddf93d9437feaed3ce85b47b7e95dd2e1cd624b29e09bf0bba80b12e"
        origin_secret        = "32c6c14d4ebbbe8354f3606a6093976b90646e655671eab0695b9aa5e19401fe54bcccd37035d1390e9d7105658ca03199903eddd5baab403c2b986350300b88"
        android_uid          = "44b6fefe5d2ddaab7dd6c1dad66369ffb0660623606af9b5578f64e8a2d23f640f465be02c8662d79373f13ca2b4e78bae0de669b2abd8d171ba09757ddf0c87"
        android_secret       = "757fd049a6f178e0ce945e6dd7850c068222b574c88f2651674cd74e8f78382bee28f4aa98865e8e33cf535fc8006a9b5fa9408d8333d999691240f5043df04f"
      when "staging"
        redirect_uri         = "https://ticket-provider-staging.herokuapp.com/callback"

        origin_uid           = "23c55d7d0f5a6cd5678da2d5021fcbb37dbcf6e61ab4742dd539718801d34348318fb34c75bbf27af3df408405ce63a1b4e447a632f8a4660bae44c201987970"
        origin_secret        = "29f77c90003e9b7d256776471de4f647e6be63eefaa1fd9331152662fa21ee40b258132dbe22e4424883061089559c3e76b7efd2f532de14998836aa40ebdfa1"
        android_uid          = "9fccdcf70516329fab62bdcfe3708f15b489b75529f825249ccd0221514c0be673add27313a2e15445669090c06c86e2ffd015b2080429cc365428a580b187ea"
        android_secret       = "9c544954e11defa519dfd9945a13e9535cb2c9af5ed9c7770c18f5ada7fd1ee5e3c268b9633520e71afb9a4fd105cb91f220ac5333a621a190c2fa49e876b9f1"
      else
        redirect_uri         = "https://localhost:3000/callback"

        origin_uid           = "065f4885f56888e8646e867bc7299236be3786d27f3d915aa7ded697a212ba1aa51baf7980e926e931e431d3e9b28ddf32c6d90ad23efc0a354c84f0ba6f94a5"
        origin_secret        = "59d451ef53403e92962157507ba15f9aac058629ff6ce7648b1c3ab824666daa39cdbe7471604f57e6a426abe26073599055b47df74a29cd5e77e3553f0791c0"
        android_uid          = "4064788ee2734e308df2dff6cf4272b7e17628b676fca559a6a27d0191094de6268c06c6d55e30b0a3703201af4fe5ab382d85fb6fb9df03c03090a56d72c229"
        android_secret       = "1db7337754f206dc0eba0d860503229abd8cb7e29054d086292f6e50d3f1046deb2be7262159ffec8b5fc245dea97d6dee3ded54ec555c681cdb9cc4c09e9efa"
    end

    Doorkeeper::Application.create(name: 'origin', uid: origin_uid, secret: origin_secret, redirect_uri: redirect_uri)
    Doorkeeper::Application.create(name: 'android', uid: android_uid, secret: android_secret, redirect_uri: redirect_uri)
  end

  def down
    Doorkeeper::Application.destroy_all
  end
end
