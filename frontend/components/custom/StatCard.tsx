import { motion } from "framer-motion";

interface StatCardProps {
  number: number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, description }) => (
  <motion.div
    className="bg-white p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <h3 className="text-4xl text-red-600 hover:text-red-700 font-serif mb-2">{number}%</h3>
    <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default StatCard;