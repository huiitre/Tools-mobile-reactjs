import { Link } from 'react-router-dom';
import '../../../styles/add-button.scss';

const AddButton = ({ callback }) => (
  <i onClick={callback} className="icon bi bi-plus-square"></i>
);

export default AddButton;
