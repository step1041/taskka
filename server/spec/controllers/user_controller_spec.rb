describe UserController do
  describe "GET #view" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :view
    end

    context "when authorized" do
      let (:user) { User.create(username: "ExampleUser") }

      before { authorize_user(user) }

      it "returns http success" do
        get :view
        expect(response).to have_http_status(200)
      end

      it "returns data about the user" do
        get :view

        body = JSON.parse(response.body)
        user_json = body["user"]
        expect(user_json["username"]).to eq(user.username)
        expect(user_json["access_token"]).to eq(user.access_token)
      end
    end
  end

  describe "PATCH #update" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :view
    end

    context "when authorized" do
      let (:user) { User.create }

      before { authorize_user(user) }

      context "when a username is given" do
        it "updates the current user's name" do
          patch :update, params: { user: { username: "NewUsername"} }
          user.reload
          expect(user.username).to eq("NewUsername")
        end
      end
    end
  end
end
