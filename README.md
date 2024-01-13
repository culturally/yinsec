# yinSec

This Chrome browser extension is designed to enhance user privacy by modifying outgoing HTTP request headers.

## Overview

This extension includes features such as cookie blocking, IP address simulation, and user agent customization to mitigate online tracking. 

## Features

### Cookie Handling: 
Blocks or replaces specific cookies in the Cookie header.
### Anti-tracking: 
Blocks known tracking cookies and sets their value to null.
### IP Spoofing Headers: 
Simulates a specific IP address by adding various headers.
### User Agent Customization: 
Sets predefined values for the user-agent, sec-ch-ua, and other headers.
### Dynamic Toggle: 
Enable or disable the extension on the fly for flexibility.

## Examples
- iplogger.org
  
![](https://github.com/culturally/yinsec/blob/main/examples/example.png)
- tracker.iplocation.net
  
![](https://github.com/culturally/yinsec/blob/main/examples/example1.png)

## Usage

1. Open Chrome and go to chrome://extensions/.
2. Enable "Developer mode" at the top right.
3. Click "Load unpacked" and select the extension folder.
4. The extension icon should appear in your browser toolbar.

## Note

- Some headers may be commented out due to reported bugs on certain websites. Exercise caution.
- The effectiveness of privacy measures may vary across websites.

## License

This project is licensed under the [GNU General Public License (GNU GPL)]([link-to-license-file](https://github.com/culturally/yinsec/blob/main/LICENSE)).

For details, please refer to the [LICENSE]([link-to-license-file](https://github.com/culturally/yinsec/blob/main/LICENSE)) file in the root directory of this project.
