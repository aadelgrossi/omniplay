import { render, screen } from "@testing-library/react";

import SearchResults from "@/modules/search/SearchResults";

import gamesData from "../gamesData";

describe("SearchResults", () => {
  it("should render skeletons when loading", () => {
    render(<SearchResults isLoading />);

    const skeletons = screen.getAllByTitle("loading");
    expect(skeletons.length).toEqual(8);
  });

  it("should show no results view if no games found", () => {
    render(<SearchResults results={[]} />);

    const noResults = screen.getByTitle("no-results");
    expect(noResults).toBeInTheDocument();
  });

  it("should render game cards when results > 0", () => {
    render(<SearchResults results={gamesData.results} />);

    const games = screen.getAllByTitle("game");
    expect(games.length).toEqual(gamesData.results.length);
  });
});
