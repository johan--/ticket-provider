class TicketStateMachine
  include Statesman::Machine

  state :new, initial: true
  state :enable
  state :disable
  state :refunded
  state :discarded

  transition from: :new, to: [:enable, :discarded]
  transition from: :enable, to: [:disable, :refunded, :discarded]
  transition from: :disable, to: [:enable, :refunded, :discarded]
  transition from: :refunded, to: :discarded

  guard_transition(from: :new, to: :enable) do |ticket|
    ticket.user != nil
  end
end