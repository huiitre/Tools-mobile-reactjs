import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Button from '../../Common/components/form/buttons/Button';
import InputField from '../../Common/components/form/fields/InputField';
import InputRadio from '../../Common/components/form/fields/InputRadio';
import { defaultToast } from '../../Common/components/toast/toasts';
import '../styles/login.scss';
import { setInstance, setProtocol } from '../../../store/reducers/core'
import { apiLoginCheck } from '../../../store/thunk/core';

const Login = () => {
  //* Hooks locaux
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //* redux
  const dispatch = useDispatch();
  const { instance, protocol } = useSelector((state) => state.core.apiUrl)

  //* submit
  const handleSubmitConnexion = (e) => {
    e.preventDefault();

    const errorList = [];
    let status = 1;

    //* vérification des champs du formulaire
    if (username.length === 0) {
      errorList.push('Le nom d\'utilisateur est vide')
      status = 0
    }

    if (password.length === 0) {
      errorList.push('Le mot de passe est vide')
      status = 0
    }

    if (instance.length === 0) {
      errorList.push('L\'instance est vide')
      status = 0
    }

    //* vérification du status et envoie ou non en AJAX
    if (status === 0) {
      for (const val of errorList) {
        toast.error(val, defaultToast())
      }
      return
    }

    const credentials = {
      username,
      password,
    }

    dispatch(apiLoginCheck(credentials))
  }

  //* Liste input radio
  const radioList = [
    {
      name: 'protocol',
      value: 'http'
    },
    {
      name: 'protocol',
      value: 'https'
    }
  ]

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmitConnexion}>
        <div className="login__form__username">
          <InputField
            type="text"
            name="username"
            className="field username"
            id="field__username"
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="login__form__password">
          <InputField
            type="password"
            name="password"
            className="field password"
            id="field__password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="login__form__instance">
          <InputField
            type="text"
            name="instance"
            className="field instance"
            id="field__instance"
            placeholder="Instance"
            onChange={(e) => dispatch(setInstance(e.target.value))}
            value={instance}
          />
        </div>
        <div className="login__form__protocol" onChange={(e) => dispatch(setProtocol(e.target.value))}>
          <InputRadio
            list={radioList}
            className="protocol"
            value={protocol}
          />
        </div>
        <div className="login__form__submit">
          <Button
            text="Se connecter"
          />
        </div>
      </form>
    </div>
  )
};

export default Login;
