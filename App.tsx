
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Scene } from './components/Scene';

// Fix: Add 'id' prop to AnimatedSection's props and pass it to the motion.section element.
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            id={id}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
};

const Navbar: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-brand-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="font-serif text-2xl font-bold text-white">AI Lawyer</a>
                <a href="#cta" className="px-4 py-2 bg-brand-gold text-brand-text-dark font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300">
                    Try AI Lawyer
                </a>
            </div>
        </header>
    );
};

const Hero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                 <Suspense fallback={<div className="w-full h-full bg-brand-background" />}>
                    <Scene />
                </Suspense>
            </div>
            <div className="relative z-10 p-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-5xl md:text-7xl font-bold mb-4"
                >
                    Meet Your Digital Lawyer
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto"
                >
                    AI-powered legal intelligence — available 24/7.
                </motion.p>
                <motion.a
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.6 }}
                     href="#cta"
                     className="mt-8 inline-block px-8 py-3 bg-brand-gold text-brand-text-dark font-bold rounded-lg text-lg hover:bg-yellow-300 transition-colors duration-300"
                >
                    Try AI Lawyer
                </motion.a>
            </div>
        </section>
    );
};

const About: React.FC = () => {
    return (
        <AnimatedSection className="py-20 bg-brand-background">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h2 className="font-serif text-4xl font-bold text-white mb-4">Justice Meets Intelligence</h2>
                    <p className="text-lg text-brand-text/80">
                        Our mission is to democratize access to legal services with AI precision. We provide instant, accurate, and confidential legal assistance, empowering you to navigate complex legal landscapes with confidence.
                    </p>
                </div>
                <div className="w-full h-64 bg-brand-cyan/10 rounded-lg border border-brand-cyan/20 flex items-center justify-center">
                    <p className="text-brand-cyan font-mono"> // AI CORE VISUALIZATION </p>
                </div>
            </div>
        </AnimatedSection>
    )
}

const features = [
    { icon: '⚡', title: 'Instant Legal Help', description: 'Get answers to your legal questions in seconds, anytime you need.' },
    { icon: '📄', title: 'Auto Contract Review', description: 'Upload documents and receive an automated analysis of clauses and risks.' },
    { icon: '🔒', title: 'Secure & Confidential', description: 'Your data is encrypted and protected with the highest security standards.' },
    { icon: '🧠', title: 'Smart Legal Reasoning', description: 'Powered by advanced AI trained on vast legal corpora for accurate insights.' },
];

const Features: React.FC = () => {
    return (
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="font-serif text-4xl font-bold text-center text-white mb-12">Why Choose AI Lawyer?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-brand-background/50 border border-brand-gold/20 p-6 rounded-lg text-center"
                            whileHover={{ scale: 1.05, borderColor: '#f0c24b' }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-brand-text/70">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="inline-block">
            <p className="font-mono overflow-hidden border-r-4 border-r-brand-gold whitespace-nowrap m-0 p-0 animate-typing">
                {text}
            </p>
        </div>
    );
};

const Demo: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    return(
        <AnimatedSection className="py-20 bg-brand-background/50" >
            <div ref={ref} className="container mx-auto px-6 text-center">
                <h2 className="font-serif text-4xl font-bold text-white mb-8">See it in Action</h2>
                <div className="max-w-2xl mx-auto bg-[#0d1117] border border-brand-gold/30 rounded-lg p-6 text-left">
                    <p className="font-mono text-gray-500 mb-4">&gt; User: What if a contract is broken?</p>
                    <div className="flex items-start space-x-2">
                        <span className="font-mono text-brand-cyan">&gt; AI Lawyer:</span>
                        {isInView && <TypingEffect text="According to the Indian Contract Act, you have the right to claim damages." />}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Founder: React.FC = () => {
    return (
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="font-serif text-4xl font-bold text-white mb-12">The Creator</h2>
                <div className="inline-block bg-brand-background/50 p-8 rounded-lg border border-brand-cyan/20">
                    <img src="https://i.pravatar.cc/150?u=yash" alt="Yash Waghmare" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-brand-cyan"/>
                    <h3 className="text-2xl font-bold text-white">Yash Waghmare</h3>
                    <p className="text-brand-cyan">Creator of AI Lawyer</p>
                </div>
            </div>
        </AnimatedSection>
    )
}

const CTA: React.FC = () => {
    return (
        <AnimatedSection id="cta" className="py-20 bg-brand-gold/10">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-serif text-4xl font-bold text-white mb-4">Start Your AI-Powered Legal Journey</h2>
                <p className="text-lg text-brand-text/80 max-w-2xl mx-auto mb-8">Ready to experience the future of legal tech? Get started now.</p>
                <motion.button
                    className="px-10 py-4 bg-brand-gold text-brand-text-dark font-bold rounded-lg text-xl animate-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get Started
                </motion.button>
            </div>
        </AnimatedSection>
    )
}

const Footer: React.FC = () => {
    return (
        <footer className="py-8 bg-brand-background border-t border-brand-gold/10">
            <div className="container mx-auto px-6 text-center text-brand-text/50">
                <p>&copy; 2025 AI Lawyer by Yash Waghmare.</p>
                <p className="text-sm mt-1">Not a substitute for professional legal advice.</p>
            </div>
        </footer>
    )
}

const App: React.FC = () => {
  return (
    <div className="bg-brand-background text-brand-text font-sans selection:bg-brand-gold/30">
        <Navbar />
        <main>
            <Hero />
            <About />
            <Features />
            <Demo />
            <Founder />
            <CTA />
        </main>
        <Footer />
    </div>
  );
};

export default App;
