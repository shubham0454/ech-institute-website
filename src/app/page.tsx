'use client';

import { useEffect } from 'react';
import './home-styles.css';
// import MembersSlider from '@/components/MembersSlider';
import CardSlider from '@/components/CardSlider';

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e: Event) {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Scroll animations using Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // Hero section - no opacity fade on scroll (removed for simplicity)
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-image">
          <img src="/assets/images/Catty.webp" alt="ECH Institute" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title animate-fade-up delay-1">ECH Institute</h1>
          <p className="hero-tagline animate-fade-up">Education, Community Building, Homesteading Ethereum!</p>
          <p className="hero-subtitle animate-fade-up delay-2">
            ECH Institute is uniquely positioned at the intersection of People, Process and Protocol. It operates to support Ethereum&apos;s governance participation, and protocol‑coordination infrastructure. As a neutral public good, it ensures the protocol remains accessible and decentralized as it scales.
          </p>
          <div className="hero-buttons animate-fade-up delay-3">
            <a href="#mission" className="btn btn-primary">Learn More</a>
            <a href="#involved" className="btn btn-outline">Get Involved</a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section" id="mission">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-center">Our Mission</h2>
            <p className="section-subtitle text-center">
              ECH Institute supports Ethereum&apos;s protocol governance and coordination as a neutral public good. By strengthening processes, participation, and shared understanding, we help Ethereum scale responsibly, transparently, and sustainably as global public infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section id="role" className="role-section">
        <div className="container">
          <div className="text-center role-header">
            <h2 className="role-main-title">Our Role in the Ethereum Ecosystem</h2>
            <p className="role-intro-text">
              Ethereum does not have a central authority. Decisions emerge through open processes involving
              core developers, researchers, client teams, and the broader community.
            </p>
          </div>

          <div className="role-cards-container">
            <div className="role-card">
              <h3 className="role-card-title">Governance Operations</h3>
              <p className="role-card-description">Supporting transparency and operational excellence in Ethereum governance</p>
            </div>
            <div className="role-card">
              <h3 className="role-card-title">EIP Standardization</h3>
              <p className="role-card-description">Long-term stewardship of the Ethereum Improvement Proposal process</p>
            </div>
            <div className="role-card">
              <h3 className="role-card-title">Protocol Translation</h3>
              <p className="role-card-description">Enabling institutional stakeholders to make informed, confident decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <section>
        <div className="role-focus-box">
          <h3 className="role-focus-title">We Double Down On</h3>
          <div className="container-fluid">
            <div className="row role-focus-grid">
              {/* Left Column - Cards and Footer (col-10) */}
              <div className="col-12 col-md-10 role-focus-content-column">
                <div className="row">
                  {/* First Column of Cards */}
                  <div className="col-12 col-md-6 role-focus-column">
                    <div className="role-focus-item">
                      <span className="check-icon-large">✓</span>
                      <div>
                        <h4 className="role-focus-item-title">Process Clarity as Public Infrastructure</h4>
                        <p className="role-focus-item-desc">Strengthening how Ethereum governs itself</p>
                      </div>
                    </div>
                    <div className="role-focus-item">
                      <span className="check-icon-large">✓</span>
                      <div>
                        <h4 className="role-focus-item-title">Long-term EIP Stewardship</h4>
                        <p className="role-focus-item-desc">Documentation, review, and standardization</p>
                      </div>
                    </div>
                    <div className="role-focus-item">
                      <span className="check-icon-large">✓</span>
                      <div>
                        <h4 className="role-focus-item-title">Protocol Translation</h4>
                        <p className="role-focus-item-desc">For institutional stakeholders and enterprises</p>
                      </div>
                    </div>
                  </div>
                  {/* Second Column of Cards */}
                  <div className="col-12 col-md-6 role-focus-column">
                    <div className="role-focus-item">
                      <span className="check-icon-large">✓</span>
                      <div>
                        <h4 className="role-focus-item-title">Formal Participation Pathways</h4>
                        <p className="role-focus-item-desc">Opening governance to more contributors</p>
                      </div>
                    </div>
                    <div className="role-focus-item">
                      <span className="check-icon-large">✓</span>
                      <div>
                        <h4 className="role-focus-item-title">Diversity Through Onboarding</h4>
                        <p className="role-focus-item-desc">Supporting women developers in protocol work</p>
                      </div>
                    </div>
                    <div className="role-focus-item">
                      <span className="check-icon-large">✓</span>
                      <div>
                        <h4 className="role-focus-item-title">Durable Artifacts</h4>
                        <p className="role-focus-item-desc">Creating lasting content beyond meeting notes</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer Box - After Cards */}
                <div className="role-footer-box">
                  <p className="role-footer-text">
                    We do not set protocol direction. We support the systems that allow Ethereum to decide responsibly.
                  </p>
                </div>
              </div>

              {/* Right Column - Image (col-2) */}
              <div className="col-12 col-md-2 role-focus-image-column">
                <div className="role-focus-image">
                  <img src="/assets/images/cat_peek.png" alt="Cat Peek" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="boundaries-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 boundaries-column">
            <h2 className="boundaries-title">Our Boundaries</h2>

              <p className="boundaries-intro">
                To protect focus and sustainability, ECH will intentionally step back from:
              </p>
              <div className="boundaries-list">
                <div className="boundary-item">
                  <span className="circle-icon">○</span>
                  <p>Being the default operator for all Ethereum Protocol & breakout livestreaming</p>
                </div>
                <div className="boundary-item">
                  <span className="circle-icon">○</span>
                  <p>Ad-hoc community media work not tied to governance or protocol outcomes</p>
                </div>
                <div className="boundary-item">
                  <span className="circle-icon">○</span>
                  <p>Duplicating efforts now staffed within EF Protocol Support</p>
                </div>
              </div>
              <p className="boundaries-note">
                These activities are valuable but no longer the highest-leverage use of ECH&apos;s unique position.
              </p>
              <div className="boundaries-highlight-box">
                <p className="boundaries-highlight-text">Our role is support, clarity, and stewardship — not authority.</p>
              </div>
            </div>
            <div className="col-lg-6 boundaries-image-column">
              <div className="boundaries-image-wrapper">
                <img src="/assets/EIP Summit Group Photo.webp" alt="Our Boundaries" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EF Section */}
      <section className="ef-section">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-5 ef-image-column">
              <div className="ef-image-wrapper">
                <img 
                  src="/assets/How We Work with EF.webp" 
                  alt="How We Work with EF" 
                />
              </div>
            </div>
            <div className="col-lg-7 ef-column">
              <div className="ef-content-wrapper">
                <h2 className="ef-title">How We Work with the Ethereum Foundation</h2>
                <p className="ef-intro-text">
                  ECH Institute works <strong>with</strong> the Ethereum Foundation, not <strong>in place of it</strong>.
                </p>
                <div className="ef-cards-container">
                  <div className="ef-card">
                    <h4 className="ef-card-title">EF Teams</h4>
                    <p className="ef-card-description">Build and maintain the protocol</p>
                  </div>
                  <div className="ef-card">
                    <h4 className="ef-card-title">Client Teams</h4>
                    <p className="ef-card-description">Implement and ship</p>
                  </div>
                  <div className="ef-card">
                    <h4 className="ef-card-title">ECH Institute</h4>
                    <p className="ef-card-description">Supports the governance and coordination layer that connects them</p>
                  </div>
                </div>
                <p className="ef-footer-text">
                  We focus on neutral infrastructure, documentation, and participation pathways that benefit the entire ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      {/* <section className="quote-section-wrapper">
        <div className="container">
          <div className="quote-box">
            <div className="quote-content">
              <div>
                <p className="quote-text">
                  Ethereum governance is complex but open to all. — Pooja Ranjan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Why Section */}
      <section className="why-section-alt">
        <div className="container">
          <div className="why-content-wrapper">
            <h2 className="why-title-alt">Why ECH Institute</h2>
            <p className="why-intro-alt">
              Ethereum&apos;s success depends not only on code, but on its ability to coordinate globally, onboard new contributors,
              support long-lived institutional users, and retain legitimacy as public infrastructure. We focus on work that is
              essential, and not owned by any single team.
            </p>

            <div className="why-trusted-section">
              <h3 className="why-trusted-title">ECH Institute is trusted because we combine:</h3>
              <div className="row why-trusted-grid">
                <div className="col-md-4 why-trusted-card">
                  <div className="why-trusted-icon">
                    <i className="bi bi-gear"></i>
                  </div>
                  <p className="why-trusted-text">Deep operational experience inside protocol processes</p>
                </div>
                <div className="col-md-4 why-trusted-card">
                  <div className="why-trusted-icon">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <p className="why-trusted-text">Neutral nonprofit positioning</p>
                </div>
                <div className="col-md-4 why-trusted-card">
                  <div className="why-trusted-icon">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <p className="why-trusted-text">Long‑term stewardship mindset</p>
                </div>
              </div>
            </div>

            <p className="why-footer-alt">
              ECH Institute exists to make that possible — quietly, credibly, and sustainably!
            </p>
          </div>
        </div>
      </section>

      {/* Who We Serve Section - Text Left, Image Right */}
      <section className="serve-section" id="serve">
        <div className="container">
          <div className="serve-header">
            <h2 className="serve-section-title">Who We Serve</h2>
            <p className="serve-section-subtitle">
              We provide essential infrastructure and support to diverse stakeholders across the Ethereum ecosystem
            </p>
          </div>
          <div className="serve-layout">
            <div className="serve-content">
              <div className="serve-audience-grid">
                <div className="serve-audience-card">
                  {/* <div className="serve-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H11V21H5V3H13V9H21ZM14 10V12H16V10H14ZM18 10V12H20V10H18ZM14 14V16H16V14H14ZM18 14V16H20V14H18ZM14 18V20H16V18H14ZM18 18V20H20V18H18Z" fill="currentColor"/>
                    </svg>
                  </div> */}
                  <h3 className="serve-card-title">Ethereum Ecosystem</h3>
                  <p className="serve-card-description">Ethereum ecosystem and aspiring contributors</p>
                </div>
                
                <div className="serve-audience-card">
                  {/* <div className="serve-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div> */}
                  <h3 className="serve-card-title">EF Teams</h3>
                  <p className="serve-card-description">Ethereum Foundation teams looking for neutral governance infrastructure</p>
                </div>
                
                <div className="serve-audience-card">
                  {/* <div className="serve-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 21V7L13 2L21 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9V13H15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div> */}
                  <h3 className="serve-card-title">Enterprises & Institutions</h3>
                  <p className="serve-card-description">Building on Ethereum who need clear, accurate protocol context</p>
                </div>
                
                <div className="serve-audience-card">
                  {/* <div className="serve-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div> */}
                  <h3 className="serve-card-title">Researchers & Educators</h3>
                  <p className="serve-card-description">Studying open-source governance and protocol development</p>
                </div>
                
                <div className="serve-audience-card">
                  {/* <div className="serve-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div> */}
                  <h3 className="serve-card-title">Core Contributors</h3>
                  <p className="serve-card-description">Ethereum core contributors seeking sustainable coordination support</p>
                </div>
              </div>
            </div>
            <div className="serve-image">
              <div className="serve-image-wrapper">
                <img src="/assets/Who We Serve.webp" alt="Who We Serve" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise & Institutional View Section - Image Left, Text Right */}
      <section className="section enterprise-section">
        <div className="container">
          <div className="enterprise-layout">
            <div className="enterprise-image">
              <img src="/assets/Enterprise & Institutional View.webp" alt="Enterprise & Institutional View" />
            </div>
            <div className="enterprise-content">
              <h2 className="serve-section-title">Enterprise & Institutional View</h2>
              <p className="enterprise-intro">
                For enterprises and institutions, Ethereum is long‑lived public infrastructure. Understanding how protocol change is governed is critical to managing risk.
              </p>

              <div className="enterprise-card-white">
                <h3 className="enterprise-card-title">ECH Institute helps institutional users:</h3>
                <ul className="enterprise-numbered-list">
                  <li>
                    <span className="enterprise-number">1</span>
                    <span>Understand how and when protocol changes occur</span>
                  </li>
                  <li>
                    <span className="enterprise-number">2</span>
                    <span>Interpret upgrades beyond release notes</span>
                  </li>
                  <li>
                    <span className="enterprise-number">3</span>
                    <span>Engage responsibly without influencing protocol direction</span>
                  </li>
                </ul>
                <div className="enterprise-divider"></div>
                <p className="enterprise-footer-text">
                  We provide clarity, not advocacy — so organizations can build and operate with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Slider Section */}
      <section className="card-slider-section">
        <div className="container">
          <CardSlider />
        </div>
      </section>

      {/* Members Section */}
      {/* <section className="section members-section" id="members">
        <div className="container">
          <div className="section-header animate-on-scroll text-center">
            <h2 className="section-title">Our Members</h2>
            <p className="section-subtitle">
              Meet the dedicated team members who drive ECH Institute&apos;s mission forward.
            </p>
          </div>
          <MembersSlider />
        </div>
      </section> */}
    </>
  );
}
