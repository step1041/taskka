class AuthController < ApplicationController
  def verify
    code = params[:code]
    redirect_uri = params[:redirect_uri]

    begin
      access_token = GoogleOauthClient.get_access_token(code, redirect_uri)
      google_id = GoogleOauthClient.get_user_id(access_token)
    rescue GoogleOauthClient::AuthError => e
      return render :json => { error: e.message }, status: 400
    end

    user = User.find_or_create_by(google_id: google_id) do |user|
      user.google_id = google_id
      user.google_token = access_token
    end

    render :json => {
      new_user: user.new_user?,
      access_token: user.access_token,
      user: user,
    }
  end
end
