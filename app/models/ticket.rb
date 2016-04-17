class Ticket < ActiveRecord::Base
  include Statesman::Adapters::ActiveRecordQueries

  belongs_to :ticket_type
  belongs_to :user
  has_many :ticket_transitions, autosave: false

  validates :ticket_type, presence: true
  validate :ticket_user, if: :user

  before_create :set_uid
  before_destroy -> { false }, if: :user_id?
  after_create :update_price

  def state_machine
    @state_machine ||= TicketStateMachine.new(self, transition_class: TicketTransition)
  end

  delegate :can_transition_to?, :transition_to!, :transition_to, :current_state, :allowed_transitions,
           to: :state_machine

  def update_price
    self.price = self.ticket_type.current_price
    self.save
  end

  private

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end

  def self.transition_class
    TicketTransition
  end

  def self.initial_state
    :new
  end

  def ticket_user
    if self.user.tickets.map { |m| m.ticket_type.activity_id }.include? self.ticket_type.activity_id
      errors.add(:user, I18n.t('backend.tickets.ticket_user_error'))
    end
  end
end
