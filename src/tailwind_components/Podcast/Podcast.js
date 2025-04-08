import React, { useState } from "react";
import {
  Headphones,
  Play,
  Pause,
  Clock,
  Calendar,
  Share2,
  Search,
  ChevronDown,
  ArrowRight,
  Bookmark,
  Download,
} from "lucide-react";

const categories = [
  "All Episodes",
  "Study Abroad",
  "IELTS Preparation",
  "Career Insights",
  "Student Stories",
  "University Spotlights",
];

const featuredEpisodes = [
  {
    id: 1,
    title: "Navigating the Study Abroad Application Process",
    description: "Expert tips on preparing your documents and application strategy for top universities abroad.",
    host: "Dr. Sarah Chen",
    date: "April 2, 2025",
    duration: "42 min",
    image: "/api/placeholder/400/320",
    category: "Study Abroad",
    listens: "4.2k"
  },
  {
    id: 2,
    title: "IELTS Speaking: Strategies for Band 8+",
    description: "Master speaking techniques with practical examples and common pitfalls to avoid.",
    host: "Prof. James Wilson",
    date: "March 28, 2025",
    duration: "38 min",
    image: "/api/placeholder/400/320",
    category: "IELTS Preparation",
    listens: "5.8k"
  },
  {
    id: 3,
    title: "From Mumbai to MIT: Ananya's Journey",
    description: "Student success story featuring challenges, preparation strategies, and cultural adaptation.",
    host: "Ananya Patel with Dr. Lisa Morgan",
    date: "March 15, 2025",
    duration: "45 min",
    image: "/api/placeholder/400/320",
    category: "Student Stories",
    listens: "3.5k"
  },
];

const recentEpisodes = [
  {
    id: 4,
    title: "Top Scholarships for International Students in 2025",
    description: "Comprehensive guide to finding and applying for scholarships worldwide.",
    host: "Michael Thompson",
    date: "April 5, 2025",
    duration: "51 min",
    image: "/api/placeholder/400/320",
    category: "Study Abroad",
    listens: "1.8k"
  },
  {
    id: 5,
    title: "PTE vs. TOEFL: Which Test Is Right for You?",
    description: "Compare structures, scoring systems, and preparation strategies for both exams.",
    host: "Emma Rodriguez",
    date: "April 1, 2025",
    duration: "36 min",
    image: "/api/placeholder/400/320",
    category: "IELTS Preparation",
    listens: "2.3k"
  },
  {
    id: 6,
    title: "University Spotlight: Oxford University",
    description: "Exploring admissions, courses, student life, and career opportunities.",
    host: "Dr. Jonathan Reid",
    date: "March 25, 2025",
    duration: "49 min",
    image: "/api/placeholder/400/320",
    category: "University Spotlights",
    listens: "3.1k"
  },
  {
    id: 7,
    title: "Building a Global Career After Graduation",
    description: "Expert advice on leveraging your international education for career success.",
    host: "Sophia Chang",
    date: "March 20, 2025",
    duration: "44 min",
    image: "/api/placeholder/400/320",
    category: "Career Insights",
    listens: "2.7k"
  },
  {
    id: 8,
    title: "IELTS Writing Task 2: Advanced Techniques",
    description: "Master complex essay structures and vocabulary for high band scores.",
    host: "Prof. James Wilson",
    date: "March 18, 2025",
    duration: "40 min",
    image: "/api/placeholder/400/320",
    category: "IELTS Preparation",
    listens: "4.5k"
  },
  {
    id: 9,
    title: "From Delhi to Stanford: Rahul's Journey",
    description: "Student success story highlighting preparation strategies and cultural integration.",
    host: "Rahul Sharma with Dr. Lisa Morgan",
    date: "March 12, 2025",
    duration: "47 min",
    image: "/api/placeholder/400/320",
    category: "Student Stories",
    listens: "3.3k"
  }
];

const stats = [
  { number: "100+", label: "Episodes" },
  { number: "500k+", label: "Total Listens" },
  { number: "4.8/5", label: "Average Rating" },
  { number: "75+", label: "Expert Guests" },
];

