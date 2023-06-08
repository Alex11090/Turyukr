const ToursList = require("./Models/ToursList")
const Tour = require("./Models/TourDiscription")
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { default: axios } = require("axios");
// const tourDiscr = [];

module.exports = async () => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  let revisionInfo = await browserFetcher.download('884014');
  const toursItems = [];
  const tourDiscr = [];
  const browser = await puppeteer.launch({
    // executablePath: revisionInfo.executablePath,
    // args: ['--no-sandbox', "--disabled-setupid-sandbox"]
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto("https://vidviday.ua/?per_page=1000");
  await page.waitForSelector(".thumb");
  const html = await page.content();
  const $ = cheerio.load(html);
  console.log($.html());

  await browser.close();
  const selector = $;

  selector(".thumb").each(async function (i, element) {
    const link = selector(element).find(".thumb .full-size").attr("href");
    const img = selector(element).find(".thumb-img img").attr("src");
    const title = selector(element).find(".thumb-content .title").text();
    const timeTour = selector(element)
      .find(".thumb-content .thumb-info .thumb-info-time")
      .text();
    const freePlaces = selector(element)
      .find(".thumb-content .thumb-info .thumb-info-people")
      .text();
    const prise = selector(element).find(".thumb-content .thumb-price").text();

    toursItems.push({
      id: i + 1,
      link,
      img,
      title,
      timeTour,
      freePlaces,
      prise,
    });

    // console.log(toursItems);
  });
  let id = 1;
  for (let i = 0; i < toursItems.length; i++) {
    //console.log(toursItems[i].link);
    const getHTML = async (url) => {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    };
    // const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); //пауза
    const selector = await getHTML(toursItems[i].link);
    // await wait(5000); // чекаємо 5 секунд
    selector(".tour-content").each((i, element) => {
      const titleTour = selector(element).find(".title").text();
      const discrTuor = selector(element).find(".accordion-all-expand").html();
      //console.log(`заголовок : ${titletTour}  акордіон :  ${discrTuor}`);

      tourDiscr.push({
        id: id,
        titleTour,
        discrTuor,
      });
    });

    id++;
  }
  await Tour.deleteMany()
    .then(async () => {
      tourDiscr.forEach(async (tour) => {
        console.log(tour)
        let newTour = new Tour({
          id: tour.id,
          titleTour: tour.titleTour,
          discrTuor: tour.discrTuor,
          date: new Date()
        })
        await newTour.save()
          .then(
            console.log(`New discription created ${tour.titleTour}`)
          )
      })
    })
  //console.log(toursItems)
  await ToursList.deleteMany()
    .then(async () => {
      toursItems.forEach(async (tour) => {
        console.log(tour)
        let newTour = new ToursList(
          {
            id: tour.id,
            img: tour.img,
            title: tour.title,
            timeTour: tour.timeTour,
            freePlaces: tour.freePlaces,
            prise: parseInt(tour.prise.replace(/[^a-zA-Z0-9 ]/g, '')),
            date: new Date()
          }
        )
        await newTour.save()
          .then(
            () => console.log("New tours added")
          )
      })
    })
}