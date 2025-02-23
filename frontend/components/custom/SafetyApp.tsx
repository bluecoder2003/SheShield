import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface SafetyAppProps {
  title: string;
  description: string;
  link?: string;
}

const SafetyApp: React.FC<SafetyAppProps> = ({ title, description, link }) => (
  <motion.div
    className="border-b border-gray-200 py-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl text-red-600 hover:text-red-700 mb-2 font-serif italic cursor-pointer">
      {title}
    </h3>
    <p className="text-gray-700 mb-4">{description}</p>
    {link && (
      <a
        href={link}
        className="inline-flex items-center text-sm text-gray-600 hover:text-red-600"
      >
        Visit Website <ExternalLink className="h-4 w-4 ml-1" />
      </a>
    )}
  </motion.div>
);

export default SafetyApp;