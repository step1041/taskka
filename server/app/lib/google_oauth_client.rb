require 'jsonclient'

class GoogleOauthClient
  GOOGLE_ENDPOINT = "https://www.googleapis.com/oauth2/v3/tokeninfo"

  def self.verify_code(access_token)
    url = "#{GOOGLE_ENDPOINT}?access_token=#{access_token}"
    res = JSONClient.get(url)
    google_data = res.body

    if google_data['error'] || google_data["aud"] != Rails.application.secrets.GOOGLE_CLIENT_ID
      raise AuthError.new("Invalid token")
    end

    return true
  end

  class AuthError < StandardError
  end
end

