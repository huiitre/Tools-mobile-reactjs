import '../styles/gestion-essence.scss';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useCallback } from 'react';
import Separator from '../../Common/components/Separator'
import useFetchGestionEssenceList from '../hooks/useFetchGestionEssenceList';
import { defaultToast, fastToast } from '../../Common/components/toast/toasts';
import GestionEssenceItem from './GestionEssenceItem';
import ReturnButton from '../../Common/components/form/buttons/ReturnButton';
import AddButton from '../../Common/components/form/buttons/AddButton';
import RemoveButton from '../../Common/components/form/buttons/RemoveButton';
import ValidateButton from '../../Common/components/form/buttons/ValidateButton';
import pushOrSpliceNumber from '../../../services/pushOrSpliceNumber'
import useMutationDeleteTransaction from '../hooks/useMutationDeleteTransaction';
import InputField from '../../Common/components/form/fields/InputField';
import Modal from '../../Common/components/Modal';
import useModal from '../../Common/hooks/useModal';
import Select from '../../Common/components/form/fields/Select';
import Button from '../../Common/components/form/buttons/Button';
import useFetchVehicle from '../hooks/useFetchVehicle';
import useFetchFuel from '../hooks/useFetchFuel';
import { clearObjectValue } from '../../../services/clearObjectValue';
import { useMutationCreateTransaction } from '../hooks/useMutationCreateTransaction';

