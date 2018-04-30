class AuthController < ApplicationController
  def verify
    access_token = params[:access_token]

    begin
      user_id = GoogleOauthClient.get_user_id(access_token)
    rescue GoogleOauthClient::AuthError => e
      return render :json => { error: e.message }, status: 400
    end

    user = User.find_or_create_by(google_id: user_id) do |user|
      user.google_token = access_token
    end

    render :json => {
      new_user: user.new_user?,
      access_token: user.access_token,
    }
  end
end
