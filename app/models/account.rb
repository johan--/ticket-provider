class Account < ActiveRecord::Base
  has_many :organizers
  has_many :activities

  validates :name, presence: true

  before_create :set_uid, :set_api_token

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end

  def set_api_token
    begin
      self.api_token = SecureRandom.urlsafe_base64
    end while (self.class.exists?(api_token: api_token))
  end
end
