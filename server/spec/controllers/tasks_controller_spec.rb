describe TasksController do
  describe "GET #index" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :index
    end

    context "when authorized" do
      let(:user) { User.create() }

      before { authorize_user(user) }

      it "returns http success" do
        get :index
        expect(response).to have_http_status(204)
      end
    end
  end

  describe "GET #view" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :view, params: { :id => 1 }
    end

    context "when authorized" do
      let(:user) { User.create() }

      before { authorize_user(user) }

      it "returns http success" do
        get :view, params: { :id => 1 }
        expect(response).to have_http_status(204)
      end
    end
  end

  describe "GET #update" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      patch :update, params: { :id => 1 }
    end

    context "when authorized" do
      let(:user) { User.create() }

      before { authorize_user(user) }

      it "returns http success" do
        patch :update, params: { :id => 1 }
        expect(response).to have_http_status(204)
      end
    end
  end

end
