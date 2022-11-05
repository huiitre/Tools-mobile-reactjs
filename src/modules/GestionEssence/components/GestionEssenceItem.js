import { useState } from 'react';
import { dayMonthYear } from '../../../services/dateFormat';
import Modal from '../../Common/components/Modal';
import Separator from '../../Common/components/Separator';
import useModal from '../../Common/hooks/useModal';
import '../styles/gestion-essence-item.scss';

const GestionEssenceItem = ({
  data, callback, deleteMode
}) => {
  //* hook de sélection
  const [isSelectedDM, setIsSelectedDM] = useState(false);

  const handleSelected = () => {
    callback(data.t_id)
    setIsSelectedDM(!isSelectedDM)
  }

  //* affichage de la modal
  const { isShowing: isModalShowed, toggle: toggleShowModal } = useModal()

  return (
    <>
      <Modal
        isShowing={isModalShowed}
        hide={toggleShowModal}
      >
        <div className="transaction-detail">
          <div className="transaction-detail__item transaction-detail__t_id">
            <span className="name">
              Transaction ID
            </span>
            <span className="value">
              {data.t_id}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__t_location">
            <span className="name">
              Nom
            </span>
            <span className="value">
              {data.t_location}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__t_date">
            <span className="name">
              Date
            </span>
            <span className="value">
              {dayMonthYear(data.t_date)}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__f_name">
            <span className="name">
              Carburant
            </span>
            <span className="value">
              {data.f_name}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__t_price_liter">
            <span className="name">
              Prix au litre
            </span>
            <span className="value">
              {data.t_price_liter} L / 100
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__t_tank">
            <span className="name">
              Nb de litres ajoutés
            </span>
            <span className="value">
              {data.t_tank} L
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__t_km_travelled">
            <span className="name">
              KM parcouru
            </span>
            <span className="value">
              {data.t_km_travelled} km
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__t_conso">
            <span className="name">
              Consommation moyenne
            </span>
            <span className="value">
              {data.t_conso}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__t_montant">
            <span className="name">
              Montant
            </span>
            <span className="value">
              {data.t_montant} €
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__v_marque">
            <span className="name">
              Marque du véhicule
            </span>
            <span className="value">
              {data.v_marque}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__v_modele">
            <span className="name">
              Modèle du véhicule
            </span>
            <span className="value">
              {data.v_modele}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__v_annee">
            <span className="name">
              Année du véhicule
            </span>
            <span className="value">
              {data.v_annee}
            </span>
          </div>
          <Separator />
          <div className="transaction-detail__item transaction-detail__v_reservoir">
            <span className="name">
              Réservoir max du véhicule
            </span>
            <span className="value">
              {data.v_reservoir}
            </span>
          </div>
        </div>
      </Modal>
      <div className={`transaction ${isSelectedDM ? 'delete-mode--selected' : ''}`} onClick={deleteMode ? handleSelected : toggleShowModal}>
        <span className="transaction__date">{dayMonthYear(data.t_date)}</span> |
        <span className="transaction__montant">{data.t_montant} €</span> |
        <span className="transaction__conso">{data.t_conso} L</span>
      </div>
    </>
  )
};

export default GestionEssenceItem;
