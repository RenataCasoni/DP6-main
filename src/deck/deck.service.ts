import { Injectable } from '@nestjs/common';
import { ScryfallService } from '../scryfall/scryfall.service';

@Injectable()
export class DeckService {
  private decks = new Map<string, any>();

  constructor(private readonly scryfallService: ScryfallService) {}

  async chooseCommander(commanderName: string) {
    const commander = await this.scryfallService
      .getCardByName(commanderName)
      .toPromise(); // Resolve a Promise
    if (commander.type_line.includes('Legendary Creature')) {
      this.decks.set(commanderName, { commander, cards: [] });
      return commander;
    }
    throw new Error('The chosen card is not a valid commander');
  }

  async fetchDeckCards(commanderName: string) {
    const deck = this.decks.get(commanderName);
    if (!deck) {
      throw new Error('Commander not chosen or invalid');
    }

    const colors = deck.commander.color_identity.join(',');
    const compatibleCards = await this.scryfallService
      .searchCards({ q: `c<=${colors} -t:basic` })
      .toPromise(); // Resolve a Promise

    deck.cards = compatibleCards.data.slice(0, 99); // Ajusta para acessar o array de cartas
    return deck;
  }

  async addCardToDeck(commanderName: string, cardName: string) {
    const deck = this.decks.get(commanderName);
    if (!deck) {
      throw new Error('Commander not chosen or invalid');
    }

    const card = await this.scryfallService.getCardByName(cardName).toPromise(); // Resolve a Promise

    if (deck.cards.find((c) => c.id === card.id)) {
      throw new Error('Card is already in the deck');
    }

    if (deck.commander.color_identity.includes(card.color_identity[0])) {
      deck.cards.push(card);
      return deck;
    }
    throw new Error('Card is not compatible with the deck colors');
  }

  removeCardFromDeck(commanderName: string, cardName: string) {
    const deck = this.decks.get(commanderName);
    if (!deck) {
      throw new Error('Commander not chosen or invalid');
    }
    deck.cards = deck.cards.filter((card) => card.name !== cardName);
    return deck;
  }
}
