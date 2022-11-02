import { useQuery } from '@tanstack/react-query';
import client from '../../../services/axiosInstance';
import { fuelQueryKeys } from '../keys-constants';

const useFetchFuel = (key) => useQuery(
  fuelQueryKeys[key](),
  async () => {
    const res = await client.get('/fuel/list')
    return res
  }
);

export default useFetchFuel;
