import { ExternalLink } from "lucide-react";

interface SafetyAppProps {
  title: string;
  description: string;
  link: string;
}

const SafetyApp = ({ title, description, link }: SafetyAppProps) => (
  <div className="border-b border-gray-200 py-6">
    <h3 className="text-xl text-red-600 hover:text-red-700 mb-2 font-serif italic cursor-pointer">
      {title}
    </h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <a
      href={link}
      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
    >
      Visit Website <ExternalLink className="h-4 w-4 ml-1" />
    </a>
  </div>
);

export default SafetyApp;