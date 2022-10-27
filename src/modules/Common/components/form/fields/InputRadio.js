import '../../../styles/input-radio.scss';

const InputRadio = ({
  list, className, value
}) => {
  return (
    list.map((item) => (
      <>
        <input
          type="radio"
          value={item.value}
          name={item.name}
          id={item.value}
          className={className}
          defaultChecked={value === item.value ? true : ''}
        />
        <label id={item.value} htmlFor={item.value}>{item.value}</label>
      </>
    ))
  )
};

export default InputRadio;
