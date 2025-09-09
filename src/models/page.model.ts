export interface Page {
  ID: number;
  RequestPath: string;
  Data: string;
  ApiKey: string | null;
  SiteName: string | null;
  Language: string | null;
  Tracking: boolean;
  CreatedDate: string;
  UpdatedDate: string;
}
