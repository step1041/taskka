describe Project do
  describe 'attributes' do
    it { is_expected.to respond_to(:name) }
  end

  describe 'relations' do
    it { is_expected.to respond_to(:owner) }
    it { is_expected.to respond_to(:tasks) }
  end
end
