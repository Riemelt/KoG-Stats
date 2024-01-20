import '../../components/container';
import Pagination from '../../components/pagination';
import MapRecords from '../../components/map-records';
import CategoryMenu from '../../components/category-menu';
import Expander from '../../components/expander';
import InputField from '../../components/input-field';
import { debounceLast } from '../../utilities/utilities';
import { MapType } from '../../types/types';

import { RecordsOptions } from './types';

class Records {
  private className: string;
  private options: RecordsOptions;
  private $component: JQuery<HTMLElement>;
  private mapRecords: MapRecords;
  private pagination: Pagination;
  private $categoryMenu: JQuery<HTMLElement>;
  private category: MapType = 'Total';
  private mapName = '';
  private playerName = '';
  private author = '';
  private categoryMenu: CategoryMenu;
  private inputMapName: InputField;
  private inputPlayerName: InputField;
  private inputAuthorName: InputField;
  private $resetButton: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>, options: RecordsOptions) {
    this.options = options;
    this.className = 'records';
    this.$component = $element;
    this.category = this.options.sortBy;

    this.mapRecords = new MapRecords(
      this.$component.find(`.js-${this.className}__map-records`),
      this.options.mapRecords
    );

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
      }),
      this.mapRecords.render.bind(this.mapRecords)
    );
  }
}

export default Records;
