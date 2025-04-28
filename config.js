// Set these to empty strings so they don't appear above the video
let topTitleDiv = "";
let titleDiv = "";
let bylineDiv = "";
// Put all content in the descriptionDiv with white text and a more reliable method to display delayed text
let descriptionDiv =
  '<div class="intro-section" style="position: relative; width: 100vw; height: 100vh; overflow: hidden; margin: 0; padding: 0;">' +
    '<video class="intro-video" autoplay muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;"><source src="images/basement flood.mp4" type="video/mp4">Your browser does not support the video tag.</video>' +
    '<div class="intro-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4); z-index: 2;"></div>' +
    '<div id="delayed-text" class="intro-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3; text-align: center; max-width: 80%; color: #ffffff;">' +
      '<h1 style="font-size: 3.5rem; margin: 0.5rem 0; font-family: \'Gill Sans\', \'Helvetica\', sans-serif; font-weight: bold; text-transform: uppercase;">WHO IS PAYING THE PRICE FOR FEDERAL CUTS?</h1>' +
      '<p style="font-size: 1.4rem; margin: 1rem 0; font-family: \'Gill Sans\', \'Helvetica\', sans-serif;">Alex, Surya and Nirmohi</p>' +
      '<p style="font-size: 1.4rem; line-height: 1.6; font-family: \'Gill Sans\', \'Helvetica\', sans-serif; margin-top: 2rem;">Explore how disadvantaged communities across New York City are disproportionately affected by federal budget cuts.</p>' +
      '<p style="font-size: 1.2rem; margin-top: 3rem; font-family: \'Gill Sans\', \'Helvetica\', sans-serif;">scroll to begin the journey</p>' +
      '<div style="font-size: 2rem; margin-top: 1rem; animation: bounce 2s infinite;">▼</div>' +
    '</div>' +
  '</div>' 

// Create the text content without embedded graph containers
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

let footerDiv =
  '<p>This story is based on data by the <a href="http://web.mta.info/developers/turnstile.html">Metropolitan Transit Authority</a> and reporting by the <a href="https://www.nytimes.com/2020/04/09/nyregion/coronavirus-queens-corona-jackson-heights-elmhurst.html">New York Times</a>, <a href="https://ny.curbed.com/2020/3/24/21192454/coronavirus-nyc-transportation-subway-citi-bike-covid-19">Curbed</a>, and <a href="https://thecity.nyc/2020/03/subway-ridership-plunge-deepest-at-big-manhattan-stations.html">The City</a>.</p>' +
  '<p><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> | <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a></p>';

let divChapter1 =
  "<h3>Flooding data</h3>" 
  '<p class="imageCredit"><a href="#">Image credit: Your Source Here</a></p>' +
  "<p>V311 complaints about floodin!</p>";

let divChapter2 =
  "<h3>POPULATION IN DISADVAATAGED COMMUNITIES </h3>" +
  '<img src="Images/Justice 40.png">' +
  '<p class="imageCredit"><a href="https://www.nytimes.com/2020/04/09/nyregion/coronavirus-queens-corona-jackson-heights-elmhurst.html">The New York Times</a></p>' +
  "<p>NEW YORK FLOOD HAZARD ZONE</p>";

let divChapter3 =
  "<h3>REDLINED AREAS IN THE CITY </h3>" +
  '<img src="images/Chapter_3_Image.jpg">' +
  '<p class="imageCredit"><a href="https://www.nytimes.com/2020/04/09/nyregion/coronavirus-queens-corona-jackson-heights-elmhurst.html">The New York Times</a></p>' +
  "<p>Elmhurst Hospital Center has been identified as one of the hospitals most overwhelmed by the number of patients with COVID-19 it has received. Located in a low-middle-income area of the city, with a median household income of around $50,000, the hospital serves one of the most diverse and immigrant dense areas of the city. The three subway stations around the hospital have all seen relatively small change in their usage compare to the rest of the city.</p>";

let divChapter4 =
"<h3>MINORITY COMMUNITIES POPULATION </h3>" +
'<img src="images/Chapter_3_Image.jpg">' +
'<p class="imageCredit"><a href="https://www.nytimes.com/2020/04/09/nyregion/coronavirus-queens-corona-jackson-heights-elmhurst.html">The New York Times</a></p>' +
"<p>Elmhurst Hospital Center has been identified as one of the hospitals most overwhelmed by the number of patients with COVID-19 it has received. Located in a low-middle-income area of the city, with a median household income of around $50,000, the hospital serves one of the most diverse and immigrant dense areas of the city. The three subway stations around the hospital have all seen relatively small change in their usage compare to the rest of the city.</p>";

