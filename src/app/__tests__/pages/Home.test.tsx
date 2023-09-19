import { render, screen, within } from "@testing-library/react";
import Home from "../../page";
import { SCHOOLDISTRICTS } from "../__fixtures__/SchoolDistrict.faker";
import { HomeConstants } from "../../constants/Home";

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show No school district found when there is no school district", async () => {
    // Arrange
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });
    render(await Home());
    // Act
    const noSchoolDistrictMessage = screen.getByText(HomeConstants.noSchoolDistrictFound);
    // Assert
    expect(noSchoolDistrictMessage).toBeInTheDocument();
  });

  it("school district has data then it should render a <ul> element", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(SCHOOLDISTRICTS),
    });
    // Arrange
    render(await Home());
    // Act
    const unorderedList = screen.getByRole("list");
    // Assert
    expect(unorderedList).toBeInTheDocument();
  });

  it("should render a <li> element for each school district", async () => {
    // Arrange
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(SCHOOLDISTRICTS),
    });
    render(await Home());
    // Act
    const listItems = screen.getAllByRole("listitem");
    // Assert
    expect(listItems).toHaveLength(3);
  });

  it("each <li> element should contains the text Description, City, Superintendent, Is Public, and No Of Schools", async () => {
    // Arrange
    render(await Home());
    // Act
    const listItems = screen.queryAllByRole("listitem");
    // Assert
    listItems.forEach((li) => {
      const textContent = li.textContent;
      expect(textContent).toContain(HomeConstants.description);
      expect(textContent).toContain(HomeConstants.city);
      expect(textContent).toContain(HomeConstants.superintendent);
      expect(textContent).toContain(HomeConstants.isPublic);
      expect(textContent).toContain(HomeConstants.noOfSchools);
    });
  });

  it("each <li> element shold have a <h2> element", async () => {
    // Arrange
    render(await Home());
    // Act
    const listItems = screen.queryAllByRole("listitem");
    // Assert
    listItems.forEach((li) => {
      const { getByRole } = within(li);
      const heading = getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  it("should render correct school district data on page", async () => {
    // Arrange
    render(await Home());
    // Act
    const name = screen.getByText(SCHOOLDISTRICTS[0].Name);
    const description = screen.getByText(SCHOOLDISTRICTS[0].Description);
    const city = screen.getByText(SCHOOLDISTRICTS[0].City);
    const superintendent = screen.getByText(SCHOOLDISTRICTS[0].Superintendent);
    const numberOfSchools = screen.getByText(SCHOOLDISTRICTS[0].NumberOfSchools);
    const listItem = screen.getByText(SCHOOLDISTRICTS[0].Name).closest("li") as HTMLLIElement;
    const isPublicElement = within(listItem).getByText(/Yes|No/);
    // Assert
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(superintendent).toBeInTheDocument();
    expect(numberOfSchools).toBeInTheDocument();
    expect(isPublicElement.textContent).toMatch(SCHOOLDISTRICTS[0].IsPublic ? "Yes" : "No");
  });

  it("should render all school district data on page", async () => {
    // Arrange
    render(await Home());
    // Act
    const schoolDistrictNames = SCHOOLDISTRICTS.map((district) => district.Name);
    const foundElements = screen.queryAllByText((content) => {
      return schoolDistrictNames.includes(content);
    });
    // Assert
    expect(foundElements).toHaveLength(schoolDistrictNames.length);
  });

  it("should not render the 'Id' property on the page", async () => {
    // Arrange
    render(await Home());
    // Act
    const idText = screen.queryByText(/Id:/i);
    // Assert
    expect(idText).toBeNull();
  });
});
