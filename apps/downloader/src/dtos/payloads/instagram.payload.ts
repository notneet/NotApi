import { BaseResponse } from './base.payload';

export interface InstagramResponse extends BaseResponse {
  data: {
    id: string;
    link_downloads: string[];
    link_previews: string[];
    format: string;
  };
}
