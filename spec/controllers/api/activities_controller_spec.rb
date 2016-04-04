require 'rails_helper'

RSpec.describe Api::V1::ActivitiesController, type: :controller do

  describe 'GET #index' do
    let!(:account_1) { Fabricate(:account) }
    let!(:account_2) { Fabricate(:account) }

    before do
      Fabricate.times(3, :activity, account: account_1)
      Fabricate.times(2, :activity, account: account_2)
    end

    context 'when request is created by god' do
      before do
        god = Fabricate(:god)
        sign_in :organizer, god
        get :index
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('activities') }
      it { expect(JSON.parse(response.body)['activities'].count).to eq Activity.count }
    end

    context 'when request is created by organizer' do
      let(:account_owner) { Fabricate(:account_owner, account: account_1) }

      before do
        sign_in :organizer, account_owner
        get :index
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('activities') }
      it { expect(JSON.parse(response.body)['activities'].count).to eq Activity.accessible_by(Ability.new(account_owner)).count }
    end
  end

  describe 'GET #show' do
    let(:account) { Fabricate(:account) }
    let!(:activity) { Fabricate(:activity, account: account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    context 'when organizer request for particular activity' do
      context 'when organizer signed in' do
        let(:account_owner) { Fabricate(:account_owner, account: account) }

        before do
          sign_in :organizer, organizer
          get :show, id: activity.uid
        end

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('activity') }
      end

      context 'when organizer use api_token' do
        before { get :show, id: activity.uid, api_token: account.api_token }

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('activity') }
      end
    end
  end

  describe 'POST #create' do
    let(:account) { Fabricate(:account) }

    context 'when request is created by organizer' do
      context 'when organizer sign in' do
        before do
          account_owner = Fabricate(:account_owner, account: account)
          sign_in :organizer, account_owner
        end

        context 'when cover photo does not exist' do
          before { post :create, activity: Fabricate.attributes_for(:activity) }

          it { expect(response).to have_http_status(:created) }
          it { expect(response).to match_response_schema('activity') }
        end

        context 'when cover photo exists' do
          before { post :create, activity: Fabricate.attributes_for(:activity_with_cover_photo) }

          it { expect(response).to have_http_status(:created) }
          it { expect(response).to match_response_schema('activity') }
          it { expect(JSON.parse(response.body)['activity']['cover_photo_url']).not_to be_nil }
        end

        context 'when activity params is not valid' do
          before { post :create, activity: { description: 'something'} }

          it { expect(response).to have_http_status(:unprocessable_entity) }
          it { expect(response).to match_response_schema('errors') }
        end
      end

      context 'when organizer use api_token' do
        before { post :create, activity: Fabricate.attributes_for(:activity), api_token: account.api_token }

        it { expect(response).to have_http_status(:created) }
        it { expect(response).to match_response_schema('activity') }
      end
    end
  end

  describe 'PUT #update' do
    let(:account) { Fabricate(:account) }
    let!(:activity) { Fabricate(:activity, account: account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }
    let(:update_activity_params) { Fabricate.attributes_for(:activity_with_cover_photo) }

    context 'when update params is valid' do
      context 'when organizer sign in' do
        before do
          sign_in :organizer, organizer
          put :update, id: activity.uid, activity: update_activity_params
        end

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('activity') }
        it { expect(JSON.parse(response.body)['activity']['name']).to eq update_activity_params['name'] }
        it { expect(JSON.parse(response.body)['activity']['description']).to eq update_activity_params['description'] }
        it { expect(JSON.parse(response.body)['activity']['cover_photo_url']).not_to be_nil }
      end

      context 'when organizer use api_token' do
        before { put :update, id: activity.uid, activity: update_activity_params, api_token: account.api_token }

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('activity') }
        it { expect(JSON.parse(response.body)['activity']['name']).to eq update_activity_params['name'] }
        it { expect(JSON.parse(response.body)['activity']['description']).to eq update_activity_params['description'] }
        it { expect(JSON.parse(response.body)['activity']['cover_photo_url']).not_to be_nil }
      end
    end

    context 'when update params is invalid' do
      before do
        sign_in :organizer, organizer
        put :update, id: activity.uid, activity: { name: '' }
      end

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end
  end

  describe 'DELETE #destroy' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }

    context 'when organizer sign in' do
      context 'when request is created by account_owner' do
        before do
          account_owner = Fabricate(:account_owner, account: account)
          sign_in :organizer, account_owner
          delete :destroy, id: activity.uid
        end

        it { expect(response).to have_http_status(:no_content) }
        it { expect { Activity.find(activity.id) }.to raise_error(ActiveRecord::RecordNotFound) }
      end

      context 'when request is created by team_member' do
        before do
          team_member = Fabricate(:team_member, account: account)
          sign_in :organizer, team_member
          delete :destroy, id: activity.uid
        end

        it { expect(response).to have_http_status(:unauthorized) }
      end
    end

    context 'when organizer use api_token' do
      before { delete :destroy, id: activity.uid, api_token: account.api_token }

      it { expect(response).to have_http_status(:no_content) }
      it { expect { Activity.find(activity.id) }.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end
end
