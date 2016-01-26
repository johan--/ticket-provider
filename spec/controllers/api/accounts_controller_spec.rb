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
end
