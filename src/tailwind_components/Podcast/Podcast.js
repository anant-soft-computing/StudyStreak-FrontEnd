import React, { useState, useRef, useEffect } from "react";
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
  Mic2,
  User,
  Globe,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Episode1 from "./Episodes/Episode1MasteringIELTS10Tips.mp3";
import Episode2 from "./Episodes/Episode2FixTheseIELTSWritingGrammarMistakesforaHigherScore.mp3";
import Episode3 from "./Episodes/Episode3AITOOLS.mp3";
import Episode4 from "./Episodes/Episode4OvercomingIELTSAnxiety.mp3";
import Episode5 from "./Episodes/Episode5IELTSExamFormatUpdates2025.mp3";
import Episode6 from "./Episodes/Episode6CulturalNuancesInIELTSSpeaking.mp3";

const categories = [
  { name: "All Episodes", icon: <Headphones size={16} /> },
  { name: "Study Abroad", icon: <Globe size={16} /> },
  { name: "IELTS Preparation", icon: <GraduationCap size={16} /> },
  { name: "Career Insights", icon: <Briefcase size={16} /> },
  { name: "Student Stories", icon: <User size={16} /> },
  { name: "University Spotlights", icon: <Mic2 size={16} /> },
];

const allEpisodes = [
  {
    id: 1,
    title: "Mastering IELTS: 10 Tips for Band 8+",
    description:
      "Learn the top 10 strategies from IELTS experts to boost your score to Band 8 or higher.",
    host: "Dr. Emily Johnson",
    date: "April 10, 2025",
    duration: "32 min",
    audio: Episode1,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250&q=50",
    category: "IELTS Preparation",
    listens: "8.2k",
  },
  {
    id: 2,
    title: "Fix These IELTS Writing Grammar Mistakes for a Higher Score",
    description:
      "Common grammar errors that cost you points and how to fix them with examples.",
    host: "Prof. James Wilson",
    date: "April 5, 2025",
    duration: "28 min",
    audio: Episode2,
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250&q=50",
    category: "IELTS Preparation",
    listens: "6.5k",
  },
  {
    id: 3,
    title: "AI Tools for Language Learning",
    description:
      "How to leverage AI tools to improve your English skills for IELTS and beyond.",
    host: "Tech Expert Mark Chen",
    date: "March 30, 2025",
    duration: "45 min",
    audio: Episode3,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250&q=50",
    category: "IELTS Preparation",
    listens: "5.3k",
  },
  {
    id: 4,
    title: "Overcoming IELTS Anxiety",
    description:
      "Psychological techniques to manage test anxiety and perform your best on exam day.",
    host: "Dr. Sarah Thompson",
    date: "March 25, 2025",
    duration: "38 min",
    audio: Episode4,
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250&q=50",
    category: "IELTS Preparation",
    listens: "4.7k",
  },
  {
    id: 5,
    title: "IELTS Exam Format Updates 2025",
    description:
      "Everything you need to know about the latest changes to the IELTS test format.",
    host: "IELTS Official Representative",
    date: "March 20, 2025",
    duration: "42 min",
    audio: Episode5,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250&q=50",
    category: "IELTS Preparation",
    listens: "9.1k",
  },
  {
    id: 6,
    title: "Cultural Nuances in IELTS Speaking",
    description:
      "Understanding cultural context to improve your Speaking test performance.",
    host: "Linguistics Prof. Anna Lee",
    date: "March 15, 2025",
    duration: "35 min",
    audio: Episode6,
    image:
      "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250&q=50",
    category: "IELTS Preparation",
    listens: "3.9k",
  },
];

const stats = [
  { number: "100+", label: "Episodes" },
  { number: "500k+", label: "Total Listens" },
  { number: "4.8/5", label: "Average Rating" },
  { number: "75+", label: "Expert Guests" },
];

