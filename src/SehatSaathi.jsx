import { useState } from "react";

const PRIMARY = "#00857c";
const PRIMARY_DARK = "#006d65";
const PRIMARY_LIGHT = "#e6f4f3";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Noor",
    specialty: "Gynecologist",
    location: "Bannu Medical Complex",
    city: "Bannu",
    address: "Main Saddar Road, Bannu",
    fee: 800,
    experience: 12,
    gender: "Female",
    rating: 4.9,
    reviews: 142,
    slots: ["9:00 AM", "10:30 AM", "11:00 AM", "2:00 PM"],
    photo: "AN",
    color: PRIMARY,
    tags: ["Female Doctor", "FCPS"],
    about: "Dr. Ayesha Noor is a highly experienced gynecologist with over 12 years of practice. She specializes in maternal health and women's wellness.",
    education: "MBBS, FCPS (Gynecology) — KMC Peshawar",
    languages: ["Urdu", "Pashto", "English"],
    nextAvailable: "Today",
  },
  {
    id: 2,
    name: "Dr. Imran Khattak",
    specialty: "Cardiologist",
    location: "DHQ Hospital",
    city: "Bannu",
    address: "Hospital Road, Bannu",
    fee: 1200,
    experience: 18,
    gender: "Male",
    rating: 4.8,
    reviews: 98,
    slots: ["3:00 PM", "4:00 PM", "5:30 PM"],
    photo: "IK",
    color: "#1a56a0",
    tags: ["Heart Specialist", "FCPS"],
    about: "Dr. Imran Khattak is a leading cardiologist with 18 years of experience in diagnosing and treating heart conditions.",
    education: "MBBS, FCPS (Cardiology) — PGMI Lahore",
    languages: ["Urdu", "Pashto"],
    nextAvailable: "Today",
  },
  {
    id: 3,
    name: "Dr. Sana Malik",
    specialty: "Dermatologist",
    location: "Skin & Care Clinic",
    city: "Peshawar",
    address: "University Road, Peshawar",
    fee: 1000,
    experience: 9,
    gender: "Female",
    rating: 4.7,
    reviews: 211,
    slots: ["11:00 AM", "12:00 PM", "3:00 PM", "4:30 PM"],
    photo: "SM",
    color: "#b45309",
    tags: ["Skin Expert", "Laser"],
    about: "Dr. Sana Malik specializes in medical and cosmetic dermatology with expertise in laser treatments and skin disorders.",
    education: "MBBS, MCPS (Dermatology) — KMU Peshawar",
    languages: ["Urdu", "Pashto", "English"],
    nextAvailable: "Tomorrow",
  },
  {
    id: 4,
    name: "Dr. Tariq Hussain",
    specialty: "General Physician",
    location: "Al-Shifa Clinic",
    city: "Bannu",
    address: "Jinnah Chowk, Bannu",
    fee: 500,
    experience: 22,
    gender: "Male",
    rating: 4.6,
    reviews: 324,
    slots: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
    photo: "TH",
    color: "#5e35b1",
    tags: ["Family Doctor", "Senior"],
    about: "With 22 years of experience, Dr. Tariq Hussain is one of the most trusted general physicians in Bannu.",
    education: "MBBS — Bolan Medical College",
    languages: ["Urdu", "Pashto"],
    nextAvailable: "Today",
  },
  {
    id: 5,
    name: "Dr. Fatima Zahra",
    specialty: "Dentist",
    location: "SmileCare Dental",
    city: "Peshawar",
    address: "Hayatabad Phase 3, Peshawar",
    fee: 700,
    experience: 7,
    gender: "Female",
    rating: 4.8,
    reviews: 87,
    slots: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"],
    photo: "FZ",
    color: "#0f766e",
    tags: ["Braces", "Dental Surgery"],
    about: "Dr. Fatima Zahra offers comprehensive dental care including orthodontics, cosmetic dentistry, and oral surgery.",
    education: "BDS, FCPS (Orthodontics) — KMU Peshawar",
    languages: ["Urdu", "Pashto", "English"],
    nextAvailable: "Today",
  },
  {
    id: 6,
    name: "Dr. Usman Afridi",
    specialty: "Surgeon",
    location: "KMC Hospital",
    city: "Peshawar",
    address: "Khyber Road, Peshawar",
    fee: 1500,
    experience: 15,
    gender: "Male",
    rating: 4.9,
    reviews: 63,
    slots: ["2:00 PM", "3:00 PM", "5:00 PM"],
    photo: "UA",
    color: "#9f1239",
    tags: ["General Surgery", "Gold Medalist"],
    about: "Dr. Usman Afridi is a gold medalist surgeon specializing in laparoscopic and general surgery procedures.",
    education: "MBBS, FCPS (Surgery) — KMU — Gold Medalist",
    languages: ["Urdu", "Pashto", "English"],
    nextAvailable: "Tomorrow",
  },
];

const cities = ["All Cities", "Bannu", "Peshawar"];

