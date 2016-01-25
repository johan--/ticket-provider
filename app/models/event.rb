class Event < ActiveRecord::Base
  mount_uploader :cover_photo, CoverPhotoUploader

  belongs_to :account
  has_many :ticket_types

  validates :name, presence: true
  validates :account, presence: true

  before_create :set_uid

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end
end
