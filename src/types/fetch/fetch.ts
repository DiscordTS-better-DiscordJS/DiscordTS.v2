export interface FetchInterface {
    url: string
    body?: {}
    ContentType?: string
    method: 'GET' | 'POST' | string
}