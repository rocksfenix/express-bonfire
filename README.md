# express-bonfire

An utility and middleware for dispatch and handling errors on express.js

We dispatch something like:
```javascript
dispatchError('404 | The user is not found')
```
On the response we have a json with http status code 404
```javascript
{
  error: true,
  message: 'The user is not found'
}
```

Instead of return the json error manually like:

```javascript
app.get('/user:id', (req, res, next) => {
  try {
    if (req.params.id !== 123) {
      return res
        .status(404)
        .json({
          error: true,
          message: 'The user is not found'
        })
    }
  } catch (error) {
    next(error)
  }
})
```

```javascript
// Convert this:
app.get('/user:id', (req, res, next) => {
  try {
    if (req.params.id !== 123) {
      return res
        .status(404)
        .json({
          error: true,
          message: 'The user is not found'
        })
    }
  } catch (error) {
    next(error)
  }
})

// To this:
app.get('/user:id', (req, res, next) => {
  try {
    if (req.params.id !== 123) {
      dispatchError('404 | The user is not found')
    }
  } catch (error) {
    next(error)
  }
})
```

## Installation

```bash
npm install -save express-bonfire
```

## Usage

```javascript
// Basic example
const app = require('express')()
const { dispatchError, errorMiddleware } = require('express-bonfire')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/user/:id', (req, res, next) => {
  try {
    // Dispatch error
    dispatchError(`404 | The user with id: ${req.params.id} is not found`)
  } catch (error) {
    next(error)
  }
})

// Adding the error middleware to the end
app.use(errorMiddleware)

// In the response we have:
// status http 404 
// {
//   error: true,
//   message: 'The user with id: 123 is not found'
// }
```

```javascript
// Example
const app = require('express')()
const { dispatchError, errorMiddleware } = require('express-bonfire')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/login', (req, res, next) => {
  try {
    if (!req.body.email) {
      dispatchError('422 | Email was not included')
    }

    if (!req.body.password) {
      dispatchError('422 | Password was not included')
    }

    if (!req.body.password.length < 6) {
      dispatchError('422 | The password must be at least 6 characters')
    }
  } catch (error) {
    next(error)
  }
})

// Adding the error middleware to the end
app.use(errorMiddleware)
```

## Default separators
The default separators to split the code status http and message are ``|``, ``=>``, ``->`` but you can chage, creating a custom dispatcherError function.

## code
You can pass code inside of parentheses eg: (7891) for handling responses on client-side
```javascript
app.get('/login', (req, res, next) => {
  try {
    if (!req.body.email) {
      dispatchError('422 | Email was not included (8749)')
    }
  } catch (error) {
    next(error)
  }
})

// JSON Response: 422
// Now on client-side you can handling the errorCode for 8749
{
  "message": "Email was not included",
  "errorCode": 8749,
  "error": true
}
```

## Extra Data

```javascript
// Example
const app = require('express')()
const { dispatchError, errorMiddleware } = require('express-bonfire')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/login', (req, res, next) => {
  try {
    if (!req.body.email) {
      dispatchError('422 | Email was not included', {
        // Other data here!
        codeErrorPath: 'email'
      })
    }
  } catch (error) {
    next(error)
  }
})

// Adding the error middleware to the end
app.use(errorMiddleware)

// In the response we have:
//  {
//    error: true,
//    message: 'Email was not included',
//    codeErrorPath: 'email'
//  }
```
## Custom Error Dispatcher
```javascript
// Example
const app = require('express')()
const { DispatchErrorCustom, errorMiddleware } = require('express-bonfire')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// dding custom dispatch error
const customDispatch = DispatchErrorCustom({
  statusHTTP: 200,
  // Error message for humans
  message: 'Ohh no! 🔥',
  // Error code for apis
  errorCode: 100,
  dividers: [ '**', '>>' ]
})

app.get('/login', (req, res, next) => {
  try {
    if (!req.body.email) {
      customDispatch()
    }
  } catch (error) {
    next(error)
  }
})

// Adding the error middleware to the end
app.use(errorMiddleware)

// In the response we have:
//  {
//    error: true,
//    message: 'Ohh no! 🔥',
//    errorCode: 100
//  }
```

## Custom dispatcher options

Prop Name          | Type      | Default    | Description |
------------------ | --------- | ---------- | ----------- |
statusHTTP         | Number     | 200        | Status code http for response |
errorCode          | Number    | 0          | Code for handling responses on client-side |
message            | String    |'Something is wrong 🔥'| Error message for humans |
dividers           | Array    | ['\|', '=>', '->']  | Characters for separate the status code http and message eg "404 => Whoops! Nos found" |
codePattern        | Object RegExp  | /\((\s+)?(\d*)(\s+)?\)/gm  | Pattern to extract the errorCode |
cleanCodePattern   | Object RegExp  | /(\(\|\))/gm  | Pattern to remove error Code to the message |

-----

This package uses Standard JS

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)