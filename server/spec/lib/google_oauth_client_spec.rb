describe GoogleOauthClient do
  describe '::verify_code' do
    let(:access_token) { "Example access token" }

    before do
      stub_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
        .with(query: { :access_token => access_token })
        .to_return(google_mock_valid_token)
    end

    it 'checks the token is valid' do
      GoogleOauthClient::verify_code(access_token)

      expect(
        a_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
          .with(query: { :access_token => access_token })
      ).to have_been_made.once
    end

    context 'when the token is valid' do
      before do
        stub_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
          .with(query: { :access_token => access_token })
          .to_return(google_mock_valid_token)
      end

      it 'responds true' do
        expect(GoogleOauthClient::verify_code(access_token)).to eq(true)
      end
    end

    context 'when the token is invalid' do
      before do
        stub_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
          .with(query: { :access_token => access_token })
          .to_return(google_mock_invalid_token)
      end

      it 'raises an error' do
        expect{GoogleOauthClient::verify_code(access_token)}
          .to raise_error(GoogleOauthClient::AuthError, "Invalid token")
      end
    end

    context 'when the token is for another google client' do
      before do
        stub_request(:get, "https://www.googleapis.com/oauth2/v3/tokeninfo")
          .with(query: { :access_token => access_token })
          .to_return(google_mock_invalid_aud)
      end

      it 'raises an error' do
        expect{GoogleOauthClient::verify_code(access_token)}
          .to raise_error(GoogleOauthClient::AuthError, "Invalid token")
      end
    end
  end
end