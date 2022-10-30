//* Import des actions
import { toast } from 'react-toastify'
import core from '../__actions/__core'
import useAxios from '../../services/axiosInstance'
import LS from '../../services/localStorage'
import { insertUser, destroySession, setConnectionLoading } from '../reducers/core'

const CoreMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case core.API_LOGIN_CHECK: {
      //* récupération des données
      const { credentials } = action

      //* clear de tous les toast
      toast.dismiss()

      //* écriture de la promesse
      const loginCheck = new Promise((res, rej) => {
        useAxios.post('/login_check', credentials)
          .then((response) => {
            const { token, data: { username, name } } = response.data

            //* on insère les données basiques de l'user dans redux
            store.dispatch(insertUser({ username, name, isLogged: true }))

            const { instance, protocol } = store.getState().core.apiUrl
            //todo faire un call afin de récupérer la config utilisateur
            //todo afin de vérifier si il souhaite stocker ces identifiants en LS ou non
            //todo en attendant, on le fait quand même
            const coreConfig = {
              token,
              instance,
              protocol,
              username: credentials.username,
              password: credentials.password
            }
            //* on insère le token et l'instance dans le localstorage
            LS.set('core', coreConfig)

            res('Vous êtes connecté !')
          })
          .catch((error) => {
            console.log('%c core.js #44 || error : ', 'background:red;color:#fff;font-weight:bold;', error);
            LS.clear()

            let msg;

            if (error?.response?.data?.message !== undefined) {
              msg = error.response.data.message
              rej(msg)
            }
            msg = 'Une erreur de connexion est survenue'
            rej(msg)
          })
      });

      toast.promise(
        loginCheck,
        {
          pending: 'Connexion en cours ...',
          success: { render: ({ data }) => data },
          error: {
            render: ({ data }) => data
          },
        }
      )
    }
      next(action)
      break;

    case core.API_LOAD_USER: {
      const loadUser = new Promise((res, rej) => {
        //* on lance un spinner spécial pour éviter l'affichage de /login quand la requête est lancé
        store.dispatch(core.setConnectionLoading(true))
        useAxios.get('/user/profile')
          .then((response) => {
            //* on insère les données basiques de l'user dans redux
            const { email, name } = response.data
            store.dispatch(insertUser({ username: email, name, isLogged: true }))

            //todo redirection vers home
            res()
          })
          .catch((e) => {
            console.log('%c core.js #70 || e : ', 'background:red;color:#fff;font-weight:bold;', e.response);

            const { username, password } = LS.get('core')

            if (e.response.status === 401 && e.response.statusText === 'Unauthorized' && !!username && Boolean(password)) {
              const credentials = { username, password }

              //* on tente la connexion avec les identifiants
              store.dispatch(core.apiLoginCheck(credentials))
              rej()
            } else {
              //* destroySession()
              store.dispatch(destroySession())
              LS.clear()
              //* redirection vers /login
              rej()
            }
          })
          .finally(() => store.dispatch(setConnectionLoading(false)))
      })

      toast.promise(
        loadUser,
        {
          pending: 'Chargement des données ...',
        }
      )
    }
      next(action)
      break;

    default:
      next(action)
  }
}

export default CoreMiddleware;
