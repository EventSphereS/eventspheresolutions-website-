const steps = [
  { num: '01', title: 'Capture', plain: 'Catch', bold: 'every inquiry' },
  { num: '02', title: 'Manage & Plan', plain: 'Keep', bold: 'every detail on track' },
  { num: '03', title: 'Book', plain: 'Close', bold: 'more events' },
  { num: '04', title: 'Operate', plain: 'Run', bold: 'flawless events' },
]

const LINE = 'linear-gradient(90deg, #6a256f, #EF4561, #E07B20)'

function Circle({ num }) {
  return (
    <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-[#6a256f] flex items-center justify-center shrink-0">
      <span className="font-display font-extrabold text-sm text-[#6a256f] leading-none">{num}</span>
    </div>
  )
}

export default function ProcessSteps() {
  return (
    <section className="py-20 md:py-24 bg-[#f6f3f6]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display font-extrabold uppercase tracking-tight text-[#6a256f] text-3xl sm:text-4xl md:text-5xl leading-tight text-center mb-14 md:mb-16">
          Sphere is built for your{' '}
          <span className="inline-block bg-[#EF4561] text-white px-3 py-0.5">Events Business</span>
        </h2>

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
                <h3 className="font-display font-extrabold uppercase tracking-tight text-[#222123] text-xl lg:text-2xl mt-6 mb-2">
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
                  <h3 className="font-display font-extrabold uppercase tracking-tight text-[#222123] text-xl mb-1">
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
