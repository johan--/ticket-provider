require 'rails_helper'

RSpec.describe Api::V1::TicketTypesController, type: :controller do

  describe 'GET #index' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { Fabricate.times(5, :ticket_type, activity: activity) }

    context 'when organizer sign in' do
      before do
        sign_in :organizer, organizer
        get :index, activity_id: activity.uid
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('ticket_types') }
    end

    context 'when organizer use api_token' do
      before { get :index, activity_id: activity.uid, api_token: account.api_token }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('ticket_types') }
    end
  end

  describe 'GET #show' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, activity: activity) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { Fabricate.times(5, :ticket, ticket_type: ticket_type) }

    context 'when organizer retrieve particular ticket type' do
      context 'when organizer sign in' do
        before do
          sign_in :organizer, organizer
          get :show, id: ticket_type.uid
        end

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('ticket_type') }
        it { expect(JSON.parse(response.body)['ticket_type']['tickets'].size).to eq ticket_type.tickets.count }
      end

      context 'when organizer use api_token' do
        before { get :show, id: ticket_type.uid, api_token: account.api_token }

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('ticket_type') }
        it { expect(JSON.parse(response.body)['ticket_type']['tickets'].size).to eq ticket_type.tickets.count }
      end
    end
  end

  describe 'POST #create' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    context 'when organizer sign in' do
      before { sign_in :organizer, organizer }

      context 'when ticket type params is valid' do
        before { post :create, ticket_type: Fabricate.attributes_for(:ticket_type, activity_id: activity.uid) }

        it { expect(response).to have_http_status(:created) }
        it { expect(response).to match_response_schema('ticket_type') }
      end

      context 'when ticket type params is invalid' do
        before { post :create, ticket_type: Fabricate.attributes_for(:ticket_type) }

        it { expect(response).to have_http_status(:unprocessable_entity) }
        it { expect(response).to match_response_schema('errors') }
      end
    end

    context 'when organizer use api_token' do
      context 'when ticket type params is valid' do
        before { post :create, ticket_type: Fabricate.attributes_for(:ticket_type, activity_id: activity.uid), api_token: account.api_token }

        it { expect(response).to have_http_status(:created) }
        it { expect(response).to match_response_schema('ticket_type') }
      end

      context 'when ticket type params is invalid' do
        before { post :create, ticket_type: Fabricate.attributes_for(:ticket_type), api_token: account.api_token }

        it { expect(response).to have_http_status(:unprocessable_entity) }
        it { expect(response).to match_response_schema('errors') }
      end
    end
  end

  describe 'PUT #update' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, activity: activity) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    context 'when organizer sign in' do
      before { sign_in :organizer, organizer }

      context 'when ticket type params is valid' do
        before { put :update, id: ticket_type.uid, ticket_type: Fabricate.attributes_for(:ticket_type, name: 'something') }

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('ticket_type') }
        it { expect(JSON.parse(response.body)['ticket_type']['name']).to eq 'something' }
      end

      context 'when ticket type params is not valid' do
        before { put :update, id: ticket_type.uid, ticket_type: Fabricate.attributes_for(:ticket_type, name: '') }

        it { expect(response).to have_http_status(:unprocessable_entity) }
        it { expect(response).to match_response_schema('errors') }
      end
    end

    context 'when organizer use api_token' do
      context 'when ticket type params is valid' do
        before { put :update, id: ticket_type.uid, ticket_type: Fabricate.attributes_for(:ticket_type, name: 'something'), api_token: account.api_token }

        it { expect(response).to have_http_status(:ok) }
        it { expect(response).to match_response_schema('ticket_type') }
        it { expect(JSON.parse(response.body)['ticket_type']['name']).to eq 'something' }
      end

      context 'when ticket type params is not valid' do
        before { put :update, id: ticket_type.uid, ticket_type: Fabricate.attributes_for(:ticket_type, name: ''), api_token: account.api_token }

        it { expect(response).to have_http_status(:unprocessable_entity) }
        it { expect(response).to match_response_schema('errors') }
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, activity: activity) }

    context 'when organizer sign in' do
      context 'when request is created by account_owner' do
        before do
          account_owner = Fabricate(:account_owner, account: account)
          sign_in :organizer, account_owner
          delete :destroy, id: ticket_type.uid
        end

        it { expect(response).to have_http_status(:no_content) }
        it { expect { TicketType.find(ticket_type.id) }.to raise_error(ActiveRecord::RecordNotFound) }
      end

      context 'when request is created by team_member' do
        before do
          team_member = Fabricate(:team_member, account: account)
          sign_in :organizer, team_member
          delete :destroy, id: ticket_type.uid
        end

        it { expect(response).to have_http_status(:unauthorized) }
        it { expect(response).to match_response_schema('errors') }
      end
    end

    context 'when organizer use api_token' do
      before { delete :destroy, id: ticket_type.uid, api_token: account.api_token }

      it { expect(response).to have_http_status(:no_content) }
      it { expect { TicketType.find(ticket_type.id) }.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end
end