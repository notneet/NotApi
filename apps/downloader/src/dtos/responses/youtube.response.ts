export interface YTResponse {
  status: number;
  message: string;
  data: Data;
}

interface Data {
  id: string;
  title: string;
  duration: string;
  mp3: Mp3Data[];
  mp4: string;
  thumbnail: string;
  mp3_cdn: string;
  mp4_cdn: string;
}

interface Mp3Data {
  mp3_url: string;
  mp3_format: string;
  mp3_format_note: string;
}
