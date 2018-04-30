class UserController < ApplicationController
  before_action :authorize

  def current_user
    user = request.env["current_user"]

    data = {
      username: user.username,
      access_token: user.access_token,
      connections: {
        google: user.provider_connected?("google")
      }
    }

    render json: data
  end
end
