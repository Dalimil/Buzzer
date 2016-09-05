# Buzzer
Buzzer Ionic app

## Setup
	npm install -g cordova
	npm install -g ionic

	ionic platform add android
	cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
	cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git
	cd resources
	ionic resources --icon
	ionic resources --splash
	
## Run in browser
	ionic serve

## Run on Android device
	export ANDROID_HOME=/my/path/to/android/sdk
	ionic build android
	ionic run android