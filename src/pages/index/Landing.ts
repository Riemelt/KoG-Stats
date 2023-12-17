import '../../components/container';

import CategoryMenu from '../../components/category-menu';
import Leaderboard from '../../components/leaderboard';
import Pagination from '../../components/pagination';
import { MapType } from '../../types/types';

import { LandingOptions } from './types';

class Landing {
  private className: string;
  private options: LandingOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private $pagination: JQuery<HTMLElement>;
  private leaderboard: Leaderboard;
  private pagination: Pagination;

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

    const categoryMenuOptions = {
      ...this.options.categoryMenu,
      sortBy: this.options.sortBy,
      onChange: this.handleMenuChange.bind(this),
    };

    new CategoryMenu(this.$categoryMenu, categoryMenuOptions);

    this.leaderboard = new Leaderboard(
      this.$component.find(`.js-${this.className}__leaderboard`),
      {
        sortBy: this.options.sortBy,
        players: this.options.players,
      }
    );

    this.pagination = new Pagination(this.$pagination);

    this.render(this.options.sortBy);
  }

  private handleMenuChange(category: MapType) {
    this.render(category);
  }

  private render(category: MapType) {
    this.pagination.render(
      this.leaderboard.generatePlayerEntries(category),
      this.leaderboard.render.bind(this.leaderboard)
    );
  }
}

export default Landing;
