import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of, identity } from "rxjs";
import { IEnvironment, IHeadersOrUndefined, ExtraParams } from "src/app/custom-types";

/**
 * Core API Service that provides generic methods to work with API calls.
 */
export abstract class AbstractApiService {
  public error: HttpErrorResponse | null = null;
  public retryAttempts: number = 3;
  private url: string = this.env.apiUrl;

  constructor(protected http: HttpClient, protected env: IEnvironment) {}

  get<T>(id: number, relativePath: string, headers?: HttpHeaders): Observable<T | HttpErrorResponse> {
    const absolutePath = this.craftUrl(id, relativePath); 
    return this.http.get<T | HttpErrorResponse>(absolutePath, this.setHeaders(headers)).pipe(
      catchError(this.handleError() as () => Observable<HttpErrorResponse>),
    );
  }

  getAll<T>(relativePath: string, headers?: HttpHeaders): Observable<T[] | HttpErrorResponse> {
    const absolutePath = this.craftUrl(undefined, relativePath);
    return this.http.get<T[] | HttpErrorResponse>(absolutePath, this.setHeaders(headers)).pipe(
      catchError(this.handleError() as () => Observable<HttpErrorResponse>),
    )
  }

  /**
   * 
   * @param assignError defines whether error handler should assign error to an error object. By default - true.
   * @param disableCatchError set to true to disable default behavior and prodive error handling manually. 
   */
  post<T>(relativePath: string, body: T | T[], { headers, assignError, disableCatchError }: ExtraParams = { }): Observable<T | T[] | HttpErrorResponse | void> {
    const absolutePath = this.craftUrl(undefined, relativePath); 
    return this.http.post<T | T[] | HttpErrorResponse | void>(absolutePath, body, this.setHeaders(headers)).pipe(
      // identity is acting no-op operator's role
      disableCatchError ? identity : catchError(this.handleError(assignError)),
    );
  }

  put<T>(id: number, relativePath: string, body: T, headers?: HttpHeaders): Observable<T | HttpErrorResponse> {
    const absolutePath = this.craftUrl(id, relativePath);
    return this.http.put<T | HttpErrorResponse>(absolutePath, body, this.setHeaders(headers)).pipe(
      catchError(this.handleError() as () => Observable<HttpErrorResponse>),
    )
  }

  delete(id: number, relativePath: string): Observable<void | HttpErrorResponse> {
    const absolutePath = this.craftUrl(id, relativePath);
    return this.http.delete<void | HttpErrorResponse>(absolutePath).pipe(
      catchError(this.handleError()),
    )
  }

  // helper methods
  craftUrl(id?: number, relativePath?: string): string {
    // please consider adding trailing slash at the end, otherwise -> server error, since current drf setup forces it 
    switch(true) {
      case !!id && !!relativePath:
        return `${this.url}/${relativePath}/${id}/`;
      case !!relativePath:
        return `${this.url}/${relativePath}/`;
      default:
        return `${this.url}/`;
    }
  }

  handleError(assignError: boolean = true) {
    return (err: HttpErrorResponse): Observable<HttpErrorResponse | void> => {
      const response = assignError ? of(this.error = err) : of(console.error(err));
      return response;
    }
  }

  setHeaders(headers?: HttpHeaders): IHeadersOrUndefined {
    return { headers: headers ? headers : undefined };
  }
}