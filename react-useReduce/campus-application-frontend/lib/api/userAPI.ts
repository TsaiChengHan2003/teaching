import API from '@/lib/api/api';
import { Response } from '@/lib/types/requestType';

const UserAPI = {
  'login': (token?: string): Promise<Response<null>> =>
    API.post('/login', undefined, { 'headers': { 'X-Client-Token': token } }),

  'getPermission': (): Promise<Response<any>> =>
    API.get('/user/permissions'),
};

export default UserAPI;