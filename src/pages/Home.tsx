function Home() {
  return (
    <main className="relative flex min-h-[calc(100vh-56px)] w-full overflow-hidden bg-white">

      {/* Painel azul */}
      <section
        className="
          absolute inset-y-0 left-0 z-10
          w-[63%] bg-[#07519A]
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

      {/* Logo e linha vertical */}
      <section className="absolute bottom-[7%] right-[4%] z-20 flex w-[29%] items-center justify-between max-md:bottom-[5%] max-md:right-[8%] max-md:w-[75%]">
        <img
          src="/images/eurofarma_logo.png"
          alt="Eurofarma"
          className="block h-auto w-[82%] max-w-[330px] object-contain max-md:max-w-[250px]"
        />

        <div className="h-[100px] w-0.5 shrink-0 bg-[#07519A] max-md:h-[65px]" />
      </section>

    </main>
  )
}

export default Home