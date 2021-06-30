export interface HTTPservicesReturn<Data> {
  ok: boolean;
  status: number;
  data: Data;
  raw?: unknown;
}
