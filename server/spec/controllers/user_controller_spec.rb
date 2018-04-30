describe UserController do
  describe "GET #current_user" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :current_user
    end

    context "when authorized" do
      let (:user) { User.create(username: "ExampleUser") }

      before { authorize_user(user) }

      it "returns http success" do
        get :current_user
        expect(response).to have_http_status(200)
      end

      it "returns data about the user" do
        get :current_user

        body = JSON.parse(response.body)
        expect(body["username"]).to eq(user.username)
        expect(body["access_token"]).to eq(user.access_token)
      end

      describe "user's connections" do
        context "when connected to google" do
          before do
            user.google_id = "example google id"
            user.save!
          end

          it "is listed as true" do
            get :current_user

            body = JSON.parse(response.body)
            expect(body["connections"]["google"]).to eq(true)
          end
        end

        context "when not connected to google" do
          before do
            user.google_id = nil
            user.save!
          end

          it "is listed as false" do
            get :current_user

            body = JSON.parse(response.body)
            expect(body["connections"]["google"]).to eq(false)
          end
        end
      end
    end
  end
end
