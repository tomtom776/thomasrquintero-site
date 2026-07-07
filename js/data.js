/* ==========================================================================
   SITE CONTENT — edit this file to change what the site says.
   Layout and behavior live in index.html / css/styles.css / js/main.js;
   you should never need to touch those to add or edit a project.
   ========================================================================== */

const SITE_DATA = {

  /* ------------------------------------------------------------------
     FEATURED PROJECTS
     Each project:
       id          — short unique slug (used for element ids)
       title       — card heading
       description — 1–2 sentences
       media       — { type: "image", src, alt }
                     or { type: "video", src, poster, alt }
                     (videos autoplay muted + looping, lazy-loaded)
       link        — { url, label } for public projects (opens new tab),
                     or null for internal work (card shows an
                     "Ask me about this" link to the contact section)
     To add a project: copy a block, edit it, done.
     ------------------------------------------------------------------ */
  projects: [
    {
      id: "who-is-my-neighbor",
      title: "Who Is My Neighbor?",
      description:
        "A demographic mapping app that estimates parish territory boundaries " +
        "and ministry needs for every parish in the Archdiocese of Galveston-Houston.",
      media: {
        type: "image",
        src: "assets/img/who-is-my-neighbor.png",
        alt: "Map of parish territories across the Archdiocese of Galveston-Houston"
      },
      link: {
        url: "https://tomtom776.github.io/who-is-my-neighbor/who_is_my_neighbor.html",
        label: "View Project"
      }
    },
    {
      id: "property-tool",
      title: "Super Cool Property Tool",
      description:
        "An ArcGIS Experience Builder app that pulls together the location facts " +
        "that matter when scouting a property: flood history and zone, school " +
        "zones, recent crime, and walkability.",
      media: {
        type: "image",
        src: "assets/img/property-tool.png",
        alt: "Web app showing flood, school, crime, and walkability layers for a property"
      },
      link: {
        url: "https://experience.arcgis.com/experience/d90fad7ca951493ca8b37048cbfb6133",
        label: "View Project"
      }
    },
    {
      id: "glo-field-visit",
      title: "GLO Hydraulic Structure Field Visit Data Reviewer",
      description:
        "Coordinated a 10-person crew collecting data on 63 hydraulic structures " +
        "— bridges and culverts — using ArcGIS Field Maps and Leica GPS units. " +
        "This reviewer is where that field data got validated.",
      media: {
        type: "video",
        src: "assets/videos/glo-field-visit.mp4",
        srcWebm: "assets/videos/glo-field-visit.webm",
        poster: "assets/img/glo-field-visit-poster.jpg",
        alt: "Screen recording of the hydraulic structure field data reviewer"
      },
      link: null
    },
    {
      id: "wrp-reference-map",
      title: "WRP Reference Map",
      description:
        "A web app that gives the Water Resources Planning group a shared picture " +
        "of key spatial datasets when communicating with clients.",
      media: {
        type: "video",
        src: "assets/videos/wrp-reference-map.mp4",
        srcWebm: "assets/videos/wrp-reference-map.webm",
        poster: "assets/img/wrp-reference-map-poster.jpg",
        alt: "Screen recording of the water resources planning reference map"
      },
      link: null
    },
    {
      id: "glo-hot-spot",
      title: "GLO Hot Spot Analysis",
      description:
        "A repeatable, objective geospatial analysis quantifying flood exposure " +
        "across the Texas General Land Office's Central region.",
      media: {
        type: "image",
        src: "assets/img/glo-hot-spot.png",
        alt: "Methodology diagram of the flood exposure hot spot analysis"
      },
      link: null
    },
    {
      id: "competitor-analysis",
      title: "Competitor Analysis",
      description:
        "A web app that flags which clients are most likely to switch grant " +
        "administrators, built to guide market-penetration strategy.",
      media: {
        type: "video",
        src: "assets/videos/competitor-analysis.mp4",
        srcWebm: "assets/videos/competitor-analysis.webm",
        poster: "assets/img/competitor-analysis-poster.jpg",
        alt: "Screen recording of the competitor analysis web app"
      },
      link: null
    }
  ],

  /* ------------------------------------------------------------------
     TECHNICAL SKILLS — three categories rendered as cards
     ------------------------------------------------------------------ */
  skills: [
    {
      category: "Geologic Methods",
      items: [
        "Petrography",
        "Cathodoluminescence imaging",
        "Mineral texture & paragenetic analysis",
        "Field sampling & stratigraphic description"
      ]
    },
    {
      category: "Geospatial & Quantitative",
      items: [
        "ArcGIS Pro",
        "ArcGIS Online",
        "ArcGIS Field Maps",
        "ModelBuilder",
        "Experience Builder",
        "GeoPandas",
        "Python",
        "ChatGPT / Claude prompting"
      ]
    },
    {
      category: "Scientific Communication",
      items: [
        "Scientific poster design",
        "Technical writing",
        "Cartographic visualization"
      ]
    }
  ],

  /* ------------------------------------------------------------------
     EXPERIENCE TIMELINE — oldest first; rendered as an interactive
     horizontal track on desktop, vertical accordion on mobile
     ------------------------------------------------------------------ */
  timeline: [
    {
      org: "NASA DEVELOP",
      role: "GIS Analyst Intern",
      dates: "2020",
      summary:
        "Built regression maps of land surface temperature and ran LiDAR " +
        "analysis with custom R scripts."
    },
    {
      org: "City of Detroit Planning Dept.",
      role: "GIS Analyst Intern",
      dates: "2020–2021",
      summary:
        "Developed a tree planting suitability model with the Detroit " +
        "Reforestation Initiative."
    },
    {
      org: "Public Management, Inc.",
      role: "Project Manager / GIS Technician",
      dates: "2021–2023",
      summary:
        "Managed $80M+ in federal grant funds across 30+ Texas communities."
    },
    {
      org: "Freese and Nichols, Inc.",
      role: "GIS Analyst",
      dates: "2023–Present",
      summary:
        "Coordinates field teams on 62 engineered assets, builds flood-risk " +
        "geoprocessing workflows for GLO Regional Flood Planning, and serves " +
        "as FEMA Region 5 data steward."
    }
  ],

  /* ------------------------------------------------------------------
     CONTACT
     ------------------------------------------------------------------ */
  contact: {
    phone: "(713) 416-3331",
    email: "thomasrquintero@gmail.com",
    linkedin: "https://www.linkedin.com/in/thomasrquintero/",
    /* Prefilled "research me" links. Both services require the visitor
       to be signed in, and the URL formats are undocumented — treat as
       a nice-to-have flourish, not critical infrastructure. */
    aiQuery: "Tell me about Thomas Quintero's GIS work in Houston, Texas"
  }
};
