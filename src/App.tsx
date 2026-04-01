/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  Trophy, 
  Music, 
  Camera, 
  Mic2, 
  Palette, 
  Dumbbell, 
  FlaskConical, 
  Instagram, 
  Phone,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { 
  FEST_NAME, 
  COLLEGE_NAME, 
  TAGLINE, 
  ABOUT_TEXT, 
  EVENT_CATEGORIES, 
  TEAM_HEADS, 
  MONITORING_TEAM, 
  JR_HEADS, 
  CORE_TEAM,
  GALLERY_IMAGES
} from "./constants";

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, radius: 150 };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-40"
    />
  );
};

const RegisterModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-neutral-50 text-neutral-950 p-12 border-4 border-neutral-950 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-neutral-200 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-950 text-neutral-50 rounded-full flex items-center justify-center mx-auto mb-8 overflow-hidden border border-neutral-800">
                <img 
                  src="https://i.ibb.co/39B6cVSy/1775060078031.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-4xl font-display uppercase mb-6 leading-tight">Thank You for visiting to us</h2>
              <p className="text-lg font-medium opacity-80 mb-8">
                Please visit the control room for registering yourself.
              </p>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-neutral-950 text-neutral-50 uppercase font-bold tracking-widest hover:bg-neutral-800 transition-colors"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Team", href: "#team" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.a 
          href="#home" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 font-display text-2xl tracking-tighter neon-glow"
        >
          <img 
            src="https://i.ibb.co/39B6cVSy/1775060078031.jpg" 
            alt="Logo" 
            className="w-10 h-10 object-cover rounded-full border border-neutral-800"
            referrerPolicy="no-referrer"
          />
          {FEST_NAME}
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm uppercase tracking-widest font-medium hover:text-neutral-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-50 transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.button 
            onClick={onRegisterClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 bg-neutral-50 text-neutral-950 text-xs uppercase font-bold tracking-widest hover:bg-neutral-200 transition-colors"
          >
            Register Now
          </motion.button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-neutral-950 border-b border-neutral-800 p-6 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  // Small delay to ensure navigation starts before menu closes
                  setTimeout(() => setIsOpen(false), 100);
                }}
                className="text-lg uppercase tracking-widest font-medium py-2 block w-full hover:text-neutral-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                onRegisterClick();
              }}
              className="w-full py-4 bg-neutral-50 text-neutral-950 text-center uppercase font-bold tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Register Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      <Particles />
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-50 rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <img 
            src="https://i.ibb.co/39B6cVSy/1775060078031.jpg" 
            alt="Panache Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-neutral-800 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm uppercase tracking-[0.5em] mb-6 neon-cyan"
        >
          {COLLEGE_NAME} Presents
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-[12rem] font-display leading-[0.8] tracking-tighter mb-8"
        >
          {FEST_NAME.split(' ')[0]}<br />
          <span className="text-outline-white text-transparent">{FEST_NAME.split(' ')[1]}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-3xl font-light italic mb-12 neon-cyan"
        >
          {TAGLINE}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
              <Calendar size={18} />
              <span>April 2026</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-neutral-500 rounded-full" />
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
              <MapPin size={18} />
              <span>SRGI Jhansi</span>
            </div>
          </div>

          <a 
            href="#events"
            className="px-12 py-5 bg-neutral-50 text-neutral-950 uppercase font-bold tracking-[0.2em] hover:bg-neutral-200 transition-all hover:scale-105 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
          >
            Register Now
          </a>
        </motion.div>
      </div>

      {/* <div className="absolute bottom-10 left-0 w-full overflow-hidden whitespace-nowrap border-y border-neutral-800 py-4">
        <div className="marquee-track flex gap-12">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl font-display uppercase tracking-tighter neon-multicolor">
              {FEST_NAME} • {COLLEGE_NAME} • {TAGLINE} • 
            </span>
          ))}
        </div>
      </div> */}
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 bg-neutral-50 text-neutral-950">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-display uppercase leading-none mb-12">
            The <br /> Essence
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl leading-relaxed font-light mb-8">
            {ABOUT_TEXT}
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h4 className="text-4xl font-display mb-2">20+</h4>
              <p className="text-xs uppercase tracking-widest opacity-60">Events</p>
            </div>
            <div>
              <h4 className="text-4xl font-display mb-2">500+</h4>
              <p className="text-xs uppercase tracking-widest opacity-60">Participants</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface EventCardProps {
  name: string;
  price: string;
  image: string;
  index: number;
  onRegisterClick: () => void;
  key?: string | number;
}

const EventCard = ({ name, price, image, index, onRegisterClick }: EventCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden border border-neutral-800 bg-neutral-900"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button 
            onClick={onRegisterClick}
            className="px-6 py-3 bg-neutral-50 text-neutral-950 text-xs uppercase font-bold tracking-widest"
          >
            Register Now
          </button>
        </div>
      </div>
      
      <div className="p-6 text-center">
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-xl font-display uppercase tracking-tight mb-2">
            {name}
          </h3>
          <span className="text-[10px] font-mono neon-cyan uppercase tracking-widest">{price}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
          View Details <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
};

