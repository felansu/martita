Demo (Planta Camomila) https://martita-50f93.firebaseapp.com/#/dashboard

Monitoramento em tempo real de cultivo.
 
Foi utilizado o **Módulo WiFi ESP8266 NodeMcu** com sensor de umidade do solo, umidade e temperatura.
Também foi preciso gerar um firware personalizado com os componentes requeridos (dht, file, gpio, http, net, node, tmr, uart, wifi, tls).

Utilizei a linguágem de programação Lua e o IDE ESPlorer.

Detalhe, hoje a versão 2.0 do firmware não é estável e as requisições http estão bugadas (memory leak), tem que **usar a versão 1.5**.   