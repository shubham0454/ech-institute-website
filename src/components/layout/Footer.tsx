'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'X (Twitter)', 
      href: 'https://x.com/ECHinstitute',
      svg: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"></path></svg>
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/echinstitute',
      svg: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
    },
    { 
      name: 'YouTube', 
      href: 'https://www.youtube.com/@echinstitute',
      svg: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path></svg>
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/company/ethereum-cat-herders/',
      svg: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M22.0367422,22 L17.8848745,22 L17.8848745,15.5036305 C17.8848745,13.9543347 17.85863,11.9615082 15.7275829,11.9615082 C13.5676669,11.9615082 13.237862,13.6498994 13.237862,15.3925291 L13.237862,22 L9.0903683,22 L9.0903683,8.64071385 L13.0707725,8.64071385 L13.0707725,10.4673257 L13.1276354,10.4673257 C13.6813927,9.41667396 15.0356049,8.3091593 17.0555507,8.3091593 C21.2599073,8.3091593 22.0367422,11.0753215 22.0367422,14.6734319 L22.0367422,22 Z M4.40923804,6.81585163 C3.07514653,6.81585163 2,5.73720584 2,4.40748841 C2,3.07864579 3.07514653,2 4.40923804,2 C5.73720584,2 6.81585163,3.07864579 6.81585163,4.40748841 C6.81585163,5.73720584 5.73720584,6.81585163 4.40923804,6.81585163 L4.40923804,6.81585163 Z M6.48604672,22 L2.32980492,22 L2.32980492,8.64071385 L6.48604672,8.64071385 L6.48604672,22 Z"></path></svg>
    },
    { 
      name: 'Reddit', 
      href: 'https://www.reddit.com/r/EthereumCatHerders/',
      svg: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.167 8a.831.831 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661zm1.843 3.647c.315 0 1.403-.038 1.976-.611a.232.232 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z"></path><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.203.203 0 0 0-.153.028.186.186 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256 2.577 0 4.668-1.451 4.668-3.256 0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z"></path></svg>
    },
    { 
      name: 'Discord', 
      href: 'https://discord.com/invite/Nz6rtfJ8Cu',
      svg: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"></path></svg>
    },
    { 
      name: 'Warpcast', 
      href: 'https://farcaster.xyz/ethcatherders',
      svg: <svg width="20" height="20" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z" fill="currentColor"></path><path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z" fill="currentColor"></path><path d="M675.556 746.667C663.282 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z" fill="currentColor"></path></svg>
    },
  ];

  const footerLinks = [
    { name: 'Upgrades', href: '/upgrades' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Abouts', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Donate', href: '/donate' },
  ];

  return (
    <footer className="w-full border-t border-[#ced2d9]" style={{ backgroundColor: '#3d3d3d' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-4 sm:pb-6 lg:pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Brand Section - col-6 */}
          <div className="md:col-span-6 lg:col-span-6">
            <div className="mb-3 sm:mb-4">
              <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                <Image
                  src="/assets/ech_full_logo.png"
                  alt="ECH Institute Logo"
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 object-contain flex-shrink-0"
                  style={{ background: 'transparent'}}
                />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-0 leading-tight">
                  ECH Institute
                </h2>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 leading-relaxed">
                Herding Knowledge, Building Community, Homesteading Ethereum!
              </p>
              {/* Paws Image - Responsive with reduced height */}
              <div className="mb-2 sm:mb-3 w-full max-w-xs sm:max-w-sm lg:max-w-md">
                <Image
                  src="/assets/images/paws.png"
                  alt="Paws"
                  width={300}
                  height={100}
                  className="w-full h-auto object-contain max-h-20 sm:max-h-24 lg:max-h-28"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
          </div>

          {/* Links Section - col-2 */}
          <div className="md:col-span-3 lg:col-span-2 mt-4 md:mt-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 list-none pl-0">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-white/80 transition-colors text-sm sm:text-base md:text-lg no-underline focus:outline-none focus-visible:outline-none block"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section - col-4 */}
          <div className="md:col-span-3 lg:col-span-4 mt-4 md:mt-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">Follow Us</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
              {socialLinks.map((social) => {
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/50 p-2 sm:p-2.5 lg:p-3 rounded-full text-white hover:border-white hover:bg-white/10 transition-all focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 no-underline flex items-center justify-center [&_svg]:text-white [&_svg]:fill-white [&_svg]:stroke-white"
                    aria-label={social.name}
                    tabIndex={0}
                    style={{ color: 'white' }}
                  >
                    <span className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">
                      {social.svg}
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="mt-3 sm:mt-4">
              <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">Email Us</h4>
              <a
                href="mailto:team@ethcatherders.com"
                className="text-white hover:text-white/80 transition-colors text-base sm:text-lg md:text-xl lg:text-xl break-all no-underline focus:outline-none focus-visible:outline-none block"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                team@ethcatherders.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-3 sm:my-4 lg:my-5"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-white/90 max-w-2xl">
            <span className="text-center sm:text-left leading-relaxed">
              All content and resources on our website are for educational purposes only.
            </span>
          </div>
          <div className="text-xs sm:text-sm md:text-base text-white/90 whitespace-nowrap">
            <span>&copy; {currentYear} ECH Institute, Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
