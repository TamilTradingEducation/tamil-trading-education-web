/**
 * Centralized image sources.
 *
 * These are hotlinked Unsplash photos used as production-quality placeholders
 * (royalty-free, no attribution legally required, but crediting Unsplash is good practice).
 * Because this project was generated in a sandbox without live internet access,
 * please verify each URL still resolves before shipping, and feel free to swap
 * any of these for your own licensed photography — every reference lives here,
 * in one file, so a swap never requires touching page/component code.
 */

const unsplash = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  heroTradingDesk: unsplash("photo-1611974789855-9c2a0a7236a3", 1920, 85),
  candlestickChart: unsplash("photo-1590283603385-17ffb3a7f29f"),
  financialSkyline: unsplash("photo-1554774853-b415df9eeb92"),
  goldBars: unsplash("photo-1610375461369-d613b564f4c4"),
  bitcoinCoin: unsplash("photo-1518546305927-5a555bb7020d"),
  studentsLearning: unsplash("photo-1523240795612-9a054b0db644"),
  tradingClassroom: unsplash("photo-1524178232363-1fb2b075b655"),
  businessMeeting: unsplash("photo-1600880292203-757bb62b4baf"),
  modernOffice: unsplash("photo-1497366216548-37526070297c"),
  multipleMonitors: unsplash("photo-1621570074241-0a3a0f1b8a0e"),
  professionalTrader: unsplash("photo-1573497620053-ea5300f94f21"),
  mentorKripson: unsplash("photo-1560250097-0b93528c311a"),
  mentorSelva: unsplash("photo-1519085360753-af0119f7cbe7"),
  aboutTeam: unsplash("photo-1556761175-5973dc0f32e7"),
  courseBeginner: unsplash("photo-1553729459-efe14ef6055d"),
  courseAdvanced: unsplash("photo-1460925895917-afdab827c52f"),
  vipCommunity: unsplash("photo-1552664730-d307ca884978"),
  copyTrading: unsplash("photo-1611262588024-d12430b98920"),
  brokerSupport: unsplash("photo-1450101499163-c8848c66ca85"),
  contactOffice: unsplash("photo-1497366811353-6870744d04b2"),
  blogChart1: unsplash("photo-1508385082359-f38ae991e8f2"),
  blogChart2: unsplash("photo-1543286386-713bdd548da4"),
  blogChart3: unsplash("photo-1526304640581-d334cdbbf45e"),
};
