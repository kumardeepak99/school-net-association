import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";
import { HeaderConstants } from "../../constants/Header";

describe("Header component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Header />, {});
  });

  it("should have School Districts title and its style", () => {
    const titleElement = screen.getByText(HeaderConstants.title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-white text-lg font-semibold");
  });

  it("should have a Create New button text and its style", () => {
    const createNewText = screen.getByText(HeaderConstants.createNew);
    expect(createNewText).toBeInTheDocument();
    expect(createNewText).toHaveClass("bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700");
  });

  it("should have a link to create page", () => {
    const linkElement = screen.getByText(HeaderConstants.createNew);
    expect(linkElement).toHaveAttribute("href", "/create");
  });
});
