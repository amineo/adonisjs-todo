'use strict'

const Task = use('App/Model/Task')
const Validator = use('Validator')

class TasksController {

// For our tasks view
    * index (request, response){
        const tasks =  yield Task.query().orderBy('completed', false)
                                         .orderBy('updated_at', 'desc')
                                         .fetch()

        const statsActive = yield Task.query().where('completed',false).count('id')
        const statsComplete = yield Task.query().where('completed', true).count('id')


        const tasksObj = tasks.toJSON()
        const statsObj = {
                           allTasks: Object.keys(tasksObj).length,
                           active: statsActive[0]['count("id")'],
                           completed: statsComplete[0]['count("id")']
                        }                       
            
        yield response.sendView('tasks', {
                                            tasks: tasksObj,
                                            stats: statsObj
                                        })
    }



// Store the task in our database (SQLite)
    * store (request, response){
        const postedData = request.only('name', 'note')

        const rules = {
            name: 'required'
        }

        const validation = yield Validator.validate(postedData, rules);

        if (validation.fails()) {
            yield request
                  .withOnly('name')
                  .andWith({ errors: validation.messages()})
                  .flash()

            response.redirect('back')
            return
        }

        yield Task.create(postedData)
        response.redirect('/')
    }



// Update the tasks
    * update (request, response){
        const postedData = request.only('id','completed')
        
        const rules = {
            id: 'required',
            completed: 'required'
        }
        const validation = yield Validator.validate(postedData, rules);

        if (validation.fails()){
            response.redirect('back')
            return
        }

        yield Task.query().where('id', postedData.id)
                          .update({completed: postedData.completed})
        response.redirect('/')
    }



};
module.exports = TasksController