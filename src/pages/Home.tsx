function Home() {
  return (
    <main className="relative flex min-h-[calc(100vh-56px)] w-full overflow-hidden bg-white">

      {/* Painel azul */}
      <section
        className="
          absolute inset-y-0 left-0 z-10
          w-[70%] bg-[#07519A]
          rounded-br-[38%_100%]
          shadow-[12px_5px_18px_rgba(0,0,0,0.28)]
          max-md:w-full
          max-md:rounded-br-[45%_25%]
        "
      >
        {/* Título */}
        <div className="absolute left-[11.8%] top-[27%] max-md:left-[8%] max-md:top-[20%]">
          <h1 className="flex flex-col text-[clamp(42px,5.4vw,66px)] font-extrabold leading-[1.05] tracking-[-2px] text-white max-md:text-[clamp(38px,9vw,58px)]">
            <span>Dashboard</span>
            <span className="text-[#91A9E6]">Importação</span>
          </h1>
        </div>

        {/* Subtítulo */}
        <p className="absolute bottom-[9.5%] left-[11.8%] m-0 text-lg font-bold text-white max-md:bottom-[12%] max-md:left-[8%] max-md:text-sm">
          BI de Gerenciamento | Importação
        </p>
      </section>

      {/* Logos Eurofarma e Pibernat */}
      <section className="absolute left-[63%] right-[3%] top-1/2 z-20 flex -translate-y-1/2 flex-col items-center justify-center gap-10 max-md:left-1/2 max-md:right-auto max-md:top-auto max-md:bottom-[5%] max-md:w-[55%] max-md:-translate-x-1/2 max-md:translate-y-0 max-md:gap-5 max-md:rounded-xl max-md:bg-white max-md:p-4">
        <img src="/images/eurofarma_logo.png" alt="Eurofarma" className="block h-auto w-[72%] max-w-[280px] object-contain max-md:w-[85%]" />
        <img src="/images/piber_logo.png" alt="Pibernat" className="block h-auto w-[72%] max-w-[280px] object-contain max-md:w-[85%]" />
      </section>

    </main>
  )
}

export default Home