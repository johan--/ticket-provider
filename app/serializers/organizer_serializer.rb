class OrganizerSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :name,
             :role

  def id
    object.id
  end
end
