// Set these to empty strings so they don't appear above the video
let topTitleDiv = "";
let titleDiv = "";
let bylineDiv = "";
// Define footerDiv since it's referenced in the config
let footerDiv = "";

// OPENING VIDEO PAGE
let descriptionDiv =
  '<div class="intro-section" style="position: relative; width: 100vw; height: 100vh; overflow: hidden; margin: 0; padding: 0;">' +
    '<video class="intro-video" autoplay muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;"><source src="Images/basement flood.mp4" type="video/mp4">Your browser does not support the video tag.</video>' +
    '<div class="intro-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4); z-index: 2;"></div>' +
    '<div id="delayed-text" class="intro-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3; text-align: center; max-width: 80%; color: #ffffff;">' +
      '<h4 style="font-size: 0.9rem; margin-bottom: 0.5rem; font-family: \'Gill Sans\', \'Helvetica\', sans-serif; font-weight: normal;">May 01, 2025</h4>' +
      '<h1 style="font-size: 3.5rem; margin: 0.5rem 0; font-family: \'Gill Sans\', \'Helvetica\', sans-serif; font-weight: bold;">Who Is Paying The Price For Federal Cuts?</h1>' +
      '<p style="font-size: 1.4rem; margin: 1rem 0; font-family: \'Gill Sans\', \'Helvetica\', sans-serif;">Alex Gordon, Surya Kumar and Nirmohi Kathrecha</p>' +
      '<p style="font-size: 1.4rem; line-height: 1.6; font-family: \'Gill Sans\', \'Helvetica\', sans-serif; margin-top: 2rem;"></p>' +
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
    '#delayed-text { animation: fadeIn 1s ease 5s forwards; opacity: 0; }' +
    '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }' +
  '</style>';

// 311 DATA ZOOMED OUT
let divChapter1 = 
  "<h3>311 Complaints</h3>" +
  "<p>Flooding presents various challenges, ranging from interfering with daily travel routes or local activities to causing structural damage to buildings or flash flooding of basement apartments, something which has already claimed lives in Corona. Anyone in New York who witnesses a flood-related issue is able to file a 311 complaint which is archived by NYC Open Data. When mapped, this data begins to suggest areas of concentrated recurring flooding. </p>";

// 311 DATA ZOOMED IN WITH ALIGNED AUDIO PLAYERS
let divChapter2 = 
  "<h3>NYC Flooding Reports</h3>" +
  "<p>Zooming in reveals streets and avenues with recurring flood complaints, such as Northern Boulevard, 34th Avenue, 37th Avenue, and Roosevelt Avenue. Click below to hear Queens' residents expressing their experiences and concerns about flooding. These quotes are pulled from various CBS news reports over the past 5 years. </p>" +
  
  // Wrapper div with grid layout to ensure alignment
  '<div style="display: grid; grid-template-columns: 200px 1fr; row-gap: 8px; align-items: center; margin: 0; padding: 0;"</div>' +
    
    // First row - Flooded Cars
    '<span style="color: #666; text-align: left;">Flooded Cars:</span>' +
    '<audio controls style="height: 30px; margin: 0; padding: 0; background: transparent; outline: none; width: 100%;">' +
      '<source src="./Images/1FloodedCars.mp3" type="audio/mpeg">' +
    '</audio>' +
    
    // Second row - Entire Roadway Flooded
    '<span style="color: #666; text-align: left;">Entire Roadway Flooded:</span>' +
    '<audio controls style="height: 30px; margin: 0; padding: 0; background: transparent; outline: none; width: 100%;">' +
      '<source src="./Images/2ThisEntireRoadwayWasFlooded.mp3" type="audio/mpeg">' +
    '</audio>' +
    
    // Third row - Water Up To My Knee
    '<span style="color: #666; text-align: left;">Water Up To My Knee:</span>' +
    '<audio controls style="height: 30px; margin: 0; padding: 0; background: transparent; outline: none; width: 100%;">' +
      '<source src="./Images/3WaterUpToMyKnee.mp3" type="audio/mpeg">' +
    '</audio>' +
    
    // Fourth row - It's Like Life Stops
    '<span style="color: #666; text-align: left;">It\'s Like Life Stops:</span>' +
    '<audio controls style="height: 30px; margin: 0; padding: 0; background: transparent; outline: none; width: 100%;">' +
      '<source src="./Images/4ItsLikeLifeStops.mp3" type="audio/mpeg">' +
    '</audio>' +
  '</div>';

// FLOOD STREET LEVEL DATA
let divChapterFloodingRisk = 
  "<h3>Flooding Risk Areas</h3>" +
  "<p>Using data from NYC Stormwater Open Data, we can compare flood complaints with predicted areas of flood risk assessed using hydrologic and hydraulic computer models. Northern Boulevard and 37th Avenue stand out as particularly vulnerable to flooding in an extreme rainfall scenario (3.66 in/hr). </p>";
  
