import React from "react";
import { Users, Book, Award, Globe } from "lucide-react";

const AboutUsPage = () => {
  const stats = [
    { icon: <Users size={24} />, value: "100,000+", label: "Students Taught" },
    { icon: <Book size={24} />, value: "500+", label: "Courses Offered" },
    { icon: <Award size={24} />, value: "98%", label: "Success Rate" },
    { icon: <Globe size={24} />, value: "50+", label: "Countries Reached" },
  ];

  const teamMembers = [
    {
      name: "Dr. Jane Smith",
      role: "Founder & CEO",
      image: "/team-member-1.jpg",
    },
    {
      name: "Prof. John Doe",
      role: "Head of Curriculum",
      image: "/team-member-2.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Operations Officer",
      image: "/team-member-3.jpg",
    },
    {
      name: "Michael Chen",
      role: "Lead Instructor",
      image: "/team-member-4.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About StudyStreak</h1>
          <p className="text-xl">
            Empowering students to achieve their dreams through expert-led test
            preparation
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl mb-8">
              At StudyStreak, we believe that every student deserves the
              opportunity to reach their full potential. Our mission is to
              provide world-class test preparation resources and expert guidance
              to help students achieve their target scores and open doors to
              their dream educational institutions and careers.
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition text-lg font-semibold">
              Learn More About Our Approach
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-purple-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of successful students who have achieved their dreams
            with StudyStreak
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition text-lg font-semibold">
            Explore Our Courses
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
