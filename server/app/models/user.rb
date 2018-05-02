require 'securerandom'

class User < ApplicationRecord
  has_many :tasks

  before_create :generate_new_access_token, if: -> { !self.access_token }

  def generate_new_access_token
    self.access_token = SecureRandom.uuid
  end

  def new_user?
    return self.username.nil?
  end

  def provider_connected? (provider)
    case provider
      when "google"
        return self.google_id.present?
      else
        return false
    end
  end
end
