import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImgUrl from "../assets/hero_v4.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function FrameScroll() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  // Generate sparse particle fields
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`, // 1px to 3px
      duration: `${Math.random() * 15 + 15}s`, // 15s to 30s
      delay: `${Math.random() * -30}s`, // start at different points
      opacity: Math.random() * 0.5 + 0.1, // very low opacity
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const frameCount = 240;

    const sequence = { frame: 0 };
    const heroImage = new window.Image();
    heroImage.src = heroImgUrl;

    const render = () => {
      if (heroImage.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = heroImage.width / heroImage.height;

        let scale;
        if (canvasAspect > imageAspect) {
          scale = canvas.width / heroImage.width;
        } else {
          scale = canvas.height / heroImage.height;
        }

        // Add a smooth zoom effect from 1x to 1.4x (more dramatic)
        const scrollZoom = 1 + (sequence.frame / frameCount) * 0.4;
        const finalScale = scale * scrollZoom;

        // Align to top-center to keep the face/top area visible
        const x = (canvas.width - heroImage.width * finalScale) / 2;
        const y = 0;

        // Draw the image
        context.drawImage(heroImage, x, y, heroImage.width * finalScale, heroImage.height * finalScale);

        // --- ENHANCEMENT: Cinematic Vignette Overlay ---
        // This blends the photo edges into the black background and makes text pop
        const vignette = context.createRadialGradient(
          canvas.width / 2, canvas.height / 2, canvas.height * 0.2, // Center of hero
          canvas.width / 2, canvas.height / 2, canvas.width * 0.9  // Edge of hero
        );
        vignette.addColorStop(0, "rgba(0, 0, 0, 0)");         // Clear center
        vignette.addColorStop(0.5, "rgba(0, 0, 0, 0.2)");     // Subtle shadow
        vignette.addColorStop(1, "rgba(0, 0, 0, 0.9)");       // Deep black edges

        context.fillStyle = vignette;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // --- ENHANCEMENT: Bottom Fade Overlay ---
        // Ensures smooth transition to the next section
        const bottomFade = context.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
        bottomFade.addColorStop(0, "rgba(0,0,0,0)");
        bottomFade.addColorStop(1, "rgba(0,0,0,1)");
        context.fillStyle = bottomFade;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    heroImage.onload = () => {
      handleResize();
    };

    const handleResize = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        render();
      }
    };

    window.addEventListener("resize", handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=4000",
      },
    });

    // 1. Scrub frames from 0 to 239 over the entire scroll duration
    // Main clock: duration 240 matches exact frame logic map
    tl.to(sequence, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 240,
      onUpdate: () => requestAnimationFrame(render),
    }, 0);

    // Initial resets for texts
    gsap.set([text1Ref.current, text2Ref.current], { opacity: 0 });

    /* 
      FRAME LOGIC MAP
      Frame 60-120: "I am Ved Parmar" reveals and stays.
      Frame 100-140: "Graphic Designer" reveals underneath.
      Frame 180-220: Both fade out together.
    */

    // --- name Reveal ---
    tl.fromTo(text1Ref.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 30, ease: "power2.out" },
      60
    );

    // --- title Reveal ---
    tl.fromTo(text2Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 30, ease: "power2.out" },
      90
    );

    // --- Final Group Exit ---
    tl.to([text1Ref.current, text2Ref.current],
      { opacity: 0, scale: 1.1, duration: 40, ease: "power2.in" },
      180
    );
    // Stays visible till 240

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-screen bg-[#000000] overflow-hidden relative flex items-center justify-center p-0 m-0"
      >
        {/* Anti-gravity subtle particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Video Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block relative z-10 opacity-40" /* Dimmed slightly for text contrast */
        />

        {/* Text Area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-white tracking-wide text-center px-6">
          <h1 ref={text1Ref} className="text-5xl md:text-8xl font-sans font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] mb-4 uppercase tracking-tighter">
            Ved Parmar
          </h1>
          <h2 ref={text2Ref} className="text-xl md:text-3xl font-sans font-medium text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] tracking-[0.3em] uppercase">
            Designer. Creator. Visual Storyteller.
          </h2>
        </div>
      </div >
    </>
  );
}
