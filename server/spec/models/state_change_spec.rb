describe StateChange do
  it { is_expected.to respond_to(:task) }
  it { is_expected.to respond_to(:old_state) }
  it { is_expected.to respond_to(:new_state) }
end