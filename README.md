# MMM-Airbar

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This allows you to use an affordable touch sensor called the [AirBar](https://air.bar) to provide touch activity to a Smart Mirror.

## How to use

1) Attach an [AirBar](https://air.bar) to your Raspbery Pi. I've had luck with the with the windows version.  I do not work for AirBar and in no way guarantee this step will work.
2) In the module you would like to work with AirBar implement:

notificationReceived: function(notification, payload, sender) {
    if(notification == "AIRBARHELPER_INPUT") {
        // action you would like to have happen
    }
}

_____

I have not currently published any module that use this compatibility, but it is easy to fork an existing module or to build it into a new app.  If you add the functionality to an existing app let me know and I'll link it here.

It supports the following inputs:
motion = "up", "down" "right", "left", "touch", "double_touch", "hold"

Additionally the notification reports the start and end coridnates so you can interpret input yourself.  The key for those fields are:
"startX", "startY", "endX", "endY"

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
			module: "MMM-AirbarHelper",
			config: {
				barPosition: 'top',
                debugMode: false
			}
		}
    ]
}
```



## Configuration options

| Option           | Description
|----------------- |-----------
| `barPosition`        | *Optional* Describes the orientation the bar is positioned as described when facing the mirror.  Options include: "bottom", "top", "left", "right"
| `debugMode`        | *Optional* If true it displays the last input on the top left.  Options include: true, false
