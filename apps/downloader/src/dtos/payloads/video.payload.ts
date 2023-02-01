import { BaseResponse } from './base.payload';

export interface VideoResponse extends BaseResponse {
  data: {
    id: string | null;
    title: string | null;
    duration: string | null;
    mp4_token: string | null;
    mp3_token: string | null;
    thumbnail: string | null;
    mp4_cdn: string | null;
    mp3_format: string;
    mp3_format_note: string;
  };
}
