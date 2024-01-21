import { HTMLElementEvent } from '../../types/types';

class InputField {
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $input: JQuery<HTMLInputElement>;
  private options: InputFieldOptions;

  constructor($parent: JQuery<HTMLElement>, options: InputFieldOptions) {
    this.options = options;
    this.className = 'input-field';
    this.$component = $parent.find(`.js-${this.className}`);
    this.$input = this.$component.find<HTMLInputElement>(
      `.js-${this.className}__input`
    );

    this.setHandlers();
  }

  public setValue(value: string | number) {
    this.$input.val(value);
  }

  private setHandlers() {
    this.$input.on('input.inputField', this.handleInputChange.bind(this));
  }

  private handleInputChange(event: HTMLElementEvent<HTMLInputElement>) {
    this.options.onChange?.(event.currentTarget.value);
  }
}

export default InputField;
