require 'rails_helper'

RSpec.describe Api::V1::TicketTypesController, type: :controller do

  describe 'POST #create' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate(:event, account: account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { sign_in :organizer, organizer }

    context 'when ticket type params is valid' do
      before { post :create, ticket_type: Fabricate.attributes_for(:ticket_type, event_id: event.uid) }

      it { expect(response).to have_http_status(:created) }
      it { expect(response).to match_response_schema('ticket_type') }
    end

    context 'when ticket type params is invalid' do
      before { post :create, ticket_type: Fabricate.attributes_for(:ticket_type) }

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end
  end
end