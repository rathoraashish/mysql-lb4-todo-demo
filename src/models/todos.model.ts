import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users} from './users.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'loopback-todo-demo', table: 'todos'}}
})
export class Todos extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    generated: 0,
    mysql: {columnName: 'completed', dataType: 'tinyint', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'N', generated: 0},
  })
  completed: number;

  @property({
    type: 'date',
    required: true,
    generated: 0,
    mysql: {columnName: 'due_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  due_date: string;

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
    mysql: {columnName: 'task', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: 0},
  })
  task: string;

  @belongsTo(() => Users, {name: 'TodoUser'})
  user_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Todos>) {
    super(data);
  }
}

export interface TodosRelations {
  // describe navigational properties here
}

export type TodosWithRelations = Todos & TodosRelations;
