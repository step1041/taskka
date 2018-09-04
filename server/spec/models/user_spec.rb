describe User do
  describe "attributes" do
    it { is_expected.to respond_to(:username) }
    it { is_expected.to respond_to(:access_token) }

    it { is_expected.to respond_to(:google_id) }
    it { is_expected.to respond_to(:google_token) }
  end

  describe 'relations' do
    it { is_expected.to respond_to(:projects) }
  end

  describe "creation" do
    context "when no access_token is given" do
      it "is created with an random access_token" do
        user = User.create
        expect(user.access_token).not_to be_nil
      end
    end

    context "when an access_token is given" do
      it "is created with the given access_token" do
        token = "example-token"
        user = User.create(access_token: token)
        expect(user.access_token).to eq(token)
      end
    end
  end

  describe "#generate_new_access_token" do
    it "replaces the user's access token" do
      token = "example-token"
      user = User.create(access_token: token)
      user.generate_new_access_token
      expect(user.access_token).not_to eq(token)
    end
  end

  describe "#new_user?" do
    let (:user) { User.create }

    context "when the user does not have a username" do
      before { user.username = nil }
      it("returns true") { expect(user.new_user?).to eq(true) }
    end

    context "when the user has a username" do
      before { user.username = "ExampleUser" }
      it("returns false") { expect(user.new_user?).to eq(false) }
    end
  end

  describe "#to_json" do
    let (:user) { FactoryBot.create(:user) }
    let (:user_json) { JSON.parse(user.to_json) }

    it "does not include google_token" do
      expect(user_json).not_to have_key("google_token")
    end

    it "does not include google_id" do
      expect(user_json).not_to have_key("google_id")
    end

    it "does include default_project_id" do
      expect(user_json).to have_key("default_project_id")
      expect(user_json["default_project_id"]).to eq(user.default_project_id)
    end
  end
end