// FLOOD VIDEO 
let divChapterFloodvideo = 
  "<h3>Flood Impact</h3>" +
  "<p>Video footage showing the real-world impact of flooding on local communities. These events have become more common as climate change intensifies weather patterns.</p>" +
  '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">' +
    '<iframe src="https://www.youtube.com/embed/6Kj__m_ZiwM" ' +
    'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" ' +
    'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
    'allowfullscreen></iframe>' +
  '</div>';

// FEMA FLOOD RISK AREAS
let divChapterFemaFlooding = 
  "<h3>FEMA Flood Risk Areas</h3>" +
  "<p>East Corona is also at risk of flooding due to sea level rise caused by climate change. The area shown in blue represents the water boundary at high tide when the sea level rises by 10 feet. Some scientists believe that this may happen within the next two centuries</p>";

// JUSTICE 40
let divChapterJustice1 = 
  "<h3>Environmental Justice Areas</h3>" +
  '<img src="Images/justice40_gone.png" style="width: 100%; height: auto; border:none; box-shadow: none; display: block; margin: 0; padding: 0;">';

let divChapterJustice2 = 
  "<h3>Environmental Justice Areas</h3>" +
  '<img src="Images/justice 40.png" style="width: 100%; height: auto; border:none; box-shadow: none; display: block; margin: 0; padding: 0;">';

  let divChapterJustice3 =
  "<h3>Environmental Justice Areas in New York City</h3>" +
  "<p>Justice40 was a government program made to ensure that at least 40% of federal climate investments go directly to frontline communities most affected by poverty and pollution. This included investments from the Federal Emergency Management Agency (FEMA) and the Building Resilient Infrastructure and Communities (BRIC) program. The Biden-Harris Administration had previously announced that BRIC exceeded Justice40 goals, 'delivering 67% in BRIC and 51% in Flood Mitigation of benefits from FY23 awards to Justice40 communities.'</p>";


// REDLINED DISTRICTS
let divChapter3 = 
  "<h3>Redlined areas in the city</h3>" +
  "<p>Historically redlined areas in New York City continue to face disproportionate environmental challenges, including increased flood risk.</p>";

// ETHNICITY
let divChapterRaceEthnicity = 
  "<h3>Race and Ethnicity Distribution</h3>" +
  "<p>This map shows the distribution of predominant racial and ethnic groups across New York State's Disadvantaged Communities, highlighting areas with higher concentrations of Asian, Black, and Latino populations.</p>";

// DISADVANTAGED COMMUNITIES POPULATION
let divChapterDisadvantaged = 
  "<h3>Population in disadvantaged communities</h3>" +
  "<p>This map highlights areas designated as disadvantaged communities, which are disproportionately affected by environmental challenges and federal budget cuts.</p>";

// EXTREMELY LOW INCOME POPULATION  
let divChapterLowIncome = 
  "<h3>Low Income Population</h3>" +
  "<p>Census tracts where the percentage of households with incomes below 80% of Area Median Income (AMI) are shown.</p>";

// STREET LEVEL VIEW
let divChapterLowIncomeStreet = 
  '<h3>Street-level view of affected areas</h3>' +
  "<p>A closer look at street level shows the actual neighborhoods most affected by flooding and federal budget cuts. These communities face significant challenges with limited resources for flood protection, or have even had funding granted under the Biden administration that has been revoked under Trump. </p>";

// CLOUDBURST DETAILS
let divChapterCloudburstDetails = 
'<h3>East Corona Flood Prevention Infrastructure </h3>' +
'<p>In 2023, 50 million dollars was granted to East Corona to fund improvements in flood prevention infrastructure. The project proposal involved installing a nature-based and climate-adaptive drainage solution to mitigate damage and disruption from stormwater flooding during high-intensity rain events. The project was to use porous pavement and subsurface and surface water storage to increase the stormwater infrastructures capacity and reduce intense local flooding. </p>' +
'<div style="text-align: center;">' +
  '<img src="Images/Cloudburst Section Positive.png" style="display: block; width: 100vw; height: auto; margin: 0; padding: 0;">' +
'</div>';

// CLOUDBURST SOLUTIONS
let divChapterCloudburst = 
  '<h3>Funding Not Found</h3>' +
  '<p>In President Trump’s efforts to slash federal spending, this project that could have caused meaningful change in Corona has fallen apart. The government webpage that once described the initiative and showed the awarded funding amount has been deleted and is only accessible using the Internet Archive. This leaves Corona vulnerable in the face of worsening weather conditions in the future due to climate change. This funding could have changed lives, and now it is gone.</p>' +
  '<div style="text-align: center;">' +
    '<img src="Images/Cloudburst Section.png" style="display: block; width: 100vw; height: auto; margin: 0; padding: 0;">' +
  '</div>';

