import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { IEnvironment } from "src/app/custom-types";

export abstract class AbstractApiService {
  public error: HttpErrorResponse | null = null;
  private url: string = this.env.apiUrl;

  constructor(protected http: HttpClient, protected env: IEnvironment) {}

  get<T>(id: number, relativePath: string): Observable<T | HttpErrorResponse> {
    const absolutePath = this.craftUrl(id, relativePath); 
    return this.http.get<T | HttpErrorResponse>(absolutePath).pipe(
      catchError((err: HttpErrorResponse) => of(this.error = err))
    );
  }

  getAll<T>(relativePath: string): Observable<T[] | HttpErrorResponse> {
    const absolutePath = this.craftUrl(undefined, relativePath);
    return this.http.get<T[] | HttpErrorResponse>(absolutePath).pipe(
      catchError((err: HttpErrorResponse) => of(this.error = err))
    )
  }

  post<T>(relativePath: string, body: T | T[], headers?: HttpHeaders): Observable<T | T[] | HttpErrorResponse> {
    const absolutePath = this.craftUrl(undefined, relativePath);
    return this.http.post<T | T[] | HttpErrorResponse>(absolutePath, body, { headers: headers ? headers : undefined }).pipe(
      catchError((err: HttpErrorResponse) => of(this.error = err))
    );
  }

  put<T>(id: number, relativePath: string, body: T): Observable<T | HttpErrorResponse> {
    const absolutePath = this.craftUrl(id, relativePath);
    return this.http.put<T | HttpErrorResponse>(absolutePath, body).pipe(
      catchError((err: HttpErrorResponse) => of(this.error = err))
    )
  }

  delete(id: number, relativePath: string): Observable<void | HttpErrorResponse> {
    const absolutePath = this.craftUrl(id, relativePath);
    return this.http.delete<void | HttpErrorResponse>(absolutePath).pipe(
      catchError((err: HttpErrorResponse) => of(this.error = err))
    )
  }

  // helper methods
  craftUrl(id?: number, relativePath?: string): string {
    switch(true) {
      case !!id && !!relativePath:
        return `${this.url}/${relativePath}/${id}`;
      case !!relativePath:
        return `${this.url}/${relativePath}`;
      default:
        return this.url;
    }
  }
}