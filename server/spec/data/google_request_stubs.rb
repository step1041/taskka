def stub_google_tokeninfo_valid(access_token, user_id: "example-user-id")
  stub_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
    .with(
      query: { access_token: access_token }
    )
    .to_return(
      status: 200,
      headers: {
        "Content-Type" => "application/json"
      },
      body: {
        aud: Rails.application.secrets.GOOGLE_CLIENT_ID,
        expires_in: 3600,
        scope: 'scopes',
        sub: user_id,
      }.to_json
    )
end

def stub_google_tokeninfo_error(access_token, error: 'invalid_token')
  stub_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
    .with(
      query: { :access_token => access_token }
    )
    .to_return(
      status: 400,
      headers: {
        "Content-Type" => "application/json"
      },
      body: {
        error: error
      }.to_json
    )
end

def stub_google_tokeninfo_invalid_aud(access_token, user_id: "example-user-id")
  stub_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
    .with(
      query: { access_token: access_token }
    )
    .to_return(
      status: 200,
      headers: {
        "Content-Type" => "application/json"
      },
      body: {
        aud: "unexpected client id",
        expires_in: 3600,
        scope: 'scopes',
        sub: user_id,
      }.to_json
    )
end

def stub_google_token_valid(
  code: "google auth code",
  redirect_uri: "http://example.com/auth/callback",
  access_token: "Google Access Token"
)
  stub_request(:post, "https://www.googleapis.com/oauth2/v4/token")
    .with(
      headers: {
        'Content-Type' => 'application/x-www-form-urlencoded',
      },
      body: {
        client_id: Rails.application.secrets["GOOGLE_CLIENT_ID"],
        client_secret: Rails.application.secrets["GOOGLE_CLIENT_SECRET"],
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri
      }
    )
    .to_return(
      status: 200,
      headers: {
        "Content-Type" => "application/json"
      },
      body: {
        access_token: access_token,
        expires_in: 3600,
        token_type: "Bearer"
      }.to_json
    )
end

def stub_google_token_error(
  code: "google auth code",
  redirect_uri: "http://example.com/auth/callback",
  error: "Invalid Token"
)
  stub_request(:post, "https://www.googleapis.com/oauth2/v4/token")
    .with(
      headers: {
        'Content-Type' => 'application/x-www-form-urlencoded',
      },
      body: {
        client_id: Rails.application.secrets["GOOGLE_CLIENT_ID"],
        client_secret: Rails.application.secrets["GOOGLE_CLIENT_SECRET"],
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri
      }
    )
    .to_return(
      status: 200,
      headers: {
        "Content-Type" => "application/json"
      },
      body: {
        error: error,
      }.to_json
    )
end