import { dayMonthYear } from '../../../services/dateFormat';
import '../styles/gestion-essence-item.scss';

const GestionEssenceItem = ({ data }) => {
  return (
    <div className="transaction">
      <span className="transaction__date">{dayMonthYear(data.t_date)}</span> |
      <span className="transaction__montant">{data.t_montant} €</span> |
      <span className="transaction__conso">{data.t_conso} L</span>
    </div>
  )
};

export default GestionEssenceItem;
