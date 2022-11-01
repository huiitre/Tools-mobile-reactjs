import '../styles/gestion-essence.scss';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import Separator from '../../Common/components/Separator'
import useFetchGestionEssenceList from '../hooks/useFetchGestionEssenceList';
import defaultToast from '../../Common/components/toast/defaultToast';
import GestionEssenceItem from './GestionEssenceItem';

const GestionEssence = () => {
  const {
    data, isFetching, fetchNextPage, hasNextPage, isLoading
  } = useFetchGestionEssenceList('list')

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

  console.log('%c GestionEssence.js #25 || data : ', 'background:red;color:#fff;font-weight:bold;', !isLoading && data);

  return (
    ((isFetching && hasNextPage) || isLoading) && toast.loading('Chargement des données ...', defaultToast),
    !isFetching && toast.dismiss(),
    !isLoading && (
      <div className="gestion-essence">
        <div className="gestion-essence__header">
          <div className="gestion-essence__header__crud"></div>
        </div>
        <Separator />
        <div className="gestion-essence__content">
          <div className="gestion-essence__content__infos">
            <div className="infos__vehicle">Véhicule : Ford Fiesta</div>
            <div className="infos__conso">Consommation : {data.pages[0].data.allConso} L / 100</div>
          </div>
          <Separator />
          <div className="gestion-essence__content__list">
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.result.map((item) => <GestionEssenceItem data={item} key={item.t_id} />)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  )
};

export default GestionEssence;
