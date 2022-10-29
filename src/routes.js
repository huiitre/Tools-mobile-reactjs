import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Route, Routes as RouterRoutes, useLocation, useNavigate, Navigate
} from 'react-router-dom'
import Spinner from './modules/Common/components/Spinner'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import core from './store/actions/core'

const Routes = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.core.user)

  const location = useLocation()
  const navigate = useNavigate()

  //* On lance loadUser si il y a quelque chose en localstorage
  //* sinon on détruit la session au cas où
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('instance') && localStorage.getItem('protocol')) {
      dispatch(core.apiLoadUser())
    } else {
      dispatch(core.destroySession())
    }

    //* pour android
    if (location.pathname === '/index.html')
      location.pathname = '/'
  }, [])

  //* si on est connecté et qu'on est sur la route /login, on navigue vers /
  useEffect(() => {
    const loc = location.pathname === '/login' ? '/' : location.pathname
    navigate(loc)
  }, [isLogged])

  //? on récupère le core.connectionLoading pour éviter d'afficher le formulaire de connexion quand loadUser est exécuté
  const { connectionLoading } = useSelector((state) => state.core)

  return (
    //? Les balises vides sont obligatoires sinon connexionLoading devient une méthode et non la variable récupéré plus haut
    <>
      {connectionLoading ? (
        <Spinner />
      ) : (
        <RouterRoutes>
          {isLogged && (
            <>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<NotFoundPage />} />
            </>
          )}
          {!isLogged && (
          <>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="*" element={<Navigate to="/login" />} />
          </>
          )}
          <Route exact path="*" element={<NotFoundPage />} />
        </RouterRoutes>
      )}
    </>
  )
}

export default Routes
