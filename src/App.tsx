import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformOverview from './components/PlatformOverview';
import EventDiscovery from './components/EventDiscovery';
import OrganizationsSection from './components/OrganizationsSection';
import MobileAppShowcase from './components/MobileAppShowcase';
import DriverEcosystem from './components/DriverEcosystem';
import WhyVroom from './components/WhyVroom';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PortalPage from './components/PortalPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfUsePage from './components/TermsOfUsePage';
import DeleteAccountPage from './components/DeleteAccountPage';
import EventDetailPage from './components/EventDetailPage';
import DeeplinkPage from './components/DeeplinkPage';
import MobileSmartBanner from './components/MobileSmartBanner';
import { DatabaseEvent } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showPortalPage, setShowPortalPage] = useState(false);
  const [portalTab, setPortalTab] = useState<'fan' | 'organizer'>('fan');
  const [showPrivacyPage, setShowPrivacyPage] = useState(false);
  const [showTermsPage, setShowTermsPage] = useState(false);
  const [showDeleteAccountPage, setShowDeleteAccountPage] = useState(false);
  const [showDeeplinkPage, setShowDeeplinkPage] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DatabaseEvent | null>(null);
  const scrollPosRef = useRef(0);

  // Professional UX: Handle sub-page navigation state and scroll restoration
  const openSubPage = (type: 'event' | 'privacy' | 'terms' | 'delete-account' | 'portal' | 'deeplink', data?: any) => {
    scrollPosRef.current = window.scrollY;
    
    // Clear all sub-page states first
    setSelectedEvent(null);
    setShowPrivacyPage(false);
    setShowTermsPage(false);
    setShowDeleteAccountPage(false);
    setShowPortalPage(false);
    setShowDeeplinkPage(false);

    if (type === 'event') setSelectedEvent(data);
    if (type === 'deeplink') setShowDeeplinkPage(true);
    if (type === 'privacy') {
      setShowPrivacyPage(true);
      window.location.hash = 'privacidade';
    }
    if (type === 'terms') {
      setShowTermsPage(true);
      window.location.hash = 'termos';
    }
    if (type === 'delete-account') {
      setShowDeleteAccountPage(true);
      window.location.hash = 'eliminar-conta';
    }
    if (type === 'portal') {
      if (data === 'register' || data === 'dashboard') setPortalTab('organizer');
      else setPortalTab('fan');
      setShowPortalPage(true);
      window.location.hash = 'portal';
    }
    window.scrollTo(0, 0);
  };

  const closeSubPage = () => {
    setSelectedEvent(null);
    setShowPrivacyPage(false);
    setShowTermsPage(false);
    setShowDeleteAccountPage(false);
    setShowPortalPage(false);
    setShowDeeplinkPage(false);
    
    // Clear hash if we are on a sub-page hash
    if (['#privacidade', '#termos', '#eliminar-conta', '#portal', '#deeplink'].includes(window.location.hash)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Restore scroll position after React has swapped components
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'auto'
      });
    }, 10);
  };

  // Sync state with URL hash & query params for direct linking and deeplinks
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);

      if (pathname.includes('deeplink') || hash === '#deeplink' || params.has('eventoID')) {
        setShowDeeplinkPage(true);
      } else if (params.get('event')) {
        const eventId = params.get('event');
        if (eventId) {
          openSubPage('event', { id: eventId });
        }
      } else if (hash === '#privacidade' && !showPrivacyPage) {
        openSubPage('privacy');
      } else if (hash === '#termos' && !showTermsPage) {
        openSubPage('terms');
      } else if (hash === '#eliminar-conta' && !showDeleteAccountPage) {
        openSubPage('delete-account');
      } else if (hash === '#portal' && !showPortalPage) {
        openSubPage('portal');
      } else if (!hash || hash === '#home') {
        if (showPrivacyPage || showTermsPage || showDeleteAccountPage || showPortalPage || showDeeplinkPage) {
          closeSubPage();
        }
      }
    };

    handleLocationChange();

    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  // Tracking active section with scroll position
  useEffect(() => {
    // Check if redirect to app store is requested
    const params = new URLSearchParams(window.location.search);
    if (params.get('download') === 'true') {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        window.location.href = "https://apps.apple.com/pt/app/vroom-pt/id6751053867";
      } else {
        window.location.href = "https://play.google.com/store/apps/details?id=com.baseguy.shedulebase&hl=pt_PT";
      }
      return;
    }
    
    const handleScroll = () => {
      if (showPrivacyPage || showTermsPage || showDeleteAccountPage || selectedEvent || showPortalPage) return;
      const sections = ['home', 'overview', 'events', 'organizations-section', 'drivers', 'app', 'faq'];
      const scrollPosition = window.scrollY + 150; // offset for the navbar

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenPrivacy = () => {
    openSubPage('privacy');
  };

  const handleOpenTerms = () => {
    openSubPage('terms');
  };

  const handleOpenDeleteAccount = () => {
    openSubPage('delete-account');
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenPortal = (mode: 'login' | 'register' | 'dashboard') => {
    openSubPage('portal', mode);
  };

  return (
    <div className="min-h-screen bg-dark-bg font-sans antialiased text-slate-100 overflow-x-hidden">
      
      {/* Navigation Header */}
      {!showPrivacyPage && !showTermsPage && !showDeleteAccountPage && !selectedEvent && !showPortalPage && !showDeeplinkPage && (
        <Navbar 
          onOpenPortal={handleOpenPortal} 
          activeSection={activeSection} 
        />
      )}

      {/* Main Content Sections */}
      {showDeeplinkPage ? (
        <DeeplinkPage onClose={closeSubPage} onOpenEvent={(ev) => openSubPage('event', ev)} />
      ) : selectedEvent ? (
        <EventDetailPage event={selectedEvent} onClose={closeSubPage} />
      ) : showPrivacyPage ? (
        <PrivacyPolicyPage onClose={closeSubPage} />
      ) : showTermsPage ? (
        <TermsOfUsePage onClose={closeSubPage} onOpenDeleteAccount={handleOpenDeleteAccount} />
      ) : showDeleteAccountPage ? (
        <DeleteAccountPage onClose={closeSubPage} />
      ) : showPortalPage ? (
        <PortalPage onClose={closeSubPage} initialTab={portalTab} />
      ) : (
        <main>
          {/* Hero Section */}
          <Hero 
            onOpenPortal={handleOpenPortal} 
            onScrollToSection={handleScrollToSection} 
          />

          {/* Platform Overview Block (Fans, Organizations, Drivers) */}
          <PlatformOverview 
            onOpenPortal={handleOpenPortal} 
            onScrollToSection={handleScrollToSection} 
          />

          {/* Event Discovery Section (New Core Marketing Hub) */}
          <EventDiscovery onEventSelect={(ev) => openSubPage('event', ev)} />

          {/* Dedicated Organizations Feature Section */}
          <OrganizationsSection 
            onOpenPortal={handleOpenPortal} 
          />

          {/* Driver Profile Ecosystem Showcase */}
          <DriverEcosystem />

          {/* Interactive iOS Smartphone App Showcase */}
          <MobileAppShowcase />

          {/* Key differentiators: Why Vroom.pt */}
          <WhyVroom />

          {/* Social Proof (Counters, stats, organizer testimonials) */}
          <SocialProof />

          {/* Accordion FAQ by Audience Segment */}
          <FAQ />
        </main>
      )}

      {!showPrivacyPage && !showTermsPage && !showDeleteAccountPage && !selectedEvent && !showPortalPage && !showDeeplinkPage && (
        <>
          {/* Footer & Contact */}
          <Footer 
            onOpenPrivacy={handleOpenPrivacy} 
            onOpenTerms={handleOpenTerms} 
          />

          {/* Smart installation prompt for mobile browsers */}
          <MobileSmartBanner />
        </>
      )}

    </div>
  );
}
