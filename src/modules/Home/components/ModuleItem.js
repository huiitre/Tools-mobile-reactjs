import { Link } from 'react-router-dom';
import '../styles/module-item.scss';

const ModuleItem = ({ name, path }) => (
  <Link className="module-item" to={path}>
    {name}
  </Link>
);

export default ModuleItem;
