interface StatCardProps {
    number: number;
    description: string;
  }
  
  const StatCard: React.FC<StatCardProps> = ({ number, description }) => (
      <div className="bg-white p-6">
        <h3 className="text-4xl text-red-600 hover:text-red-700 font-serif mb-2">{number}%</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>
    );
    
    export default StatCard;