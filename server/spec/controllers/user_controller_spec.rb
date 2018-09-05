describe UserController do
  describe "GET #view" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :view
    end

    context "when authorized" do
      let(:user) { FactoryBot.create(:user) }

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
      let(:user) { FactoryBot.create(:user) }

      before { authorize_user(user) }

      it "does not allow updating the current user's access_token" do
        patch :update, params: { user: { access_token: "new token" } }
        user.reload
        expect(user.access_token).not_to eq("new token")
      end

      it "allows updating the current user's name" do
        patch :update, params: { user: { username: "NewUsername" } }
        user.reload
        expect(user.username).to eq("NewUsername")
      end

      it "allows updating the current user's working day dates" do
        patch :update, params: { user: {
          current_working_day: Date.today,
          last_working_day: Date.yesterday,
        } }
        user.reload
        expect(user.current_working_day).to eq(Date.today)
        expect(user.last_working_day).to eq(Date.yesterday)
      end
    end
  end

  describe "POST #new_day" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      post :new_day
    end

    context "when authorized" do
      let(:user) { FactoryBot.create(:user) }

      before { authorize_user(user) }

      it 'triggers a new working day for the current user' do
        expect_any_instance_of(User).to receive(:new_working_day).and_call_original

        post :new_day
      end

      it "returns the updated user" do
        post :new_day

        body = JSON.parse(response.body)
        user_json = body["user"]
        expect(Date.parse(user_json["current_working_day"])).to eq(Date.today)
      end
    end
  end
end
