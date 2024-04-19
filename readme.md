# *Sprint Asia Fullstack Engineer Study Case*

## Study Case 1 - *Logical Test*

1. You can change the 'input' with any grade (0 < grade < 100) and you can add the number.
2. Run the script below in the terminal:
```
$ go run main.go
```
3. Check the terminal to see the result!

## Study Case 2 - *System Flow*

This is divided into two sections: client-side and server-side.

### Server Side

1. Start by downloading the Go module in the terminal:
```
$ cd server
$ go mod download
```
2. Go to `database.go` in the `model` folder and change the `dsn` value based on your PostgreSQL settings:
- `host`: the host for PostgreSQL
- `user`: username for PostgreSQL
- `password`: your password setting to connect to PostgreSQL
- `dbname`: your database name, the default is `todo-list-task`
3. After that, modify the `.env` file based on `.env.example`.
4. Finally, you can run the server side in the terminal by running the following script:
```
$ cd server
$ go run main.go
```

### Client Side

1. Start by installing the Node package module:
```
$ cd ..
$ cd client
$ npm install

```
2. After the installation is complete, run the script below:
```
$ npm run dev
```
3. It's all done! You can open https://localhost:5173 to open the to-do list task.
