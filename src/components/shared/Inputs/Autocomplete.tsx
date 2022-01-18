import { useState } from 'react';
import Select from 'react-select';

const AutoComplete = ({
  data, getOptionLabel, getOptionValue, selectedValue, setSelectedValue, handleSearch, disabled, placeholder,
}: Props) => {
  const [inputVal, setInputVal] = useState<string>('');

  const handleInputChange = (value: string, action: any) => {
    if (value) {
      handleSearch && handleSearch(value);
      setInputVal(value);
    }
    if (!value && action?.action !== 'input-blur' && action?.action !== 'menu-close') {
      setInputVal(value);
    }
  };

  // handle selection
  const handleChange = (value: any) => {
    setSelectedValue(value);
  };
  return (
    <Select
      inputValue={inputVal}
      placeholder={placeholder}
      value={selectedValue}
      options={data}
      getOptionLabel={getOptionLabel as any}
      getOptionValue={getOptionValue as any}
      onInputChange={(value, action) => handleInputChange(value, action)}
      onChange={handleChange}
      filterOption={(items) => items !== undefined}
      isLoading={!data && !disabled}
      isDisabled={disabled}
    />
  );
};

export default AutoComplete;

interface Props {
  data?: any[],
  getOptionLabel: Function,
  getOptionValue: Function
  selectedValue: {} | null,
  setSelectedValue: Function,
  handleSearch?: (val: string) => void,
  disabled?: boolean,
  placeholder?: string
}
