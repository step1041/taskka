describe ProjectsController do
  describe "GET #index" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :index
    end
  end

  context "when authorized" do
    let(:user) { FactoryBot.create(:user) }

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
      before { FactoryBot.create_list(:project, 3, :owner => user) }

      it "returns an empty array" do
        get :index

        body = JSON.parse(response.body)
        expect(body["projects"]).to eq(JSON.parse(user.projects.to_json))
      end
    end

    context "when another user has projects" do
      let! (:other_user) { FactoryBot.create(:user) }
      let! (:other_project) { FactoryBot.create(:project, :owner => other_user) }

      it "does not return other user's projects" do
        get :index

        body = JSON.parse(response.body)
        expect(body["projects"]).not_to include(JSON.parse(other_project.to_json))
      end
    end
  end
end
