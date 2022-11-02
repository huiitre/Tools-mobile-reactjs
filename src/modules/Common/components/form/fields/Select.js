import '../../../styles/select.scss';

const Select = ({
  label, id, className, data, idkey, optionText, onChange, name
}) => (
  <>
    <label htmlFor={id}>{label}</label>
    <select
      onChange={onChange}
      id={id}
      className={className}
      name={name}
    >
      {data.data.map((item) => (
        <option
          key={item[idkey]}
          className={className ? `${className}__option` : ''}
          value={item[idkey]}
        >
          {optionText.map((value) => `${item[value]} `)}
        </option>
      ))}
    </select>
  </>
);

export default Select;
