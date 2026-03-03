export interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  region: "breifne" | "munster-south-connacht" | "leinster" | "leadership" | "admin";
  email: string;
  phone: string;
  image?: string;
}

export interface RegionInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  counties: string[];
  office: {
    address: string;
    eircode: string;
    phone: string;
  };
  additionalOffices?: {
    address: string;
    phone?: string;
  }[];
  objectives?: string[];
  email: string;
}

export const regions: RegionInfo[] = [
  {
    id: "breifne",
    name: "Breifne",
    slug: "breifne",
    description:
      "The Breifne Co-operation Project is a locally-adapted agri-environment scheme for Ireland's Northwest region, spanning five counties. The area is divided administratively into four sections: Northwest Breifne, Central Breifne, Slieve Beagh, and South Breifne.",
    counties: ["Sligo", "Leitrim", "Cavan", "Roscommon", "Monaghan"],
    office: {
      address: "Unit 3, W8 Centre, Church Lane, Manorhamilton, Co. Leitrim",
      eircode: "F91 PF2Y",
      phone: "(071) 98 56508",
    },
    email: "info@acresbreifne.ie",
  },
  {
    id: "munster-south-connacht",
    name: "Munster South Connacht",
    slug: "munster-south-connacht",
    description:
      "The Munster/South Connacht Co-operation covers nine counties, stretched from the Knockmealdown Mountains in Waterford to the Slieve Aughties in Galway. It includes significant upland and mountainous areas important for conservation.",
    counties: [
      "Kerry",
      "Cork",
      "Waterford",
      "Tipperary",
      "Limerick",
      "Clare",
      "Galway",
      "Offaly",
      "Laois",
    ],
    office: {
      address:
        "Kerry Technology Park, Innovation Works 1, Dromtacker, Tralee, Co. Kerry",
      eircode: "V92 KF76",
      phone: "(066) 712 7399",
    },
    additionalOffices: [
      {
        address: "Unit 2 Oran Point, Main Street, Oranmore, Co. Galway",
        phone: "(091) 792 865",
      },
      {
        address: "Lismore, Co. Waterford",
      },
    ],
    email: "info@acresmsc.ie",
  },
  {
    id: "leinster",
    name: "Leinster",
    slug: "leinster",
    description:
      "The Leinster area functions as a locally adapted agri-environment scheme spanning seven counties. It encompasses all major mountain ranges including the Slieve Blooms, Blackstairs, Dublin/Wicklow Mountains, and Cooley peninsula. Key challenges involve an exceptionally high proportion of commonage and proximity to densely populated areas, with significant concerns regarding wildfire, recreational pressure, and deer management.",
    counties: [
      "Wicklow",
      "Wexford",
      "Carlow",
      "Kilkenny",
      "Laois",
      "Louth",
      "Dublin",
    ],
    office: {
      address:
        "Unit 1E, Blessington Business Park, Blessington, Co. Wicklow",
      eircode: "W91 W0DX",
      phone: "",
    },
    objectives: [
      "Blackstairs: Water quality, groundwater protection, upland peatland habitats, archaeology",
      "Cooley Peninsula: Peregrine Falcon, geese/swans, water quality, upland peatland",
      "Slieve Blooms: Hen Harrier, water quality, upland peatland habitats",
      "Dublin/Wicklow Mountains: Peregrine Falcon, Merlin, upland peatland, archaeology",
    ],
    email: "info@acresleinster.ie",
  },
];

