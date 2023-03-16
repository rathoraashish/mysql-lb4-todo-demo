import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TododbDataSource} from '../datasources';
import {Users, UsersRelations, Todos} from '../models';
import {TodosRepository} from './todos.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly UserTodo: HasManyRepositoryFactory<Todos, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.tododb') dataSource: TododbDataSource, @repository.getter('TodosRepository') protected todosRepositoryGetter: Getter<TodosRepository>,
  ) {
    super(Users, dataSource);
    this.UserTodo = this.createHasManyRepositoryFactoryFor('UserTodo', todosRepositoryGetter,);
    this.registerInclusionResolver('UserTodo', this.UserTodo.inclusionResolver);
  }
}
