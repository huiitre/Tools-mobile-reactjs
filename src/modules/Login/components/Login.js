import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../Common/components/form/buttons/Button';
import InputField from '../../Common/components/form/fields/InputField';
import InputRadio from '../../Common/components/form/fields/InputRadio';
import '../styles/login.scss';

const Login = () => {
  //* Hooks locaux
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instance, setInstance] = useState('');
  const [protocol, setProtocol] = useState('http');

  //* redux
  const dispatch = useDispatch();

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
            name="password"
            className="field password"
            id="field__username"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="login__form__instance">
          <InputField
            name="instance"
            className="field instance"
            id="field__username"
            placeholder="Instance"
            onChange={(e) => setInstance(e.target.value)}
            value={instance}
          />
        </div>
        <div className="login__form__protocol" onChange={(e) => setProtocol(e.target.value)}>
          <InputRadio
            list={radioList}
            className="protocol"
            onChange={(e) => setProtocol(e.target.value)}
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
