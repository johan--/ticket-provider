class Account < ActiveRecord::Base
  has_many :organizers
  has_many :events

  validates :name, presence: true

  before_create :set_uid

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end
end
