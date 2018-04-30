describe AuthController do
  describe "GET #verify" do
    let (:provider) { "google" }
    let (:access_token) { "test access_token" }

    def do_request
      post :verify, params: { provider: provider, access_token: access_token, format: :json }
    end

    it 'validates the access_token' do
      expect(GoogleOauthClient).to receive(:verify_code).with(access_token).once
      do_request
    end

    context 'when the token is valid' do
      before do
        allow(GoogleOauthClient).to receive(:verify_code).and_return(true)
      end

      it 'responds true' do
        do_request
        body = JSON.parse(response.body)
        expect(body['valid_token']).to eq(true)
      end
    end

    context 'when the token is invalid' do
      before do
        allow(GoogleOauthClient).to receive(:verify_code).and_raise(GoogleOauthClient::AuthError.new("Invalid token"))
      end

      it 'creates an error response' do
        do_request

        body = JSON.parse(response.body)
        expect(response.status).to eq(400)
        expect(body['error']).to eq("Invalid token")
      end
    end
  end
end
