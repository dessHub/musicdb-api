import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import axios from 'axios'

interface Data {}

interface ServiceOptions {}

export class Artists implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    const id: string = params?.query?.id;
    let artist: any = await axios.get(`https://api.deezer.com/artist/${id}`);
    artist = await artist.data;

    const tracklist: any = await axios.get(artist.tracklist);
    const albums: Array<any> = tracklist.data.data.reduce((acc: Array<any>, item: any) => {
      if (!acc.find((a: any) => a.id === item.album.id)) {
        acc.push(item.album)
      }
      return acc;
    }, [])

    artist = {
      ...artist,
      tracklist: tracklist.data.data,
      albums,
    }
    return artist;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get (id: Id, params?: Params): Promise<Data> {
    let artist: any = await axios.get(`https://api.deezer.com/artist/${id}`);
    artist = await artist.data;
    const tracklist: any = await axios.get(artist.tracklist);
    const albums: Array<any> = tracklist.data.data.reduce((acc: Array<any>, item: any) => {
      if (!acc.find((a: any) => a.id === item.album.id)) {
        acc.push(item.album)
      }
      return acc;
    }, [])

    artist = {
      ...artist,
      tracklist: tracklist.data.data,
      albums,
    }
    return artist;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create (data: Data, params?: Params): Promise<Data> {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update (id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch (id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove (id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
