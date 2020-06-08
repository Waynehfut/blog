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

var precacheConfig = [["2016/03/29/wheniwasyoung/index.html","1c1af1554ab2e62a336c78b55313347f"],["2018/02/27/mnist-mlp/index.html","9fb4f35022ec09f6b291aab57d302488"],["2018/02/28/mnist-cnn/index.html","3d92abd0c4abef9525f91750dc675f4a"],["2018/03/04/cifar10-cnn/index.html","e3d2d09ec18b89098d0d893339748f69"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","799d123ba3c27e9415d5255988d40b97"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","313c16b071527ebb8c1e76c2a6f32247"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","fe24b2820c511072cc3cb0a981f714ba"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","447f0c719c249ef0d3ec0acb4ff1a9a3"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","891bd0449ea8ed626bac47880b07cfbb"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","583759afc17f78cfd28287ab7f433d10"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","2a9efc68b1527256473147717cc6f2fc"],["2018/11/28/dropout/index.html","ef41f3af0f03bc0bbe9836d202ad9b10"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","4072cdd2ca2caed21138b4d57b14967d"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","75dda84a9896d70884dfca5dfc6fba73"],["2019/02/17/PRML/index.html","e63b0cbac36afb460aa581337a4ccf42"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","9449e6053e8f55c27723748c12652e32"],["2019/03/09/MLExplainbility-1/index.html","6e3b459796670c6bafe22cd582a9dd7d"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","782380ea6f77f34815edb00131c197f1"],["2019/03/18/XML解析简介/index.html","aa39391a8bfcacb3f6b2bfd2cd677bbe"],["2019/03/19/MLExplainbility-3/index.html","427ea97c815d20a15ed436d01fbc495e"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","26f6bbedae712960579a1457c015c1c2"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","9039cd2423436c7dd37c1f54a6346d5e"],["2019/04/10/dlenvwithconda/index.html","df4ad348a3132b427dbe86b919185cd9"],["2019/04/10/torch1/index.html","9da1ced2ed644f2c3065a707343923d2"],["2019/04/10/torch2/index.html","6f40c17c7e0959c32a80a76f14479ef8"],["2019/04/11/torch3/index.html","d7bffe3aa12ed3f45d26b0c0ef8119c4"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","078f400f66f46c389a64f0163adac820"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","d037b5a0930cb5953aac39907fdf9e63"],["2019/05/06/decisiontree/index.html","0edd3d71113666989429f82a930d5182"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","fbcf3777f3d6b57db4240daabfa7300c"],["2019/11/25/pycharm-import-error/index.html","7a8b96a75cd81ed5f9d6bccb8cf9188a"],["2020/01/20/intro-to-tex/1kH05d.png","a38b14bf9a202bf417263e7e79d68ed0"],["2020/01/20/intro-to-tex/1kHME4.png","5e35aed0de256c908c514204192a678e"],["2020/01/20/intro-to-tex/1kHVg0.png","0d7c8db9dbbed01ea2a185c3e06113b2"],["2020/01/20/intro-to-tex/1kHWVg.png","36526c991d8fc94ecbd613331a229d22"],["2020/01/20/intro-to-tex/1kHfaQ.png","5805e628a67f8962be7961b1b8837b5d"],["2020/01/20/intro-to-tex/1kHgr8.png","22f9326d1fa840d1331a0913c504ae67"],["2020/01/20/intro-to-tex/1kHh5j.png","f288902ec9ee0c4775e3cac7b5d22222"],["2020/01/20/intro-to-tex/1kHr8I.png","e14b90658392815bcb4f99f9697d8346"],["2020/01/20/intro-to-tex/1kHubF.png","005638d60b0f17ca636edac158108a61"],["2020/01/20/intro-to-tex/1kHwUH.png","efa8b85f13e3d2137142d8eafb12117e"],["2020/01/20/intro-to-tex/1kHzGR.png","97017fde23d1d641fd0f69f8a5c12c73"],["2020/01/20/intro-to-tex/1kLxiQ.png","78398ee4de7aba3ebaafed1c2e3e26a5"],["2020/01/20/intro-to-tex/1kO3dO.png","ce6ca1486a1c4a8d7b3e2f56ce5a58d7"],["2020/01/20/intro-to-tex/1kOO61.png","561a8f3b45fabe00b0dc275e183b74ae"],["2020/01/20/intro-to-tex/1kOQL6.png","04bb68d1f5eb7242da86e5c6eca38cc7"],["2020/01/20/intro-to-tex/1kOwOP.png","a8eb5a44a1788ae58f8423eab99019e6"],["2020/01/20/intro-to-tex/1kXF1A.png","441d868108f9c4ae537c78642012e30f"],["2020/01/20/intro-to-tex/1kXZ0f.png","8d401ea312c6f896abbe37cdc2a5ec32"],["2020/01/20/intro-to-tex/1kXipd.png","27c2a575d4cb08d46b6f21b566897efa"],["2020/01/20/intro-to-tex/1kb3dg.png","446ea6cf4bae02b9c6a56872dac63ec8"],["2020/01/20/intro-to-tex/1kb6Y9.png","1ee8176dda80e59ea7b4b6ed0d132693"],["2020/01/20/intro-to-tex/1kb8oQ.png","83f2b7738b3cfdc990911074635153bb"],["2020/01/20/intro-to-tex/1kbAde.png","2a28a6531705de2b726f1085b6f8b11e"],["2020/01/20/intro-to-tex/1kbDwF.png","223840a731e53fe3dbe6795481a38d3c"],["2020/01/20/intro-to-tex/1kbKQP.png","0d4feaddf406ca415acc9d552f37a098"],["2020/01/20/intro-to-tex/1kbPsK.png","6fd4d0339694da22b2ab948b5120e084"],["2020/01/20/intro-to-tex/1kbQL8.png","710149f24408223c3cf7e6d234673756"],["2020/01/20/intro-to-tex/1kbTFH.png","1769b8d50351d85edb5f5551ef04ef1a"],["2020/01/20/intro-to-tex/1kbWy6.png","5c7589b2c0c4e1c126c372582f570013"],["2020/01/20/intro-to-tex/1kbYJs.png","1f491ef9aaccb38bb591a88a2ac0a012"],["2020/01/20/intro-to-tex/1kbcWR.png","3a561b59b0ed3e4928a76008ee2836c7"],["2020/01/20/intro-to-tex/1kbro4.png","9b198e580aaefd112d2cf918d0c45801"],["2020/01/20/intro-to-tex/1kbvm8.png","98a0b9bc750991fd535d11b9b1bede69"],["2020/01/20/intro-to-tex/1kbwLT.png","6ae0553472042ee86094ae6b05246872"],["2020/01/20/intro-to-tex/1kq5j0.png","a97d8e75275780fbae4f3a7820cb39b2"],["2020/01/20/intro-to-tex/1kq9Yj.png","42504cc6eabe0282c460a72158a3bb11"],["2020/01/20/intro-to-tex/1kqutJ.png","9bc57bb62a7608ceba05fbe7f5c165d6"],["2020/01/20/intro-to-tex/index.html","35963ef5ee8f8eca214004c812460c75"],["2020/01/28/TabOrSpace/index.html","6302374fcdba659d7466d83d90c09886"],["2020/02/03/SelectedMedPaperOnTopConf/index.html","bd8b00d14d930eed442975e69f84e5b3"],["2020/02/20/quickgittur/index.html","99bbf82967e9f4827eaaabf0363fae11"],["2020/06/08/ubuntuissues/index.html","3185aecd4bf7ee5fee3cb4d7af975252"],["archives/2016/03/index.html","c305b710abd85600ee8c731341efd974"],["archives/2016/index.html","82908d80a42a00e7f3deb7224c1f9112"],["archives/2018/02/index.html","9ed865548d2ec16e83cc3ad063bfdcce"],["archives/2018/03/index.html","6863683c33ee0e3730813afbf800cfbd"],["archives/2018/05/index.html","30c5020271a0f0153392e37dceb7150e"],["archives/2018/08/index.html","cc36f5e3d9d4e4a026c44c773517c1c9"],["archives/2018/09/index.html","abb46cc7fb2a22e0c704316a4b024cde"],["archives/2018/11/index.html","af1a9a9305f3bfce393f4f464085059e"],["archives/2018/12/index.html","aa4f4987a022c7d798480162281917ae"],["archives/2018/index.html","cda2eafcc636ade3665290640f5f5ee4"],["archives/2018/page/2/index.html","5a066354c6ee3bdf397e5372386f4000"],["archives/2019/02/index.html","57839b6bb76573f086c690b5430cc513"],["archives/2019/03/index.html","38f3c3857d35eb420f78f2b66a369c18"],["archives/2019/04/index.html","ffa9e76f0e8133d270fd713f57a233a3"],["archives/2019/05/index.html","ae2520fdbb18c85dc0709bf668b29f37"],["archives/2019/10/index.html","5eb43f415b83e5525fe2aee37674f8bd"],["archives/2019/11/index.html","3c66ff71bc4b7ae465a48193f4d98603"],["archives/2019/index.html","a3cc8856c55fbb280eb49bba998ae10f"],["archives/2019/page/2/index.html","170f6f41762c1b31cca010ffa15cfe8a"],["archives/2020/01/index.html","8ccf4ef63b1ca3f4831b4a6c0e380e93"],["archives/2020/02/index.html","7ac2f33bd0e6959b4e476c01d18fbe73"],["archives/2020/06/index.html","19d66869c12de70cd20416ea11e745be"],["archives/2020/index.html","96bde783ac5625f16715e3ce1c491b03"],["archives/index.html","2b70875de0114e898143652858a6350c"],["archives/page/2/index.html","632820557b13d245e221d3dc6c9fe917"],["archives/page/3/index.html","1511eaecab8c4da3e1a614efaf686a6f"],["archives/page/4/index.html","4bb9d833aea0fb32eb00f0d983db9e84"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/bg.png","5b948093c3931a073c8c9284a1a4726f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","c8f058c39a50f62ca1f7e9a895024889"],["categories/代码/index.html","480474953199eec7c25be4ea2df8d77b"],["categories/技术/index.html","27a0aac597db6e24f78195eedcef76d7"],["categories/技术/page/2/index.html","ca18f321597f16dc60d8cbaa6a2e4f46"],["categories/技术/page/3/index.html","ea4c9c85c5587a814250cc3f45f46671"],["categories/教程/index.html","9928034190428bc711f5e4b1447816f1"],["categories/算法/index.html","acc9849f4dbc18b5d83aca6ee9b2b587"],["categories/记录/index.html","1dd647f297f59818d708e3deba09603c"],["categories/论文/index.html","bd7916ba4004407d6fb09329980521da"],["css/404.css","b1bb50e1fabe41adcec483f6427fb3aa"],["css/index.css","945061af083d94efa2cb1c4fcd801bcb"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["googleb98281c0779d5d3c.html","dfade8ad45cda950bf1a1af7163c44b5"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["index.html","100d64a3a25840da6456796dde83dba9"],["js/copy.js","45aae54bf2e43ac27ecc41eb5e0bacf7"],["js/fancybox.js","f84d626654b9bbc05720952b3effe062"],["js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["js/head.js","347edd99f8e3921b45fa617e839d8182"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/katex.js","d971ba8b8dee1120ef66744b89cfd2b1"],["js/scroll.js","a12ad7e37b9e325f8da3d0523d3757c7"],["js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/canvas-ribbon.js","09c181544ddff1db701db02ac30453e0"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","911db4268f0f6621073afcced9e1bfef"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","4042f911b214717c248ae8c5d17aade6"],["page/3/index.html","69894be72f8c06e7e6d3e6be909733ae"],["page/4/index.html","0677f77c9392fbbf0aa873d2fdb5a7de"],["tags/Android/index.html","b5790556e559ded8281406da20a50a39"],["tags/Keras/index.html","1cb85b3c6bc092ff59147ce187bca716"],["tags/Latex/index.html","84f13e5b8a0610876cc586c2e3fbec95"],["tags/PyTorch/index.html","63f49709677ab6408b5aaa69c057e4fb"],["tags/Python/index.html","eec85305429daa089a63cf372e887088"],["tags/TensorFlow/index.html","a35d4bbac9f68083c5ba03de862cf467"],["tags/Ubuntu/index.html","580bcea6280a98bdfc865f415c2c1689"],["tags/index.html","16b5be59d0c047249a77178b204894e4"],["tags/代码记录/index.html","e3943109a2f31d8423cadd9cc8f31f06"],["tags/图像分割/index.html","b94d8d48bb47c843889a35c56802fa5e"],["tags/基本概念/index.html","2328ff343509f43e3f2d5d307e4915df"],["tags/基本算法/index.html","c2abd0fb1642af89b635e059496a3afe"],["tags/数据扩充/index.html","2381f6f37ae4f4a9829a32b473d3f33d"],["tags/数据集/index.html","acadbdf4e7a6c0d5498bab1ae4324ebf"],["tags/日记/index.html","492901e4eb12631974a92613ea680444"],["tags/机器学习/index.html","d020ac3d95c1846fb4878f4fb1ce38b2"],["tags/深度学习/index.html","152fa9a71756902ea9e6396b0643e54b"],["tags/目标检测/index.html","54d770b814f7379659acac066ac06c6e"],["tags/神经网络/index.html","f7e007d55d86fce0ad34393808a1bd70"],["tags/组会分享/index.html","b3ffcd3eb7007e8e30c33b5335fbdc93"],["tags/行为识别/index.html","e611d31d4bbe0790f6235ebf68829698"],["tags/论文阅读/index.html","d1c9701e1f2cc11a556efdba46ef8666"]];
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







