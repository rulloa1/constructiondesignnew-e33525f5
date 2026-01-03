import { motion } from 'framer-motion'
import { projects } from './data/projects'
import { ProjectCard } from './components/ProjectCard'

function App() {
    return (
        <main className="min-h-screen bg-concrete-50 text-concrete-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference invert">
                <div className="font-bold text-xl uppercase tracking-[0.2em]">Aethereal</div>
                <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.3em] font-medium">
                    <a href="#" className="hover:opacity-50 transition-opacity">Work</a>
                    <a href="#" className="hover:opacity-50 transition-opacity">Studio</a>
                    <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
                </div>
                <button className="md:hidden uppercase text-xs tracking-widest font-bold">Menu</button>
            </nav>

            {/* Hero Section */}
            <section className="h-screen flex flex-col justify-end p-8 md:p-20 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="text-sm uppercase tracking-[0.4em] text-concrete-400 font-medium">
                        Architectural Studio / 2025
                    </span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[14vw] font-bold leading-[0.85] tracking-tighter uppercase"
                    >
                        Visionary<br />Design
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <p className="max-w-md text-lg md:text-xl text-concrete-600 leading-relaxed font-light">
                        Crafting bold brutalist architecture and minimalist living environments that redefine the essence of modern space.
                    </p>
                    <div className="flex flex-col items-start md:items-end gap-2 text-xs uppercase tracking-widest font-bold">
                        <div className="w-12 h-px bg-concrete-900 mb-2" />
                        <span>Scroll to explore</span>
                    </div>
                </motion.div>
            </section>

            {/* Sticky Project Cards Section */}
            <section className="px-8 md:px-20 py-24 space-y-0">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </section>

            {/* Footer / Contact */}
            <footer className="h-screen flex flex-col items-center justify-center bg-concrete-900 text-concrete-50 p-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-xs uppercase tracking-[0.5em] opacity-40 mb-8 block">Project Inquiry</span>
                    <h2 className="text-[12vw] font-bold uppercase tracking-tighter leading-none mb-12">
                        Let's<br />Talk
                    </h2>
                    <a
                        href="mailto:hello@aethereal.build"
                        className="text-2xl md:text-4xl font-light border-b border-concrete-50/20 pb-4 hover:border-concrete-50 transition-colors"
                    >
                        hello@aethereal.build
                    </a>
                </motion.div>

                <div className="absolute bottom-10 left-0 w-full px-8 md:px-20 flex justify-between items-end text-[10px] uppercase tracking-[0.3em] opacity-40">
                    <div>© 2025 Aethereal Studio</div>
                    <div className="flex gap-8">
                        <a href="#">Instagram</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">Behance</a>
                    </div>
                </div>
            </footer>
        </main>
    )
}

export default App
