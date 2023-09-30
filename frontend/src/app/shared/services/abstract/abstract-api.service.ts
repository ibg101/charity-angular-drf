import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, catchError, of, identity } from "rxjs";
import { IEnvironment, ExtraParams } from "src/app/custom-types";

/**
 * Core API Service that provides generic methods to work with API calls.
 */
export abstract class AbstractApiService {
  public error: HttpErrorResponse | null = null;
  public retryAttempts: number = 3;
  private url: string = this.env.apiUrl;

  constructor(protected http: HttpClient, protected env: IEnvironment) {}

  get<T>(relativePath: string, { id, headers, httpParam, httpParamValue }: ExtraParams = { }): Observable<T> | never {
    const absolutePath = this.craftUrl(id, relativePath);
    const params = id ? undefined : new HttpParams().set(httpParam as string, httpParamValue as string);
    console.log(params) 
    return this.http.get<T>(absolutePath, { headers, params }).pipe(
      catchError(this.handleStrictError()),
    );
  }

  getAll<T>(relativePath: string, headers?: HttpHeaders): Observable<T[]> | never {
    const absolutePath = this.craftUrl(undefined, relativePath);
    return this.http.get<T[]>(absolutePath, { headers }).pipe(
      catchError(this.handleStrictError()),
    )
  }

  /**
   * 
   * @param assignError defines whether error handler should assign error to an error object. By default - true.
   * @param disableCatchError set to true to disable default behavior and prodive error handling manually. 
   */
  post<T>(relativePath: string, body: T | T[], { headers, assignError, disableCatchError }: ExtraParams = { }): Observable<T | T[]> | never {
    const absolutePath = this.craftUrl(undefined, relativePath); 
    return this.http.post<T | T[]>(absolutePath, body, { headers }).pipe(
      // identity is acting no-op operator's role
      disableCatchError ? identity : catchError(this.handleStrictError(assignError)),
    );
  }

  put<T>(relativePath: string, body: T, { id, headers }: ExtraParams = { }): Observable<T> | never {
    const absolutePath = this.craftUrl(id, relativePath);
    return this.http.put<T>(absolutePath, body, { headers }).pipe(
      catchError(this.handleStrictError()),
    )
  }

  delete(id: number, relativePath: string): Observable<void> | never {
    const absolutePath = this.craftUrl(id, relativePath);
    return this.http.delete<void>(absolutePath).pipe(
      catchError(this.handleStrictError()),
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

  /**
   * Prints to console.error() an error. Do not terminate the stream.
   * @deprecated
   */
  handleError(assignError: boolean = true) {
    return (err: HttpErrorResponse): Observable<HttpErrorResponse | void> => {
      const response = assignError ? of(this.error = err) : of(console.error(err));
      return response;
    }
  }

  /**
   * Instead of console.error(), throws an error, terminating the stream.
   */
  handleStrictError(assignError: boolean = true) {
    return (err: HttpErrorResponse): never => {
      assignError && (this.error = err); // shortand one line way
      this.throwError(err);
    }
  }

  throwError(err: HttpErrorResponse): never {
    throw new Error(err.message);
  }

  /**
   * Cleans the Error object up, resetting it to null.
   */
  cleanUpError(): void {
    this.error = null;
  }
}