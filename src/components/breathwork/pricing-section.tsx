"use client";

import { motion } from "framer-motion";
import { Check, Wind, Sparkles } from "lucide-react";

const pricingTiers = [
  {
    name: "Early Bird",
    price: 997,
    subtitle: "Limited Time Offer",
    description: "Begin your transformative journey with our special early bird rate",
    features: [
      "3 Days of Intensive Breathwork",
      "1-on-1 Integration Session",
      "Take-Home Practice Guide",
      "Community Access",
      "Recorded Sessions",
    ],
    isPopular: true,
    gradient: "from-[#A45C40] to-[#4A5043]",
    saveAmount: 500,
  },
  {
    name: "Regular",
    price: 1497,
    subtitle: "Standard Journey",
    description: "Full access to our transformative breathwork experience",
    features: [
      "3 Days of Intensive Breathwork",
      "1-on-1 Integration Session",
      "Take-Home Practice Guide",
      "Community Access",
      "Recorded Sessions",
    ],
    gradient: "from-[#4A5043] to-[#A45C40]",
  },
  {
    name: "VIP Experience",
    price: 2497,
    subtitle: "Premium Journey",
    description: "The ultimate breathwork transformation experience",
    features: [
      "All Regular Features",
      "Private Breathwork Session",
      "Extended Integration Support",
      "Priority Booking for Future Events",
      "Exclusive VIP Dinner",
      "Luxury Accommodation Upgrade",
    ],
    gradient: "from-[#A45C40] to-[#4A5043]",
    isVIP: true,
  },
];

export default function PricingSection() {
  const handlePurchase = async (tier: typeof pricingTiers[0]) => {
    // TODO: Implement Stripe checkout
    console.log(`Processing purchase for ${tier.name}`);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4A504310_1px,transparent_1px),linear-gradient(to_bottom,#4A504310_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[35rem] h-[35rem] rounded-full bg-[#A45C40]/5 blur-[120px]"
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * -8,
            }}
            style={{
              left: `${25 * i}%`,
              top: `${20 * i}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Experience Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 
                         bg-[#A45C40]/10 border border-[#A45C40]/20 
                         rounded-full backdrop-blur-sm">
              <Wind className="w-4 h-4 text-[#A45C40]" />
              <span className="text-sm font-medium tracking-wide text-white/90">
                Limited Time Offer
              </span>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
                <span className="text-white block">
                  Transform Your Life
                </span>
                <span className="text-[#A45C40] block mt-2">
                  Through Breath
                </span>
              </h2>
              
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
                Join our transformative 3-day breathwork journey and unlock your body's innate wisdom
              </p>

              {/* Social Proof */}
              <div className="flex flex-wrap justify-center gap-8 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#A45C40]" />
                  <span className="text-white/70">500+ Transformations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#A45C40]" />
                  <span className="text-white/70">15+ Countries</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#A45C40]" />
                  <span className="text-white/70">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden
                            backdrop-blur-xl transition-all duration-500 group-hover:bg-white/[0.05]
                            group-hover:border-[#A45C40]/30">
                
                {/* Card Content */}
                <div className="relative p-8">
                  {/* Popular/VIP Badge */}
                  {(tier.isPopular || tier.isVIP) && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                                 bg-[#A45C40] backdrop-blur-sm"
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                        <span className="text-xs font-medium text-white">
                          {tier.isVIP ? 'VIP Experience' : 'Most Popular'}
                        </span>
                      </motion.div>
                    </div>
                  )}

                  {/* Pricing Header */}
                  <div className="text-center mb-8 relative">
                    <h3 className="text-2xl font-medium text-white">
                      {tier.name}
                    </h3>
                    <p className="text-white/50 text-sm mt-2">{tier.subtitle}</p>
                    
                    {/* Price Display */}
                    <div className="mt-8 flex items-center justify-center">
                      <span className="text-5xl font-medium text-white">
                        ${tier.price}
                      </span>
                      <span className="ml-2 text-white/50">USD</span>
                    </div>
                    
                    {/* Savings Badge */}
                    {tier.saveAmount && (
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 bg-[#A45C40]/10 text-[#A45C40] 
                                     text-sm rounded-full font-medium">
                          Save ${tier.saveAmount}
                        </span>
                      </div>
                    )}
                    
                    <p className="mt-4 text-white/60 text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + featureIndex * 0.1 }}
                      >
                        <span className="mt-1 flex-shrink-0 text-[#A45C40]">
                          <Check className="w-4 h-4" />
                        </span>
                        <span className="text-white/70 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePurchase(tier)}
                    className="relative w-full group overflow-hidden"
                  >
                    <div className="relative px-6 py-4 rounded-xl bg-[#A45C40] 
                                  text-white font-medium tracking-wide
                                  transition-colors duration-200 hover:bg-[#A45C40]/90">
                      {tier.isVIP ? "Begin Your Journey" : "Reserve Your Space"}
                    </div>
                  </motion.button>

                  {/* Limited Spots Indicator */}
                  {tier.isPopular && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Wind className="w-4 h-4 text-[#A45C40]" />
                      <p className="text-sm font-medium text-[#A45C40]">
                        Only 5 spaces remaining
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          {/* Guarantee */}
          <div className="text-center space-y-2">
            <h3 className="text-[#A45C40] font-medium">100% Satisfaction Guarantee</h3>
            <p className="text-white/60 text-sm max-w-md">
              If you're not completely satisfied with your experience, we'll provide a full refund
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#A45C40]" />
              Secure booking
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#A45C40]" />
              Money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#A45C40]" />
              Instant confirmation
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 