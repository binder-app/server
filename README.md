# Binder - Node Server

## Setup

1. Install [NodeJS](https://nodejs.org/)
2. Run `npm install`
3. You're good to go!

## Running

You can launch the application with `npm start`. If you're a developer, it is slightly faster and less verbose to launch the application directly with `node server`.

## Environment variables

Supported environment variables are:

  * `PORT`, an integer that defaults to 8080
  * `DB`, a standard rethinkdb database URL that defaults to localhost

## Supported Tasks

The follow tasks exist:

  * `cleartables`, clears all database data

You can run a script with `npm run <scriptname>` in the project directory.

## Required Headers

Any request to the API requires an `Authorization` header. This header is designed to be your unique android device ID. You must pass it as a bearer token, for example: `Authorization: Bearer 12345-deafde-adfff-23123`.

## Supported Routes

### Profile route

Route: `PUT /api/profiles/:id`

Note: This route allows you to update your profile. Please note you are only able to update your own profile, so the `id` parameter should be the same as your bearer token. The profile route requires a phone number so that you can be matched.

Request:
```javascript
PUT http://localhost:8080/api/profiles/123
{
  "name": "Christopher Foster",
  "bio": "My name is Chris, I'm a fourth year BCS student who...",
  "program": "Computer Science",
  "phone": "(250) 572-7938",
  "year": 4,
  "courses": [
    "COMP2160",
    "COMP3550",
    "COMP4550"
  ]
}
```

Response:
```javascript
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 83
Content-Type: application/json; charset=utf-8
Date: Wed, 11 Nov 2015 19:47:58 GMT
ETag: W/"53-Yvzyu3ojl5BZCvOJffzKaw"
X-Powered-By: Express

{
  "id": "123",
  "name": "Christopher Foster",
  "bio": "My name is Chris, I'm a fourth year BCS student who...",
  "program": "Computer Science", 
  "phone": "(250) 572-7938", 
  "year": 4,
  "courses": [
    "COMP2160",
    "COMP3550",
    "COMP4550"
  ]
}
```

### Suggestions Route

Route: `GET /api/suggestions`

Note: Returns a list of suggested profiles you may like or dislike. The suggestions route does not return phone numbers for privacy reasons. The suggestions route also does not return your own profile, or any profiles that you have already placed a Like or Dislike for.

Request:
```javascript
GET http://localhost:8080/api/suggestions
```

Response:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 88
Content-Type: application/json; charset=utf-8
Date: Wed, 11 Nov 2015 19:48:54 GMT
ETag: W/"58-5pFwNj3J+fMAO/ihu0IyHw"
X-Powered-By: Express

[
  {
    "id": "123",
    "name": "Christopher Foster",
    "bio": "My name is Chris, I'm a fourth year BCS student who...",
    "program": "Computer Science", 
    "year": 4,
    "courses": [
      "COMP2160",
      "COMP3550",
      "COMP4550"
    ]
  }
]
```

### Like Route

Route: `POST /api/likes`

Note: Create a new like entry. `to` is the profile id of the user that you like.

Request:
```javascript
POST http://localhost:8080/api/likes
{
  "to": "123"
}
```

Response:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 88
Content-Type: application/json; charset=utf-8
Date: Wed, 11 Nov 2015 19:48:54 GMT
ETag: W/"58-5pFwNj3J+fMAO/ihu0IyHw"
X-Powered-By: Express

{
  "id": "1378eb2c-b370-4347-bcf9-f099cdc2251a", 
  "from": "555", 
  "to": "123", 
  "type": "like"
}
```

### Dislike Route

Route: `POST /api/dislikes`

Note: Create a new dislike entry. `to` is the profile id of the user that you dislike. The `from` in the route repsonse will be your own user id.

Request:
```javascript
POST http://localhost:8080/api/dislikes
{
  "to": "123"
}
```

Response:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 88
Content-Type: application/json; charset=utf-8
Date: Wed, 11 Nov 2015 19:48:54 GMT
ETag: W/"58-5pFwNj3J+fMAO/ihu0IyHw"
X-Powered-By: Express

{
  "id": "1378eb2c-b370-4347-bcf9-f099cdc2251a", 
  "from": "555", 
  "to": "123", 
  "type": "dislike"
}
```

### Matches Route

Route: `GET /api/matches`

Note: Returns a list of profiles that you like and also like you

Request:
```javascript
GET http://localhost:8080/api/matches
```

Response:
```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 88
Content-Type: application/json; charset=utf-8
Date: Wed, 11 Nov 2015 19:48:54 GMT
ETag: W/"58-5pFwNj3J+fMAO/ihu0IyHw"
X-Powered-By: Express

[
  {
    "id": "123",
    "name": "Christopher Foster",
    "bio": "My name is Chris, I'm a fourth year BCS student who...",
    "program": "Computer Science", 
    "phone": "(250) 572-7938", 
    "year": 4,
    "courses": [
      "COMP2160",
      "COMP3550",
      "COMP4550"
    ]
  }
]
```
