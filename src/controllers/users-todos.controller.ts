import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Todos,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersTodosController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/todos', {
    responses: {
      '200': {
        description: 'Array of Users has many Todos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Todos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Todos>,
  ): Promise<Todos[]> {
    return this.usersRepository.UserTodo(id).find(filter);
  }

  @post('/users/{id}/todos', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {
            title: 'NewTodosInUsers',
            exclude: ['id'],
            optional: ['user_id']
          }),
        },
      },
    }) todos: Omit<Todos, 'id'>,
  ): Promise<Todos> {
    return this.usersRepository.UserTodo(id).create(todos);
  }

  @patch('/users/{id}/todos', {
    responses: {
      '200': {
        description: 'Users.Todos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {partial: true}),
        },
      },
    })
    todos: Partial<Todos>,
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where<Todos>,
  ): Promise<Count> {
    return this.usersRepository.UserTodo(id).patch(todos, where);
  }

  @del('/users/{id}/todos', {
    responses: {
      '200': {
        description: 'Users.Todos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where<Todos>,
  ): Promise<Count> {
    return this.usersRepository.UserTodo(id).delete(where);
  }
}
