class OrganizerSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :name,
             :role

  def id
    object.uid
  end
end