const sampleReviews = [
  { name: "Hina K.", rating: 5, text: "Very professional and caring. The booking process was so easy!", date: "2 days ago" },
  { name: "Asad M.", rating: 5, text: "Explained everything clearly. Highly recommended to everyone!", date: "1 week ago" },
  { name: "Zainab R.", rating: 4, text: "Great experience overall. No long wait times.", date: "2 weeks ago" },
];

const getDays = () => {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNames[d.getDay()],
      date: `${monthNames[d.getMonth()]} ${d.getDate()}`,
    });
  }
  return days;
};

export default function SehatSaathi() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [city, setCity] = useState("All Cities");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingStep, setBookingStep] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientReason, setPatientReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const days = getDays();

  const filtered = doctors.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.city.toLowerCase().includes(q);
    const matchSpec = specialty === "All Specialties" || d.specialty === specialty;
    const matchCity = city === "All Cities" || d.city === city;
    return matchSearch && matchSpec && matchCity;
  });

  const openProfile = (doc) => { setSelectedDoctor(doc); setBookingDoctor(null); setSelectedSlot(""); setSelectedDay(0); };
  const openBooking = (doc, slot = "") => { setBookingDoctor(doc); setSelectedDoctor(null); setSelectedSlot(slot); setBookingStep(0); setConfirmed(false); setPatientName(""); setPatientPhone(""); setPatientReason(""); };
  const closeAll = () => { setSelectedDoctor(null); setBookingDoctor(null); setConfirmed(false); };

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif}
        input,select,button,textarea{font-family:'DM Sans',sans-serif}
        .doc-card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,0.1)!important}
        .slot-btn:hover{background:${PRIMARY}!important;color:#fff!important;border-color:${PRIMARY}!important}
        .book-btn-main:hover{background:${PRIMARY_DARK}!important}
        .spec-pill:hover{background:${PRIMARY_LIGHT}!important;border-color:${PRIMARY}!important;color:${PRIMARY}!important}
        .nav-link:hover{color:${PRIMARY}!important}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#ddd;border-radius:3px}
        .footer-link:hover{color:#e5e7eb!important}
        .profile-btn:hover{background:#f3f4f6!important}
      `}</style>

      {/* NAVBAR */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill={PRIMARY}/>
              <path d="M14 7v14M7 14h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span style={s.logoText}>Sehat<span style={s.logoAccent}>Saathi</span></span>
          </div>
          <div style={s.navCenter}>
            {["Find Doctors","How it Works","For Patients"].map(l=>(
              <a key={l} className="nav-link" href="#" style={s.navLink}>{l}</a>
            ))}
          </div>
          <div style={s.navRight}>
            <a href="#" style={s.navLinkOutline}>For Doctors</a>
            <button style={s.navBtn}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.heroBadge}>🏥 Serving Bannu &amp; Peshawar</div>
          <h1 style={s.heroH1}>Book a doctor,<br/><span style={{color:PRIMARY}}>feel better faster.</span></h1>
          <p style={s.heroSub}>Find verified doctors, check real availability, and book appointments online — for free.</p>
          <div style={s.searchBox}>
            <div style={s.searchField}>
              <span style={s.searchFieldIcon}>🔍</span>
              <input style={s.searchInput} placeholder="Doctor name, specialty, or symptom" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            <div style={s.searchDivider}/>
            <div style={s.searchField}>
              <span style={s.searchFieldIcon}>📍</span>
              <select style={s.searchSelect} value={city} onChange={e=>setCity(e.target.value)}>
                {cities.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <button style={s.searchBtn}>Search</button>
          </div>
          <div style={s.trustRow}>
            {["✓ Verified Doctors","✓ Free to Book","✓ Real Reviews","✓ WhatsApp Confirmation"].map(t=>(
              <span key={t} style={s.trustBadge}>{t}</span>
            ))}
          </div>
        </div>
        <div style={s.heroRight}>
          <div style={s.heroFloatCard}>
            <div style={s.hfcTop}>
              <div style={{...s.hfcAvatar,background:PRIMARY}}>AY</div>
              <div>
                <div style={s.hfcName}>Dr. Ayesha Noor</div>
                <div style={s.hfcSpec}>Gynecologist · Bannu</div>
                <div style={s.hfcStars}>★★★★★ <span style={{color:"#333",fontWeight:700}}>4.9</span></div>
              </div>
              <div style={s.hfcBadge}>Available</div>
            </div>
            <div style={s.hfcSlots}>
              {["9:00 AM","10:30 AM","2:00 PM"].map(t=>(
                <div key={t} style={s.hfcSlot}>{t}</div>
              ))}
            </div>
          </div>
          <div style={s.heroStat1}><div style={s.heroStatNum}>50+</div><div style={s.heroStatLbl}>Doctors</div></div>
          <div style={s.heroStat2}><div style={s.heroStatNum}>1,200+</div><div style={s.heroStatLbl}>Bookings</div></div>
        </div>
      </section>

      {/* SPECIALTY PILLS */}
      <section style={s.specSection}>
        <div style={s.specInner}>
          <div style={s.specLabel}>Browse by specialty</div>
          <div style={s.specRow}>
            {[["🫀","Cardiologist"],["🦷","Dentist"],["🧴","Dermatologist"],["👩‍⚕️","Gynecologist"],["💊","General Physician"],["🔪","Surgeon"]].map(([icon,sp])=>(
              <button key={sp} className="spec-pill"
                onClick={()=>setSpecialty(specialty===sp?"All Specialties":sp)}
                style={{...s.specPill,...(specialty===sp?s.specPillActive:{})}}>
                <span style={{fontSize:16}}>{icon}</span><span>{sp}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section style={s.results}>
        <div style={s.resultsInner}>
          <div style={s.resultsHeader}>
            <div>
              <h2 style={s.resultsTitle}>{filtered.length} {specialty!=="All Specialties"?specialty:"Doctor"}{filtered.length!==1?"s":""} available{city!=="All Cities"?` in ${city}`:""}</h2>
              <p style={s.resultsSub}>Appointments available today and this week</p>
            </div>
            <select style={s.sortSelect} defaultValue="recommended">
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="fee">Lowest Fee</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          {filtered.length===0?(
            <div style={{textAlign:"center",padding:"80px 24px",color:"#555"}}>
              <div style={{fontSize:52}}>🔭</div>
              <div style={{fontSize:18,fontWeight:600,marginTop:16}}>No doctors found</div>
              <div style={{color:"#888",marginTop:8}}>Try adjusting your search or filters</div>
            </div>
          ):(
            <div style={s.cardList}>
              {filtered.map(doc=>(
                <div key={doc.id} className="doc-card" style={s.card}>
                  <div style={s.cardLeft}>
                    <div style={{...s.cardAvatar,background:doc.color}}>{doc.photo}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
                        <h3 style={s.cardName}>{doc.name}</h3>
                        {doc.nextAvailable==="Today"&&<span style={s.todayBadge}>Available Today</span>}
                      </div>
                      <div style={{color:doc.color,fontWeight:600,marginBottom:8,fontSize:14}}>{doc.specialty}</div>
                      <div style={s.cardMeta}>
                        <span>📍 {doc.location}, {doc.city}</span>
                        <span style={{color:"#ccc"}}>·</span>
                        <span>💼 {doc.experience} yrs</span>
                        <span style={{color:"#ccc"}}>·</span>
                        <span>{doc.gender}</span>
                      </div>
                      <div style={s.cardRatingRow}>
                        <span style={{color:"#f59e0b",fontSize:14}}>★★★★★</span>
                        <span style={{fontWeight:700,fontSize:14}}>{doc.rating}</span>
                        <span style={{color:"#888",fontSize:13}}>({doc.reviews} reviews)</span>
                      </div>
                      <div style={s.cardTags}>
                        {doc.tags.map(t=><span key={t} style={s.cardTag}>{t}</span>)}
                        <span style={s.cardFee}>Rs. {doc.fee} / visit</span>
                      </div>
                    </div>
                  </div>
                  <div style={s.cardRight}>
                    <div style={s.cardSlotTitle}>Next available</div>
                    <div style={{display:"flex",gap:6,marginBottom:10}}>
                      {days.slice(0,3).map((d,i)=>(
                        <div key={i} style={{flex:1,textAlign:"center"}}>
                          <div style={{fontSize:11,fontWeight:700,color:PRIMARY}}>{d.label}</div>
                          <div style={{fontSize:11,color:"#888"}}>{d.date}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
                      {doc.slots.slice(0,3).map(slot=>(
                        <button key={slot} className="slot-btn" style={s.slotBtn} onClick={()=>openBooking(doc,slot)}>{slot}</button>
                      ))}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      <button className="profile-btn" style={s.profileBtn} onClick={()=>openProfile(doc)}>View Profile</button>
                      <button className="book-btn-main" style={s.bookBtnMain} onClick={()=>openBooking(doc)}>Book Appointment</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={s.howSection}>
        <div style={s.howInner}>
          <h2 style={s.howTitle}>How SehatSaathi works</h2>
          <p style={s.howSub}>Book your doctor in under 2 minutes</p>
          <div style={s.howGrid}>
            {[["01","🔍","Search","Find doctors by specialty, city, or symptoms. Filter by gender, fee, and availability."],
              ["02","📅","Choose a time","Pick your preferred date and time slot directly from the doctor's real-time availability."],
              ["03","✅","Confirm & go","Enter your details, confirm your booking, and get a WhatsApp reminder before your appointment."]
            ].map(([num,icon,title,desc])=>(
              <div key={title} style={s.howCard}>
                <div style={s.howNum}>{num}</div>
                <div style={{fontSize:32,marginBottom:12}}>{icon}</div>
                <h3 style={s.howCardTitle}>{title}</h3>
                <p style={s.howCardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR DOCTORS CTA */}
      <section style={s.docCta}>
        <div style={s.docCtaInner}>
          <div style={{flex:1,minWidth:280}}>
            <div style={s.docCtaBadge}>For Healthcare Providers</div>
            <h2 style={s.docCtaTitle}>Grow your practice with SehatSaathi</h2>
            <p style={{color:"#555",fontSize:15,lineHeight:1.7,marginBottom:20}}>Join verified doctors across Bannu and Peshawar. Manage appointments, build your online reputation, and reach more patients.</p>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
              {["Free profile setup and verification","Online appointment management dashboard","Patient reviews and reputation building","Reach hundreds of local patients daily"].map(p=>(
                <div key={p} style={{fontSize:14,color:"#333",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{color:PRIMARY,fontWeight:700,fontSize:16}}>✓</span>{p}
                </div>
              ))}
            </div>
            <button style={s.docCtaBtn}>Join as a Doctor — It's Free →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,flexShrink:0}}>
            {[["50+","Verified Doctors"],["1,200+","Appointments Booked"],["4.8 ★","Average Rating"],["2","Cities & Growing"]].map(([num,lbl])=>(
              <div key={lbl} style={s.docCtaStat}>
                <div style={s.docCtaStatNum}>{num}</div>
                <div style={{fontSize:13,color:"#888"}}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={s.footerTop}>
            <div style={{maxWidth:260}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill={PRIMARY}/><path d="M14 7v14M7 14h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
                <span style={{...s.logoText,fontSize:18}}>Sehat<span style={s.logoAccent}>Saathi</span></span>
              </div>
              <p style={{color:"#9ca3af",fontSize:14,lineHeight:1.6}}>Connecting patients with trusted doctors across KPK</p>
            </div>
            <div style={s.footerLinks}>
              {[["Patients",["Find a Doctor","How it Works","Reviews","FAQs"]],["Doctors",["Join SehatSaathi","Doctor Login","Pricing","Support"]],["Company",["About Us","Contact","Privacy Policy","Terms"]]].map(([title,links])=>(
                <div key={title} style={{display:"flex",flexDirection:"column",gap:10}}>
                  <div style={{fontWeight:700,fontSize:13,textTransform:"uppercase",letterSpacing:"0.8px",color:"#e5e7eb",marginBottom:4}}>{title}</div>
                  {links.map(l=><a key={l} className="footer-link" href="#" style={{color:"#9ca3af",fontSize:14,textDecoration:"none",transition:"color 0.15s"}}>{l}</a>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid #374151",paddingTop:24,display:"flex",justifyContent:"space-between",fontSize:13,color:"#6b7280",flexWrap:"wrap",gap:8}}>
            <span>© 2025 SehatSaathi · Made with ❤️ for Bannu &amp; Peshawar</span>
            <span>A platform for the people of KPK</span>
          </div>
        </div>
      </footer>

      {/* DOCTOR PROFILE MODAL */}
      {selectedDoctor&&(
        <div style={s.overlay} onClick={closeAll}>
          <div style={s.profileModal} onClick={e=>e.stopPropagation()}>
            <button style={s.modalClose} onClick={closeAll}>✕</button>
            <div style={s.pmHeader}>
              <div style={{...s.pmAvatar,background:selectedDoctor.color}}>{selectedDoctor.photo}</div>
              <div style={{flex:1}}>
                <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>{selectedDoctor.name}</h2>
                <div style={{color:selectedDoctor.color,fontWeight:600,marginBottom:6}}>{selectedDoctor.specialty}</div>
                <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:13,color:"#666",marginBottom:6}}>
                  <span>📍 {selectedDoctor.address}</span>
                  <span>💼 {selectedDoctor.experience} yrs exp</span>
                  <span>💵 Rs. {selectedDoctor.fee} / visit</span>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",fontSize:14}}>
                  <span style={{color:"#f59e0b",fontSize:16}}>★★★★★</span>
                  <span style={{fontWeight:700}}>{selectedDoctor.rating}</span>
                  <span style={{color:"#888"}}>({selectedDoctor.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div style={{padding:"0 28px 24px"}}>
              {[["About",<p style={{fontSize:14,color:"#555",lineHeight:1.7}}>{selectedDoctor.about}</p>],
                ["Education & Qualifications",<p style={{fontSize:14,color:"#555",lineHeight:1.7}}>{selectedDoctor.education}</p>],
                ["Languages",<div style={{display:"flex",gap:8}}>{selectedDoctor.languages.map(l=><span key={l} style={s.cardTag}>{l}</span>)}</div>]
              ].map(([title,content])=>(
                <div key={title} style={{paddingTop:20,marginTop:20,borderTop:"1px solid #f3f4f6"}}>
                  <div style={{fontSize:15,fontWeight:700,marginBottom:10}}>{title}</div>
                  {content}
                </div>
              ))}
              <div style={{paddingTop:20,marginTop:20,borderTop:"1px solid #f3f4f6"}}>
                <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>Select a Time Slot</div>
                <div style={s.pmDays}>
                  {days.map((d,i)=>(
                    <button key={i} onClick={()=>setSelectedDay(i)} style={{...s.pmDayBtn,...(selectedDay===i?s.pmDayBtnActive:{})}}>
                      <div style={{fontWeight:600}}>{d.label}</div><div style={{fontSize:12}}>{d.date}</div>
                    </button>
                  ))}
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {selectedDoctor.slots.map(slot=>(
                    <button key={slot} className="slot-btn" style={{...s.slotBtn,...(selectedSlot===slot?{background:PRIMARY,color:"#fff",borderColor:PRIMARY}:{})}} onClick={()=>setSelectedSlot(slot)}>{slot}</button>
                  ))}
                </div>
              </div>
              <div style={{paddingTop:20,marginTop:20,borderTop:"1px solid #f3f4f6"}}>
                <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>Patient Reviews</div>
                {sampleReviews.map((r,i)=>(
                  <div key={i} style={{background:"#f9fafb",borderRadius:10,padding:14,marginBottom:10}}>
                    <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:6}}>
                      <span style={{fontWeight:700,fontSize:14}}>{r.name}</span>
                      <span style={{color:"#f59e0b"}}>{"★".repeat(r.rating)}</span>
                      <span style={{color:"#aaa",fontSize:12,marginLeft:"auto"}}>{r.date}</span>
                    </div>
                    <p style={{fontSize:13,color:"#555",lineHeight:1.6}}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{padding:"16px 28px",borderTop:"1px solid #f0f0f0"}}>
              <button className="book-btn-main" style={{...s.bookBtnMain,width:"100%",padding:"14px 0",fontSize:16}} onClick={()=>openBooking(selectedDoctor,selectedSlot)}>
                Book Appointment {selectedSlot?`at ${selectedSlot}`:""}→
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingDoctor&&(
        <div style={s.overlay} onClick={closeAll}>
          <div style={s.bookingModal} onClick={e=>e.stopPropagation()}>
            <button style={s.modalClose} onClick={closeAll}>✕</button>
            {!confirmed?(
              <>
                <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:24,paddingBottom:20,borderBottom:"1px solid #f0f0f0"}}>
                  <div style={{...s.pmAvatar,width:52,height:52,background:bookingDoctor.color}}>{bookingDoctor.photo}</div>
                  <div>
                    <div style={{fontSize:17,fontWeight:700}}>{bookingDoctor.name}</div>
                    <div style={{color:bookingDoctor.color,fontWeight:600,fontSize:14}}>{bookingDoctor.specialty}</div>
                    <div style={{color:"#888",fontSize:13}}>📍 {bookingDoctor.location}</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:24}}>
                  {["Time","Details","Confirm"].map((step,i)=>(
                    <div key={step} style={{display:"flex",alignItems:"center"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:bookingStep>=i?PRIMARY:"#e5e7eb",color:bookingStep>=i?"#fff":"#aaa",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>
                        {bookingStep>i?"✓":i+1}
                      </div>
                      <span style={{fontSize:12,marginLeft:6,color:bookingStep>=i?PRIMARY:"#aaa",fontWeight:600}}>{step}</span>
                      {i<2&&<div style={{flex:1,height:2,margin:"0 8px",width:32,background:bookingStep>i?PRIMARY:"#e5e7eb"}}/>}
                    </div>
                  ))}
                </div>

                {bookingStep===0&&(
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div style={s.bmLabel}>Select a day</div>
                    <div style={s.pmDays}>
                      {days.map((d,i)=>(
                        <button key={i} onClick={()=>setSelectedDay(i)} style={{...s.pmDayBtn,...(selectedDay===i?s.pmDayBtnActive:{})}}>
                          <div style={{fontWeight:600}}>{d.label}</div><div style={{fontSize:12}}>{d.date}</div>
                        </button>
                      ))}
                    </div>
                    <div style={s.bmLabel}>Select a time</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {bookingDoctor.slots.map(slot=>(
                        <button key={slot} className="slot-btn" style={{...s.slotBtn,...(selectedSlot===slot?{background:PRIMARY,color:"#fff",borderColor:PRIMARY}:{})}} onClick={()=>setSelectedSlot(slot)}>{slot}</button>
                      ))}
                    </div>
                    <button disabled={!selectedSlot} onClick={()=>setBookingStep(1)} style={{...s.bmNextBtn,background:selectedSlot?PRIMARY:"#d1d5db",cursor:selectedSlot?"pointer":"not-allowed"}}>Continue →</button>
                  </div>
                )}

                {bookingStep===1&&(
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div style={s.bmLabel}>Your full name *</div>
                    <input style={s.bmInput} placeholder="e.g. Ahmed Khan" value={patientName} onChange={e=>setPatientName(e.target.value)}/>
                    <div style={s.bmLabel}>Phone / WhatsApp *</div>
                    <input style={s.bmInput} placeholder="+92 3XX XXXXXXX" value={patientPhone} onChange={e=>setPatientPhone(e.target.value)}/>
                    <div style={s.bmLabel}>Reason for visit (optional)</div>
                    <textarea style={{...s.bmInput,resize:"vertical"}} placeholder="Briefly describe your symptoms..." value={patientReason} onChange={e=>setPatientReason(e.target.value)} rows={3}/>
                    <div style={{display:"flex",gap:10}}>
                      <button onClick={()=>setBookingStep(0)} style={s.bmBackBtn}>← Back</button>
                      <button disabled={!patientName||!patientPhone} onClick={()=>setBookingStep(2)} style={{...s.bmNextBtn,flex:2,background:patientName&&patientPhone?PRIMARY:"#d1d5db",cursor:patientName&&patientPhone?"pointer":"not-allowed"}}>Review Booking →</button>
                    </div>
                  </div>
                )}

                {bookingStep===2&&(
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    <div style={{background:"#f9fafb",borderRadius:12,padding:18,border:"1px solid #e8e8e8"}}>
                      <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>Appointment Summary</div>
                      {[["Doctor",bookingDoctor.name],["Specialty",bookingDoctor.specialty],["Location",bookingDoctor.address],["Date",days[selectedDay]?.date+" ("+days[selectedDay]?.label+")"],["Time",selectedSlot],["Fee","Rs. "+bookingDoctor.fee],["Patient",patientName],["WhatsApp",patientPhone]].map(([k,v])=>(
                        <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:14,paddingBottom:10,marginBottom:10,borderBottom:"1px solid #f0f0f0"}}>
                          <span style={{color:"#888"}}>{k}</span>
                          <span style={{fontWeight:600,textAlign:"right",maxWidth:"60%"}}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{fontSize:13,color:"#888"}}>By confirming, you agree to arrive 10 minutes before your appointment time.</p>
                    <div style={{display:"flex",gap:10}}>
                      <button onClick={()=>setBookingStep(1)} style={s.bmBackBtn}>← Back</button>
                      <button className="book-btn-main" onClick={()=>setConfirmed(true)} style={{...s.bmNextBtn,flex:2,background:PRIMARY}}>Confirm Booking ✓</button>
                    </div>
                  </div>
                )}
              </>
            ):(
              <div style={{textAlign:"center",padding:"16px 0"}}>
                <div style={{fontSize:56,marginBottom:16}}>🎉</div>
                <h2 style={{fontSize:26,fontWeight:700,marginBottom:10}}>You're all set!</h2>
                <p style={{fontSize:15,color:"#555",marginBottom:20}}>Your appointment with <b>{bookingDoctor.name}</b> is confirmed.</p>
                <div style={{background:"#f0faf9",borderRadius:12,padding:18,marginBottom:16,border:`1px solid ${PRIMARY}22`,display:"flex",flexDirection:"column",gap:10}}>
                  <div style={{display:"flex",gap:10,fontSize:14,color:"#444",alignItems:"center"}}><span>📅</span><span>{days[selectedDay]?.date} at {selectedSlot}</span></div>
                  <div style={{display:"flex",gap:10,fontSize:14,color:"#444",alignItems:"center"}}><span>📍</span><span>{bookingDoctor.address}</span></div>
                  <div style={{display:"flex",gap:10,fontSize:14,color:"#444",alignItems:"center"}}><span>💵</span><span>Rs. {bookingDoctor.fee} — pay at clinic</span></div>
                </div>
                <p style={{fontSize:13,color:"#888",marginBottom:16}}>📱 A WhatsApp confirmation will be sent to <b>{patientPhone}</b></p>
                <button className="book-btn-main" style={{...s.bmNextBtn,background:PRIMARY}} onClick={closeAll}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  root:{fontFamily:"'DM Sans',sans-serif",background:"#fff",color:"#1a1a1a",minHeight:"100vh"},
  nav:{background:"#fff",borderBottom:"1px solid #e8e8e8",position:"sticky",top:0,zIndex:100},
  navInner:{maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",gap:32},
  logo:{display:"flex",alignItems:"center",gap:10},
  logoText:{fontSize:20,fontWeight:700,letterSpacing:"-0.3px"},
  logoAccent:{color:PRIMARY},
  navCenter:{display:"flex",gap:4,marginLeft:16},
  navLink:{padding:"8px 14px",borderRadius:8,textDecoration:"none",color:"#555",fontSize:15,fontWeight:500,transition:"color 0.15s"},
  navRight:{marginLeft:"auto",display:"flex",alignItems:"center",gap:12},
  navLinkOutline:{padding:"8px 16px",border:`1.5px solid ${PRIMARY}`,borderRadius:8,color:PRIMARY,textDecoration:"none",fontSize:14,fontWeight:600},
  navBtn:{padding:"8px 20px",background:PRIMARY,color:"#fff",border:"none",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer"},
  hero:{background:"linear-gradient(135deg,#f0faf9 0%,#e8f4f3 50%,#f5f9ff 100%)",padding:"80px 24px 70px",display:"flex",alignItems:"center",justifyContent:"center",gap:60,flexWrap:"wrap"},
  heroInner:{maxWidth:540},
  heroBadge:{display:"inline-block",background:"#fff",border:`1px solid ${PRIMARY}33`,color:PRIMARY,padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:600,marginBottom:20},
  heroH1:{fontSize:"clamp(34px,5vw,52px)",fontWeight:700,lineHeight:1.15,marginBottom:16,letterSpacing:"-1px",fontFamily:"'DM Serif Display',serif"},
  heroSub:{fontSize:17,color:"#555",lineHeight:1.7,marginBottom:32},
  searchBox:{background:"#fff",borderRadius:16,display:"flex",alignItems:"center",boxShadow:`0 4px 32px rgba(0,133,124,0.12)`,border:"1.5px solid #e0f0ef",marginBottom:20,overflow:"hidden"},
  searchField:{flex:1,display:"flex",alignItems:"center",padding:"0 16px"},
  searchFieldIcon:{fontSize:16,marginRight:10,flexShrink:0},
  searchInput:{flex:1,border:"none",outline:"none",fontSize:15,padding:"16px 0",background:"transparent"},
  searchDivider:{width:1,height:28,background:"#e8e8e8",flexShrink:0},
  searchSelect:{flex:1,border:"none",outline:"none",fontSize:15,padding:"16px 0",background:"transparent",cursor:"pointer"},
  searchBtn:{background:PRIMARY,color:"#fff",border:"none",padding:"16px 28px",fontSize:15,fontWeight:700,cursor:"pointer",flexShrink:0},
  trustRow:{display:"flex",gap:16,flexWrap:"wrap"},
  trustBadge:{fontSize:13,color:"#555",fontWeight:500},
  heroRight:{position:"relative",width:280,flexShrink:0},
  heroFloatCard:{background:"#fff",borderRadius:16,padding:20,boxShadow:"0 8px 40px rgba(0,0,0,0.1)",border:"1px solid #e8e8e8"},
  hfcTop:{display:"flex",gap:12,alignItems:"center",marginBottom:16},
  hfcAvatar:{width:48,height:48,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:15,flexShrink:0},
  hfcName:{fontWeight:700,fontSize:14},
  hfcSpec:{fontSize:12,color:"#888",marginTop:2},
  hfcStars:{color:"#f59e0b",fontSize:13,marginTop:2},
  hfcBadge:{marginLeft:"auto",background:PRIMARY_LIGHT,color:PRIMARY,fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:10,flexShrink:0},
  hfcSlots:{display:"flex",gap:8},
  hfcSlot:{flex:1,background:PRIMARY_LIGHT,color:PRIMARY,borderRadius:8,padding:"8px 4px",fontSize:12,fontWeight:600,textAlign:"center",border:`1px solid ${PRIMARY}33`},
  heroStat1:{position:"absolute",top:-20,right:-20,background:"#fff",borderRadius:12,padding:"12px 16px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",textAlign:"center",border:"1px solid #e8e8e8"},
  heroStat2:{position:"absolute",bottom:-16,left:-16,background:"#fff",borderRadius:12,padding:"12px 16px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",textAlign:"center",border:"1px solid #e8e8e8"},
  heroStatNum:{fontSize:20,fontWeight:700,color:PRIMARY},
  heroStatLbl:{fontSize:11,color:"#888",marginTop:2},
  specSection:{borderBottom:"1px solid #f0f0f0",padding:"24px 24px"},
  specInner:{maxWidth:1200,margin:"0 auto"},
  specLabel:{fontSize:13,fontWeight:600,color:"#888",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:14},
  specRow:{display:"flex",gap:10,flexWrap:"wrap"},
  specPill:{display:"flex",alignItems:"center",gap:7,padding:"9px 18px",borderRadius:24,border:"1.5px solid #e8e8e8",background:"#fff",cursor:"pointer",fontSize:14,color:"#444",fontWeight:500,transition:"all 0.15s"},
  specPillActive:{background:PRIMARY_LIGHT,borderColor:PRIMARY,color:PRIMARY,fontWeight:600},
  results:{padding:"40px 24px 64px"},
  resultsInner:{maxWidth:1200,margin:"0 auto"},
  resultsHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28},
  resultsTitle:{fontSize:24,fontWeight:700,marginBottom:4},
  resultsSub:{fontSize:14,color:"#888"},
  sortSelect:{padding:"10px 16px",border:"1.5px solid #e8e8e8",borderRadius:8,fontSize:14,background:"#fff",cursor:"pointer",outline:"none"},
  cardList:{display:"flex",flexDirection:"column",gap:16},
  card:{background:"#fff",border:"1.5px solid #e8e8e8",borderRadius:16,padding:24,display:"flex",gap:24,alignItems:"flex-start",transition:"transform 0.15s,box-shadow 0.15s",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},
  cardLeft:{flex:1,display:"flex",gap:18},
  cardAvatar:{width:72,height:72,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:20,flexShrink:0},
  cardName:{fontSize:18,fontWeight:700},
  todayBadge:{background:"#ecfdf5",color:"#059669",fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:10},
  cardMeta:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:8,fontSize:13,color:"#666"},
  cardRatingRow:{display:"flex",alignItems:"center",gap:6,marginBottom:10},
  cardTags:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},
  cardTag:{background:"#f3f4f6",color:"#555",fontSize:12,fontWeight:600,padding:"4px 10px",borderRadius:8},
  cardFee:{marginLeft:"auto",fontWeight:700,color:"#1a1a1a",fontSize:14,background:"#f9fafb",padding:"4px 12px",borderRadius:8,border:"1px solid #e8e8e8"},
  cardRight:{width:240,flexShrink:0,borderLeft:"1px solid #f0f0f0",paddingLeft:24},
  cardSlotTitle:{fontSize:12,fontWeight:600,color:"#888",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:10},
  slotBtn:{padding:"8px 12px",borderRadius:8,border:`1.5px solid ${PRIMARY}33`,background:PRIMARY_LIGHT,color:PRIMARY,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.15s"},
  profileBtn:{padding:"10px 0",borderRadius:8,border:"1.5px solid #e8e8e8",background:"#fff",fontSize:14,fontWeight:600,color:"#444",cursor:"pointer",transition:"background 0.15s"},
  bookBtnMain:{padding:"10px 0",borderRadius:8,border:"none",background:PRIMARY,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",transition:"background 0.15s"},
  howSection:{background:"#f8fffe",padding:"80px 24px",borderTop:"1px solid #e8f4f3"},
  howInner:{maxWidth:900,margin:"0 auto",textAlign:"center"},
  howTitle:{fontSize:32,fontWeight:700,marginBottom:10,fontFamily:"'DM Serif Display',serif"},
  howSub:{color:"#888",fontSize:16,marginBottom:48},
  howGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:24},
  howCard:{background:"#fff",borderRadius:16,padding:28,border:"1px solid #e8f4f3",textAlign:"left"},
  howNum:{fontSize:12,fontWeight:700,color:PRIMARY,textTransform:"uppercase",letterSpacing:"1px",marginBottom:12},
  howCardTitle:{fontSize:18,fontWeight:700,marginBottom:10},
  howCardDesc:{fontSize:14,color:"#666",lineHeight:1.65},
  docCta:{padding:"80px 24px",background:"#fff",borderTop:"1px solid #e8e8e8"},
  docCtaInner:{maxWidth:1000,margin:"0 auto",display:"flex",gap:60,alignItems:"center",flexWrap:"wrap"},
  docCtaBadge:{display:"inline-block",background:PRIMARY_LIGHT,color:PRIMARY,padding:"5px 14px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:16,textTransform:"uppercase",letterSpacing:"0.5px"},
  docCtaTitle:{fontSize:30,fontWeight:700,marginBottom:14,fontFamily:"'DM Serif Display',serif"},
  docCtaBtn:{background:PRIMARY,color:"#fff",border:"none",padding:"14px 28px",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer"},
  docCtaStat:{background:"#f8fffe",borderRadius:14,padding:"20px 24px",border:"1px solid #e8f4f3",textAlign:"center"},
  docCtaStatNum:{fontSize:26,fontWeight:700,color:PRIMARY,marginBottom:4},
  footer:{background:"#1a1a2e",color:"#fff",padding:"56px 24px 32px"},
  footerTop:{display:"flex",gap:48,justifyContent:"space-between",marginBottom:40,flexWrap:"wrap"},
  footerLinks:{display:"flex",gap:48,flexWrap:"wrap"},
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(4px)"},
  modalClose:{position:"absolute",top:16,right:16,background:"#f3f4f6",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"},
  profileModal:{background:"#fff",borderRadius:20,width:"100%",maxWidth:640,maxHeight:"90vh",overflowY:"auto",position:"relative",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"},
  pmHeader:{display:"flex",gap:20,alignItems:"center",padding:"28px 28px 20px",borderBottom:"1px solid #f0f0f0"},
  pmAvatar:{width:72,height:72,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:22,flexShrink:0},
  pmDays:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"},
  pmDayBtn:{flex:1,minWidth:70,padding:"10px 8px",borderRadius:10,border:"1.5px solid #e8e8e8",background:"#f9fafb",cursor:"pointer",textAlign:"center",fontSize:13,color:"#444"},
  pmDayBtnActive:{background:PRIMARY_LIGHT,borderColor:PRIMARY,color:PRIMARY,fontWeight:700},
  bookingModal:{background:"#fff",borderRadius:20,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",position:"relative",boxShadow:"0 24px 80px rgba(0,0,0,0.2)",padding:28},
  bmLabel:{fontSize:13,fontWeight:600,color:"#555"},
  bmInput:{padding:"12px 14px",borderRadius:10,border:"1.5px solid #e5e7eb",fontSize:15,outline:"none",width:"100%"},
  bmNextBtn:{padding:"13px 0",borderRadius:10,border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",width:"100%",transition:"background 0.15s"},
  bmBackBtn:{flex:1,padding:"13px 0",borderRadius:10,border:"1.5px solid #e5e7eb",background:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",color:"#555"},
};
