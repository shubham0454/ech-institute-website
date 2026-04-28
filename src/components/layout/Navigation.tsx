'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  Heart,
  FileText,
  Menu,
  X,
  Home,
  Calendar,
  UserCircle,
  Mic,
  ChevronRight,
  BookOpen,
  Radio,
  Code,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES, EXTERNAL_LINKS } from '@/config/routes';
import GivethTicker from '@/components/layout/GivethTicker';
// import { ThemeToggle } from '@/components/layout/ThemeToggle';

// ==========================================
// CUSTOMIZABLE MENU ITEMS
// ==========================================
// Update these objects to customize menu items
// All other structure and behavior remains fixed

interface SubMenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  subItems?: SubMenuItem[];
}

interface MenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  subItems?: SubMenuItem[];
}

interface MenuConfig {
  [key: string]: MenuItem;
}

const menuItems: MenuConfig = {
  education: {
    title: 'EDUCATION',
    description: 'Learn and grow',
    icon: GraduationCap,
    link: ROUTES.education,
  },
  community: {
    title: 'COMMUNITY',
    description: 'Blog, reports, events & podcast',
    icon: FileText,
    link: '#',
    subItems: [
      {
        title: 'PODCAST',
        description: 'Media hub & podcast series',
        icon: Mic,
        link: ROUTES.podcast,
        subItems: [
          {
            title: 'PODCAST',
            description: 'Media hub & coordination gateway',
            icon: Mic,
            link: ROUTES.podcast,
          },
          {
            title: 'PEEPanEIP',
            description: 'Protocol deep-dive EIP archive',
            icon: BookOpen,
            link: ROUTES.peepaneip,
          },
          {
            title: 'FUSAKA FILES',
            description: 'Strategic & enterprise scaling series',
            icon: Radio,
            link: ROUTES.fusakaFiles,
          },
          {
            title: 'EPD',
            description: 'Ecosystem Project Demo hub',
            icon: Code,
            link: ROUTES.epd,
          },
          // {
          //   title: 'WiEP',
          //   description: 'Women in Ethereum Protocol study groups',
          //   icon: GraduationCap,
          //   link: ROUTES.wiep,
          // },
        ],
      },
      {
        title: 'EVENTS',
        description: 'Upcoming events',
        icon: Calendar,
        link: ROUTES.events,
      },
      {
        title: 'BLOG',
        description: 'Latest blog posts',
        icon: FileText,
        link: EXTERNAL_LINKS.blog,
      },
      {
        title: 'FIRST ANNUAL REPORT',
        description: 'ECH Institute first annual report',
        icon: FileText,
        link: EXTERNAL_LINKS.annualReport,
      },
      {
        title: 'GET INVOLVED',
        description: 'Join our community missions',
        icon: UserCircle,
        link: ROUTES.getInvolved,
      },
    ],
  },
  homestead: {
    title: 'HOMESTEAD',
    description: 'Our physical space',
    icon: Home,
    link: ROUTES.homestead,
  },
  about: {
    title: 'ABOUT',
    description: 'Learn about ECH Institute',
    icon: UserCircle,
    link: ROUTES.about,
  },
  support: {
    title: 'SUPPORT',
    description: 'Support our mission',
    icon: Heart,
    link: ROUTES.support,
  },
};


// ==========================================
// NAVIGATION COMPONENT
// ==========================================

