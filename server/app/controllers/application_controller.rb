class ApplicationController < ActionController::API
  class NotAuthorized < StandardError; end

  rescue_from ApplicationController::NotAuthorized, :with => :not_authorized

  def authorize
    if !request.headers["Authorization"]
      raise ApplicationController::NotAuthorized
    end

    type, access_token = request.headers["Authorization"].split(' ')
    if type != 'Bearer'
      raise ApplicationController::NotAuthorized
    end

    user = User.find_by_access_token(access_token)
    if !user
      raise ApplicationController::NotAuthorized
    end

    request.env["current_user"] = user
  end

  private

  def current_user
    return request.env["current_user"]
  end

  def not_authorized
    render json: { error: "Not Authorized" }, status: 401
  end
end
