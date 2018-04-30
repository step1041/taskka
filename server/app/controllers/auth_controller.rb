class AuthController < ApplicationController
  def verify
    access_token = params[:access_token]

    begin
      token_is_valid = GoogleOauthClient.verify_code(access_token)
    rescue GoogleOauthClient::AuthError => e
      return render :json => { error: e.message }, status: 400
    end

    render :json => { valid_token: token_is_valid }
  end
end
