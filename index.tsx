import React, { useState, useMemo } from 'react';
import { Search, Map as MapIcon, ExternalLink, Info } from 'lucide-react';

// =========================
// 1. DATA CONSTANTS
// =========================

interface Unit {
  name: string;
  aliases: string[];
  network: string;
  level: number | null;
  specialties: string[];
  mapUrl?: string;
  outside?: boolean;
}

const UNITS: Unit[] = [
  // --- NORTH CENTRAL LONDON ---
  {
    name: "Royal Free Hospital",
    aliases: ["Royal Free"],
    network: "North Central London",
    level: 1,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Royal+Free+Hospital+London"
  },
  {
    name: "North Middlesex University Hospital",
    aliases: ["North Middlesex"],
    network: "North Central London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/North+Middlesex+Hospital+London"
  },
  {
    name: "Barnet Hospital",
    aliases: ["Barnet"],
    network: "North Central London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Barnet+Hospital"
  },
  {
    name: "Whittington Hospital",
    aliases: ["Whittington", "Whittingdon"],
    network: "North Central London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Whittington+Hospital+London"
  },
  {
    name: "University College Hospital",
    aliases: ["UCH", "UCLH", "University College Hospital"],
    network: "North Central London",
    level: 3,
    specialties: ["Neuro"],
    mapUrl: "https://www.google.com/maps/search/University+College+Hospital+London"
  },
  {
    name: "Great Ormond Street Hospital",
    aliases: ["GOSH"],
    network: "North Central London",
    level: 3,
    specialties: ["Surgery", "Cardiac", "Neuro Surgery", "ENT"],
    mapUrl: "https://www.google.com/maps/search/Great+Ormond+Street+Hospital"
  },

  // --- NORTH WEST LONDON ---
  {
    name: "West Middlesex University Hospital",
    aliases: ["West Middlesex"],
    network: "North West London",
    level: 1,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/West+Middlesex+Hospital"
  },
  {
    name: "Hillingdon Hospital",
    aliases: ["Hillingdon"],
    network: "North West London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Hillingdon+Hospital"
  },
  {
    name: "Northwick Park Hospital",
    aliases: ["Northwick Park"],
    network: "North West London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Northwick+Park+Hospital"
  },
  {
    name: "St Mary's Hospital, Paddington",
    aliases: ["St. Mary's", "St Mary's"],
    network: "North West London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/St+Marys+Hospital+Paddington"
  },
  {
    name: "Chelsea and Westminster Hospital",
    aliases: ["Chelsea & Westminster"],
    network: "North West London",
    level: 3,
    specialties: ["Surgery", "ENT"],
    mapUrl: "https://www.google.com/maps/search/Chelsea+and+Westminster+Hospital"
  },
  {
    name: "Queen Charlotte's and Chelsea Hospital",
    aliases: ["Queen Charlotte's", "Queen Charlottes"],
    network: "North West London",
    level: 3,
    specialties: ["Neuro"],
    mapUrl: "https://www.google.com/maps/search/Queen+Charlottes+Hospital"
  },

  // --- NORTH EAST LONDON ---
  {
    name: "Queen's Hospital, Romford",
    aliases: ["Queen's Romford", "Queens Romford"],
    network: "North East London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Queens+Hospital+Romford"
  },
  {
    name: "Newham Hospital",
    aliases: ["Newham"],
    network: "North East London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Newham+Hospital+London"
  },
  {
    name: "Whipps Cross Hospital",
    aliases: ["Whipps Cross"],
    network: "North East London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Whipps+Cross+Hospital"
  },
  {
    name: "Homerton University Hospital",
    aliases: ["Homerton"],
    network: "North East London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Homerton+Hospital"
  },
  {
    name: "Royal London Hospital",
    aliases: ["Royal London"],
    network: "North East London",
    level: 3,
    specialties: ["Surgery"],
    mapUrl: "https://www.google.com/maps/search/Royal+London+Hospital"
  },

  // --- SOUTH WEST LONDON ---
  {
    name: "Epsom Hospital",
    aliases: ["Epsom"],
    network: "South West London",
    level: 1,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Epsom+Hospital"
  },
  {
    name: "Kingston Hospital",
    aliases: ["Kingston"],
    network: "South West London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Kingston+Hospital+London"
  },
  {
    name: "Croydon University Hospital",
    aliases: ["Croydon"],
    network: "South West London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Croydon+University+Hospital"
  },
  {
    name: "St Helier Hospital",
    aliases: ["St. Helier", "St Helier", "St. Helier's"],
    network: "South West London",
    level: 2,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/St+Helier+Hospital"
  },
  {
    name: "St George's Hospital",
    aliases: ["St. George's", "St Georges"],
    network: "South West London",
    level: 3,
    specialties: ["Surgery", "Neuro Surgery", "ENT"],
    mapUrl: "https://www.google.com/maps/search/St+Georges+Hospital+Tooting"
  },

  // --- SOUTH EAST LONDON ---
  {
    name: "Lewisham Hospital",
    aliases: ["Lewisham"],
    network: "South East London",
    level: 1,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Lewisham+Hospital"
  },
  {
    name: "Queen Elizabeth Hospital, Woolwich",
    aliases: ["QEW", "Queen Elizabeth – Woolwich", "Queen Elizabeth - Woolwich", "Queen Elizabeth Hospital Woolwich"],
    network: "South East London",
    level: 1,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Queen+Elizabeth+Hospital+Woolwich"
  },
  {
    name: "Princess Royal University Hospital",
    aliases: ["PRUH", "Princess Royal", "Princess Royal (PRUH)"],
    network: "South East London",
    level: 1,
    specialties: [],
    mapUrl: "https://www.google.com/maps/search/Princess+Royal+University+Hospital"
  },
  {
    name: "King's College Hospital",
    aliases: ["King's", "Kings"],
    network: "South East London",
    level: 3,
    specialties: ["Surgery", "Neuro Surgery"],
    mapUrl: "https://www.google.com/maps/search/Kings+College+Hospital"
  },
  {
    name: "Evelina London Children's Hospital / St Thomas'",
    aliases: ["Evelina", "GSTT", "St. Thomas'", "St Thomas'", "Evelina London", "St Thomas Hospital"],
    network: "South East London",
    level: 3,
    specialties: ["Surgery", "Cardiac", "ENT", "Neuro"],
    mapUrl: "https://www.google.com/maps/search/Evelina+London"
  }
];

