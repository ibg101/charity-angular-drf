import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { IEnvironment } from "src/app/custom-types";

export abstract class AbstractApiService {
  public error: HttpErrorResponse | null = null;
  private url: string = this.env.apiUrl;

  constructor(protected http: HttpClient, protected env: IEnvironment) {}

  get<T>(id: number, relativePath: string): Observable<T | T[] | HttpErrorResponse> {
    const absolutePath = this.craftUrl(id, relativePath ? relativePath : undefined); 
    return this.http.get<T | T[] | HttpErrorResponse>(absolutePath).pipe(
      catchError((err: HttpErrorResponse) => of(this.error = err))
    );
  }

  // helper methods
  craftUrl(id?: number, relativePath?: string): string {
    switch(true) {
      case !!id && !!relativePath:
        return `${this.url}/${relativePath}/${id}`;
      case !!id:
        return `${this.url}/${id}`;
      case !!relativePath:
        return `${this.url}/${relativePath}`;
      default:
        return this.url;
    }
  }
}