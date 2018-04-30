def authorize_user(user)
  request.headers["Authorization"] = "Bearer #{user.access_token}"
end