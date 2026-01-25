'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  Users,
  Home,
  Heart,
  FileText,
  TestTube,
  ArrowUpRight,
  Menu,
  X,
  GraduationCap,
  Calendar,
  FileEdit,
  UserCircle,
  Mic,
  CalendarDays,
  ClipboardList,
  ChevronRight,
} from 'lucide-react';
// ThemeToggle commented out - not currently used
// import { ThemeToggle } from './ThemeToggle';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

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
    description: 'Learn about Ethereum protocol',
    icon: GraduationCap,
    link: '/education',
    subItems: [
      {
        title: 'EIPS',
        description: 'Ethereum Improvement Proposals',
        icon: FileText,
        link: 'https://www.ethcatherders.com/eip',
      },
      {
        title: 'TESTNETS',
        description: 'Ethereum test networks',
        icon: TestTube,
        link: 'https://www.ethcatherders.com/testnets',
      },
      {
        title: 'UPGRADES',
        description: 'Ethereum protocol upgrades',
        icon: ArrowUpRight,
        link: 'https://www.ethcatherders.com/upgrades',
        subItems: [
          {
            title: 'GLAMSTERDAM',
            description: '2026 - Major network upgrade featuring Block-level Access Lists',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'FUSAKA',
            description: 'December 3, 2025 - Major improvements to scalability and user experience',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'PECTRA',
            description: 'May 7, 2025 - Major improvements to staking and validator experience',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'DENCUN',
            description: 'March 13, 2024 - Introduced proto-danksharding (EIP-4844), blob transactions',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'SHAPELLA',
            description: 'April 12, 2023 - Enabled staking withdrawals and validator exits',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'THE MERGE',
            description: 'September 15, 2022 - Merged Ethereum mainnet with Beacon Chain',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'GRAY GLACIER',
            description: 'June 30, 2022 - Delayed the difficulty bomb by 100,000 blocks',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'ARROW GLACIER',
            description: 'December 9, 2021 - Delayed the difficulty bomb by 10,700,000 blocks',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'LONDON',
            description: 'August 5, 2021 - Introduced EIP-1559 fee market change and base fee burning',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'BERLIN',
            description: 'April 15, 2021 - Optimized gas costs for certain EVM operations',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'MUIR GLACIER',
            description: 'January 2, 2020 - Delayed the difficulty bomb by 4,000,000 blocks',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'ISTANBUL',
            description: 'December 8, 2019 - Improved denial-of-service attack resilience',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'PETERSBURG',
            description: 'February 28, 2019 - Removed EIP-1283 from Constantinople',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'CONSTANTINOPLE',
            description: 'February 28, 2019 - Optimized gas costs and prepared for Proof of Stake',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'BYZANTIUM',
            description: 'October 16, 2017 - Reduced block rewards and improved privacy features',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'SPURIOUS DRAGON',
            description: 'November 23, 2016 - Additional DoS attack mitigations and state clearing',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'TANGERINE WHISTLE',
            description: 'October 18, 2016 - Emergency hard fork to address denial-of-service attacks',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'THE DAO FORK',
            description: 'July 20, 2016 - Emergency hard fork to reverse The DAO hack',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'HOMESTEAD',
            description: 'March 14, 2016 - First planned hard fork, improved transaction processing',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'FRONTIER THAWING',
            description: 'September 7, 2015 - Thawed the Frontier network, allowing transactions',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'FRONTIER',
            description: 'July 30, 2015 - Initial Ethereum mainnet launch',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
          {
            title: 'ALL UPGRADES',
            description: 'View complete upgrade timeline',
            icon: ArrowUpRight,
            link: 'https://www.ethcatherders.com/upgrades',
          },
        ],
      },
      {
        title: 'LEARN2EARN',
        description: 'Educational content',
        icon: GraduationCap,
        link: 'https://l2e.ethereumcatherders.com/',
      },
    ],
  },
  community: {
    title: 'COMMUNITY',
    description: 'Join our community',
    icon: Users,
    link: '/community',
    subItems: [
      {
        title: 'PODCASTS',
        description: 'Listen to our podcasts',
        icon: Mic,
        link: '/community/podcasts',
        subItems: [
          {
            title: 'PEEPANEIP',
            description: 'Peepaneip podcast content',
            icon: Mic,
            link: 'https://www.ethcatherders.com/peepaneip',
          },
          {
            title: 'ECOSYSTEM PROJECT DEMO',
            description: 'Ecosystem project demonstrations',
            icon: Mic,
            link: '/community/podcasts/ecosystem-project-demo',
          },
          {
            title: 'AUDIO PODCAST',
            description: 'Audio podcast episodes',
            icon: Mic,
            link: '/community/podcasts/audio',
          },
        ],
      },
      {
        title: 'EVENTS & TALKS',
        description: 'Upcoming events and talks',
        icon: Calendar,
        link: 'https://www.ethcatherders.com/events',
      },
      {
        title: 'BLOGS',
        description: 'Read our latest blogs',
        icon: FileEdit,
        link: 'https://blog.ethcatherders.com/',
      },
      {
        title: 'MEET THE HERDERS',
        description: 'Meet our team',
        icon: UserCircle,
        link: 'https://www.ethcatherders.com/about',
      },
      {
        title: 'GET INVOLVED',
        description: 'Join our community',
        icon: Users,
        link: 'https://www.ethcatherders.com/join',
      },
    ],
  },
  homestead: {
    title: 'HOMESTEAD',
    description: 'Ethereum Homestead',
    icon: Home,
    link: '/homestead',
    subItems: [
      {
        title: 'CALENDAR',
        description: 'Events calendar',
        icon: CalendarDays,
        link: 'https://www.ethcatherders.com/calendar',
      },
      {
        title: 'SURVEYS',
        description: 'Community surveys',
        icon: ClipboardList,
        link: 'https://www.ethcatherders.com/surveys',
      },
      {
        title: 'MEETINGS AND NOTES',
        description: 'Meeting notes and minutes',
        icon: FileText,
        link: 'https://www.ethcatherders.com/meetings',
      },
    ],
  },
  donate: {
    title: 'DONATE',
    description: 'Support our mission',
    icon: Heart,
    link: 'https://www.ethcatherders.com/donate',
  },
};

