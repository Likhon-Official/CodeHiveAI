import { Hexagon, Sparkles, Zap, Heart } from 'lucide-react';

interface HomepageProps {
  onStart: () => void;
}

export default function Homepage({ onStart }: HomepageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-3">
        <div className="w-full max-w-lg animate-fade-in">
          <div className="glass-panel p-4 sm:p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 group">
                <div className="relative">
                  <Hexagon className="w-8 h-8 sm:w-12 sm:h-12 text-accent-primary animate-pulse" />
                  <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-full" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-accent-primary via-purple-500 to-accent-secondary 
                             text-transparent bg-clip-text bg-300% animate-gradient">
                  CodeHive AI
                </h1>
              </div>
              
              <p className="text-gray-300 text-sm sm:text-lg mb-4 sm:mb-8 max-w-sm mx-auto">
                Create stunning web experiences instantly with our real-time editor.
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-8">
                {[
                  {
                    icon: Zap,
                    title: 'Real-time Preview',
                    description: 'See changes instantly'
                  },
                  {
                    icon: Sparkles,
                    title: 'Beautiful UI',
                    description: 'Clean, modern interface'
                  }
                ].map(({ icon: Icon, title, description }) => (
                  <div key={title} className="glass-panel p-2 sm:p-4 text-center hover:border-accent-primary/30 transition-colors group">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-accent-primary mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-medium text-white text-xs sm:text-base mb-0.5">{title}</h3>
                    <p className="text-[10px] sm:text-sm text-gray-400">{description}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={onStart}
                className="btn-primary text-sm sm:text-lg px-4 sm:px-8 py-2 sm:py-3 glow group w-full sm:w-auto"
              >
                <span className="relative z-10">Start Coding</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </button>
            </div>

            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-accent-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <footer className="glass-panel mx-2 mb-2 px-3 py-2 sm:px-4 sm:py-3 text-center">
        <p className="text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 text-gray-300">
          Built with 
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" /> 
          by
          <a 
            href="https://axtillar.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text hover:opacity-80 transition-opacity inline-flex items-center gap-1"
          >
            Axtillar
          </a>
        </p>
      </footer>
    </div>
  );
}
