class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :name,
             :birthdate

  def id
    object.uid
  end
end
