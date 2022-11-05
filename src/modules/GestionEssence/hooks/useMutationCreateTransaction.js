import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import client from '../../../services/axiosInstance'
import { defaultToast, fastToast } from '../../Common/components/toast/toasts'
import { gestionEssenceQueryKeys } from '../keys-constants'

export const useMutationCreateTransaction = (credentials, callbackSuccess, callbackError, callbackPending) => {
  const queryClient = useQueryClient()
  return useMutation(
    gestionEssenceQueryKeys.create(),
    async () => {
      const res = await client.post('/gestion-essence/add', credentials)
      return res
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(gestionEssenceQueryKeys.list())
        callbackSuccess(res.data.msg)
      },
      onError: (e) => {
        for (const val of e?.response?.data?.msg)
          toast.error(val, fastToast())
      },
      onMutate: () => toast.loading('Ajout de la transaction en cours ...', defaultToast('loading-create'))
    }
  )
}
