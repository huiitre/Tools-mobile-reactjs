import { useSelector } from 'react-redux';
import '../styles/config.scss';

const Config = () => {
  const { apiUrl, user } = useSelector((s) => s.core)
  console.log('%c Config.js #5 || core : ', 'background:red;color:#fff;font-weight:bold;', apiUrl, user);
  return (
    <div className="config">
      <div className="config__bloc config__infos">
        <label className="config__bloc__label">Informations</label>
        <div className="config__infos__instance">
          Instance : {apiUrl.protocol}://{apiUrl.instance}
        </div>

        <div className="config__infos__username">
          Nom d'utilisateur : {user.username}
        </div>

        <div className="config__infos__name">
          Pseudo : {user.name}
        </div>
      </div>
    </div>
  )
};

export default Config;
