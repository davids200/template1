import Select from 'react-select'

export default function CustomSelect({ options, value, onChange }) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      className="bg-white w-full rounded-md  focus:border-purple-500 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      classNamePrefix="select"
      styles={{
        control: (provided, state) => ({
          ...provided,
          boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
          borderColor: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : provided.borderColor,
        }),
      }}
    />
  )
}
