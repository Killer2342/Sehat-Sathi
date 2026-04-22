import { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Noor",
    specialty: "Gynecologist",
    location: "Bannu Medical Complex",
    city: "Bannu",
    fee: "Rs. 800",
    experience: "12 years",
    gender: "Female",
    rating: 4.9,
    reviews: 142,
    available: "Mon–Sat, 9am–2pm",
    photo: "AN",
    color: "#e8f4f0",
    accent: "#2d7a5f",
    tags: ["Female Specialist", "Top Rated"],
  },
  {
    id: 2,
    name: "Dr. Imran Khattak",
    specialty: "Cardiologist",
    location: "DHQ Hospital",
    city: "Bannu",
    fee: "Rs. 1200",
    experience: "18 years",
    gender: "Male",
    rating: 4.8,
    reviews: 98,
    available: "Mon–Fri, 3pm–7pm",
    photo: "IK",
    color: "#eef2fb",
    accent: "#2b4fa3",
    tags: ["Heart Specialist", "FCPS"],
  },
  {
    id: 3,
    name: "Dr. Sana Malik",
    specialty: "Dermatologist",
    location: "Skin & Care Clinic",
    city: "Peshawar",
    fee: "Rs. 1000",
    experience: "9 years",
    gender: "Female",
    rating: 4.7,
    reviews: 211,
    available: "Tue–Sun, 11am–4pm",
    photo: "SM",
    color: "#fef4ec",
    accent: "#c4621a",
    tags: ["Skin Expert", "Laser Treatments"],
  },
  {
    id: 4,
    name: "Dr. Tariq Hussain",
    specialty: "General Physician",
    location: "Al-Shifa Clinic",
    city: "Bannu",
    fee: "Rs. 500",
    experience: "22 years",
    gender: "Male",
    rating: 4.6,
    reviews: 324,
    available: "Daily, 8am–1pm",
    photo: "TH",
    color: "#f3f0fb",
    accent: "#5e35b1",
    tags: ["Highly Experienced", "Family Doctor"],
  },
  {
    id: 5,
    name: "Dr. Fatima Zahra",
    specialty: "Dentist",
    location: "SmileCare Dental",
    city: "Peshawar",
    fee: "Rs. 700",
    experience: "7 years",
    gender: "Female",
    rating: 4.8,
    reviews: 87,
    available: "Mon–Sat, 10am–5pm",
    photo: "FZ",
    color: "#f0faf4",
    accent: "#1a7a4a",
    tags: ["Dental Surgery", "Braces"],
  },
  {
    id: 6,
    name: "Dr. Usman Afridi",
    specialty: "Surgeon",
    location: "KMC Hospital",
    city: "Peshawar",
    fee: "Rs. 1500",
    experience: "15 years",
    gender: "Male",
    rating: 4.9,
    reviews: 63,
    available: "Wed–Sun, 2pm–6pm",
    photo: "UA",
    color: "#fdf0f0",
    accent: "#a32b2b",
    tags: ["General Surgery", "FCPS Gold Medalist"],
  },
];

const specialties = ["All", "General Physician", "Cardiologist", "Dermatologist", "Gynecologist", "Dentist", "Surgeon"];
const cities = ["All Cities", "Bannu", "Peshawar"];
const genders = ["Any Gender", "Male", "Female"];

const steps = ["Select Date", "Select Time", "Confirm"];
const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

