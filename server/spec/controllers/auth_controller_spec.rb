describe AuthController do
  describe "GET #get_user_id" do
    let (:provider) { "google" }
    let (:access_token) { "test access_token" }

    def do_request
      post :verify, params: { provider: provider, access_token: access_token, format: :json }
    end

    it 'validates the access_token' do
      expect(GoogleOauthClient).to receive(:get_user_id).with(access_token).once
      do_request
    end

    context 'when the token is valid' do
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

        it "responds with the user's access token" do
          do_request
          body = JSON.parse(response.body)
          expect(body['access_token']).to eq(user.access_token)
        end
      end
    end

    context 'when the token is invalid' do
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
