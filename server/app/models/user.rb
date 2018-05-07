require 'securerandom'

class User < ApplicationRecord
  has_many :projects, foreign_key: 'owner_id'

  before_create :generate_new_access_token, if: -> { !self.access_token }
  after_create :create_default_project

  def generate_new_access_token
    self.access_token = SecureRandom.uuid
  end

  def create_default_project
    self.projects.create(name: 'default')
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

  def tasks
    return self.projects.first.tasks
  end
end
