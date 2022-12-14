import '../../../styles/input-field.scss';

const InputField = ({
  type,
  className,
  id,
  placeholder,
  name,
  onChange,
  value,
  label,
  onClick,
  float,
  hiddenLabel
}) => {
  return (
    <>
      {!hiddenLabel && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        onClick={onClick}
        step={float ? '0.01' : undefined}
      />
    </>
  )
};

export default InputField;