const PodcastPlayer = ({
  episode,
  isPlaying,
  togglePlay,
  progress,
  currentTime,
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-4 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <img
          src={episode.image}
          alt={episode.title}
          className="w-full aspect-square object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-primary-600">
            {episode.category}
          </span>
          <span className="text-xs text-neutral-500">•</span>
          <span className="text-xs text-neutral-500">
            {episode.listens} listens
          </span>
        </div>

        <h3 className="text-xl font-bold text-neutral-800 mb-2">
          {episode.title}
        </h3>
        <p className="text-neutral-600 mb-4">{episode.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <User size={16} />
            <span>{episode.host}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Calendar size={16} />
            <span>{episode.date}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Clock size={16} />
            <span>{episode.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <button
            className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-all shadow-md"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-neutral-600 text-sm w-20 text-right">
            {formatTime(currentTime)} / {episode.duration}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-neutral-600 hover:text-primary-600 transition-colors text-sm">
            <Share2 size={16} />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-1 text-neutral-600 hover:text-primary-600 transition-colors text-sm">
            <Bookmark size={16} />
            <span>Save</span>
          </button>
          <button className="flex items-center gap-1 text-neutral-600 hover:text-primary-600 transition-colors text-sm">
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const EpisodeCard = ({ episode, onPlay, isCurrentEpisode, isPlaying }) => {
  return (
    <div
      className={`bg-white rounded-xl border ${
        isCurrentEpisode ? "border-primary-500" : "border-neutral-200"
      } 
      shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden`}
    >
      <div className="relative group">
        <img
          src={episode.image}
          alt={episode.title}
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onPlay(episode)}
            className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-all shadow-lg"
          >
            {isCurrentEpisode && isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
          </button>
        </div>
        <div className="absolute bottom-3 right-3 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
          {episode.duration}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary-600">
            {episode.category}
          </span>
          <span className="text-xs text-neutral-400">•</span>
          <span className="text-xs text-neutral-500">
            {episode.listens} listens
          </span>
        </div>
        <h3 className="text-lg font-bold text-neutral-800 mb-2 line-clamp-2">
          {episode.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {episode.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-neutral-500 text-xs">
            <Calendar size={14} />
            <span>{episode.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">{episode.host}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Podcast = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Episodes");
  const [currentEpisode, setCurrentEpisode] = useState(allEpisodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const filteredEpisodes = allEpisodes.filter((episode) => {
    const matchesSearch =
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Episodes" ||
      episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play a specific episode
  const playEpisode = (episode) => {
    if (currentEpisode.id === episode.id) {
      togglePlay();
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
      // The audio element's onPlay handler will take care of actually playing
    }
  };

  // Update progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration || 1;
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
    }
  };

  // Handle audio ended
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  // Set up audio element effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleAudioEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleAudioEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Play/pause when current episode changes
  useEffect(() => {
    if (isPlaying && currentEpisode.audio) {
      audioRef.current.src = currentEpisode.audio;
      audioRef.current
        .play()
        .catch((e) => console.log("Auto-play prevented", e));
    }
  }, [currentEpisode, isPlaying]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <audio ref={audioRef} src={currentEpisode.audio} />
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Mic2 size={16} />
              <span>New Episode Every Wednesday</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              StudyStreak Podcast
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Expert insights, student stories, and essential guidance for your
              international education journey
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
                  hover:bg-primary-800 transition-all duration-300 border border-primary-500
                  shadow-md hover:shadow-lg"
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
          <PodcastPlayer
            episode={currentEpisode}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            progress={progress}
            currentTime={currentTime}
          />
        </div>
      </section>

      <section className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Browse Episodes
              </h2>
              <p className="text-neutral-600">
                Discover valuable insights for your education journey
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search episodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border border-neutral-300
                  focus:ring-2 focus:ring-primary-300 focus:border-primary-300 w-full"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                />
              </div>

              <div className="relative flex-1 md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 rounded-xl border border-neutral-300
                  focus:ring-2 focus:ring-primary-300 focus:border-primary-300 w-full"
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="md:hidden mb-6 overflow-x-auto">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-sm 
                    ${
                      selectedCategory === category.name
                        ? "bg-primary-600 text-white"
                        : "bg-white text-neutral-600 border border-neutral-300"
                    }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {filteredEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEpisodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  onPlay={playEpisode}
                  isCurrentEpisode={currentEpisode.id === episode.id}
                  isPlaying={isPlaying && currentEpisode.id === episode.id}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
              <h3 className="text-lg font-medium text-neutral-800 mb-2">
                No episodes found
              </h3>
            </div>
          )}

          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-2 bg-white text-primary-600 border border-primary-300 
              px-6 py-3 rounded-xl font-medium hover:bg-primary-50 transition-all shadow-sm hover:shadow-md"
            >
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

          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <button
              className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-gray-800 transition-all shadow-sm hover:shadow-md flex-1 min-w-[200px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-apple"
                viewBox="0 0 16 16"
              >
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
              </svg>
              Apple Podcasts
            </button>
            <button
              className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-green-700 transition-all shadow-sm hover:shadow-md flex-1 min-w-[200px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-spotify"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
              </svg>
              Spotify
            </button>
            <button
              className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-red-700 transition-all shadow-sm hover:shadow-md flex-1 min-w-[200px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-youtube"
                viewBox="0 0 16 16"
              >
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
              YouTube
            </button>
            <button
              className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium 
              hover:bg-blue-700 transition-all shadow-sm hover:shadow-md flex-1 min-w-[200px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
              </svg>
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
              We're always looking for new topics and guests to feature on our
              podcast. Let us know what you'd like to hear about!
            </p>

            <form className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-primary-700 border border-primary-600
                  text-white placeholder-primary-300 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-primary-800 px-6 py-3 rounded-xl font-medium
                  hover:bg-primary-50 transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Submit Suggestion
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