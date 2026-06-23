import { baseApi } from "./baseApi";

export const commonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicStats: builder.query({
      query: () => "/common/stats",
      providesTags: ["PublicStats"],
    }),
    getVisitors: builder.query({
      query: () => "/common/visitors",
      providesTags: ["Analytics"],
    }),
    getAllUsers: builder.query({
      query: () => "/common/users",
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/common/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { 
  useGetPublicStatsQuery, 
  useGetVisitorsQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation
} = commonApi;
