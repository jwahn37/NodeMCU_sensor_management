// ESP8266 DS18B20 ArduinoIDE Thingspeak IoT Example code
// http://vaasa.hacklab.fi
//
// https://github.com/milesburton/Arduino-Temperature-Control-Library
// https://gist.github.com/jeje/57091acf138a92c4176a


#include <OneWire.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS D4


const char* host = "api.thingspeak.com"; // Your domain  
const char* server = "163.239.78.88";
String ApiKey = "0FUUWVU8GIFNKYEU";
String path = "/update?key=" + ApiKey + "&field1=";  
String serverPath = "/data?temperature=";

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature DS18B20(&oneWire);

const char* ssid = "LASS-2.4GHz";
const char* pass = "soganglass";


char temperatureString[6];

void setup(void){
  Serial.begin(115200);
  Serial.println("");
  
  WiFi.begin(ssid, pass);
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  DS18B20.begin();
   

}

float getTemperature() {
  float temp;
  
  DS18B20.requestTemperatures(); 
  temp = DS18B20.getTempCByIndex(0);
  //delay(100);
  
  return temp;
}


void loop() {

  float temperature = getTemperature();

  dtostrf(temperature, 2, 2, temperatureString);
  // send temperature to the serial console
  Serial.println(temperatureString);

  WiFiClient client;
  WiFiClient client2;
 
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  const int serverPort=8000;
  if (!client2.connect(server, serverPort)) {
    Serial.println("connection failed");
    return;
  }

  
  client.print(String("GET ") + path + temperatureString + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: keep-alive\r\n\r\n");

  client2.print(String("GET ") + serverPath + temperatureString + " HTTP/1.1\r\n" +
               "Host: " + server + "\r\n" + 
               "Connection: keep-alive\r\n\r\n");

  
  delay(60000);

}
