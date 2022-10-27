import '../../../styles/input-field.scss';

const InputField = ({
  type,
  className,
  id,
  placeholder,
  name,
  onChange,
  value,
  label
}) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      className={className}
      id={id}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
    />
  </>
);

export default InputField;
