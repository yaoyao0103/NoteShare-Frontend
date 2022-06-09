import { Input, Tooltip } from 'antd';
import React from 'react';

const NumericInput = (props) => {
    const { value, onChange } = props;
  
    const handleChange = (e) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
  
      if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
        onChange(inputValue);
      }
    }; // '.' at the end or only '-' in the input box.
  
    const handleBlur = () => {
      let valueTemp = value;
  
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
  
      onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };
  
    return (
      <Tooltip trigger={['focus']} placement="topLeft" overlayClassName="numeric-input">
        <Input
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Input a number"
          maxLength={25}
        />
      </Tooltip>
    );
  };

export default NumericInput;