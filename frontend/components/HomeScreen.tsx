// types.ts
type TestimonialType = {
  quote: string;
  author: string;
  role: string;
  image: string;
};

type InsightType = {
  value: string;
  label: string;
  description: string;
  link: string;
};

// page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowUpRight } from 'lucide-react';

export default function LandingPage() {
  const metrics = [
    { value: '4.9', label: 'Trusted' },
    { value: '>5M', label: 'Total Revenue' },
    { value: '1200+', label: 'Total Revenue' },
  ];

  const insights: InsightType[] = [
    {
      value: '$2.5M',
      label: 'Trusted',
      description: 'Achieve greater efficiency and accuracy with a compensation solution designed to give you real-time data, insightful analytics.',
      link: '/learn-more'
    },
    {
      value: '$12.00',
      label: 'Trusted',
      description: 'Empower your HR team with a platform that simplifies compensation planning and ensures transparency across the board.',
      link: '/learn-more'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold">sheshield</Link>
            <div className="flex items-center space-x-8">
              <span>06.04.23</span>
              <span>London</span>
              <Link href="/auth/login">
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold 
              hover:bg-purple-100 transition-colors">
              login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold 
              hover:bg-purple-100 transition-colors">
              Signup
            </button>
          </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-7xl font-bold max-w-2xl mb-16">
            Courage starts with a single report
          </h1>

          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-black/90 p-4 z-10">
                <h3 className="text-lg font-semibold mb-2">Compensation Planning</h3>
                <div className="w-12 h-6 bg-white rounded-full"></div>
              </div>
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <Image 
                  src="/api/placeholder/800/600"
                  alt="Compensation Planning"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <div className="bg-white/10 p-6 rounded-lg mb-4">
                <p className="text-lg">"Transforming businesses with the power of the cloud, our SAAS"</p>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-gray-400">Monthly</span>
                  <span className="text-sm text-gray-400 ml-auto">Goned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">
            Make data-driven decisions with real-time insights and ensure every reward aligns with your business objectives.
          </h2>

          {/* Metrics */}
          <div className="flex justify-between items-center py-12 border-y border-white/10">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold mb-2">{metric.value}</h3>
                <p className="text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-12 py-20">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Make data-driven decisions with real-time insights
              </h2>
              <ul className="space-y-4 text-gray-400">
                <li>Create Analytics Groups</li>
                <li>Deep Compensation Integration</li>
                <li>Results You Can Measure</li>
                <li>Apply Best Practices</li>
              </ul>
            </div>
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <Image 
                src="/api/placeholder/800/600"
                alt="Data-driven decisions"
                width={800}
                height={600}
                className="object-cover"
              />
              <button className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full">
                <Play size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Our Happy Customers Says</h2>
          <div className="bg-white/10 p-8 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-xl mb-4">
                  "Being able to see and adjust compensation in real-time has made a huge difference. We feel confident that we're fair rewards."
                </p>
                <p className="text-gray-400">- Jenny Leichester</p>
              </div>
              <Image 
                src="/api/placeholder/400/400"
                alt="Testimonial"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Our Insight and Blog</h2>
          <div className="space-y-8">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between py-8 border-t border-white/10">
                <div>
                  <div className="flex items-baseline space-x-4 mb-2">
                    <span className="text-2xl font-bold">{insight.value}</span>
                    <span className="text-gray-400">{insight.label}</span>
                  </div>
                  <p className="text-gray-400 max-w-2xl">{insight.description}</p>
                </div>
                <Link href={insight.link} className="flex items-center">
                  <span className="mr-2">GET DEAL</span>
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/about">About</Link>
              <Link href="/product">Product</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/career">Career</Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white text-black px-4 py-2 rounded-full">
                Back To Top
              </button>
              <div className="flex space-x-2">
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8">
            © {new Date().getFullYear()} All RIGHTS RESERVED • TERMS & CONDITIONS • PRIVACY POLICY
          </p>
        </div>
      </footer>
    </div>
  );
}