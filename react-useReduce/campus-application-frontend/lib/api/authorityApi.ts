import API from '@/lib/api/api';

import { Response } from '@/lib/types/requestType';

const BASE_URL = 'Authority';

const authorityApi = {
  'getRole': (): Promise<Response<any>> =>
    API.get('/dropdown'),

  'getAuthority': (params?: { systemId?: number; roleId?: number; userId?: string; nowPage?: number }): Promise<Response<any>> =>
    API.get(`/${BASE_URL}`, { params }),

  'getPage': (params?: { systemId?: number; roleId?: number; userId?: string; nowPage?: number }): Promise<Response<any>> =>
    API.get(`/${BASE_URL}/page`, { params }),

  'updatePermission': (data:any): Promise<Response<any>> =>
    API.patch(`/${BASE_URL}`, data, { 'headers': { 'Content-Type': 'application/json', }, }),

  'getDropdownRole': (params?: { systemId?: number;}): Promise<Response<any>> =>
    API.get('/dropdown/role', { params }),
};

export default authorityApi;