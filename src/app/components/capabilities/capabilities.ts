import { Component } from '@angular/core';
import { SpotlightTiltDirective } from '../../directives/spotlight-tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-capabilities',
  standalone: true,
  imports: [SpotlightTiltDirective, ScrollRevealDirective],
  template: `
    <section id="about" class="py-20 relative overflow-hidden bg-slate-950/70">
      <!-- Ambient Dot Matrix Background -->
      <div class="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Section Header -->
        <div class="flex flex-col items-start mb-12 max-w-3xl" appScrollReveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
            About &amp; Capabilities
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What I Deliver as a
            <span class="bg-gradient-to-r from-indigo-400 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h2>
          <p class="text-slate-400 text-sm sm:text-base leading-relaxed mt-3">
            From business requirement to production deployment—engineering complete, performant software systems with end-to-end reliability, architectural discipline, and verifiable code quality.
          </p>
        </div>

        <!-- 3-Pillar Capability Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" appScrollReveal [revealDelay]="100">

          <!-- Pillar 1: End-to-End Product Engineering -->
          <div
            class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/40 transition-all shadow-xl"
            appSpotlightTilt
            [maxTilt]="3"
          >
            <div>
              <!-- Live Animated Vector Graphic: Client & Server Architecture Stream -->
              <div class="w-full h-28 rounded-xl bg-slate-950/80 border border-white/10 mb-5 p-3 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                <svg class="w-full h-full" viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Gradient Definitions -->
                  <defs>
                    <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#06B6D4" />
                      <stop offset="100%" stop-color="#6366F1" />
                    </linearGradient>
                    <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#6366F1" />
                      <stop offset="100%" stop-color="#8B5CF6" />
                    </linearGradient>
                  </defs>

                  <!-- Client Node (Angular / Browser Window) -->
                  <rect x="15" y="15" width="70" height="58" rx="6" fill="#0B0F19" stroke="url(#clientGrad)" stroke-width="1.5" />
                  <circle cx="27" cy="24" r="2" fill="#F43F5E" />
                  <circle cx="34" cy="24" r="2" fill="#F59E0B" />
                  <circle cx="41" cy="24" r="2" fill="#10B981" />
                  <line x1="22" y1="33" x2="78" y2="33" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
                  <!-- Responsive UI layout bars -->
                  <rect x="22" y="40" width="22" height="24" rx="2" fill="rgba(6,182,212,0.2)" />
                  <rect x="48" y="40" width="30" height="10" rx="2" fill="rgba(99,102,241,0.25)" />
                  <rect x="48" y="54" width="20" height="10" rx="2" fill="rgba(139,92,246,0.25)" />

                  <!-- Bidirectional Animated Data Pipeline Stream -->
                  <path d="M 88 38 L 192 38" stroke="url(#clientGrad)" stroke-width="2" class="animate-data-flow" />
                  <path d="M 192 50 L 88 50" stroke="url(#serverGrad)" stroke-width="2" class="animate-data-flow" style="animation-direction: reverse;" />

                  <!-- Central Real-Time REST / SignalR Protocol Node -->
                  <circle cx="140" cy="44" r="9" fill="#05070E" stroke="#06B6D4" stroke-width="1.5" />
                  <circle cx="140" cy="44" r="3" fill="#06B6D4" class="animate-ping" style="animation-duration: 2s;" />

                  <!-- Server Node (.NET 9 Enterprise Web API) -->
                  <rect x="195" y="15" width="70" height="58" rx="6" fill="#0B0F19" stroke="url(#serverGrad)" stroke-width="1.5" />
                  <!-- Server Racks -->
                  <rect x="203" y="24" width="54" height="10" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(99,102,241,0.3)" stroke-width="1" />
                  <circle cx="210" cy="29" r="1.5" fill="#10B981" class="animate-pulse" />
                  <circle cx="216" cy="29" r="1.5" fill="#06B6D4" />

                  <rect x="203" y="39" width="54" height="10" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(99,102,241,0.3)" stroke-width="1" />
                  <circle cx="210" cy="44" r="1.5" fill="#10B981" class="animate-pulse" />
                  <circle cx="216" cy="44" r="1.5" fill="#06B6D4" />

                  <rect x="203" y="54" width="54" height="10" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(99,102,241,0.3)" stroke-width="1" />
                  <circle cx="210" cy="59" r="1.5" fill="#10B981" class="animate-pulse" />
                  <circle cx="216" cy="59" r="1.5" fill="#06B6D4" />
                </svg>
              </div>

              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-white tracking-tight">
                  End-to-End Product Engineering
                </h3>
              </div>
              <p class="text-slate-300 text-sm leading-relaxed mb-5">
                Delivering complete software products from user requirements through frontend and backend execution. Designing responsive SPAs with Angular (Signals, SSR, Tailwind) and Blazor WASM tightly integrated with robust .NET domain services.
              </p>

              <!-- Capability Highlights -->
              <ul class="space-y-2 text-xs text-slate-400">
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>Full-stack web applications, SaaS platforms, and enterprise portals</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>Reactive Angular 20/21 Signal stores with zero change-detection overhead</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>Client-side vector PDF generation and interactive dynamic form builders</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>Multi-provider OAuth2 federation (Google, Microsoft, Facebook)</span>
                </li>
              </ul>
            </div>

            <div class="pt-5 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-cyan-300">
              <span>Full-Stack Solutions</span>
              <span class="text-slate-500">5 Systems</span>
            </div>
          </div>

          <!-- Pillar 2: Enterprise System Architecture -->
          <div
            class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-indigo-500/40 transition-all shadow-xl"
            appSpotlightTilt
            [maxTilt]="3"
          >
            <div>
              <!-- Live Animated Vector Graphic: Clean Architecture Hexagonal Core -->
              <div class="w-full h-28 rounded-xl bg-slate-950/80 border border-white/10 mb-5 p-3 flex items-center justify-center relative overflow-hidden group-hover:border-indigo-500/30 transition-colors">
                <svg class="w-full h-full" viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Outer Hexagonal Boundary (Presentation / Infrastructure Layer) -->
                  <polygon
                    points="140,8 190,26 190,64 140,82 90,64 90,26"
                    fill="rgba(99,102,241,0.06)"
                    stroke="rgba(99,102,241,0.4)"
                    stroke-width="1.2"
                    stroke-dasharray="4 2"
                  />

                  <!-- Middle Hexagon (Application CQRS / Use Case Orchestration) -->
                  <polygon
                    points="140,18 175,32 175,58 140,72 105,58 105,32"
                    fill="rgba(139,92,246,0.12)"
                    stroke="rgba(139,92,246,0.7)"
                    stroke-width="1.5"
                  />

                  <!-- Inner Hexagonal Core (Domain Entities & Business Rules) -->
                  <polygon
                    points="140,28 160,37 160,53 140,62 120,53 120,37"
                    fill="rgba(6,182,212,0.25)"
                    stroke="#06B6D4"
                    stroke-width="2"
                    class="animate-pulse-glow"
                  />

                  <!-- Glowing Center Core Node -->
                  <circle cx="140" cy="45" r="4" fill="#FFFFFF" class="animate-ping" style="animation-duration: 3s;" />

                  <!-- Inward Architecture Boundary Arrows (NetArchTest Rule: Zero Inward Leaks) -->
                  <path d="M 60 45 L 85 45" stroke="#6366F1" stroke-width="1.5" marker-end="url(#arrow)" class="animate-data-flow" />
                  <path d="M 220 45 L 195 45" stroke="#6366F1" stroke-width="1.5" class="animate-data-flow" style="animation-direction: reverse;" />

                  <!-- Text Labels -->
                  <text x="50" y="38" fill="#94A3B8" font-size="8" font-family="monospace">INFRA</text>
                  <text x="140" y="47" fill="#FFFFFF" font-size="7" font-family="monospace" text-anchor="middle" font-weight="bold">CORE</text>
                  <text x="215" y="38" fill="#94A3B8" font-size="8" font-family="monospace">CQRS</text>

                  <!-- Verification Check Badge -->
                  <rect x="110" y="76" width="60" height="12" rx="3" fill="#0B0F19" stroke="#10B981" stroke-width="0.8" />
                  <circle cx="118" cy="82" r="2.5" fill="#10B981" />
                  <text x="125" y="85" fill="#10B981" font-size="7" font-family="monospace">NetArchTest</text>
                </svg>
              </div>

              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-white tracking-tight">
                  Enterprise System Architecture
                </h3>
              </div>
              <p class="text-slate-300 text-sm leading-relaxed mb-5">
                Architecting modular, maintainable backends structured in Clean Architecture and Domain-Driven Design (DDD). Enforcing strict layer isolation with automated NetArchTest suites and separating command/query workloads via MediatR CQRS.
              </p>

              <!-- Capability Highlights -->
              <ul class="space-y-2 text-xs text-slate-400">
                <li class="flex items-start gap-2">
                  <span class="text-indigo-400 font-bold mt-0.5">•</span>
                  <span>Clean Architecture, DDD, CQRS, and Result/Specification patterns</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-indigo-400 font-bold mt-0.5">•</span>
                  <span>Automated NetArchTest architecture validation verifying 0 layer leaks</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-indigo-400 font-bold mt-0.5">•</span>
                  <span>Cron payroll engines and asynchronous background processing (Quartz.NET, Hangfire)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-indigo-400 font-bold mt-0.5">•</span>
                  <span>Token family rotation, PBKDF2 cryptography, and BOLA/IDOR protection</span>
                </li>
              </ul>
            </div>

            <div class="pt-5 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-indigo-300">
              <span>Clean Architecture &amp; DDD</span>
              <span class="text-slate-500">4 Systems</span>
            </div>
          </div>

          <!-- Pillar 3: High-Performance Data & Cloud -->
          <div
            class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-emerald-500/40 transition-all shadow-xl"
            appSpotlightTilt
            [maxTilt]="3"
          >
            <div>
              <!-- Live Animated Vector Graphic: SQL Database, Redis Caching & Cloud S3 Pipeline -->
              <div class="w-full h-28 rounded-xl bg-slate-950/80 border border-white/10 mb-5 p-3 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                <svg class="w-full h-full" viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- SQL Server Database Cylinder (Left) -->
                  <g transform="translate(20, 18)">
                    <!-- Cylinder Bottom -->
                    <ellipse cx="25" cy="42" rx="22" ry="7" fill="#0B0F19" stroke="#10B981" stroke-width="1.2" />
                    <!-- Cylinder Middle Body -->
                    <path d="M 3 20 A 22 7 0 0 0 47 20 L 47 42 A 22 7 0 0 1 3 42 Z" fill="rgba(16,185,129,0.12)" stroke="#10B981" stroke-width="1" />
                    <!-- Cylinder Intermediate Rib -->
                    <ellipse cx="25" cy="28" rx="22" ry="6" fill="none" stroke="rgba(16,185,129,0.4)" stroke-width="1" />
                    <!-- Cylinder Top Cap -->
                    <ellipse cx="25" cy="14" rx="22" ry="7" fill="#0B0F19" stroke="#10B981" stroke-width="1.5" />
                    <!-- Glowing Query Node -->
                    <circle cx="25" cy="14" r="3" fill="#10B981" class="animate-ping" style="animation-duration: 2.5s;" />
                    <text x="25" y="37" fill="#A7F3D0" font-size="7" font-family="monospace" text-anchor="middle">SQL T-SQL</text>
                  </g>

                  <!-- Redis In-Memory Caching Node (Center) -->
                  <g transform="translate(115, 20)">
                    <rect x="0" y="5" width="50" height="44" rx="8" fill="#0B0F19" stroke="#F43F5E" stroke-width="1.5" />
                    <path d="M 12 18 L 38 18 M 12 28 L 38 28 M 12 38 L 26 38" stroke="#F43F5E" stroke-width="1.2" />
                    <circle cx="34" cy="38" r="3" fill="#F43F5E" class="animate-pulse" />
                    <text x="25" y="14" fill="#FDA4AF" font-size="7" font-family="monospace" text-anchor="middle">REDIS</text>
                  </g>

                  <!-- S3 Storage Bucket / Backblaze Cloud (Right) -->
                  <g transform="translate(210, 18)">
                    <path
                      d="M 5 20 Q 25 10 45 20 L 40 48 Q 25 54 10 48 Z"
                      fill="rgba(6,182,212,0.15)"
                      stroke="#06B6D4"
                      stroke-width="1.5"
                    />
                    <ellipse cx="25" cy="20" rx="20" ry="6" fill="#0B0F19" stroke="#06B6D4" stroke-width="1.2" />
                    <text x="25" y="38" fill="#67E8F9" font-size="7" font-family="monospace" text-anchor="middle">S3 B2</text>
                  </g>

                  <!-- Connecting Data Flow Rays -->
                  <line x1="72" y1="42" x2="114" y2="42" stroke="#10B981" stroke-width="1.5" class="animate-data-flow" />
                  <line x1="166" y1="42" x2="210" y2="42" stroke="#06B6D4" stroke-width="1.5" class="animate-data-flow" />
                </svg>
              </div>

              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 5c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3m-16-5c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-white tracking-tight">
                  High-Performance Data &amp; Cloud
                </h3>
              </div>
              <p class="text-slate-300 text-sm leading-relaxed mb-5">
                Engineering database tiers for high transactional throughput and data integrity. Refactoring complex SQL Server stored procedures and execution plans, writing micro-ORM Dapper queries, and offloading media to S3 cloud storage.
              </p>

              <!-- Capability Highlights -->
              <ul class="space-y-2 text-xs text-slate-400">
                <li class="flex items-start gap-2">
                  <span class="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>Enterprise SQL Server tuning (T-SQL, execution plans, index optimization)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>Microsecond relational query execution with Dapper on PostgreSQL</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>Distributed caching and idempotent request pipelines via StackExchange.Redis</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>Zero-egress cloud media streaming with 240-min pre-signed S3 tokens (Backblaze B2)</span>
                </li>
              </ul>
            </div>

            <div class="pt-5 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-emerald-300">
              <span>Data &amp; Cloud Infra</span>
              <span class="text-slate-500">Enterprise Verified</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class CapabilitiesComponent {}
