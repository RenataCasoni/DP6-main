import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post('choose-commander')
  async chooseCommander(@Body() body: { commanderName: string }) {
    return this.deckService.chooseCommander(body.commanderName);
  }

  @Get('cards')
  async fetchDeckCards(@Query('commanderName') commanderName: string) {
    return this.deckService.fetchDeckCards(commanderName);
  }

  @Post('add-card')
  async addCardToDeck(
    @Body() body: { cardName: string; commanderName: string },
  ) {
    return this.deckService.addCardToDeck(body.commanderName, body.cardName);
  }

  @Post('remove-card')
  async removeCardFromDeck(
    @Body() body: { cardName: string; commanderName: string },
  ) {
    return this.deckService.removeCardFromDeck(
      body.commanderName,
      body.cardName,
    );
  }
}
