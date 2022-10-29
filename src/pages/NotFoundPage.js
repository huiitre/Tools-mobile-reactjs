import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main className="page">
    <h1>404</h1>
    <Link to="/">accueil</Link><br />
    <Link to="/login">login</Link>
  </main>
);

export default NotFoundPage;
