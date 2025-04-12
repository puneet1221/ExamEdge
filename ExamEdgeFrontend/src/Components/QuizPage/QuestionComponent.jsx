const QuestionComponent = ({
  questionData,
  selectedOption,
  handleOptionSelect,
  submitted,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{questionData.text}</h2>
      <div className="grid grid-cols-2 gap-4">
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption?.choiceId === option.choiceId;
          const isCorrect = option.isCorrect;
          let optionClass =
            'p-4 rounded-md border border-gray-300 transition-all cursor-pointer text-center';

          // Submitted logic to highlight correct and incorrect answers
          if (submitted) {
            if (isCorrect) {
              optionClass += ' bg-green-100 border-green-500 text-green-800'; // Correct answer
            } else if (isSelected) {
              optionClass += ' bg-red-100 border-red-500 text-red-800'; // Incorrect selected answer
            } else {
              optionClass += ' bg-gray-200 border-gray-300 text-gray-600'; // Unselected options
            }
          } else {
            // Before submission, highlight the selected option with blue
            optionClass += isSelected
              ? ' bg-blue-100 border-blue-500 text-blue-800'
              : ' bg-white hover:bg-blue-50';
          }

          // Option number calculation, starting from 1
          const optionNumber = index + 1;

          return (
            <div
              key={option.choiceId}
              className={`${optionClass} active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-600 `}
              onClick={() =>
                !submitted &&
                handleOptionSelect({ ...option, questionId: questionData.id })
              }
            >
              <span className="font relative mr- ">{optionNumber}</span> {option.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionComponent;
