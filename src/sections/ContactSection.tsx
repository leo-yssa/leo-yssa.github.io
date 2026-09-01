import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, FileText, ArrowRight, BookOpen } from 'lucide-react';
import { FaGithub as GithubIcon } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';
import type { Locale } from '../data/portfolio';

interface ContactSectionProps {
  locale: Locale;
}

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
      icon: <BookOpen className="w-5 h-5" />,
      label: locale === 'en' ? 'Tech Blog' : '기술 블로그',
      sub: 'yssa.tistory.com',
      href: personalInfo.blog,
      color: '#00D2A0',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: locale === 'en' ? 'Resume' : '이력서',
      sub: locale === 'en' ? 'Download / View' : '이력서 보기',
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
            {locale === 'en' ? "Let's Build Together" : '함께 비즈니스를 혁신할 기회를 기다립니다'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {locale === 'en'
              ? 'Open to Team Lead, Senior Full-stack / Backend engineering roles, and AI/Web3 architecture opportunities.'
              : '개발팀 팀장, 시니어 풀스택/백엔드 엔지니어링 포지션 및 생성형 AI·Web3 아키텍처 협업에 언제든 열려 있습니다.'}
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
              ? locale === 'en'
                ? 'Copied!'
                : '복사됨!'
              : locale === 'en'
              ? 'Copy email'
              : '이메일 복사'}
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
            <span className="text-xs text-slate-500">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600 font-mono">
            <span className="text-[#00D2A0]">{'<'}</span>
            <span>Built with React + Vite + Tailwind + Framer Motion</span>
            <span className="text-[#00D2A0]">{'/>'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