export default function SehatSaathi() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [city, setCity] = useState("All Cities");
  const [gender, setGender] = useState("Any Gender");
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [expandedDoctor, setExpandedDoctor] = useState(null);

  const filtered = doctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = specialty === "All" || d.specialty === specialty;
    const matchCity = city === "All Cities" || d.city === city;
    const matchGender = gender === "Any Gender" || d.gender === gender;
    return matchSearch && matchSpecialty && matchCity && matchGender;
  });

  const handleBook = (doc) => {
    setBookingDoctor(doc);
    setBookingStep(0);
    setSelectedDate("");
    setSelectedTime("");
    setPatientName("");
    setPatientPhone("");
    setConfirmed(false);
  };

  const closeModal = () => {
    setBookingDoctor(null);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    if (patientName && patientPhone) setConfirmed(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={styles.root}>
      {/* Decorative background */}
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚕</span>
            <span style={styles.logoText}>Sehat<span style={styles.logoAccent}>Saathi</span></span>
          </div>
          <div style={styles.navLinks}>
            {["home", "doctors", "about"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                style={{ ...styles.navLink, ...(activeNav === item ? styles.navLinkActive : {}) }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <button style={styles.navCta}>For Doctors →</button>
        </div>
      </nav>

      {/* Hero */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🏥 Bannu & Peshawar's Trusted Doctor Platform</div>
          <h1 style={styles.heroTitle}>
            Find the Right Doctor,<br />
            <span style={styles.heroTitleAccent}>Book in Minutes.</span>
          </h1>
          <p style={styles.heroSub}>
            Verified doctors across all specialties. Real reviews. Easy online appointments — no waiting in queues.
          </p>
          <div style={styles.heroStats}>
            {[["50+", "Doctors"], ["2 Cities", "Covered"], ["1,200+", "Bookings"], ["4.8★", "Avg Rating"]].map(([val, lbl]) => (
              <div key={lbl} style={styles.heroStat}>
                <span style={styles.heroStatVal}>{val}</span>
                <span style={styles.heroStatLbl}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.heroIllustration}>
          <div style={styles.heroCard}>
            <div style={styles.heroCardAvatar}>👨‍⚕️</div>
            <div>
              <div style={styles.heroCardName}>Dr. Imran Khattak</div>
              <div style={styles.heroCardSpec}>Cardiologist · DHQ Bannu</div>
              <div style={styles.heroCardRating}>★★★★★ 4.8 · 98 reviews</div>
            </div>
            <div style={styles.heroCardBadge}>Available Today</div>
          </div>
          <div style={styles.heroCardSmall}>
            <span style={styles.heroCardSmallIcon}>📅</span>
            <span>Next slot: <b>3:00 PM</b></span>
          </div>
        </div>
      </header>

      {/* Specialty Pills */}
      <section style={styles.specialtyRow}>
        {[
          ["🫀", "Cardiologist"],
          ["🦷", "Dentist"],
          ["🧴", "Dermatologist"],
          ["👩‍⚕️", "Gynecologist"],
          ["💊", "General Physician"],
          ["🔪", "Surgeon"],
        ].map(([icon, sp]) => (
          <button
            key={sp}
            style={{ ...styles.specialtyPill, ...(specialty === sp ? styles.specialtyPillActive : {}) }}
            onClick={() => setSpecialty(specialty === sp ? "All" : sp)}
          >
            <span style={styles.specialtyIcon}>{icon}</span>
            <span>{sp}</span>
          </button>
        ))}
      </section>

      {/* Search & Filters */}
      <section style={styles.searchSection}>
        <div style={styles.searchBar}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search by doctor name, specialty, or clinic…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={styles.filters}>
          <select style={styles.select} value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select style={styles.select} value={gender} onChange={(e) => setGender(e.target.value)}>
            {genders.map((g) => <option key={g}>{g}</option>)}
          </select>
          <button style={styles.clearBtn} onClick={() => { setSearch(""); setSpecialty("All"); setCity("All Cities"); setGender("Any Gender"); }}>
            Clear Filters
          </button>
        </div>
      </section>

      {/* Doctor Cards */}
      <section style={styles.doctorGrid}>
        <div style={styles.resultsMeta}>
          <span style={styles.resultsCount}>{filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found</span>
          {specialty !== "All" && <span style={styles.resultsTag}>{specialty}</span>}
          {city !== "All Cities" && <span style={styles.resultsTag}>{city}</span>}
        </div>

        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🔭</div>
            <div style={styles.emptyText}>No doctors found. Try adjusting your filters.</div>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((doc) => (
              <div
                key={doc.id}
                style={{ ...styles.card, background: doc.color, borderColor: doc.accent + "33" }}
              >
                {/* Card Header */}
                <div style={styles.cardHeader}>
                  <div style={{ ...styles.avatar, background: doc.accent, color: "#fff" }}>
                    {doc.photo}
                  </div>
                  <div style={styles.cardInfo}>
                    <div style={styles.cardName}>{doc.name}</div>
                    <div style={{ ...styles.cardSpec, color: doc.accent }}>{doc.specialty}</div>
                    <div style={styles.cardLocation}>📍 {doc.location}, {doc.city}</div>
                  </div>
                  <div style={styles.cardRating}>
                    <span style={styles.ratingNum}>{doc.rating}</span>
                    <span style={styles.ratingStar}>★</span>
                    <span style={styles.reviewCount}>{doc.reviews} reviews</span>
                  </div>
                </div>

                {/* Tags */}
                <div style={styles.tagRow}>
                  {doc.tags.map((t) => (
                    <span key={t} style={{ ...styles.tag, color: doc.accent, background: doc.accent + "15", border: `1px solid ${doc.accent}33` }}>{t}</span>
                  ))}
                </div>

                {/* Details */}
                <div style={styles.cardDetails}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>💼</span>
                    <span>{doc.experience} experience</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>🕐</span>
                    <span>{doc.available}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailIcon}>💵</span>
                    <span style={styles.fee}>{doc.fee} / visit</span>
                  </div>
                </div>

                {/* Expand reviews */}
                {expandedDoctor === doc.id && (
                  <div style={styles.reviewBox}>
                    <div style={styles.reviewItem}><b>Hina K.</b> — "Very professional and caring doctor."</div>
                    <div style={styles.reviewItem}><b>Asad M.</b> — "Explained everything clearly. Highly recommended!"</div>
                    <div style={styles.reviewItem}><b>Zainab R.</b> — "Easy to book, no long wait. Great experience."</div>
                  </div>
                )}

                {/* Actions */}
                <div style={styles.cardActions}>
                  <button
                    style={styles.reviewsBtn}
                    onClick={() => setExpandedDoctor(expandedDoctor === doc.id ? null : doc.id)}
                  >
                    {expandedDoctor === doc.id ? "Hide Reviews" : "View Reviews"}
                  </button>
                  <button
                    style={{ ...styles.bookBtn, background: doc.accent }}
                    onClick={() => handleBook(doc)}
                  >
                    Book Appointment →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <p style={styles.sectionSub}>Book your appointment in 3 simple steps</p>
        <div style={styles.howGrid}>
          {[
            ["🔍", "Search", "Find doctors by specialty, city, or symptoms. Filter by gender and availability."],
            ["📅", "Book", "Choose your preferred date and time slot. No phone calls needed."],
            ["✅", "Confirm", "Get instant confirmation. Receive WhatsApp reminder before your appointment."],
          ].map(([icon, title, desc]) => (
            <div key={title} style={styles.howCard}>
              <div style={styles.howIcon}>{icon}</div>
              <h3 style={styles.howTitle}>{title}</h3>
              <p style={styles.howDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA for doctors */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <div style={styles.ctaLeft}>
            <h2 style={styles.ctaTitle}>Are you a Doctor?</h2>
            <p style={styles.ctaSub}>Join SehatSaathi and reach hundreds of patients in Bannu & Peshawar. Verified profiles, easy appointment management, and grow your practice online.</p>
            <div style={styles.ctaPoints}>
              {["✓ Free profile setup", "✓ Online appointment management", "✓ Build your online reputation", "✓ Reach local patients instantly"].map((p) => (
                <span key={p} style={styles.ctaPoint}>{p}</span>
              ))}
            </div>
            <button style={styles.ctaBtn}>Join as a Doctor — It's Free</button>
          </div>
          <div style={styles.ctaRight}>
            <div style={styles.ctaStatBox}>
              <div style={styles.ctaStat}><span style={styles.ctaStatNum}>50+</span><span>Doctors Listed</span></div>
              <div style={styles.ctaStat}><span style={styles.ctaStatNum}>1,200+</span><span>Appointments Booked</span></div>
              <div style={styles.ctaStat}><span style={styles.ctaStatNum}>2</span><span>Cities Active</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <span style={styles.logoIcon}>⚕</span>
            <span style={styles.logoText}>Sehat<span style={styles.logoAccent}>Saathi</span></span>
          </div>
          <p style={styles.footerTag}>Connecting patients with trusted doctors across KPK</p>
          <div style={styles.footerLinks}>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Contact Us</span>
            <span>For Doctors</span>
          </div>
          <p style={styles.footerCopy}>© 2025 SehatSaathi · Made with ❤️ for Bannu & Peshawar</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingDoctor && (
        <div style={styles.overlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>✕</button>

            {!confirmed ? (
              <>
                {/* Modal Header */}
                <div style={styles.modalHeader}>
                  <div style={{ ...styles.modalAvatar, background: bookingDoctor.accent }}>
                    {bookingDoctor.photo}
                  </div>
                  <div>
                    <div style={styles.modalDocName}>{bookingDoctor.name}</div>
                    <div style={{ color: bookingDoctor.accent, fontWeight: 600 }}>{bookingDoctor.specialty}</div>
                    <div style={styles.modalDocLoc}>📍 {bookingDoctor.location}</div>
                  </div>
                </div>

                {/* Steps */}
                <div style={styles.stepBar}>
                  {steps.map((s, i) => (
                    <div key={s} style={styles.stepItem}>
                      <div style={{ ...styles.stepCircle, background: i <= bookingStep ? bookingDoctor.accent : "#e5e7eb", color: i <= bookingStep ? "#fff" : "#9ca3af" }}>
                        {i < bookingStep ? "✓" : i + 1}
                      </div>
                      <span style={{ ...styles.stepLabel, color: i <= bookingStep ? bookingDoctor.accent : "#9ca3af" }}>{s}</span>
                      {i < steps.length - 1 && <div style={{ ...styles.stepLine, background: i < bookingStep ? bookingDoctor.accent : "#e5e7eb" }} />}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                {bookingStep === 0 && (
                  <div style={styles.stepContent}>
                    <label style={styles.fieldLabel}>Select a Date</label>
                    <input
                      type="date"
                      min={today}
                      style={styles.dateInput}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button
                      style={{ ...styles.nextBtn, background: selectedDate ? bookingDoctor.accent : "#d1d5db", cursor: selectedDate ? "pointer" : "not-allowed" }}
                      disabled={!selectedDate}
                      onClick={() => setBookingStep(1)}
                    >
                      Next →
                    </button>
                  </div>
                )}

                {bookingStep === 1 && (
                  <div style={styles.stepContent}>
                    <label style={styles.fieldLabel}>Available Time Slots</label>
                    <div style={styles.timeGrid}>
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          style={{ ...styles.timeSlot, ...(selectedTime === t ? { background: bookingDoctor.accent, color: "#fff", borderColor: bookingDoctor.accent } : {}) }}
                          onClick={() => setSelectedTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div style={styles.stepBtns}>
                      <button style={styles.backBtn} onClick={() => setBookingStep(0)}>← Back</button>
                      <button
                        style={{ ...styles.nextBtn, background: selectedTime ? bookingDoctor.accent : "#d1d5db", cursor: selectedTime ? "pointer" : "not-allowed" }}
                        disabled={!selectedTime}
                        onClick={() => setBookingStep(2)}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div style={styles.stepContent}>
                    <div style={styles.summaryBox}>
                      <div style={styles.summaryRow}><span>Doctor</span><b>{bookingDoctor.name}</b></div>
                      <div style={styles.summaryRow}><span>Date</span><b>{selectedDate}</b></div>
                      <div style={styles.summaryRow}><span>Time</span><b>{selectedTime}</b></div>
                      <div style={styles.summaryRow}><span>Fee</span><b>{bookingDoctor.fee}</b></div>
                    </div>
                    <label style={styles.fieldLabel}>Your Name</label>
                    <input
                      style={styles.textInput}
                      placeholder="Enter your full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                    <label style={styles.fieldLabel}>Phone / WhatsApp</label>
                    <input
                      style={styles.textInput}
                      placeholder="+92 3XX XXXXXXX"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                    />
                    <div style={styles.stepBtns}>
                      <button style={styles.backBtn} onClick={() => setBookingStep(1)}>← Back</button>
                      <button
                        style={{ ...styles.nextBtn, background: patientName && patientPhone ? bookingDoctor.accent : "#d1d5db", cursor: patientName && patientPhone ? "pointer" : "not-allowed" }}
                        disabled={!patientName || !patientPhone}
                        onClick={handleConfirm}
                      >
                        Confirm Booking ✓
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={styles.successBox}>
                <div style={styles.successIcon}>🎉</div>
                <h2 style={styles.successTitle}>Booking Confirmed!</h2>
                <p style={styles.successText}>Your appointment with <b>{bookingDoctor.name}</b> is booked for <b>{selectedDate}</b> at <b>{selectedTime}</b>.</p>
                <p style={styles.successText}>A WhatsApp confirmation will be sent to <b>{patientPhone}</b>.</p>
                <div style={styles.successDetail}>
                  <span>📍 {bookingDoctor.location}</span>
                  <span>💵 {bookingDoctor.fee}</span>
                </div>
                <button style={{ ...styles.nextBtn, background: bookingDoctor.accent, marginTop: 24 }} onClick={closeModal}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#f8f7f4",
    minHeight: "100vh",
    color: "#1a1a2e",
    position: "relative",
    overflowX: "hidden",
  },
  bgDecor1: {
    position: "fixed",
    top: -120,
    right: -120,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, #e8f4f0 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgDecor2: {
    position: "fixed",
    bottom: -100,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, #eef2fb 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  // Nav
  nav: {
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #e8e8e0",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  logo: { display: "flex", alignItems: "center", gap: 8, marginRight: "auto" },
  logoIcon: { fontSize: 22 },
  logoText: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#1a1a2e" },
  logoAccent: { color: "#2d7a5f" },
  navLinks: { display: "flex", gap: 8 },
  navLink: { background: "none", border: "none", padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 15, color: "#555", fontFamily: "inherit" },
  navLinkActive: { background: "#f0faf4", color: "#2d7a5f", fontWeight: 600 },
  navCta: { background: "#1a1a2e", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 20, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" },
  // Hero
  hero: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "70px 24px 50px",
    display: "flex",
    gap: 48,
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  heroContent: { flex: 1 },
  heroBadge: {
    display: "inline-block",
    background: "#e8f4f0",
    color: "#2d7a5f",
    border: "1px solid #b8ddd4",
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 18,
    color: "#1a1a2e",
    letterSpacing: "-1px",
  },
  heroTitleAccent: { color: "#2d7a5f" },
  heroSub: { fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 480, marginBottom: 32 },
  heroStats: { display: "flex", gap: 28, flexWrap: "wrap" },
  heroStat: { display: "flex", flexDirection: "column" },
  heroStatVal: { fontSize: 22, fontWeight: 700, color: "#1a1a2e" },
  heroStatLbl: { fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" },
  heroIllustration: { width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 },
  heroCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    display: "flex",
    gap: 14,
    alignItems: "center",
    position: "relative",
    border: "1px solid #e8e8e0",
  },
  heroCardAvatar: { fontSize: 36 },
  heroCardName: { fontWeight: 700, fontSize: 15 },
  heroCardSpec: { color: "#2b4fa3", fontSize: 13, fontWeight: 600 },
  heroCardRating: { color: "#888", fontSize: 12, marginTop: 2 },
  heroCardBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "#e8f4f0",
    color: "#2d7a5f",
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 10,
  },
  heroCardSmall: {
    background: "#fff",
    border: "1px solid #e8e8e0",
    borderRadius: 12,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "#444",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  heroCardSmallIcon: { fontSize: 18 },
  // Specialty Pills
  specialtyRow: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px 32px",
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    position: "relative",
    zIndex: 1,
  },
  specialtyPill: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "9px 18px",
    borderRadius: 24,
    border: "1.5px solid #e0ddd8",
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
    fontFamily: "inherit",
    color: "#444",
    transition: "all 0.15s",
    fontWeight: 500,
  },
  specialtyPillActive: {
    background: "#1a1a2e",
    color: "#fff",
    border: "1.5px solid #1a1a2e",
  },
  specialtyIcon: { fontSize: 16 },
  // Search
  searchSection: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px 36px",
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    minWidth: 280,
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: "1.5px solid #e0ddd8",
    borderRadius: 12,
    padding: "0 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  searchIcon: { fontSize: 16, marginRight: 10, color: "#999" },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 15,
    padding: "14px 0",
    background: "transparent",
    fontFamily: "inherit",
    color: "#1a1a2e",
  },
  filters: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  select: {
    padding: "12px 16px",
    borderRadius: 10,
    border: "1.5px solid #e0ddd8",
    background: "#fff",
    fontSize: 14,
    fontFamily: "inherit",
    color: "#444",
    cursor: "pointer",
    outline: "none",
  },
  clearBtn: {
    padding: "12px 16px",
    borderRadius: 10,
    border: "1.5px solid #e0ddd8",
    background: "transparent",
    fontSize: 14,
    fontFamily: "inherit",
    color: "#888",
    cursor: "pointer",
  },
  // Doctor Grid
  doctorGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px 60px",
    position: "relative",
    zIndex: 1,
  },
  resultsMeta: { display: "flex", gap: 10, alignItems: "center", marginBottom: 20 },
  resultsCount: { fontSize: 15, color: "#555" },
  resultsTag: {
    background: "#1a1a2e",
    color: "#fff",
    padding: "3px 12px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
  },
  empty: { textAlign: "center", padding: "60px 24px" },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 17, color: "#888" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 20,
  },
  card: {
    borderRadius: 16,
    padding: 22,
    border: "1.5px solid",
    transition: "transform 0.15s, box-shadow 0.15s",
    cursor: "default",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  cardHeader: { display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 0,
    letterSpacing: "0.5px",
  },
  cardInfo: { flex: 1 },
  cardName: { fontWeight: 700, fontSize: 16, marginBottom: 2 },
  cardSpec: { fontSize: 13, fontWeight: 700, marginBottom: 3 },
  cardLocation: { fontSize: 12, color: "#777" },
  cardRating: { textAlign: "right", flexShrink: 0 },
  ratingNum: { fontSize: 18, fontWeight: 700 },
  ratingStar: { color: "#f59e0b", fontSize: 14, marginLeft: 2 },
  reviewCount: { display: "block", fontSize: 11, color: "#999", marginTop: 2 },
  tagRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 },
  tag: { fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 10 },
  cardDetails: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 },
  detailItem: { display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "#555" },
  detailIcon: { fontSize: 14 },
  fee: { fontWeight: 700, color: "#1a1a2e" },
  reviewBox: {
    background: "rgba(255,255,255,0.6)",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    border: "1px solid rgba(0,0,0,0.06)",
  },
  reviewItem: { fontSize: 13, color: "#555", marginBottom: 6, lineHeight: 1.5 },
  cardActions: { display: "flex", gap: 10 },
  reviewsBtn: {
    flex: 1,
    padding: "10px 0",
    borderRadius: 10,
    border: "1.5px solid #d0cdc8",
    background: "transparent",
    fontSize: 13,
    fontFamily: "inherit",
    cursor: "pointer",
    fontWeight: 600,
    color: "#555",
  },
  bookBtn: {
    flex: 2,
    padding: "10px 0",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    fontSize: 13,
    fontFamily: "inherit",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  // How it works
  howSection: {
    background: "#1a1a2e",
    padding: "70px 24px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  sectionTitle: { fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 10 },
  sectionSub: { color: "#9ca3af", fontSize: 16, marginBottom: 48 },
  howGrid: {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24,
  },
  howCard: {
    background: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 28,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  howIcon: { fontSize: 36, marginBottom: 14 },
  howTitle: { fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 },
  howDesc: { fontSize: 14, color: "#9ca3af", lineHeight: 1.65 },
  // CTA
  ctaSection: {
    background: "#f0faf4",
    borderTop: "1px solid #d4ede4",
    borderBottom: "1px solid #d4ede4",
    padding: "64px 24px",
    position: "relative",
    zIndex: 1,
  },
  ctaInner: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "flex",
    gap: 48,
    alignItems: "center",
    flexWrap: "wrap",
  },
  ctaLeft: { flex: 1, minWidth: 280 },
  ctaTitle: { fontSize: 30, fontWeight: 700, marginBottom: 12 },
  ctaSub: { fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 20 },
  ctaPoints: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 28 },
  ctaPoint: { fontSize: 14, color: "#2d7a5f", fontWeight: 600 },
  ctaBtn: {
    background: "#2d7a5f",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: 12,
    fontSize: 15,
    fontFamily: "inherit",
    cursor: "pointer",
    fontWeight: 700,
  },
  ctaRight: { flexShrink: 0 },
  ctaStatBox: {
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 18,
    border: "1px solid #d4ede4",
    minWidth: 200,
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  ctaStat: { display: "flex", flexDirection: "column" },
  ctaStatNum: { fontSize: 26, fontWeight: 700, color: "#2d7a5f" },
  // Footer
  footer: { background: "#1a1a2e", padding: "48px 24px 32px", position: "relative", zIndex: 1 },
  footerInner: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  footerTag: { color: "#9ca3af", fontSize: 14, margin: "10px 0 24px" },
  footerLinks: { display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 24, color: "#9ca3af", fontSize: 14, cursor: "pointer" },
  footerCopy: { color: "#6b7280", fontSize: 13 },
  // Booking Modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backdropFilter: "blur(4px)",
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    width: "100%",
    maxWidth: 460,
    position: "relative",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
  },
  modalClose: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "#f3f4f6",
    border: "none",
    borderRadius: "50%",
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  },
  modalHeader: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: "1px solid #f3f4f6",
  },
  modalAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
  },
  modalDocName: { fontSize: 17, fontWeight: 700, marginBottom: 2 },
  modalDocLoc: { fontSize: 13, color: "#888", marginTop: 3 },
  stepBar: { display: "flex", alignItems: "center", marginBottom: 28, gap: 0 },
  stepItem: { display: "flex", alignItems: "center", flex: 1, gap: 0, position: "relative" },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
    transition: "all 0.2s",
  },
  stepLabel: { fontSize: 11, fontWeight: 600, marginLeft: 6, textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" },
  stepLine: { flex: 1, height: 2, margin: "0 8px", transition: "background 0.2s" },
  stepContent: { display: "flex", flexDirection: "column", gap: 12 },
  fieldLabel: { fontSize: 13, fontWeight: 600, color: "#555", marginBottom: -4 },
  dateInput: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    color: "#1a1a2e",
  },
  timeGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 },
  timeSlot: {
    padding: "10px 6px",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    background: "#f9fafb",
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "inherit",
    fontWeight: 600,
    color: "#444",
    transition: "all 0.15s",
  },
  stepBtns: { display: "flex", gap: 10, marginTop: 4 },
  backBtn: {
    flex: 1,
    padding: "12px 0",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    fontFamily: "inherit",
    color: "#555",
  },
  nextBtn: {
    flex: 2,
    padding: "12px 0",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    fontSize: 14,
    fontFamily: "inherit",
    cursor: "pointer",
    fontWeight: 700,
    transition: "all 0.15s",
  },
  summaryBox: {
    background: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    border: "1px solid #e5e7eb",
  },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555" },
  textInput: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    color: "#1a1a2e",
  },
  successBox: { textAlign: "center", padding: "16px 0" },
  successIcon: { fontSize: 52, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: 700, marginBottom: 12 },
  successText: { fontSize: 15, color: "#555", lineHeight: 1.6, marginBottom: 8 },
  successDetail: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    fontSize: 14,
    color: "#888",
    padding: "16px 0",
    borderTop: "1px solid #f3f4f6",
    marginTop: 8,
  },
};
