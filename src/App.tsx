/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Camera, 
  ChevronRight, 
  Instagram, 
  MapPin, 
  Menu, 
  MessageCircle, 
  Phone, 
  Star, 
  User, 
  X, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useState, useEffect, FormEvent } from "react";

const PROCEDURES = [
  {
    id: 1,
    title: "Toxina Botulínica",
    description: "Suavize linhas de expressão com resultados naturais e harmônicos.",
    image: "https://picsum.photos/seed/botox/600/800",
    benefit: "Resultados em até 15 dias"
  },
  {
    id: 2,
    title: "Preenchimento Facial",
    description: "Restaure volumes e melhore contornos com ácido hialurônico premium.",
    image: "https://picsum.photos/seed/filler/600/800",
    benefit: "Harmonização personalizada"
  },
  {
    id: 3,
    title: "Limpeza de Pele Deep",
    description: "Remoção profunda de impurezas com tecnologia ultra-sônica.",
    image: "https://picsum.photos/seed/skincare/600/800",
    benefit: "Pele renovada e luminosa"
  },
  {
    id: 4,
    title: "Bioestimuladores",
    description: "Estimule o colágeno natural da sua pele para uma firmeza duradoura.",
    image: "https://picsum.photos/seed/collagen/600/800",
    benefit: "Efeito lifting gradual"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ana Silveira",
    text: "O atendimento na Lumina é impecável. Os resultados do meu preenchimento ficaram super naturais, exatamente como eu queria.",
    stars: 5
  },
  {
    id: 2,
    name: "Mariana Costa",
    text: "Melhor clínica que já frequentei. Profissionais extremamente qualificados e um ambiente que transmite muita paz.",
    stars: 5
  },
  {
    id: 3,
    name: "Beatriz Mello",
    text: "Faço minha limpeza de pele mensal aqui e não troco por nada. Minha pele mudou completamente depois que comecei o protocolo.",
    stars: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    service: "",
    date: "",
    time: ""
  });

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    const { name, service, date, time } = bookingForm;
    const message = `Olá! Gostaria de agendar uma avaliação na Lumina Clinique.%0A%0A*Dados do Agendamento:*%0A*Nome:* ${name}%0A*Serviço:* ${service}%0A*Data:* ${date}%0A*Horário:* ${time}`;
    const whatsappUrl = `https://wa.me/5587999060348?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setIsBookingOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white">
      {/* WhatsApp Fixed Button */}
      <motion.a
        href="https://wa.me/55000000000"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        id="whatsapp-fixed"
      >
        <MessageCircle size={24} fill="currentColor" />
      </motion.a>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <span className={`text-2xl font-serif tracking-tighter ${scrolled ? "text-brand-text" : "text-brand-text"}`}>
              Lumina<span className="font-light text-brand-gold">Clinique</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {["Sobre", "Procedimentos", "Diferenciais", "Contato"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm uppercase tracking-widest font-medium hover:text-brand-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              className="bg-brand-gold text-white px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-widest shadow-md hover:bg-brand-gold-dark transition-all"
            >
              Agendar Avaliação
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className="text-brand-text" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-brand-nude flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-center">
              {["Sobre", "Procedimentos", "Diferenciais", "Contato"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-serif"
                >
                  {item}
                </a>
              ))}
              <button 
                className="mt-8 bg-brand-gold text-white py-4 rounded-xl text-lg font-bold uppercase tracking-widest"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsBookingOpen(true);
                }}
              >
                Agendar Avaliação
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <motion.div 
            style={{ scale }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src="https://picsum.photos/seed/luxury-clinic/1920/1080" 
              alt="Clínica Lumina"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Redefinindo sua melhor versão
              </span>
              <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-[0.9] tracking-tighter">
                Realce sua <span className="italic">Beleza Natural</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-lg leading-relaxed">
                Resultados harmônicos, seguros e sofisticados. Uma experiência exclusiva focada na sua autoestima e bem-estar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-brand-gold text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                >
                  Agendar Avaliação <ChevronRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  className="border border-white/50 backdrop-blur-sm px-10 py-5 rounded-full text-lg font-semibold uppercase tracking-widest text-white transition-colors"
                >
                  Conheça a clínica
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </section>

        {/* Introduction / About */}
        <section id="sobre" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-beige rounded-full -z-10" />
              <img 
                src="https://picsum.photos/seed/doctor/800/1000" 
                alt="Nossa Especialista"
                className="w-full h-auto rounded-[40px] shadow-2xl grayscale-[0.3]"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-brand-gold p-8 rounded-3xl text-white shadow-xl max-w-[240px]"
              >
                <p className="font-serif text-2xl italic leading-tight">"A verdadeira beleza é aquela que revela sua essência."</p>
                <div className="h-px w-10 bg-white/30 my-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">Dra. Isabella Mendes</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Bem-vinda à Lumina</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Autoridade e Confiança em <span className="italic">Medicina Estética</span>
              </h2>
              <p className="text-brand-text-soft leading-relaxed mb-6">
                Fundada com o propósito de elevar os padrões da estética, a Lumina Clinique une o que há de mais moderno em tecnologia com um olhar artístico e delicado.
              </p>
              <p className="text-brand-text-soft leading-relaxed mb-10">
                Acreditamos que cada paciente é único. Nossos procedimentos são planejados minuciosamente para respeitar sua fisionomia, garantindo que você se sinta rejuvenescida sem perder sua identidade.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-serif text-brand-gold">10+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-text/60">Anos de Experiência</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-serif text-brand-gold">5k+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-text/60">Pacientes Satisfeitas</span>
                </div>
              </div>

              <motion.button 
                whileHover={{ gap: "20px" }}
                className="mt-12 flex items-center gap-3 text-brand-text font-bold uppercase tracking-widest text-sm group"
              >
                Conheça nossa história <ArrowRight size={18} className="text-brand-gold" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Procedures Grid */}
        <section id="procedimentos" className="py-24 bg-brand-beige">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
              >
                Tratamentos Premium
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-serif"
              >
                Nossas <span className="italic text-[#8C7A2E]">Especialidades</span>
              </motion.h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCEDURES.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative h-[500px] rounded-[32px] overflow-hidden bg-white shadow-lg"
                  id={`procedure-${p.id}`}
                >
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-text/90 via-brand-text/20 to-transparent" />
                  
                  <div className="absolute bottom-0 p-8 w-full">
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-2 block bg-white/10 w-fit px-2 py-1 rounded backdrop-blur-md">
                      {p.benefit}
                    </span>
                    <h3 className="text-white text-2xl font-serif mb-3 leading-tight uppercase tracking-tight">{p.title}</h3>
                    <p className="text-white/70 text-sm font-light mb-6 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {p.description}
                    </p>
                    <button 
                      onClick={() => {
                        setBookingForm(prev => ({ ...prev, service: p.title }));
                        setIsBookingOpen(true);
                      }}
                      className="text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 group-hover:border-brand-gold transition-colors"
                    >
                      Agendar agora <ChevronRight size={14} className="text-brand-gold" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <button className="bg-transparent border border-brand-gold text-brand-gold px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all">
                Ver todos os procedimentos
              </button>
            </div>
          </div>
        </section>

        {/* Differentials / Features */}
        <section id="diferenciais" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 bg-brand-nude rounded-[40px]"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-gold shadow-sm mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-tighter">Segurança Máxima</h3>
                <p className="text-brand-text-soft text-sm leading-relaxed">
                  Protocolos rigorosos e os melhores produtos do mercado mundial para sua total tranquilidade.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center text-center p-8 bg-brand-nude rounded-[40px]"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-gold shadow-sm mb-6">
                  <User size={32} />
                </div>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-tighter">Plano Individualizado</h3>
                <p className="text-brand-text-soft text-sm leading-relaxed">
                  Sem "receitas prontas". Estudamos seu rosto para propor o que realmente faz sentido para você.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center text-center p-8 bg-brand-nude rounded-[40px]"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-gold shadow-sm mb-6">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-tighter">Pós-venda VIP</h3>
                <p className="text-brand-text-soft text-sm leading-relaxed">
                  Acompanhamento próximo após cada procedimento para garantir que sua recuperação seja perfeita.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="depoimentos" className="py-24 bg-brand-text text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Experiências Reais</span>
                <h2 className="text-4xl md:text-6xl font-serif italic">
                  O que nossas clientes dizem
                </h2>
              </div>
              <div className="flex items-center gap-2 text-brand-gold">
                <Star fill="currentColor" size={24} />
                <span className="text-3xl font-serif">4.9/5</span>
                <span className="text-white/60 text-sm uppercase tracking-widest font-medium ml-2">no Google Reviews</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-colors"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={16} className="text-brand-gold" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-8 italic text-white/80">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest">{t.name}</h4>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Paciente Lumina</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-brand-nude relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-beige opacity-50 -z-10 skew-x-[-20deg] translate-x-1/2" />
          
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[60px] p-12 md:p-24 shadow-2xl border border-brand-gold/10"
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                Dê o primeiro passo para sua <span className="italic text-brand-gold italic">Transformação</span>
              </h2>
              <p className="text-xl text-brand-text-soft mb-12 max-w-2xl mx-auto leading-relaxed">
                Agenda aberta para novas avaliações. Garanta seu horário e comece sua jornada de beleza hoje mesmo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-brand-gold text-white px-12 py-6 rounded-full text-lg font-bold uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle size={22} fill="currentColor" /> Falar no WhatsApp
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-text text-white px-12 py-6 rounded-full text-lg font-bold uppercase tracking-[0.2em] shadow-xl"
                >
                  Ver Horários
                </motion.button>
              </div>
              <p className="mt-8 text-brand-text/40 text-xs font-bold uppercase tracking-widest">Atendimento exclusivo com hora marcada</p>
            </motion.div>
          </div>
        </section>

        {/* Location / Contact */}
        <section id="contato" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            <div>
              <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Onde estamos</span>
              <h2 className="text-4xl font-serif mb-10 leading-tight uppercase tracking-tighter">Venha nos <span className="italic">Visitar</span></h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-gold mt-1">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Endereço</h4>
                    <p className="text-brand-text-soft">Av. Magalhães de Castro, 4800 - Tower III</p>
                    <p className="text-brand-text-soft">Cidade Jardim, São Paulo - SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-gold mt-1">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Horários</h4>
                    <p className="text-brand-text-soft">Segunda a Sexta: 08h às 20h</p>
                    <p className="text-brand-text-soft">Sábado: 09h às 14h</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-gold mt-1">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Telefone</h4>
                    <p className="text-brand-text-soft">(11) 99999-0000</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-brand-beige flex items-center justify-center text-brand-text hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-brand-beige flex items-center justify-center text-brand-text hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all">
                  <Camera size={20} />
                </a>
              </div>
            </div>

            <div className="h-[500px] bg-brand-beige rounded-[40px] overflow-hidden shadow-inner grayscale relative group">
              <img 
                src="https://picsum.photos/seed/map-static/1000/1000" 
                alt="Mapa"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-gold/10 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-brand-gold drop-shadow-xl"
                >
                  <MapPin size={48} fill="currentColor" />
                </motion.div>
              </div>
              <a 
                href="#"
                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md py-4 rounded-2xl text-center text-brand-gold font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-brand-nude border-t border-brand-beige">
        {/* Booking Modal */}
        <AnimatePresence>
          {isBookingOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-text/60 backdrop-blur-sm"
              onClick={() => setIsBookingOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-xl rounded-[40px] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-serif">Agendar <span className="italic text-brand-gold">Avaliação</span></h2>
                  <button onClick={() => setIsBookingOpen(false)} className="bg-brand-beige p-2 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-text/40 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Maria Oliveira"
                      className="w-full bg-brand-nude border-brand-beige rounded-2xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-shadow"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-text/40 mb-2">Procedimento de Interesse</label>
                    <select 
                      required
                      className="w-full bg-brand-nude border-brand-beige rounded-2xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-shadow appearance-none"
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                    >
                      <option value="">Selecione um serviço</option>
                      {PROCEDURES.map(p => (
                        <option key={p.id} value={p.title}>{p.title}</option>
                      ))}
                      <option value="Outro">Outro / Avaliação Geral</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-text/40 mb-2">Data Desejada</label>
                      <input 
                        type="date" 
                        required
                        className="w-full bg-brand-nude border-brand-beige rounded-2xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-shadow"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-text/40 mb-2">Horário</label>
                      <input 
                        type="time" 
                        required
                        className="w-full bg-brand-nude border-brand-beige rounded-2xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-shadow"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-gold text-white py-5 rounded-2xl text-lg font-bold uppercase tracking-widest shadow-xl hover:bg-brand-gold-dark transition-all mt-4"
                  >
                    Confirmar agendamento
                  </button>
                  <p className="text-center text-[10px] text-brand-text/40 uppercase tracking-widest">
                    Você será redirecionada para o nosso WhatsApp para finalizar.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white scale-75">
              <Sparkles size={16} />
            </div>
            <span className="text-xl font-serif tracking-tighter">
              Lumina<span className="font-light text-brand-gold">Clinique</span>
            </span>
          </div>
          
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-text/60">
            <a href="#" className="hover:text-brand-gold">Privacidade</a>
            <a href="#" className="hover:text-brand-gold">Termos</a>
            <a href="#" className="hover:text-brand-gold">Carreiras</a>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-widest text-brand-text/40">
            &copy; 2026 Lumina Clinique. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

