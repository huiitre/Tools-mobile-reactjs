import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.scss';
import { toast } from 'react-toastify';
import useModal from '../hooks/useModal';
import Modal from './Modal';
import InputField from './form/fields/InputField';
// import core from '../../../store/actions/core';
import fastToast from './toast/fastToast';
import LS from '../../../services/localStorage';
import { destroySession } from '../../../store/reducers/core';

const Header = () => {
  const { isLogged } = useSelector((state) => state.core.user);
  const { name } = useSelector((state) => state.core.user)

  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    if (e.target.value === 'Oui') {
      dispatch(destroySession())
      LS.clear()
      navigate('/login')
    }
    toggleLoginForm()
    toast.success('Vous êtes déconnecté !', fastToast)
  }

  return (
    <>
      <Modal
        isShowing={isLoginFormShowed}
        hide={toggleLoginForm}
        title="Déconnexion"
      >
        <InputField
          type="button"
          className="button button__logout button__yes"
          id="button__yes"
          onClick={handleLogout}
          value="Oui"
        />
        <InputField
          type="button"
          className="button button__logout button__no"
          id="button__no"
          onClick={handleLogout}
          value="Non"
        />
      </Modal>
      <header className={`header ${!isLogged ? 'hidden' : ''}`}>
        <div className="header__config">
          <Link className="link header__config-link" to="/config">
            <i className="header__config-icon bi bi-pencil-square"></i>
          </Link>
        </div>
        <h1 className="header__title">
          <Link className="link header__title-link" to="/">
            <span className="header__title-name">{name}</span>
          </Link>
        </h1>
        <div className="header__disconnect" onClick={toggleLoginForm}>
          <i className="header__disconnect-icon bi bi-box-arrow-right"></i>
        </div>
      </header>
    </>

  )
};

export default Header;
