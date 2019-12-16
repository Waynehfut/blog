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

var precacheConfig = [["2018/02/27/mnist-mlp/index.html","041308a850d4762146a624ae209f1ee5"],["2018/02/28/mnist-cnn/index.html","2e747939abdecdb59eab5cda6a06ea82"],["2018/03/04/cifar10-cnn/index.html","09f6d43a0b1da71567f4cbdb616e9253"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","761f6551235bdd70c17e07dfbe07ca31"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","14079ec721b7174ead82b5c7123f8836"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","c3e4472b5953d8710656e1be3a6d6787"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","9cd2f1e0e404c3eb3d0cd34c42448f10"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","ff9e2c6d686b27493cb8345e38be43de"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","0786d1b021e3042ebafde80b2c337037"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","21967821f860ec62ccfed7377ba8b605"],["2018/11/28/dropout/index.html","e4ed7d4fa3dd3b41e93419d4f0c1c62d"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","1e9fe059709fca99e785d771a9a3e4f3"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","9368a0d69a3ed508c92ff3a842ada7d8"],["2019/02/17/PRML/index.html","4aed86ee1ac153dfbf9140a672236e56"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","c000d93b3feaef60b9f56527346494ba"],["2019/03/09/MLExplainbility-1/index.html","37ae4ef79a7746ea50a816fad014d07b"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","c06bf6d2803a98f1344065ada25cafd3"],["2019/03/18/XML解析简介/index.html","8d9f8394fa537621c05e7b1aa23a7b41"],["2019/03/19/MLExplainbility-3/index.html","ea2408953e44b57f58b73ad92d27ced9"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","8b9f87d27f21f77f8c026c08570eb35c"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","f890dca155d4fb7e710f94c438531ade"],["2019/04/10/dlenvwithconda/index.html","011f979f294f290cdf3a545bad079fd4"],["2019/04/10/torch1/index.html","25fa80a9f129a32c3b1dc45564301b2d"],["2019/04/10/torch2/index.html","6ad6a5b78a8ee8d08d699479666e5236"],["2019/04/11/torch3/index.html","ff6ccc522ea4c6247263b51fc14fe53a"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","a29acbc44059b8ecaabd247fc3c92cfa"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","37fea84fb8b6ee50af14f44bf8098646"],["2019/05/06/decisiontree/index.html","4b57d18f709be5fcff2b7c8462f9484a"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","19c14190fa6dcc193f7484d6aa98ab04"],["2019/11/13/domainchange/index.html","d96178c52372c2f54dce3de4e49db58c"],["2019/11/25/pycharm-import-error/index.html","0d6cfc3080821c3b72310d8aa73bf73a"],["archives/2018/02/index.html","e701a24acb842ad73bca91e906bac69e"],["archives/2018/03/index.html","56371a74c9ac7e99b8898b3aac345ee4"],["archives/2018/05/index.html","fdc1e6f6fe063955a78e78511affe0d2"],["archives/2018/08/index.html","e8a4ad72015fcf0eb60b5cb3297e0ad0"],["archives/2018/09/index.html","d1449f0552d71648feac9a5eabbbfee0"],["archives/2018/11/index.html","d023b3ab7a207d7b415d9ad2ba659cb3"],["archives/2018/12/index.html","846300b6d5f28116232e314a495d248e"],["archives/2018/index.html","f2ed7575c20f597e09b1563240d2350c"],["archives/2018/page/2/index.html","a524fc83da768799e891cb50b714cd5c"],["archives/2019/02/index.html","f3ae2f062f2db25da6f0817e551535d8"],["archives/2019/03/index.html","633c14fa3cb04c648d666ba4bc65adc4"],["archives/2019/04/index.html","7c6cbff61b7f66352af3a6a600e1d596"],["archives/2019/05/index.html","adf2a0b45b4f34ebbc008d398c4b1fc2"],["archives/2019/10/index.html","f80464f8882818b6a3ec41a87eac79f2"],["archives/2019/11/index.html","d2477b0856f8b6de5b3c0db2234bfe3f"],["archives/2019/index.html","d7247de0be652a0fdb4f5f057f625a2b"],["archives/2019/page/2/index.html","23a2addbd46c04590b6b0c81acc9076b"],["archives/index.html","3212811afb8e545527a77b876f47df38"],["archives/page/2/index.html","45e65767f2b43c2052dc43713a2eada2"],["archives/page/3/index.html","bfcbbbc338eb6387073a1edc12bd3fc7"],["archives/page/4/index.html","7fa0617daa66d30f3cb17229936a8351"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/bg.png","5b948093c3931a073c8c9284a1a4726f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","645d18c76d3f7929592b632014453b6e"],["categories/代码/index.html","b4cc402123ffe4a0cffbb1bd5da504be"],["categories/技术/index.html","0ea503201b0eb67625f5f64cff0b75aa"],["categories/技术/page/2/index.html","6d05215a542c56538db7ea5b6ab8b140"],["categories/技术/page/3/index.html","bcff931cc3b01f7f69c7ad884253300a"],["categories/算法/index.html","1772bf016cb58dfff2911aaa42db49b6"],["categories/记录/index.html","5d2dc79bca31007d65719b2c84e23d80"],["categories/论文/index.html","bb373dd98c614f1bb00f0a98b2ccb620"],["css/index.css","c133e0e093d9ddbc3cf9028530dd254c"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["googleb98281c0779d5d3c.html","bf9a3d02f72126e4aab5143ed0f7235e"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["index.html","7be0ac3349bef81a8f7e5e8cf3016734"],["js/copy.js","10b58e108593f60eb272b8ecda1f2a27"],["js/fancybox.js","9cfc893a86a6bfc51f4db6293c4d2b08"],["js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","e2433ba220e56fa03095f6164bac719e"],["js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","1d0ed462a182a359868e1250dac9471a"],["page/3/index.html","3a969ae11b65d7b8bbb2f13eccc69a7b"],["page/4/index.html","794cdbfcf3b201b434cb3c20a1a2f3c9"],["slides/index.html","fd357e571a73fcfbe08ab646d7eed4d2"],["slides/index/BingWallpaper-2019-02-20.jpg","c8e8d39b6a155390566f2095b8bf672b"],["tags/Android/index.html","7e550071df82f0ef7bba904e278ca134"],["tags/Keras/index.html","69e3cfd1ac05b7ec269321458df17041"],["tags/PyTorch/index.html","a80be86c2f71d0b783a266aba7900d6c"],["tags/TensorFlow/index.html","5a9e20e5378a01159529bd8ba439a44f"],["tags/index.html","9742da79de4dadf5a91d870f5cbe9563"],["tags/代码记录/index.html","59039f3fe04c240e19ce9f44a249175f"],["tags/图像分割/index.html","a2c2e4ac14c4fab000f97bf54d6a5d7f"],["tags/基本概念/index.html","0cb454a686d7f4e4dd9a09826d975968"],["tags/基本算法/index.html","9706d680936267c58c5022912dece338"],["tags/数据扩充/index.html","437ab10ca8eea4d412a8e0f6bebb709d"],["tags/数据集/index.html","458b0a954e687f885a5bc5a019667496"],["tags/日记/index.html","47731aa26b7531c86d4f74fde16384f5"],["tags/机器学习/index.html","30fa5c545bf11e5098ff1ca85b98c10f"],["tags/深度学习/index.html","7889b54ddf0d1f9f47cf476a56fb5330"],["tags/目标检测/index.html","200709a4c7f4b1d626c4621f3039bce3"],["tags/神经网络/index.html","850e2d9355b62e0e570f4d1a82913be1"],["tags/组会分享/index.html","1eda4950108877404909bf0a7ee8fc81"],["tags/行为识别/index.html","c55594e2453ecaae253b631ce64f23a5"],["tags/论文阅读/index.html","91bcc46330cdfa27f195101e0c4d4168"]];
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







