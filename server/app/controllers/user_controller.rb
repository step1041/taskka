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

  def new_day
    current_user.new_working_day

    render json: { user: current_user }
  end
end
