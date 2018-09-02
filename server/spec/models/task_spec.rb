describe Task do
  describe "attributes" do
    it { is_expected.to respond_to(:name) }
    it { is_expected.to respond_to(:notes) }
    it { is_expected.to respond_to(:state) }
  end

  describe "relations" do
    it { is_expected.to respond_to(:project) }
  end

  describe "on save" do
    let(:task) { FactoryBot.create(:task) }

    context "when the task was not complete" do
      before do
        task.state = "new"
        task.save!
      end

      context "when the state is changed to 'complete'" do
        before { task.state = 'complete' }

        it "sets the completed_at timestamp" do
          task.save!
          expect(task.completed_at).not_to be_nil
        end
      end

      context "when the state is not changed to 'complete'" do
        before { task.state = 'in_progress' }

        it "does not update the completed_at timestamp" do
          expect(task.completed_at).to be_nil
        end
      end
    end

    context "when the task was complete" do
      before do
        task.state = "complete"
        task.save!
      end

      context "when the state is not changed" do
        before { task.state = 'complete' }

        it "does not update the completed_at timestamp" do
          expect{ task.save! }.not_to change {task.completed_at}
        end
      end

      context "when the state is changed" do
        before { task.state = 'in_progress' }

        it "clears the completed_at timestamp" do
          task.save!
          expect(task.completed_at).to be_nil
        end
      end
    end
  end
end
