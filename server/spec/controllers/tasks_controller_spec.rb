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

      it "does not render other user's tasks" do
        other_user = User.create
        other_user.tasks.create(name: "Other User's Task 1")
        other_user.tasks.create(name: "Other User's Task 2")
        other_user.tasks.create(name: "Other User's Task 3")

        get :index

        body = JSON.parse(response.body)
        expect(body["tasks"]).to eq([])
      end
    end
  end

  describe "POST #create" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      post :create
    end

    context "when authorized" do
      let(:user) { User.create() }
      let(:project) { user.default_project }
      let(:params) {{
        project_id: project.id,
        task: {
          name: "Example Task"
        }
      }}

      before { authorize_user(user) }

      it "creates a new task" do
        expect {
          post :create, params: params
        }.to change { Task.count }.by(1)
      end

      it "adds the task to the project" do
        post :create, params: params
        task = Task.last

        expect(user.tasks).to include(task)
      end

      it "sets the correct name on the new task" do
        expect {
          post :create, params: params
        }.to change { Task.count }.by(1)

        task = Task.last
        expect(task.name).to eq("Example Task")
      end

      it "responds with the new task" do
        post :create, params: params
        expect(response.status).to eq(201)

        task = Task.last
        body = JSON.parse(response.body)
        expect(body["task"]).to eq(JSON.parse(task.to_json))
      end
    end
  end

  describe "PATCH #update" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      patch :update, params: { :task_id => 1 }
    end

    context "when authorized" do
      let(:user) { User.create() }

      before { authorize_user(user) }

      context "when the task does not exist" do
        it "renders a 404 response" do
          patch :update, params: { :task_id => 1 }
          expect(response).to have_http_status(404)
        end
      end

      context "when the task belongs to another user" do
        let (:other_user) { User.create() }
        let (:project) { other_user.default_project }
        let (:task) { project.tasks.create(name: 'other task') }

        it "renders a 404 response" do
          patch :update, params: { :task_id => task.id }
          expect(response).to have_http_status(404)
        end
      end

      context "when the task belongs to the current user" do
        let (:project) { user.default_project }
        let (:task) { project.tasks.create(name: 'Example Task') }

        it "updates the task" do
          patch :update, params: { :task_id => task.id, task: { name: 'New name'}}

          task.reload
          expect(task.name).to eq("New name")
        end

        it "renders the updated task" do
          patch :update, params: { :task_id => task.id, task: { name: 'New name'}}

          task.reload
          body = JSON.parse(response.body)
          expect(body["task"]).to eq(JSON.parse(task.to_json))
        end
      end
    end
  end

  describe "DELETE #destroy" do
    it "calls authorize" do
      expect(controller).to receive(:authorize).and_call_original
      delete :destroy, params: { :task_id => 1 }
    end

    context "when authorized" do
      let(:user) { User.create() }

      before { authorize_user(user) }

      context 'when the task exists' do
        let (:project) { user.default_project }
        let! (:task) { project.tasks.create(:name => "Example task") }

        it 'deletes the task' do
          expect{ delete :destroy, params: { task_id: task.id } }.to change{Task.count}.by(-1)
        end

        it 'renders the deleted task' do
          delete :destroy, params: { task_id: task.id }

          body = JSON.parse(response.body)
          expect(body["task"]).to eq(JSON.parse(task.to_json))
        end
      end

      context 'when the task does not exist' do
        it "renders a 404 response" do
          delete :destroy, params: { :task_id => 1 }
          expect(response).to have_http_status(404)
        end
      end

      context 'when the task belongs to another user' do
        let (:other_user) { User.create }
        let (:project) { other_user.default_project }
        let (:task) { project.tasks.create(name: 'Other task') }

        it "renders a 404 response" do
          delete :destroy, params: { :task_id => task.id }
          expect(response).to have_http_status(404)
        end
      end
    end
  end
end
