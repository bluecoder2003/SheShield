import { ChevronRight } from "lucide-react";
import AnimatedButton from "@/components/custom/AnimatedButton";

interface SurvivorStoryProps {
  name: string;
  date: string;
  excerpt: string;
  image: string;
}

const SurvivorStory = ({ name, date, excerpt, image }: SurvivorStoryProps) => (
  <div className="border-b border-gray-200 py-6">
    <div className="text-sm text-gray-600 mb-2">{date}</div>
    <h3 className="text-xl text-gray-600 font-serif mb-2">{name}</h3>
    <img
      src={image}
      alt={name}
      className="w-full h-auto mb-4 transition-all duration-300 filter grayscale hover:grayscale-0"
    />
    <p className="text-gray-700 mb-4">{excerpt}</p>
    <AnimatedButton
      href="/auth/signup"
      className="text-red-600 text-sm hover:text-red-700 inline-flex items-center"
    >
      Read Full Story <ChevronRight className="h-4 w-4 ml-1" />
    </AnimatedButton>
  </div>
);

export default SurvivorStory;