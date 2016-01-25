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
    end
  end
end
