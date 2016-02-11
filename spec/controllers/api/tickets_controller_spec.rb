require 'rails_helper'

RSpec.describe Api::V1::TicketsController, type: :controller do

  describe 'GET #index' do
    let(:application) { Fabricate(:origin_application) }
    let(:account) { Fabricate(:account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }
    let(:event) { Fabricate(:event, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, event: event) }
    let(:user) { Fabricate(:user) }
    let(:ticket) { Fabricate(:ticket, ticket_type: ticket_type, user: user) }
    let(:access_token) { Fabricate(:access_token, resource_owner_id: user.id, application: application) }

    before { ticket.transition_to(:sold) }

    context 'when user get all purchased ticket' do
      before { get :index, format: :json, access_token: access_token.token }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('tickets') }
      it { expect(JSON.parse(response.body)['tickets'].first['state']).to eq 'sold' }
    end
  end

  describe 'POST #create' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate(:event, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, event: event) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { sign_in :organizer, organizer }

    context 'when ticket params is valid' do
      before { post :create, ticket: Fabricate.attributes_for(:ticket, ticket_type_id: ticket_type.uid) }

      it { expect(response).to have_http_status(:created) }
      it { expect(response).to match_response_schema('ticket') }
    end

    context 'when ticket pararms is invalid' do
      before { post :create, ticket: Fabricate.attributes_for(:ticket) }

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end
  end

  describe 'PUT #update' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate(:event, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, event: event) }
    let(:ticket) { Fabricate(:ticket, ticket_type: ticket_type) }
    let(:organizer) { Fabricate(:account_owner, account: account) }
    let(:user) { Fabricate(:user) }

    before { sign_in :organizer, organizer }

    context 'when ticket params is valid' do
      before { put :update, id: ticket.uid, ticket: { state: 'sold', user_id: user.uid } }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('ticket') }
      it { expect(JSON.parse(response.body)['ticket']['state']).to eq 'sold' }
    end

    context 'when ticket param is not valid' do
      before { put :update, id: ticket.uid, ticket: { state: 'refunded' } }

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
      it { expect(JSON.parse(response.body)['errors']).to match_array(I18n.t('backend.ticket.cannot_transition_to', state: 'refunded')) }
    end
  end

  describe 'DELETE #destroy' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate(:event, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, event: event) }
    let(:organizer) { Fabricate(:account_owner, account: account) }
    let(:user) { Fabricate(:user) }

    before { sign_in :organizer, organizer }

    context 'when ticket user does not exist' do
      let (:ticket) { Fabricate(:ticket, ticket_type: ticket_type) }
      before { delete :destroy, id: ticket.uid }

      it { expect(response).to have_http_status(:no_content) }
      it { expect { Ticket.find(ticket.id) }.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context 'when ticket user exists' do
      before do
        ticket = Fabricate(:ticket, ticket_type: ticket_type, user: user)
        delete :destroy, id: ticket.uid
      end

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end
  end
end