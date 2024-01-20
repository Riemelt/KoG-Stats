import '../../components/container';

import MapRecords from '../../components/map-records';
import Expander from '../../components/expander';
import InputField from '../../components/input-field';
import { debounceLast } from '../../utilities/utilities';

import { MapProfileOptions } from './types';
import MapFinishes from '../../components/map-finishes';

class MapProfile {
  private className: string;
  private options: MapProfileOptions;
  private $component: JQuery<HTMLElement>;

  private $titlePlayerName: JQuery<HTMLElement>;
  private mapRecord: MapRecords;
  private mapFinishes: MapFinishes;

  private playerName = '';
  private inputPlayerName: InputField;
  private $resetButton: JQuery<HTMLElement>;

  constructor($element: JQuery<HTMLElement>, options: MapProfileOptions) {
    this.options = options;
    this.className = 'map-profile';
    this.$component = $element;

    this.$titlePlayerName = this.$component.find(
      `.js-${this.className}__title-text`
    );

    this.$titlePlayerName.html(`${this.options.mapName} map profile`);

    this.$resetButton = this.$component.find(
      `.js-${this.className}__reset-button`
    );

    new Expander(this.$component.find(`.js-${this.className}__expander`));

    this.inputPlayerName = new InputField(
      this.$component.find(`.js-${this.className}__input-player-name`),
      {
        onChange: debounceLast(
          this.handleInputPlayerNameChange.bind(this),
          250
        ),
      }
    );

    this.mapRecord = new MapRecords(
      this.$component.find(`.js-${this.className}__map`),
      {
        ...this.options.mapProfile,
        records: this.options.mapRecord,
      }
    );

    this.mapFinishes = new MapFinishes(
      this.$component.find(`.js-${this.className}__map-finishes`),
      this.options.mapFinishes
    );

    this.setHandlers();
    this.renderMapRecord();
    this.renderMapFinishes();
  }

  private setHandlers() {
    this.$resetButton.on(
      'click.resetButton',
      this.handleResetButtonClick.bind(this)
    );
  }

  private handleResetButtonClick() {
    this.playerName = '';
    this.inputPlayerName.setValue(this.playerName);
    this.renderMapFinishes();
  }

  private handleInputPlayerNameChange(value: string) {
    this.playerName = value;
    this.renderMapFinishes();
  }

  private renderMapFinishes() {
    const finishes = this.mapFinishes.generateRecordEntries({
      playerName: this.playerName,
    });

    this.mapFinishes.render(finishes);
  }

  private renderMapRecord() {
    const records = this.mapRecord.generateRecordEntries({
      playerName: this.playerName,
    });

    this.mapRecord.render(records);
  }
}

export default MapProfile;
