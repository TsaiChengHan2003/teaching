import API from '@/lib/api/api';

import { Response } from '@/lib/types/requestType';

const BASE_URL = 'system';

const systemApi = {

  'getSystemList': (): Promise<Response<any>> =>
    API.get(`/${BASE_URL}`),

  'addSystem': (data:FormData): Promise<Response<any>> =>
    API.post(`/${BASE_URL}`, data, { 'headers': { 'Content-Type': 'multipart/form-data', }, }),

  'updateSystem': (system_id:number, data:any): Promise<Response<any>> =>
    API.patch(`/${BASE_URL}/update/${system_id}`, data, { 'headers': { 'Content-Type': 'multipart/form-data', }, }),

  'deleteSystem': (id: string): Promise<Response<any>> =>
    API.delete(`/${BASE_URL}/${id}`),
};

export default systemApi;