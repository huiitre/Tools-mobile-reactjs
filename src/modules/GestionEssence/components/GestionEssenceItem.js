import { useState } from 'react';
import { dayMonthYear } from '../../../services/dateFormat';
import '../styles/gestion-essence-item.scss';

const GestionEssenceItem = ({
  data, isSelected, callback, deleteMode
}) => {
  //* hook de sélection
  const [isSelectedDM, setIsSelectedDM] = useState(false);

  const handleSelected = () => {
    callback(data.t_id)
    setIsSelectedDM(!isSelectedDM)
  }

  return (
    <div className={`transaction ${isSelectedDM ? 'delete-mode--selected' : ''}`} onClick={deleteMode ? handleSelected : undefined}>
      <span className="transaction__date">{dayMonthYear(data.t_date)}</span> |
      <span className="transaction__montant">{data.t_montant} €</span> |
      <span className="transaction__conso">{data.t_conso} L</span>
    </div>
  )
};

export default GestionEssenceItem;
