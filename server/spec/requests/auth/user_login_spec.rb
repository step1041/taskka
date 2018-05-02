describe "Request: User Login" do
  let (:access_code) { 'example access code' }
  let (:redirect_uri) { 'http://example.com/auth/callback' }
  let (:access_token) { 'example access token' }
  let (:google_id) { 'example google id' }

  context 'when the login is valid' do
    before do
      stub_google_token_valid(code: access_code, redirect_uri: redirect_uri, access_token: access_token)
      stub_google_tokeninfo_valid(access_token, user_id: google_id)
    end

    context 'when the user has logged in before' do
      let! (:user) { User.create(username: 'ExampleUser', google_id: google_id) }

      it "returns the correct response" do
        post '/auth/google/verify', params: { code: access_code, redirect_uri: redirect_uri }

        expect(response.status).to eq(200)
        expect(response.body).to eq({
          new_user: false,
          access_token: user.access_token,
          user: user
        }.to_json)
      end
    end

    context "when the user has not logged in before" do
      it "returns the correct response" do
        post '/auth/google/verify', params: { code: access_code, redirect_uri: redirect_uri }

        user = User.last

        expect(response.status).to eq(200)
        expect(response.body).to eq({
          new_user: true,
          access_token: user.access_token,
          user: user
        }.to_json)
      end
    end
  end

  context 'when the access code is invalid' do
    before do
      stub_google_token_error(code: access_code, redirect_uri: redirect_uri)
    end

    it "returns the correct response" do
      post '/auth/google/verify', params: { code: access_code, redirect_uri: redirect_uri }

      expect(response.status).to eq(400)
      expect(response.body).to eq({
        error: 'Invalid code'
      }.to_json)
    end
  end

  context 'when the access token is invalid' do
    before do
      stub_google_token_valid(code: access_code, redirect_uri: redirect_uri, access_token: access_token)
      stub_google_tokeninfo_error(access_token)
    end

    it "returns the correct response" do
      post '/auth/google/verify', params: { code: access_code, redirect_uri: redirect_uri }

      expect(response.status).to eq(400)
      expect(response.body).to eq({
        error: 'Invalid token'
      }.to_json)
    end
  end
end