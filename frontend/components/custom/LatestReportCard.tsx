import { ChevronRight } from "lucide-react";

const LatestReportCard = () => (
  <div className="flex items-center justify-center flex-col bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
    <h3 className="text-2xl font-serif mb-4 text-gray-600">Latest Report on Women in the Private Sector</h3>
    <img
      src="/story1.jpg"
      className="w-full h-auto mb-4 transition-all duration-300 filter grayscale hover:grayscale-0"
    />
    <p className="text-gray-700 text-sm leading-relaxed mb-4">
      The latest report highlights the challenges and progress of women in the private sector. It covers various aspects such as representation, pay equity, and workplace culture.
    </p>
    <a
      href="#"
      className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center hover:underline"
    >
      Read Full Report <ChevronRight className="h-4 w-4 ml-1" />
    </a>
  </div>
);

export default LatestReportCard;