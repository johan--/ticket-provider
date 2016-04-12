class Activity < ActiveRecord::Base
  mount_uploader :cover_photo, CoverPhotoUploader

  belongs_to :account
  has_many :ticket_types, dependent: :destroy

  validates :name, presence: true
  validates :account, presence: true

  before_create :set_uid

  default_scope { order('date DESC') }

  def available_tickets
    self.ticket_types.map(&:available_tickets).inject(0, :+)
  end

  def all_tickets
    self.ticket_types.map(&:all_tickets).inject(0, :+)
  end

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end
end
