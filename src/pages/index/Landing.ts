import "../../components/container";
import { LandingOptions } from "./types";
import CategoryMenu from "../../components/category-menu";
import Leaderboard from "../../components/leaderboard";

class Landing {
  private className: string;
  private options: LandingOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private categoryMenu: CategoryMenu;

  constructor($element: JQuery<HTMLElement>, options: LandingOptions) {
    this.options = options;
    this.className = "landing";
    this.$component = $element;

    this.$categoryMenu = this.$component.find(`.js-${this.className}__category-menu`);
    const categoryMenuOptions = {
      sortBy: this.options.sortBy,
      ...this.options.categoryMenu,
    };
    this.categoryMenu = new CategoryMenu(this.$component, categoryMenuOptions);
    
    new Leaderboard(this.$component, {
      sortBy: this.options.sortBy,
      players: this.options.players,
    });
    console.log("Landing created");
  }
}

export default Landing;