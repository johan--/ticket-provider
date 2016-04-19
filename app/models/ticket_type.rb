class TicketType < ActiveRecord::Base
  belongs_to :activity
  has_many :tickets, dependent: :destroy

  validates :name, presence: true
  validates :activity, presence: true

  before_create :set_uid
  after_update :set_ticket_price, if: :current_price_changed?

  enum usage_type: %w(uncountable countable)

  def available_tickets
    self.tickets.in_state(:new).where(user: nil).count
  end

  def all_tickets
    self.tickets.count
  end

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end

  def set_ticket_price
    self.tickets.where(user: nil).map(&:update_price)
  end
end
