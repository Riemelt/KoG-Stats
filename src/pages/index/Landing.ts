import "../../components/container";
import { LandingOptions } from "./types";
import CategoryMenu from "../../components/category-menu";

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
    this.categoryMenu = new CategoryMenu(this.$component, options.categoryMenu);
    console.log("Landing created");
  }
}

export default Landing;