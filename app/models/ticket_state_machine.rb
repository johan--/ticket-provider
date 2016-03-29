class TicketStateMachine
  include Statesman::Machine

  state :new, initial: true
  state :enter
  state :exit
  state :refunded
  state :discarded

  transition from: :new, to: [:enter, :discarded]
  transition from: :enter, to: [:exit, :refunded, :discarded]
  transition from: :exit, to: [:enter, :refunded, :discarded]
  transition from: :refunded, to: :discarded

  guard_transition(from: :new, to: :enter) do |ticket|
    ticket.user != nil
  end

  guard_transition(from: :exit, to: :enter) do |ticket|
    (ticket.usage_quantity - 1) >= 0 && ticket.ticket_type.usage_type == 'countable'
  end

  before_transition(from: :exit, to: :enter) do |ticket|
    if ticket.ticket_type.usage_type == 'countable'
      ticket.usage_quantity -= 1
      ticket.save
    end
  end
end