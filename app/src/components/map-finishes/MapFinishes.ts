import FinishEntry from '../finish-entry';
import { MapFinishesOptions } from './types';

class MapFinishes {
  private options: MapFinishesOptions;
  private className: string;
  private $component: JQuery<HTMLElement>;
  private $tableBody: JQuery<HTMLElement>;

  private finishEntries: FinishEntry[];

  constructor($parent: JQuery<HTMLElement>, { finishes }: MapFinishesOptions) {
    this.options = {
      finishes,
    };

    this.className = 'map-finishes';
    this.$component = $parent.find(`.js-${this.className}`);
    this.$tableBody = this.$component.find(`.js-${this.className}__table-body`);

    const rankOneTime = finishes[0]?.time;

    this.finishEntries = this.options.finishes.map(
      (finish) =>
        new FinishEntry({
          finish,
          rankOneTime,
        })
    );
  }

  public generateRecordEntries({ playerName = '' }: { playerName?: string }) {
    const entries = this.finishEntries.filter((finish) => {
      const { name } = finish.getOptions().finish;

      return name.toLowerCase().includes(playerName.trim().toLowerCase());
    });

    return entries;
  }

  public render(finishEntries: FinishEntry[]) {
    this.$tableBody.empty();

    finishEntries.forEach((entry) => {
      const $entry = entry.getHtml();
      this.$tableBody.append($entry);
    });
  }
}

export default MapFinishes;
