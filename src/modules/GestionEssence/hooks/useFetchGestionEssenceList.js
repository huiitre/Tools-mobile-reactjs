import { useInfiniteQuery } from '@tanstack/react-query';
import client from '../../../services/axiosInstance';
import gestionEssenceQueryKeys from '../keys-constants'

const useFetchGestionEssenceList = (key, onSettledFetch) => useInfiniteQuery(
  gestionEssenceQueryKeys[key](),
  async ({ pageParam = 1 }) => {
    const res = await client.get('/gestion-essence/list', { params: { page: pageParam } })

    return res
  },
  {
    getNextPageParam: (lastPage, pages) => {
      const { allPages } = lastPage.data
      const { currentPage } = lastPage.data

      if (Number(currentPage) === allPages) return undefined

      const nextPage = (Number(currentPage) + 1)
      return nextPage
    },
    onSuccess: () => {
      onSettledFetch()
    }
  },
);

export default useFetchGestionEssenceList;