const OUTWARD_TO_UNITS: Record<string, string[]> = {
  "BR1": ["PRUH", "QEW"],
  "BR2": ["PRUH"],
  "BR3": ["PRUH", "QEW"],
  "BR4": ["PRUH"],
  "BR5": ["PRUH"],
  "BR6": ["PRUH"],
  "BR7": ["PRUH"],
  "BR8": ["PRUH", "outside London Neonatal Network"],
  "CR0": ["Croydon", "St. Helier"],
  "CR2": ["Croydon"],
  "CR3": ["Croydon", "outside London Neonatal Network"],
  "CR4": ["St. Helier"],
  "CR5": ["Croydon", "St. Helier", "Epsom"],
  "CR6": ["Croydon", "outside London Neonatal Network"],
  "CR7": ["Croydon", "St. Helier"],
  "CR8": ["Croydon", "St. Helier"],
  "CR9": ["Croydon"],
  "CR90": ["Croydon"],
  "DA1": ["QEW", "outside London Neonatal Network"],
  "DA14": ["QEW", "PRUH"],
  "DA15": ["QEW"],
  "DA16": ["QEW"],
  "DA17": ["QEW"],
  "DA18": ["QEW"],
  "DA5": ["QEW", "outside London Neonatal Network"],
  "DA6": ["QEW"],
  "DA7": ["QEW"],
  "DA8": ["QEW", "outside London Neonatal Network"],
  "E1": ["Royal London", "Homerton"],
  "E10": ["Homerton", "Whipps Cross"],
  "E11": ["Whipps Cross", "Homerton"],
  "E12": ["Newham", "Whipps Cross"],
  "E13": ["Newham"],
  "E14": ["Royal London"],
  "E15": ["Newham", "Homerton"],
  "E16": ["Newham"],
  "E17": ["Whipps Cross"],
  "E18": ["Whipps Cross"],
  "E1W": ["Royal London"],
  "E2": ["Royal London", "Homerton"],
  "E22": ["Royal London"],
  "E3": ["Royal London", "Newham"],
  "E4": ["Whipps Cross", "North Middlesex"],
  "E5": ["Homerton", "Whipps Cross"],
  "E6": ["Newham"],
  "E7": ["Newham", "Whipps Cross", "Homerton"],
  "E8": ["Homerton"],
  "E9": ["Homerton", "Royal London"],
  "E98": ["Royal London"],
  "EC1A": ["Homerton", "UCLH"],
  "EC1M": ["UCLH", "Homerton"],
  "EC1N": ["UCLH", "Homerton"],
  "EC1P": ["UCLH"],
  "EC1R": ["UCLH"],
  "EC1V": ["UCLH", "Homerton", "Whittington"],
  "EC1Y": ["UCLH", "Homerton"],
  "EC2A": ["Homerton", "UCLH"],
  "EC2M": ["Homerton", "UCLH", "Royal London"],
  "EC2N": ["Homerton"],
  "EC2P": ["Homerton"],
  "EC2R": ["Homerton"],
  "EC2V": ["Homerton"],
  "EC2Y": ["Homerton", "UCLH"],
  "EC3A": ["Homerton"],
  "EC3M": ["Homerton"],
  "EC3N": ["Homerton", "Royal London"],
  "EC3P": ["Homerton", "UCLH"],
  "EC3R": ["Homerton"],
  "EC3V": ["Homerton"],
  "EC4A": ["Homerton", "UCLH"],
  "EC4M": ["Homerton"],
  "EC4N": ["Homerton"],
  "EC4P": ["UCLH"],
  "EC4R": ["Homerton"],
  "EC4V": ["Homerton"],
  "EC4Y": ["Homerton", "UCLH"],
  "EN1": ["North Middlesex", "Barnet"],
  "EN2": ["Barnet", "North Middlesex"],
  "EN3": ["North Middlesex"],
  "EN4": ["Barnet"],
  "EN5": ["Barnet"],
  "EN6": ["Barnet", "outside London Neonatal Network"],
  "EN7": ["outside London Neonatal Network"],
  "EN8": ["North Middlesex", "outside London Neonatal Network"],
  "EN9": ["outside London Neonatal Network"],
  "HA0": ["Northwick Park"],
  "HA1": ["Northwick Park"],
  "HA2": ["Northwick Park"],
  "HA3": ["Northwick Park"],
  "HA4": ["Hillingdon", "Northwick Park"],
  "HA5": ["Northwick Park", "Hillingdon"],
  "HA6": ["Hillingdon", "outside London Neonatal Network"],
  "HA7": ["Northwick Park"],
  "HA8": ["Barnet", "Northwick Park"],
  "HA9": ["Northwick Park"],
  "IG1": ["Queen's Romford", "Whipps Cross"],
  "IG11": ["Newham", "Queen's Romford"],
  "IG2": ["Queen's Romford", "Whipps Cross"],
  "IG3": ["Queen's Romford"],
  "IG4": ["Whipps Cross"],
  "IG5": ["Whipps Cross"],
  "IG6": ["Whipps Cross", "Queen's Romford"],
  "IG7": ["Queen's Romford", "outside London Neonatal Network"],
  "IG8": ["Whipps Cross"],
  "IG9": ["Whipps Cross", "outside London Neonatal Network"],
  "KT1": ["Kingston"],
  "KT17": ["Epsom", "St. Helier"],
  "KT18": ["Epsom", "outside London Neonatal Network"],
  "KT19": ["Epsom", "Kingston"],
  "KT2": ["Kingston"],
  "KT22": ["Epsom"],
  "KT3": ["Kingston", "St. Helier"],
  "KT4": ["St. Helier", "Kingston", "Epsom"],
  "KT5": ["Kingston"],
  "KT6": ["Kingston"],
  "KT7": ["Kingston"],
  "KT8": ["Kingston"],
  "KT9": ["Kingston"],
  "N1": ["Whittingdon", "Homerton", "UCLH"],
  "N10": ["Whittingdon", "Royal Free", "Barnet"],
  "N11": ["Royal Free", "Barnet", "North Middlesex", "Whittingdon"],
  "N12": ["Barnet", "Royal Free"],
  "N13": ["Barnet", "Royal Free", "North Middlesex"],
  "N14": ["Royal Free", "Barnet"],
  "N15": ["North Middlesex", "Homerton"],
  "N16": ["Homerton", "Whittingdon"],
  "N17": ["North Middlesex"],
  "N18": ["North Middlesex"],
  "N19": ["Whittingdon", "UCH", "Royal Free"],
  "N1C": ["UCH"],
  "N1P": ["Whittingdon"],
  "N2": ["Royal Free", "Whittindon", "Barnet"],
  "N20": ["Royal Free", "Barnet"],
  "N21": ["Barnet", "North Middlesex"],
  "N22": ["North Middlesex", "Whittingdon"],
  "N3": ["Royal Free", "Barnet"],
  "N4": ["North Middlesex", "Whittingdon", "Homerton"],
  "N5": ["Whittingdon", "Homerton"],
  "N6": ["Whittingdon", "Royal Free"],
  "N7": ["Whittingdon", "UCH"],
  "N8": ["Whittingdon", "North Middlesex"],
  "N81": ["Newham", "North Middlesex"],
  "N9": ["North Middlesex"],
  "NW1": ["UCH", "St. Mary's", "Royal Free"],
  "NW10": ["Northwick Park", "Queen Charlotte's", "St. Mary's"],
  "NW11": ["Royal Free", "Barnet"],
  "NW1W": ["UCH"],
  "NW2": ["Royal Free", "Northwick Park", "St. Mary's"],
  "NW3": ["Royal Free", "Barnet"],
  "NW4": ["Royal Free", "Barnet"],
  "NW5": ["Royal Free", "UCH"],
  "NW6": ["St. Mary's", "Royal Free"],
  "NW7": ["Barnet", "Royal Free"],
  "NW8": ["St. Mary's", "Royal Free"],
  "NW9": ["Northwick Park", "Royal Free", "Barnet"],
  "RM1": ["Queen's Romford"],
  "RM10": ["Queen's Romford"],
  "RM11": ["Queen's Romford"],
  "RM12": ["Queen's Romford"],
  "RM13": ["Queen's Romford"],
  "RM14": ["Queen's Romford", "outside London Neonatal Network"],
  "RM15": ["Queen's Romford", "outside London Neonatal Network"],
  "RM2": ["Queen's Romford"],
  "RM3": ["Queen's Romford"],
  "RM4": ["Queen's Romford", "outside London Neonatal Network"],
  "RM5": ["Queen's Romford", "outside London Neonatal Network"],
  "RM6": ["Queen's Romford"],
  "RM7": ["Queen's Romford"],
  "RM8": ["Queen's Romford"],
  "RM9": ["Queen's Romford", "Newham"],
  "SE1": ["GSTT", "King's"],
  "SE10": ["QEW"],
  "SE11": ["GSTT", "King's"],
  "SE12": ["QEW"],
  "SE13": ["QEW"],
  "SE14": ["Lewisham", "QEW", "King's"],
  "SE15": ["King's", "GSTT", "Lewisham"],
  "SE16": ["GSTT", "Lewisham"],
  "SE17": ["GSTT"],
  "SE18": ["QEW"],
  "SE19": ["Croydon", "King's", "PRUH"],
  "SE1P": ["GSTT"],
  "SE2": ["QEW"],
  "SE20": ["PRUH"],
  "SE21": ["King's"],
  "SE22": ["King's"],
  "SE23": ["QEW", "King's"],
  "SE24": ["King's"],
  "SE25": ["Croydon"],
  "SE26": ["QEW", "PRUH", "King's"],
  "SE27": ["King's"],
  "SE28": ["QEW"],
  "SE3": ["QEW"],
  "SE4": ["QEW", "King's"],
  "SE5": ["King's", "GSTT"],
  "SE6": ["QEW"],
  "SE7": ["QEW"],
  "SE8": ["Lewisham", "QEW", "GSTT"],
  "SE9": ["QEW", "PRUH"],
  "SM1": ["St. Helier"],
  "SM2": ["St. Helier", "Epsom"],
  "SM3": ["St. Helier"],
  "SM4": ["St. Helier"],
  "SM5": ["St. Helier"],
  "SM6": ["St. Helier"],
  "SM7": ["Epsom", "St. Helier"],
  "SW10": ["Chelsea & Westminster"],
  "SW11": ["St. George's"],
  "SW12": ["St. George's", "GSTT"],
  "SW13": ["Kingston"],
  "SW14": ["Kingston"],
  "SW15": ["St. George's", "Kingston"],
  "SW16": ["GSTT", "King's", "St. George's", "Croydon", "St. Helier"],
  "SW17": ["St. George's", "St. Helier"],
  "SW18": ["St. George's", "St. Helier"],
  "SW19": ["St. Helier", "St. George's"],
  "SW1A": ["Chelsea & Westminster"],
  "SW1E": ["Chelsea & Westminster"],
  "SW1H": ["Chelsea & Westminster"],
  "SW1P": ["Chelsea & Westminster"],
  "SW1V": ["Chelsea & Westminster", "St. George's"],
  "SW1W": ["Chelsea & Westminster"],
  "SW1X": ["Chelsea & Westminster"],
  "SW1Y": ["Chelsea & Westminster"],
  "SW2": ["King's", "GSTT"],
  "SW20": ["St. Helier", "Kingston"],
  "SW3": ["Chelsea & Westminster"],
  "SW4": ["GSTT", "St. George's"],
  "SW5": ["Chelsea & Westminster"],
  "SW6": ["Chelsea & Westminster"],
  "SW7": ["Chelsea & Westminster"],
  "SW8": ["GSTT", "St. George's"],
  "SW9": ["GSTT", "King's"],
  "SW95": ["St. George's"],
  "TN14": ["PRUH", "outside London Neonatal Network"],
  "TN16": ["PRUH", "outside London Neonatal Network"],
  "TW1": ["West Middlesex"],
  "TW10": ["Kingston"],
  "TW11": ["Kingston", "West Middlesex"],
  "TW12": ["Kingston", "West Middlesex"],
  "TW13": ["West Middlesex"],
  "TW14": ["West Middlesex"],
  "TW15": ["West Middlesex", "outside London Neonatal Network"],
  "TW19": ["West Middlesex", "outside London Neonatal Network"],
  "TW2": ["West Middlesex"],
  "TW3": ["West Middlesex"],
  "TW4": ["West Middlesex"],
  "TW5": ["West Middlesex"],
  "TW6": ["West Middlesex", "outside London Neonatal Network"],
  "TW7": ["West Middlesex"],
  "TW8": ["West Middlesex", "Queen Charlotte's"],
  "TW9": ["Kingston"],
  "UB1": ["Queen Charlotte's", "Hillingdon", "West Middlesex"],
  "UB10": ["Hillingdon"],
  "UB11": ["Hillingdon"],
  "UB18": ["West Middlesex"],
  "UB2": ["West Middlesex", "Queen Charlotte's"],
  "UB3": ["Hillingdon"],
  "UB4": ["Hillingdon"],
  "UB5": ["Hillingdon", "Northwick Park"],
  "UB6": ["Northwick Park", "Queen Charlotte's"],
  "UB7": ["Hillingdon", "outside London Neonatal Network"],
  "UB8": ["Hillingdon"],
  "UB9": ["Hillingdon", "outside London Neonatal Network"],
  "W10": ["St. Mary's"],
  "W11": ["St. Mary's", "Chelsea & Westminster"],
  "W12": ["Queen Charlotte's", "St. Mary's"],
  "W13": ["Queen Charlotte's", "West Middlesex"],
  "W14": ["Chelsea & Westminster"],
  "W1A": ["UCH"],
  "W1B": ["UCH", "St. Mary's"],
  "W1C": ["St. Mary's"],
  "W1D": ["UCH"],
  "W1F": ["UCH"],
  "W1G": ["St. Mary's"],
  "W1H": ["St. Mary's"],
  "W1J": ["St. Mary's", "Chelsea & Westminster"],
  "W1K": ["St. Mary's"],
  "W1S": ["St. Mary's"],
  "W1T": ["UCH"],
  "W1U": ["St. Mary's"],
  "W1W": ["UCH"],
  "W2": ["St. Mary's"],
  "W3": ["Queen Charlotte's", "Northwick Park"],
  "W4": ["Queen Charlotte's", "Chelsea & Westminster"],
  "W5": ["Queen Charlotte's", "West Middlesex", "Northwick Park"],
  "W6": ["Queen Charlotte's", "Chelsea & Westminster"],
  "W7": ["Queen Charlotte's", "West Middlesex"],
  "W8": ["Chelsea & Westminster"],
  "W9": ["St. Mary's"],
  "WC1A": ["UCH"],
  "WC1B": ["UCH"],
  "WC1E": ["UCH"],
  "WC1H": ["UCH"],
  "WC1N": ["UCH"],
  "WC1R": ["UCH"],
  "WC1V": ["UCH"],
  "WC1X": ["UCH"],
  "WC2A": ["UCH"],
  "WC2B": ["UCH"],
  "WC2E": ["UCH"],
  "WC2H": ["UCH", "Chelsea & Westminster"],
  "WC2N": ["UCH", "Chelsea & Westminster"],
  "WC2R": ["UCH"],
  "WD23": ["Northwick Park", "outside London Neonatal Network"],
  "WD3": ["Hillingdon", "outside London Neonatal Network"],
  "WD6": ["Barnet", "outside London Neonatal Network"]
};


