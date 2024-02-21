import '../../components/container';

import CategoryMenu from '../../components/category-menu';
import Pagination from '../../components/pagination';
import MapRecords from '../../components/map-records';
import Expander from '../../components/expander';
import InputField from '../../components/input-field';
import { MapType } from '../../types/types';
import { debounceLast } from '../../utilities/utilities';

import { PlayerProfileOptions } from './types';

class PlayerProfile {
  private className: string;
  private options: PlayerProfileOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private $title: JQuery<HTMLElement>;
  private $titlePlayerName: JQuery<HTMLElement>;
  private mapRecords: MapRecords;
  private pagination: Pagination;
  private category: MapType = 'Total';
  private mapName = '';
  private playerName = '';
  private author = '';
  private categoryMenu: CategoryMenu;
  private inputMapName: InputField;
  private inputPlayerName: InputField;
  private inputAuthorName: InputField;
  private $resetButton: JQuery<HTMLElement>;
  private inputTiedPlayersFrom: InputField;
  private inputTiedPlayersTo: InputField;
  private tiedPlayersFrom: number | null = null;
  private tiedPlayersTo: number | null = null;

  constructor($element: JQuery<HTMLElement>, options: PlayerProfileOptions) {
    this.options = options;
    this.className = 'player-profile';
    this.$component = $element;
    this.category = this.options.sortBy;

    this.$title = this.$component.find(`.js-${this.className}__title`);
    this.$title.attr(
      'href',
      `https://kog.tw/#p=players&player=${this.options.playerName}`
    );

    this.$titlePlayerName = this.$title.find(
      `.js-${this.className}__title-text`
    );
    this.$titlePlayerName.html(`${this.options.playerName}'s map records`);

    this.$categoryMenu = this.$component.find(
      `.js-${this.className}__category-menu`
    );

    this.$resetButton = this.$component.find(
      `.js-${this.className}__reset-button`
    );

    const categoryMenuOptions = {
      ...this.options.categoryMenu,
      sortBy: this.options.sortBy,

      onChange: this.handleMenuChange.bind(this),
    };

    this.categoryMenu = new CategoryMenu(
      this.$categoryMenu,
      categoryMenuOptions
    );

    new Expander(this.$component.find(`.js-${this.className}__expander`));

    this.inputMapName = new InputField(
      this.$component.find(`.js-${this.className}__input-map-name`),
      {
        onChange: debounceLast(this.handleInputMapNameChange.bind(this), 250),
      }
    );

    this.inputPlayerName = new InputField(
      this.$component.find(`.js-${this.className}__input-player-name`),
      {
        onChange: debounceLast(
          this.handleInputPlayerNameChange.bind(this),
          250
        ),
      }
    );

    this.inputAuthorName = new InputField(
      this.$component.find(`.js-${this.className}__input-author-name`),
      {
        onChange: debounceLast(
          this.handleInputAuthorNameChange.bind(this),
          250
        ),
      }
    );

    this.inputTiedPlayersFrom = new InputField(
      this.$component.find(`.js-${this.className}__input-tied-players-from`),
      {
        onChange: debounceLast(
          this.handleInputTiedPlayersFromChange.bind(this),
          250
        ),
      }
    );

    this.inputTiedPlayersTo = new InputField(
      this.$component.find(`.js-${this.className}__input-tied-players-to`),
      {
        onChange: debounceLast(
          this.handleInputTiedPlayersToChange.bind(this),
          250
        ),
      }
    );

    this.mapRecords = new MapRecords(
      this.$component.find(`.js-${this.className}__map-records`),
      {
        ...this.options.mapRecords,
        records: this.options.playerRecords,
      }
    );

    this.pagination = new Pagination(
      this.$component.find(`.js-${this.className}__pagination`)
    );

    this.setHandlers();
    this.render();
  }

  private setHandlers() {
    this.$resetButton.on(
      'click.resetButton',
      this.handleResetButtonClick.bind(this)
    );
  }

  private handleResetButtonClick() {
    this.mapName = '';
    this.playerName = '';
    this.author = '';
    this.category = 'Total';
    this.inputMapName.setValue(this.mapName);
    this.inputPlayerName.setValue(this.playerName);
    this.inputAuthorName.setValue(this.author);
    this.categoryMenu.setCategory(this.category);

    this.tiedPlayersFrom = null;
    this.inputTiedPlayersFrom.setValue('');

    this.tiedPlayersTo = null;
    this.inputTiedPlayersTo.setValue('');

    this.render();
  }

  private handleInputPlayerNameChange(value: string) {
    this.playerName = value;
    this.render();
  }

  private handleInputMapNameChange(value: string) {
    this.mapName = value;
    this.render();
  }

  private handleInputAuthorNameChange(value: string) {
    this.author = value;
    this.render();
  }

  private handleInputTiedPlayersFromChange(value: string) {
    const num = parseInt(value);
    const from = Number.isNaN(num) ? null : num;
    this.tiedPlayersFrom = from;

    this.render();
  }

  private handleInputTiedPlayersToChange(value: string) {
    const num = parseInt(value);
    const to = Number.isNaN(num) ? null : num;
    this.tiedPlayersTo = to;

    this.render();
  }

  private handleMenuChange(category: MapType) {
    this.category = category;
    this.render();
  }

  private render() {
    this.pagination.render(
      this.mapRecords.generateRecordEntries({
        mapCategory: this.category,
        mapName: this.mapName,
        playerName: this.playerName,
        author: this.author,
        tiedPlayersFrom: this.tiedPlayersFrom,
        tiedPlayersTo: this.tiedPlayersTo,
      }),
      this.mapRecords.render.bind(this.mapRecords)
    );
  }
}

export default PlayerProfile;
