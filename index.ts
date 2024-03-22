import { Readable } from 'stream';
import { parse } from 'csv-parse';

(async () => {
  const topDomains = new Set<string>();

  const res = await fetch('https://radar.cloudflare.com/charts/LargerTopDomainsTable/attachment?id=1077&top=10000');
  const stream = Readable.fromWeb(res.body!).pipe(parse());
  for await (const [domain] of stream) {
    topDomains.add(domain);
    console.log(topDomains.size, domain);
  }
})();
