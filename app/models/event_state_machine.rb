class EventStateMachine
  include Statesman::Machine

  state :draft, initial: true
  state :publish
  state :closed

  transition from: :draft, to: [:publish]
  transition from: :publish, to: [:draft, :closed]
end