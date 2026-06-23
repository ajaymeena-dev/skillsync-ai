import { useState } from "react";
import { useGetVisitorsQuery, useGetAllUsersQuery, useDeleteUserMutation } from "../../services/commonApi";
import { PageLoader } from "../../components/PageLoader";
import { Globe, Users, Activity, MapPin, Calendar, Clock, Monitor, Trash2, ShieldAlert } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import { ConfirmationModal } from "../../components/common/ConfirmationModal";

export function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Activity className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          Developer Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Monitor platform traffic and manage registered users.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-4 text-sm font-medium transition-colors ${
            activeTab === "analytics"
              ? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          Platform Analytics
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-4 text-sm font-medium transition-colors ${
            activeTab === "users"
              ? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          User Management
        </button>
      </div>

      {activeTab === "analytics" ? <AnalyticsTab /> : <UsersTab />}
    </div>
  );
}

function AnalyticsTab() {
  const { data, isLoading, error } = useGetVisitorsQuery();

  if (isLoading) return <div className="py-12 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl">
        Error loading visitor data. Make sure you have developer access.
      </div>
    );
  }

  const visitors = data?.data || [];
  const totalUniqueIPs = visitors.length;
  const totalVisits = visitors.reduce((acc, curr) => acc + (curr.visits || 1), 0);
  const countries = new Set(visitors.map(v => v.country).filter(c => c && c !== "Unknown"));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Unique IPs</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUniqueIPs}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Page Visits</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalVisits}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-500/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Countries Reached</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{countries.size}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Visitor Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">ISP</th>
                <th className="px-6 py-4 font-medium text-center">Visits</th>
                <th className="px-6 py-4 font-medium">Last Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {visitors.map((visitor) => (
                <tr key={visitor._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{visitor.ipAddress}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      {visitor.city !== "Unknown" ? `${visitor.city}, ${visitor.country}` : "Unknown Location"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    <div className="max-w-[200px] truncate" title={visitor.isp}>
                      {visitor.isp}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                      {visitor.visits}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2" title={format(new Date(visitor.lastVisit), "PPpp")}>
                      <Clock className="w-4 h-4" />
                      {formatDistanceToNow(new Date(visitor.lastVisit), { addSuffix: true })}
                    </div>
                  </td>
                </tr>
              ))}
              {visitors.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No visitors logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function UsersTab() {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [userToDelete, setUserToDelete] = useState(null);

  if (isLoading) return <div className="py-12 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl">
        Error loading users data.
      </div>
    );
  }

  const users = data?.data || [];

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete._id).unwrap();
      toast.success("User and associated data permanently deleted");
    } catch (err) {
      toast.error(err.data?.message || "Failed to delete user");
    } finally {
      setUserToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            Registered Users
          </h2>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 rounded-full text-xs font-medium">
            Total: {users.length}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        {user.name}
                        {user.isDeveloper && (
                          <ShieldAlert className="w-4 h-4 text-emerald-500" title="Developer" />
                        )}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                      user.role === 'recruiter' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setUserToDelete(user)}
                      disabled={isDeleting || user.isDeveloper} // Prevent deleting other developers easily
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={user.isDeveloper ? "Cannot delete developers here" : "Delete user"}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Permanently Delete User"
        message={`Are you absolutely sure you want to delete ${userToDelete?.name} (${userToDelete?.email})? This will immediately cascade delete their account along with all associated jobs, applications, resumes, and testimonials. This action is irreversible.`}
        status="rejected"
        isLoading={isDeleting}
      />
    </>
  );
}
