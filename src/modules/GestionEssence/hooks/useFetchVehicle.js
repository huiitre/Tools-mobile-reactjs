import { useQuery } from '@tanstack/react-query';
import client from '../../../services/axiosInstance';
import { vehicleQueryKeys } from '../keys-constants';

const useFetchVehicle = (key) => useQuery(
  vehicleQueryKeys[key](),
  async () => {
    const res = await client.get('/vehicle/list')
    return res
  }
);

export default useFetchVehicle;
