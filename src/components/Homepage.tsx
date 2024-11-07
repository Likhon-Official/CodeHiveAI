import { Hexagon, Sparkles, Zap, Heart } from 'lucide-react';

interface HomepageProps {
  onStart: () => void;
}

export default function Homepage({ onStart }: HomepageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full animate-fade-in">
          <div className="glass-panel p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6 group">
                <div className="relative">
                  <Hexagon className="w-12 h-12 text-accent-primary animate-pulse" />
                  <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-full" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-primary via-purple-500 to-accent-secondary 
                             text-transparent bg-clip-text bg-300% animate-gradient">
                  CodeHive AI
                </h1>
              </div>
              
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                Experience the future of web development with AI-powered coding.
                Write, preview, and create amazing web experiences instantly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: Zap,
                    title: 'Real-time Preview',
                    description: 'See your changes instantly as you type'
                  },
                  {
                    icon: Hexagon,
                    title: 'AI Assistance',
                    description: 'Smart suggestions and code optimization'
                  },
                  {
                    icon: Sparkles,
                    title: 'Beautiful UI',
                    description: 'Clean and intuitive interface for coding'
                  }
                ].map(({ icon: Icon, title, description }) => (
                  <div key={title} className="glass-panel p-4 text-center hover:border-accent-primary/30 transition-colors group">
                    <Icon className="w-6 h-6 text-accent-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-medium text-white mb-1">{title}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={onStart}
                className="btn-primary text-lg px-8 py-3 glow group"
              >
                <span className="relative z-10">Start Coding</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </button>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-40 h-40 bg-accent-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <footer className="glass-panel m-2 px-6 py-3 flex items-center justify-center gap-2 group">
        <span className="text-sm">
          <span className="text-gray-400">Built with</span>
          <Heart className="w-4 h-4 text-red-500 inline mx-1 group-hover:animate-pulse" />
          <span className="text-gray-400">by</span>
          <a 
            href="https://axtillar.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-1 font-medium bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text hover:opacity-80 transition-opacity"
          >
            Axtillar
          </a>
        </span>
      </footer>
    </div>
  );
}