import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
<section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"/>
  <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-6">
    Official Website
  </p>
  <Image
    src="/logo.png"
    alt="RUNIT Logo"
    width={500}
    height={250}
    className="object-contain mb-6 drop-shadow-2xl"
    priority
  />
  <p className="text-gray-400 text-xl max-w-xl mb-10">
    The ultimate UEFN experience. Jump in, run fast, and dominate.
  </p>
  <div className="flex gap-4 flex-wrap justify-center">
    <a
      href="https://www.fortnite.com"
      target="_blank"
      className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-lg text-lg uppercase tracking-wide hover:bg-yellow-300 transition yellow-glow"
    >
      Play Now
    </a>
    <Link
      href="/news"
      className="bg-gray-800 border border-gray-600 text-white font-bold px-8 py-3 rounded-lg text-lg uppercase tracking-wide hover:bg-gray-700 transition"
    >
      Latest News
    </Link>
  </div>
</section>

      {/* STATS BAR */}
      <section className="bg-yellow-400 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-around flex-wrap gap-4">
          {[
            { label: 'Island Code', value: 'XXXX-XXXX-XXXX' },
            { label: 'Version', value: 'v1.0.0' },
            { label: 'Status', value: '🟢 Online' },
            { label: 'Players', value: '1-16' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-gray-900 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
              <p className="text-gray-900 text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-fortnite font-bold text-center text-white uppercase tracking-wide mb-12">
          What&apos;s Going On
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              href: '/news',
              icon: '',
              title: 'Latest News',
              desc: 'Stay up to date with the latest announcements and updates',
              color: 'from-blue-900 to-blue-800',
              border: 'border-blue-500',
            },
            {
              href: '/bugs',
              icon: '',
              title: 'Known Bugs',
              desc: 'See what issues we are currently tracking and fixing',
              color: 'from-red-900 to-red-800',
              border: 'border-red-500',
            },
            {
              href: '/patch-notes',
              icon: '',
              title: 'Patch Notes',
              desc: 'Full history of every change and improvement made',
              color: 'from-green-900 to-green-800',
              border: 'border-green-500',
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`bg-gradient-to-br ${card.color} border ${card.border} rounded-xl p-8 card-glow transition`}
            >
              <span className="text-5xl">{card.icon}</span>
              <h3 className="text-2xl font-fortnite font-bold text-white uppercase mt-4 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-400">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-600 text-sm">
        <p>RUNIT is a fan-made UEFN experience. Not affiliated with Epic Games.</p>
      </footer>
    </main>
  )
}
