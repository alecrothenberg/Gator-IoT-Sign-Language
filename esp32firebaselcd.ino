#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <WiFiClientSecure.h>
#include <Wire.h>
//gpio 17 to gpio 5. 16 to 4
#include <LiquidCrystal.h>
 
// initialize the library with the numbers of the interface pins
//LiquidCrystal lcd(32, 33, 25, 26, 27, 14); // RS, E, D4, D5, D6, D7
LiquidCrystal lcd(19, 23, 18, 5, 4, 15);

#define API_KEY "AIzaSyCWEZCtZENldlywpIOX-p-Q6rBe-DFaE_0"
#define DATABASE_URL "https://gator-iot-sign-language-default-rtdb.firebaseio.com/" // "https://esp32-rtdb-a30c8-default-rtdb.firebaseio.com/"
#define WIFI_SSID "2-2315@Canopy_apartments"
#define WIFI_PASSWORD "z2Hpyce5m"

const int freq = 5000;
const int resolution = 8;
int pwmValue = 0;

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

void Firebase_setup()
{
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", ""))
  {
    Serial.println("Signup OK");
    signupOK = true;
  }
  else 
  {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
    signupOK = false;
  }
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void WIFI_setup()
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void LCD_setup()
{
  lcd.begin(16, 2);
}

void setup() 
{
  Serial.begin(115200);
  WIFI_setup();
  Firebase_setup();
  LCD_setup();
}

void loop() 
{
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0))
  {
    if (Firebase.RTDB.getString(&fbdo, "Translation/translated_val")) // Changed to getString
    {
      if (fbdo.dataType() == "string") // Check if the data type is string
      {
        String value = fbdo.stringData();
        Serial.println("Successful READ from " + fbdo.dataPath() + ": " + value + " (" + fbdo.dataType() + ")");
        lcd.print(value);
      }
      else 
      {
        Serial.println("FAILED: " + fbdo.errorReason());
        delay(2000); // Delay to read the message
      }
    }
  }

  delay(1000);
  lcd.clear();
}