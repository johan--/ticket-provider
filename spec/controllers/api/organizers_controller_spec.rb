require 'rails_helper'

RSpec.describe Api::V1::OrganizersController, type: :controller do

  describe 'GET #me' do
    let(:account) { Fabricate(:account) }
    let(:other_account) { Fabricate(:account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    before { sign_in :organizer, organizer }

    context 'when organizer has permission to account' do
      before { get :me }

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('organizer') }
    end
  end

  describe 'PUT #update' do
    context 'when organizer update profile' do
      let(:account) { Fabricate(:account) }
      let(:other_account) { Fabricate(:account) }
      let(:organizer) { Fabricate(:account_owner, account: account) }

      before do
        sign_in :organizer, organizer
        put :update,id: organizer.uid, organizer: { name: 'aun' }
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('organizer') }
      it { expect(JSON.parse(response.body)['organizer']['name']).to eq 'aun' }
    end
  end
end
