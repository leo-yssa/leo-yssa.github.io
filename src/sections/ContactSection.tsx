import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, FileText, ArrowRight } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { personalInfo } from '../data/portfolio';
import type { Locale } from '../data/portfolio';

interface ContactSectionProps { locale: Locale }

export default function ContactSection({ locale }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      icon: <GithubIcon className="w-5 h-5" />,
      label: 'GitHub',
      sub: '@leo-yssa',
      href: personalInfo.github,
      color: '#94A3B8',
    },
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      label: 'LinkedIn',
      sub: 'youngsoo-sa',
      href: personalInfo.linkedin,
      color: '#0A66C2',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: locale === 'en' ? 'Resume' : '이력서',
      sub: locale === 'en' ? 'Download PDF' : 'PDF 다운로드',
      href: '/resume.html',
      color: '#F59E0B',
    },
  ];

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#00D2A0]/5 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-[#00D2A0] tracking-widest uppercase mb-3 block">
            // get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-50 mb-4">
            {locale === 'en' ? "Let's Build Together" : '함께 만들어요'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {locale === 'en'
              ? "Open to senior engineering roles, tech consulting, and Web3/AI architecture partnerships. Let's connect."
              : '시니어 엔지니어링 포지션, 기술 컨설팅, Web3/AI 아키텍처 파트너십에 열려 있습니다.'}
          </p>
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-10"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D2A0] to-[#00b389] text-[#0B0F17] font-bold text-sm hover:shadow-lg hover:shadow-[#00D2A0]/25 hover:scale-[1.02] transition-all"
          >
            <Mail className="w-4 h-4" />
            {personalInfo.email}
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 px-4 py-3 rounded-xl glass border border-slate-700 text-slate-400 hover:text-slate-100 hover:border-slate-500 text-sm transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-[#00D2A0]" /> : <Copy className="w-4 h-4" />}
            {copied
              ? (locale === 'en' ? 'Copied!' : '복사됨!')
              : (locale === 'en' ? 'Copy email' : '이메일 복사')}
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-4 glass rounded-xl border border-slate-700/50 hover:border-slate-600/70 transition-all hover:-translate-y-0.5"
            >
              <div
                className="p-2.5 rounded-lg transition-all"
                style={{ backgroundColor: link.color + '15', color: link.color }}
              >
                {link.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {link.label}
                </div>
                <div className="text-xs text-slate-500">{link.sub}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-slate-400 ml-auto group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">
              © 2025 {personalInfo.brandName}. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-700 font-mono">
            <span className="text-[#00D2A0]">{'<'}</span>
            <span>Built with React + Tailwind + Framer Motion</span>
            <span className="text-[#00D2A0]">{'/>'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
