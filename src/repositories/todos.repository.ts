import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TododbDataSource} from '../datasources';
import {Todos, TodosRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class TodosRepository extends DefaultCrudRepository<
  Todos,
  typeof Todos.prototype.id,
  TodosRelations
> {

  public readonly TodoUser: BelongsToAccessor<Users, typeof Todos.prototype.id>;

  constructor(
    @inject('datasources.tododb') dataSource: TododbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Todos, dataSource);
    this.TodoUser = this.createBelongsToAccessorFor('TodoUser', usersRepositoryGetter,);
    this.registerInclusionResolver('TodoUser', this.TodoUser.inclusionResolver);
  }
}
