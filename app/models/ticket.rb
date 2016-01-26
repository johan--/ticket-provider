class Ticket < ActiveRecord::Base
  include Statesman::Adapters::ActiveRecordQueries

  belongs_to :ticket_type
  belongs_to :user
  has_many :ticket_transitions, autosave: false

  validates :ticket_type, presence: true

  before_create :set_uid
  before_destroy -> { false }, if: :user_id?

  def state_machine
    @state_machine ||= TicketStateMachine.new(self, transition_class: TicketTransition)
  end

  delegate :can_transition_to?, :transition_to!, :transition_to, :current_state, :allowed_transitions,
           to: :state_machine

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
end
