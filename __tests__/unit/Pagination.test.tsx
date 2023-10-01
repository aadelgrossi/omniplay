import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from "@/components/Pagination";

describe("Pagination", () => {
  it("disables previous page control on first page", () => {
    render(<Pagination totalEntries={20} totalPages={2} page={1} />);

    const previousButton = screen.getByTitle("previous-page");
    expect(previousButton).toHaveAttribute("disabled");
  });
  it("disables next pages control on last page", () => {
    render(<Pagination totalEntries={20} totalPages={2} page={2} />);

    const nextButton = screen.getByTitle("next-page");
    expect(nextButton).toHaveAttribute("disabled");
  });

  it("calls next() on click", async () => {
    const next = vi.fn();

    render(<Pagination totalPages={2} next={next} />);

    const nextButton = screen.getByTitle("next-page");

    fireEvent.click(nextButton);
    expect(next).toHaveBeenCalled();
  });
  it("calls previous() on click", async () => {
    const previous = vi.fn();

    render(<Pagination page={2} totalPages={2} previous={previous} />);

    const previousButton = screen.getByTitle("previous-page");

    fireEvent.click(previousButton);
    expect(previous).toHaveBeenCalled();
  });
});
