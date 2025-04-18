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
import moment from "moment/moment";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../components/UI/Loading";

const categories = [
  { name: "All Episodes", icon: <Headphones size={16} /> },
  { name: "Study Abroad", icon: <Globe size={16} /> },
  { name: "IELTS Preparation", icon: <GraduationCap size={16} /> },
  { name: "Career Insights", icon: <Briefcase size={16} /> },
  { name: "Student Stories", icon: <User size={16} /> },
  { name: "University Spotlights", icon: <Mic2 size={16} /> },
];

const stats = [
  { number: "100+", label: "Episodes" },
  { number: "500k+", label: "Total Listens" },
  { number: "4.8/5", label: "Average Rating" },
  { number: "75+", label: "Expert Guests" },
];

const PodcastPlayer = ({ episode, isPlaying, togglePlay, progress }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-4 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <img
          src={episode?.image_thumbnail}
          alt={episode?.title}
          className="w-full aspect-square object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-primary-600">
            {episode?.category}
          </span>
          <span className="text-xs text-neutral-500">•</span>
          <span className="text-xs text-neutral-500">
            {episode?.listened_count} listens
          </span>
        </div>

        <h3 className="text-xl font-bold text-neutral-800 mb-2">
          {episode?.title}
        </h3>
        <p className="text-neutral-600 mb-4">{episode?.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <User size={16} />
            <span>{episode?.host}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Calendar size={16} />
            <span>{moment(episode?.created_at).format("MMM DD, YYYY")}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Clock size={16} />
            <span>{episode?.duration}</span>
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
      <div className="relative group aspect-square">
        <img
          src={episode?.image_thumbnail}
          alt={episode?.title}
          className="w-full h-full object-contain bg-neutral-100"
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
          {episode?.duration}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary-600">
            {episode?.category}
          </span>
          <span className="text-xs text-neutral-400">•</span>
          <span className="text-xs text-neutral-500">
            {episode?.listened_count} listens
          </span>
        </div>
        <h3 className="text-lg font-bold text-neutral-800 mb-2 line-clamp-2">
          {episode?.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {episode?.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-neutral-500 text-xs">
            <Calendar size={14} />
            <span>{moment(episode?.created_at).format("MMM DD, YYYY")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">{episode?.host}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Podcast = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allEpisodes, setAllEpisodes] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Episodes");
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/podcast/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setAllEpisodes(response.data);
        }
        if (response?.data?.length > 0) {
          setCurrentEpisode(response?.data[0]);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
    if (currentEpisode?.id === episode.id) {
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
    if (isPlaying && currentEpisode?.audio) {
      audioRef.current.src = currentEpisode.audio;
      audioRef.current.load();
      audioRef.current
        .play()
        .catch((e) => console.log("Auto-play prevented", e));
    }
  }, [currentEpisode, isPlaying]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <audio ref={audioRef} src={currentEpisode?.audio} />
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
          {currentEpisode ? (
            <PodcastPlayer
              episode={currentEpisode}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              progress={progress}
              currentTime={currentTime}
            />
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
              <h3 className="text-lg font-medium text-neutral-800 mb-2">
                No episode selected
              </h3>
            </div>
          )}
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
                  isCurrentEpisode={currentEpisode?.id === episode.id}
                  isPlaying={isPlaying && currentEpisode?.id === episode.id}
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

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 mb-3 md:mb-4">
              Subscribe to Our Podcast
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg md:text-xl">
              Never miss an episode - subscribe on your favorite platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <button
              className="flex justify-center items-center gap-2 bg-black text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg md:rounded-xl font-medium 
            hover:bg-gray-800 transition-all shadow-sm hover:shadow-md w-full"
            >
              <i className="icofont-brand-apple icofont-md" />
              Apple Podcasts
            </button>
            <button
              className="flex justify-center items-center gap-2 bg-green-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg md:rounded-xl font-medium 
            hover:bg-green-700 transition-all shadow-sm hover:shadow-md w-full"
            >
              <i className="icofont-spotify icofont-md" />
              Spotify
            </button>
            <button
              className="flex justify-center items-center gap-2 bg-red-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg md:rounded-xl font-medium 
            hover:bg-red-700 transition-all shadow-sm hover:shadow-md w-full"
            >
              <i className="icofont-youtube-play icofont-md" />
              YouTube
            </button>
            <button
              className="flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg md:rounded-xl font-medium 
            hover:bg-blue-700 transition-all shadow-sm hover:shadow-md w-full"
            >
              <i className="icofont-google-plus icofont-md" />
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