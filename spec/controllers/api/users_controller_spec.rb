require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do

  describe 'GET #me' do
    context 'when user get profile' do
      let(:application) { Fabricate(:origin_application) }
      let(:user) { Fabricate(:user) }
      let(:access_token) { Fabricate(:access_token, resource_owner_id: user.id, application: application) }

      before { get :me, format: :json, access_token: access_token.token }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('user') }
    end
  end

  describe 'POST #create' do
    context 'when user is valid' do
      before { post :create, user: Fabricate.attributes_for(:user) }

      it { expect(response).to have_http_status(:created) }
    end

    context 'when user params is invalid' do
      before do
        Fabricate(:user, email: 'earth@earth.com')
        post :create, user: Fabricate.attributes_for(:user, email: 'earth@earth.com')
      end

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end
  end

  describe 'PUT #update' do
    context 'when user update profile' do
      let(:application) { Fabricate(:origin_application) }
      let(:user) { Fabricate(:user) }
      let(:access_token) { Fabricate(:access_token, resource_owner_id: user.id, application: application) }

      before { put :update,id: user.uid, user: { name: 'aun' }, format: :json, access_token: access_token.token }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('user') }
      it { expect(JSON.parse(response.body)['user']['name']).to eq 'aun' }
      end
  end

  describe 'DELETE #destroy' do
    let(:application) { Fabricate(:origin_application) }
    let(:user) { Fabricate(:user) }
    let(:access_token) { Fabricate(:access_token, resource_owner_id: user.id, application: application) }

    context 'when user delete profile' do
      before { delete :destroy, id: user.uid, format: :json, access_token: access_token.token }

      it { expect(response).to have_http_status(:no_content) }
      it { expect { User.find(user.uid) }.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end
end
