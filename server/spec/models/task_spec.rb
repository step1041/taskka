describe Task do
  describe 'attributes' do
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:notes) }
    it { is_expected.to respond_to(:state) }
  end

  describe 'relations' do
    it { is_expected.to respond_to(:project) }
  end
end
