import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { SpotlightTiltDirective } from '../../directives/spotlight-tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [SpotlightTiltDirective, ScrollRevealDirective],
  template: `
    <section id="education" class="py-20 relative overflow-hidden bg-slate-950/70">
      <!-- Background Ambient Glow -->
      <div class="absolute top-1/4 right-10 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Header -->
        <div class="flex flex-col items-start mb-12" appScrollReveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
            Academic Credentials
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; Certifications
          </h2>
          <p class="text-slate-400 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed">
            Rigorous computer science foundation (GPA: 3.79 Excellent, Graduation Project: A+) paired with ongoing professional specialization across modern .NET architectures.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <!-- Left Column: University Degree & Honors Bento (5 cols) -->
          <div class="lg:col-span-5" appScrollReveal [revealDelay]="50">
            <div class="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between" appSpotlightTilt>
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono text-xs text-amber-300">
                    B.Sc. Computer Science
                  </span>
                  <span class="text-xs font-mono text-slate-400">Sep 2019 – Jul 2023</span>
                </div>

                <h3 class="text-2xl font-bold text-white tracking-tight mb-1">
                  Future Academy
                </h3>
                <p class="text-xs font-mono text-slate-400 mb-6">
                  Higher Future Institute for Specialized Technological Studies • Cairo, Egypt
                </p>

                <!-- Academic Excellence Badges -->
                <div class="space-y-4 mb-6">
                  <!-- GPA Card -->
                  <div class="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block">Cumulative GPA</span>
                      <span class="text-xs text-slate-300">Grade: Excellent</span>
                    </div>
                    <div class="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                      3.79 <span class="text-xs text-slate-500 font-normal">/ 4.00</span>
                    </div>
                  </div>

                  <!-- Grad Project Card -->
                  <div class="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block">Graduation Project</span>
                      <span class="text-xs text-slate-300">Defense &amp; Implementation</span>
                    </div>
                    <div class="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                      A+ <span class="text-xs text-emerald-300 font-normal">Honors</span>
                    </div>
                  </div>
                </div>

                <!-- Coursework Focus -->
                <h4 class="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">Core CS Foundations:</h4>
                <div class="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">Data Structures</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">Algorithms</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">OOP &amp; Design Patterns</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">Relational Databases</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">Software Engineering</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">Operating Systems</span>
                </div>
              </div>

              <div class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-500">
                <span>Verified Academic Record</span>
                <span class="text-amber-400 font-semibold">Class Honors</span>
              </div>
            </div>
          </div>

          <!-- Right Column: 2025 Verified Certifications Matrix (7 cols) -->
          <div class="lg:col-span-7 space-y-6" appScrollReveal [revealDelay]="100">

            <!-- Group 1: Dometrain (2025) -->
            <div class="glass-card p-6 rounded-2xl border border-white/10" appSpotlightTilt>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm">
                    DT
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-white tracking-tight">Dometrain</h4>
                    <span class="text-[10px] font-mono text-indigo-400 uppercase">Advanced .NET Architectures</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded bg-white/5 text-xs font-mono text-slate-400">2025</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">Dependency Injection in .NET</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">REST APIs in .NET</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">EF Core in .NET</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
              </div>
            </div>

            <!-- Group 2: Udemy (2025) -->
            <div class="glass-card p-6 rounded-2xl border border-white/10" appSpotlightTilt>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono text-sm">
                    UD
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-white tracking-tight">Udemy</h4>
                    <span class="text-[10px] font-mono text-rose-400 uppercase">Clean Code &amp; Enterprise Patterns</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded bg-white/5 text-xs font-mono text-slate-400">2025</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">ASP.NET Core – SOLID &amp; Clean Architecture</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">.NET Core MVC - Complete Guide</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">Complete C# Masterclass</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
              </div>
            </div>

            <!-- Group 3: 365 Data Science & CodeWithMosh (2025) -->
            <div class="glass-card p-6 rounded-2xl border border-white/10" appSpotlightTilt>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                    365
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-white tracking-tight">365 Data Science &amp; CodeWithMosh</h4>
                    <span class="text-[10px] font-mono text-emerald-400 uppercase">SQL &amp; Web Foundations</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded bg-white/5 text-xs font-mono text-slate-400">2025</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">SQL Database Engineering</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">The Ultimate HTML5 &amp; CSS3 Series</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                  <span class="text-xs font-semibold text-slate-200">The Ultimate JavaScript Series</span>
                  <span class="text-[10px] font-mono text-emerald-400 mt-2">Verified Complete</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class AcademicsComponent {
  readonly profileService = inject(ProfileService);
}
