import { BaseResponse } from './base.payload';

export interface LinkInstagramResponse {
  url: string;
}

export interface InstagramResponse extends BaseResponse {
  data: {
    id: string;
    link_downloads: LinkInstagramResponse[];
    link_previews: LinkInstagramResponse[];
    format: string;
  };
}
