import {from, throwError} from 'rxjs'
import {takeWhile, catchError, map} from 'rxjs/operators'

const loginObservable = promise => {
  return from(promise).pipe(
    takeWhile(({status}) => status === 200),
    map(({message, data}) => ({
      message,
      token: data.token,
    })),
    catchError(err => throwError(err)),
  )
}

export {loginObservable}
