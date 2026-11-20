export interface Coach {
  id: string;
  name: string;
  role: string;
  isFounder?: boolean;
  tags: string[];
  summary: string;
  bio: string[];
  imageAlt: string;
  accentLabel: string;
}

export const COACHES: Coach[] = [
  {
    id: 'rakesh',
    name: 'Ex. Capt. Rakesh S',
    role: 'Founder & Head Coach',
    isFounder: true,
    tags: [
      'EX-ARMY OFFICER',
      'FOUNDED ROX 2018',
      'TRAINED UNDER DENNIS SWAMY',
    ],
    summary:
      'Former Indian Army officer who founded Rox Boxing Gym on April 10, 2018 after training under 8x National Champion & Arjuna Award winner Dennis Swamy.',
    bio: [
      'Ex. Capt. Rakesh S began boxing at age 12 and trained at the Artillery Center under Coach Dennis Swamy (8-time National Champion and Arjuna Award winner).',
      'After serving in the Indian Armed Forces and working in the corporate sector while competing in marathons, long-distance cycling, and high-altitude mountaineering, he established Rox Boxing Gym to bring authentic, defense-led boxing to Bengaluru.',
    ],
    imageAlt:
      "Ex. Capt. Rakesh S, Founder and Head Coach of Rox Boxing Gym, inside the 20' x 20' indoor boxing ring",
    accentLabel: 'CORNER 01 · FOUNDER',
  },
  {
    id: 'narendra',
    name: 'Narendra N',
    role: 'Senior Coach',
    tags: ['20 YEARS EXPERIENCE', '5X STATE GOLD', 'SENIOR NATIONALS SILVER'],
    summary:
      'Two decades of ring experience with 5 State Gold medals, a Senior Nationals Silver medal, and district-level coaching pedigree.',
    bio: [
      'With 20 years in the sport, Narendra N brings deep technical mastery in guard structure, ring geometry, and counterpunching.',
      'A 5-time State Gold medallist and Senior Nationals Silver medallist, he has also served as Manipur District Team Coach.',
    ],
    imageAlt:
      'Coach Narendra N demonstrating defensive guard in the 20x20 boxing ring at Rox Boxing Gym',
    accentLabel: 'CORNER 02 · SENIOR',
  },
  {
    id: 'sagar',
    name: 'Sagar',
    role: 'Boxing Coach',
    tags: ['10+ YEARS EXPERIENCE', '3X STATE / NATIONAL GOLD', 'MANIPUR'],
    summary:
      'Over 10 years of boxing experience with 3 State & National Gold medals, 3 Silver medals, and 1 Bronze medal.',
    bio: [
      'Hailing from Manipur, Sagar combines sharp amateur competition fundamentals with high-tempo conditioning and bag work.',
      'He coaches beginners and advancing boxers through Rox’s 4-level certified curriculum with disciplined technical feedback.',
    ],
    imageAlt:
      'Coach Sagar leading mitt work and footwork drills on the Rox Boxing Gym floor',
    accentLabel: 'CORNER 03 · COACH',
  },
  {
    id: 'roshni',
    name: 'Roshni',
    role: 'Boxing Coach',
    tags: ['7+ YEARS EXPERIENCE', '2024 ALL INDIA INTER-UNIVERSITY', 'STATE MEDALLIST'],
    summary:
      '7+ years of boxing experience, State-level medallist since 2018, and 2024 All India Inter-University Boxing Championships participant.',
    bio: [
      'From Manipur, Roshni has earned Bronze, Silver, and Gold medals at the State level since 2018 and represented at the 2024 All India Inter-University Championships.',
      'She coaches across mixed fundamentals, Juniors, and the dedicated Women’s Only Boxing program.',
    ],
    imageAlt:
      'Coach Roshni demonstrating jab-cross mechanics for Women’s Only and beginner boxers at Rox Boxing Gym',
    accentLabel: 'CORNER 04 · COACH',
  },
];
