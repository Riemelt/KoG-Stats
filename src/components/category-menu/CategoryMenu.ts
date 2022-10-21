import { CategoryMenuOptions } from "./types";

class CategoryMenu {
  private className: string;
  private $component: JQuery<HTMLElement>;
  private options: CategoryMenuOptions;
  private $items: JQuery<HTMLElement>;
  private $currentActiveItem: JQuery<HTMLElement>;

  constructor($parent: JQuery<HTMLElement>, data: CategoryMenuOptions) {
    this.options = data;
    this.className = "category-menu";
    this.$component = $parent.find(`.js-${this.className}`);
    this.$items = this.$component.find(`.js-${this.className}__item-link`);

    let activeItemIndex = 0;
    for (let i = 0; i < this.options.categories.length; i++) {
      if (this.options.categories[i] === this.options.sortBy) {
        activeItemIndex = i;
        break;
      }
    }

    this.setActiveItem($(this.$items.get(activeItemIndex)));
    this.setHandlers();
  }

  public setActiveItem($item: JQuery<HTMLElement>) {
    this.$currentActiveItem?.removeClass(`${this.className}__item-link_active`);
    $item.addClass(`${this.className}__item-link_active`);
    this.$currentActiveItem = $item;
  }

  private setHandlers() {
    this.$items.on("click.categoryMenu", this.handleMenuItemClick.bind(this));
  }

  private handleMenuItemClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      const $clickedItem = $(event.currentTarget as HTMLElement);
      this.setActiveItem($clickedItem);
    }
  }
}

export default CategoryMenu;