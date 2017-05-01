class User < ApplicationRecord
  has_many :gardens
  has_many :plants, through: :gardens
  validates_uniqueness_of :email, :case_sensitive => false, :with => /.+@.+\..+/i
  has_secure_password
end
