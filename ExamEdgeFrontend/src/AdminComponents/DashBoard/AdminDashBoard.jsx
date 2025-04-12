import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-10 to-white-800 p-10 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-12">
          <span className=" text-indigo-500">
            Admin Dashboard
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          

          <DashboardCard
            title="Manage Category"
            description="Manage categories for quizzes or exams."
            buttonLabel="Manage Category"
            link="/admin-dashboard/create-category"
            color="green"
          />

          <DashboardCard
            title="Send Notification"
            description="Notify users about updates, reminders, and news."
            buttonLabel="Send Notification"
            link="/admin-dashboard/create-notification"
            color="yellow"
          />

          <DashboardCard
            title="Manage Payments"
            description="Review and process user payments efficiently."
            buttonLabel="Manage Payments"
            color="indigo"
            link="/admin-dashboard/manage-payments"
          />

          <DashboardCard
            title="Create Quiz"
            description="Design and publish new quizzes for exams."
            buttonLabel="Create Quiz"
            color="red"
            link="/admin-dashboard/create-quiz"

          />
        </div>
      </div>
    </div>
  );
};

// Reusable Dashboard Card Component
const DashboardCard = ({ title, description, buttonLabel, link, color }) => (
  <div className={`bg-white/30 p-8 rounded-xl shadow-xl backdrop-blur-md text-gray-900 border-l-4 border-${color}-700`}>
    <h2 className={`text-2xl font-bold text-${color}-700 mb-4`}>{title}</h2>
    <p className="text-gray-700 mb-6">{description}</p>
    {link ? (
      <Link
        to={link}
        className={`bg-${color}-700 text-white py-2 px-4 rounded-lg hover:brightness-110 transition`}
      >
        {buttonLabel}
      </Link>
    ) : (
      <button
        className={`bg-${color}-700 text-white py-2 px-4 rounded-lg hover:brightness-110 transition`}
      >
        {buttonLabel}
      </button>
    )}
  </div>
);

export default AdminDashboard;