const GestionEssence = () => {
  //* récupération des transactions depuis l'api
  const onSettledFetch = () => {
    toast.dismiss('fetch-transaction')
  }
  const {
    data, isFetching, fetchNextPage, hasNextPage, isLoading
  } = useFetchGestionEssenceList('list', onSettledFetch)

  //* récupération des véhicules et des carburants
  const { data: dataVL } = useFetchVehicle('list')
  const { data: dataFuel } = useFetchFuel('list')

  //* eventListener du scroll down afin de changer de page et d'afficher plus de transactions
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const totalPageHeight = document.body.scrollHeight
      const scrollPoint = window.scrollY + window.innerHeight
      if (scrollPoint >= (totalPageHeight - 10))
        fetchNextPage()
    })
    if (!hasNextPage)
      window.removeEventListener('scroll', () => undefined)
  }, [])

  //! AJOUT
  //* HOOKS
  const { isShowing: isAddFormShowed, toggle: toggleAddForm } = useModal()

  //* hooks du formulaire
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
    setForm({
      location, price_liter, tank, km_travelled, vehicle, fuel, transaction_date, [e.target.name]: e.target.value
    })
  }

  const onSuccessCreate = (msg) => {
    toggleAddForm()
    setForm(defaultState)
    for (const val of msg)
      toast.success(val, fastToast())
    toast.dismiss('loading-create')
  }

  const mutationAddTransaction = useMutationCreateTransaction({
    location, price_liter: Number(price_liter), tank: Number(tank), km_travelled: Number(km_travelled), vehicle: Number(vehicle), fuel: Number(fuel), transaction_date
  }, onSuccessCreate)

  const handleSubmitAddForm = (e) => {
    e.preventDefault()

    const errorMessage = 'Veuillez remplir tous les champs'

    if (clearObjectValue({
      location, price_liter, tank, km_travelled, vehicle, fuel, transaction_date
    }) === 0) {
      toast.error(errorMessage, defaultToast())
      return
    }
    mutationAddTransaction.mutate()
  }

  //! SUPPRESSION
  //* HOOKS
  const [deleteMode, setDeleteMode] = useState(false);
  const [transactionListToDelete, setTransactionListToDelete] = useState([]);

  const onSuccessDelete = (res) => {
    setTransactionListToDelete([])
    setDeleteMode(false)
    for (const val of res)
      toast.success(val, defaultToast())

    toast.dismiss('loading-delete')
  }
  const onErrorDelete = (res) => {
    for (const val of res)
      toast.error(val, defaultToast())
  }
  const onPendingDelete = () => {
    toast.loading('Suppression des données en cours ...', defaultToast('loading-delete'))
  }

  //* on active le mode suppression multiple
  const handleActiveDeleteMode = () => {
    setDeleteMode(!deleteMode)
  }

  //* on récupère les transactions à supprimer
  const handleSelectTransaction = (id) => {
    const array = pushOrSpliceNumber(transactionListToDelete, id)
    setTransactionListToDelete(array)
  }

  //* mutation suppression d'une transaction
  const mutationDelete = useMutationDeleteTransaction({
    list: transactionListToDelete, onSuccessDelete, onErrorDelete, onPendingDelete
  })

  //* suppression de notre sélections
  const handleDelete = useCallback(async () => {
    if (transactionListToDelete.length > 0) {
      mutationDelete.mutate();
    } else {
      toast.error('Veuillez sélectionner au minimum une transaction !')
    }
  })

  return (
    ((isFetching && hasNextPage)) && toast.loading('Chargement des données ...', defaultToast('fetch-transaction')),
    !isLoading && (
      <>
        <Modal
          isShowing={isAddFormShowed}
          hide={toggleAddForm}
          title="Ajouter une transaction"
        >
          <form onSubmit={handleSubmitAddForm} className="add-transaction__form">
            <div className="add-transaction__form__elem add-transaction__form__location">
              <InputField
                className="field location"
                name="location"
                label="Nom de la transaction"
                type="text"
                placeholder="Nom"
                id="form-location"
                onChange={handleChange}
                hiddenLabel
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
                onChange={handleChange}
                float
                hiddenLabel
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
                onChange={handleChange}
                float
                hiddenLabel
              />
            </div>

            <div className="add-transaction__form__elem add-transaction__form__km_travelled">
              <InputField
                className="field km_travelled"
                name="km_travelled"
                label="Kilomètres parcouru"
                type="number"
                placeholder="KM parcourus"
                id="form-km_travelled"
                onChange={handleChange}
                float
                hiddenLabel
              />
            </div>

            <div className="add-transaction__form__elem add-transaction__form__date">
              <InputField
                className="field date"
                name="transaction_date"
                label="Date"
                type="date"
                id="form-date"
                onChange={handleChange}
                hiddenLabel
              />
            </div>

            <div className="add-transaction__form__elem add-transaction__form__vehicle">
              <Select
                label="Véhicule"
                id="vehicle"
                name="vehicle"
                className="field vehicle"
                idkey="v_id"
                optionText={['v_marque', 'v_modele', 'v_annee']}
                data={dataVL}
                onChange={handleChange}
                hiddenLabel
              />
            </div>

            <div className="add-transaction__form__elem add-transaction__form__fuel">
              <Select
                label="Carburant"
                id="fuel"
                name="fuel"
                className="field fuel"
                idkey="f_id"
                optionText={['f_name']}
                data={dataFuel}
                onChange={handleChange}
                hiddenLabel
              />
            </div>

            <div className="add-transaction__form__elem add-transaction__form__submit">
              <Button className="submit" text="Envoyer" />
            </div>
          </form>
        </Modal>

        <div className="gestion-essence">
          <div className="gestion-essence__header">
            <ReturnButton path="/" />
            <div className="gestion-essence__header__crud">
              {deleteMode === false && <AddButton callback={toggleAddForm} />}
              {deleteMode === true && <ValidateButton callback={handleDelete} />}
              <RemoveButton callback={handleActiveDeleteMode} />
            </div>
          </div>
          <Separator />
          <div className="gestion-essence__content">
            <div className="gestion-essence__content__infos">
              <div className="infos__vehicle">Véhicule : Ford Fiesta</div>
              <div className="infos__conso">Consommation : {data.pages[0].data.allConso} L / 100</div>
            </div>
            <Separator />
            <div className={`gestion-essence__content__list ${deleteMode ? 'delete-mode' : ''}`}>
              {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.data.result.map((item) => (
                    <GestionEssenceItem
                      data={item}
                      key={item.t_id}
                      callback={handleSelectTransaction}
                      deleteMode={deleteMode}
                      isSelected={!!transactionListToDelete.includes(Number(item.t_id))}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  )
};

export default GestionEssence;
