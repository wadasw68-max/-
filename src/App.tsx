import { useEffect, useRef, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";

const heroImg = "/images/6.jpeg";
const volcanoImg = "/images/5.jpeg";
const interiorImg = "/images/4.jpeg";
const tatamiImg = "/images/3.jpeg";
const onsenImg = "/images/2.jpeg";
const sunsetImg = "/images/1.jpeg";

const panoramas = {
  suite: "/images/panorama-suite.jpg",
  onsen: "/images/panorama-onsen.jpg",
  lobby: "/images/panorama-lobby.jpg",
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePano, setActivePano] = useState<keyof typeof panoramas>("suite");
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY * 0.4;
      el.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rooms = [
    {
      id: "yama",
      name: "YAMA Suite",
      size: "78 м²",
      view: "Вулкан Корякский",
      desc: "Пространство из дуба и камня с панорамным окном на вулкан. Частный онсэн, камин, чайная зона.",
      img: interiorImg,
    },
    {
      id: "mori",
      name: "MORI Residence",
      size: "120 м²",
      view: "Тундра и океан",
      desc: "Двухуровневый сьют с библиотекой и террасой. Ванна из хиноки, вид на Тихий океан.",
      img: tatamiImg,
    },
    {
      id: "kaze",
      name: "KAZE Villa",
      size: "210 м²",
      view: "Приватный",
      desc: "Отдельная вилла с тремя спальнями, шеф-поваром и собственным горячим источником.",
      img: onsenImg,
    },
  ];

  const experiences = [
    { title: "Вертолёт к вулканам", desc: "Приватный вылет к кратеру Авачинского, посадка на ледник", time: "4 часа" },
    { title: "Дикий онсэн", desc: "Купание в термальных источниках под северным сиянием", time: "Закат" },
    { title: "Тихоокеанская рыбалка", desc: "Камчатский краб и дикий лосось с шефом у костра", time: "Весь день" },
    { title: "Медведи Курильского", desc: "Наблюдение с гидом-биологом, безопасно и этично", time: "Июль–Сент" },
  ];

  return (
    <div className="bg-[#050607] text-[#EDEAE3] overflow-x-hidden">
      {/* Nav */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled || menuOpen ? "bg-[#050607]/90 backdrop-blur-2xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 h-[84px] flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group">
              <div className="text-[22px] tracking-[0.18em] font-light">KŌRI</div>
              <div className="text-[10px] tracking-[0.3em] text-white/50 -mt-1 group-hover:text-white/80 transition">KAMCHATKA</div>
            </button>
            <div className="hidden lg:flex items-center gap-10 text-[13px] tracking-wide text-white/60">
              <a href="#philosophy" className="hover:text-white transition">Философия</a>
              <a href="#rooms" className="hover:text-white transition">Номера</a>
              <a href="#panorama" className="hover:text-white transition">3D тур</a>
              <a href="#experiences" className="hover:text-white transition">Опыт</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <div className="text-[11px] text-white/40 tracking-widest">КООРДИНАТЫ</div>
              <div className="text-[13px] font-light tracking-wide">53°01′N 158°39′E</div>
            </div>
            <button onClick={() => setBookingOpen(true)} className="hidden sm:inline-flex items-center h-11 px-7 rounded-full bg-[#EDEAE3] text-black text-[13px] tracking-wide hover:bg-white transition">
              Забронировать
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]">
              <span className={`w-5 h-[1px] bg-white transition ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`w-5 h-[1px] bg-white transition ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </div>
        {/* Mobile */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 border-t border-white/5 ${menuOpen ? "max-h-[400px] bg-[#050607]" : "max-h-0"}`}>
          <div className="px-6 py-8 space-y-5 text-[17px] font-light">
            {["Философия", "Номера", "3D тур", "Опыт"].map((l, i) => (
              <a key={l} href={["#philosophy","#rooms","#panorama","#experiences"][i]} onClick={() => setMenuOpen(false)} className="block">{l}</a>
            ))}
            <button onClick={() => { setBookingOpen(true); setMenuOpen(false); }} className="w-full mt-4 h-12 rounded-full bg-[#EDEAE3] text-black">Забронировать</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[100svh] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#050607]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
            <div className="max-w-[1200px]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-[1px] bg-[#C9A66B]"></div>
                <span className="text-[11px] tracking-[0.3em] text-[#C9A66B] uppercase">Открытие 2024</span>
              </div>
              <h1 className="text-[clamp(48px,9vw,140px)] leading-[0.82] tracking-[-0.03em] mb-8">
                Дикая
                <br />
                <span className="italic font-light">роскошь</span>
                <br />
                Камчатки
              </h1>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                <p className="text-[18px] md:text-[20px] leading-relaxed text-white/70 max-w-[520px] font-light">
                  12 сьютов на краю земли. Частные онсэны с видом на вулканы. 
                  Японский минимализм, встретивший камчатскую тундру.
                </p>
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-[13px] text-white/50 mb-1">От</div>
                    <div className="text-[28px] font-light">₽85 000 <span className="text-[14px] text-white/50">/ ночь</span></div>
                  </div>
                  <button onClick={() => document.getElementById("panorama")?.scrollIntoView({ behavior: "smooth" })} className="group flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C9A66B] group-hover:bg-[#C9A66B]/10 transition">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                    <span className="text-[13px] tracking-wide">3D тур</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050607] to-transparent pointer-events-none"></div>
      </section>

      {/* Manifesto */}
      <section id="philosophy" className="border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-start">
            <div>
              <div className="text-[12px] tracking-[0.25em] text-white/40 mb-8">ФИЛОСОФИЯ</div>
              <h2 className="text-[clamp(36px,5vw,72px)] leading-[1.1] tracking-[-0.02em] mb-12">
                Как в <em className="font-light">Niseko Hakuunso</em>,
                <br />но диче.
              </h2>
              <div className="grid sm:grid-cols-2 gap-12 text-[15px] leading-relaxed text-white/65 font-light">
                <p>
                  Мы построили KŌRI там, где заканчивается дорога. 45 минут на вертолёте от Петропавловска. 
                  Никаких соседей, только вулканы, океан и вы.
                </p>
                <p>
                  Архитектура — ученик Кенго Кумы. Дерево, камень, стекло. Никакого бетона. 
                  Каждый сьют повёрнут к своему вулкану.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={volcanoImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 hidden md:block">
                <div className="bg-[#0A0C0E] border border-white/10 p-8 backdrop-blur-xl">
                  <div className="text-[11px] tracking-widest text-white/40 mb-3">КАК В LE MIRABEAU</div>
                  <div className="text-[15px] leading-snug max-w-[220px]">Сервис уровня альпийских шале, но без пафоса. Просто идеально.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="border-t border-white/5 bg-[#080A0C]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-[12px] tracking-[0.25em] text-white/40 mb-4">НОМЕРА</div>
              <h2 className="text-[clamp(32px,4.5vw,64px)] leading-[1.05]">Три типа. Двенадцать сьютов.</h2>
            </div>
            <div className="hidden md:block text-[14px] text-white/50">Все с частным онсэном</div>
          </div>

          <div className="grid md:grid-cols-3 gap-[1px] bg-white/10">
            {rooms.map((room) => (
              <div key={room.id} className="group bg-[#050607] p-[1px]">
                <div className="bg-[#050607] h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={room.img} alt="" className="w-full h-full object-cover transition duration-[1.5s] group-hover:scale-105" />
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-[26px] mb-2">{room.name}</h3>
                        <div className="flex items-center gap-4 text-[12px] text-white/50">
                          <span>{room.size}</span>
                          <span className="w-[3px] h-[3px] rounded-full bg-white/30"></span>
                          <span>{room.view}</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#C9A66B] transition">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H7m10 0v10"/></svg>
                      </div>
                    </div>
                    <p className="text-[14px] leading-relaxed text-white/60 font-light">{room.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Panorama - THE FEATURE */}
      <section id="panorama" className="border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[900px] mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#C9A66B]"></div>
              <span className="text-[11px] tracking-[0.3em] text-[#C9A66B]">3D ПАНОРАМА</span>
            </div>
            <h2 className="text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] mb-6">
              Прогуляйтесь до приезда
            </h2>
            <p className="text-[17px] text-white/65 font-light leading-relaxed">
              Полный виртуальный тур. Перемещайтесь между сьютом, онсэном и рестораном. Как Google Street View, только для вулканов.
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Controls */}
            <div className="lg:sticky lg:top-28 self-start">
              <div className="space-y-3">
                {[
                  { id: "suite", label: "YAMA Suite", sub: "Спальня и онсэн" },
                  { id: "onsen", label: "Дикий онсэн", sub: "На улице, -15°C" },
                  { id: "lobby", label: "Ресторан", sub: "Вид на Корякский" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePano(p.id as any)}
                    className={`w-full text-left p-5 border transition-all ${activePano === p.id ? "bg-white/5 border-[#C9A66B]/50" : "border-white/10 hover:border-white/20"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-[15px] mb-1 transition ${activePano === p.id ? "text-white" : "text-white/70"}`}>{p.label}</div>
                        <div className="text-[12px] text-white/40">{p.sub}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full transition ${activePano === p.id ? "bg-[#C9A66B]" : "bg-white/20"}`} />
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 p-5 border border-white/10 bg-white/[0.02]">
                <div className="text-[12px] text-white/50 leading-relaxed">
                  Тяните мышью • Колесо для зума • На телефоне — двигайте устройством
                </div>
              </div>
            </div>

            {/* Viewer */}
            <div className="relative aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-black border border-white/10">
              <ReactPhotoSphereViewer
                key={activePano}
                src={panoramas[activePano]}
                height={"100%"}
                width={"100%"}
                plugins={[
                  [MarkersPlugin, {
                    markers: [
                      {
                        id: "volcano",
                        position: { yaw: 0.8, pitch: -0.1 },
                        tooltip: "Вулкан Корякский, 3456м",
                        html: `<div style="background:rgba(0,0,0,0.8);backdrop-filter:blur(12px);padding:8px 12px;border:1px solid rgba(201,166,107,0.5);font-size:12px;letter-spacing:0.05em;">ВУЛКАН</div>`,
                      },
                      {
                        id: "ocean",
                        position: { yaw: 3.5, pitch: 0 },
                        tooltip: "Тихий океан — 12 км",
                        html: `<div style="background:rgba(0,0,0,0.8);backdrop-filter:blur(12px);padding:8px 12px;border:1px solid rgba(255,255,255,0.2);font-size:12px;">ОКЕАН</div>`,
                      }
                    ]
                  }],
                  [VirtualTourPlugin, { renderMode: "3d" as const }],
                ]}
                defaultZoomLvl={30}
                navbar={["zoom", "move", "fullscreen"]}
                littlePlanet={false}
                loadingImg="https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif"
                containerClass="w-full h-full"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-[11px] tracking-widest">
                360° • KŌRI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="border-t border-white/5 bg-[#080A0C]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <div className="text-[12px] tracking-[0.25em] text-white/40 mb-6">ОПЫТ</div>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.1] mb-6">Чем заняться, когда надоест смотреть на вулкан</h2>
              <p className="text-[15px] text-white/60 leading-relaxed font-light max-w-[420px]">Всё включено. Гид, вертолёт, снаряжение. Мы не продаём экскурсии — мы открываем доступ.</p>
            </div>
            <div className="space-y-[1px] bg-white/10">
              {experiences.map((exp) => (
                <div key={exp.title} className="group bg-[#050607] p-8 md:p-10 hover:bg-white/[0.02] transition">
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <h3 className="text-[22px] mb-3 group-hover:text-[#C9A66B] transition">{exp.title}</h3>
                      <p className="text-[14px] text-white/60 leading-relaxed max-w-[520px] font-light">{exp.desc}</p>
                    </div>
                    <div className="text-[12px] text-white/40 whitespace-nowrap mt-1">{exp.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image break */}
      <section className="relative h-[70vh] overflow-hidden border-y border-white/5">
        <img src={sunsetImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#050607]/50"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full">
            <div className="max-w-[700px]">
              <h2 className="text-[clamp(36px,5vw,72px)] leading-[0.95] mb-6">Приезжайте зимой.</h2>
              <p className="text-[18px] text-white/80 font-light leading-relaxed">Северное сияние отражается в онсэне. Вулканы розовые на закате. И никого в радиусе 50 км.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="border-t border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[clamp(32px,4.5vw,64px)] leading-[1.05] mb-6">12 сьютов.<br/>365 дней в году.</h2>
              <p className="text-[16px] text-white/65 leading-relaxed font-light max-w-[480px]">Бронирование напрямую. Трансфер из аэропорта Петропавловска на вертолёте включён при проживании от 3 ночей.</p>
            </div>
            <div className="bg-[#0A0C0E] border border-white/10 p-8 md:p-12">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-[11px] text-white/40 tracking-widest mb-2">ЗАЕЗД</div>
                  <div className="text-[18px]">Гибко</div>
                </div>
                <div>
                  <div className="text-[11px] text-white/40 tracking-widest mb-2">ВЫЕЗД</div>
                  <div className="text-[18px]">12:00</div>
                </div>
                <div>
                  <div className="text-[11px] text-white/40 tracking-widest mb-2">ГОСТЕЙ</div>
                  <div className="text-[18px]">2 взрослых</div>
                </div>
                <div>
                  <div className="text-[11px] text-white/40 tracking-widest mb-2">ВЕРТОЛЁТ</div>
                  <div className="text-[18px]">Включён</div>
                </div>
              </div>
              <button onClick={() => setBookingOpen(true)} className="w-full h-14 bg-[#EDEAE3] text-black text-[14px] tracking-wide hover:bg-white transition">Проверить наличие</button>
              <div className="mt-4 text-center text-[12px] text-white/40">Отвечаем в WhatsApp за 7 минут</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div>
              <div className="text-[24px] tracking-[0.18em] font-light mb-3">KŌRI</div>
              <div className="text-[13px] text-white/50 leading-relaxed">Камчатский край, Елизовский район<br/>Координаты по запросу после бронирования</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 text-[13px]">
              <div>
                <div className="text-white/40 mb-3">Связь</div>
                <div className="space-y-2 text-white/70">
                  <div>WhatsApp</div>
                  <div>Telegram</div>
                  <div>hello@kori.kamchatka</div>
                </div>
              </div>
              <div>
                <div className="text-white/40 mb-3">Соцсети</div>
                <div className="space-y-2 text-white/70">
                  <div>Instagram</div>
                  <div>YouTube</div>
                </div>
              </div>
              <div>
                <div className="text-white/40 mb-3">Пресса</div>
                <div className="space-y-2 text-white/70">
                  <div>Forbes Life</div>
                  <div>AD Russia</div>
                </div>
              </div>
              <div>
                <div className="text-white/40 mb-3">Правовое</div>
                <div className="space-y-2 text-white/70">
                  <div>Политика</div>
                  <div>Оферта</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-[12px] text-white/30">
            <div>© 2024 KŌRI Kamchatka Wilderness Retreat</div>
            <div>Сделано для тех, кто ищет тишину</div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <div className={`fixed inset-0 z-[200] transition ${bookingOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity ${bookingOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setBookingOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-[520px] bg-[#0A0C0E] border-l border-white/10 transition-transform duration-500 ${bookingOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="h-full overflow-y-auto p-8 md:p-12">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-[28px]">Бронирование</h3>
              <button onClick={() => setBookingOpen(false)} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white/30 transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-6">
              {[
                { label: "Даты", value: "Выберите даты" },
                { label: "Гости", value: "2 взрослых" },
                { label: "Номер", value: "YAMA Suite" },
              ].map((f) => (
                <div key={f.label} className="group">
                  <div className="text-[11px] tracking-widest text-white/40 mb-2">{f.label.toUpperCase()}</div>
                  <button className="w-full h-14 px-4 bg-white/[0.03] border border-white/10 text-left hover:border-white/20 transition flex items-center justify-between">
                    <span>{f.value}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                </div>
              ))}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">3 ночи, YAMA Suite</span>
                  <span>₽255 000</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60">Вертолёт (туда-обратно)</span>
                  <span className="text-[#C9A66B]">Включено</span>
                </div>
                <button className="w-full h-14 bg-[#EDEAE3] text-black font-medium hover:bg-white transition">Забронировать в WhatsApp</button>
                <div className="mt-4 text-[12px] text-center text-white/40 leading-relaxed">Нажимая, вы перейдёте в WhatsApp. Менеджер подтвердит наличие за 7 минут и вышлет координаты.</div>
              </div>
            </div>
            <div className="mt-16 p-6 bg-white/[0.02] border border-white/10">
              <div className="text-[13px] leading-relaxed text-white/60">KŌRI — это не отель в привычном смысле. Это 12 домов на 400 гектарах тундры. Без ресепшена, без лобби-баров. Только вы, гид и вулканы.</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #050607; }
        ::-webkit-scrollbar-thumb { background: #C9A66B; border-radius: 2px; }
      `}</style>
    </div>
  );
}
