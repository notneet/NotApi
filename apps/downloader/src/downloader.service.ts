import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { InstagramResponse } from './dtos/payloads/instagram.payload';
import { VideoResponse } from './dtos/payloads/video.payload';
import { load } from 'cheerio';
import { IGResponse } from './dtos/responses/instagram.response';
import { YTResponse } from './dtos/responses/youtube.response';

@Injectable()
export class DownloaderService {
  constructor(private readonly httpService: HttpService) {}

  async processYoutubeLink(url: string) {
    const body = `u=${encodeURIComponent(url)}&c=ID`;
    const { data: response } = await lastValueFrom(
      this.httpService.post<YTResponse>('https://ytpp3.com/newp', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'gzip,deflate,compress',
        },
      }),
    );
    const mp3 = response.data.mp3[0];

    const payload: VideoResponse = {
      message: response.message,
      error: response.message === 'success' ? false : true,
      data: {
        id: response.data?.id,
        title: response.data?.title,
        duration: response.data?.duration,
        thumbnail: response.data?.thumbnail,
        mp4_token: this.normalizeURL(response.data.mp4),
        mp3_token: this.normalizeURL(mp3.mp3_url),
        mp4_cdn: response.data?.mp4_cdn,
        mp3_format: mp3?.mp3_format,
        mp3_format_note: mp3?.mp3_format_note,
      },
    };

    return payload;
  }

  async processInstagramLink(url: string) {
    const body = `q=${encodeURIComponent(url)}&downloader=image`;
    const { data: response } = await lastValueFrom(
      this.httpService.post<IGResponse>(
        'https://instaoffline.net/process/',
        body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/json,text/javascript,*/*; q=0.01',
          },
        },
      ),
    );
    const [linkDownloads, linkPreviews] = this.parseIGResponse(response.html);

    const payload: InstagramResponse = {
      message: response.error === true ? 'fail' : 'success',
      error: response.error,
      data: {
        id: response.q,
        format: response.format,
        link_downloads: linkDownloads,
        link_previews: linkPreviews,
      },
    };

    return payload;
  }

  private parseIGResponse(html: string): [string[], string[]] {
    let downloads: string[] = [];
    let previews: string[] = [];
    const $ = load(html);
    const imgSrc = $('img');
    const aHref = $('a.button');

    if (imgSrc.length > 0) {
      imgSrc.each((_, el) => {
        previews.push($(el).attr('src'));
      });
    }

    if (aHref.length > 0) {
      aHref.each((_, el) => {
        downloads.push($(el).attr('href'));
      });
    }

    return [downloads, previews];
  }

  private normalizeURL(text: string) {
    return !text ? null : encodeURIComponent(text);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
