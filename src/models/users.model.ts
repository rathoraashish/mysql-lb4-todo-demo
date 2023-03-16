import {Entity, model, property, hasMany} from '@loopback/repository';
import {Todos} from './todos.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'loopback-todo-demo', table: 'users'}}
})
export class Users extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  email: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    generated: 0,
    mysql: {columnName: 'password', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  password: string;

  @hasMany(() => Todos, {keyTo: 'user_id'})
  UserTodo: Todos[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
