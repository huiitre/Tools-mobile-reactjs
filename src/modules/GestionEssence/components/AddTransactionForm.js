import { useState } from 'react';
import Button from '../../Common/components/form/buttons/Button';
import InputField from '../../Common/components/form/fields/InputField';
import '../styles/add-transaction-form.scss';

const AddTransactionForm = ({ handleSubmit }) => {
  //* HOOKS
  const defaultState = {
    location: '',
    price_liter: 0,
    tank: 0,
    km_travelled: 0,
    vehicle: 1,
    fuel: 1,
    transaction_date: null
  }
  const [{
    location, price_liter, tank, km_travelled, vehicle, fuel, transaction_date
  }, setForm] = useState(defaultState);

  return (
    <form onSubmit={handleSubmit} className="add-transaction__form">
      <div className="add-transaction__form__elem add-transaction__form__location">
        <InputField
          className="field location"
          name="location"
          label="Nom de la transaction"
          type="text"
          placeholder="Nom"
          id="form-location"
          value=""
          onChange=""
        />
      </div>

      <div className="add-transaction__form__elem add-transaction__form__price-liter">
        <InputField
          className="field price-liter"
          name="price_liter"
          label="Prix au litre"
          type="number"
          placeholder="Prix au litre"
          id="form-price_liter"
          value=""
          onChange=""
        />
      </div>

      <div className="add-transaction__form__elem add-transaction__form__tank">
        <InputField
          className="field tank"
          name="tank"
          label="Nombre de litres ajoutés"
          type="number"
          placeholder="Nombre de litres ajoutés"
          id="form-tank"
          value=""
          onChange=""
        />
      </div>

      {/* //todo ajouter deux select pour le vehicule et le carburant */}
      <div className="add-transaction__form__elem add-transaction__form__date">
        <InputField
          className="field date"
          name="transaction_date"
          label="Date"
          type="date"
          id="form-date"
          value=""
          onChange=""
        />
      </div>

      <div className="add-transaction__form__elem add-transaction__form__submit">
        <Button className="submit" text="Envoyer" />
      </div>
    </form>
  )
};

export default AddTransactionForm;
