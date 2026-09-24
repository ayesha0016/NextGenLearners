// src/components/Projects.jsx
import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Projects({ setCurrentPage }) {
  const projectsList = [
    {
      category: "WEB DEVELOPMENT",
      title: "Campus Marketplace App",
      description: "A full-stack MERN marketplace where students list and trade textbooks, built during the Web Dev internship."
    },
    {
      category: "DATA SCIENCE",
      title: "Local Weather Trend Dashboard",
      description: "An interactive dashboard analyzing 10 years of Sindh weather data with pandas and Plotly."
    },
    {
      category: "AI TOOLS & PROMPT ENGINEERING",
      title: "Study Buddy AI Chatbot",
      description: "A prompt-engineered study assistant that generates quizzes from a student's own notes."
    },
    {
      category: "GRAPHIC DESIGN",
      title: "FreshMart Brand Identity",
      description: "A complete brand system — logo, packaging, and app UI — designed for a fictional grocery client."
    },
    {
      category: "WEB DEVELOPMENT",
      title: "Personal Portfolio Sites",
      description: "Every Batch 1 graduate shipped a deployed personal portfolio as part of their capstone."
    },
    {
      category: "DATA SCIENCE",
      title: "Student Performance Predictor",
      description: "A simple ML model predicting at-risk students from attendance and quiz data."
    }
  ];

  return (
    <div className="min-h-screen bg-darkBg text-white py-16 px-6 md:px-16 space-y-24">
      
      {/* Section Header */}
      <ScrollReveal>
        <div className="max-w-4xl space-y-4">
          <span className="text-mintAccent font-mono text-sm tracking-wider uppercase border border-mintAccent/30 px-3 py-1 rounded-md bg-mintAccent/5">
            — STUDENT PROJECTS
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Shipped by our learners, not just <span className="text-mintAccent">graded.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            A sample of capstone and internship projects delivered by Batch 1 students across all four tracks.
          </p>
        </div>
      </ScrollReveal>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {projectsList.map((project, idx) => (
          <ScrollReveal key={idx}>
            <div className="bg-cardBg border border-gray-800 rounded-3xl p-8 flex flex-col justify-between h-full hover:border-mintAccent/40 transition-all duration-300 group space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="inline-block text-[11px] font-mono tracking-wider text-mintAccent bg-mintAccent/10 border border-mintAccent/20 px-3 py-1 rounded-full uppercase">
                    {project.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-mintAccent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}