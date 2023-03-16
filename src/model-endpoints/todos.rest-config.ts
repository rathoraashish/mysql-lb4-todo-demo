import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Todos} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Todos,
  pattern: 'CrudRest',
  dataSource: 'tododb',
  basePath: '/todos',
  readonly: false,
};
module.exports = config;