// ==========================================
// NAVIGATION COMPONENT
// ==========================================

// List of pages that exist in this project
const existingPages = [
  '/',
];

export default function Navigation() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null); // Track hovered nav items without subItems
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [clickedSection, setClickedSection] = useState<string | null>(null); // Track clicked sub-items
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null); // Track which mobile menu item is open
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null); // Track which nested sub-menu is open (format: "parentKey-index")
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-close mobile menu when screen width becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
        setOpenMobileMenu(null);
        setOpenMobileSubMenu(null);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Check if a page exists in the current project
  const pageExists = (link: string) => {
    // If link is already a full URL (starts with http), it's external
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return false;
    }
    return existingPages.includes(link);
  };

  // Get the actual URL - use old website if page doesn't exist
  const getLinkUrl = (link: string) => {
    // If link is already a full URL, return it as is
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return link;
    }
    if (pageExists(link)) {
      return link;
    }
    return `https://www.ethcatherders.com${link}`;
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
    document.body.style.overflow = '';
    
    // Handle hash links only
    if (href.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');
      
      // If pathname matches, scroll to hash
      if (path === pathname || path === '') {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
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
          "fixed top-0 left-0 right-0 z-50 border-b border-[#e2e8f0] bg-white h-16 shadow-sm transition-transform duration-300 ease-in-out",
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full relative w-full">
            {/* LEFT SIDE: Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 text-xl font-bold font-mono hover:text-[#facc14] transition-colors pr-2 sm:pr-4 lg:pr-12 z-10 flex-shrink-0 no-underline min-w-0"
              style={{ textDecoration: 'none' }}
            >
              <span className="sr-only">ECH Institute</span>
              <img
                src="/assets/ech_full_logo.png"
                alt="ECH Institute"
                className="h-7 sm:h-8 md:h-10 w-auto flex-shrink-0"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('span');
                    fallback.className = 'logo-fallback';
                    fallback.textContent = 'ECH Institute';
                    parent.appendChild(fallback);
                  }
                }}
              />
              <span className={cn(
                "text-xs sm:text-sm md:text-base lg:text-xl font-bold font-mono transition-colors inline whitespace-nowrap",
                mounted && theme === 'dark' 
                  ? 'text-white' 
                  : 'text-black'
              )}>
                ECH Institute
              </span>
            </Link>

            {/* CENTER: Menu Buttons - Centered in navbar (hidden on mobile, shown on desktop) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full absolute left-1/2 transform -translate-x-1/2">
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
                      className={cn(
                        'text-sm xl:text-base font-bold uppercase transition-colors rounded-md px-2 xl:px-3 py-2 h-full flex items-center focus:outline-none focus-visible:outline-none focus:ring-0 no-underline whitespace-nowrap',
                        'font-[family-name:var(--font-family-nav)]',
                        hoveredMenu === key
                          ? 'text-black'
                          : 'text-[#4c5663] hover:text-black'
                      )}
                      style={{ textDecoration: 'none', fontFamily: 'var(--font-family-nav)' }}
                    >
                      <span className="text-sm xl:text-base font-bold uppercase" style={{ fontFamily: 'var(--font-family-nav)' }}>{item.title}</span>
                    </button>
                  );
                } else {
                  const linkUrl = getLinkUrl(item.link);
                  const isExternal = !pageExists(item.link);
                  
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
                        }}
                        className={cn(
                          'text-sm xl:text-base font-bold uppercase transition-colors rounded-md px-2 xl:px-3 py-2 h-full flex items-center no-underline focus:outline-none focus-visible:outline-none focus:ring-0 whitespace-nowrap',
                          'font-[family-name:var(--font-family-nav)]',
                          'text-[#4c5663] hover:text-black visited:text-[#4c5663] active:text-[#4c5663]'
                        )}
                        style={{ fontFamily: 'var(--font-family-nav)', color: '#4c5663', textDecoration: 'none' }}
                      >
                        <span 
                          className="text-sm xl:text-base font-bold uppercase visited:text-[#4c5663] active:text-[#4c5663]" 
                          style={{ fontFamily: 'var(--font-family-nav)', color: '#4c5663' }}
                        >
                          {item.title}
                        </span>
                      </a>
                    );
                  }
                  
                  return (
                    <Link
                      key={key}
                      href={item.link}
                      onClick={(e) => {
                        // Only handle hash links, let Next.js handle regular navigation
                        if (item.link.includes('#')) {
                          handleLinkClick(e, item.link);
                        } else {
                          // Just close mobile menu for regular links
                          setIsMenuOpen(false);
                          setOpenMobileMenu(null);
                          setOpenMobileSubMenu(null);
                          document.body.style.overflow = '';
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
                      className={cn(
                        'text-sm xl:text-base font-bold uppercase transition-colors rounded-md px-2 xl:px-3 py-2 h-full flex items-center no-underline focus:outline-none focus-visible:outline-none focus:ring-0 whitespace-nowrap',
                        'font-[family-name:var(--font-family-nav)]',
                        'visited:text-[#4c5663] active:text-[#4c5663]',
                        pathname === item.link || hoveredNavItem === key
                          ? 'text-black visited:text-black active:text-black'
                          : 'text-[#4c5663] hover:text-black visited:text-[#4c5663] active:text-[#4c5663]'
                      )}
                      style={{ 
                        fontFamily: 'var(--font-family-nav)', 
                        color: pathname === item.link || hoveredNavItem === key ? '#000000' : '#4c5663',
                        textDecoration: 'none'
                      }}
                    >
                      <span 
                        className={cn(
                          'text-sm xl:text-base font-bold uppercase',
                          pathname === item.link || hoveredNavItem === key ? 'text-black' : 'text-[#4c5663]'
                        )}
                        style={{ fontFamily: 'var(--font-family-nav)' }}
                      >
                        {item.title}
                      </span>
                    </Link>
                  );
                }
              })}
            </div>

            {/* RIGHT SIDE: Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Theme Toggle - Commented out as not currently used */}
              {/* <ThemeToggle /> */}
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
                    document.body.style.overflow = 'hidden';
                  } else {
                    document.body.style.overflow = '';
                  }
                }}
                className="block lg:hidden p-2 rounded-md hover:bg-[#f0f2f5] transition-colors text-black z-[100] relative flex-shrink-0"
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
              className="hidden lg:block fixed inset-0 top-16 bg-black/20 z-40"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            />
            
            {/* Mega Menu */}
            <div
              ref={dropdownRef}
              className="hidden lg:block fixed inset-x-0 top-16 bg-[#f1f5f9] z-50 border-t border-[#e2e8f0] shadow-lg rounded-b-lg"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              style={{ marginTop: '0' }}
            >
              <div className={cn(
                "container max-w-[1400px] mx-auto px-4",
                hoveredMenu === 'education' || hoveredMenu === 'community' ? 'py-8' : 'py-6'
              )}>
                <div className="flex gap-8">
                  {/* LEFT: Fixed width menu list - showing all sub-items of current menu */}
                  <div className="w-80 flex-shrink-0">
                    <div className="space-y-2 py-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 mega-menu-scroll" style={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>
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
                                    ? 'bg-white border-[#facc14] shadow-md'
                                    : 'bg-white border-[#e2e8f0] hover:bg-white hover:border-[#facc14] hover:shadow-md'
                                )}
                              >
                                <div className={cn(
                                  'flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-colors bg-transparent',
                                  isHovered || clickedSection === `${hoveredMenu}-${index}`
                                    ? 'text-[#facc14]'
                                    : 'text-black'
                                )}>
                                  <subItem.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 text-left">
                                  <div className={cn(
                                    'font-medium text-base',
                                    isHovered || clickedSection === `${hoveredMenu}-${index}` ? 'text-black' : 'text-[#4c5663]'
                                  )}>{subItem.title}</div>
                                  <div className="text-sm text-[#4c5663] mt-0.5">
                                    {subItem.description}
                                  </div>
                                </div>
                                <ChevronRight className={cn(
                                  'h-5 w-5 flex-shrink-0 transition-colors',
                                  isHovered || clickedSection === `${hoveredMenu}-${index}` ? 'text-[#facc14]' : 'text-[#4c5663]'
                                )} />
                              </div>
                            ) : (
                              (() => {
                                const linkUrl = getLinkUrl(subItem.link);
                                const isExternal = !pageExists(subItem.link);
                                
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
                                      className="flex items-center gap-4 p-4 my-2 rounded-lg transition-all duration-200 group border border-[#e2e8f0] bg-white hover:bg-white hover:border-[#facc14] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                    >
                                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-black flex items-center justify-center group-hover:text-[#facc14] transition-colors">
                                        <subItem.icon className="h-5 w-5" />
                                      </div>
                                      <div className="flex-1 text-left">
                                        <div className="font-medium text-base text-[#4c5663] group-hover:text-black">{subItem.title}</div>
                                        <div className="text-sm text-[#4c5663] mt-0.5">
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
                                    className="flex items-center gap-4 p-4 my-2 rounded-lg transition-all duration-200 group border border-[#e2e8f0] bg-white hover:bg-white hover:border-[#facc14] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                  >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-black flex items-center justify-center group-hover:text-[#facc14] transition-colors">
                                      <subItem.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 text-left">
                                      <div className="font-medium text-base text-[#4c5663] group-hover:text-black">{subItem.title}</div>
                                      <div className="text-sm text-[#4c5663] mt-0.5">
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

                  {/* RIGHT: Dynamic sub-items grid - showing nested sub-items if any */}
                  <div className="flex-1 border-l border-[#e2e8f0] pl-8 max-h-[calc(100vh-12rem)] overflow-y-auto mega-menu-scroll" style={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>
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
                          <div className="flex items-center justify-center min-h-[300px] py-4">
                            <p className="text-[#64748b] text-sm">
                              {activeSection ? 'Hover over a menu item to see options' : 'Select a category to view options'}
                            </p>
                          </div>
                        );
                      }
                      
                      const nestedSubItems = activeSubItem.subItems || [];
                      
                      return (
                        <div className="py-3 pe-3">
                          <div className="mb-3 border-b border-[#e2e8f0]">
                            <h3 className="text-lg font-semibold text-black mb-2">
                              {activeSubItem.title}
                            </h3>
                            <p className="text-sm text-[#64748b]">
                              {activeSubItem.description}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-2">
                            {nestedSubItems.map((nestedItem: SubMenuItem, nestedIndex: number) => {
                              const linkUrl = getLinkUrl(nestedItem.link);
                              const isExternal = !pageExists(nestedItem.link);
                              
                              if (isExternal) {
                                return (
                                  <a
                                    key={nestedIndex}
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 p-4 rounded-lg transition-all duration-200 group border border-[#e2e8f0] bg-white hover:bg-white hover:border-[#facc14] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                  >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-black flex items-center justify-center group-hover:text-[#facc14] transition-colors mt-0.5">
                                      <nestedItem.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-base text-[#4c5663] group-hover:text-black mb-1">
                                        {nestedItem.title}
                                      </div>
                                      <div className="text-sm text-[#4c5663]">
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
                                  className="flex items-start gap-3 p-4 rounded-lg transition-all duration-200 group border border-[#e2e8f0] bg-white hover:bg-white hover:border-[#facc14] hover:shadow-md focus:outline-none focus-visible:outline-none no-underline"
                                >
                                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-transparent text-black flex items-center justify-center group-hover:text-[#facc14] transition-colors mt-0.5">
                                    <nestedItem.icon className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-base text-[#4c5663] group-hover:text-black mb-1">
                                      {nestedItem.title}
                                    </div>
                                    <div className="text-sm text-[#4c5663]">
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
              className="lg:hidden fixed inset-0 top-16 bg-black/20 z-[90]"
            onClick={() => {
              setIsMenuOpen(false);
              setOpenMobileMenu(null);
              setOpenMobileSubMenu(null);
              document.body.style.overflow = '';
            }}
          />
          {/* Mobile Menu */}
          <div 
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white border-t border-[#ced2d9] z-[100] overflow-y-auto shadow-lg"
            style={{ display: 'block', visibility: 'visible', pointerEvents: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container max-w-7xl mx-auto px-2 sm:px-4 py-6">
              <div className="space-y-1">
                {Object.entries(menuItems).map(([key, item]) => (
                  <div key={key} className="border-b border-[#ced2d9] last:border-0">
                    {item.subItems && item.subItems.length > 0 ? (
                      <div className="py-2">
                        {/* Clickable header to toggle dropdown */}
                        <button
                          onClick={() => {
                            setOpenMobileMenu(openMobileMenu === key ? null : key);
                          }}
                          className="w-full flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-[#f0f2f5] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0"
                        >
                          <div className="w-10 h-10 rounded-md bg-transparent text-black flex items-center justify-center flex-shrink-0 group-hover:text-[#facc14] transition-colors">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm text-black">
                              {item.title}
                            </div>
                            <div className="text-xs text-[#4c5663]">
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight 
                            className={cn(
                              "h-5 w-5 text-[#4c5663] transition-transform duration-200 flex-shrink-0",
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
                              const isExternal = !pageExists(subItem.link);
                              
                              // If sub-item has nested sub-items, make it a button
                              if (hasNestedSubItems) {
                                return (
                                  <div key={index}>
                                    <button
                                      onClick={() => {
                                        setOpenMobileSubMenu(openMobileSubMenu === subMenuKey ? null : subMenuKey);
                                      }}
                                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f2f5] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 text-left"
                                    >
                                      <div className="w-8 h-8 rounded-md bg-transparent text-black flex items-center justify-center flex-shrink-0 group-hover:text-[#facc14] transition-colors">
                                        <subItem.icon className="h-4 w-4" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-sm text-black">
                                          {subItem.title}
                                        </div>
                                        <div className="text-xs text-[#4c5663]">
                                          {subItem.description}
                                        </div>
                                      </div>
                                      <ChevronRight 
                                        className={cn(
                                          "h-4 w-4 text-[#4c5663] transition-transform duration-200 flex-shrink-0",
                                          openMobileSubMenu === subMenuKey ? "rotate-90" : ""
                                        )}
                                      />
                                    </button>
                                    {/* Nested sub-items dropdown */}
                                    {openMobileSubMenu === subMenuKey && subItem.subItems && (
                                      <div className="pl-8 space-y-1 mt-1">
                                        {subItem.subItems.map((nestedItem, nestedIndex) => {
                                          const nestedLinkUrl = getLinkUrl(nestedItem.link);
                                          const isNestedExternal = !pageExists(nestedItem.link);
                                          
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
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f0f2f5] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                              >
                                                <div className="w-6 h-6 rounded-md bg-transparent text-black flex items-center justify-center flex-shrink-0 group-hover:text-[#facc14] transition-colors">
                                                  <nestedItem.icon className="h-3 w-3" />
                                                </div>
                                                <div className="flex-1">
                                                  <div className="font-medium text-xs text-black">
                                                    {nestedItem.title}
                                                  </div>
                                                  <div className="text-xs text-[#4c5663]">
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
                                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f0f2f5] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                            >
                                              <div className="w-6 h-6 rounded-md bg-transparent text-black flex items-center justify-center flex-shrink-0 group-hover:text-[#facc14] transition-colors">
                                                <nestedItem.icon className="h-3 w-3" />
                                              </div>
                                              <div className="flex-1">
                                                <div className="font-medium text-xs text-black">
                                                  {nestedItem.title}
                                                </div>
                                                <div className="text-xs text-[#4c5663]">
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
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f2f5] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                    style={{ textDecoration: 'none' }}
                                  >
                                    <div className="w-8 h-8 rounded-md bg-transparent text-black flex items-center justify-center flex-shrink-0 group-hover:text-[#facc14] transition-colors">
                                      <subItem.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-sm text-black" style={{ textDecoration: 'none' }}>
                                        {subItem.title}
                                      </div>
                                      <div className="text-xs text-[#4c5663]" style={{ textDecoration: 'none' }}>
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
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f2f5] transition-colors group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <div className="w-8 h-8 rounded-md bg-transparent text-black flex items-center justify-center flex-shrink-0 group-hover:text-[#facc14] transition-colors">
                                    <subItem.icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-black" style={{ textDecoration: 'none' }}>
                                      {subItem.title}
                                    </div>
                                    <div className="text-xs text-[#4c5663]" style={{ textDecoration: 'none' }}>
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
                          'flex items-center gap-3 py-4 hover:bg-[#f0f2f5] transition-colors rounded-lg px-2 group focus:outline-none focus-visible:outline-none focus:ring-0 no-underline',
                          pathname === item.link ? 'bg-[#fefbd6]' : ''
                        )}
                      >
                        <div className="w-10 h-10 rounded-md bg-transparent text-black flex items-center justify-center flex-shrink-0 group-hover:text-[#facc14] transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-black">
                            {item.title}
                          </div>
                          <div className="text-xs text-[#4c5663]">
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
    </>
  );
}
