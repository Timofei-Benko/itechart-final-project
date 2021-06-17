### Initial set up
Once you cloned the repo, make sure you are in the ````server````
directory and run:
```
npm i
```
### Scripts
The server part of the application uses the following scripts: 

```
npm run dev
```
Runs the server in development mode

```
npm run prod
```
Creates server build and runds it in production mode

```
npm run build
```
Compiles TS to JS

```
npm run lint
```
Checks the code with ESLint

```
npm run test
```
Runs all the tests
```
npm run test:<test-suite-name>
```
Runs a specific test suite. Accepts one of the following parameters: 
* ```user``` 
* ```question``` 
* ```auth```
