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
end