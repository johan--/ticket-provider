class AccountSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description

  def id
    object.uid
  end
end