// =========================
// 2. LOGIC HELPERS
// =========================

function normaliseInput(str: string) {
  return str.trim().toUpperCase();
}

function isFullPostcode(str: string) {
  return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(str);
}

function isOutwardCode(str: string) {
  return /^[A-Z]{1,2}\d[A-Z\d]?$/.test(str);
}

function isAreaPrefix(str: string) {
  return /^[A-Z]{1,2}$/.test(str);
}

function outwardFromPostcode(pc: string) {
  const value = normaliseInput(pc).replace(/\s+/g, "");
  if (value.length > 3) {
    return value.slice(0, value.length - 3);
  }
  return value;
}

function findUnitMetaByName(name: string): Unit | null {
  const target = name.trim().toLowerCase();
  return (
    UNITS.find(u =>
      u.aliases.some(a => a.toLowerCase() === target) ||
      u.name.toLowerCase() === target
    ) || null
  );
}

function findUnitsByOutward(outward: string): Unit[] {
  const names = OUTWARD_TO_UNITS[outward];
  if (!names) return [];

  const results: Unit[] = [];
  for (const rawName of names) {
    const name = rawName.trim();
    if (name.toLowerCase().includes("outside london neonatal network")) {
      results.push({
        name: "Outside London Neonatal Network",
        aliases: [],
        network: "Outside London Neonatal Network",
        level: null,
        specialties: [],
        outside: true
      });
      continue;
    }
    const meta = findUnitMetaByName(name);
    if (meta) {
      results.push(meta);
    } else {
      // Fallback if data is missing
      results.push({
        name: name,
        aliases: [],
        network: "Unknown network",
        level: null,
        specialties: []
      });
    }
  }
  return results;
}

