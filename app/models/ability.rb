class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    case user
      when Organizer
        if user.role == 'god'
          can :manage, :all
          can :access, :rails_admin
        elsif user.role == 'account_owner'
          can :manage, Account, id: user.account_id
          can :manage, Event, account: user.account
          can :manage, TicketType, event_id: user.account.event_ids
          can :manage, Ticket, ticket_type: { event_id: user.account.event_ids }
        elsif user.role == 'team_member'
          can [:read, :create, :update], Account, id: user.account_id
          can [:read, :create, :update], Event, account: user.account
          can [:read, :create, :update], TicketType, event_id: user.account.event_ids
          can :manage, Ticket, ticket_Type: { event_id: user.account.event_ids }
        end
      else
        can :read, Event, Event.in_state(:sold)
        can :read, TicketType
        can [:read, :update], Ticket, user: user
    end
  end
end
