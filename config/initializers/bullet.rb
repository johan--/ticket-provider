if defined? Bullet
  Bullet.enable = true
  Bullet.alert = true
  Bullet.bullet_logger = true
  Bullet.console = true
  Bullet.add_footer = true
  Bullet.rails_logger = true
  Bullet.raise = true

  Bullet.add_whitelist type: :unused_eager_loading, class_name: 'TicketType', association: :activity
end