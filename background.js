let extensionEnabled = true; 

chrome.storage.sync.get('extensionEnabled', function(data) {
  extensionEnabled = data.extensionEnabled !== false;
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if (extensionEnabled) {
		
	  var cookiesToSet = {
      '_lang': 'us',
      '__gpi': 'null',
	  '__gads': 'null',
	  '__utma': 'null',
	  '__utmb': 'null', //Google tracking cookie
	  '__utmc': 'null', //Google tracking cookie
	  '__utmt': 'null', //Google tracking cookie
	  '__utmz': 'null', //Google tracking cookie
	  '_ga': 'null', //Google tracking cookie
	  'datr': 'null', //Facebook tracking cookie
	  'personalization_id': 'null', //Twitter tracking cookie
	  'guest_id': 'null', //Twitter tracking cookie
	  's_cc': 'null', //Adobe tracking cookie
	  's_sq': 'null', //Adobe tracking cookie
	  's_vi': 'null', //Adobe tracking cookie
	  'UserMatchHistory': 'null', //LinkedIn  tracking cookie
	  'bcookie': 'null', //LinkedIn  tracking cookie
	  'lidc': 'null', //LinkedIn  tracking cookie
	  'clhf03028ja': '133.7.66.6', // iplogger.org cookie for ip address
      // Add more cookies as needed
    };


    details.requestHeaders = details.requestHeaders.map(header => {
      if (header.name.toLowerCase() === 'cookie') {
        // Split the Cookie header into individual cookies
        var cookies = header.value.split('; ');
        var cookieMap = {};

        // Map each cookie to its value
        cookies.forEach(cookie => {
          var parts = cookie.split('=');
          cookieMap[parts[0]] = parts[1];
        });

        // Set or overwrite cookies
        Object.keys(cookiesToSet).forEach(name => {
          cookieMap[name] = cookiesToSet[name];
        });

        // Rebuild the Cookie header value
        header.value = Object.entries(cookieMap).map(([name, value]) => `${name}=${value}`).join('; ');
      }
      return header;
    });

    // If no Cookie header exists, add a new header with all cookies
    if (!details.requestHeaders.some(header => header.name.toLowerCase() === 'cookie')) {
      var cookieHeader = Object.entries(cookiesToSet).map(([name, value]) => `${name}=${value}`).join('; ');
      details.requestHeaders.push({name: 'Cookie', value: cookieHeader});
    }
	   
      details.requestHeaders.push( 
        { name: 'X-Originating-IP', value: '1.1.1.1' },
        { name: 'X-Forwarded-For', value: '1.1.1.1' },
        { name: 'X-Remote-IP', value: '1.1.1.1' },
        { name: 'X-Remote-Addr', value: '1.1.1.1' },
        { name: 'X-Client-IP', value: '1.1.1.1' },
        { name: 'X-Host', value: '1.1.1.1' },
        { name: 'X-Forwarded-Host', value: '1.1.1.1' },
        { name: 'X-Forwarded-For', value: '1.1.1.1' },
        { name: 'user-agent', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36' },
        { name: 'sec-ch-ua', value: 'Mozilla";v="116.0.5845.111", "Chromium";v="98' },
		//{ name: 'referer', value: 'https://google.com/' }, is very buggy on certain websites
        { name: 'DNT', value: '1' },
        { name: 'Accept-Language', value: 'en-US,en;q=0.5' },
        { name: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, max-age=0' },
        { name: 'Pragma', value: 'no-cache' },
		//{ name: 'origin', value: 'https://google.com/' }, is very buggy on certain websites
        //{ name: 'user-agents', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36' }
      );
    }

    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders", "extraHeaders"]
);


chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.extensionEnabled) {
    extensionEnabled = changes.extensionEnabled.newValue;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getEnabledState') {
    sendResponse({ enabled: extensionEnabled });
  } else if (request.action === 'toggleExtension') {
    const newEnabledState = !extensionEnabled;
    chrome.storage.sync.set({ extensionEnabled: newEnabledState });
    sendResponse(newEnabledState);
  }
});
