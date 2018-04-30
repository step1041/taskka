def google_mock_valid_token(user_id: "foobar")
  return {
    status: 200,
    :headers => {
      "Content-Type" => "application/json"
    },
    body: {
      aud: Rails.application.secrets.GOOGLE_CLIENT_ID,
      expires_in: 3600,
      scope: 'scopes',
      user_id: user_id,
    }.to_json
  }
end

def google_mock_invalid_token()
  return {
    status: 400,
    :headers => {
      "Content-Type" => "application/json"
    },
    body: {
      error: 'invalid_token'
    }.to_json
  }
end

def google_mock_invalid_aud(user_id: "foobar")
  return {
    status: 200,
    :headers => {
      "Content-Type" => "application/json"
    },
    body: {
      aud: "unexpected client id",
      expires_in: 3600,
      scope: 'scopes',
      user_id: user_id,
    }.to_json
  }
end