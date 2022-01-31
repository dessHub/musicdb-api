// Initializes the `artists` service on path `/artists`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Artists } from './artists.class';
import hooks from './artists.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'artists': Artists & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/artists', new Artists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('artists');

  service.hooks(hooks);
}
