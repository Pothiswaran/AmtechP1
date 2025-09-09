export const pathExtractor = {
  extract(params: any): string {
    if (!params || !params.path) return '/';
    return Array.isArray(params.path) ? `/${params.path.join('/')}` : `/${params.path}`;
  },
};
