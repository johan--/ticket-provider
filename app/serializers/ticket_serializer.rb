class TicketSerializer < ActiveModel::Serializer
  attributes :id,
             :ticket_type_name,
             :ticket_type_image_url,
             :activity_name,
             :activity_date,
             :row,
             :column,
             :price,
             :state,
             :usage_quantity

  def id
    object.uid
  end

  def ticket_type_name
    object.ticket_type.name
  end

  def ticket_type_image_url
    object.ticket_type.activity.cover_photo.url
  end

  def activity_name
    object.ticket_type.activity.name
  end

  def activity_date
    object.ticket_type.activity.date
  end

  def state
    object.current_state
  end
end
