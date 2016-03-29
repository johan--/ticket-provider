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
          can :manage, Organizer, id: user.id
          can :manage, Account, id: user.account_id
          can :manage, Activity, account: user.account
          can :manage, TicketType, activity_id: user.account.activity_ids
          can :manage, Ticket, ticket_type: { activity_id: user.account.activity_ids }
        elsif user.role == 'team_member'
          can [:read, :create, :update], Account, id: user.account_id
          can [:read, :create, :update], Activity, account: user.account
          can [:read, :create, :update], TicketType, activity_id: user.account.activity_ids
          can :manage, Ticket, ticket_Type: { activity_id: user.account.activity_ids }
        end
      else
        can :manage, User, id: user.id
        can :read, Activity
        can :read, TicketType
        can [:read, :update], Ticket, user: user
    end
  end
end