export const teamMembers: TeamMember[] = [
  // Breifne Team
  {
    id: "caroline-sullivan",
    name: "Dr. Caroline Sullivan",
    title: "Chief Operating Officer",
    department: "Leadership",
    region: "breifne",
    email: "caroline.sullivan@acresbreifne.ie",
    phone: "085 805 2939",
  },
  {
    id: "julien-carlier",
    name: "Dr. Julien Carlier",
    title: "Programme Manager",
    department: "Leadership",
    region: "breifne",
    email: "julien.carlier@acresbreifne.ie",
    phone: "085 800 6503",
  },
  {
    id: "clodagh-helen",
    name: "Clodagh Helen",
    title: "Deputy Project Manager",
    department: "Management",
    region: "breifne",
    email: "clodagh.helen@acresbreifne.ie",
    phone: "085 801 1039",
  },
  {
    id: "daniel-cahill",
    name: "Daniel Cahill",
    title: "Project Officer",
    department: "Field Team",
    region: "breifne",
    email: "daniel.cahill@acresbreifne.ie",
    phone: "085 801 1199",
  },
  {
    id: "naomi-mcmorrow",
    name: "Naomi McMorrow",
    title: "Project Officer",
    department: "Field Team",
    region: "breifne",
    email: "naomi.mcmorrow@acresbreifne.ie",
    phone: "085 800 6519",
  },
  {
    id: "aife-kearns",
    name: "Aífe Kearns",
    title: "Project Officer",
    department: "Field Team",
    region: "breifne",
    email: "aife.kearns@acresbreifne.ie",
    phone: "085 838 2051",
  },
  {
    id: "noel-siberry",
    name: "Noel Siberry",
    title: "Project Officer",
    department: "Field Team",
    region: "breifne",
    email: "noel.siberry@acresmsc.ie",
    phone: "085 800 5217",
  },
  {
    id: "rachel-irwin",
    name: "Dr. Rachel Irwin",
    title: "Operations Officer",
    department: "Operations",
    region: "breifne",
    email: "rachel.irwin@acresbreifne.ie",
    phone: "085 833 3755",
  },
  {
    id: "kevin-oreilly",
    name: "Kevin O'Reilly",
    title: "Project Officer",
    department: "Field Team",
    region: "breifne",
    email: "kevin.oreilly@acresbreifne.ie",
    phone: "085 755 9173",
  },
  // Munster South Connacht Team
  {
    id: "padraig-cronin",
    name: "Padraig Cronin",
    title: "Project Manager",
    department: "Management",
    region: "munster-south-connacht",
    email: "padraig.cronin@acresmsc.ie",
    phone: "087 362 3913",
  },
  {
    id: "chloe-oneill",
    name: "Chloe O'Neill",
    title: "Team Leader",
    department: "Management",
    region: "munster-south-connacht",
    email: "chloe.oneill@acresmsc.ie",
    phone: "085 805 3319",
  },
  {
    id: "tracy-ohara",
    name: "Dr. Tracy O'Hara",
    title: "Team Leader",
    department: "Management",
    region: "munster-south-connacht",
    email: "tracy.ohara@acresmsc.ie",
    phone: "085 800 9872",
  },
  {
    id: "kristina-feeney",
    name: "Kristina Feeney",
    title: "Deputy Project Manager",
    department: "Management",
    region: "munster-south-connacht",
    email: "kristina.feeney@acresmsc.ie",
    phone: "087 109 4116",
  },
  {
    id: "ivor-palmer",
    name: "Ivor Palmer",
    title: "Team Lead (Waterford)",
    department: "Management",
    region: "munster-south-connacht",
    email: "ivor.palmer@acresmsc.ie",
    phone: "085 838 2769",
  },
  {
    id: "anna-armstrong",
    name: "Anna Armstrong",
    title: "Office Manager",
    department: "Admin",
    region: "munster-south-connacht",
    email: "anna.armstrong@acresmsc.ie",
    phone: "085 855 6971",
  },
  {
    id: "keith-costello",
    name: "Keith Costello",
    title: "Project Officer",
    department: "Field Team",
    region: "munster-south-connacht",
    email: "keith.costello@acresmsc.ie",
    phone: "085 837 7032",
  },
  {
    id: "shane-donnellan",
    name: "Shane Donnellan",
    title: "Project Officer",
    department: "Field Team",
    region: "munster-south-connacht",
    email: "shane.donnellan@acresmsc.ie",
    phone: "085 837 6974",
  },
  {
    id: "kelvin-teahan",
    name: "Kelvin Teahan",
    title: "Project Officer",
    department: "Field Team",
    region: "munster-south-connacht",
    email: "kelvin.teahan@acresmsc.ie",
    phone: "085 838 2862",
  },
  {
    id: "eva-munnelly",
    name: "Eva Munnelly",
    title: "Project Officer",
    department: "Field Team",
    region: "munster-south-connacht",
    email: "eva.munnelly@acresmsc.ie",
    phone: "085 801 1464",
  },
  {
    id: "eoin-birchall",
    name: "Eoin Birchall",
    title: "Project Officer",
    department: "Field Team",
    region: "munster-south-connacht",
    email: "eoin.birchall@acresmsc.ie",
    phone: "085 838 4839",
  },
  {
    id: "brid-hanrahan",
    name: "Bríd Hanrahan",
    title: "Project Officer",
    department: "Field Team",
    region: "munster-south-connacht",
    email: "brid.hanrahan@acresmsc.ie",
    phone: "085 755 9171",
  },
  {
    id: "mary-ryan",
    name: "Mary Ryan",
    title: "Project Officer",
    department: "Field Team",
    region: "munster-south-connacht",
    email: "mary.ryan@acresmsc.ie",
    phone: "085 755 9179",
  },
  // Leinster Team
  {
    id: "brian-dunne",
    name: "Brian Dunne",
    title: "Deputy Project Manager",
    department: "Management",
    region: "leinster",
    email: "brian.dunne@acresleinster.ie",
    phone: "085 850 5038",
  },
  {
    id: "hugh-gryspeerdt",
    name: "Hugh Gryspeerdt",
    title: "Project Officer",
    department: "Field Team",
    region: "leinster",
    email: "hgryspeerdt@acresleinster.ie",
    phone: "085 855 7091",
  },
  {
    id: "shane-dunne",
    name: "Shane Dunne",
    title: "Project Officer",
    department: "Field Team",
    region: "leinster",
    email: "shane.dunne@acresleinster.ie",
    phone: "085 801 1462",
  },
];
