class TicketStateMachine
  include Statesman::Machine

  state :new, initial: true
  state :sold
  state :refunded
  state :discarded

  transition from: :new, to: [:sold, :discarded]
  transition from: :sold, to: [:refunded, :discarded]
  transition from: :refunded, to: :discarded

  guard_transition(from: :new, to: :sold) do |ticket|
    ticket.user != nil
  end
end