const NAVBAR_HEIGHT = 88;

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoFallback, setLogoFallback] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null); // Track hovered nav items without subItems
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [clickedSection, setClickedSection] = useState<string | null>(null); // Track clicked sub-items
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null); // Track which mobile menu item is open
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null); // Track which nested sub-menu is open (format: "parentKey-index")
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-close mobile menu when screen width becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
        setOpenMobileMenu(null);
        setOpenMobileSubMenu(null);
        setBodyScrollLock(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Internal links stay on this site; only full URLs are external
  const isExternalLink = (link: string) =>
    link.startsWith('http://') || link.startsWith('https://');

  const getLinkUrl = (link: string) => link;

  const setBodyScrollLock = (locked: boolean) => {
    document.body.classList.toggle('no-scroll', locked);
  };
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle smooth scrolling for hash links
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu
    setIsMenuOpen(false);
    setOpenMobileMenu(null);
    setOpenMobileSubMenu(null);
    setBodyScrollLock(false);
    
    // Close desktop dropdown menu
    setHoveredMenu(null);
    setHoveredSection(null);
    setClickedSection(null);
    
    // Handle hash links only
    if (href.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');
      
      // If pathname matches, scroll to hash
      if (path === pathname || path === '') {
        const element = document.querySelector(hash);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - NAVBAR_HEIGHT;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } else {
        // Navigate to new page, then scroll
        window.location.href = href;
      }
    }
    // For regular links (without #), let Next.js Link handle navigation normally
    // Don't prevent default, just close the menu
  };

  // Handle menu hover
  const handleMenuEnter = (menuKey: string) => {
    // Don't handle menu enter on mobile screens
    if (window.innerWidth < 1024) return;
    
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredMenu(menuKey);
    // Clear clicked section when switching menus
    setClickedSection(null);
  };

  const handleMenuLeave = () => {
    // Don't handle menu leave on mobile screens
    if (window.innerWidth < 1024) return;
    
    // Only close if no section was clicked
    if (!clickedSection) {
      closeTimeoutRef.current = setTimeout(() => {
        setHoveredMenu(null);
        setHoveredSection(null);
      }, 50);
    }
  };

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleDropdownLeave = () => {
    // Only close if no section was clicked
    if (!clickedSection) {
      closeTimeoutRef.current = setTimeout(() => {
        setHoveredMenu(null);
        setHoveredSection(null);
      }, 50);
    }
  };

  // Handle sub-item hover - update immediately without delay
  const handleSubItemEnter = (menuKey: string, index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Immediately update to the new hovered section
    const sectionKey = `${menuKey}-${index}`;
    setHoveredSection(sectionKey);
  };

  // Handle sub-item click - keep it open
  const handleSubItemClick = (menuKey: string, index: number) => {
    const sectionKey = `${menuKey}-${index}`;
    // If clicking the same item, toggle it off
    if (clickedSection === sectionKey) {
      setClickedSection(null);
      setHoveredSection(null);
    } else {
      // Set the clicked section to keep it open
      setClickedSection(sectionKey);
      setHoveredSection(sectionKey);
    }
  };

  // Handle sub-item leave - clear if moving to non-nested item (only if not clicked)
  const handleSubItemLeave = () => {
    // If a section was clicked, don't clear on mouse leave
    if (!clickedSection) {
      // Allow smooth transition, but don't clear immediately
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !Object.values(navButtonRefs.current).some(
          (ref) => ref && ref.contains(event.target as Node)
        )
      ) {
        setHoveredMenu(null);
        setHoveredSection(null);
      }
    };

    if (hoveredMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [hoveredMenu]);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar if dropdown is open or mobile menu is open
      if (hoveredMenu || isMenuOpen) {
        setIsNavbarVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Show navbar at the top of the page
      if (currentScrollY < 10) {
        setIsNavbarVisible(true);
      } 
      // Hide navbar when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hoveredMenu, isMenuOpen]);

  // Get menu items with sub-items (currently not used but kept for future use)
  // const menuItemsWithSubs = Object.entries(menuItems).filter(
  //   ([_, item]) => item.subItems && item.subItems.length > 0
  // );

  const currentMenu = hoveredMenu ? menuItems[hoveredMenu] : null;

  return (
    <>
      <nav 
        className={cn(
          "nav-shell fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 lg:py-5 relative w-full">
            {/* LEFT SIDE: Logo */}
            <Link
              href="/"
              className="nav-brand-link flex items-center gap-2 sm:gap-3 font-bold transition-colors pr-2 sm:pr-4 lg:pr-12 z-10 flex-shrink-0 no-underline min-w-0"
            >
              <span className="sr-only">ECH Institute</span>
              {!logoFallback ? (
                <Image
                  src="/assets/logo/ECH Institute Logo - White.png"
                  alt="ECH Institute"
                  width={300}
                  height={80}
                  priority
                  unoptimized
                  className="h-8 sm:h-9 md:h-11 lg:h-12 xl:h-14 w-auto flex-shrink-0 object-contain"
                  onError={() => setLogoFallback(true)}
                />
              ) : (
                <span className="logo-fallback">ECH Institute</span>
              )}
              <div className="flex flex-col -space-y-0.5">
                <span className="nav-brand-name font-[family-name:var(--font-family-nav)] font-bold transition-colors inline whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl">
                  ECH Institute
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--accent-brand)] mt-0 whitespace-nowrap">
                  {/* Nonprofit Organization */} People | Process | Protocol
                </span>
              </div>
            </Link>

            {/* RIGHT: Menu Buttons - Right-aligned on desktop */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto">
              {Object.entries(menuItems).map(([key, item]) => {
                // If item has subItems, use button with hover menu
                // Otherwise, use Link for direct navigation
                if (item.subItems && item.subItems.length > 0) {
                  return (
                    <button
                      key={key}
                      ref={(el) => {
                        navButtonRefs.current[key] = el;
                      }}
                      onMouseEnter={() => handleMenuEnter(key)}
                      onMouseLeave={handleMenuLeave}
                      aria-haspopup="true"
                      aria-expanded={hoveredMenu === key}
                      aria-label={`${item.title} menu`}
                      className={cn(
                        'font-[family-name:var(--font-family-nav)] font-bold uppercase transition-colors rounded-lg px-2 xl:px-3 py-2 flex items-center focus:outline-none focus-visible:outline-none focus:ring-0 no-underline whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl',
                        hoveredMenu === key
                          ? 'bg-[var(--surface-card-muted)] text-[var(--text-base)]'
                          : 'text-[var(--text-soft)] hover:bg-[var(--surface-card-muted)] hover:text-[var(--text-base)]'
                      )}
                    >
                      <span
                        className={cn(
                          'font-bold uppercase text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-colors',
                          hoveredMenu === key
                            ? 'text-[var(--text-base)]'
                            : 'text-[var(--text-soft)]'
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  );
                } else {
                  const linkUrl = getLinkUrl(item.link);
                  const isExternal = isExternalLink(item.link);
                  
                  if (isExternal) {
                    return (
                      <a
                        key={key}
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => {
                          if (hoveredMenu) {
                            setHoveredMenu(null);
                          }
                          setHoveredNavItem(key);
                        }}
                        onMouseLeave={() => {
                          setHoveredNavItem(null);
                        }}
                        className={cn(
                          'font-[family-name:var(--font-family-nav)] font-bold uppercase transition-colors rounded-lg px-2 xl:px-3 py-2 flex items-center no-underline focus:outline-none focus-visible:outline-none focus:ring-0 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl',
                          'visited:text-[var(--text-soft)] active:text-[var(--text-soft)]',
                          hoveredNavItem === key
                            ? 'bg-[var(--surface-card-muted)] text-[var(--text-base)] visited:text-[var(--text-base)] active:text-[var(--text-base)]'
                            : 'text-[var(--text-soft)] hover:bg-[var(--surface-card-muted)] hover:!text-[var(--text-base)] visited:text-[var(--text-soft)] active:text-[var(--text-soft)]'
                        )}
                      >
                        <span 
                          className={cn(
                            'font-bold uppercase visited:text-[var(--text-soft)] active:text-[var(--text-soft)] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-colors',
                            hoveredNavItem === key ? 'text-[var(--text-base)] visited:text-[var(--text-base)] active:text-[var(--text-base)]' : 'text-[var(--text-soft)] hover:!text-[var(--text-base)]'
                          )}
                        >
                          {item.title}
                        </span>
                      </a>
                    );
                  }
                  
                  // Determine if item is active or hovered
                  const isActive = pathname === item.link;
                  const isHovered = hoveredNavItem === key;
                  const shouldBeBlack = isActive || isHovered;
                  
                  return (
                    <Link
                      key={key}
                      href={item.link}
                      onClick={(e) => {
                        // Only handle hash links, let Next.js handle regular navigation
                        if (item.link.includes('#')) {
                          handleLinkClick(e, item.link);
                        } else {
                          // Close mobile menu and desktop dropdown for regular links
                          setIsMenuOpen(false);
                          setOpenMobileMenu(null);
                          setOpenMobileSubMenu(null);
                          setHoveredMenu(null);
                          setHoveredSection(null);
                          setClickedSection(null);
                          setBodyScrollLock(false);
                        }
                      }}
                      onMouseEnter={() => {
                        // Show hover effect even for items without subItems
                        if (hoveredMenu) {
                          setHoveredMenu(null);
                        }
                        setHoveredNavItem(key);
                      }}
                      onMouseLeave={() => {
                        setHoveredNavItem(null);
                      }}
                      data-nav-active={isActive ? 'true' : 'false'}
                      data-nav-hovered={isHovered ? 'true' : 'false'}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'nav-link-item font-[family-name:var(--font-family-nav)] font-bold uppercase transition-colors rounded-lg px-2 xl:px-3 py-2 flex items-center no-underline focus:outline-none focus-visible:outline-none focus:ring-0 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl',
                        isActive && 'bg-[var(--surface-card-muted)] text-[var(--text-base)]',
                        !isActive && 'text-[var(--text-soft)] hover:bg-[var(--surface-card-muted)] hover:text-[var(--text-base)]'
                      )}
                    >
                      <span 
                        className={cn(
                          'font-bold uppercase text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-colors',
                          shouldBeBlack ? 'text-[var(--text-base)]' : 'text-[var(--text-soft)]'
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  );
                }
              })}
            </div>

            {/* RIGHT SIDE: Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-4 ml-auto">
              {/* <div>
                <ThemeToggle />
              </div> */}
              {/* Mobile Menu Toggle Button - Only shows when navbar items are hidden (below lg breakpoint) */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Close desktop menu when opening mobile menu
                  const newMenuState = !isMenuOpen;
                  if (newMenuState) {
                    setHoveredMenu(null);
                    setHoveredSection(null);
                    setClickedSection(null);
                    // Ensure navbar is visible when opening menu
                    setIsNavbarVisible(true);
                  }
                  setIsMenuOpen(newMenuState);
                  // Reset open mobile menu when closing
                  if (!newMenuState) {
                    setOpenMobileMenu(null);
                    setOpenMobileSubMenu(null);
                  }
                  // Force a re-render by updating state
                  if (newMenuState) {
                    setBodyScrollLock(true);
                  } else {
                    setBodyScrollLock(false);
                  }
                }}
                className="flex lg:!hidden p-2 rounded-md hover:bg-[var(--surface-card-muted)] transition-colors text-[var(--text-base)] z-[100] relative flex-shrink-0 items-center justify-center"
                aria-label="Toggle menu"
                type="button"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MEGA MENU DROPDOWN - Desktop Only (hidden on mobile) */}
        {hoveredMenu && currentMenu && currentMenu.subItems && !isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="nav-overlay-offset hidden lg:block fixed inset-0 bg-[var(--surface-overlay)] opacity-70 z-40"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            />
            
            {/* Mega Menu */}
            <div
              ref={dropdownRef}
              className="nav-panel-offset hidden lg:block fixed inset-x-0 bg-[var(--surface-card-theme)] z-50 border-t border-[var(--border-soft)] shadow-lg rounded-b-lg"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div className={cn(
                "container max-w-7xl mx-auto px-4",
                'py-4'
              )}>
                <div className="flex gap-8">
                  {/* LEFT: Fixed width menu list - showing all sub-items of current menu */}
                  <div className="w-80 flex-shrink-0">
                    <div className="nav-scroll-panel space-y-2 py-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 mega-menu-scroll">
                      {currentMenu.subItems.map((subItem, index) => {
                        // Check if this sub-item has nested sub-items
                        const hasNestedSubItems = 'subItems' in subItem && subItem.subItems && subItem.subItems.length > 0;
                        const isHovered = hoveredSection === `${hoveredMenu}-${index}`;
                        
                        return (
                          <div key={index}>
                            {hasNestedSubItems ? (
                              <div
                                key={index}
                                onMouseEnter={() => handleSubItemEnter(hoveredMenu, index)}
                                onMouseLeave={handleSubItemLeave}
                                onClick={() => handleSubItemClick(hoveredMenu, index)}
                                className={cn(
                                  'w-full flex items-center gap-4 p-4 my-2 rounded-lg transition-all duration-200 group border cursor-pointer focus:outline-none focus-visible:outline-none',
                                  isHovered || clickedSection === `${hoveredMenu}-${index}`
                                    ? 'bg-[var(--surface-card-theme)] border-[var(--accent-brand)] shadow-md'
                                    : 'bg-[var(--surface-card-theme)] border-[var(--border-soft)] hover:bg-[var(--surface-card-theme)] hover:border-[var(--accent-brand)] hover:shadow-md'
                                )}
                              >
                                <div className={cn(
                                  'flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-colors bg-transparent',
                                  isHovered || clickedSection === `${hoveredMenu}-${index}`
                                    ? 'text-[#FBFBFB]'
                                    : 'text-[#FBFBFB]'
                                )}>
                                  <subItem.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 text-left">
                                  <div className={cn(
                                    'font-medium text-base',
                                    isHovered || clickedSection === `${hoveredMenu}-${index}` ? 'text-[var(--text-base)]' : 'text-[var(--text-soft)]'
                                  )}>{subItem.title}</div>
                                  <div className="text-sm text-[var(--text-soft)] mt-0.5">
                                    {subItem.description}
                                  </div>
                                </div>
                                <ChevronRight className={cn(
                                  'h-5 w-5 flex-shrink-0 transition-colors',
                                  isHovered || clickedSection === `${hoveredMenu}-${index}` ? 'text-[#FBFBFB]' : 'text-[#FBFBFB]'
                                )}/>
                              </div>
                            ) : (
                              (() => {
                                const linkUrl = getLinkUrl(subItem.link);
                                const isExternal = isExternalLink(subItem.link);
                                
                                if (isExternal) {
                                  return (
                                    <a
                                      key={index}
                                      href={linkUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onMouseEnter={() => {
                                        setHoveredSection(null);
                                      }}
                                      className="flex items-center gap-4 p-4 my-2 rounded-lg transition-all duration-200 group border border-[var(--border-soft)] bg-[var(--surface-card-theme)] hover:bg-[var(--surface-card-theme)] hover:border-[var(--accent-brand)] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                    >
                                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center group-hover:text-[#FBFBFB] transition-colors">
                                        <subItem.icon className="h-5 w-5" />
                                      </div>
                                      <div className="flex-1 text-left">
                                        <div className="font-medium text-base text-[var(--text-soft)] group-hover:text-[var(--text-base)]">{subItem.title}</div>
                                        <div className="text-sm text-[var(--text-soft)] mt-0.5">
                                          {subItem.description}
                                        </div>
                                      </div>
                                    </a>
                                  );
                                }
                                
                                return (
                                  <Link
                                    key={index}
                                    href={subItem.link}
                                    onClick={(e) => handleLinkClick(e, subItem.link)}
                                    onMouseEnter={() => {
                                      // Clear hovered section when hovering non-nested items
                                      setHoveredSection(null);
                                    }}
                                    className="flex items-center gap-4 p-4 my-2 rounded-lg transition-all duration-200 group border border-[var(--border-soft)] bg-[var(--surface-card-theme)] hover:bg-[var(--surface-card-theme)] hover:border-[var(--accent-brand)] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                  >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center group-hover:text-[#FBFBFB] transition-colors">
                                      <subItem.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 text-left">
                                      <div className="font-medium text-base text-[var(--text-soft)] group-hover:text-[var(--text-base)]">{subItem.title}</div>
                                      <div className="text-sm text-[var(--text-soft)] mt-0.5">
                                        {subItem.description}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })()
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* RIGHT: Only show when at least one sub-item has nested sub-items */}
                  {currentMenu.subItems.some((s) => 'subItems' in s && s.subItems && s.subItems.length > 0) && (
                  <div className="nav-scroll-panel flex-1 border-l border-[var(--border-soft)] pl-8 max-h-[calc(100vh-12rem)] overflow-y-auto mega-menu-scroll">
                    {(() => {
                      // Find the hovered or clicked sub-item that has nested sub-items
                      const activeSection = clickedSection || hoveredSection;
                      const activeIndex = activeSection ? parseInt(activeSection.split('-').pop() || '') : -1;
                      const activeSubItem = activeIndex >= 0 && currentMenu.subItems[activeIndex] 
                        ? currentMenu.subItems[activeIndex] 
                        : null;
                      
                      const hasNestedSubItems = activeSubItem && 'subItems' in activeSubItem && activeSubItem.subItems && activeSubItem.subItems.length > 0;
                      
                      if (!activeSection || !hasNestedSubItems) {
                        return (
                          <div className="flex items-center justify-center min-h-[120px] py-2">
                            <p className="text-[var(--text-soft)] text-sm">
                              Hover over a menu item to see options
                            </p>
                          </div>
                        );
                      }
                      
                      const nestedSubItems = activeSubItem.subItems || [];
                      
                      return (
                        <div className="py-3 pe-3">
                          <div className="mb-3 border-b border-[var(--border-soft)]">
                            <h3 className="text-lg font-semibold text-[var(--text-base)] mb-2">
                              {activeSubItem.title}
                            </h3>
                            <p className="text-sm text-[var(--text-soft)]">
                              {activeSubItem.description}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-2">
                            {nestedSubItems.map((nestedItem: SubMenuItem, nestedIndex: number) => {
                              const linkUrl = getLinkUrl(nestedItem.link);
                              const isExternal = isExternalLink(nestedItem.link);
                              
                              if (isExternal) {
                                return (
                                  <a
                                    key={nestedIndex}
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 p-4 rounded-lg transition-all duration-200 group border border-[var(--border-soft)] bg-[var(--surface-card-theme)] hover:bg-[var(--surface-card-theme)] hover:border-[var(--accent-brand)] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                  >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center group-hover:text-[#FBFBFB] transition-colors mt-0.5">
                                      <nestedItem.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-base text-[var(--text-soft)] group-hover:text-[var(--text-base)] mb-1">
                                        {nestedItem.title}
                                      </div>
                                      <div className="text-sm text-[var(--text-soft)]">
                                        {nestedItem.description}
                                      </div>
                                    </div>
                                  </a>
                                );
                              }
                              
                              return (
                                <Link
                                  key={nestedIndex}
                                  href={nestedItem.link}
                                  onClick={(e) => handleLinkClick(e, nestedItem.link)}
                                  className="flex items-start gap-3 p-4 rounded-lg transition-all duration-200 group border border-[var(--border-soft)] bg-[var(--surface-card-theme)] hover:bg-[var(--surface-card-theme)] hover:border-[var(--accent-brand)] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                >
                                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center group-hover:text-[#FBFBFB] transition-colors mt-0.5">
                                    <nestedItem.icon className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-base text-[var(--text-soft)] group-hover:text-[var(--text-base)] mb-1">
                                      {nestedItem.title}
                                    </div>
                                    <div className="text-sm text-[var(--text-soft)]">
                                      {nestedItem.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

      </nav>

      {/* MOBILE MENU - Outside nav to prevent clipping */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
              className="nav-overlay-offset lg:hidden fixed inset-0 bg-[var(--surface-overlay)] opacity-70 z-[90]"
            onClick={() => {
              setIsMenuOpen(false);
              setOpenMobileMenu(null);
              setOpenMobileSubMenu(null);
              setBodyScrollLock(false);
            }}
          />
          {/* Mobile Menu */}
          <div 
            className="nav-panel-offset lg:hidden fixed inset-x-0 bottom-0 bg-[var(--surface-card-theme)] border-t border-[var(--border-soft)] z-[100] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container max-w-7xl mx-auto px-2 sm:px-4 pt-8 pb-8">
              <div className="space-y-1 pt-2 pb-4">
                {Object.entries(menuItems).map(([key, item]) => (
                  <div key={key} className="border-b border-[var(--border-soft)] last:border-0">
                    {item.subItems && item.subItems.length > 0 ? (
                      <div className="py-2">
                        {/* Clickable header to toggle dropdown */}
                        <button
                          onClick={() => {
                            setOpenMobileMenu(openMobileMenu === key ? null : key);
                          }}
                          className="w-full flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-[var(--surface-card-muted)] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0"
                        >
                          <div className="w-10 h-10 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center flex-shrink-0 group-hover:text-[#FBFBFB] transition-colors">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm text-[var(--text-base)]">
                              {item.title}
                            </div>
                            <div className="text-xs text-[var(--text-soft)]">
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight 
                            className={cn(
                              "h-5 w-5 text-[#FBFBFB] transition-transform duration-200 flex-shrink-0",
                              openMobileMenu === key ? "rotate-90" : ""
                            )}
                          />
                        </button>
                        {/* Dropdown sub-items - only show when open */}
                        {openMobileMenu === key && (
                          <div className="pl-12 space-y-2 mt-2">
                            {item.subItems.map((subItem, index) => {
                              const subMenuKey = `${key}-${index}`;
                              const hasNestedSubItems = 'subItems' in subItem && subItem.subItems && subItem.subItems.length > 0;
                              const linkUrl = getLinkUrl(subItem.link);
                              const isExternal = isExternalLink(subItem.link);
                              
                              // If sub-item has nested sub-items, make it a button
                              if (hasNestedSubItems) {
                                return (
                                  <div key={index}>
                                    <button
                                      onClick={() => {
                                        setOpenMobileSubMenu(openMobileSubMenu === subMenuKey ? null : subMenuKey);
                                      }}
                                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-card-muted)] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 text-left"
                                    >
                                      <div className="w-8 h-8 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center flex-shrink-0 group-hover:text-[#FBFBFB] transition-colors">
                                        <subItem.icon className="h-4 w-4" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-sm text-[var(--text-base)]">
                                          {subItem.title}
                                        </div>
                                        <div className="text-xs text-[var(--text-soft)]">
                                          {subItem.description}
                                        </div>
                                      </div>
                                      <ChevronRight 
                                        className={cn(
                                          "h-4 w-4 text-[#FBFBFB] transition-transform duration-200 flex-shrink-0",
                                          openMobileSubMenu === subMenuKey ? "rotate-90" : ""
                                        )}
                                      />
                                    </button>
                                    {/* Nested sub-items dropdown */}
                                    {openMobileSubMenu === subMenuKey && subItem.subItems && (
                                      <div className="pl-8 space-y-1 mt-1">
                                        {subItem.subItems.map((nestedItem, nestedIndex) => {
                                          const nestedLinkUrl = getLinkUrl(nestedItem.link);
                                          const isNestedExternal = isExternalLink(nestedItem.link);
                                          
                                          if (isNestedExternal) {
                                            return (
                                              <a
                                                key={nestedIndex}
                                                href={nestedLinkUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => {
                                                  handleLinkClick(e, nestedItem.link);
                                                }}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--surface-card-muted)] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                              >
                                                <div className="w-6 h-6 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center flex-shrink-0 group-hover:text-[#FBFBFB] transition-colors">
                                                  <nestedItem.icon className="h-3 w-3" />
                                                </div>
                                                <div className="flex-1">
                                                  <div className="font-medium text-xs text-[var(--text-base)]">
                                                    {nestedItem.title}
                                                  </div>
                                                  <div className="text-xs text-[var(--text-soft)]">
                                                    {nestedItem.description}
                                                  </div>
                                                </div>
                                              </a>
                                            );
                                          }
                                          
                                          return (
                                            <Link
                                              key={nestedIndex}
                                              href={nestedItem.link}
                                              onClick={(e) => {
                                                handleLinkClick(e, nestedItem.link);
                                              }}
                                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--surface-card-muted)] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                            >
                                              <div className="w-6 h-6 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center flex-shrink-0 group-hover:text-[#FBFBFB] transition-colors">
                                                <nestedItem.icon className="h-3 w-3" />
                                              </div>
                                              <div className="flex-1">
                                                <div className="font-medium text-xs text-[var(--text-base)]">
                                                  {nestedItem.title}
                                                </div>
                                                <div className="text-xs text-[var(--text-soft)]">
                                                  {nestedItem.description}
                                                </div>
                                              </div>
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                              
                              // Regular sub-item without nested items
                              if (isExternal) {
                                return (
                                  <a
                                    key={index}
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                      handleLinkClick(e, subItem.link);
                                    }}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-card-muted)] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                  >
                                    <div className="w-8 h-8 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center flex-shrink-0 group-hover:text-[#FBFBFB] transition-colors">
                                      <subItem.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-sm text-[var(--text-base)]">
                                        {subItem.title}
                                      </div>
                                      <div className="text-xs text-[var(--text-soft)]">
                                        {subItem.description}
                                      </div>
                                    </div>
                                  </a>
                                );
                              }
                              
                              return (
                                <Link
                                  key={index}
                                  href={subItem.link}
                                  onClick={(e) => {
                                    handleLinkClick(e, subItem.link);
                                  }}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-card-muted)] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                >
                                  <div className="w-8 h-8 rounded-md bg-transparent text-[#FBFBFB] flex items-center justify-center flex-shrink-0 group-hover:text-[#FBFBFB] transition-colors">
                                    <subItem.icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-[var(--text-base)]">
                                      {subItem.title}
                                    </div>
                                    <div className="text-xs text-[var(--text-soft)]">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.link}
                        onClick={(e) => handleLinkClick(e, item.link)}
                        className={cn(
                          'flex items-center gap-3 py-4 hover:bg-[var(--surface-card-muted)] transition-colors rounded-lg px-2 group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline',
                          pathname === item.link ? 'bg-[var(--surface-card-muted)]' : ''
                        )}
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-md bg-transparent flex items-center justify-center flex-shrink-0 transition-colors',
                          pathname === item.link ? 'text-[#FBFBFB]' : 'text-[#FBFBFB] group-hover:text-[#FBFBFB]'
                        )}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-[var(--text-base)]">
                            {item.title}
                          </div>
                          <div className="text-xs text-[var(--text-soft)]">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {/* ── Giveth QF Ticker: shares isNavbarVisible — slides in/out with the navbar ── */}
      <div
        className="giveth-ticker-outer"
        style={{
          transform: isNavbarVisible
            ? 'translateY(0)'
            : 'translateY(calc(-1 * var(--nav-height, 5.5rem)))',
        }}
      >
        <GivethTicker />
      </div>
    </>
  );
}
