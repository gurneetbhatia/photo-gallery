import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingScreenService } from './loading-screen.service';

@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {

    activeRequests: number = 0;

    constructor(private loadingScreenService: LoadingScreenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.activeRequests === 0) {
            this.loadingScreenService.startLoading();
        }

        this.activeRequests += 1;
        return next.handle(req).pipe(
            finalize(() => {
                this.activeRequests -= 1;
                if (this.activeRequests === 0) {
                    this.loadingScreenService.stopLoading();
                }
            })
        )
    }

}