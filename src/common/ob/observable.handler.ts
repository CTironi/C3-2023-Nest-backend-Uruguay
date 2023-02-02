import { Observable } from "rxjs";

export class ObservableHandler {
    handler<T>(value: T) {
        return new Observable<T>(observer => {
            observer.next(value);
            observer.complete();
        })
    }
}