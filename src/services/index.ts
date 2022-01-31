import { Application } from '../declarations';
import users from './users/users.service';
import search from './search/search.service';
import artists from './artists/artists.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(search);
  app.configure(artists);
}
