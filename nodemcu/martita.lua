-- WiFi
wifi.setmode(wifi.STATION)
wifi.sta.config("Bobby","bomSenso100pre")
wifi.sta.connect()
wifi.sta.setip({ip="192.168.1.100",netmask="255.255.255.0",gateway="192.168.1.1"})
print("Conexão realizada. IP: "..wifi.sta.getip())
        
-- Sensores
pin_dht = 1
url = 'https://martita-50f93.firebaseio.com/martita.json'
urlTempo = 'https://script.googleusercontent.com/macros/echo?user_content_key=mkrksmFhcVe_IF6Efbn_teJBpLrBUK15PfJ_XatOgRHBdkrlsbNf3jAqlBsLDy_8wEl1tXQ7MV1H215prqsqqwhDll56wsFqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-_IQDS8gp7-wwK7XAnp4CU0ajkDCYtjwe&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk'
content_type = 'Content-Type: application/json\r\n'

tempo = ''

if not tmr.alarm(0, 900000, tmr.ALARM_AUTO, function()
    http.get(urlTempo, nil, function(code, data)
        if (code < 0) then
            print("HTTP request failed")
        else
            status, temperatura, umidade = dht.read(pin_dht)
            valor_solo = adc.read(0)
            solo = (valor_solo - 1023) * (100 - 0) / (0 - 1023) + 0
            tm = rtctime.get()
            json = '{"temperatura":"'..temperatura..'", "umidade":'..umidade..', "solo":'..solo..', "tempo":'..data..'}'
            http.post(url, content_type, json,
            function(code, data)
                if (code < 0) then
                    print("HTTP request failed")
                else
                    print(code, data)
                end
            end)
        end
    end)
end)
then end
