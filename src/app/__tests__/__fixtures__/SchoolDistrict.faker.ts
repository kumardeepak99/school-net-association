import { faker } from "@faker-js/faker";

export function createSchoolDistrict(): SchoolDistrict {
  return {
    Id: faker.database.mongodbObjectId(),
    Name: faker.company.name(),
    Description: faker.lorem.sentence(),
    City: faker.location.city(),
    Superintendent: faker.person.fullName(),
    IsPublic: Math.random() < 0.5,
    NumberOfSchools: faker.helpers.rangeToNumber({ min: 1, max: 10000 }),
  };
}

export const SCHOOLDISTRICTS: any[] = faker.helpers.multiple(createSchoolDistrict, {
  count: 3,
});
