import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { TOKEN_KEY } from "../features/auth/authConstants";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(logout());
    } else if (result.error.status === 429) {
      toast.error(
        result.error.data?.message || "Too many requests. Please try again later."
      );
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "User",
    "Jobs",
    "Applications",
    "Company",
    "Resume",
    "Matches",
    "SkillGap",
    "Roadmap",
    "Notification",
    "DashboardStats",
    "Analytics",
    "Candidates",
    "CompanyProfile",
    "CompanyStats",
    "PublicStats",
    "Job",
    "MyJobs",
    "JobApplications",
    "ApplicationStatus",
    "Application",
    "Match",
    "JobMatches",
    "DetailedMatch",
    "Testimonial",
  ],
  endpoints: () => ({}),
});
