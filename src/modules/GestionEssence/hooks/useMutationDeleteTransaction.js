import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../../services/axiosInstance'
import { gestionEssenceQueryKeys } from '../keys-constants'

const useMutationDeleteTransaction = ({
  list, onSuccessDelete, onErrorDelete, onPendingDelete
}) => {
  const queryClient = useQueryClient()
  const data = {
    list
  }

  return useMutation(
    gestionEssenceQueryKeys.delete(),
    async () => {
      const response = await client.delete('/gestion-essence/delete', { data })
      return response
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(gestionEssenceQueryKeys.list())
        onSuccessDelete(res.data.msg)
      },
      onError: (e) => {
        onErrorDelete(e.response.data.msg)
      },
      onMutate: () => onPendingDelete()
    }
  )
}

export default useMutationDeleteTransaction
