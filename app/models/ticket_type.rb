class TicketType < ActiveRecord::Base
  belongs_to :event
  has_many :tickets

  validates :name, presence: true
  validates :event, presence: true

  before_create :set_uid

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end
end
