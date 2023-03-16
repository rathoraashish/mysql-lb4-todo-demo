import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Todos,
  Users,
} from '../models';
import {TodosRepository} from '../repositories';

export class TodosUsersController {
  constructor(
    @repository(TodosRepository)
    public todosRepository: TodosRepository,
  ) { }

  @get('/todos/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Todos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof Todos.prototype.id,
  ): Promise<Users> {
    return this.todosRepository.TodoUser(id);
  }
}
