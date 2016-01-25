class Ticket < ActiveRecord::Base
  belongs_to :ticket_type
  belongs_to :user

  validates :ticket_type, presence: true

  before_create :set_uid

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end
end
