require 'rails_helper'

RSpec.describe Api::V1::AccountsController, type: :controller do

  describe 'GET #show' do
    let(:account) { Fabricate(:account) }
    let(:other_account) { Fabricate(:account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { sign_in :organizer, organizer }

    context 'when organizer has permission to account' do
      before { get :show, id: account.uid }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('account') }
    end

    context 'when organizer does not have permission to account' do
      before { get :show, id: other_account.uid }

      it { expect(response).to have_http_status(:unauthorized) }
      it { expect(response).to match_response_schema('errors') }
    end
  end

  describe 'PUT #update' do
    let(:account) { Fabricate(:account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { sign_in :organizer, organizer }

    context 'when account params is valid' do
      before { put :update, id: account.uid, account: { name: 'something' } }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('account') }
      it { expect(JSON.parse(response.body)['account']['name']).to eq 'something' }
    end

    context 'when account params is invalid' do
      before { put :update, id: account.uid, account: { name: '' } }

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end
  end
end