function findUnitsByPrefix(prefix: string): Unit[] {
  const p = prefix.toUpperCase();
  const seen = new Set<string>();
  const results: Unit[] = [];

  for (const outward of Object.keys(OUTWARD_TO_UNITS)) {
    if (!outward.startsWith(p)) continue;
    const unitsForOutward = findUnitsByOutward(outward);
    unitsForOutward.forEach(u => {
      const key = `${u.name}|${u.network}|${u.outside ? "1" : "0"}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push(u);
      }
    });
  }
  return results;
}

function fuzzyFindUnitsByName(query: string): Unit[] {
  const q = query.toLowerCase();
  return UNITS.filter(
    u =>
      u.name.toLowerCase().includes(q) ||
      u.aliases.some(a => a.toLowerCase().includes(q))
  );
}


// =========================
// 3. COMPONENTS
// =========================

// --- Card Components ---

const Badge = ({ children, type }: { children: React.ReactNode; type: 'level' | 'specialty' | 'warning' }) => {
  let bgClass = '';
  let textClass = '';

  if (type === 'level') {
    bgClass = 'bg-blue-700';
    textClass = 'text-white';
  } else if (type === 'warning') {
    bgClass = 'bg-yellow-100';
    textClass = 'text-yellow-800';
  } else {
    bgClass = 'bg-blue-100';
    textClass = 'text-blue-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 mb-2 ${bgClass} ${textClass}`}>
      {children}
    </span>
  );
};

const UnitCard = ({ unit }: { unit: Unit }) => {
  const copySummary = () => {
    const summary = `${unit.name}${unit.network ? ` (${unit.network})` : ""}${unit.level ? ` – Level ${unit.level}` : ""}${unit.specialties?.length ? `, ${unit.specialties.join(", ")}` : ""}`;
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{unit.name}</h3>
      
      <div className="text-sm text-gray-600 mb-3">
        {unit.outside 
          ? "Outside London Neonatal Network – check local services / retrieval advice."
          : `${unit.network}${unit.level ? ` • Level ${unit.level} neonatal unit` : ""}`
        }
      </div>

      <div className="mb-3">
        {unit.level && <Badge type="level">Level {unit.level}</Badge>}
        {unit.specialties.map(s => <Badge key={s} type="specialty">{s}</Badge>)}
        {unit.outside && <Badge type="warning">Outside Network</Badge>}
      </div>

      <div className="flex gap-2 mt-2">
        <button 
          onClick={copySummary}
          className="inline-flex items-center px-3 py-1.5 border border-blue-700 text-xs font-medium rounded text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Copy summary
        </button>
        
        {unit.mapUrl && !unit.outside && (
          <a 
            href={unit.mapUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 border border-blue-700 text-xs font-medium rounded text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ExternalLink size={12} className="mr-1" />
            Open in Maps
          </a>
        )}
      </div>
    </div>
  );
};

// --- Header Component ---

const Header = () => (
  <header className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold text-blue-700 m-0">HO.ME – Hospital Near Me (Neonatal)</h1>
      <p className="text-sm text-gray-600 mt-2">Identify the local neonatal unit for a baby based on postcode or hospital.</p>
    </div>
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Evelina_London_Children%27s_Hospital_logo.svg" 
      alt="Evelina London" 
      className="h-16 w-auto flex-shrink-0 ml-4"
    />
  </header>
);

// --- Search Section ---

const SearchSection = ({ query, setQuery }: { query: string; setQuery: (q: string) => void }) => (
  <div className="mb-6">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter full postcode (e.g. SE1 7EH), outward code (e.g. SE1), area prefix (e.g. SE) or hospital name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
    <p className="mt-2 text-xs text-gray-500">
      Data source: London Neonatal Networks & HO.ME tool (Sept 2025).
    </p>
  </div>
);

// --- Map Info Section ---

const MapInfoSection = () => (
  <div className="mt-8 pt-6 border-t border-gray-200">
    <h2 className="text-xl font-semibold text-gray-900 mb-2">London Neonatal & Maternity Catchment Map</h2>
    
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Important Difference between Search and Map</strong>
            <br />
            The search box above uses the <strong>outward code</strong> (first half of postcode) which may show <strong>multiple</strong> local units.
            The interactive map (via the link below) allows you to enter the <strong>full postcode</strong> for a more precise, single catchment area match.
          </p>
        </div>
      </div>
    </div>

    <a 
      href="https://www.google.com/maps/d/u/0/embed?mid=1e_VFhHS_iYmjecO8lu2MuR2yJ3vivkJm&z=11"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 shadow-sm"
    >
      <MapIcon className="mr-2 -ml-1 h-5 w-5" />
      View London Maternity & Neonatal Catchment Map (Interactive)
    </a>

    <div className="mt-4 text-sm text-gray-600 space-y-2">
      <p className="font-medium">Map Instructions:</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>Search</strong>: Enter the full postcode (e.g., <em>SE1 7EH</em>) into the map's search box and press Enter.</li>
        <li><strong>Clear Search</strong>: Delete the postcode from the map's search box to view the coloured area beneath the result.</li>
        <li><strong>Tap Area</strong>: Tap the coloured region to see a pop-up with the name of the responsible hospital.</li>
      </ol>
      <p className="text-xs italic text-gray-500 mt-2">Note: The map is not a product of this tool's creator. Source/Credit needed.</p>
    </div>
  </div>
);

// --- Footer ---

const Footer = () => (
  <footer className="mt-12 text-xs text-gray-500 border-t border-gray-200 pt-6">
    <p>HO.ME v2025.09 • For clinical reference only. Always check latest ODN guidance / retrieval advice.</p>
    <p className="mt-1">This tool was designed and developed by Erin Coupland with help from colleagues at Evelina London Children's Hospital.</p>
    <p className="mt-1">The interactive catchment map is external and not the work of the HO.ME tool creator.</p>
  </footer>
);


// =========================
// 4. MAIN APP COMPONENT
// =========================

export default function App() {
  const [query, setQuery] = useState('');

  // Main Logic to Filter Units
  const { filteredUnits, statusMessage } = useMemo(() => {
    if (!query) return { filteredUnits: [], statusMessage: 'Start typing a postcode, outward code, area prefix (e.g. SE, NW) or hospital name…' };

    const value = normaliseInput(query);
    let units: Unit[] = [];
    let msg = '';

    if (isFullPostcode(value)) {
      const outward = outwardFromPostcode(value);
      units = findUnitsByOutward(outward);
      msg = `Full postcode detected. Outward code: ${outward}.`;
    } else if (isOutwardCode(value)) {
      units = findUnitsByOutward(value);
      msg = `Outward code: ${value}.`;
    } else if (isAreaPrefix(value)) {
      units = findUnitsByPrefix(value);
      msg = `Area prefix: ${value}. Showing all units covering outward codes beginning with “${value}”.`;
    } else {
      units = fuzzyFindUnitsByName(value);
      msg = `Interpreted as hospital name search: “${query.trim()}”.`;
    }

    return { filteredUnits: units, statusMessage: msg };
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        
        <Header />
        
        <SearchSection query={query} setQuery={setQuery} />

        <div aria-live="polite" className="min-h-[200px]">
          {filteredUnits.length === 0 && query ? (
            <div className="text-gray-500 text-sm mt-4">
              No matching neonatal units found. Check the postcode/outward code, or try a hospital name.
            </div>
          ) : (
            <>
              {statusMessage && <div className="text-xs text-gray-500 mb-3">{statusMessage}</div>}
              {filteredUnits.map((unit, idx) => (
                <UnitCard key={`${unit.name}-${idx}`} unit={unit} />
              ))}
              {!query && (
                <div className="text-gray-500 text-sm mt-4">
                  {statusMessage}
                </div>
              )}
            </>
          )}
        </div>

        <MapInfoSection />
        
        <Footer />

      </div>
    </div>
  );
}
