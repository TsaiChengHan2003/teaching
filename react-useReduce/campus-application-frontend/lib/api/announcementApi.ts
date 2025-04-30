import API from '@/lib/api/api';

import { Response } from '@/lib/types/requestType';

const BASE_URL = 'announcement';

const announcementApi = {

  'getAnnouncement': (params: { nowPage: number; }): Promise<Response<any>> =>
    API.get(`/${BASE_URL}`, { params }),

  'addAnnouncement': (data: any): Promise<Response<any>> =>
    API.post(`/${BASE_URL}`, data, { 'headers': { 'Content-Type': 'application/json', }, }),

  'deleteAnnouncement': (id: string): Promise<Response<any>> =>
    API.delete(`/${BASE_URL}/${id}`),

  'updateAnnouncement': (system_id:number, data:any): Promise<Response<any>> =>
    API.patch(`/${BASE_URL}/${system_id}`, data, { 'headers': { 'Content-Type': 'application/json', }, }),

  'getPage': (): Promise<Response<any>> =>
    API.get(`/${BASE_URL}/page`),
};

export default announcementApi;