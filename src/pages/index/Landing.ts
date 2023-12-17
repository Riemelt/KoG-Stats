import '../../components/container';

import CategoryMenu from '../../components/category-menu';
import Leaderboard from '../../components/leaderboard';
import Pagination from '../../components/pagination';
import { MapType } from '../../types/types';

import { LandingOptions } from './types';
import Expander from '../../components/expander';
import InputField from '../../components/input-field';
import { debounceLast } from '../../utilities/utilities';

class Landing {
  private className: string;
  private options: LandingOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private $pagination: JQuery<HTMLElement>;
  private leaderboard: Leaderboard;
  private pagination: Pagination;
  private category: MapType = 'Total';
  private name = '';
  private $resetButton: JQuery<HTMLElement>;
  private categoryMenu: CategoryMenu;
  private inputName: InputField;

  constructor($element: JQuery<HTMLElement>, options: LandingOptions) {
    this.options = options;
    this.className = 'landing';
    this.$component = $element;
    this.$pagination = this.$component.find(
      `.js-${this.className}__pagination`
    );

    this.$categoryMenu = this.$component.find(
      `.js-${this.className}__category-menu`
    );

    this.category = this.options.sortBy;

    this.$resetButton = this.$component.find(
      `.js-${this.className}__reset-button`
    );

    const categoryMenuOptions = {
      ...this.options.categoryMenu,
      sortBy: this.options.sortBy,
      onChange: this.handleMenuChange.bind(this),
    };

    new Expander(this.$component.find(`.js-${this.className}__expander`));
    this.inputName = new InputField(
      this.$component.find(`.js-${this.className}__input-name`),
      {
        onChange: debounceLast(this.handleInputNameChange.bind(this), 250),
      }
    );

    this.categoryMenu = new CategoryMenu(
      this.$categoryMenu,
      categoryMenuOptions
    );

    this.leaderboard = new Leaderboard(
      this.$component.find(`.js-${this.className}__leaderboard`),
      {
        sortBy: this.options.sortBy,
        players: this.options.players,
      }
    );

    this.pagination = new Pagination(this.$pagination);

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
    this.render(false);
  }

  private handleMenuChange(category: MapType) {
    this.category = category;
    this.render();
  }

  private render(shouldUpdate = true) {
    this.pagination.render(
      this.leaderboard.generatePlayerEntries(
        this.category,
        this.name,
        shouldUpdate
      ),
      this.leaderboard.render.bind(this.leaderboard)
    );
  }
}

export default Landing;
