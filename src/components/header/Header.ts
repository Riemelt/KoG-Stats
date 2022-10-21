class Header {
  private className: string;
  private $component: JQuery<HTMLElement>;
  private options: HeaderOptions;

  private $updateDate: JQuery<HTMLElement>;

  constructor($parent: JQuery<HTMLElement>, data: HeaderOptions) {
    this.options = data;
    this.className = "header";
    this.$component = $parent.find(`.js-${this.className}`);

    this.$updateDate = this.$component.find(`.js-${this.className}__update-date`);
    const dateConverted = new Date(this.options.date).toLocaleDateString("en-GB");
    this.$updateDate.html(dateConverted);
  }
}

export default Header;