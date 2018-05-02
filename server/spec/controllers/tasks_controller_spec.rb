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
        expect(response).to have_http_status(200)
      end

      context "when the user has no tasks" do
        before { user.tasks = [] }

        it "returns an empty array" do
          get :index

          body = JSON.parse(response.body)
          expect(body["tasks"]).to eq([])
        end
      end

      context "when the user has tasks" do
        before do
          user.tasks.create(name: "Example task 1")
          user.tasks.create(name: "Example task 2")
          user.tasks.create(name: "Example task 3")
        end

        it "returns an empty array" do
          get :index

          body = JSON.parse(response.body)
          expect(body["tasks"]).to eq(JSON.parse(user.tasks.all.to_json))
        end
      end
    end
  end

  describe "PUT #create" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      get :view, params: { :id => 1 }
    end

    context "when authorized" do
      let(:user) { User.create() }

      before { authorize_user(user) }

      it "creates a new task" do
        expect {
          put :create, params: { task: {
            name: "Example Task"
          } }
        }.to change { Task.count }.by(1)
      end

      it "sets the correct name on the new task" do
        expect {
          put :create, params: { task: {
            name: "Example Task"
          } }
        }.to change { Task.count }.by(1)

        task = Task.last
        expect(task.name).to eq("Example Task")
      end

      it "responds with the new task" do
        put :create, params: { task: {
          name: "Example Task"
        } }

        expect(response.status).to eq(201)

        task = Task.last
        body = JSON.parse(response.body)
        expect(body["task"]).to eq(JSON.parse(task.to_json))
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
