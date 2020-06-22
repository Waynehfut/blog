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

var precacheConfig = [["2016/03/29/wheniwasyoung/index.html","4ad67fb2f47c144692fe0b5890a5c0fd"],["2018/02/27/mnist-mlp/index.html","7d6eda9289e00aea5866c34c371c22bc"],["2018/02/28/mnist-cnn/index.html","7dfc14870d9cee78ea16cfc411cfa437"],["2018/03/04/cifar10-cnn/index.html","fe830ba4b0e0883815f143171e783c04"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","86e9fa1cbda4be20163b94be5093950c"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","501e7852cea282ec134fe1b2c3a0ba69"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","2f9348007e2da8d1098a978247cc5626"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","0c4d1a762ca904ad19460840dc98ffae"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","3d1aa334854b3f8a7ac8fdd8f97f74a3"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","43bfe6c02721f45b365c7ff1566470a5"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","35b9406977e858d58db25ccc315a3e1f"],["2018/11/28/dropout/index.html","aeed7eedcc0c0412f30e9a419cd06675"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","74a7500154b4c3deaac261535edeeb75"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","63b5da63898ea517f664ce59daf081ab"],["2019/02/17/PRML/index.html","6bf872da0652adf9d00b4a030433387c"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","1736e7c3f00ccab8374412dd571c3473"],["2019/03/09/MLExplainbility-1/index.html","dbad4ee98d977b82f6d5aa9073268ba4"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","52f47a71687c027dfe98bf4567400cbf"],["2019/03/18/XML解析简介/index.html","b936fafb206fc3cc40b78799b504ac9b"],["2019/03/19/MLExplainbility-3/index.html","c205e6d69c276e63ee1887d768ed5178"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","8f6d20a923916b1cc46303d85b15660f"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","9bc471a78d60224d81363b04d3b799c1"],["2019/04/10/dlenvwithconda/index.html","6843c03d168f724bcf877db60f3113ca"],["2019/04/10/torch1/index.html","d4e8a5d8ef33241ae3f1ea24145f167e"],["2019/04/10/torch2/index.html","0d88a30365617f00cf689450b05840fa"],["2019/04/11/torch3/index.html","a584fee8334a275b4a4f81d393d6a606"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","84ef0c142b816cbd4663e98f534b4c8c"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","aa404d78260dd78cf3ecf9690948d69f"],["2019/05/06/decisiontree/index.html","4094816fca678adf10dbdf051d2cca66"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","2d9edd6a0928d2a025a46d0051de9b90"],["2019/11/25/pycharm-import-error/index.html","9fc563308cf6b94b0f270e7c24879a94"],["2020/01/20/intro-to-tex/1kH05d.png","a38b14bf9a202bf417263e7e79d68ed0"],["2020/01/20/intro-to-tex/1kHME4.png","5e35aed0de256c908c514204192a678e"],["2020/01/20/intro-to-tex/1kHVg0.png","0d7c8db9dbbed01ea2a185c3e06113b2"],["2020/01/20/intro-to-tex/1kHWVg.png","36526c991d8fc94ecbd613331a229d22"],["2020/01/20/intro-to-tex/1kHfaQ.png","5805e628a67f8962be7961b1b8837b5d"],["2020/01/20/intro-to-tex/1kHgr8.png","22f9326d1fa840d1331a0913c504ae67"],["2020/01/20/intro-to-tex/1kHh5j.png","f288902ec9ee0c4775e3cac7b5d22222"],["2020/01/20/intro-to-tex/1kHr8I.png","e14b90658392815bcb4f99f9697d8346"],["2020/01/20/intro-to-tex/1kHubF.png","005638d60b0f17ca636edac158108a61"],["2020/01/20/intro-to-tex/1kHwUH.png","efa8b85f13e3d2137142d8eafb12117e"],["2020/01/20/intro-to-tex/1kHzGR.png","97017fde23d1d641fd0f69f8a5c12c73"],["2020/01/20/intro-to-tex/1kLxiQ.png","78398ee4de7aba3ebaafed1c2e3e26a5"],["2020/01/20/intro-to-tex/1kO3dO.png","ce6ca1486a1c4a8d7b3e2f56ce5a58d7"],["2020/01/20/intro-to-tex/1kOO61.png","561a8f3b45fabe00b0dc275e183b74ae"],["2020/01/20/intro-to-tex/1kOQL6.png","04bb68d1f5eb7242da86e5c6eca38cc7"],["2020/01/20/intro-to-tex/1kOwOP.png","a8eb5a44a1788ae58f8423eab99019e6"],["2020/01/20/intro-to-tex/1kXF1A.png","441d868108f9c4ae537c78642012e30f"],["2020/01/20/intro-to-tex/1kXZ0f.png","8d401ea312c6f896abbe37cdc2a5ec32"],["2020/01/20/intro-to-tex/1kXipd.png","27c2a575d4cb08d46b6f21b566897efa"],["2020/01/20/intro-to-tex/1kb3dg.png","446ea6cf4bae02b9c6a56872dac63ec8"],["2020/01/20/intro-to-tex/1kb6Y9.png","1ee8176dda80e59ea7b4b6ed0d132693"],["2020/01/20/intro-to-tex/1kb8oQ.png","83f2b7738b3cfdc990911074635153bb"],["2020/01/20/intro-to-tex/1kbAde.png","2a28a6531705de2b726f1085b6f8b11e"],["2020/01/20/intro-to-tex/1kbDwF.png","223840a731e53fe3dbe6795481a38d3c"],["2020/01/20/intro-to-tex/1kbKQP.png","0d4feaddf406ca415acc9d552f37a098"],["2020/01/20/intro-to-tex/1kbPsK.png","6fd4d0339694da22b2ab948b5120e084"],["2020/01/20/intro-to-tex/1kbQL8.png","710149f24408223c3cf7e6d234673756"],["2020/01/20/intro-to-tex/1kbTFH.png","1769b8d50351d85edb5f5551ef04ef1a"],["2020/01/20/intro-to-tex/1kbWy6.png","5c7589b2c0c4e1c126c372582f570013"],["2020/01/20/intro-to-tex/1kbYJs.png","1f491ef9aaccb38bb591a88a2ac0a012"],["2020/01/20/intro-to-tex/1kbcWR.png","3a561b59b0ed3e4928a76008ee2836c7"],["2020/01/20/intro-to-tex/1kbro4.png","9b198e580aaefd112d2cf918d0c45801"],["2020/01/20/intro-to-tex/1kbvm8.png","98a0b9bc750991fd535d11b9b1bede69"],["2020/01/20/intro-to-tex/1kbwLT.png","6ae0553472042ee86094ae6b05246872"],["2020/01/20/intro-to-tex/1kq5j0.png","a97d8e75275780fbae4f3a7820cb39b2"],["2020/01/20/intro-to-tex/1kq9Yj.png","42504cc6eabe0282c460a72158a3bb11"],["2020/01/20/intro-to-tex/1kqutJ.png","9bc57bb62a7608ceba05fbe7f5c165d6"],["2020/01/20/intro-to-tex/index.html","2c6beff23bc6e8804f364fd4967eddb9"],["2020/01/28/TabOrSpace/index.html","eeaa91cb1ee4505bd363934942ec551c"],["2020/02/03/SelectedMedPaperOnTopConf/index.html","a55a5ac723d61c306d679fb9c5b3ad73"],["2020/02/20/quickgittur/index.html","ec49c7b9b2cdff59a410f416c1254197"],["2020/06/08/ubuntuissues/index.html","2183c4d7e0e00548b9936888a70258dc"],["2020/06/11/scihelper/index.html","b527aeb172301bb3abc1e0bd057563c1"],["2020/06/21/lostinkonx/index.html","43b827972696c26606b03685fd5d45ed"],["archives/2016/03/index.html","98dda2cf451d90a8697502c480e649c6"],["archives/2016/index.html","3fba0f3fec8c1232bbe538d221e76c66"],["archives/2018/02/index.html","0c5edce200db9d97f3887565382a16bd"],["archives/2018/03/index.html","d57ecf3d23d1441994415830535a18e9"],["archives/2018/05/index.html","f7e4e4c2303f1278d6a15033dd9d3ae1"],["archives/2018/08/index.html","95b8567b25030f681602065975438c2a"],["archives/2018/09/index.html","6b7486f857ce4d72bc868a4676bd2e41"],["archives/2018/11/index.html","c3ae30bdd765490c4c02f679aba04949"],["archives/2018/12/index.html","de64b3f7590bc9940056e0a515faf937"],["archives/2018/index.html","d2f4ad95d99fd169a64cd4ca52511416"],["archives/2018/page/2/index.html","ae97cf9ea91bd21d6ec3c62b30a0c663"],["archives/2019/02/index.html","53c9de25d70f429a906422eb98e2946d"],["archives/2019/03/index.html","323ea62c8998e020b09b52a64945361b"],["archives/2019/04/index.html","99e33fdb95d1ceea42c52382c4dd4cbc"],["archives/2019/05/index.html","712b6e113ae00f94c0002170322d044f"],["archives/2019/10/index.html","5b4692bff944a4b0ae0ce090af9d3409"],["archives/2019/11/index.html","d2594b572d4add6f0bf3a1a3f669a600"],["archives/2019/index.html","9cf391eb577805223b1e7c47904addaa"],["archives/2019/page/2/index.html","4cdd527e749c4ff975343d6c9c6af8a4"],["archives/2020/01/index.html","c3b293c33307b73642e8fdd6f9580c63"],["archives/2020/02/index.html","d50273246fd522c2667ce768a7e16d0f"],["archives/2020/06/index.html","9de6a71233423f6eeb92c8e4c644d56c"],["archives/2020/index.html","a048e958c3942d0860942e0f1337520b"],["archives/index.html","16991096f3ca161d2544b69552d4987e"],["archives/page/2/index.html","eb142459ce135e53f7fd2d2da9611c88"],["archives/page/3/index.html","881e18bb2075e36bcac723af58d07c8f"],["archives/page/4/index.html","2ded9c57918387eec2671039b6b8b4b1"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","a6af29f523c8c38729cc51f89d741825"],["categories/代码/index.html","735bbc5b26984986269b23541d3a855a"],["categories/技术/index.html","850a6e4f3f31844aa538e8d364bd0301"],["categories/技术/page/2/index.html","335e90f84b5623f4cc38b7597b7c402c"],["categories/技术/page/3/index.html","529a7b4dfdd02cbb14d69d938f6cc2de"],["categories/教程/index.html","d86674e60d3fad390888521ef98d356e"],["categories/算法/index.html","a9f53655d7d1fa020a84d4e70be22a01"],["categories/记录/index.html","5bb09f6e526018b97d59499f0dc65c1d"],["categories/论文/index.html","093e8b0b6687566545883a2eafb25e79"],["css/404.css","b1bb50e1fabe41adcec483f6427fb3aa"],["css/index.css","48be2ace3ba9471d5d9e6321f89e0b58"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["googleb98281c0779d5d3c.html","be604ffa8e6a0a6aeb09cbf49dfa2fb1"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["index.html","b849722446f89b2f6649a53aa648a0dd"],["js/copy.js","45aae54bf2e43ac27ecc41eb5e0bacf7"],["js/fancybox.js","f84d626654b9bbc05720952b3effe062"],["js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["js/head.js","347edd99f8e3921b45fa617e839d8182"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/katex.js","d971ba8b8dee1120ef66744b89cfd2b1"],["js/scroll.js","a12ad7e37b9e325f8da3d0523d3757c7"],["js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/canvas-ribbon.js","09c181544ddff1db701db02ac30453e0"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","911db4268f0f6621073afcced9e1bfef"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","75748e90d7ed294a74bf6ed6fb8d63d1"],["page/3/index.html","89f995009ffc5ed2c25e2133ab6ab954"],["page/4/index.html","cfb21b81b0021ec2334f85d7435c0825"],["tags/Android/index.html","120e2fa3b65d228e41d0206276dd4bb6"],["tags/Keras/index.html","9d41bbad08fa2a7a5baf5f05b8b10b95"],["tags/Latex/index.html","bdee64e25369023f182799030595c33a"],["tags/PyTorch/index.html","987266b5235a2f7f07970c8576756427"],["tags/Python/index.html","8b7d095c3ef68bde8dc111f3bea9f6a5"],["tags/TensorFlow/index.html","780c4b737283e0c0c6b7d2bca10e3ce7"],["tags/Ubuntu/index.html","1429b49f7cfcbcf9e92c4b34b4348402"],["tags/index.html","938163f8d46a0b4437c57633bf9377df"],["tags/代码记录/index.html","5d7b5e23bb43bc1444035912178a9d85"],["tags/图像分割/index.html","c51c4702f92273237726dfb8cda8fa13"],["tags/基本概念/index.html","49634207bfd139710e76d901fdad4e6c"],["tags/基本算法/index.html","9792235a2a86bdf237ed3ad3c0060bcc"],["tags/工具/index.html","c5d0da0be746cc675783e324aa5b36f3"],["tags/数据扩充/index.html","fd0220e655208fb1c469d4e6f9d54a58"],["tags/数据集/index.html","20649db166eb899ea76d8f84fc36a634"],["tags/日记/index.html","3050181f0fce310072d35ada6f9f8046"],["tags/机器学习/index.html","82946dfde8849f767737e309ed15370c"],["tags/深度学习/index.html","669a58d9c2244abd3bcb7fc883261709"],["tags/目标检测/index.html","b5c58a818e54c555c3ae98ac8234fe0e"],["tags/神经网络/index.html","ab04228388184aca001fed0580efc16f"],["tags/组会分享/index.html","9af52d2d978df566e3bacc34e789aecd"],["tags/行为识别/index.html","12bead074c8a99c7d5f0059f813859e3"],["tags/论文阅读/index.html","6ceb9691c8c391d4e00660c6f146b0bc"]];
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







