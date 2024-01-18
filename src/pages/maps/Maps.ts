import '../../components/container';

import CategoryMenu from '../../components/category-menu';
import Pagination from '../../components/pagination';
import MapRecords from '../../components/map-records';
import Expander from '../../components/expander';
import InputField from '../../components/input-field';
import { MapType } from '../../types/types';
import { debounceLast } from '../../utilities/utilities';

import { MapsOptions } from './types';

class Maps {
  private className: string;
  private options: MapsOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private mapRecords: MapRecords;
  private pagination: Pagination;
  private category: MapType = 'Total';
  private name = '';
  private categoryMenu: CategoryMenu;
  private inputName: InputField;
  private $resetButton: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>, options: MapsOptions) {
    this.options = options;
    this.className = 'maps';
    this.$component = $element;
    this.category = this.options.sortBy;

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
    this.inputName = new InputField(
      this.$component.find(`.js-${this.className}__input-map-name`),
      {
        onChange: debounceLast(this.handleInputNameChange.bind(this), 250),
      }
    );

    this.mapRecords = new MapRecords(
      this.$component.find(`.js-${this.className}__map-records`),
      {
        ...this.options.mapRecords,
        records: this.options.maps,
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
    this.name = '';
    this.category = 'Total';
    this.inputName.setValue(this.name);
    this.categoryMenu.setCategory(this.category);
    this.render();
  }

  private handleInputNameChange(value: string) {
    this.name = value;
    this.render();
  }

  private handleMenuChange(category: MapType) {
    this.category = category;
    this.render();
  }

  private render() {
    this.pagination.render(
      this.mapRecords.generateRecordEntries(this.category, this.name),
      this.mapRecords.render.bind(this.mapRecords)
    );
  }
}

export default Maps;
