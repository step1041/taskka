class UserController < ApplicationController
  before_action :authorize

  def view
    render json: { user: current_user }
  end

  def update
    attributes = params.permit(user: [ :username, :last_working_day, :current_working_day ])["user"]

    current_user.update_attributes(attributes)
    current_user.save

    render json: { user: current_user }
  end
end
