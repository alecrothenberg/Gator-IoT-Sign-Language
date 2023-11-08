#include "secrets.h"
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"

//gpio 17 to gpio 5. 16 to 4
#include <LiquidCrystal.h>
#include <SPI.h>
#include <RH_NRF24.h>
#define CE 4
#define CSN 5
// Singleton instance of the radio driver
RH_NRF24 nrf24(CE,CSN);
 
// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(19, 23, 18, 5, 4, 15);

// The MQTT topics that this device should publish/subscribe (can be changed)
#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp32/sub"

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

   Serial.println("Connecting to Wi-Fi");
  
  // try to connect to wifi 30 times
  int retries = 0;
  int max_retries = 30; 
  while (WiFi.status() != WL_CONNECTED && retries < max_retries){
    delay(500);
    Serial.print(".");
    retries++;
  }

  // Check if connected successfully
  if(WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected to Wi-Fi");
    Serial.println(WIFI_SSID);
  } else {
    Serial.println("Failed to connect to Wi-Fi. Please check your credentials or connection.");
    return; // Exit if failed to connect after retries
  }

  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  // Create a message handler
  client.onMessage(messageHandler);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }

  if(!client.connected()){
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");

  Serial.begin(9600);
  while (!Serial) 
    ; // wait for serial port to connect. Needed for Leonardo only
  if (!nrf24.init())
    Serial.println("init failed");
  // Defaults after init are 2.402 GHz (channel 2), 2Mbps, 0dBm
  if (!nrf24.setChannel(1))
    Serial.println("setChannel failed");
  if (!nrf24.setRF(RH_NRF24::DataRate2Mbps, RH_NRF24::TransmitPower0dBm))
    Serial.println("setRF failed");  
}

void publishMessage()
{
  StaticJsonDocument<200> doc;
  doc["time"] = millis();
  doc["message"] = "Hello from ESP32"; // Add the message field

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);

  lcd.print("Sent from esp32");
  delay(1000);
  lcd.clear();
}

void messageHandler(String &topic, String &payload) {
  Serial.println("incoming: " + topic + " - " + payload);

  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  // Print a message to the LCD.
  lcd.print(payload);
  delay(1000);
  lcd.clear();

  // Serial.println("Sending to nrf24_server");
  // // Send a message to nrf24_server
  // uint8_t data[] = payload;
  // nrf24.send(data, sizeof(data));
  
  // nrf24.waitPacketSent();
  // // Now wait for a reply
  // uint8_t buf[RH_NRF24_MAX_MESSAGE_LEN];
  // uint8_t len = sizeof(buf);

  // if (nrf24.waitAvailableTimeout(500))
  // { 
  //   // Should be a reply message for us now   
  //   if (nrf24.recv(buf, &len))
  //   {
  //     Serial.print("got reply: ");
  //     Serial.println((char*)buf);
  //   }
  //   else
  //   {
  //     Serial.println("recv failed");
  //   }
  // }
  // else
  // {
  //   Serial.println("No reply, is nrf24_server running?");
  // }
  // delay(400);
}

void setup() {
  Serial.begin(9600);
  connectAWS();
}

void loop() {
  publishMessage();
  client.loop();
  delay(1000);
}