const PodcastPlayer = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <img 
          src={episode.image} 
          alt={episode.title}
          className="w-full aspect-square object-cover rounded-lg" 
        />
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-primary-600 mb-1 block">{episode.category}</span>
        <h3 className="text-xl font-bold text-neutral-800 mb-2">{episode.title}</h3>
        <p className="text-neutral-600 mb-4">{episode.description}</p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Calendar size={16} />
            <span>{episode.date}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Clock size={16} />
            <span>{episode.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Headphones size={16} />
            <span>{episode.listens} listens</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-all"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div className="bg-primary-500 h-full w-0" style={{ width: isPlaying ? '35%' : '0%' }}></div>
          </div>
          
          <div className="text-neutral-600 text-sm">
            {isPlaying ? '14:42' : '00:00'} / {episode.duration}
          </div>
        </div>
        
        <div className="flex gap-3 mt-4">
          <button className="text-neutral-600 hover:text-primary-600 transition-colors">
            <Share2 size={20} />
          </button>
          <button className="text-neutral-600 hover:text-primary-600 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="text-neutral-600 hover:text-primary-600 transition-colors">
            <Download size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const EpisodeCard = ({ episode }) => (
  <div className="bg-white rounded-xl border border-neutral-200 shadow-card hover:shadow-card-hover 
    transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
    <div className="relative">
      <img 
        src={episode.image} 
        alt={episode.title}
        className="w-full aspect-video object-cover" 
      />
      <div className="absolute bottom-3 right-3 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
        {episode.duration}
      </div>
    </div>
    <div className="p-4">
      <span className="text-xs font-medium text-primary-600 mb-1 block">{episode.category}</span>
      <h3 className="text-lg font-bold text-neutral-800 mb-2 line-clamp-2">{episode.title}</h3>
      <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{episode.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-neutral-500 text-xs">
            <Calendar size={14} />
            <span>{episode.date}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-xs">
            <Headphones size={14} />
            <span>{episode.listens}</span>
          </div>
        </div>
        <button className="text-primary-600 hover:text-primary-700 transition-colors">
          <Play size={20} />
        </button>
      </div>
    </div>
  </div>
);

const Podcast = () => {
  const currentlyPlaying = featuredEpisodes[0];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Episodes");

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              StudyStreak Podcast
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Expert insights, student stories, and essential guidance for your international education journey
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium
                  hover:bg-primary-50 transition-all duration-300 shadow-elevated 
                  hover:shadow-hover transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Headphones className="w-5 h-5" />
                Subscribe Now
              </button>
              <button
                className="bg-primary-700 text-white px-8 py-3 rounded-xl font-medium
                  hover:bg-primary-800 transition-all duration-300 border border-primary-500"
              >
                Latest Episode
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ number, label }, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {number}
                </div>
                <div className="text-neutral-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Featured Episode
            </h2>
            <p className="text-neutral-600 text-lg">
              Listen to our most popular and impactful discussions
            </p>
          </div>
          
          <PodcastPlayer episode={currentlyPlaying} />
        </div>
      </section>

      <section className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Browse Episodes
              </h2>
              <p className="text-neutral-600">
                Discover valuable insights for your education journey
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search episodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border border-neutral-300
                  focus:ring-2 focus:ring-primary-300 focus:border-primary-300 w-full md:w-64"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              </div>
              
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 rounded-xl border border-neutral-300
                  focus:ring-2 focus:ring-primary-300 focus:border-primary-300 w-full"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-white text-primary-600 border border-primary-300 
              px-6 py-3 rounded-xl font-medium hover:bg-primary-50 transition-all">
              Load More Episodes
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Subscribe to Our Podcast
            </h2>
            <p className="text-neutral-600 text-lg">
              Never miss an episode - subscribe on your favorite platform
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-gray-800 transition-all">
              <img src="/api/placeholder/24/24" alt="Apple Podcasts" className="w-6 h-6" />
              Apple Podcasts
            </button>
            <button className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-green-700 transition-all">
              <img src="/api/placeholder/24/24" alt="Spotify" className="w-6 h-6" />
              Spotify
            </button>
            <button className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-red-700 transition-all">
              <img src="/api/placeholder/24/24" alt="YouTube" className="w-6 h-6" />
              YouTube
            </button>
            <button className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-blue-700 transition-all">
              <img src="/api/placeholder/24/24" alt="Google Podcasts" className="w-6 h-6" />
              Google Podcasts
            </button>
          </div>
        </div>
      </section>
      
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Have a Topic Suggestion?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              We're always looking for new topics and guests to feature on our podcast.
              Let us know what you'd like to hear about!
            </p>
            
            <form className="max-w-lg mx-auto">
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-xl bg-primary-700 border border-primary-600
                  text-white placeholder-primary-300 focus:ring-2 focus:ring-primary-400"
                />
                <button 
                  type="submit"
                  className="bg-white text-primary-800 px-6 py-3 rounded-xl font-medium
                  hover:bg-primary-50 transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcast;