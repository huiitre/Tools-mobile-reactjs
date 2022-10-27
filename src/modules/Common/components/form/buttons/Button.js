import '../../../styles/button.scss';

const Button = ({ className, text }) => (
  <button type="submit" className={`button ${className}`}>
    {text}
  </button>
);

export default Button;
