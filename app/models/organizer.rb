class Organizer < ActiveRecord::Base

  ROLES = %i(god account_owner team_member)

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :account

  before_create :set_default_role, :set_uid

  validates :name, presence: true

  private

  def set_default_role
    self.role = 'account_owner' unless self.role
  end

  def set_uid
    begin
      self.uid = SecureRandom.hex(4)
    end while (self.class.exists?(uid: self.uid))
  end
end
