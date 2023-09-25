import { SCHOOLDISTRICTS } from "../../__fixtures__/SchoolDistrict.faker";
import { createMocks } from "node-mocks-http";
import { GET } from "../../../api/schoolDistricts/route";
import { ApiConstants } from "../../../constants/Api";

describe("School District Api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return list of school districts with Ok status", async () => {
    // Arrange
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(SCHOOLDISTRICTS),
    });
    const { req } = createMocks({
      method: "GET",
    });
    // Act
    const response = await GET(req);
    const result = await response.json();
    // Assert
    expect(global.fetch).toHaveBeenCalledWith(ApiConstants.Urls.GetSchoolDistricts);
    expect(response.status).toBe(200);
    expect(result).toEqual({ data: SCHOOLDISTRICTS, message: ApiConstants.Response.SUCCESS });
  });

  it("should return the 'Content-Type' header", async () => {
    // Arrange
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(SCHOOLDISTRICTS),
    });
    const { req } = createMocks({
      method: "GET",
    });
    // Act
    const response = await GET(req);
    // Assert
    expect(response.headers.get("Content-Type")).toMatch(/application\/json/);
  });

  it("should throw api error and return status 500", async () => {
    // Arrange
    global.fetch = jest.fn().mockResolvedValue(new Error());
    const { req } = createMocks({
      method: "GET",
    });
    // Act
    const response = await GET(req);
    const result = await response.json();
    // Assert
    expect(response.status).toBe(500);
    expect(result).toEqual({ message: ApiConstants.Response.ERROR });
  });
});
