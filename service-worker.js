/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["2016/03/29/wheniwasyoung/index.html","a88fc4d1a546ef466418f81c63a50568"],["2018/02/27/mnist-mlp/index.html","3c211bf080ec69603443d0f0edccdf24"],["2018/02/28/mnist-cnn/index.html","c706e7900dd23f57f9c7a8124125d60a"],["2018/03/04/cifar10-cnn/index.html","febc532cd5858b091dc0087bd548163a"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","0dae08833681d21310bfafa612fdca35"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","3da30e2dfa33bec833e17c8f46d12818"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","56273161e16af0eb0abd452974c47235"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","5fbd8c06a6ecd3e2a0e3db94928fad2b"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","8d259337ec6750fecbda843d45fe490f"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","a2abc4a8789ac7157b2a833077997823"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","acfb5279556957bbd0f26207bb967c87"],["2018/11/28/dropout/index.html","21f647713aeb193893b446c4481b7b63"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","5ff8c60c63cddad4aa1db8d0ddac834b"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","daf7cf0d89e05be5cb4d72a97b3a3b5a"],["2019/02/17/PRML/index.html","37fb210ecd54819ccfe59eef62997abe"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","a2cf214f7c847e4a84d02fed3b7e52ff"],["2019/03/09/MLExplainbility-1/index.html","7816ee04e996e24dfdd9f3e1e2c1fe38"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","e1979fd783636ba0bae948c5be1a237c"],["2019/03/18/XML解析简介/index.html","d0e018357a3254ecf6064c1d688bf654"],["2019/03/19/MLExplainbility-3/index.html","5c3211411bd805d5c37ee33e25d41ed0"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","5dba93d5b474dcb3e0a806c68ffae4b2"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","e09e12c436e60b2df5061654891ab68e"],["2019/04/10/dlenvwithconda/index.html","9b5ac66afe53c9b393b5233a6ffe5773"],["2019/04/10/torch1/index.html","2726892d01a0b0aa934bf4101aff9c09"],["2019/04/10/torch2/index.html","2ab513ca47d9d3ad91711eb9be8c0b30"],["2019/04/11/torch3/index.html","140f3f9437b47c0365bc6f74f8ebbb9c"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","1a368d2ce4e1a024af3c423e55d1b922"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","ed67be5dccfce5ab30d688959716720f"],["2019/05/06/decisiontree/index.html","5904e7680813420f51b0e6fe3e7c197d"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","21980ee95478ccdc1362495fc99ef146"],["2019/11/13/domainchange/index.html","edc70dd100b79a8713f98b9301f49529"],["2019/11/25/pycharm-import-error/index.html","e2f39d2a8e64b698d94b4bc1b98c5430"],["archives/2016/03/index.html","3bc48344b48a7da89bb5b918df25c10a"],["archives/2016/index.html","3bc48344b48a7da89bb5b918df25c10a"],["archives/2018/02/index.html","a09db1128fc90709c87d30750cf1bb70"],["archives/2018/03/index.html","489cd422d8ad65b85a852ee3bf71c0ef"],["archives/2018/05/index.html","9e9fa876b6c6e3460f96f0d5f601931e"],["archives/2018/08/index.html","a35f38000af041208ac2f94c1bf7132d"],["archives/2018/09/index.html","69b6201eef8b2d72dd65a907c4f3fc29"],["archives/2018/11/index.html","f5b49a3799d110d925d13a638cb4268d"],["archives/2018/12/index.html","6326cf848bc026f7f56b9f8c28dbb918"],["archives/2018/index.html","c96fff50345ff6ff4f3e045b82e3fc14"],["archives/2018/page/2/index.html","835d63a143920e3a0ab37b9e10d39589"],["archives/2019/02/index.html","d2c775f3d2680b74f993f0977bcbe829"],["archives/2019/03/index.html","47df46c44473d45a1d3d140dd292d4e0"],["archives/2019/04/index.html","f10113f4a33a64a082ce19d1aa5654ff"],["archives/2019/05/index.html","ba37e7a4ec90e30d2a89348a430064c2"],["archives/2019/10/index.html","df25522d4664bb6fc5ea0c0cf1e2b69c"],["archives/2019/11/index.html","b5d412a4fd2a828a7cebc5a16e0d2b56"],["archives/2019/index.html","7f1bf9d6868db213d9cf374edfa2321f"],["archives/2019/page/2/index.html","41bbd61651eee292adf79c11f0cb6f96"],["archives/index.html","60c82f1b531f1bf85612ac4f7292c023"],["archives/page/2/index.html","350395ff7d0ec6257ee6d4982901e99e"],["archives/page/3/index.html","86e2c4bf43809ac34852ce7f9a116b79"],["archives/page/4/index.html","31ef01bcd1853c24e7e650c52178024e"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/bg.png","5b948093c3931a073c8c9284a1a4726f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","21f01c0a099a4ec9ed5e85a133097248"],["categories/代码/index.html","78207599c36d54b8eb5d190b29eabfab"],["categories/技术/index.html","5d8a392120509be0c4adfd23a0f6b6a8"],["categories/技术/page/2/index.html","2e6413849e1db3282687092ba2099585"],["categories/技术/page/3/index.html","9880e0f63cd552dc16531c2738e9e6bb"],["categories/算法/index.html","ce8a9542e4b84cdc3a85fb947c29e4b8"],["categories/记录/index.html","03566ab2c1462a8a5f5953a0f2a22d75"],["categories/论文/index.html","130024bb1c4be7834c3bf2fc861314dc"],["css/font.css","b3790545e350da62aabc1e0aa923532e"],["css/highlight.css","1d5f8596d50c657e7a3899afc8089ac6"],["css/noise.css","16d42709e9616e0f1b4a9e640e1e71e0"],["css/normalize.css","b9644b9ff2a89b7440cfba7a050ee468"],["googleb98281c0779d5d3c.html","b3834c339ea3568e013cd05da0ef4bbc"],["index.html","6870df7589bca66885b0ee47d262d27a"],["js/noise.js","18f4ec1f772e5b9861c557902f75c8bf"],["page/2/index.html","b0e371b806de15c501e50e63d6ddbee1"],["page/3/index.html","b95a5e2f72eda0a5362add9fd3ce1bba"],["page/4/index.html","351b360356f27a51b33a2610c608d24a"],["tags/Android/index.html","53c6e9837bee6ec17410bab91defb6c5"],["tags/Keras/index.html","fc7d9f239f3a570d9c2aafcbae54a37b"],["tags/PyTorch/index.html","12b4a86acf62253411ceef6c5e69af74"],["tags/TensorFlow/index.html","a437c7697b4fb8d2c70d55a55f9b73f2"],["tags/index.html","ec92dce21883747389dd168c29ee3231"],["tags/代码记录/index.html","7ab780c2fa58a7bef3791fed867025b1"],["tags/图像分割/index.html","47d71574a600c2d3c54b9258e5fedcbd"],["tags/基本概念/index.html","fdff99ce5f6a4ce236b72473d342f25b"],["tags/基本算法/index.html","a8342e8ed48fc6875a04105107935830"],["tags/数据扩充/index.html","77bc0eeecdf66b5105a352676c177ae1"],["tags/数据集/index.html","d7134cef31b788c2ebe27556c8f791dd"],["tags/日记/index.html","3f43276165be16a5cd295e0fbe646ebf"],["tags/机器学习/index.html","078891101fd49d579482cce2749b68d5"],["tags/深度学习/index.html","1778d7fe7b678615d3a9d82b85f0ac06"],["tags/目标检测/index.html","00ffe62a27a98a93be7ab8ab2bb43fe8"],["tags/神经网络/index.html","588f9daa1c45459e26d9ff5afd29c310"],["tags/组会分享/index.html","394524591e7292e4e2e15c7203101401"],["tags/行为识别/index.html","6d03dbe46eb7f4e0b8172894d4a44ad7"],["tags/论文阅读/index.html","4608e0bf8bed3abb7171cbc33d3d6ff1"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







