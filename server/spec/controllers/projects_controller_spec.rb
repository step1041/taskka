describe ProjectsController do
  describe "GET #index" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :index
    end
  end



  context "when authorized" do
    let(:user) { User.create() }

    before { authorize_user(user) }

    context "when the user has no projects" do
      before { user.projects = [] }

      it "returns an empty array" do
        get :index

        body = JSON.parse(response.body)
        expect(body["projects"]).to eq([])
      end
    end

    context "when the user has projects" do
      before do
        user.projects.create(name: 'Example Project 1')
        user.projects.create(name: 'Example Project 2')
        user.projects.create(name: 'Example Project 3')
      end

      it "returns an empty array" do
        get :index

        body = JSON.parse(response.body)
        expect(body["projects"]).to eq(JSON.parse(user.projects.to_json))
      end
    end

    context "when another user has projects" do
      let! (:other_user) { User.create(username: "OtherUser") }
      let! (:other_project) { other_user.projects.create(name: 'Other Project') }

      it "does not return other user's projects" do
        get :index

        body = JSON.parse(response.body)
        expect(body["projects"]).not_to include(JSON.parse(other_project.to_json))
      end
    end
  end
end
