class TicketType < ActiveRecord::Base
  belongs_to :event
  has_many :tickets

  validates :name, presence: true
  validates :event, presence: true

  before_create :set_uid, :set_default_seat_type

  enum seat_type: [:fix_seat, :non_fix_seat]

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end

  def set_default_seat_type
    self.seat_type = TicketType.seat_types[:fix_seat] unless self.seat_type
  end
end
