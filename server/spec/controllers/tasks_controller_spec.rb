require 'rails_helper'

RSpec.describe TasksController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(204)
    end
  end

  describe "GET #view" do
    it "returns http success" do
      get :view, params: { :id => 1 }
      expect(response).to have_http_status(204)
    end
  end

  describe "GET #update" do
    it "returns http success" do
      patch :update
      expect(response).to have_http_status(204)
    end
  end

end
