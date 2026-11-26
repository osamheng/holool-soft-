import qualicupScreenshot from "../assets/projects/qualicup.webp";
import mochaLandScreenshot from "../assets/projects/mocha-land.webp";
import coffeeStoryScreenshot from "../assets/projects/coffee-story.webp";

const projectsData = [
  {
    id: "qualicup",
    name: "QualiCup",
    url: "https://app.qualicup.net/",
    domain: "app.qualicup.net",
    category: "systems",
    categoryLabel: "أنظمة ومنصات ويب",
    description:
      "منصة رقمية متخصصة لإدارة جودة القهوة، تقييم العينات، وتنظيم جلسات التذوق وتحليل النتائج.",
    contribution:
      "تصميم وتطوير منصة لإدارة العينات والتقييم الحسي والتقارير ضمن سير عمل موحد.",
    screenshot: qualicupScreenshot,
    screenshotAlt: "لقطة شاشة من موقع QualiCup",
  },
  {
    id: "mocha-land",
    name: "Mocha Land",
    url: "https://mochalandcoffee.com/ar/",
    domain: "mochalandcoffee.com/ar",
    category: "business",
    categoryLabel: "مواقع تجارية وتعريفية",
    description:
      "موقع متكامل يعرض محاصيل البن اليمني، مناطق الإنتاج، ورحلة الجودة والتصدير بواجهة عربية.",
    contribution:
      "تصميم وتطوير موقع عربي يعرض المنتجات والمناطق الزراعية ومراحل الجودة والتصدير.",
    screenshot: mochaLandScreenshot,
    screenshotAlt: "لقطة شاشة من موقع موكا لاند",
  },
  {
    id: "coffee-story",
    name: "Coffee Story / CSEYP",
    url: "https://cseyp.com/",
    domain: "cseyp.com",
    category: "business",
    categoryLabel: "مواقع تعريفية ومؤسسية",
    description:
      "منصة تعريفية لمؤسسة حكاية بُن تسلط الضوء على القهوة اليمنية ومراحل العناية بها وسلسلة القيمة.",
    contribution:
      "تصميم وتطوير موقع المؤسسة لعرض قصة البن اليمني ومراحل العناية به ومحتوى المؤسسة.",
    screenshot: coffeeStoryScreenshot,
    screenshotAlt: "لقطة شاشة من موقع مؤسسة حكاية بُن",
  },
];

export default projectsData;
