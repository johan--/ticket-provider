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
      let(:organizer) { Fabricate(:account_owner, account: account) }

      before do
        sign_in :organizer, organizer
        put :update, id: organizer.uid, organizer: { name: 'aun', current_password: organizer.password }
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('organizer') }
      it { expect(JSON.parse(response.body)['organizer']['name']).to eq 'aun' }
    end

    context 'when organizer update password' do
      let(:account) { Fabricate(:account) }
      let(:organizer) { Fabricate(:account_owner, account: account) }

      before do
        sign_in :organizer, organizer
        put :update, id: organizer.uid, organizer: { current_password: organizer.password,
                                                     password: '1q2w3e4r',
                                                     password_confirmation: '1q2w3e4r' }
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response).to match_response_schema('organizer') }
    end

    context 'when organizer params is invalid' do
      let(:account) { Fabricate(:account) }
      let(:organizer) { Fabricate(:account_owner, account: account) }

      before do
        sign_in :organizer, organizer
        put :update, id: organizer.uid, organizer: { name: '' }
      end

      it { expect(response).to have_http_status(:unprocessable_entity) }
      it { expect(response).to match_response_schema('errors') }
    end
  end
end
