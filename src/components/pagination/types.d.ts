import PlayerEntry from "../player-entry";

interface PaginationOptions {
  dataSource: Array<PlayerEntry>,
  render: (data: Array<PlayerEntry>) => void,
}