/* eslint-disable camelcase */
import { useState } from 'react';
import Button from '../../Common/components/form/buttons/Button';
import InputField from '../../Common/components/form/fields/InputField';
import Select from '../../Common/components/form/fields/Select';
import useFetchVehicle from '../hooks/useFetchVehicle';
import '../styles/add-transaction-form.scss';

const AddTransactionForm = ({ handleSubmit }) => {
  //* on va chercher les vehicules et les carburants
  const { data: dataVL, isLoading: isLoadingVL, isFetched: isFetchedVL } = useFetchVehicle('list')

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

  const handleChange = (e) => {
    console.log('%c addTransactionForm.js #27 || select change value + name : ', 'background:red;color:#fff;font-weight:bold;', e.target.value, e.target.name);
  }

  return (
    (!isLoadingVL && isFetchedVL) && (
      <form onSubmit={handleSubmit} className="add-transaction__form">
        <div className="add-transaction__form__elem add-transaction__form__location">
          <InputField
            className="field location"
            name="location"
            label="Nom de la transaction"
            type="text"
            placeholder="Nom"
            id="form-location"
            value={location}
            onChange={handleChange}
          />
        </div>

        <div className="add-transaction__form__elem add-transaction__form__price-liter">
          <InputField
            className="field price_liter"
            name="price_liter"
            label="Prix au litre"
            type="number"
            placeholder="Prix au litre"
            id="form-price_liter"
            value={price_liter}
            onChange={handleChange}
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
            value={tank}
            onChange={handleChange}
          />
        </div>

        <div className="add-transaction__form__elem add-transaction__form__km_travelled">
          <InputField
            className="field km_travelled"
            name="km_travelled"
            label="Nombre de litres ajoutés"
            type="number"
            placeholder="Nombre de litres ajoutés"
            id="form-km_travelled"
            value={km_travelled}
            onChange={handleChange}
          />
        </div>

        <div className="add-transaction__form__elem add-transaction__form__date">
          <InputField
            className="field date"
            name="transaction_date"
            label="Date"
            type="date"
            id="form-date"
            value={transaction_date}
            onChange={handleChange}
          />
        </div>

        <div className="add-transaction__form__elem add-transaction__form__vehicle">
          <Select
            label="Véhicule"
            id="vehicle"
            className="field vehicle"
            data={dataVL}
            idkey=""
            optionText=""
            onChange={handleChange}
          />
        </div>

        <div className="add-transaction__form__elem add-transaction__form__fuel">
          <Select
            label="Véhicule"
            id="vehicle"
            className="field fuel"
            data={dataVL}
            idkey=""
            optionText=""
            onChange={handleChange}
          />
        </div>

        <div className="add-transaction__form__elem add-transaction__form__submit">
          <Button className="submit" text="Envoyer" />
        </div>
      </form>
    )
  )
};

export default AddTransactionForm;
