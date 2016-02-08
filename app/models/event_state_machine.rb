class EventStateMachine
  include Statesman::Machine

  state :Draft, initial: true
  state :Publish
  state :Closed

  transition from: :Draft, to: [:Publish]
  transition from: :Publish, to: [:Closed]
end