import { UUID_NAMESPACE } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as uuid from 'uuid/v5';

@Injectable()
export class RandomProvider {

  constructor(private http: Http) { }

  getUserProfiles$(results: number): Observable<any[]> {
    return this.http.get('https://randomuser.me/api/', {
      params: {
        'nat': 'us',
        'results': results + ''
      }
    }).map((res) => {
      const obj = res.json();
      return obj.results ? obj.results : []
    }).map(profiles => {
      if (profiles && profiles.length > 0) {
        return profiles.map(profile => {
          return {
            email: profile.email,
            password: '123456',
            username: profile.login && profile.login.username,
            avatar: profile.picture && profile.picture.large,
            firstName: profile.name && this.capitalize(profile.name.first),
            lastName: profile.name && this.capitalize(profile.name.last)
          };
        });
      } else {
        return [];
      }
    });
  }

  uuid(name): string {
    return uuid(name, UUID_NAMESPACE);
  }

  private capitalize(str: string): string {
    return (str && str.length > 0) ?
      str[0].toUpperCase() + str.slice(1) : str;
  }
}
