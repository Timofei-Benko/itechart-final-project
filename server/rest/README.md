# Not StackOverflow server app

---
Hey there! As you can see there are two versions of the server app: one is RESTful, other uses GraphQL.

The REST version is kinda finished. There are things that I don't like about it, but for the first back-end project 
it's okay I guess. Unless these things are related to RESTful patterns and things like that, they won't be fixed 
here. I'll do it the proper way in GraphQL app.  

GraphQL version is under construction so stay tuned.

---

### Initial set up
Once you cloned the repo, make sure you are in the ````server/rest````directory and run:
```
npm i
```
### Scripts
The server part of the application uses the following scripts: 

1. To run the server in development mode:

```
npm run dev
```
2. To run the server in production mode:

```
npm run prod
```
3. To create server build:

```
npm run build
```
4. To run ESLint (won't make any changes to the code):

```
npm run lint
```
5. To run all the tests:

```
npm run test
```

6. To run a specific test suite:

```
npm run test:<test-suite-name>
```
Accepts one of the following parameters:
* ```user```
* ```question```
* ```auth```
