def google_mock_valid_token(userid="foobar")
  return {
    status: 200,
    :headers => {
      "Content-Type" => "application/json"
    },
    body: {
      aud: Rails.application.secrets.GOOGLE_CLIENT_ID,
      expires_in: 3600,
      scope: 'scopes',
      userid: userid,
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

def google_mock_invalid_aud(userid="foobar")
  return {
    status: 200,
    :headers => {
      "Content-Type" => "application/json"
    },
    body: {
      aud: "unexpected client id",
      expires_in: 3600,
      scope: 'scopes',
      userid: userid,
    }.to_json
  }
end