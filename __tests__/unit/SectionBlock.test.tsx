import { render, screen } from "@testing-library/react";

import SectionBlock from "@/modules/show/SectionBlock";

describe("Section Block", () => {
  it("renders a heading and content", () => {
    const heading = "About";

    const { baseElement } = render(
      <SectionBlock heading={heading}>
        <p>Lorem ipsum</p>
      </SectionBlock>
    );

    const headingElement = screen.getByText("About");
    const contentElement = screen.getByText("Lorem ipsum");

    expect(headingElement).toBeInTheDocument();
    expect(baseElement).toContainElement(contentElement);
  });
});
