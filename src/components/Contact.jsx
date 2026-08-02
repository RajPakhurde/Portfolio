import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { CONTACT_INFO } from "../utils/constants";
import SpotlightCard from "./SpotlightCard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay,
      ease: [0.16, 1, 0.3, 1] 
    },
  }),
};

const contactItems = [
  {
    icon: <FaMapMarkerAlt className="text-white dark:text-accent text-lg mt-0.5" />,
    label: "Location",
    value: CONTACT_INFO.location,
    href: null,
  },
  {
    icon: <FaEnvelope className="text-white dark:text-accent text-lg mt-0.5" />,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: <FaGithub className="text-white dark:text-accent text-lg mt-0.5" />,
    label: "GitHub",
    value: "github.com/rajpakhurde",
    href: CONTACT_INFO.github,
  },
  {
    icon: <FaLinkedin className="text-white dark:text-accent text-lg mt-0.5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/raj-pakhurde",
    href: CONTACT_INFO.linkedin,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ from_name: "", from_email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const formRef = useRef();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_4utq8p9",
        "template_2651nhi",
        formRef.current,
        "38kyCyDDFkmioKtMI"
      )
      .then(() => {
        setStatus("success");
        setForm({ from_name: "", from_email: "", message: "" });
        setTimeout(() => setStatus(null), 4000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(null), 4000);
      });
  };

  return (
    <section 
      id="contact" 
      className="py-32 relative z-10 bg-[#0F172A] text-white dark:bg-transparent dark:text-foreground transition-colors duration-300 overflow-hidden rounded-3xl my-10"
    >
      {/* Dot Pattern Texture for Light Mode Inverted slate section */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.05] dark:hidden pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="flex flex-col items-center mb-20"
        >
          {/* Inverted Badge Label */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 dark:border-accent/30 bg-white/5 dark:bg-accent/5 px-4 py-1.5 mb-4">
            <span className="h-2 w-2 rounded-full bg-white dark:bg-accent animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white dark:text-accent font-semibold">
              Contact
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-semibold tracking-tight text-white dark:text-foreground">
            Contact{" "}
            <span className="bg-gradient-to-r from-white via-white/80 to-white dark:from-accent dark:via-accent-bright dark:to-accent bg-clip-text text-transparent animate-shimmer">
              Me
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-white/25 dark:via-accent/50 to-transparent" />
          <p className="mt-4 text-slate-300 dark:text-foreground-muted text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed text-center">
            Feel free to reach out if you want to collaborate, discuss opportunities, or just say hello.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-10 items-stretch">

          {/* Left: Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            className="flex-1"
          >
            <SpotlightCard className="bg-slate-900/40 dark:bg-bg-elevated border-white/10 dark:border-border-default hover:border-white/20 dark:hover:border-border-hover p-8 h-full flex flex-col justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-white dark:text-foreground font-semibold text-2xl tracking-tight">{CONTACT_INFO.name}</h3>
                <p className="text-slate-300 dark:text-foreground-muted text-sm font-mono tracking-wide uppercase text-white/70 dark:text-accent/80 font-medium">Full Stack Developer</p>
              </div>

              <div className="flex flex-col gap-6">
                {contactItems.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/[0.04] border border-white/10 dark:border-border-default flex items-center justify-center flex-shrink-0 shadow-inner-highlight">
                      {icon}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-slate-400 dark:text-foreground-subtle text-[10px] font-mono uppercase tracking-wider font-semibold">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="text-white dark:text-foreground hover:text-white dark:hover:text-accent font-sans text-sm font-medium transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-white dark:text-foreground text-sm font-sans font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-xs text-slate-400 dark:text-foreground-subtle/50 font-mono">
                Currently looking for new opportunities.
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2}
            className="flex-1"
          >
            <SpotlightCard className="bg-slate-900/40 dark:bg-bg-elevated border-white/10 dark:border-border-default hover:border-white/20 dark:hover:border-border-hover p-8 h-full">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 h-full justify-between"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 dark:text-foreground-muted text-[10px] font-mono uppercase tracking-wider font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-slate-950/60 dark:bg-[#0F0F12] border border-white/10 dark:border-border-default focus:border-white dark:focus:border-accent focus:ring-1 focus:ring-white/20 dark:focus:ring-accent/30 focus:outline-none rounded-lg px-4 py-3 text-white dark:text-foreground text-sm placeholder-slate-500 dark:placeholder-foreground-subtle/25 transition-all duration-200 shadow-inner-highlight"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 dark:text-foreground-muted text-[10px] font-mono uppercase tracking-wider font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={form.from_email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="bg-slate-950/60 dark:bg-[#0F0F12] border border-white/10 dark:border-border-default focus:border-white dark:focus:border-accent focus:ring-1 focus:ring-white/20 dark:focus:ring-accent/30 focus:outline-none rounded-lg px-4 py-3 text-white dark:text-foreground text-sm placeholder-slate-500 dark:placeholder-foreground-subtle/25 transition-all duration-200 shadow-inner-highlight"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 dark:text-foreground-muted text-[10px] font-mono uppercase tracking-wider font-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your message..."
                    className="bg-slate-950/60 dark:bg-[#0F0F12] border border-white/10 dark:border-border-default focus:border-white dark:focus:border-accent focus:ring-1 focus:ring-white/20 dark:focus:ring-accent/30 focus:outline-none rounded-lg px-4 py-3 text-white dark:text-foreground text-sm placeholder-slate-500 dark:placeholder-foreground-subtle/25 transition-all duration-200 resize-none shadow-inner-highlight"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2 space-y-4">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden w-full py-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 dark:bg-accent dark:hover:bg-accent-bright dark:text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                  >
                    <span className="relative z-10">
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </motion.button>

                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-emerald-400 text-xs font-semibold font-mono"
                    >
                      ✓ Message sent successfully!
                    </motion.p>
                  )}

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-rose-400 text-xs font-semibold font-mono"
                    >
                      ✗ Something went wrong. Please try again.
                    </motion.p>
                  )}
                </div>
              </form>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