const Events = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  const [activeTab, setActiveTab] = useState(EVENT_CATEGORIES[0].id);

  return (
    <section id="events" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.5em] neon-cyan mb-4">Competitions</p>
            <h2 className="text-6xl md:text-8xl font-display uppercase leading-none">
              The Arena
            </h2>
          </motion.div>
          
          <div className="flex flex-wrap gap-4">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-8 py-3 text-xs uppercase font-bold tracking-widest transition-all ${
                  activeTab === cat.id 
                  ? "bg-neutral-50 text-neutral-950" 
                  : "border border-neutral-800 text-neutral-400 hover:border-neutral-500"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {EVENT_CATEGORIES.find(c => c.id === activeTab)?.events.map((event, i) => (
              <EventCard 
                key={event.name} 
                name={event.name} 
                price={event.price} 
                image={event.image} 
                index={i} 
                onRegisterClick={onRegisterClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <section id="gallery" className="py-32 px-6 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] neon-cyan mb-4">Visuals</p>
            <h2 className="text-6xl md:text-8xl font-display uppercase leading-none">Gallery</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="p-4 border border-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-4 border border-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden border border-neutral-800">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={GALLERY_IMAGES[currentIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          <div className="absolute bottom-8 left-8 flex gap-2">
            {GALLERY_IMAGES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 ${i === currentIndex ? "w-12 bg-neutral-50" : "w-4 bg-neutral-700"}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section id="team" className="py-32 px-6 bg-neutral-50 text-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display uppercase mb-4"
          >
            Our Team
          </motion.h2>
          <p className="text-xs uppercase tracking-[0.5em] opacity-60">THE VISIONARIES BEHIND PANACHE</p>
        </div>

        <div className="mb-32 text-center">
          <h3 className="text-2xl font-display uppercase mb-12 border-b-2 border-neutral-950 pb-4 inline-block">Our Heads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {TEAM_HEADS.map((head, i) => (
              <motion.div 
                key={head.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-4 border border-neutral-800 hover:border-neutral-50 transition-colors duration-300"
              >
                <div className="aspect-square overflow-hidden mb-6 border border-neutral-800">
                  <img src={head.image} alt={head.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold text-lg mb-1">{head.name}</h4>
                <p className="text-xs uppercase tracking-widest opacity-60">{head.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-32 text-center">
          <h3 className="text-2xl font-display uppercase mb-12 border-b-2 border-neutral-950 pb-4 inline-block">Monitoring Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {MONITORING_TEAM.map((member, i) => (
              <motion.div 
                key={member.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group p-4 border border-neutral-800 hover:border-neutral-50 transition-colors duration-300"
              >
                <div className="aspect-square overflow-hidden mb-6 border border-neutral-800">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-xs uppercase tracking-widest opacity-60">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          <div className="text-center md:text-left">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-display uppercase border-b-2 border-neutral-950 pb-4 inline-block">Junior Heads</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              {JR_HEADS.map((member, i) => (
                <motion.div 
                  key={member.name} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group p-4 border border-neutral-800 hover:border-neutral-50 transition-colors duration-300"
                >
                  <div className="aspect-square overflow-hidden mb-6 border border-neutral-800">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{member.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-display uppercase border-b-2 border-neutral-950 pb-4 inline-block">Core Team</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              {CORE_TEAM.map((member, i) => (
                <motion.div 
                  key={member.name} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group p-4 border border-neutral-800 hover:border-neutral-50 transition-colors duration-300"
                >
                  <div className="aspect-square overflow-hidden mb-6 border border-neutral-800">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{member.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src="https://i.ibb.co/39B6cVSy/1775060078031.jpg" 
                alt="Logo" 
                className="w-12 h-12 object-cover rounded-full border border-neutral-800"
                referrerPolicy="no-referrer"
              />
              <h2 className="text-4xl font-display uppercase">{FEST_NAME}</h2>
            </div>
            <p className="text-neutral-400 max-w-md mb-8">
              Celebrating the vibrant spirit, talent, and creativity of students at the College of Pharmacy, SRGI Jhansi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 border border-neutral-800 hover:bg-neutral-50 hover:text-neutral-950 transition-all">
                <Instagram size={20} />
              </a>
              <a href="tel:9131580398" className="p-3 border border-neutral-800 hover:bg-neutral-50 hover:text-neutral-950 transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm text-neutral-400">
              <li><a href="#home" className="hover:text-neutral-50">Home</a></li>
              <li><a href="#about" className="hover:text-neutral-50">About</a></li>
              <li><a href="#events" className="hover:text-neutral-50">Events</a></li>
              <li><a href="#gallery" className="hover:text-neutral-50">Gallery</a></li>
              <li><a href="#team" className="hover:text-neutral-50">Our Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-neutral-400">
              <li>SRGI [COP] — Jhansi</li>
              <li>9131580398</li>
              <li className="text-xs mt-4">
                Developer: <br />
                <span className="text-neutral-50 font-bold">Himanshu Kherajani</span><br />
                (B Pharm, Third Year)
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-neutral-600">
          <p>© 2026 SRGI [COP] — Jhansi. All Rights Reserved.</p>
          <p>Made with Passion for Panache</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-neutral-950 text-neutral-50 selection:bg-neutral-50 selection:text-neutral-950">
      <div className="noise" />
      
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />
      <main>
        <Hero onRegisterClick={() => setIsModalOpen(true)} />
        <About />
        <Events onRegisterClick={() => setIsModalOpen(true)} />
        <Gallery />
        <TeamSection />
      </main>
      <Footer />

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Custom Styles for Text Outline */}
      <style>{`
        .text-outline-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 768px) {
          .text-outline-white {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
          }
        }
        .neon-cyan {
          color: #00f3ff;
          text-shadow: 0 0 5px #00f3ff, 0 0 10px #00f3ff;
        }
        @keyframes neon-multicolor-glow {
          0% { color: #00f3ff; text-shadow: 0 0 10px #00f3ff; }
          25% { color: #ff00ff; text-shadow: 0 0 10px #ff00ff; }
          50% { color: #ffff00; text-shadow: 0 0 10px #ffff00; }
          75% { color: #00ff00; text-shadow: 0 0 10px #00ff00; }
          100% { color: #00f3ff; text-shadow: 0 0 10px #00f3ff; }
        }
        .neon-multicolor {
          animation: neon-multicolor-glow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
