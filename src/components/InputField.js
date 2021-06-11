import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";

const InputField = forwardRef((props, ref) => {
  // "required|min:6|max:12"

  //State to deal with the input filed

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    setError("")
    props.onChange(event.target.name, event.target.value);
  };
  const validate = () => {
   // return true if is valid
   //else return false

      if (props.validation){
        const rules = props.validation.split("|");

        for ( let i = 0; i < rules.length; i++){
          const current = rules[i];

          if (current === 'required'){
            if (!value ){
              setError("This fiel is required")
              return false;
            }
          }
          const pair = current.split(":")
          switch (pair[0]){
              case 'min': 
              if (value.length < pair[1]){
                setError(`This field must be at least ${pair[1]} characters long!`)
                return false;
              }
              break;
              case 'max':
              if (value.length> pair[1]){
                setError(`This field must be no longer than ${pair[1]} characters long!`)
                return false;
              }
              break; 
              default: break;
          }
        }
      }
        return true;
  };

  useImperativeHandle(ref, () => {
    return {
      validate: () => validate(),
    };
  });
  return (
    <div className="input-wrapper">
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={(event) => handleChange(event)}
        value={props.value ? props.value : value}
        autoComplete={props.autoComplete}
      />
      {error && (
        <p className='error'>{error}</p>
      ) }
    </div>
  );
});
InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "",
  value: "",
  autoComplete: "off",
  validation:""
};

export default InputField;
