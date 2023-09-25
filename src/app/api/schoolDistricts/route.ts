import { NextRequest, NextResponse } from "next/server";
import { ApiConstants } from "../../constants/Api";

export const GET = async (request: NextRequest) => {
  try {
    const res = await fetch(ApiConstants.Urls.GetSchoolDistricts);
    const data = await res.json();
    return NextResponse.json({ message: ApiConstants.Response.SUCCESS, data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: ApiConstants.Response.ERROR }, { status: 500 });
  }
};
