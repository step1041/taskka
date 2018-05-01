describe GoogleOauthClient do
  describe '::get_access_token' do
    let (:code) { "google auth code"}
    let (:redirect_uri) { "http://example.com/auth/callback" }
    let (:access_token) { "Example Google Access Token" }

    before { stub_google_token_valid(code: code, redirect_uri: redirect_uri, access_token: access_token) }

    it 'tries to obtain an access token' do
      GoogleOauthClient::get_access_token(code, redirect_uri)

      expect(stub_google_token_valid(code: code, redirect_uri: redirect_uri)).to have_been_made.once
    end

    context "when the response is valid" do
      it "returns the access token" do
        expect(GoogleOauthClient::get_access_token(code, redirect_uri)).to eq(access_token)
      end
    end

    context "when the response is an error" do
      before { stub_google_token_error(code: code, redirect_uri: redirect_uri) }

      it "raises an error" do
        expect{GoogleOauthClient::get_access_token(code, redirect_uri)}.to raise_error(GoogleOauthClient::AuthError)
      end
    end
  end

  describe '::get_user_id' do
    let(:access_token) { "Example access token" }

    before { stub_google_tokeninfo_valid(access_token) }

    it 'checks the token is valid' do
      GoogleOauthClient::get_user_id(access_token)

      expect(
        a_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
          .with(query: { :access_token => access_token })
      ).to have_been_made.once
    end

    context 'when the token is valid' do
      let (:google_id) { "Example google user id"}

      before { stub_google_tokeninfo_valid(access_token, user_id: google_id) }

      it "responds with the user's google id" do
        expect(GoogleOauthClient::get_user_id(access_token)).to eq(google_id)
      end
    end

    context 'when the token is invalid' do
      before { stub_google_tokeninfo_error(access_token) }

      it 'raises an error' do
        expect{GoogleOauthClient::get_user_id(access_token)}
          .to raise_error(GoogleOauthClient::AuthError, "Invalid token")
      end
    end

    context 'when the token is for another google client' do
      before { stub_google_tokeninfo_invalid_aud(access_token) }

      it 'raises an error' do
        expect{GoogleOauthClient::get_user_id(access_token)}
          .to raise_error(GoogleOauthClient::AuthError, "Invalid token")
      end
    end
  end
end