// Set these to empty strings so they don't appear above the video
let topTitleDiv = "";
let titleDiv = "";
let bylineDiv = "";
// Define footerDiv since it's referenced in the config
let footerDiv = "";

// Put all content in the descriptionDiv with white text and a more reliable method to display delayed text
let descriptionDiv =
  '<div class="intro-section" style="position: relative; width: 100vw; height: 100vh; overflow: hidden; margin: 0; padding: 0;">' +
    '<video class="intro-video" autoplay muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;"><source src="Images/basement flood.mp4" type="video/mp4">Your browser does not support the video tag.</video>' +
    '<div class="intro-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4); z-index: 2;"></div>' +
    '<div id="delayed-text" class="intro-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3; text-align: center; max-width: 80%; color: #ffffff;">' +
      '<h4 style="font-size: 1.2rem; margin-bottom: 0.5rem; font-family: \'Gill Sans\', \'Helvetica\', sans-serif;">Threads | Storytelling with Maps</h4>' +
      '<h1 style="font-size: 3.5rem; margin: 0.5rem 0; font-family: \'Gill Sans\', \'Helvetica\', sans-serif; font-weight: bold; text-transform: uppercase;">WHO IS PAYING THE PRICE FOR FEDERAL CUTS?</h1>' +
      '<p style="font-size: 1.4rem; margin: 1rem 0; font-family: \'Gill Sans\', \'Helvetica\', sans-serif;">Alex, Surya and Nirmohi</p>' +
      '<p style="font-size: 1.4rem; line-height: 1.6; font-family: \'Gill Sans\', \'Helvetica\', sans-serif; margin-top: 2rem;">Explore how disadvantaged communities across New York City are disproportionately affected by federal budget cuts.</p>' +
      '<p style="font-size: 1.2rem; margin-top: 3rem; font-family: \'Gill Sans\', \'Helvetica\', sans-serif;">scroll to begin the journey</p>' +
      '<div style="font-size: 2rem; margin-top: 1rem; animation: bounce 2s infinite;">▼</div>' +
    '</div>' +
  '</div>' +
  '<style>' +
    '@keyframes bounce {' +
      '0%, 20%, 50%, 80%, 100% { transform: translateY(0); }' +
      '40% { transform: translateY(-20px); }' +
      '60% { transform: translateY(-10px); }' +
    '}' +
    'body, html { margin: 0 !important; padding: 0 !important; overflow-x: hidden; }' +
    '#header { margin: 0 !important; padding: 0 !important; }' +
    '.header { margin: 0 !important; padding: 0 !important; }' +
    // Add this inline animation for text appearance that doesn't rely on JavaScript execution
    '#delayed-text { animation: fadeIn 1s ease 5s forwards; opacity: 0; }' +
    '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }' +
  '</style>';

// 311 DATA ZOOMED OUT
let divChapter1 = 
  "<h3>311 COMPLAINTS</h3>" +
  "<p>311 complaints about flooding in NYC show patterns of street flooding reports across the city, with particular concentration in certain areas of Queens.</p>";

// 311 DATA ZOOMED IN
let divChapter2 = 
  "<h3>NYC Flooding Reports</h3>" +
  "<p>311 reports of street flooding across NYC, zoomed in to show detail in affected neighborhoods.</p>";

// FLOOD STREET LEVEL DATA
let divChapterFloodingRisk = 
  "<h3>Flooding Risk Areas</h3>" +
  "<p>Areas vulnerable to flooding based on flood risk assessment, showing local street-level flood vulnerability in this neighborhood.</p>";

// FEMA FLOOD RISK AREAS
let divChapterFemaFlooding = 
  "<h3>FEMA Flood Risk Areas</h3>" +
  "<p>Areas vulnerable to flooding based on FEMA flood risk assessment, showing broader flood risk zones across the region.</p>";

// FUNDING GRAPH 2022, 2025, 2029 - These already exist in your code, keeping them as is
let divChapterFunding2022 = 
  "<h3>2022: THE PEAK OF CLIMATE FUNDING</h3>" +
  "<p>In 2022, federal emergency climate funding reached an unprecedented $10.2 billion following the Infrastructure Investment and Jobs Act and IRA implementation, with $3B dedicated to Environmental and Climate Justice Program grants.</p>" +
  "<p>This peak funding meant Queens was slated to receive over $200 million for critical flood prevention projects, including innovative cloudburst systems designed to protect vulnerable neighborhoods.</p>";

