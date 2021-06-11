import React from "react";
import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
function App() {
  const inputRefs = React.useRef([React.createRef()]);

  const [data, setData] = useState({});
  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    let isValid = true;
    for (let i = 0; i < inputRefs.current.length; i++) {
      const valid = inputRefs.current[i].current.validate();
      console.log(valid)
      if (!valid) {
        isValid = false;
        
      }
    }
    if (!isValid) {
      return;
    }
      console.log('loggged in')
    //Carry on as normal
  };
  return (
    <div className="App">
      <form onSubmit={submitForm} className='form'>
        <h1>React Register Form Validation</h1>
        <InputField
          ref={inputRefs.current[0]}
          name="username"
          label="Username:"
          onChange={handleChange}
          validation={'required|min:6|max:12'}

        />
        <InputField
          ref={inputRefs.current[1]}
          name="password"
          label="Password:"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