let divChapter4A =
  "<h3 style='max-width:600px; margin-left:auto; margin-right:auto'>Overall collapse of subway usage</h3>" +
  '<div style="max-width:1200px; margin-left:auto; margin-right:auto"><img src="images/WeekdaySubway.svg"></div>' +
  "<p class='imageCredit' style='max-width:600px; margin-left:auto; margin-right:auto'><a href='https://qri.cloud/nyc-transit-data/turnstile_daily_counts_2020'>NYC Subway Turnstile Counts - 2020 (Qri)</a></p>" +
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>As can be seen in the chart above, subway usage collapsed abruptly right after the first COVID-19 case was documented in the city. It was in fact the declaration of a state of emergency, on March 7, 2020, that precipitated this near total drop in subway ridership.</p>" +
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>After a few weeks of the declaration of state of emergency, subway usage in the city reached its lowest point, almost 90% less than the same time period the year before. Since then, the number of people that use the subway has remained drastically low. Even after the city began its re-opening scheme on June 8, 2020, subway usage was still more than 70% below 2019 levels.</p>" +
  '<div style="max-width:600px; margin-left:auto; margin-right:auto"><iframe title="vimeo-player" src="https://player.vimeo.com/video/529512696" width="600" height="277.5" frameborder="0" allowfullscreen></iframe></div>' +
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>This difference, however, varies across the city, with some parts of it seeing a much steeper decline and others witnessing a stronger recovery. Nevertheless, even a year after the pandemic first hit New York City, the number of daily subway commuters remains below 2019 levels.</p>" +
  "<p style='max-width:600px; margin-left:auto; margin-right:auto'>That being said, other transportation networks have fared differently. For example, after a similar decline right after the state of emergency was declared, Citibike has seen its number of users reach and even surpass 2019 levels. City buses, on the other hand, also remain underutilized compared to their usage pre-pandemic.</p>";