let divChapterFunding2025 = 
  "<h3>2025: THE COLLAPSE OF CLIMATE PROTECTION</h3>" +
  "<p>By 2025, emergency climate funding plummeted to just $200 million - a 98% drop in just three years. The FEMA BRIC program was completely eliminated, cutting $882 million in national disaster preparedness funding.</p>" +
  "<p>These cuts directly impacted Queens, with the cancellation of critical flood protection projects in East Elmhurst ($50M), Corona ($47M), and Kissena Park ($46M) - areas that were among the hardest hit during Hurricane Ida.</p>";

let divChapterFunding2029 = 
  "<h3>2029: THE CONSEQUENCES FOR VULNERABLE COMMUNITIES</h3>" +
  "<p>Projections show emergency climate funding will remain at just $50 million through 2029 - 99.5% below 2022 levels. With virtually no federal flood protection funding, New York could lose 80,000 homes to flooding in the next 15 years.</p>" +
  "<p>Studies indicate that every $1 invested in disaster prevention saves $6 in recovery costs. These cuts leave Queens neighborhoods particularly vulnerable, as they were among the hardest hit during Hurricane Ida in 2021, when 11 residents lost their lives.</p>";

// EJAREAS CANCELLED
let divChapterJustice = 
  "<h3>ENVIRONMENTAL JUSTICE AREAS (EJUSTICE40)</h3>" +
  '<img src="Images/justice 40.png">' + 
  "<p>Areas vulnerable to extreme flooding based on flood risk assessment, disproportionately affecting environmental justice communities.</p>" +
  "<p><button onclick='toggleJustice40Map()' style='padding: 10px; background-color: #0078ff; color: white; border: none; border-radius: 5px; cursor: pointer;'>Toggle Justice40 Map</button></p>";

// REDLINED DISTRICTS
let divChapter3 = 
  "<h3>REDLINED AREAS IN THE CITY</h3>" +
  '<p class="imageCredit"><a href="https://www.nytimes.com/2020/04/09/nyregion/coronavirus-queens-corona-jackson-heights-elmhurst.html">The New York Times</a></p>' +
  "<p>Historically redlined areas in New York City continue to face disproportionate environmental challenges, including increased flood risk.</p>";

// ETHNICITY
let divChapterRaceEthnicity = 
  "<h3>RACE AND ETHNICITY DISTRIBUTION</h3>" +
  "<p>This map shows the distribution of predominant racial and ethnic groups across New York State's Disadvantaged Communities, highlighting areas with higher concentrations of Asian, Black, and Latino populations.</p>";

// DISADVANTAGED COMMUNITIES POPULATION
let divChapterDisadvantaged = 
  "<h3>POPULATION IN DISADVANTAGED COMMUNITIES</h3>" +
  "<p>This map highlights areas designated as disadvantaged communities, which are disproportionately affected by environmental challenges and federal budget cuts.</p>";

// EXTREMELY LOW INCOME POPULATION  
let divChapterLowIncome = 
  "<h3>LOW-TO-MODERATE INCOME POPULATION</h3>" +
  "<p>Census tracts where the percentage of households with incomes below 80% of Area Median Income (AMI) are shown. Darker purple areas indicate higher concentrations of low-to-moderate income households.</p>";

// STREET LEVEL VIEW - Fixed
let divChapterLowIncomeStreet = 
  '<h3>STREET-LEVEL VIEW OF AFFECTED AREAS</h3>' +
  "<p>A closer look at street level shows the actual neighborhoods most affected by flooding and federal budget cuts. These communities face significant challenges with limited resources for flood protection.</p>";

// CLOUDBURST SOLUTIONS
let divChapterCloudburst = 
  '<h3>CLOUDBURST SOLUTIONS</h3>' +
  '<p>Innovative cloudburst infrastructure can help mitigate flooding in vulnerable areas. These solutions were part of projects slated for funding before federal budget cuts.</p>' +
  '<div style="text-align: center;">' +
    '<img src="Images/Cloudburst Section.png" style="display: block; width: 100vw; height: auto; margin: 0; padding: 0;">' +
  '</div>';

