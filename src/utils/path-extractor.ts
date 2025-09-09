import { ParsedUrlQuery } from 'querystring';

export const pathExtractor = {
  extract(params?: ParsedUrlQuery): string {
    if (!params || !params.path) {
      return '/';
    }
    const path = params.path;
    return Array.isArray(path) ? `/${path.join('/')}` : `/${path}`;
  },
};
