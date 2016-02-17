class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :name,
             :birthdate
end
