-- WiFi
wifi.setmode(wifi.STATION)
wifi.sta.config("Bobby","bomSenso100pre")
wifi.sta.connect()
wifi.sta.setip({ip="192.168.1.100",netmask="255.255.255.0",gateway="192.168.1.1"})
print("Conexão realizada. IP: "..wifi.sta.getip())
        
-- Sensores
pin_dht = 1
url = 'https://martita-50f93.firebaseio.com/martita.json'
content_type = 'Content-Type: application/json\r\n'
    
if not tmr.alarm(0, 60000, tmr.ALARM_AUTO, function()
    status, temperatura, umidade = dht.read(pin_dht)
    valor_solo = adc.read(0)
    solo = (valor_solo - 1023) * (100 - 0) / (0 - 1023) + 0
    json = '{"temperatura":"'..temperatura..'", "umidade":'..umidade..', "solo":'..solo..'}'
    http.post(url, content_type, json,
    function(code, data)
        if (code < 0) then
            print("HTTP request failed")
        else
            print(code, data)
        end
    end)
end)
then end