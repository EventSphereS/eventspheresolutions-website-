const steps = [
  { num: '01', title: 'Capture', plain: 'Catch', bold: 'every inquiry' },
  { num: '02', title: 'Manage & Plan', plain: 'Keep', bold: 'every detail on track' },
  { num: '03', title: 'Book', plain: 'Close', bold: 'more events' },
  { num: '04', title: 'Operate', plain: 'Run', bold: 'flawless events' },
]

const LINE = 'linear-gradient(90deg, #6a256f, #EF4561, #E07B20)'

function Circle({ num }) {
  return (
    <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-[#E07B20] flex items-center justify-center shrink-0">
      <span className="font-display font-bold text-sm text-[#E07B20] leading-none">{num}</span>
    </div>
  )
}

export default function ProcessSteps() {
  return (
    <section className="pt-28 pb-8 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">From Inquiry to Event</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-[#6a256f] leading-tight">
            Sphere is built for your{' '}
            <span className="text-[#E07B20]">events business.</span>
          </h2>
        </div>

        {/* Desktop — horizontal timeline */}
        <div className="hidden md:block relative">
          <div
            className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2"
            style={{ background: LINE }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center px-3">
                <Circle num={s.num} />
                <h3 className="text-xl font-bold text-[#6a256f] mt-6 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.plain} <span className="font-bold text-[#222123]">{s.bold}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="md:hidden relative">
          <div
            className="absolute left-6 top-6 bottom-6 w-0.5 -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, #6a256f, #EF4561, #E07B20)' }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-8">
            {steps.map((s) => (
              <div key={s.num} className="flex items-center gap-5">
                <Circle num={s.num} />
                <div>
                  <h3 className="text-xl font-bold text-[#6a256f] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.plain} <span className="font-bold text-[#222123]">{s.bold}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
