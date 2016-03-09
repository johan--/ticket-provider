class Event < ActiveRecord::Base
  include Statesman::Adapters::ActiveRecordQueries

  mount_uploader :cover_photo, CoverPhotoUploader

  belongs_to :account
  has_many :ticket_types, dependent: :destroy
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

  def update(params, state = nil)
    self.assign_attributes(params) if params.present?

    if state == nil
      self.update_attributes(params)
    else
      if !self.allowed_transitions.include?(state) && !self.valid?
        self.update_attributes(params)
        self.errors.add(:state, I18n.t('backend.events.cannot_transition_to', state: state))
      elsif self.valid? && !self.allowed_transitions.include?(state)
        self.errors.add(:state, I18n.t('backend.events.cannot_transition_to', state: state))
      elsif !self.valid?
        self.update_attributes(params)
      else
        self.update_attributes(params)
        self.transition_to(state)
      end
    end

    self.errors.blank?
  end

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
    :draft
  end
end
