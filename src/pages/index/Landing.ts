import '../../components/container';
import { LandingOptions } from './types';
import CategoryMenu from '../../components/category-menu';
import Leaderboard from '../../components/leaderboard';
import Pagination from '../../components/pagination';
import { MapType } from '../../types/types';

class Landing {
  private className: string;
  private options: LandingOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private categoryMenu: CategoryMenu;
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
      sortBy: this.options.sortBy,
      ...this.options.categoryMenu,
    };
    this.categoryMenu = new CategoryMenu(this.$component, categoryMenuOptions);

    this.leaderboard = new Leaderboard(
      this.$component.find(`.js-${this.className}__leaderboard`),
      {
        sortBy: this.options.sortBy,
        players: this.options.players,
      }
    );

    this.pagination = new Pagination(this.$pagination);

    this.render();
  }

  private render() {
    this.pagination.render(
      this.leaderboard.getPlayerEntries(),
      this.leaderboard.render.bind(this.leaderboard)
    );
  }
}

export default Landing;
