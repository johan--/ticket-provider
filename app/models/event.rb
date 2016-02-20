class Event < ActiveRecord::Base
  include Statesman::Adapters::ActiveRecordQueries

  mount_uploader :cover_photo, CoverPhotoUploader

  belongs_to :account
  has_many :ticket_types
  has_many :event_transitions, autosave: false

  validates :name, presence: true
  validates :account, presence: true

  before_create :set_uid

  default_scope { order('date DESC') }

  def state_machine
    @state_machine ||= EventStateMachine.new(self, transition_class: EventTransition)
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
    EventTransition
  end

  def self.initial_state
    :pending
  end
end
