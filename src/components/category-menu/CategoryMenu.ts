import { HTMLElementEvent, MapType } from '../../types/types';
import { CategoryMenuOptions } from './types';

class CategoryMenu {
  private className: string;
  private $component: JQuery<HTMLElement>;
  private options: CategoryMenuOptions;
  private $items: JQuery<HTMLElement>;
  private $currentActiveItem?: JQuery<HTMLElement>;
  private activeCategory: MapType = 'Total';

  constructor($parent: JQuery<HTMLElement>, data: CategoryMenuOptions) {
    this.options = data;
    this.className = 'category-menu';
    this.$component = $parent.find(`.js-${this.className}`);
    this.$items = this.$component.find(`.js-${this.className}__item`);

    this.setCategory(this.options.sortBy);
    this.setHandlers();
  }

  public setCategory(category: MapType) {
    const index = this.options.categories.findIndex((cat) => cat === category);
    if (index === -1) return;

    const item = this.$items.get(index);
    if (item === undefined) return;

    this.setActiveItem($(item));
  }

  public setActiveItem($item: JQuery<HTMLElement>) {
    this.$currentActiveItem?.removeClass(`${this.className}__item_active`);
    $item.addClass(`${this.className}__item_active`);
    this.$currentActiveItem = $item;
    const category = $item.html();

    if (!this.isCategory(category)) return;

    this.activeCategory = category;
  }

  private isCategory(category: string): category is MapType {
    return (
      this.options.categories.find(
        (map) => category.trim().toLowerCase() === map.toLowerCase()
      ) !== undefined
    );
  }

  private setHandlers() {
    this.$items.on('click.categoryMenu', this.handleMenuItemClick.bind(this));
  }

  private handleMenuItemClick(event: HTMLElementEvent<HTMLElement>) {
    const $clickedItem = $(event.currentTarget);

    this.setActiveItem($clickedItem);
    this.options.onChange?.(this.activeCategory);

    // delete
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set(
      'sortBy',
      this.options.categories[this.$items.index($clickedItem)]
    );
    location.search = urlSearchParams.toString();
  }
}

export default CategoryMenu;
