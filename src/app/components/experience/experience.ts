import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { SpotlightTiltDirective } from '../../directives/spotlight-tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SpotlightTiltDirective, ScrollRevealDirective],
  template: `
    <section id="experience" class="py-20 relative overflow-hidden bg-slate-950/70">
      <!-- Background Ambient Glow -->
      <div class="absolute top-1/2 left-10 w-[450px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Header -->
        <div class="flex flex-col items-start mb-12" appScrollReveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
            Career History
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <p class="text-slate-400 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed">
            Hands-on software engineering across transactional enterprise ERP systems, relational database optimization, and cloud platform development.
          </p>
        </div>

        <!-- Experience Timeline Cards -->
        <div class="space-y-10 md:space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-500 before:to-emerald-500 before:opacity-30">

          <!-- Experience Item 1: Athhan Solutions -->
          <div class="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start pl-8 sm:pl-12 md:pl-0" appScrollReveal [revealDelay]="50">

            <!-- Timeline Pin / Badge on line -->
            <div class="flex absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-1 md:top-6 w-6 h-6 md:w-9 md:h-9 rounded-full bg-slate-950 border-2 border-indigo-500 items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/30 z-20">
              <span class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-400"></span>
            </div>

            <!-- Left Card: Metadata -->
            <div class="w-full md:w-1/2 md:pr-12 text-left md:text-right">
              <div class="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 font-mono text-xs text-indigo-300 mb-2">
                Nov 2025 – Oct 2026 • 1 Year
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Athhan Solutions</h3>
              <p class="text-sm font-semibold text-indigo-400 mt-1">Full-Stack .NET Developer (Full-time)</p>
              <p class="text-xs font-mono text-slate-400 mt-1">Cairo, Egypt • Enterprise ERP Division</p>
            </div>

            <!-- Right Card: Verified Technical Impact Details -->
            <div class="w-full md:w-1/2 md:pl-12">
              <div class="glass-card p-5 sm:p-7 rounded-2xl border border-white/10" appSpotlightTilt>
                <div class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                  <span>Scope: ERP Modernization &amp; Database Tuning</span>
                  <span class="text-indigo-400 font-bold">Production Impact</span>
                </div>

                <ul class="space-y-3 mb-6">
                  <li class="flex items-start gap-3 text-sm text-slate-300">
                    <svg class="w-4 h-4 text-indigo-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Refactored complex enterprise <strong class="text-white">SQL Server stored procedures, indexes, and execution plans</strong> under ERP transactional workloads, optimizing critical query performance and mitigating database lock contention.
                    </span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-slate-300">
                    <svg class="w-4 h-4 text-indigo-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Engineered and maintained full-stack enterprise ERP modules using <strong class="text-white">.NET Framework and ASP.NET Web Forms</strong>; delivered database schema migrations, ADO.NET query optimizations, and role-based UI workflows.
                    </span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-slate-300">
                    <svg class="w-4 h-4 text-indigo-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Constructed robust backend integration endpoints enforcing strict input validation, structured logging with correlation IDs, and transaction rollback integrity under concurrent accounting operations.
                    </span>
                  </li>
                </ul>

                <!-- Stack Pills -->
                <div class="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 font-mono text-[11px]">
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">.NET Framework</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">ASP.NET Web Forms</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">SQL Server</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">T-SQL Stored Procs</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">ADO.NET</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">JavaScript</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Experience Item 2: Freelance Software Engineer -->
          <div class="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start pl-8 sm:pl-12 md:pl-0 pt-4 md:pt-6" appScrollReveal [revealDelay]="100">

            <!-- Timeline Pin / Badge on line -->
            <div class="flex absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-5 md:top-10 w-6 h-6 md:w-9 md:h-9 rounded-full bg-slate-950 border-2 border-emerald-500 items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/30 z-20">
              <span class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400"></span>
            </div>

            <!-- Left Card: Metadata -->
            <div class="w-full md:w-1/2 md:pr-12 text-left md:text-right">
              <div class="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-300 mb-2">
                Sep 2025 – Present • Active
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Freelance Software Engineer</h3>
              <p class="text-sm font-semibold text-emerald-400 mt-1">Full-Stack &amp; Systems Engineering</p>
              <p class="text-xs font-mono text-slate-400 mt-1">Remote • EdTech &amp; Enterprise Platforms</p>
            </div>

            <!-- Right Card: Verified Technical Impact Details -->
            <div class="w-full md:w-1/2 md:pl-12">
              <div class="glass-card p-5 sm:p-7 rounded-2xl border border-white/10" appSpotlightTilt>
                <div class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                  <span>Scope: Distributed Cloud Backends &amp; CQRS</span>
                  <span class="text-emerald-400 font-bold">Cloud Architect</span>
                </div>

                <ul class="space-y-3 mb-6">
                  <li class="flex items-start gap-3 text-sm text-slate-300">
                    <svg class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Architected RESTful Web APIs for EdTech and consultation platforms (<strong class="text-white">EduCore &amp; Mashoorti</strong>) in .NET 9 using <strong class="text-white">CQRS with MediatR</strong>, separating read and write workloads and indexing relational data to maintain responsive query performance during peak exam and enrollment periods.
                    </span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-slate-300">
                    <svg class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Engineered secure media streaming and voucher redemption engines; integrated private <strong class="text-white">Cloudflare R2 and Backblaze B2 storage with 240-minute pre-signed token authorization</strong> and .NET 9 Device Lock security protocols to restrict direct server asset streaming.
                    </span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-slate-300">
                    <svg class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Built background job pipelines with <strong class="text-white">Hangfire</strong> and dynamic PDF credential delivery engines using <strong class="text-white">QuestPDF</strong>, streaming vector-rendered graduation certificates to cloud storage with retry policies and persistent execution state.
                    </span>
                  </li>
                </ul>

                <!-- Stack Pills -->
                <div class="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 font-mono text-[11px]">
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">.NET 9</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">MediatR CQRS</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Backblaze B2</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Cloudflare R2</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">Hangfire</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">QuestPDF</span>
                  <span class="px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">EF Core 9</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class ExperienceComponent {
  readonly profileService = inject(ProfileService);
}
