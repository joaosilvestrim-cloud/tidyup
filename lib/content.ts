export type ServiceId = "standard" | "deep" | "moving";
export const photos = {
  living:
    "https://images.unsplash.com/photo-1630699295509-a199b5370538?auto=format&fit=crop&w=1800&q=85",
  bedroom:
    "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&w=1200&q=85",
};
export const services = [
  {
    id: "standard" as const,
    number: "01",
    name: "Standard Cleaning",
    short: "The everyday reset.",
    eyebrow: "FOR YOUR EVERYDAY",
    description:
      "A fresh, comfortable home that keeps up with your life. All the essentials, thoughtfully taken care of.",
    image: photos.living,
    alt: "A bright, tidy living room with natural light",
    features: [
      "Floors, carpets & mirrors",
      "Bathrooms & kitchen surfaces",
      "Dusting & everyday tidying",
    ],
    multiplier: 1,
  },
  {
    id: "deep" as const,
    number: "02",
    name: "Deep Cleaning",
    short: "A little deeper. A lot fresher.",
    eyebrow: "FOR A FRESH START",
    description:
      "Beyond the everyday. A detailed clean for the corners, surfaces, and little things that make a big difference.",
    image: photos.bedroom,
    alt: "A carefully arranged bedroom with fresh white linens",
    features: [
      "Everything in Standard",
      "Doors, blinds & ceiling fans",
      "Inside oven & microwave",
    ],
    multiplier: 1.65,
  },
  {
    id: "moving" as const,
    number: "03",
    name: "Moving Cleaning",
    short: "Ready for your next chapter.",
    eyebrow: "FOR HELLOS & GOODBYES",
    description:
      "Moving in or moving on? Leave the cleaning to us and give your next chapter the start it deserves.",
    image: photos.living,
    alt: "An airy residential interior ready to enjoy",
    features: [
      "Floors, surfaces & bathrooms",
      "Inside cabinets & refrigerator¹",
      "Baseboards & garage sweep",
    ],
    multiplier: 2.1,
  },
];
export const comparison = [
  ["Vacuuming & mopping", true, true, true],
  ["Kitchen surfaces & appliance exteriors", true, true, true],
  ["Bathroom fixtures & mirrors", true, true, true],
  ["Doors, blinds & ceiling fans", false, true, true],
  ["Inside oven & microwave", false, true, true],
  ["Inside cabinets & refrigerator¹", false, false, true],
  ["Baseboards & garage sweep", false, false, true],
] as const;
export function estimate(
  bedrooms: number,
  bathrooms: number,
  service: ServiceId,
) {
  const selected = services.find((s) => s.id === service)!;
  const low =
    Math.round(
      ((80 + 20 * bedrooms + 25 * bathrooms) * selected.multiplier) / 5,
    ) * 5;
  return { low, high: Math.round((low * 1.2) / 5) * 5 };
}
export const faqs = [
  [
    "Which clean is right for me?",
    "Choose Standard for regular upkeep. Deep adds detail work such as doors, blinds, ceiling fans, and the inside of your oven and microwave. Moving is designed for a move-in or move-out, including cabinet interiors and an empty refrigerator.",
  ],
  [
    "Do you clean in my neighborhood?",
    "TidyUp! serves Midland, Texas and surrounding areas. Call (432) 701-2112 to confirm coverage and availability for your address.",
  ],
  [
    "Is my estimate a confirmed booking?",
    "No. The calculator is an interactive demonstration with sample prices, not the company’s official rates. Your home’s condition and service requirements affect the final quote. Please contact the team to confirm pricing and availability.",
  ],
  [
    "What is included in Moving Cleaning?",
    "Moving includes floors, bathrooms, surfaces, baseboards, cabinet interiors, and garage sweeping. One oven and one empty refrigerator are included; additional appliances may cost extra. Confirm the full scope with the team.",
  ],
  [
    "How can I reach the team?",
    "Call (432) 701-2112 or email info@tidyupmidland.com. Office hours are Monday through Friday, 8:00 AM–5:00 PM. Tidy, our demo assistant, can explain the services at any time.",
  ],
];
