import { Link } from 'react-router-dom';
import '../../../styles/return-button.scss';

const ReturnButton = ({ path }) => (
  <Link to={path}>
    <i className="return-button__icon bi bi-arrow-left-square"></i>
  </Link>
);

export default ReturnButton;
