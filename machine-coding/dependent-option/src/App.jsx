import { useState } from 'react'
import './App.css'

function App() {
  // Initial state to store selected option
  const [selectedOption, setSelectedOption] = useState('');
  
  // Initial list of options
  const options = [
    { id: 'opt1', name: 'Opt1' },
    { id: 'opt2', name: 'Opt2' },
    { id: 'opt3', name: 'Opt3', dependentChild: ['opt4', 'opt1'] }, // opt3 has dependent options
    { id: 'opt4', name: 'Opt4' }
  ];

  // State for showing the filtered options
  const [showOptions, setShowOptions] = useState(options);

  const handleOptionSelect = (selectedOption) => {
    // If the selected option has dependent children, filter them out
    if (selectedOption?.dependentChild) {
      const filteredOptions = options.filter(
        (option) => !selectedOption.dependentChild.includes(option.id)
      );
      setShowOptions(filteredOptions);
    } else {
      // If no dependent children, show all options
      setShowOptions(options);
    }

    // Set the selected option's name in the input field
    setSelectedOption(selectedOption.name);
  }

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder='Enter options' 
          value={selectedOption} 
          readOnly 
        />
        <div>
          {showOptions.map((option) => (
            <p onClick={() => handleOptionSelect(option)} key={option.id}>
              {option.name}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
