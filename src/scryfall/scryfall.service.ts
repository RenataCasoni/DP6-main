import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class ScryfallService {
  getCardsBySet(code: string) {
    throw new Error('Method not implemented.');
  }
  private readonly baseUrl = 'https://api.scryfall.com';

  constructor(private readonly httpService: HttpService) {}

  getCardByName(name: string) {
    return this.httpService
      .get(`${this.baseUrl}/cards/named`, {
        params: { fuzzy: name },
      })
      .pipe(map((response) => response.data));
  }

  searchCards(query: { q: string }) {
    return this.httpService
      .get(`${this.baseUrl}/cards/search`, {
        params: query,
      })
      .pipe(map((response) => response.data));
  }
}