// CLOUDBURST DETAILS
let divChapterCloudburstDetails = 
  '<h3>HOW CLOUDBURST SYSTEMS WORK</h3>' +
  '<p>Cloudburst systems combine porous concrete, subsurface storage, and intelligent water management to handle extreme rainfall events while creating more livable streets.</p>' +
  '<p>These systems can reduce flooding by up to 70% during severe storms, protecting homes and businesses in vulnerable communities.</p>' +
  '<div style="text-align: center;">' +
    '<img src="Images/Cloudburst Section Positive.png" style="display: block; width: 100vw; height: auto; margin: 0; padding: 0;">' +
  '</div>';


var config = {
  style: "mapbox://styles/sk3425/cm6o41tya01b701qmdpu9boh5",
  // leave commented to use Mapbox Standard Style
  accessToken: "pk.eyJ1Ijoic2szNDI1IiwiYSI6ImNtNmpmeTVnYzAwaTEyaXE4ZWZ4OG9yazIifQ.TsQiMmufb4nsdomDobl1nA",
  showMarkers: false,
  markerColor: "#3FB1CE",
  //projection: 'albers',
  //Read more about available projections here
  //https://docs.mapbox.com/mapbox-gl-js/example/projections/
  inset: false,
  insetOptions: {
    markerColor: "orange",
  },
  insetPosition: "bottom-right",
  theme: "light",
  use3dTerrain: false, //set true for enabling 3D maps.
  auto: false,
  topTitle: topTitleDiv,
  title: titleDiv,
  subtitle: "",
  byline: bylineDiv,
  description: descriptionDiv,
  footer: footerDiv,

  chapters: [
    //311 DATA ZOOMED OUT
    {
      id: "311-data-zoomedout",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter1,
      location: {
        center: [-73.856, 40.757],
        zoom: 12,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "311",
          opacity: 1,
          duration: 0
        },
        {
          layer: "311-labels",
          opacity: 1,
          duration: 0
        }
      ],
      onChapterExit: [
        {
          layer: "311",
          opacity: 0,
          duration: 0
        },
        {
          layer: "311-labels",
          opacity: 0,
          duration: 0
        }
      ]
    },
    //311 DATA ZOOMED IN
    {
      id: "311-data-zoomedin",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter2,
      location: {
        center: [-73.856, 40.757],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "311",
          opacity: 1,
          duration: 0
        },
        {
          layer: "311-labels",
          opacity: 1,
          duration: 0
        }
      ],
      onChapterExit: [
        {
          layer: "311",
          opacity: 0,
          duration: 0
        },
        {
          layer: "311-labels",
          opacity: 0,
          duration: 0
        }
      ]
    },
    //FLOOD STREET LEVEL DATA 
    {
      id: "flooding_chapter",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapterFloodingRisk,
      location: {
        center: [-73.856, 40.757],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "all-flooding",
          opacity: 0.7,
          duration: 300
        },
        {
          layer: "all-flooding-outline",
          opacity: 1,
          duration: 300
        }
      ],
      onChapterExit: [
        {
          layer: "all-flooding",
          opacity: 0,
          duration: 300
        },
        {
          layer: "all-flooding-outline", 
          opacity: 0,
          duration: 300
        }
      ]
    },
    // FEMA FLOODING CHAPTER
    {
      id: "fema_flooding_chapter",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapterFemaFlooding,
      location: {
        center: [-73.856, 40.757],
        zoom: 12,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "Fema-flooding",
          opacity: 0.7,
          duration: 300
        },
        {
          layer: "Fema-flooding-outline",
          opacity: 1,
          duration: 300
        }
      ],
      onChapterExit: [
        {
          layer: "Fema-flooding",
          opacity: 0,
          duration: 300
        },
        {
          layer: "Fema-flooding-outline", 
          opacity: 0,
          duration: 300
        }
      ]
    },
    //funding graph 2022, 2025, 2029
    {
      id: "funding2022",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterFunding2022,
      location: {
        center: [-73.92, 40.749],
        zoom: 10,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "showTimelineGraph", 
      onChapterEnter: [],
      onChapterExit: [],
      exitCallback: "hideTimelineGraph"
    },
    {
      id: "funding2025",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterFunding2025,
      location: {
        center: [-73.92, 40.749],
        zoom: 10,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "showTimelineGraph",
      onChapterEnter: [],
      onChapterExit: [],
      exitCallback: "hideTimelineGraph"
    },
    {
      id: "funding2029",
      alignment: "full", 
      hidden: false,
      chapterDiv: divChapterFunding2029,
      location: {
        center: [-73.92, 40.749],
        zoom: 10,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "showTimelineGraph",
      onChapterEnter: [],
      onChapterExit: [],
      exitCallback: "hideTimelineGraph"
    },
    //EJAREAS JUSTICE40
    {
      id: "justice",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterJustice,
      location: {
        center: [-73.856, 40.757],
        zoom: 12,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "showJustice40Map",
      onChapterEnter: [],
      onChapterExit: [],
      exitCallback: "hideJustice40Map"
    },
    //REDLINED DISTRICTS
    {
      id: "REDLINED",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter3,
      location: {
        center: [-73.856, 40.757],
        zoom: 12,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "redline",
          opacity: 1,
          duration: 300
        }
      ],
      onChapterExit: [
        {
          layer: "redline",
          opacity: 0,
          duration: 300
        }
      ]
    },
    //ETHNICITY 
    {
      id: "RACE_ETHNICITY",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapterRaceEthnicity,
      location: {
        center: [-73.856, 40.757],
        zoom: 13,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "race-ethnicity",
          opacity: 0.8,
          duration: 300
        }
      ],
      onChapterExit: [
        {
          layer: "race-ethnicity",
          opacity: 0,
          duration: 300
        }
      ]
    },
    //DISADVANTAGED COMMUNITIES POPULATION
    {
      id: "Disadvantaged",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapterDisadvantaged,
      location: {
        center: [-73.856, 40.757],
        zoom: 13,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "DAC",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "DAC",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    //EXTREMELY LOW INCOME POPULATION
    {
      id: "LOW_AMI",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapterLowIncome,
      location: {
        center: [-73.856, 40.757],
        zoom: 14,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "verylowincome",
          opacity: 0.7,
          duration: 300
        }
      ],
      onChapterExit: [
        {
          layer: "verylowincome",
          opacity: 0,
          duration: 300
        }
      ]
    },
    //STREET LEVEL VIEW
    {
      id: "LOW_AMI_STREET_VIEW",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapterLowIncomeStreet,
      location: {
        center: [-73.85762, 40.75408],
        zoom: 25,
        pitch: 100,
        bearing: 73
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [
        {
          layer: "verylowincome",
          opacity: 0,
          duration: 300
        },
        {
          transition: "fadeInCloudburstImage" // This custom transition fades in the cloudburst image
        }
      ]
    },
    // CLOUDBURST SOLUTION CHAPTER
    {
      id: "CLOUDBURST_SOLUTION",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterCloudburst,
      mapAnimation: "none",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [], // no fade here, image already visible
      onChapterExit: [] // do nothing yet
    },
    // POSITIVE CLOUDBURST CHAPTER
    {
      id: "CLOUDBURST",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterCloudburstDetails,
      mapAnimation: "none",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [], // still image visible
      onChapterExit: [
        {
          transition: "fadeOutCloudburstImage" // after user scrolls past this, fade out the image
        }
      ]
    },
    // Add this to your chapters array in map.js
{
  id: "queens_video_chapter",
  alignment: "full",
  hidden: false,
  title: "Climate Justice for Queens",
  description: "Without federal funding, these communities will continue to face increasing flood risks.",
  location: {
    // You may need to adjust these coordinates to match your map's focus area
    center: [-73.8448, 40.7282], // Queens coordinates
    zoom: 11,
    pitch: 0,
    bearing: 0
  },
  mapAnimation: "flyTo",
  rotateAnimation: false,
  callback: "initQueensVideo",
  onChapterEnter: [],
  onChapterExit: [],
  chapterDiv: '<div style="position: relative; width: 100%; height: 100vh; overflow: hidden;">' +
    '<video id="queensVideo" muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">' +
    '<source src="Images/Queens.mp4" type="video/mp4">' +
    'Your browser does not support the video tag.' +
    '</video>' +
    '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);"></div>' +
    '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">' +
    '<h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Climate Justice for Queens</h2>' +
    '<p style="font-size: 1.2rem; max-width: 600px;">Without federal funding, these communities will continue to face increasing flood risks.</p>' +
    '</div>' +
    '</div>'
}
  ]
};