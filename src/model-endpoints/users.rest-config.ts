import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Users} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Users,
  pattern: 'CrudRest',
  dataSource: 'tododb',
  basePath: '/users',
  readonly: false,
};
module.exports = config;
