class AccountSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :api_token

  def id
    object.uid
  end
end
