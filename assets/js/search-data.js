// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-resume",
          title: "Resume",
          description: "I am a first year graduate student persuing a degree in AI with a concentration in ML and an interest in Robotics.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/resume/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of my projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "news-hello-world",
          title: 'Hello World!',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_1/";
            },},{id: "projects-chess-bot-player-move-predictor",
          title: 'Chess Bot Player Move Predictor',
          description: "A deep learning AI model which can predict a players move from the previous moves they made.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/chess_ai/";
            },},{id: "projects-high-speed-footage-analyzer",
          title: 'High Speed Footage Analyzer',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/footage_analyzer/";
            },},{id: "projects-improved-managebac",
          title: 'Improved Managebac',
          description: "Made an extension to improve Managebac.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/improved_managebac/";
            },},{id: "projects-estimating-trajectory-from-imu",
          title: 'Estimating Trajectory From IMU',
          description: "Estimated vehicle trajectory exclusively from IMU by fusing magnetometer and gyroscope data, validated against GPS",
          section: "Projects",handler: () => {
              window.location.href = "/projects/imu/";
            },},{id: "projects-automatic-lecture-reducer",
          title: 'Automatic Lecture Reducer',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/lecture_reducer/";
            },},{id: "projects-estimated-transit-eta",
          title: 'Estimated Transit ETA',
          description: "Using data provided by the MBTA estimated my trip to school estimated length and expected time using Monte-Carlo.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/mbta_eta/";
            },},{id: "projects-bias-transfer-in-model-distillation",
          title: 'Bias Transfer in Model Distillation',
          description: "Investigated bias propagation during knowledge distillation from Llama 3.1 8B Instruct to smaller student architectures (BoW, CNN, DistilBERT), quantifying measurable increases in racial and gender bias across student models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/model_distillation/";
            },},{id: "projects-poker-agent",
          title: 'Poker Agent',
          description: "Created a program in collaboration with a peer which learned to play Texas Hold&#39;em by running 250,000 games through Deep Q-Learning, utilizing a backbone of PyTorch for the neural network.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/poker_agent/";
            },},{id: "projects-robotic-photographer-for-3d-gaussian-splatting",
          title: 'Robotic Photographer for 3D Gaussian Splatting',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/robot_photographer/";
            },},{id: "projects-ar-tic-tac-toe",
          title: 'AR Tic-Tac-Toe',
          description: "Developed Tic-Tac-Toe app in the Vision Pro with immersive features.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tic_tac_toe/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%69%61%6D%70%61.%63@%6E%6F%72%74%68%65%61%73%74%65%72%6E.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/CharlesC03", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/Charles-Ciampa# your LinkedIn user name", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-spotify',
        title: 'Spotify',
        section: 'Socials',
        handler: () => {
          window.open("https://open.spotify.com/user/2rhugm409ea6xvhbftq9ymtla", "_blank");
        },
      },{
        id: 'social-stackoverflow',
        title: 'Stackoverflow',
        section: 'Socials',
        handler: () => {
          window.open("https://stackoverflow.com/users/11578449", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
