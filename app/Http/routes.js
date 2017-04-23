'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/



/*
TODO: Getting familiar with AdonisJS

[x] Create a task  (task and optional note)
[x] Tasks have validation

[ ] Tasks have a detail view (route)

[x] List All Tasks
[ ] Filter: List Active Tasks
[ ] Filter: List Completed Tasks

[x] Display a count for how many tasks are active
[x] Display a count for how many tasks are completed
[x] Display a count for how many tasks exist
*/



const Route = use('Route')

Route.get('/', 'TasksController.index')
Route.post('/', 'TasksController.store')
Route.post('/task/update','TasksController.update')

// /tasks/active
// /tasks/completed

// /task/:id
