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

var precacheConfig = [["2016/03/29/wheniwasyoung/index.html","1f3602cf65ab641a748e9c12ec35b844"],["2018/02/27/mnist-mlp/index.html","268d773175128d41c86a5491dffcc49b"],["2018/02/28/mnist-cnn/index.html","98d12b9e0e7ec4d610731ddfbaef98a1"],["2018/03/04/cifar10-cnn/index.html","18c089711bf4282c0d419e47984c0d4e"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","a69741390ba9eefcffa26cf3d96a705c"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","f22fc1b4f9d73a9202d27261c858567f"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","589c60fc75ae703822c76831f237af65"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","e5dea2f42fd8f32357af6efb4c7ee868"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","f829d9090cf4f8f8d049bb6e08611024"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","4464db6e2ba4b0a6fa3f31015cdeab66"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","47b0a8690d34929c7cd26bcf202038aa"],["2018/11/28/dropout/index.html","20e7e0fc63aa60f9ee99838f52f70a88"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","7daf8e639e5e1ed5f6aa63ad9adcf454"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","680388ada78d859314fb289c5f465bce"],["2019/02/17/PRML/index.html","20721112ef1f9912a81c3f8dea2ccf83"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","b1b349405dbac3b795990d2ce9708f59"],["2019/03/09/MLExplainbility-1/index.html","8a9b9734d71e2fc58c6a49a9dec87d6b"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","8144de656cb303167626529a37f6edef"],["2019/03/18/XML解析简介/index.html","59b1c4afb67689df3e763b298e48758b"],["2019/03/19/MLExplainbility-3/index.html","faf80893ae99bc749a8426ee59205c00"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","fe47abe0310a80f96a951f104e72763d"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","96732c532c290ad6939b8d0d9125815b"],["2019/04/10/dlenvwithconda/index.html","99576deebebc0b14a12846657d6bb201"],["2019/04/10/torch1/index.html","75853bf18515e0c9b8d2363b9d3ec3ca"],["2019/04/10/torch2/index.html","3ac04e8d873a954e77accaa4038e73ab"],["2019/04/11/torch3/index.html","6ab950645fe766508a365623006b2242"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","ad9aa38961dd3f907e105962804afeb5"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","46901afc2187c24efd835c6f79c07d07"],["2019/05/06/decisiontree/index.html","cff7d768e64d97b408fba0f2507dd9e7"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","29327e22f3d6b30e481c74395949c1ad"],["2019/11/25/pycharm-import-error/index.html","5474f773782efdcb84f3fb7583d73931"],["archives/2016/03/index.html","d5da047c62615f4ac189046bd946c150"],["archives/2016/index.html","d5da047c62615f4ac189046bd946c150"],["archives/2018/02/index.html","fd0b5107bee975f8529d4015055d84da"],["archives/2018/03/index.html","fe90eeda300ea7d84a44d6b9cfbb5f41"],["archives/2018/05/index.html","87454215264f7a0aac351d1be2b96b9d"],["archives/2018/08/index.html","df2147bacdb5d2eafe3e998811dba267"],["archives/2018/09/index.html","4077226eccf960c3be7e7156163c243c"],["archives/2018/11/index.html","693134dbe81bac38416a8b08e1488bb9"],["archives/2018/12/index.html","dbeafea61be60453ca80554f4f5159bc"],["archives/2018/index.html","16517bafe9adb4a97105acbe086dced4"],["archives/2018/page/2/index.html","1250ebddbaa7dee59c0c2f732320ce68"],["archives/2019/02/index.html","4e8fe8284f9b6585c674ab8b12a50f30"],["archives/2019/03/index.html","7f18eb5cfbc3b738a49bd317202c87ae"],["archives/2019/04/index.html","d8273627e973f86d571e579d3963082f"],["archives/2019/05/index.html","d982d1057660cfd80bec5e346caaed94"],["archives/2019/10/index.html","7941511e01387dd233bc0653ba24f36d"],["archives/2019/11/index.html","8a7edf580f4940aec2477cdb4c4c5053"],["archives/2019/index.html","cffae8f886bbc7719b3dc44407712f5c"],["archives/2019/page/2/index.html","53d9546ff1caf8d46013d69a5cc73967"],["archives/index.html","f19c742e31a5b0338152450027522d49"],["archives/page/2/index.html","835eb36c98131591a966acd644e84bb1"],["archives/page/3/index.html","dbd4700ac5cf4e46c4fbcf8a124cee49"],["archives/page/4/index.html","95ee92c5f6503cd4c18501737878e09b"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/bg.png","5b948093c3931a073c8c9284a1a4726f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","beae92eb46873edd661b0efaf7bbdba4"],["categories/代码/index.html","4f0e02c3a8b7f17ed5b70e478abe6aaa"],["categories/技术/index.html","94e6de7009563e50f14ba4589b8b9720"],["categories/技术/page/2/index.html","7b1a0f453490a05b4f149872f551dda6"],["categories/技术/page/3/index.html","9f6fc2c4a92722af0ce71f240bf697da"],["categories/算法/index.html","313f34f8283aa3ea89af12c26743d94f"],["categories/记录/index.html","386b11f2422d79ec4859564894fb0f50"],["categories/论文/index.html","c07d9cf9f3845f4fd39c6c7b94c9df91"],["css/font.css","b3790545e350da62aabc1e0aa923532e"],["css/highlight.css","1d5f8596d50c657e7a3899afc8089ac6"],["css/noise.css","16d42709e9616e0f1b4a9e640e1e71e0"],["css/normalize.css","b9644b9ff2a89b7440cfba7a050ee468"],["googleb98281c0779d5d3c.html","1161b4b2bca9fd8f3c7a865df965cc4f"],["index.html","83f5bc2b5c52515a8fea1211c7d34e13"],["js/noise.js","18f4ec1f772e5b9861c557902f75c8bf"],["page/2/index.html","8d8d22becc47e5f048505df367b8fdcb"],["page/3/index.html","b63fed79bfe6d3573020a7b6930d7113"],["page/4/index.html","947f70e4df9f1e79b34a8cbc872aacae"],["tags/Android/index.html","bd32f69ebbf053dfc0b6083ebfc44afc"],["tags/Keras/index.html","975fe5102c24a5bc034f9b988195f7dd"],["tags/PyTorch/index.html","2802b4836a1710758154b667262be5c5"],["tags/TensorFlow/index.html","4aa2ee86b3d02685251d86f21376999f"],["tags/index.html","b3b654642089a9bb91e11325b384c330"],["tags/代码记录/index.html","f886af8386db2c20c3f83ccb73f6eed4"],["tags/图像分割/index.html","24ddc176a49725fb33bb89b72e43b66a"],["tags/基本概念/index.html","141bead91ba605d3b7c703aee0031c9f"],["tags/基本算法/index.html","0e226e85dd8da22ed4098817e4613d49"],["tags/数据扩充/index.html","e043989d9f5d7e268701d165c834b784"],["tags/数据集/index.html","840a2a015d02306dd67c6039d9d4fc68"],["tags/日记/index.html","363bc40ee9e94677e03a02edd923fdbd"],["tags/机器学习/index.html","91a457e4152ce19257018af784350914"],["tags/深度学习/index.html","12a60d4e4cdf01275669e51ad818fdea"],["tags/目标检测/index.html","9ba5cffee1c9de46899a2a97c15c0c02"],["tags/神经网络/index.html","7198260eb2d1d438102136b59ee50c62"],["tags/组会分享/index.html","c2a0b9d2166ee2d8126f0f912d4f6dfa"],["tags/行为识别/index.html","86f9a364cac53015925a9348889f1953"],["tags/论文阅读/index.html","93a0cb79d2e8c50ec856a545000258d1"]];
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







