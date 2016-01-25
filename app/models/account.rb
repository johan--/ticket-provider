class Account < ActiveRecord::Base
  has_many :organizers

  validates :name, presence: true
end
