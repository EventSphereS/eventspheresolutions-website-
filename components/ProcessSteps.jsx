const steps = [
  { num: '01', title: 'Capture', plain: 'Catch', bold: 'every inquiry' },
  { num: '02', title: 'Manage & Plan', plain: 'Keep', bold: 'every detail on track' },
  { num: '03', title: 'Book', plain: 'Close', bold: 'more events' },
  { num: '04', title: 'Operate', plain: 'Run', bold: 'flawless events' },
]

const LINE = 'linear-gradient(90deg, #6a256f, #EF4561, #E07B20)'

function Circle({ num }) {
  return (
    <div
      className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] shrink-0"
      style={{ background: LINE }}
    >
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        <span className="font-display font-extrabold text-2xl md:text-3xl text-[#6a256f] leading-none">{num}</span>
      </div>
    </div>
  )
}

export default function ProcessSteps() {
  return (
    <section className="pt-24 pb-8 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Desktop — horizontal timeline */}
        <div className="hidden md:block relative">
          <div
            className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2"
            style={{ background: LINE }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center px-3">
                <Circle num={s.num} />
                <h3 className="text-2xl font-bold text-[#6a256f] mt-6 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  {s.plain} <span className="font-bold text-[#222123]">{s.bold}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="md:hidden relative">
          <div
            className="absolute left-10 top-10 bottom-10 w-0.5 -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, #6a256f, #EF4561, #E07B20)' }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-8">
            {steps.map((s) => (
              <div key={s.num} className="flex items-center gap-5">
                <Circle num={s.num} />
                <div>
                  <h3 className="text-2xl font-bold text-[#6a256f] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed">
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
