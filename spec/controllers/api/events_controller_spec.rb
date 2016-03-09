require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do

  describe 'GET #index' do
    let!(:account_1) { Fabricate(:account) }
    let!(:account_2) { Fabricate(:account) }

    before do
      Fabricate.times(3, :event, account: account_1)
      Fabricate.times(2, :event, account: account_2)
    end

    context 'when request is created by god' do
      before do
        god = Fabricate(:god)
        sign_in :organizer, god
        get :index
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('events') }
      it { expect(JSON.parse(response.body)['events'].count).to eq Event.count }
    end

    context 'when request is created by organizer' do
      let(:account_owner) { Fabricate(:account_owner, account: account_1) }

      before do
        sign_in :organizer, account_owner
        get :index
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('events') }
      it { expect(JSON.parse(response.body)['events'].count).to eq Event.accessible_by(Ability.new(account_owner)).count }
    end

    context 'when request is created by user' do
      let(:application) { Fabricate(:origin_application) }
      let(:user) { Fabricate(:user) }
      let(:access_token) { Fabricate(:access_token, resource_owner_id: user.id, application: application) }

      before { get :index, format: :json, access_token: access_token.token }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('events') }
      it { expect(JSON.parse(response.body)['events'].count).to eq Event.count }
    end
  end

  describe 'GET #show' do
    let(:account) { Fabricate(:account) }
    let!(:event) { Fabricate(:event, account: account) }
    let(:event) { Fabricate(:event, account: account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { sign_in :organizer, organizer }

    context 'when organizer request for particular event' do
      let(:account_owner) { Fabricate(:account_owner, account: account) }

      before { get :show, id: event.uid }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('event') }
    end
  end

  describe 'POST #create' do
    let(:account) { Fabricate(:account) }

    context 'when request is created by organizer' do
      before do
        account_owner = Fabricate(:account_owner, account: account)
        sign_in :organizer, account_owner
      end

      context 'when cover photo does not exist' do
        before { post :create, event: Fabricate.attributes_for(:event) }

        it { expect(response).to have_http_status(:created) }
        it { expect(response).to match_response_schema('event') }
      end

      context 'when cover photo exists' do
        before { post :create, event: Fabricate.attributes_for(:event_with_cover_photo) }

        it { expect(response).to have_http_status(:created) }
        it { expect(response).to match_response_schema('event') }
        it { expect(JSON.parse(response.body)['event']['cover_photo_url']).not_to be_nil }
      end

      context 'when event params is not valid' do
        before { post :create, event: { description: 'something'} }

        it { expect(response).to have_http_status(:unprocessable_entity) }
        it { expect(response).to match_response_schema('errors') }
      end
    end
  end

  describe 'PUT #update' do
    let(:account) { Fabricate(:account) }
    let!(:event) { Fabricate(:event, account: account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }
    let(:update_event_params) { Fabricate.attributes_for(:event_with_cover_photo) }

    before { sign_in :organizer, organizer }

    context 'when update params is valid' do
      before { put :update, id: event.uid, event: update_event_params }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('event') }
      it { expect(JSON.parse(response.body)['event']['name']).to eq update_event_params['name'] }
      it { expect(JSON.parse(response.body)['event']['description']).to eq update_event_params['description'] }
      it { expect(JSON.parse(response.body)['event']['cover_photo_url']).not_to be_nil }
    end

    context 'when update params is invalid' do
      before { put :update, id: event.uid, event: { name: '' } }

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end

    context 'when update state params is invalid' do
      before {put :update, id: event.uid, event: { state: 'open' } }

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end

    context 'when update state params is valid' do
      before { put :update, id: event.uid, event: { state: 'publish' } }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('event') }
      it { expect(JSON.parse(response.body)['event']['state']).to eq 'publish' }
    end
  end

  describe 'DELETE #destroy' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate(:event, account: account) }

    context 'when request is created by account_owner' do
      before do
        account_owner = Fabricate(:account_owner, account: account)
        sign_in :organizer, account_owner
        delete :destroy, id: event.uid
      end

      it { expect(response).to have_http_status(:no_content) }
      it { expect { Event.find(event.id) }.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context 'when request is created by team_member' do
      before do
        team_member = Fabricate(:team_member, account: account)
        sign_in :organizer, team_member
        delete :destroy, id: event.uid
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end
  end
end
