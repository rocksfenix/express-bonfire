# express-bonfire

An utility and middleware for dispatch and handling errors on express.js

We dispatch something like:
```javascript
dispatchError('404: The user is not found')
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
app.get('/user:id', (req, res) => {
  if (req.params.id !== 123) {
    return res
      .status(404)
      .json({
        error: true,
        message: 'The user is not found'
      })
  }
})
```

```javascript
// Convert this:
app.get('/user:id', (req, res) => {
  if (req.params.id !== 123) {
    return res
      .status(404)
      .json({
        error: true,
        message: 'The user is not found'
      })
  }
})

// To this:
app.get('/user:id', (req, res) => {
  if (req.params.id !== 123) {
    dispatchError('404: The user is not found')
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

app.get('/user/:id', (req, res) => {
  // Dispatch error
  dispatchError(`404: The user with id: ${req.params.id} is not found`)
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

app.get('/login', (req, res) => {
  if (!req.body.email) {
    dispatchError('422: Email was not included')
  }

  if (!req.body.password) {
    dispatchError('422: Password was not included')
  }

  if (!req.body.password.length < 6) {
    dispatchError('422: The password must be at least 6 characters')
  }
})

// Adding the error middleware to the end
app.use(errorMiddleware)
```

# code
You can pass code inside of parentheses eg: (7891) for handling responses on client-side
```javascript
app.get('/login', (req, res) => {
  if (!req.body.email) {
    dispatchError('422: Email was not included (8749)')
  }
})

// JSON Response: 422
// On clinet-side you can handling the error code for 8749
{
  "message": "Email was not included",
  "code": 8749,
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

app.get('/login', (req, res) => {
  if (!req.body.email) {
    dispatchError('422: Email was not included', {
      // Other data here!
      codeErrorPath: 'email'
    })
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
# Custom Error Dispatcher
```javascript
// Example
const app = require('express')()
const { DispatchErrorCustom, errorMiddleware } = require('express-bonfire')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// dding custom dispatch error
const customDispatch = DispatchErrorCustom({
  // Status http send on request
  statusHTTP: 200,
  // Error message for humans
  message: 'Ohh no! 🔥',
  // Divider for http status code and message
  // example for character "=>"
  // "404 => "Resource not found"
  divider: '=>',
  // RegExp for divider or split the text
  customSplitPattern: null
})

app.get('/login', (req, res) => {
  if (!req.body.email) {
    customDispatch()
  }
})

// Adding the error middleware to the end
app.use(errorMiddleware)

// In the response we have:
//  {
//    error: true,
//    message: 'Ohh no! 🔥'
//  }
```
-----

This package uses Standard JS

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)