let divChapter5 =
  "<h3>BELOW POVERTY</h3>" +
  '<img src="images/Chapter_4_Image.jpg">' +
  '<p class="imageCredit"><a href="https://www.nytimes.com/2020/04/09/nyregion/coronavirus-queens-corona-jackson-heights-elmhurst.html">The New York Times</a></p>' +
  "<p>The South Bronx, perennially marred in social injustice, has also been hard hit during the current COVID-19 outbreak. The area's three main neighborhoods, Mott Haven, Melrose and Port Morris are mostly home to low-income families that have been forced to continue going to work, risking their health and that of their loved ones. Similarly to Jackson Heights in Queens, the areas subway stations have seen a smaller decrease in use than the rest of the city. Median household income in this area oscillates between $15,000 and $30,000.</p>";

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
      id: "311 ",
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
          duration: 300
        },
        {
          layer: "311-labels",
          opacity: 0,
          duration: 300
        }
      ]
    },
    //311 DATA ZOOMED IN
    {
      id: "flooding311-chapter2",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter1,
      title: "NYC Flooding Reports",
      description: "311 reports of street flooding across NYC",
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
        //FLOOD STREET LEVEL DATA 
        {
          id: "flooding_chapter",
          alignment: "left",
          hidden: false,
          title: "Flooding Risk Areas",
          description: "Areas vulnerable to flooding based on flood risk assessment",
          location: {
            center: [-73.856, 40.757], // Center coordinates matching your data
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
              opacity: 0.8,
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
        {
          id: "fema_flooding_chapter",
          alignment: "left",
          hidden: false,
          title: "FEMA Flood Risk Areas",
          description: "Areas vulnerable to flooding based on FEMA flood risk assessment",
          location: {
            center: [-73.856, 40.757], // Center coordinates matching your data
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
              opacity: 0.8,
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
  callback: "showTimelineGraph", // Same function but it will handle different periods based on chapter ID
  onChapterEnter: [],
  onChapterExit: [],
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
  callback: "showTimelineGraph", // Same function handles all three
  onChapterEnter: [],
  onChapterExit: [],
},

//EJAREAS CANCELLED

{
  id: "justice",
  alignment: "full",
  hidden: true,
  title: "Ejustice40",
  image: "Images/justice 40.png", // Add this line with the path to your image
  description: "Areas vulnerable to extreme flooding based on flood risk assessment",
  chapterDiv: divChapter2,
  location: {
    center: "",
    zoom: 17,
    pitch: 0,
    bearing: 0
  },
  mapAnimation: "flyTo",
  rotateAnimation: false,
  callback: "",
  onChapterEnter: [
    {
      layer: "Extreme_Flooding",
      opacity: 0.8,
      duration: 300
    }
  ],
  onChapterExit: [
    {
      layer: "Extreme_Flooding",
      opacity: 0,
      duration: 300
    }
  ]
},
    
    
{
  id: "REDLINED",
  alignment: "left",
  hidden: false,
  chapterDiv: divChapter3,
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
      {
        id: "DAC3",
        alignment: "left",
        hidden: false,
        chapterDiv: divChapter3,
        location: {
          center: [-73.856, 40.757],
          zoom: 14,
          pitch: 0,
          bearing: 0,
          // flyTo additional controls-
          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          //speed: 2, // make the flying slow
          //curve: 1, // change the speed at which it zooms out
        },
        mapAnimation: "flyTo",
        rotateAnimation: false,
        callback: "",
        onChapterEnter: [
          {
            layer: "DAC3",
            opacity: 1,
            duration: 300,
          },
        ],
        onChapterExit: [
          {
            layer: "DAC3",
            opacity: 0,
            duration: 300,
          },
        ],
      },
      {
        id: "DAC4",
        alignment: "left",
        hidden: false,
        chapterDiv: divChapter2,
        location: {
          center: [-73.856, 40.757],
          zoom: 14,
          pitch: 0,
          bearing: 0,
          // flyTo additional controls-
          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          //speed: 2, // make the flying slow
          //curve: 1, // change the speed at which it zooms out
        },
        mapAnimation: "flyTo",
        rotateAnimation: false,
        callback: "",
        onChapterEnter: [
          {
            layer: "DAC4",
            opacity: 1,
            duration: 300,
          },
        ],
        onChapterExit: [
          {
            layer: "DAC4",
            opacity: 0,
            duration: 300,
          },
        ],
      },
      {
        id: "REDLINED",
        alignment: "left",
        hidden: false,
        chapterDiv: divChapter3,
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
      {
        id: "Ethinicity",
        alignment: "left",
        hidden: false,
        chapterDiv: divChapter3,
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
            layer: "race-ethnicity",
            opacity: 1,
            duration: 300
          }
        ],
        onChapterExit: [
          {
            layer: "race-ethnicitye",
            opacity: 0,
            duration: 300
          }
        ]
      },
      {
        id: "DAC6",
        alignment: "left",
        hidden: false,
        chapterDiv: divChapter5,
        location: {
          center: [-73.856, 40.757],
          zoom: 14,
          pitch: 0,
          bearing: 0,
          // flyTo additional controls-
          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          //speed: 2, // make the flying slow
          //curve: 1, // change the speed at which it zooms out
        },
        mapAnimation: "flyTo",
        rotateAnimation: false,
        callback: "",
        onChapterEnter: [
          {
            layer: "DAC6",
            opacity: 1,
            duration: 300,
          },
        ],
        onChapterExit: [
          {
            layer: "DAC6",
            opacity: 0,
            duration: 300,
          },
        ],
      },
      {
        id: "DAC10",
        alignment: "left",
        hidden: false,
        chapterDiv: divChapter4,
        location: {
          center: [-73.856, 40.757],
          zoom: 14,
          pitch: 0,
          bearing:0,
          speed: 0.8,
          curve: 1.5,
          // flyTo additional controls-
          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          //speed: 2, // make the flying slow
          //curve: 1, // change the speed at which it zooms out
        },
        mapAnimation: "flyTo",
        rotateAnimation: false,
        callback: "",
        onChapterEnter: [
          {
            layer: "311",
            opacity: 1,
            duration: 300,
          },
        ],
        onChapterExit: [
          {
            layer: "311",
            opacity: 0,
            duration: 300,
          },
        ],
      },
  ],
}