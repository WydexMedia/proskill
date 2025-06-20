'use client';
import Footer from "@/app/footer/page";
import React from "react";

// Example video data (replace with your own video filenames and descriptions)
const testimonials = [
  {
    src: "/video/testimonial1.mp4",
    description: "Proskill made my resin art so much easier! Highly recommended for all crafters.",
    author: "Zenha, Kannur"
  },
  {
    src: "/video/testimonial2.mp4",
    description: "Absolutely love Proskill! It’s a game-changer for anyone serious about resin art.",
    author: "Nourin, Malappuram"
  },
  {
    src: "/video/testimonial3.mp4",
    description: "Resin art used to be messy and frustrating—Proskill made it smooth, simple, and fun!",
    author: "Haleema, kozhikode"
  }
];

export default function TestimonialPage() {
  return (
    <div>
    <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full relative">
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 bg-white">
        <div
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.4,
            backgroundImage: "url('/doodle.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '250px 250px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
      </div>
      <h1 className="text-4xl  text-black mb-8 text-center relative z-10 heading-custom"> Success Stories </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-4 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-black">
              <video
                src={t.src}
                controls
                autoPlay
                muted
                loop
                className="w-full h-full object-cover rounded-xl border border-gray-300"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
            <p className="text-gray-800 text-base font-medium mb-2 text-center">{t.description}</p>
            <div className="text-gray-500 text-sm text-right w-full">{t.author}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .aspect-video {
          aspect-ratio: 16/9;
        }
        .heading-custom {
          font-size: 32px;
          font-weight: 600;
        }
      `}</style>
    </div>
    <Footer/>
    </div>
  );
}
