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

var precacheConfig = [["2016/03/29/wheniwasyoung/index.html","f0c19477a68476a6535007b54b19059b"],["2018/02/27/mnist-mlp/index.html","ed634afbd0aac0575e07008870841c76"],["2018/02/28/mnist-cnn/index.html","067cbf241c38d7c98bd5bb5674b8b8ce"],["2018/03/04/cifar10-cnn/index.html","2ac0c1608df9a64e03af72a91c3bc5ee"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","cd643badd0407d8591f92a5f0af88192"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","bc1f1b65e4dd860a15af340351c8289a"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","2584a966c92a9a6a152dfe445d1ce701"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","62f433145ec8f505051fa352fa89c131"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","9596c4294ca4e2a8f45b13a167e3cde3"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","cc54948bf6901134398c0c3862640efe"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","eafb7f5404818976bcddaa5e783db225"],["2018/11/28/dropout/index.html","2101ff952411fb806ce06ba01de89e4b"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","5d24e9744346352197c81e69792cc925"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","958bf5a5357ed347e6c361ff74068619"],["2019/02/17/PRML/index.html","7930170b9ecb81efbe9c36e921c88959"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","284cf9df442bba9b4e3258ed2f59a236"],["2019/03/09/MLExplainbility-1/index.html","8b1561283c4ef3a0bba08795976563bb"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","d2a58cd5d218e3c9b5337397f793b85d"],["2019/03/18/XML解析简介/index.html","05e1ba115884999545a00a13beffc024"],["2019/03/19/MLExplainbility-3/index.html","1e7202288fc0bae6226cc3315abe8ab4"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","2b2fe4ab48eb3102b146c4264ad12767"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","005bf55cc43f734e1e31ecda14fe2ede"],["2019/04/10/dlenvwithconda/index.html","80d9e8e112820554de45534790043841"],["2019/04/10/torch1/index.html","543ae84714f88728551c6da09ef44102"],["2019/04/10/torch2/index.html","ff75d305a0a60908b7e6be7c0418378c"],["2019/04/11/torch3/index.html","7322c60a19884136c8b4d61136e2a03c"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","7f9c412e9ea30c2e4eb662c8d01047bd"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","8c258641113ab9ed14ed37810c45d041"],["2019/05/06/decisiontree/index.html","0a2d6646ba7f99d815d0e402d7a3de48"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","a7c3fc179bc63644345f6c5f36b92ddf"],["2019/11/25/pycharm-import-error/index.html","20857b3d5d319d3c7510140ded5c2d81"],["2020/01/20/intro-to-tex/1kH05d.png","a38b14bf9a202bf417263e7e79d68ed0"],["2020/01/20/intro-to-tex/1kHME4.png","5e35aed0de256c908c514204192a678e"],["2020/01/20/intro-to-tex/1kHVg0.png","0d7c8db9dbbed01ea2a185c3e06113b2"],["2020/01/20/intro-to-tex/1kHWVg.png","36526c991d8fc94ecbd613331a229d22"],["2020/01/20/intro-to-tex/1kHfaQ.png","5805e628a67f8962be7961b1b8837b5d"],["2020/01/20/intro-to-tex/1kHgr8.png","22f9326d1fa840d1331a0913c504ae67"],["2020/01/20/intro-to-tex/1kHh5j.png","f288902ec9ee0c4775e3cac7b5d22222"],["2020/01/20/intro-to-tex/1kHr8I.png","e14b90658392815bcb4f99f9697d8346"],["2020/01/20/intro-to-tex/1kHubF.png","005638d60b0f17ca636edac158108a61"],["2020/01/20/intro-to-tex/1kHwUH.png","efa8b85f13e3d2137142d8eafb12117e"],["2020/01/20/intro-to-tex/1kHzGR.png","97017fde23d1d641fd0f69f8a5c12c73"],["2020/01/20/intro-to-tex/1kLxiQ.png","78398ee4de7aba3ebaafed1c2e3e26a5"],["2020/01/20/intro-to-tex/1kO3dO.png","ce6ca1486a1c4a8d7b3e2f56ce5a58d7"],["2020/01/20/intro-to-tex/1kOO61.png","561a8f3b45fabe00b0dc275e183b74ae"],["2020/01/20/intro-to-tex/1kOQL6.png","04bb68d1f5eb7242da86e5c6eca38cc7"],["2020/01/20/intro-to-tex/1kOwOP.png","a8eb5a44a1788ae58f8423eab99019e6"],["2020/01/20/intro-to-tex/1kXF1A.png","441d868108f9c4ae537c78642012e30f"],["2020/01/20/intro-to-tex/1kXZ0f.png","8d401ea312c6f896abbe37cdc2a5ec32"],["2020/01/20/intro-to-tex/1kXipd.png","27c2a575d4cb08d46b6f21b566897efa"],["2020/01/20/intro-to-tex/1kb3dg.png","446ea6cf4bae02b9c6a56872dac63ec8"],["2020/01/20/intro-to-tex/1kb6Y9.png","1ee8176dda80e59ea7b4b6ed0d132693"],["2020/01/20/intro-to-tex/1kb8oQ.png","83f2b7738b3cfdc990911074635153bb"],["2020/01/20/intro-to-tex/1kbAde.png","2a28a6531705de2b726f1085b6f8b11e"],["2020/01/20/intro-to-tex/1kbDwF.png","223840a731e53fe3dbe6795481a38d3c"],["2020/01/20/intro-to-tex/1kbKQP.png","0d4feaddf406ca415acc9d552f37a098"],["2020/01/20/intro-to-tex/1kbPsK.png","6fd4d0339694da22b2ab948b5120e084"],["2020/01/20/intro-to-tex/1kbQL8.png","710149f24408223c3cf7e6d234673756"],["2020/01/20/intro-to-tex/1kbTFH.png","1769b8d50351d85edb5f5551ef04ef1a"],["2020/01/20/intro-to-tex/1kbWy6.png","5c7589b2c0c4e1c126c372582f570013"],["2020/01/20/intro-to-tex/1kbYJs.png","1f491ef9aaccb38bb591a88a2ac0a012"],["2020/01/20/intro-to-tex/1kbcWR.png","3a561b59b0ed3e4928a76008ee2836c7"],["2020/01/20/intro-to-tex/1kbro4.png","9b198e580aaefd112d2cf918d0c45801"],["2020/01/20/intro-to-tex/1kbvm8.png","98a0b9bc750991fd535d11b9b1bede69"],["2020/01/20/intro-to-tex/1kbwLT.png","6ae0553472042ee86094ae6b05246872"],["2020/01/20/intro-to-tex/1kq5j0.png","a97d8e75275780fbae4f3a7820cb39b2"],["2020/01/20/intro-to-tex/1kq9Yj.png","42504cc6eabe0282c460a72158a3bb11"],["2020/01/20/intro-to-tex/1kqutJ.png","9bc57bb62a7608ceba05fbe7f5c165d6"],["2020/01/20/intro-to-tex/index.html","7273b8b82a3e5921b7fbcd73d71f83d2"],["2020/01/28/TabOrSpace/index.html","7ab75930f06d842e4f9a36cc1d7a79df"],["2020/02/03/SelectedMedPaperOnTopConf/index.html","0fc632bf25bda45b6a115b166567f654"],["archives/2016/03/index.html","98738be75e4c6d86aec46cf0e327d5d8"],["archives/2016/index.html","c79b93e05badf009a68b56a766f1be81"],["archives/2018/02/index.html","6d1df2cab6a655648b52a2994de51fd4"],["archives/2018/03/index.html","53cea12b5f5842a8c5c932b46551ba11"],["archives/2018/05/index.html","66b91aed8fa78176a7655ccab64fa494"],["archives/2018/08/index.html","f131094258ce8666469a61c6f80ac969"],["archives/2018/09/index.html","fbc22893ab5aaeb4d6146dd5c674c444"],["archives/2018/11/index.html","696815188509dbc0b6b0fa9f686aa422"],["archives/2018/12/index.html","1cd40e701fa20b8ac80a4b4de7a8fd0e"],["archives/2018/index.html","1f8cc671f62052bbc90374641651c773"],["archives/2018/page/2/index.html","479de9ea1eff4843520bef9d65dedf4e"],["archives/2019/02/index.html","e2666637ff5e3966d11c70808757feec"],["archives/2019/03/index.html","643abfd06e318d89c0d0096e0ab58542"],["archives/2019/04/index.html","2bea8a66b30473643bac09b46f66419f"],["archives/2019/05/index.html","d0e5aa06835628ac98fdce5a0876c230"],["archives/2019/10/index.html","5038f2dfa611123a75ef5c2dcdf390a9"],["archives/2019/11/index.html","338c2ace9184b5e3d8565fe66adade7c"],["archives/2019/index.html","4d0a2732647ba9f0fe110aeb5c3f7ee6"],["archives/2019/page/2/index.html","26bd29fa41a584b4ac12025cce90ba75"],["archives/2020/01/index.html","08919d2e9f8cb5fa6b9eb457a8e26e08"],["archives/2020/02/index.html","3a992a5cf08140c7cc731fbe8ef75de2"],["archives/2020/index.html","3285761c90d777c909b351e18f945151"],["archives/index.html","5fdf2ee54d61eb97f9bb66dd0543f4b0"],["archives/page/2/index.html","11ebc81ee67068d4ed7e381e0ef850a5"],["archives/page/3/index.html","ccad2d1c745aafcb542472daf6e0d2f7"],["archives/page/4/index.html","844207ce65f53a80357cdbc36d7c23de"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/bg.png","5b948093c3931a073c8c9284a1a4726f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","1999e5c0678530ab15bdf7fb493afef6"],["categories/代码/index.html","4acbdfd1fdefd3a1af51b1c66f297ea6"],["categories/技术/index.html","7ad0c9b9b73255cc86d14f63fdb30c15"],["categories/技术/page/2/index.html","b9079d360f9b8774e509819c8d8562a6"],["categories/技术/page/3/index.html","1573e4a065817f633d89c41d17d124e4"],["categories/算法/index.html","f153fd11815998f7121579bb6a41d495"],["categories/记录/index.html","593a1f232315b5644e21eed98ee9b0ad"],["categories/论文/index.html","1490cbd3bfdc0c3ce0ef8bb1c23142e3"],["css/404.css","b1bb50e1fabe41adcec483f6427fb3aa"],["css/index.css","945061af083d94efa2cb1c4fcd801bcb"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["googleb98281c0779d5d3c.html","d4754526a547be45ec8b75d70e73d1a9"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["index.html","d035e81db87e838e6f52e64226e7ab04"],["js/copy.js","45aae54bf2e43ac27ecc41eb5e0bacf7"],["js/fancybox.js","f84d626654b9bbc05720952b3effe062"],["js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["js/head.js","347edd99f8e3921b45fa617e839d8182"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/katex.js","d971ba8b8dee1120ef66744b89cfd2b1"],["js/scroll.js","a12ad7e37b9e325f8da3d0523d3757c7"],["js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/canvas-ribbon.js","09c181544ddff1db701db02ac30453e0"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","911db4268f0f6621073afcced9e1bfef"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","56d228f8b0f7970ce46568abbf6691b5"],["page/3/index.html","378f473eaf5ba296f3548971f9a50e25"],["page/4/index.html","7ff6ffff002edc9e6bb042e6de7eb591"],["tags/Android/index.html","e427883495f506c32ae01e1fe957f09d"],["tags/Keras/index.html","31a0a561585d97062c0ca436107d8979"],["tags/Latex/index.html","00c76608643ee83c27d1b02d9e7f1436"],["tags/PyTorch/index.html","3b55ea143cb9c9d4ba047591ad97fef4"],["tags/Python/index.html","99db4bb9911127cf700139c889708109"],["tags/TensorFlow/index.html","073a331f9cd6cded8b932c1f53ef404d"],["tags/index.html","8e1717415c866ebb0544f89aea738e4a"],["tags/代码记录/index.html","d656061c788337aed7703d1cb7219904"],["tags/图像分割/index.html","c6f6a2d17bba2a3c98fd012a5a5ed2bf"],["tags/基本概念/index.html","fbc30452ddfb4f916dbcf5953e09de25"],["tags/基本算法/index.html","31ce4abd6b7c3603a34ac703d8e89a47"],["tags/数据扩充/index.html","cb261477b7a17fe95aaf79c818f8fc5c"],["tags/数据集/index.html","1babd2e5a3e85193aeca671a4ab1b4ff"],["tags/日记/index.html","7678579553af0bf9e6dba3b9f3272c53"],["tags/机器学习/index.html","5d6b6dc2814a187f6a722367062fe609"],["tags/深度学习/index.html","ba8b712c9c1313e4d826a4842980a361"],["tags/目标检测/index.html","a707e1521e5e7f899fb9a9d6cc282b78"],["tags/神经网络/index.html","60c5bf68818b728fa76cb605fa2d76c9"],["tags/组会分享/index.html","fb795f5f86dd30e6dd20999522bea7ad"],["tags/行为识别/index.html","ea3fb4b68df2f1b54ebb16530385054f"],["tags/论文阅读/index.html","35ba47990b1d17c2d02a0fceb4eaedb9"]];
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







