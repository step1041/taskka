describe AuthController do
  describe "GET #verify" do
    let (:provider) { "google" }
    let (:redirect_uri) { "http://example/auth/google/callback" }
    let (:access_code) { "test access_code" }
    let (:access_token) { "test access_token" }
    let (:google_id) { "google user id"}

    before do
      allow(GoogleOauthClient).to receive(:get_access_token).and_return(access_token)
      allow(GoogleOauthClient).to receive(:get_user_id).and_return(google_id)
    end

    def do_request
      post :verify, params: {
        provider: provider,
        code: access_code,
        redirect_uri: redirect_uri,
        format: :json
      }
    end

    it 'attempts to get an access_token' do
      expect(GoogleOauthClient).to receive(:get_access_token).with(access_code, redirect_uri).once
      do_request
    end

    context 'when the access code is invalid' do
      before { allow(GoogleOauthClient).to receive(:get_access_token).and_raise(GoogleOauthClient::AuthError.new("Invalid code")) }

      it 'creates an error response' do
        do_request

        body = JSON.parse(response.body)
        expect(response.status).to eq(400)
        expect(body['error']).to eq("Invalid code")
      end
    end

    it 'validates the access_token' do
      expect(GoogleOauthClient).to receive(:get_user_id).with(access_token).once
      do_request
    end

    context 'when the access token is valid' do
      let (:google_id) {'example google id'}

      before do
        allow(GoogleOauthClient).to receive(:get_user_id).and_return(google_id)
      end

      context 'when the user does not exist' do
        it 'creates the user' do
          expect { do_request }.to change{ User.count }.by(1)
        end

        it 'responds that the user is new' do
          do_request
          body = JSON.parse(response.body)
          expect(body['new_user']).to eq(true)
        end

        it "responds with the user's data" do
          do_request
          user = User.last
          body = JSON.parse(response.body)
          expect(body['user']).to eq(JSON.parse(user.to_json))
        end
      end

      context 'when the user already exists' do
        let! (:user) { User.create(username: 'ExampleUser', google_id: google_id) }

        it 'does not create a new user' do
          expect { do_request }.not_to change{ User.count }
        end

        it 'responds that the user is not new' do
          do_request
          body = JSON.parse(response.body)
          expect(body['new_user']).to eq(false)
        end

        it "responds with the user's data" do
          do_request
          body = JSON.parse(response.body)
          expect(body['user']).to eq(JSON.parse(user.to_json))
        end
      end
    end

    context 'when the access token is invalid' do
      before do
        allow(GoogleOauthClient).to receive(:get_user_id).and_raise(GoogleOauthClient::AuthError.new("Invalid token"))
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
