function map(x, in_min, in_max, out_min, out_max)
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
end

mytimer = tmr.create()
mytimer:register(10000, tmr.ALARM_AUTO, 
    function() 
        -- Sensores
        pin_dht = 1
        
        status, temperatura, umidade = dht.read(pin_dht)
        valor_solo = adc.read(0)
        solo = map(valor_solo , 1023, 0, 0, 100)
        
        if status == dht.ERROR_CHECKSUM then
            print( "DHT Checksum error." )
        elseif status == dht.ERROR_TIMEOUT then
            print( "DHT timed out." )
        end
        
        -- WiFi
        wifi.setmode(wifi.STATION)
        wifi.sta.config("Bobby","bomSenso100pre")
        wifi.sta.connect()
        wifi.sta.setip({ip="192.168.1.100",netmask="255.255.255.0",gateway="192.168.1.1"})
        print("Conexão realizada. IP: "..wifi.sta.getip())
        
        http.post('https://martita-50f93.firebaseio.com/martita.json',
          'Content-Type: application/json\r\n',
          '{"temperatura":"'..temperatura..'", "umidade":'..umidade..', "solo":'..solo..'}',
          function(code, data)
            if (code < 0) then
              print("HTTP request failed")
            else
              print(code, data)
            end
          end)
    end)
mytimer:start()