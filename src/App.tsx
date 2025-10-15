import React, { useEffect, useState } from 'react';
import { Camera, Menu, X, Mail, Phone, MapPin, Facebook, MessageSquareText } from 'lucide-react';
import logo from './assets/logo1.png';

// Hero images (imported so bundler includes them)
import hero1 from './assets/8.jpg';
import hero2 from './assets/16.jpg';
import hero3 from './assets/14.jpg';
import hero4 from './assets/2.jpg';

// Portfolio & about images
import wed1 from './assets/weding1.jpg';
import out1 from './assets/out1.jpg';
import pot2 from './assets/pot2.jpg';
import weddingCeremony from './assets/5.jpg';
import nature18 from './assets/18.jpg';
import studioShot from './assets/7.jpg';
import pot1 from './assets/pot1.jpg';
import weddingDetails from './assets/9.jpg';
import aboutPic from './assets/22.jpg';

type ImageItem = {
  id: number;
  category: string;
  url: string;
  alt: string;
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // Coupon dialog state
  const [showCouponDialog, setShowCouponDialog] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [applyTarget, setApplyTarget] = useState<'selected' | 'all'>('selected');

  const heroImages: string[] = [hero1, hero2, hero3, hero4];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'indoor', label: 'Indoor' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'portrait', label: 'Portraits' }
  ];

  const portfolioImages: ImageItem[] = [
    { id: 1, category: 'wedding', url: wed1, alt: 'Wedding photography' },
    { id: 2, category: 'wedding', url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Wedding couple' },
    { id: 3, category: 'outdoor', url: out1, alt: 'Outdoor portrait' },
    { id: 4, category: 'portrait', url: pot2, alt: 'Portrait' },
    { id: 5, category: 'wedding', url: weddingCeremony, alt: 'Wedding ceremony' },
    { id: 6, category: 'outdoor', url: nature18, alt: 'Nature portrait' },
    { id: 7, category: 'indoor', url: studioShot, alt: 'Studio shot' },
    { id: 8, category: 'portrait', url: pot1, alt: 'Portrait photography' },
    { id: 9, category: 'wedding', url: weddingDetails, alt: 'Wedding details' }
  ];

  const filteredImages = selectedCategory === 'all'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === selectedCategory);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic local handling — replace with API/Firebase code as needed
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const service = formData.get('service') as string | null;
    const message = formData.get('message') as string | null;

    // For now just log — you can replace with fetch/Axios to send to a server
    console.log({ name, phone, service, message });
    alert('Message sent (demo). Check console for data.');
    form.reset();
  };

  // Controlled contact form state for service & package
  const [contactService, setContactService] = useState<string>('');
  const [contactPackage, setContactPackage] = useState<string>('');

  const choosePackage = (service: string, pack: string) => {
    setContactService(service);
    setContactPackage(pack);
    // open contact form
    setMobileMenuOpen(false);
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pricing map (base prices)
  const PRICES: Record<string, Record<string, number>> = {
    wedding: { Basic: 400, Standard: 800, Premium: 1400 },
    indoor: { Basic: 80, Standard: 180, Premium: 320 },
    outdoor: { Basic: 120, Standard: 260, Premium: 420 }
  };

  const DISCOUNT_AMOUNT = 500; // 500 tk discount when coupon applied

  const renderPrice = (service: string, tier: 'Basic' | 'Standard' | 'Premium') => {
    const original = PRICES[service]?.[tier] ?? 0;
    const isApplied = appliedCoupon?.toLowerCase() === 'arnob500' && (applyTarget === 'all' || (applyTarget === 'selected' && contactPackage === tier));
    const discounted = isApplied ? Math.max(0, original - DISCOUNT_AMOUNT) : original;

    if (isApplied) {
      return (
        <>
          <div className="line-through text-sm text-slate-500">৳{original}</div>
          <div className="text-amber-600 font-extrabold text-xl">৳{discounted}</div>
        </>
      );
    }

    return <div className="text-amber-600 font-extrabold text-xl">৳{original}</div>;
  };

  return (
    <div className="min-h-screen font-zilla bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <a href="/"> <img src={logo} alt="logo" loading="lazy" decoding="async" className="top-[-5px] relative w-24 h-24 " /></a>
              <a href="#"><span className={`text-4xl font-mina font-extrabold transition-colors relative top-2 ${isScrolled ? 'text-white' : 'text-white'}`}>চিত্রলেখা</span></a>
            </div>

            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className={`transition-colors ${isScrolled ? 'text-white hover:text-amber-600' : 'text-white hover:text-amber-400'}`}>Home</button>
              <button onClick={() => scrollToSection('portfolio')} className={`transition-colors ${isScrolled ? 'text-white hover:text-amber-600' : 'text-white hover:text-amber-400'}`}>Gallery</button>
              <button onClick={() => scrollToSection('about')} className={`transition-colors ${isScrolled ? 'text-white hover:text-amber-600' : 'text-white hover:text-amber-400'}`}>About</button>
              <button onClick={() => scrollToSection('services')} className={`transition-colors ${isScrolled ? 'text-white hover:text-amber-600' : 'text-white hover:text-amber-400'}`}>Services</button>
              <button onClick={() => scrollToSection('contact')} className={`transition-colors ${isScrolled ? 'text-white hover:text-amber-600' : 'text-white hover:text-amber-400'}`}>Contact</button>
            </div>

            <button
              className={`md:hidden transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
            <div className="px-4 py-3 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-slate-600 hover:text-amber-600 py-2">Home</button>
              <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left text-slate-600 hover:text-amber-600 py-2">Gallery</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-600 hover:text-amber-600 py-2">About</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-slate-600 hover:text-amber-600 py-2">Services</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-slate-600 hover:text-amber-600 py-2">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
              <img src={image} alt={`Hero ${index + 1}`} loading={index === currentSlide ? 'eager' : 'lazy'} decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-amber-900/80"></div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-ribeye font-bold mb-6 leading-tight animate-fade-in">
            Capturing Your<br />
            <span className="text-amber-400 font-ribeye top-3 relative">Precious Moments</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto">
            Professional wedding, indoor, and outdoor photography that tells your unique story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('portfolio')} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-xl">View Gallery</button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold transition-all border border-white/20">Book a Session</button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroImages.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50 hover:bg-white/80'}`} />
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Gallery</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Explore my collection of wedding ceremonies, indoor shoots, and outdoor adventures</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.id ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map(image => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square">
                  <img src={image.url} alt={image.alt} loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-lg font-semibold p-6 capitalize">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">About Me</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">With a passion for capturing life's most beautiful moments, I specialize in wedding photography and creative indoor and outdoor shoots. Every photograph tells a story, and I'm here to help you tell yours.</p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">My approach combines technical expertise with artistic vision, ensuring that each image reflects the genuine emotions and atmosphere of the moment. Whether it's your wedding day, a family portrait, or a creative photoshoot, I'm dedicated to delivering stunning results that you'll treasure forever.</p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-1 bg-amber-600"></div>
                
                <span className="text-slate-600 font-medium">Professional Photographer Since 2022</span>
              </div>
              <div className="mt-8 bg-white p-4 rounded-lg shadow-md inline-block">
                <div className="flex items-center space-x-4">
                  <img src={logo} alt="owner" className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-800">Showrov Sarkar</div>
                    <div className="text-sm text-slate-600">Lead Photographer & Founder</div>
                    <div className="text-sm text-slate-600 mt-2">showrovsarkar64@gmail.com</div>
                    <div className="text-sm text-slate-600">+8801646-402352</div>
                    <div className="flex items-center space-x-2 mt-2">
                    
                      
                      <a href="https://www.facebook.com/showrovesarker01646402352" className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src={aboutPic} alt="Photographer at work" loading="lazy" decoding="async" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Services</h2>
            <p className="text-lg text-slate-600">Comprehensive photography services tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Wedding Photography</h3>
              <p className="text-slate-600 mb-4">Complete wedding day coverage including ceremony, reception, and candid moments. Professional editing and custom photo albums included.</p>
              <ul className="text-slate-600 space-y-2">
                <li>• Full day coverage</li>
                <li>• Engagement shoots</li>
                <li>• Custom albums</li>
                <li>• High-resolution photos</li>
              </ul>
              {/* Pricing packages */}
              <div className="mt-6 border-t pt-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Pricing & Packages</h4>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Basic</div>
                    <div className="text-sm text-slate-600">4 hours • 200 edited photos</div>
                    <div>{renderPrice('wedding', 'Basic')}</div>
                    <button onClick={() => choosePackage('wedding', 'Basic')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Standard</div>
                    <div className="text-sm text-slate-600">8 hours • 500 edited photos</div>
                    <div>{renderPrice('wedding', 'Standard')}</div>
                    <button onClick={() => choosePackage('wedding', 'Standard')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Premium</div>
                    <div className="text-sm text-slate-600">Full day • Album & prints</div>
                    <div>{renderPrice('wedding', 'Premium')}</div>
                    <button onClick={() => choosePackage('wedding', 'Premium')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Indoor Photography</h3>
              <p className="text-slate-600 mb-4">Studio and indoor location shoots with professional lighting. Perfect for portraits, product photography, and creative concepts.</p>
              <ul className="text-slate-600 space-y-2">
                <li>• Studio sessions</li>
                <li>• Portrait photography</li>
                <li>• Product shoots</li>
                <li>• Professional lighting</li>
              </ul>
              {/* Pricing packages */}
              <div className="mt-6 border-t pt-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Pricing & Packages</h4>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Basic</div>
                    <div className="text-sm text-slate-600">1 hour • 20 edited photos</div>
                    <div>{renderPrice('indoor', 'Basic')}</div>
                    <button onClick={() => choosePackage('indoor', 'Basic')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Standard</div>
                    <div className="text-sm text-slate-600">2 hours • 60 edited photos</div>
                    <div>{renderPrice('indoor', 'Standard')}</div>
                    <button onClick={() => choosePackage('indoor', 'Standard')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Premium</div>
                    <div className="text-sm text-slate-600">4 hours • Studio prints</div>
                    <div>{renderPrice('indoor', 'Premium')}</div>
                    <button onClick={() => choosePackage('indoor', 'Premium')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Outdoor Photography</h3>
              <p className="text-slate-600 mb-4">On-location outdoor shoots utilizing natural light and beautiful landscapes. Ideal for family photos, couples, and lifestyle photography.</p>
              <ul className="text-slate-600 space-y-2">
                <li>• Location scouting</li>
                <li>• Natural lighting</li>
                <li>• Lifestyle photography</li>
                <li>• Family portraits</li>
              </ul>
              {/* Pricing packages */}
              <div className="mt-6 border-t pt-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">Pricing & Packages</h4>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Basic</div>
                    <div className="text-sm text-slate-600">1.5 hours • 40 edited photos</div>
                    <div>{renderPrice('outdoor', 'Basic')}</div>
                    <button onClick={() => choosePackage('outdoor', 'Basic')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Standard</div>
                    <div className="text-sm text-slate-600">3 hours • 100 edited photos</div>
                    <div>{renderPrice('outdoor', 'Standard')}</div>
                    <button onClick={() => choosePackage('outdoor', 'Standard')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center border">
                    <div className="font-bold">Premium</div>
                    <div className="text-sm text-slate-600">Half day • Prints & edits</div>
                    <div>{renderPrice('outdoor', 'Premium')}</div>
                    <button onClick={() => choosePackage('outdoor', 'Premium')} className="mt-3 w-full text-sm bg-amber-600 text-white rounded-md px-2 py-1">Choose</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-lg text-slate-300 mb-8">Ready to capture your special moments? Get in touch to discuss your photography needs and book your session.</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-slate-300">showrovsarkar64@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-slate-300">+8801646-402352</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-slate-300">Available for bookings nationwide</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a href="https://wa.me/8801646402352?text=Hi%20I%20am%20interested%20in%20your%20photography%20services" target="_blank" rel="noopener noreferrer" aria-label="Message on WhatsApp" className="w-12 h-12 bg-white/10 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                  <MessageSquareText className="w-5 h-5" />
                </a>

                <a href="https://www.facebook.com/profile.php?id=61556441260355" target="_blank"className="w-12 h-12 bg-white/10 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 perspective-1000">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="transform transition-all duration-300 hover:translate-z-4 hover:shadow-2xl">
                  <h3 className="text-2xl font-bold text-amber-400 px-32 mb-6">Contact for Booking</h3>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" name="name" id="name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:shadow-lg focus:shadow-amber-400/20 transition-all text-white placeholder-slate-400 transform focus:scale-[1.02]" placeholder="Your name" />
                </div>

                <div className="transform transition-all duration-300 hover:translate-z-4 hover:shadow-2xl">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Mobile Number</label>
                  <input type="tel" name="phone" id="phone" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:shadow-lg focus:shadow-amber-400/20 transition-all text-white placeholder-slate-400 transform focus:scale-[1.02]" placeholder="e.g. +8801XXXXXXXXX" />
                </div>

                <div className="transform transition-all duration-300 hover:translate-z-4 hover:shadow-2xl">
                  <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interested In</label>
                  <select id="service" name="service" value={contactService} onChange={(e) => setContactService(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:shadow-lg focus:shadow-amber-400/20 transition-all text-white transform focus:scale-[1.02]">
                    <option value="" className="bg-slate-800">Select a service</option>
                    <option value="wedding" className="bg-slate-800">Wedding Photography</option>
                    <option value="indoor" className="bg-slate-800">Indoor Photography</option>
                    <option value="outdoor" className="bg-slate-800">Outdoor Photography</option>
                  </select>
                </div>

                <div className="transform transition-all duration-300 hover:translate-z-4 hover:shadow-2xl">
                  <label htmlFor="package" className="block text-sm font-medium mb-2">Selected Package</label>
                  <select id="package" name="package" value={contactPackage} onChange={(e) => setContactPackage(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:shadow-lg focus:shadow-amber-400/20 transition-all text-white transform focus:scale-[1.02]">
                    <option value="" className="bg-slate-800">Select a package</option>
                    <option value="Basic" className="bg-slate-800">Basic</option>
                    <option value="Standard" className="bg-slate-800">Standard</option>
                    <option value="Premium" className="bg-slate-800">Premium</option>
                  </select>
                </div>

                <div className="transform transition-all duration-300 hover:translate-z-4 hover:shadow-2xl">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:shadow-lg focus:shadow-amber-400/20 transition-all text-white placeholder-slate-400 transform focus:scale-[1.02]" placeholder="Tell me about your photography needs..."></textarea>
                </div>

                <button type="submit" className="w-full px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-600/50 active:scale-95">Send Message</button>

                {/* Apply Coupon Code */}
                <div className="mt-4 text-center">
                  <span className="text-slate-300">Have a coupon or referral code?</span>
                  <button type="button" onClick={() => setShowCouponDialog(true)} className="ml-2 text-amber-400 underline hover:text-amber-500">Apply Coupon Code</button>
                </div>

                {/* Coupon Dialog */}
                {showCouponDialog && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full">
                      <h4 className="text-lg font-bold mb-4 text-slate-600">Enter Coupon or Referral Code</h4>
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-600 rounded mb-2 focus:outline-none text-black  focus:border-amber-400"
                        placeholder="Type your code here"
                        autoFocus
                      />
                      <div className="text-sm text-slate-600 mb-3">Apply to:</div>
                      <div className="flex items-center gap-3 mb-4">
                        <label className="inline-flex text-black items-center">
                          <input type="radio" name="applyTarget" checked={applyTarget === 'selected'} onChange={() => setApplyTarget('selected')} className="mr-2 " />
                          Selected package only
                        </label>
                        
                      </div>
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowCouponDialog(false)} className="px-4 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300">Cancel</button>
                        <button type="button" onClick={() => {
                          const code = couponCode.trim().toLowerCase();
                          if (code === 'arnob500') {
                            setAppliedCoupon('arnob500');
                            setShowCouponDialog(false);
                            alert('Coupon arnob500 applied — ৳' + DISCOUNT_AMOUNT + ' off');
                          } else {
                            alert('Invalid coupon code');
                          }
                        }} className="px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700">Apply</button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className='font-mina'>&copy; 2025 চিত্রলেখা. All rights reserved.</p>

            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <div className="text-slate-300">Developed by</div>
                <div className="font-extrabold text-base">Arnob Sarker</div>
              </div>

              <div className="flex items-center space-x-3">
                <a href="https://facebook.com/arnobs21" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </a>
              {/* Owner info card */}
            
                <a href="https://wa.me/01868668422?text=Hi%20I%20am%20interested%20in%20developing%20website%20by%20you" target="_blank" rel="noopener noreferrer" aria-label="Message on WhatsApp" className="w-12 h-12 bg-white/10 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                  <MessageSquareText className="w-5 h-5" />
                </a>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