// QUEENS VIDEO CHAPTER
let divChapterQueensVideo =  
  '<div style="position: relative; width: 100%; height: 100vh; overflow: hidden;">' +
    '<video id="queensVideo" playsinline loop controls style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">' +
      '<source src="Images/Queens.mp4" type="video/mp4">' +
      'Your browser does not support the video tag.' +
    '</video>' +
    '<h3 style="position: absolute; top: 30px; left: 30px; color: white; z-index: 10; margin: 0; padding: 0; font-size: 1.5rem;">Climate Justice for Queens</h3>' +
    '<script>' +
      'document.getElementById("queensVideo").addEventListener("loadedmetadata", function() {' +
        'this.muted = false;' +
        'this.play().catch(e => console.log("Autoplay prevented:", e));' +
      '});' +
    '</script>' +
  '</div>';

var config = {
  style: "mapbox://styles/nirmohi/cma468qsl003g01qwgwsf9jde",
  accessToken: "pk.eyJ1IjoibmlybW9oaSIsImEiOiJjbTExMGRyNXkwbnh0Mm5vcmtteWJwOWplIn0.MSqHgjuT6rq8AL6lEXDxVQ",
  showMarkers: false,
  markerColor: "#3FB1CE",
  inset: false,
  insetOptions: {
    markerColor: "orange",
  },
  insetPosition: "bottom-right",
  theme: "light",
  use3dTerrain: false,
  auto: false,
  topTitle: topTitleDiv,
  title: titleDiv,
  subtitle: "",
  byline: bylineDiv,
  description: descriptionDiv,
  footer: footerDiv,

  chapters: [
    // 311 DATA ZOOMED OUT
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
      onChapterExit: []
    },
    
    //311 data zoomed in
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
          duration: 300
        },
        {
          layer: "311-labels",
          opacity: 1,
          duration: 300
        }
      ],
      onChapterExit: [
        {
          layer: "311",
          opacity: 0,
          duration: 300
        },
        {
          layer: "311-labels",
          opacity: 0,
          duration: 300
        }
      ]
    },
    
    // FLOOD STREET LEVEL DATA 
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
      onChapterExit: []
    },

    // FLOOD VIDEO CHAPTER
    {
      id: "flood_video_chapter",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapterFloodvideo,
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
    
    // FUNDING GRAPH 2022
    {
      id: "funding2022",
      alignment: "full",
      hidden: false,
      chapterDiv: "",
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
    
    // FUNDING GRAPH 2025
    {
      id: "funding2025",
      alignment: "full",
      hidden: false,
      chapterDiv: "",
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
    
    // FLOOD FUNDING
    {
      id: "floodFunding",
      alignment: "full",
      hidden: false,
      chapterDiv: "",
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
    
    // First chapter - justice40_gone image
    {
      id: "justice40-before",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterJustice1,
      location: {
        center: [-73.856, 40.757],
        zoom: 9,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [
        {
          layer: "background",
          opacity: 1,
          duration: 1500
        }
      ]
    },

    // Second chapter - justice 40 image
    {
      id: "justice40-after",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterJustice2,
      location: {
        center: [-73.856, 40.757],
        zoom: 9,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "background",
          opacity: 1,
          duration: 1500
        }
      ],
      onChapterExit: []
    },

    // Third chapter - showing the map layer
    {
      id: "justice40-map",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterJustice3,
      location: {
        center: [-73.856, 40.757],
        zoom: 10,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "justice40-layer",
          opacity: 0.7,
          duration: 700
        },
        {
          layer: "justice40-outline",
          opacity: 1,
          duration: 700
        }
      ],
      onChapterExit: [
        {
          layer: "justice40-layer",
          opacity: 0,
          duration: 700
        },
        {
          layer: "justice40-outline",
          opacity: 0,
          duration: 700
        }
      ]
    },
    
// REDLINED DISTRICTS
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
    },
    {
      layer: "311-labels",
      opacity: 0,
      duration: 0
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

// ETHNICITY 
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
    },
    {
      layer: "311-labels",
      opacity: 0,
      duration: 0
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

// DISADVANTAGED COMMUNITIES POPULATION
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
    {
      layer: "311-labels",
      opacity: 0,
      duration: 0
    }
  ],
  onChapterExit: [
    {
      layer: "DAC",
      opacity: 0,
      duration: 300,
    },
  ],
},

// EXTREMELY LOW INCOME POPULATION
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
    },
    {
      layer: "311-labels",
      opacity: 0,
      duration: 0
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
    
    // STREET LEVEL VIEW
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
          transition: "fadeInCloudburstImage"
        }
      ]
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
      onChapterEnter: [],
      onChapterExit: [
        {
          transition: "fadeOutCloudburstImage"
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
      onChapterEnter: [],
      onChapterExit: []
    },
    
    // QUEENS VIDEO CHAPTER
    {
      id: "queens_video_chapter",
      alignment: "full",
      hidden: false,
      chapterDiv: divChapterQueensVideo,
      location: {
        center: [-73.8448, 40.7282], // Queens coordinates
        zoom: 11,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "initQueensVideo",
      onChapterEnter: [],
      onChapterExit: []
    }
  ]
};