class Expander {
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $header: JQuery<HTMLElement>;

  constructor($parent: JQuery<HTMLElement>) {
    this.className = 'expander';
    this.$component = $parent.find(`.js-${this.className}`);

    this.$header = this.$component.find(`.js-${this.className}__header`);
    this.setHandlers();
  }

  private setHandlers() {
    this.$header.on('click.expander', this.handleHeaderClick.bind(this));
  }

  private handleHeaderClick() {
    this.$component.toggleClass(`${this.className}_open`);
  }
}

export default Expander;
