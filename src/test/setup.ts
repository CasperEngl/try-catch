import { createServer, Model, Registry } from 'miragejs';
// eslint-disable-next-line import/no-unresolved
import { ModelDefinition } from 'miragejs/-types';
// eslint-disable-next-line import/no-unresolved
import Schema from 'miragejs/orm/schema';

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

const UserModel: ModelDefinition<User> = Model.extend({});

type AppRegistry = Registry<
  { user: typeof UserModel },
  {
    /* factories can be defined here */
  }
>;
type AppSchema = Schema<AppRegistry>;

export function setupServer(): ReturnType<typeof createServer> {
  const server = createServer({
    models: {
      user: UserModel,
    },
    routes() {
      this.namespace = 'api';

      this.get('/users', (schema: AppSchema) => ({
        data: schema.all('user'),
      }));

      this.get('/users/:id', async (schema: AppSchema, request) => ({
        data: schema.find('user', request.params.id),
      }));

      this.post('/users', (schema: AppSchema, request) => ({
        data: schema.create('user', {
          ...JSON.parse(request.requestBody),
        }),
      }));

      this.get('/error', () => {
        throw new Error('Server Error');
      });
    },
    seeds({ schema }: { schema: AppSchema }) {
      schema.create('user', {
        email: 'george.bluth@test.test',
        firstName: 'George',
        lastName: 'Bluth',
        avatar: 'https://eu.ui-avatars.com/api/?name=George+Bluth',
      });
      schema.create('user', {
        email: 'janet.weaver@test.test',
        firstName: 'Janet',
        lastName: 'Weaver',
        avatar: 'https://eu.ui-avatars.com/api/?name=Janet+Weaver',
      });
      schema.create('user', {
        email: 'emma.wong@test.test',
        firstName: 'Emma',
        lastName: 'Wong',
        avatar: 'https://eu.ui-avatars.com/api/?name=Emma+Wong',
      });
      schema.create('user', {
        email: 'eve.holt@test.test',
        firstName: 'Eve',
        lastName: 'Holt',
        avatar: 'https://eu.ui-avatars.com/api/?name=Eve+Holt',
      });
      schema.create('user', {
        email: 'charles.morris@test.test',
        firstName: 'Charles',
        lastName: 'Morris',
        avatar: 'https://eu.ui-avatars.com/api/?name=Charles+Morris',
      });
      schema.create('user', {
        email: 'tracey.ramos@test.test',
        firstName: 'Tracey',
        lastName: 'Ramos',
        avatar: 'https://eu.ui-avatars.com/api/?name=Tracey+Ramos',
      });
    },
  });

  server.logging = false;

  return server;
}
