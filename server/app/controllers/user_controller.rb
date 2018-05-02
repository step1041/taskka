class UserController < ApplicationController
  before_action :authorize

  def view
    user = request.env["current_user"]
    render json: { user: user }
  end

  def update
    attributes = params.permit(user: [ :username ])["user"]
    user = request.env["current_user"]

    user.update_attributes(attributes)
    user.save

    render json: { user: user }
  end
end
