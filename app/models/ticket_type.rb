class TicketType < ActiveRecord::Base
  belongs_to :activity
  has_many :tickets, dependent: :destroy

  validates :name, presence: true
  validates :activity, presence: true

  before_create :set_uid

  enum usage_type: %w(uncountable countable)

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end
end
