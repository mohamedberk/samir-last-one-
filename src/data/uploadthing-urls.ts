import { GalleryItem } from '@/types/activity';

interface ExtrasImages {
  camelRide: string;
  quad: string;
  dinner: string;
  sunset: string;
  hiking: string;
  seafood: string;
  mule: string;
  studio: string;
  cooking: string;
  boat: string;
  desert: string;
  medina: string;
  waterfall: string;
  kasbah: string;
  beach: string;
  mosque: string;
}

// Simplify the gallery items to just have url and type
export type SimpleGalleryItem = {
  url: string;
  type: 'image' | 'video';
};

export const uploadthingUrls = {
  // Hero Section
  heroVideo: {
    url: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1741100728/Pinterest_Video_Downloader_gkpbix.mp4",
    type: 'video'
  },
  heroThumbnail: "https://utfs.io/f/IfdYuWUiRNceZ0iXN79vSjfObBPeg0lNAI4y1cDEUWMTxJq2",

  // Morocco Hero Section Image
  moroccoDesertImage: "https://ik.imagekit.io/momh2323/ChatGPT%20Image%20May%2018,%202025,%2005_37_36%20PM.png?updatedAt=1747850046692",

  // Main Activity Images
  toubkal: "https://utfs.io/f/IfdYuWUiRNceMcPedX7wdbu5ZjpiHX4z28RIqDxYB0NLSaAW",
  chezAliShow: "https://utfs.io/f/IfdYuWUiRNcefM9mxb0K7gEYHG0TLrySNq4QuRCUsbVBzi6t",
  essaouira: "https://utfs.io/f/IfdYuWUiRNcepn0myqi83cQWaLvUAIzHnuZPbjmCls69tXVG",
  imlil: "https://utfs.io/f/IfdYuWUiRNcenSWzlSeZC7BqZOmFJUadlQroR98g64zxWbuY",
  ouarzazate: "https://utfs.io/f/IfdYuWUiRNceRd9EqpD0172FiWYpdq3mHJKAlBbSZIUrVfLn",
  ourika: "https://utfs.io/f/IfdYuWUiRNceRSsC0MD0172FiWYpdq3mHJKAlBbSZIUrVfLn",
  ouzoud: "https://utfs.io/f/IfdYuWUiRNceON1AHFPj6cwR3sxPU5GNE9AmlyXd0MezQuIq",
  agafay: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNce5C8s1rLFX9CuOBemqTiontrhPc1xV6ayLbjz",
  casablanca: "https://utfs.io/f/IfdYuWUiRNcerDeNJ0xLJRMHdZTF3BYSoIOsnh506wlNfXVc",
  imperialCities: "https://utfs.io/f/IfdYuWUiRNceXeinh4mepG4DY7WJK6VjwcoB8MALZgiOfkE2",
  merzouga: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceUlKCr8upAP9VfyrQEhJOBub32NHvceCqlTz4",
  hotAirBalloon: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceDNnCH8IKQNz7tEvTloSc03fb6OhM8q2I9XUg",
  agafayNight: "https://utfs.io/f/IfdYuWUiRNceP5ZU8tdLMvxHU7SwKuRhNBf14lqstVZinJPF",

  // Activity Galleries
  toubkalGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceMcPedX7wdbu5ZjpiHX4z28RIqDxYB0NLSaAW"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceIo6xBaUiRNceKonFAWIQZMk0fS56ydvahuGs"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce0vTTG1BFCToYhmQkAp8J17KZnRsBIabtvVjc"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceHJbWy0ALJT8GVs1nyWaRlxSQFk6BMbh0ENPg"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceW4qzCht5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceP8sm4PMdLMvxHU7SwKuRhNBf14lqstVZinJP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce8tE0FigUc5dkitehXJD2wT4qM01aboEIxy3N"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce9lNk5mSP1JQyDokChH7aZM4U3tSw5NRb0jYe"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceG1DgwQAcP04kWSLh8zXuaUx32Jp1tmAGQ5Od"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceDu386pFIKQNz7tEvTloSc03fb6OhM8q2I9XU"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce5JwNDrLFX9CuOBemqTiontrhPc1xV6ayLbjz"
    }
  ] as SimpleGalleryItem[],

  chezAliShowGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcefM9mxb0K7gEYHG0TLrySNq4QuRCUsbVBzi6t"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceBjZTXtJpztwZ2peIqQvaj9ouhNn1F8DEilbW"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceGCaBobcP04kWSLh8zXuaUx32Jp1tmAGQ5OdR"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceqOoS2ZnrEjPsN2lMSCnWothHLuGx47ia1qZU"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceyJMX7K1aovBLCIuYMf7R968ZKkqrbctiWT4N"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceS92HgdEj62pcNqItoJXPvZkDwgVYaFzx4GnE"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcectjSi3yxJ1kfTtcmnRsuojXw8iGPA27KvYlN"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceq9E0TKBnrEjPsN2lMSCnWothHLuGx47ia1qZ"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceQQZsOi2kC8ol0pLTxvzSbOAYeHqXJZaPEh3g"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceskPOYzRFHclKpGxJ4LhTgD1NM3OfXEzWSR72"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceAGi5Egah7tkq2V0e1xjCHQbUP4Z8XJocir6Y"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceWj8knzt5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce0CyXLWBFCToYhmQkAp8J17KZnRsBIabtvVjc"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcedghHBjdbBuGaSLKrAkl6HUPtTg9xYQfRjXWn"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceCN5trnWmRhAl1XNL0Ir4qd7J5gYQfbz2KHaF"
    }
  ] as SimpleGalleryItem[],

  imperialCitiesGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceErSeU1VvJOGtb0ByT3Fogfs8DIULM4pnZ6KP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceXeinh4mepG4DY7WJK6VjwcoB8MALZgiOfkE2"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceokEZcUf1vfQJAxHqtuFw4EVkzamZCW6RBUyi"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcewyv6pJ6GCqMh4UbTOg68710XfYyBoLNcK3dk"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcez6aPCQCXJEAfw09hVy87BOud3CrbqaveQT2t"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceUZ4OU9upAP9VfyrQEhJOBub32NHvceCqlTz4"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceCSAdgVWmRhAl1XNL0Ir4qd7J5gYQfbz2KHaF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcerDeNJ0xLJRMHdZTF3BYSoIOsnh506wlNfXVc"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceB9aAwBpztwZ2peIqQvaj9ouhNn1F8DEilbWy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceQdidb92kC8ol0pLTxvzSbOAYeHqXJZaPEh3g"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceahfnHOqgVuSyaWmBL139QY65ftEXbh0wcFT8"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceyVAUed1aovBLCIuYMf7R968ZKkqrbctiWT4N"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceOAhuYZPj6cwR3sxPU5GNE9AmlyXd0MezQuIq"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceCOtS0zbWmRhAl1XNL0Ir4qd7J5gYQfbz2KHa"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcegl3OyrhUfBFj8AvZ1Q3tGzse5c0k6xMrlyuH"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcer4PSKpxLJRMHdZTF3BYSoIOsnh506wlNfXVc"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceGe0m4HcP04kWSLh8zXuaUx32Jp1tmAGQ5OdR"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceCOP5CChWmRhAl1XNL0Ir4qd7J5gYQfbz2KHa"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceect8OHXwNd7zCnkMRamGQPUDp3hLjyc0vogu"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcetdgoCd0Of9XZ8EOy1x0jJblz3eWUHd2iBpro"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcerHmPmSxLJRMHdZTF3BYSoIOsnh506wlNfXVc"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceBXBGrWpztwZ2peIqQvaj9ouhNn1F8DEilbWy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceWbHxp6t5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce53oKmkfLFX9CuOBemqTiontrhPc1xV6ayLbj"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceHwOrgIALJT8GVs1nyWaRlxSQFk6BMbh0ENPg"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceWPWB18t5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceCOOGKRLWmRhAl1XNL0Ir4qd7J5gYQfbz2KHa"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceUwJG3FupAP9VfyrQEhJOBub32NHvceCqlTz4"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceOG7hLUPj6cwR3sxPU5GNE9AmlyXd0MezQuIq"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceiIYZyojtKSV8Q759pCnPOWgM6uBzxTvJwcqE"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceKTl22aeldEaitIWgf2FLJC0HZVuzMhNp7XQB"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcevS6YIWs84ePtN19R2CM6acIyExph0XrdHJzY"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceP850Tt3dLMvxHU7SwKuRhNBf14lqstVZinJP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcemaeEd76oxtOPeuDyb9kMnfU3ShVXKJLT1wF6"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce0iKpWRNBFCToYhmQkAp8J17KZnRsBIabtvVj"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceMyY69twdbu5ZjpiHX4z28RIqDxYB0NLSaAWs"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcelmagRszZ9cJqPM4R7tC1oU3Q0DXs8EBVfdwT"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcejDPlCOTcRyzrnWv1oseTKCmP50DJgStBif7L"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcevWdiIgs84ePtN19R2CM6acIyExph0XrdHJzY"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce9VCl8w1SP1JQyDokChH7aZM4U3tSw5NRb0jY"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceBjKvwo0pztwZ2peIqQvaj9ouhNn1F8DEilbW"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcei9piOxjtKSV8Q759pCnPOWgM6uBzxTvJwcqE"
    }
  ] as SimpleGalleryItem[],

  essaouiraGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcepn0myqi83cQWaLvUAIzHnuZPbjmCls69tXVG"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceuDHFsMQzVDvoQuG9CwIX0H5ZeMSRWKtPAgLF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceMyYParwdbu5ZjpiHX4z28RIqDxYB0NLSaAWs"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce84oLm3gUc5dkitehXJD2wT4qM01aboEIxy3N"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcetjFeloOf9XZ8EOy1x0jJblz3eWUHd2iBproN"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceldUYoDzZ9cJqPM4R7tC1oU3Q0DXs8EBVfdwT"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcenjHNwmZC7BqZOmFJUadlQroR98g64zxWbuYA"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcewyslcqcGCqMh4UbTOg68710XfYyBoLNcK3dk"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce9VM9zjZSP1JQyDokChH7aZM4U3tSw5NRb0jY"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceyzG9ZI1aovBLCIuYMf7R968ZKkqrbctiWT4N"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceAXtOc7ah7tkq2V0e1xjCHQbUP4Z8XJocir6Y"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcevD3nwyws84ePtN19R2CM6acIyExph0XrdHJz"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceik5kMpjtKSV8Q759pCnPOWgM6uBzxTvJwcqE"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcetvhKYnOf9XZ8EOy1x0jJblz3eWUHd2iBproN"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceMaRCETwdbu5ZjpiHX4z28RIqDxYB0NLSaAWs"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceoUXdCSf1vfQJAxHqtuFw4EVkzamZCW6RBUyi"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceKAHruX4eldEaitIWgf2FLJC0HZVuzMhNp7XQ"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceP8srPfgdLMvxHU7SwKuRhNBf14lqstVZinJP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcePjCUvedLMvxHU7SwKuRhNBf14lqstVZinJPF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceDchFLKIKQNz7tEvTloSc03fb6OhM8q2I9XUg"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcei506GJjtKSV8Q759pCnPOWgM6uBzxTvJwcqE"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcemf0bcno6oxtOPeuDyb9kMnfU3ShVXKJLT1wF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcegSgVGWhUfBFj8AvZ1Q3tGzse5c0k6xMrlyuH"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce1DZ4fJCJ2aCc8RtjiNPZhXfsTlkMQgSHwnL6"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce1tgyJ6WCJ2aCc8RtjiNPZhXfsTlkMQgSHwnL"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceMcspTFCwdbu5ZjpiHX4z28RIqDxYB0NLSaAW"
    }
  ] as SimpleGalleryItem[],

  ouarzazateGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcedU28t1bBuGaSLKrAkl6HUPtTg9xYQfRjXWn3"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceQ7q4s42kC8ol0pLTxvzSbOAYeHqXJZaPEh3g"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceRd9EqpD0172FiWYpdq3mHJKAlBbSZIUrVfLn"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcedUuCn9bBuGaSLKrAkl6HUPtTg9xYQfRjXWn3"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcesozL7XRFHclKpGxJ4LhTgD1NM3OfXEzWSR72"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce1sabASCJ2aCc8RtjiNPZhXfsTlkMQgSHwnL6"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceKAAR0izeldEaitIWgf2FLJC0HZVuzMhNp7XQ"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceTseliMKIARL1ZC78MHDJWYQdt0geUfrhxzO2"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceMl9SFqwdbu5ZjpiHX4z28RIqDxYB0NLSaAWs"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceX36YpcmepG4DY7WJK6VjwcoB8MALZgiOfkE2"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcehRs1jWJvXT2svNDxauk34SzblRUBVoHAiftE"
    }
  ] as SimpleGalleryItem[],

  imlilGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcewNeAqUGCqMh4UbTOg68710XfYyBoLNcK3dkH"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcepDDC43i83cQWaLvUAIzHnuZPbjmCls69tXVG"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcenSWzlSeZC7BqZOmFJUadlQroR98g64zxWbuY"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceHZuHduALJT8GVs1nyWaRlxSQFk6BMbh0ENPg"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcePlvAk9dLMvxHU7SwKuRhNBf14lqstVZinJPF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceBj9EKNvpztwZ2peIqQvaj9ouhNn1F8DEilbW"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcenJaMTlZC7BqZOmFJUadlQroR98g64zxWbuYA"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNces2UXywRFHclKpGxJ4LhTgD1NM3OfXEzWSR72"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcexAk3AtlgbA2xdFCGi9wOVSvyjlTa7encozsQ"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceEt242HVvJOGtb0ByT3Fogfs8DIULM4pnZ6KP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcepTZUZLmi83cQWaLvUAIzHnuZPbjmCls69tXV"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcenmUL0VZC7BqZOmFJUadlQroR98g64zxWbuYA"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceWncOFjt5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    }
  ] as SimpleGalleryItem[],

  ourikaGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcehnMW2dvXT2svNDxauk34SzblRUBVoHAiftEP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceChttlRWmRhAl1XNL0Ir4qd7J5gYQfbz2KHaF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceBUYR8XpztwZ2peIqQvaj9ouhNn1F8DEilbWy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceRSsC0MD0172FiWYpdq3mHJKAlBbSZIUrVfLn"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceWPILjDlt5rWkBeGzOVM72TluSLvH9cRDhFmJ"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceXzVKxAmepG4DY7WJK6VjwcoB8MALZgiOfkE2"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceXMbASFmepG4DY7WJK6VjwcoB8MALZgiOfkE2"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceG1IXIb0cP04kWSLh8zXuaUx32Jp1tmAGQ5Od"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceayyTHnqgVuSyaWmBL139QY65ftEXbh0wcFT8"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcesbQAsgRFHclKpGxJ4LhTgD1NM3OfXEzWSR72"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcegKH13ChUfBFj8AvZ1Q3tGzse5c0k6xMrlyuH"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcemuNOYB6oxtOPeuDyb9kMnfU3ShVXKJLT1wF6"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceP8NFD6IdLMvxHU7SwKuRhNBf14lqstVZinJP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceK0M7jmeldEaitIWgf2FLJC0HZVuzMhNp7XQB"
    }
  ] as SimpleGalleryItem[],

  ouzoudGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceIVXs4cUiRNceKonFAWIQZMk0fS56ydvahuGs"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcea438FwqgVuSyaWmBL139QY65ftEXbh0wcFT8"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceuUHsBcQzVDvoQuG9CwIX0H5ZeMSRWKtPAgLF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce2fPQOk5zS3lDZebJEvmKFCdcRW7rifXtjYwk"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceON1AHFPj6cwR3sxPU5GNE9AmlyXd0MezQuIq"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcewlLHN7GCqMh4UbTOg68710XfYyBoLNcK3dkH"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceIYxFgUiRNceKonFAWIQZMk0fS56ydvahuGsX"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce1tvxa6pCJ2aCc8RtjiNPZhXfsTlkMQgSHwnL"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcecC1VPOSyxJ1kfTtcmnRsuojXw8iGPA27KvYl"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceBQU4gTpztwZ2peIqQvaj9ouhNn1F8DEilbWy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceeyF8lcHXwNd7zCnkMRamGQPUDp3hLjyc0vog"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcetij8HKOf9XZ8EOy1x0jJblz3eWUHd2iBproN"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcebS3o0t8eySjlgocLkxTH2sZfDtqa7Y0CzIEr"
    }
  ] as SimpleGalleryItem[],

  agafayGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce5SFSi3LFX9CuOBemqTiontrhPc1xV6ayLbjz"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceWYvZW9t5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce8xnXdlgUc5dkitehXJD2wT4qM01aboEIxy3N"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceoHEXvlf1vfQJAxHqtuFw4EVkzamZCW6RBUyi"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcetY1lXAOf9XZ8EOy1x0jJblz3eWUHd2iBproN"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceyWdBRea1aovBLCIuYMf7R968ZKkqrbctiWT4"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce1UvnLgCJ2aCc8RtjiNPZhXfsTlkMQgSHwnL6"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceavEx2IqgVuSyaWmBL139QY65ftEXbh0wcFT8"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceojbgbdf1vfQJAxHqtuFw4EVkzamZCW6RBUyi"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcepTHW94Mi83cQWaLvUAIzHnuZPbjmCls69tXV"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceKjD9DweldEaitIWgf2FLJC0HZVuzMhNp7XQB"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceyfAZk61aovBLCIuYMf7R968ZKkqrbctiWT4N"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcec6Y1qHyxJ1kfTtcmnRsuojXw8iGPA27KvYlN"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNce1HYOV1CJ2aCc8RtjiNPZhXfsTlkMQgSHwnL6"
    }
  ] as SimpleGalleryItem[],

  // Extra Activity Images
  extras: {
    camelRide: "https://utfs.io/f/IfdYuWUiRNcepn0myqi83cQWaLvUAIzHnuZPbjmCls69tXVG",
    quad: "https://utfs.io/f/IfdYuWUiRNceZJQ2NG9vSjfObBPeg0lNAI4y1cDEUWMTxJq2",
    dinner: "https://utfs.io/f/IfdYuWUiRNcey5wRzK1aovBLCIuYMf7R968ZKkqrbctiWT4N",
    sunset: "https://utfs.io/f/IfdYuWUiRNce6GBNaEoBhXFPduA0VqWbO4rcQLoCw8vEmUg6",
    hiking: "https://utfs.io/f/IfdYuWUiRNceMcPedX7wdbu5ZjpiHX4z28RIqDxYB0NLSaAW",
    seafood: "https://utfs.io/f/IfdYuWUiRNcepn0myqi83cQWaLvUAIzHnuZPbjmCls69tXVG",
    mule: "https://utfs.io/f/IfdYuWUiRNceChttlRWmRhAl1XNL0Ir4qd7J5gYQfbz2KHaF",
    studio: "https://utfs.io/f/IfdYuWUiRNcey5wRzK1aovBLCIuYMf7R968ZKkqrbctiWT4N",
    cooking: "https://utfs.io/f/IfdYuWUiRNcehnMW2dvXT2svNDxauk34SzblRUBVoHAiftEP",
    boat: "https://utfs.io/f/IfdYuWUiRNcepn0myqi83cQWaLvUAIzHnuZPbjmCls69tXVG",
    desert: "https://utfs.io/f/IfdYuWUiRNceZJQ2NG9vSjfObBPeg0lNAI4y1cDEUWMTxJq2",
    medina: "https://utfs.io/f/IfdYuWUiRNcefM9mxb0K7gEYHG0TLrySNq4QuRCUsbVBzi6t",
    waterfall: "https://utfs.io/f/IfdYuWUiRNceON1AHFPj6cwR3sxPU5GNE9AmlyXd0MezQuIq",
    kasbah: "https://utfs.io/f/IfdYuWUiRNcedguzddUbBuGaSLKrAkl6HUPtTg9xYQfRjXWn",
    beach: "https://utfs.io/f/IfdYuWUiRNcepn0myqi83cQWaLvUAIzHnuZPbjmCls69tXVG",
    mosque: "https://utfs.io/f/IfdYuWUiRNceCSAdgVWmRhAl1XNL0Ir4qd7J5gYQfbz2KHaF"
  } as ExtrasImages,

  // Add Casablanca gallery
  casablancaGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceCSAdgVWmRhAl1XNL0Ir4qd7J5gYQfbz2KHaF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcerDeNJ0xLJRMHdZTF3BYSoIOsnh506wlNfXVc"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceB9aAwBpztwZ2peIqQvaj9ouhNn1F8DEilbWy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcedhP49VbBuGaSLKrAkl6HUPtTg9xYQfRjXWn3"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcevPdTdMs84ePtN19R2CM6acIyExph0XrdHJzY"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceOjiejfPj6cwR3sxPU5GNE9AmlyXd0MezQuIq"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce10g1aECJ2aCc8RtjiNPZhXfsTlkMQgSHwnL6"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceBjar42fpztwZ2peIqQvaj9ouhNn1F8DEilbW"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce8vhmMVVgUc5dkitehXJD2wT4qM01aboEIxy3"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcebwanwI8eySjlgocLkxTH2sZfDtqa7Y0CzIEr"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceQLLIqTP2kC8ol0pLTxvzSbOAYeHqXJZaPEh3"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceONtzV2Pj6cwR3sxPU5GNE9AmlyXd0MezQuIq"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceG1DYpIIcP04kWSLh8zXuaUx32Jp1tmAGQ5Od"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceW3MwC7t5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    }
  ] as SimpleGalleryItem[],

  merzougaGallery: [
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceCD5b7QWmRhAl1XNL0Ir4qd7J5gYQfbz2KHaF"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcetGnmx2Of9XZ8EOy1x0jJblz3eWUHd2iBproN"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceeS6AGKHXwNd7zCnkMRamGQPUDp3hLjyc0vog"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceyWdELeV1aovBLCIuYMf7R968ZKkqrbctiWT4"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcej0ckCTcRyzrnWv1oseTKCmP50DJgStBif7La"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcetz42NOf9XZ8EOy1x0jJblz3eWUHd2iBproNn"
    }
  ] as SimpleGalleryItem[],

  hotAirBalloonGallery: [
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceiKTgc2tjtKSV8Q759pCnPOWgM6uBzxTvJwcq"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceTTamNvKIARL1ZC78MHDJWYQdt0geUfrhxzO2"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNce1jpWtjCJ2aCc8RtjiNPZhXfsTlkMQgSHwnL6"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcea38AS0qgVuSyaWmBL139QY65ftEXbh0wcFT8"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceQiVxAq2kC8ol0pLTxvzSbOAYeHqXJZaPEh3g"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceccAoiwyxJ1kfTtcmnRsuojXw8iGPA27KvYlN"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceHV6us1ALJT8GVs1nyWaRlxSQFk6BMbh0ENPg"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcePeVlYzdLMvxHU7SwKuRhNBf14lqstVZinJPF"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceQ0qTo52kC8ol0pLTxvzSbOAYeHqXJZaPEh3g"
    }
  ] as SimpleGalleryItem[],

  agafayNightGallery: [
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceG7S49qcP04kWSLh8zXuaUx32Jp1tmAGQ5OdR"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceP5ZU8tdLMvxHU7SwKuRhNBf14lqstVZinJPF"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNceW52X4Wt5rWkBeGzOVM72TluSLvH9cRDhFmJy"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNce0iHbHATBFCToYhmQkAp8J17KZnRsBIabtvVj"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNcestqGlARFHclKpGxJ4LhTgD1NM3OfXEzWSR72"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNce5mOSrKLFX9CuOBemqTiontrhPc1xV6ayLbjz"
    },
    {
      type: 'image',
      url: "https://k1yeaaumim.ufs.sh/f/IfdYuWUiRNceE8qWXgVvJOGtb0ByT3Fogfs8DIULM4pnZ6KP"
    },
    {
      type: 'image',
      url: "https://utfs.io/f/IfdYuWUiRNcemf9oHB6oxtOPeuDyb9kMnfU3ShVXKJLT1wF6"
    }
  ] as SimpleGalleryItem[],
} as const; 
