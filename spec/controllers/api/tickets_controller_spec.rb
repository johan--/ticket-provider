require 'rails_helper'

RSpec.describe Api::V1::TicketsController, type: :controller do

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
    end
  end
end