import { EnvKey } from '@libs/commons';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  showAPIDetail(): Record<string, any> {
    return {
      base_path: this.config.get<string>(EnvKey.APP_URL, undefined),
      docs: this.config.get<string>(EnvKey.DOCS_URL, undefined),
      repo: this.config.get<string>(EnvKey.GITHUB_REPOSITORY, undefined),
      api_version: this.config.get<string>(EnvKey.API_VERSION, undefined),
      author: 'Hanivan Rizky Sobari',
    };
  }
}
