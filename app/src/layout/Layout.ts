import Header from '../components/header';
import '../components/footer';

class Layout {
  private className: string;
  private $component: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>, options: LayoutOptions) {
    this.className = 'layout';
    this.$component = $element;

    new Header(
      this.$component.find(`.js-${this.className}__header`),
      options.header
    );
  }
}

export default Layout;
