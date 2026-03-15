import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { CONTACT_INFO } from "../utils/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay },
  }),
};

const contactItems = [
  {
    icon: <FaMapMarkerAlt className="text-indigo-400 text-lg mt-0.5" />,
    label: "Location",
    value: CONTACT_INFO.location,
    href: null,
  },
  {
    icon: <FaEnvelope className="text-indigo-400 text-lg mt-0.5" />,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: <FaGithub className="text-indigo-400 text-lg mt-0.5" />,
    label: "GitHub",
    value: "github.com/rajpakhurde",
    href: CONTACT_INFO.github,
  },
  {
    icon: <FaLinkedin className="text-indigo-400 text-lg mt-0.5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/raj-pakhurde",
    href: CONTACT_INFO.linkedin,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="bg-gray-950 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Contact{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          <p className="mt-5 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Feel free to reach out if you want to collaborate, discuss opportunities, or just say hello.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* Left: Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="flex-1 flex flex-col gap-6"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-1">{CONTACT_INFO.name}</h3>
              <p className="text-gray-400 text-sm">Full Stack Developer</p>
            </div>

            <div className="flex flex-col gap-5">
              {contactItems.map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-gray-300 text-sm hover:text-indigo-400 transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-300 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            className="flex-1"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:outline-none rounded-lg px-4 py-3 text-gray-200 text-sm placeholder-gray-600 transition-colors duration-200"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:outline-none rounded-lg px-4 py-3 text-gray-200 text-sm placeholder-gray-600 transition-colors duration-200"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Write your message..."
                  className="bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:outline-none rounded-lg px-4 py-3 text-gray-200 text-sm placeholder-gray-600 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-indigo-500/20"
              >
                Send Message
              </motion.button>

              {/* Success message */}
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-400 text-sm font-medium"
                >
                  ✅ Message sent successfully!
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
