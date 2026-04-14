import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImgUrl from '../assets/hero_logo.jpeg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Fade in text content block
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Render Stats stagger
    gsap.fromTo(statsRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        }
      }
    );

    // Glowing abstraction fade in
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden py-24"
    >
      {/* Subtle anti-gravity floating particles specific to About section */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 z-0">
        <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-[15%] left-[10%] animate-[float-up_15s_linear_infinite]" style={{boxShadow: '0 0 10px 2px white'}}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-[60%] left-[85%] animate-[float-up_20s_linear_infinite]" style={{boxShadow: '0 0 15px 3px rgba(59,130,246,0.5)'}}></div>
        <div className="w-1 h-1 bg-purple-500 rounded-full absolute top-[80%] left-[20%] animate-[float-up_12s_linear_infinite]" style={{boxShadow: '0 0 12px 2px rgba(168,85,247,0.5)'}}></div>
        <div className="w-2 h-2 bg-indigo-400 rounded-full absolute top-[30%] left-[70%] animate-[float-up_18s_linear_infinite]" style={{boxShadow: '0 0 10px 2px rgba(129,140,248,0.4)'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Content */}
        <div ref={contentRef} className="flex-1 w-full flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tight mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            About Me
          </h2>
          
          <p className="text-xl md:text-2xl font-sans font-light text-gray-200 leading-relaxed mb-6">
            I'm Ved Parmar, a Creative Graphic Designer and Social Media Marketing Specialist with 2+ years of expertise.
          </p>
          
          <p className="text-base md:text-lg font-sans font-light text-gray-400 leading-loose mb-12">
            I specialize in branding, photography, and digital marketing. 
            Currently managing visual content for Adani University and the IEEE Gujarat Section, 
            I bridge the gap between strategic social media management and high-impact visual design.
          </p>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Project Stat */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
               <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500 mb-2">50+</h3>
               <p className="text-sm tracking-wide text-gray-400 uppercase font-medium">Projects</p>
            </div>
            {/* Experience Stat */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
               <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500 mb-2">2+ Yrs</h3>
               <p className="text-sm tracking-wide text-gray-400 uppercase font-medium">Experience</p>
            </div>
            {/* GPA Stat */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] col-span-2 md:col-span-1">
               <h3 className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-2">9.0</h3>
               <p className="text-sm tracking-wide text-gray-400 uppercase font-medium">B-Tech GPA</p>
            </div>
          </div>
        </div>

        {/* Right Side: Abstract Glowing Representation */}
        <div ref={imageRef} className="flex-1 w-full flex items-center justify-center mt-12 lg:mt-0 px-4">
           <div className="relative w-full max-w-[320px] aspect-square md:max-w-md">
              {/* Soft glow accents / Abstract 3D silhouette representation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
              <div className="absolute inset-4 bg-gradient-to-bl from-indigo-500/20 via-transparent to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
              
              {/* Central structure containing your photo */}
              <div className="absolute inset-8 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)] flex items-center justify-center overflow-hidden group">
                 {/* Clean developer image */}
                 <div className="w-full h-full relative opacity-90 group-hover:opacity-100 transition-opacity duration-500 p-2">
                    <img 
                      src={heroImgUrl} 
                      alt="Ved Parmar" 
                      className="w-full h-full object-cover rounded-3xl relative z-10" 
                    />
                 </div>
              </div>
           </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
