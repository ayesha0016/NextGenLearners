import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

// Images import kar rahe hain taake Vite unhe bundle kar le
import afeefaImg from '../assets/images/Afeefa.jpeg';
import salarImg from '../assets/images/Salar.jpeg';
import hammadImg from '../assets/images/Hammad.jpeg';
import ayeshaImg from '../assets/images/Ayesha.jpeg';
import mudasirImg from '../assets/images/Mudasir.jpeg';
import zohaImg from '../assets/images/Zoha.jpeg';

const assetMap = {
  'Afeefa.jpeg': afeefaImg,
  'Salar.jpeg': salarImg,
  'Hammad.jpeg': hammadImg,
  'Ayesha.jpeg': ayeshaImg,
  'Mudasir.jpeg': mudasirImg,
  'Zoha.jpeg': zohaImg,
  'afeefa.jpeg': afeefaImg,
  'salar.jpeg': salarImg,
  'hammad.jpeg': hammadImg,
  'ayesha.jpeg': ayeshaImg,
  'mudasir.jpeg': mudasirImg,
  'zoha.jpeg': zohaImg
};

const resolveTeamImage = (imgVal) => {
  if (!imgVal) return afeefaImg;
  if (typeof imgVal === 'string' && assetMap[imgVal]) {
    return assetMap[imgVal];
  }
  return imgVal; // Handles base64 strings uploaded from device via Admin Portal
};

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const savedTeam = localStorage.getItem('site_team');
    if (savedTeam) {
      const parsed = JSON.parse(savedTeam);
      const formatted = parsed.map(item => ({
        image: resolveTeamImage(item.image),
        initials: item.initials || 'TM',
        name: item.name,
        role: item.role || 'Team Member',
        description: item.bio || item.description || '',
        linkedin: item.linkedin || '#',
        github: item.github || '#'
      }));
      setTeamMembers(formatted);
    } else {
      setTeamMembers([
        {
          image: afeefaImg,
          initials: "AQ",
          name: "Afeefa Qurehsi",
          role: "Founder",
          description: "Visionary leader driving the mission of practical, project-based tech education at NextGen Learners.",
          linkedin: "#",
          github: "#"
        },
        {
          image: salarImg,
          initials: "SM",
          name: "Salar Mastoi",
          role: "Co-Founder",
          description: "Co-leading strategic growth, partnerships, and operations to expand tech opportunities for students.",
          linkedin: "https://www.linkedin.com/in/salar-mastoi15",
          github: "https://github.com/salarmastoi110"
        },
        {
          image: hammadImg,
          initials: "MH",
          name: "Muhammad Hammad",
          role: "Technical Team Head",
          description: "Overseeing all technical infrastructure, platform development, and engineering mentorship.",
          linkedin: "#",
          github: "#"
        },
        {
          image: ayeshaImg,
          initials: "AF",
          name: "Ayesha Fatima",
          role: "Website Developer",
          description: "Building and optimizing responsive web interfaces, user dashboards, and modern UI components.",
          linkedin: "https://www.linkedin.com/in/ayesha-fatima-573633304",
          github: "https://github.com/ayesha0016"
        },
        {
          image: mudasirImg,
          initials: "MK",
          name: "Mudasir Khoso",
          role: "Social Media Manager",
          description: "Managing community engagement, digital presence, and outreach campaigns across social platforms.",
          linkedin: "#",
          github: "#"
        },
         {
          image: zohaImg,
          initials: "ZA",
          name: "Zoha Abbasi",
          role: "Mobile App Developer",
          description: "Creating intuitive, high-performing mobile apps that users love. Focused on turning visions into clean code and engaging digital journeys.",
          linkedin: "https://www.linkedin.com/in/zoha-abbasi-38491a386",
          github: "https://github.com/Zoha-Abbasi?tab=repositories"
        }
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-white py-16 px-6 md:px-16 space-y-24">
      
      {/* Section Header */}
      <ScrollReveal>
        <div className="max-w-4xl space-y-4">
          <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
            — CORE TEAM
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            The people building NextGen <span className="text-mintAccent">Learners.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            A dedicated team of builders, creators, and mentors obsessed with practical tech education.
          </p>
        </div>
      </ScrollReveal>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, idx) => (
          <ScrollReveal key={idx}>
            <div className="bg-cardBg border border-gray-800 rounded-3xl p-8 flex flex-col items-center text-center h-full hover:border-mintAccent/40 transition-all duration-300 group space-y-6">
              
              {/* Profile Picture Box */}
              <div className="w-32 h-32 md:w-36 md:h-36 aspect-square rounded-2xl bg-darkBg/60 border border-gray-800 overflow-hidden flex items-center justify-center group-hover:border-mintAccent/50 transition-colors mx-auto relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Bio Content */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-mintAccent transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono tracking-wider text-mintAccent">
                    {member.role}
                  </p>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* Social Links / Icons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-[11px] font-mono text-gray-300 hover:border-mintAccent hover:text-mintAccent transition-colors cursor-pointer"
                  title="LinkedIn"
                >
                  in
                </a>
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-[11px] font-mono text-gray-300 hover:border-mintAccent hover:text-mintAccent transition-colors cursor-pointer"
                  title="GitHub"
                >
                  gh
                </a>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}