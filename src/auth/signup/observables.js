import {from, throwError} from 'rxjs'
import {map, takeWhile, catchError} from 'rxjs/operators'

const signupObservable = promise => {
  return from(promise).pipe(
    takeWhile(({status}) => status === 201),
    map(({message, data}) => ({
      message,
      token: data.token,
    })),
    catchError(err => {
      throwError(err.toJSON().message)
    }),
  )
}

export {signupObservable}
