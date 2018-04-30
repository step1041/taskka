describe ApplicationController do
  controller do
    before_action :authorize
    def index; end
  end

  before do
    routes.draw do
      get 'index' => 'anonymous#index'
    end
  end

  describe '#authorize' do
    context "when there is no Authorization header" do
      before { request.headers["Authorization"] = nil }

      it "responds with a not authorized response" do
        get :index

        expect(response.status).to eq(401)
        expect(JSON.parse(response.body)["error"]).to eq("Not Authorized")
      end
    end

    context "when the Authorization is not Bearer" do
      before { request.headers["Authorization"] = "Basic ZXhhbXBsZTpleGFtcGxl" }

      it "responds with a not authorized response" do
        get :index

        expect(response.status).to eq(401)
        expect(JSON.parse(response.body)["error"]).to eq("Not Authorized")
      end
    end

    context "when the access_token doesn't match a user" do
      before { request.headers["Authorization"] = "Bearer Example-Token" }

      it "responds with a not authorized response" do
        get :index

        expect(response.status).to eq(401)
        expect(JSON.parse(response.body)["error"]).to eq("Not Authorized")
      end
    end

    context "when the access_token matches a user" do
      let (:user) { User.create() }

      before { request.headers["Authorization"] = "Bearer #{user.access_token}" }

      it "lets the action run" do
        expect(controller).to receive(:index)
        get :index
      end

      it "sets the current_user in the request env" do
        get :index
        expect(request.env["current_user"]).to eq(user)
      end
    end
  end
end