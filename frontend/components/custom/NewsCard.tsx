import { ChevronRight } from "lucide-react";

interface NewsCardProps {
  date: string;
  title: string;
  description: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ date, title, description }) => (
  <div className="flex justify-start items-start flex-col border border-gray-200 p-6 rounded-lg shadow-sm bg-[#F9F9F9]">
    <div className="text-sm text-gray-500">{date}</div>
    <h3 className="text-left text-xl font-medium mt-2 text-gray-600">{title}</h3>
    <p className="text-gray-600 text-left mt-3 text-sm leading-relaxed">{description}</p>
    <a
      href="#"
      className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center mt-4 hover:underline"
    >
      read more <ChevronRight className="h-4 w-4 ml-1" />
    </a>
  </div>
);

export default NewsCard;