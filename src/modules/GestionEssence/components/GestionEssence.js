import '../styles/gestion-essence.scss';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useCallback } from 'react';
import Separator from '../../Common/components/Separator'
import useFetchGestionEssenceList from '../hooks/useFetchGestionEssenceList';
import { defaultToast } from '../../Common/components/toast/toasts';
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
import AddTransactionForm from './addTransactionForm';

const GestionEssence = () => {
  //* récupération des transactions depuis l'api
  const onSettledFetch = () => {
    toast.dismiss('fetch-transaction')
  }
  const {
    data, isFetching, fetchNextPage, hasNextPage, isLoading
  } = useFetchGestionEssenceList('list', onSettledFetch)

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

  const handleAddForm = () => {
    // toggleAddForm()
  }

  const handleSubmitAddForm = () => {
    console.log('%c GestionEssence.js #48 || submit', 'background:blue;color:#fff;font-weight:bold;');
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
  }
  const onErrorDelete = (res) => {
    for (const val of res)
      toast.error(val, defaultToast())
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
    list: transactionListToDelete, onSuccessDelete, onErrorDelete
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
          <AddTransactionForm />
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
