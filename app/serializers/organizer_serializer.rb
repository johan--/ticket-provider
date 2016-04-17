class OrganizerSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :name,
             :role

  has_one :account

  def id
    object.uid
  end
end
