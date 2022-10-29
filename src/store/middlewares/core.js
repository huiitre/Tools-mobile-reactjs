//* Import des actions
import { toast } from 'react-toastify'
import core from '../actions/core'
import useAxios from '../../services/axiosInstance'

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
            store.dispatch(core.insertUser({ username, name, isLogged: true }))

            //* on insère le token et l'instance dans le localstorage
            const { instance, protocol } = store.getState().core.apiUrl
            store.dispatch(core.insertLocalStorage({ token, instance, protocol }))

            //todo faire un call afin de récupérer la config utilisateur
            //todo afin de vérifier si il souhaite stocker ces identifiants en LS ou non
            //todo en attendant, on le fait quand même
            store.dispatch(core.insertLocalStorage({ username: credentials.username, password: credentials.password }))

            res('Vous êtes connecté !')
          })
          .catch((e) => {
            store.dispatch(core.destroySession())
            console.log('%c core.js #30 || error : ', 'background:red;color:#fff;font-weight:bold;', e);
            let msg;
            if (e.response.data.message !== undefined) {
              msg = e.response.data.message
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
            const { username, name } = response.data
            store.dispatch(core.insertUser({ username, name, isLogged: true }))

            //todo redirection vers home
            res()
          })
          .catch((e) => {
            console.log('%c core.js #70 || e : ', 'background:red;color:#fff;font-weight:bold;', e.response);

            const username = localStorage.getItem('username')
            const password = localStorage.getItem('password')

            if (e.response.status === 401 && e.response.statusText === 'Unauthorized' && username !== '' && password !== '') {
              const credentials = { username, password }

              //* on tente la connexion avec les identifiants
              store.dispatch(core.apiLoginCheck(credentials))
              rej()
            } else {
              //* destroySession()
              store.dispatch(core.destroySession())
              //* redirection vers /login
              rej()
            }
          })
          .finally(() => store.dispatch(core.setConnectionLoading(false)))
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
