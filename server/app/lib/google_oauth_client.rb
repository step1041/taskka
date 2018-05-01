require 'httpclient'

class GoogleOauthClient
  TOKEN_ENDPOINT = "https://www.googleapis.com/oauth2/v4/token"
  TOKENINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v3/tokeninfo"

  def self.get_access_token(code, redirect_uri)
    url = TOKEN_ENDPOINT
    client = HTTPClient.new

    data = {
      code: code,
      client_id: Rails.application.secrets["GOOGLE_CLIENT_ID"],
      client_secret: Rails.application.secrets["GOOGLE_CLIENT_SECRET"],
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }

    res = client.post(url, data)
    google_data = JSON.parse(res.body)

    if google_data['error']
      raise AuthError.new("Invalid token")
    end

    return google_data["access_token"]
  end

  def self.get_user_id(access_token)
    client = HTTPClient.new

    res = client.get("#{TOKENINFO_ENDPOINT}?access_token=#{access_token}")
    token_info = JSON.parse(res.body)

    if token_info['error'] || token_info['aud'] != Rails.application.secrets["GOOGLE_CLIENT_ID"]
      raise AuthError.new("Invalid token")
    end

    return token_info["sub"]
  end

  class AuthError < StandardError
  end
end

