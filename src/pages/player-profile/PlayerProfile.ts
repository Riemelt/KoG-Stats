import "../../components/container";
import { PlayerProfileOptions } from "./types";
import CategoryMenu from "../../components/category-menu";
import Pagination from "../../components/pagination";

class PlayerProfile {
  private className: string;
  private options: PlayerProfileOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private $title: JQuery<HTMLElement>;
  private categoryMenu: CategoryMenu;

  constructor($element: JQuery<HTMLElement>, options: PlayerProfileOptions) {
    this.options = options;
    this.className = "player-profile";
    this.$component = $element;
    this.$title = this.$component.find(`.js-${this.className}__title`);
    this.$title.html(`${this.options.playerName}'s map records`);

    this.$categoryMenu = this.$component.find(`.js-${this.className}__category-menu`);
    const categoryMenuOptions = {
      sortBy: this.options.sortBy,
      ...this.options.categoryMenu,
    };
    this.categoryMenu = new CategoryMenu(this.$component, categoryMenuOptions);

    new Pagination(this.$component.find(`.js-${this.className}__pagination`), {
    });
  }

}

export default PlayerProfile;