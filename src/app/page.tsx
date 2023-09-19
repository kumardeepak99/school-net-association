import Header from "./components/Header";
import { HomeConstants } from "./constants/Home";

export default async function Home() {
  const schoolDistricts: SchoolDistrict[] = await fetchData();
  return (
    <div className="container mx-auto p-2">
      <Header />
      {schoolDistricts.length === 0 ? (
        <p className="text-2xl font-semibold text-center text-gray-600">{HomeConstants.noSchoolDistrictFound}</p>
      ) : (
        <div className="max-h-100 overflow-auto border border-gray-600 rounded p-4">
          <ul className="divide-y divide-gray-600">
            {schoolDistricts.map((district: SchoolDistrict) => (
              <li key={district.Id} className="py-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{district.Name}</h2>
                    <p className="text-gray-600">
                      <strong>{HomeConstants.description}:</strong> {district.Description}
                    </p>
                    <p className="text-gray-600">
                      <strong>{HomeConstants.city}:</strong> {district.City}
                    </p>
                  </div>

                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-gray-600">
                      <strong>{HomeConstants.superintendent}:</strong> {district.Superintendent}
                    </p>
                    <p className={`font-semibold ${district.IsPublic ? "text-green-600" : "text-red-600"}`}>
                      <strong>{HomeConstants.isPublic}:</strong> {district.IsPublic ? "Yes" : "No"}
                    </p>
                    <p className="text-gray-600">
                      <strong>{HomeConstants.noOfSchools}:</strong> {district.NumberOfSchools}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const fetchData = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
  if (!response.ok) {
    return [];
  }
  return response.json();
};
