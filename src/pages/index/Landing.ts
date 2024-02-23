import '../../components/container';

import CategoryMenu from '../../components/category-menu';
import Leaderboard from '../../components/leaderboard';
import Pagination from '../../components/pagination';
import Expander from '../../components/expander';
import InputField from '../../components/input-field';
import {
  Categories,
  Category,
  KoGMap,
  MapType,
  PlayerRanks,
} from '../../types/types';
import { RANK_TYPES, debounceLast } from '../../utilities/utilities';

import { LandingOptions } from './types';

class Landing {
  private className: string;
  private options: LandingOptions;
  private $component: JQuery<HTMLElement>;
  private $categoryMenu: JQuery<HTMLElement>;
  private $pagination: JQuery<HTMLElement>;
  private leaderboard: Leaderboard;
  private pagination: Pagination;
  private category: MapType = 'Total';
  private player = '';
  private $resetButton: JQuery<HTMLElement>;
  private categoryMenu: CategoryMenu;
  private inputPlayerName: InputField;
  private inputTiedPlayersFrom: InputField;
  private inputTiedPlayersTo: InputField;
  private tiedPlayersFrom: number | null = null;
  private tiedPlayersTo: number | null = null;

  constructor($element: JQuery<HTMLElement>, options: LandingOptions) {
    this.options = options;
    this.className = 'landing';
    this.$component = $element;
    this.$pagination = this.$component.find(
      `.js-${this.className}__pagination`
    );

    this.$categoryMenu = this.$component.find(
      `.js-${this.className}__category-menu`
    );

    this.category = this.options.sortBy;

    this.$resetButton = this.$component.find(
      `.js-${this.className}__reset-button`
    );

    const categoryMenuOptions = {
      ...this.options.categoryMenu,
      sortBy: this.options.sortBy,
      onChange: this.handleMenuChange.bind(this),
    };

    new Expander(this.$component.find(`.js-${this.className}__expander`));

    this.inputPlayerName = new InputField(
      this.$component.find(`.js-${this.className}__input-player-name`),
      {
        onChange: debounceLast(this.handleInputNameChange.bind(this), 250),
      }
    );

    this.inputTiedPlayersFrom = new InputField(
      this.$component.find(`.js-${this.className}__input-tied-players-from`),
      {
        onChange: debounceLast(
          this.handleInputTiedPlayersFromChange.bind(this),
          250
        ),
      }
    );

    this.inputTiedPlayersTo = new InputField(
      this.$component.find(`.js-${this.className}__input-tied-players-to`),
      {
        onChange: debounceLast(
          this.handleInputTiedPlayersToChange.bind(this),
          250
        ),
      }
    );

    this.categoryMenu = new CategoryMenu(
      this.$categoryMenu,
      categoryMenuOptions
    );

    this.leaderboard = new Leaderboard(
      this.$component.find(`.js-${this.className}__leaderboard`),
      {
        sortBy: this.options.sortBy,
        players: this.calcPlayersTopRanks(this.options.topRanks),
      }
    );

    this.pagination = new Pagination(this.$pagination);

    this.setHandlers();
    this.render();
  }

  private calcPlayersTopRanks(
    topRanks: KoGMap[],
    tiedPlayersFrom: number | null = this.tiedPlayersFrom,
    tiedPlayersTo: number | null = this.tiedPlayersTo
  ) {
    const playersTopRanks: {
      [key: string]: Categories;
    } = {};

    topRanks.forEach((map) => {
      const { topFinishes } = map;

      topFinishes.forEach(({ name, rank }) => {
        if (playersTopRanks[name] === undefined) {
          playersTopRanks[name] = this.initMapTypes();
        }

        const playersAmountWithSameRank = topFinishes.filter(
          (finish) => finish.rank === rank
        ).length;

        const from =
          tiedPlayersFrom === null ||
          playersAmountWithSameRank >= tiedPlayersFrom;
        const to =
          tiedPlayersTo === null || playersAmountWithSameRank <= tiedPlayersTo;

        if (rank <= 5 && from && to) {
          playersTopRanks[name][map.category][RANK_TYPES[rank - 1]] += 1;
          playersTopRanks[name]['Total'][RANK_TYPES[rank - 1]] += 1;
        }
      });
    });

    const playersTopRanksArray: PlayerRanks[] = Object.entries(
      playersTopRanks
    ).map(([key, value]) => ({
      name: key,
      categories: value,
    }));

    return playersTopRanksArray;
  }

  private initRankTypes(): Category {
    return {
      'rank 1': 0,
      'rank 2': 0,
      'rank 3': 0,
      'rank 4': 0,
      'rank 5': 0,
    };
  }

  private initMapTypes(): Categories {
    return {
      Easy: this.initRankTypes(),
      Main: this.initRankTypes(),
      Hard: this.initRankTypes(),
      Insane: this.initRankTypes(),
      Mod: this.initRankTypes(),
      Extreme: this.initRankTypes(),
      Total: this.initRankTypes(),
      Solo: this.initRankTypes(),
    };
  }

  private setHandlers() {
    this.$resetButton.on(
      'click.resetButton',
      this.handleResetButtonClick.bind(this)
    );
  }

  private handleResetButtonClick() {
    this.player = '';
    this.category = 'Total';
    this.inputPlayerName.setValue(this.player);
    this.categoryMenu.setCategory(this.category);

    this.tiedPlayersFrom = null;
    this.inputTiedPlayersFrom.setValue('');

    this.tiedPlayersTo = null;
    this.inputTiedPlayersTo.setValue('');

    const records = this.calcPlayersTopRanks(this.options.topRanks);
    this.leaderboard.updateCategories(records);
    this.render();
  }

  private handleInputNameChange(value: string) {
    this.player = value;
    this.render(false);
  }

  private handleInputTiedPlayersFromChange(value: string) {
    const num = parseInt(value);
    const from = Number.isNaN(num) ? null : num;
    this.tiedPlayersFrom = from;
    const records = this.calcPlayersTopRanks(this.options.topRanks);
    this.leaderboard.updateCategories(records);
    this.render();
  }

  private handleInputTiedPlayersToChange(value: string) {
    const num = parseInt(value);
    const to = Number.isNaN(num) ? null : num;
    this.tiedPlayersTo = to;
    const records = this.calcPlayersTopRanks(this.options.topRanks);
    this.leaderboard.updateCategories(records);
    this.render();
  }

  private handleMenuChange(category: MapType) {
    this.category = category;
    this.render();
  }

  private render(shouldUpdate = true) {
    this.pagination.render(
      this.leaderboard.generatePlayerEntries(
        this.category,
        this.player,
        shouldUpdate
      ),
      this.leaderboard.render.bind(this.leaderboard)
    );
  }
}

export default Landing;
