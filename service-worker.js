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

var precacheConfig = [["2016/03/29/wheniwasyoung/index.html","3da95f3d8af9e8b85eceade2df862e03"],["2018/02/27/mnist-mlp/index.html","584ceeec3152460e60d17c0c8e90deec"],["2018/02/28/mnist-cnn/index.html","81456053b80391abed8453028dfdb807"],["2018/03/04/cifar10-cnn/index.html","3f60b717fbc5e66d9c9cc1da9d3901c4"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","72f0be9f2e69aac830603bba1412e66e"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","4bd85a04c07ac92876ec01662b480242"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","4f9b35d1ddf6a3c6eff5b472e8793049"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","4f4cac3e087e0fcb03f36408883b4018"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","ab74d87d768aa5979eca8c16a05ec0e7"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","022ecb098c148977f5024b5b78a316d1"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","de6e143e7f994f5c752328ce99db051f"],["2018/11/28/dropout/index.html","d5a59f7e4f849af33ac235135aa2d41b"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","3f90a2b83c0d52f103711f4cda9be139"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","5d55b9cfa16dcde0b4f8baa4d6694639"],["2019/02/17/PRML/index.html","ffd7c8bc740a16645e9c5e1210167b6a"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","c3725263eef6b28afe50d05bd473c17e"],["2019/03/09/MLExplainbility-1/index.html","9c4f3dd03d741e3e7932f467548284c7"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","07fef2943f74e3879762315345078890"],["2019/03/18/XML解析简介/index.html","82ac306efb6ef4e2189a3b51b5b8821b"],["2019/03/19/MLExplainbility-3/index.html","9a3f87296742be8fad670e166527ca07"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","9774a9aa534592245e71bca7904d7393"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","5f6be944e59f908e2377da6bedbe649f"],["2019/04/10/dlenvwithconda/index.html","4da4c215ecd51a7c4d6ee9811f174f97"],["2019/04/10/torch1/index.html","dc77f4aeda2b793dc80cadae0c0e0c1f"],["2019/04/10/torch2/index.html","d40eda785c4e60f91a087da870f9ca63"],["2019/04/11/torch3/index.html","1dfe442180057fb5d98c453f79bc20fa"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","d0484c479c6ec4d6d40ada6a3c9a39eb"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","7857a9569bd541c205be107387628672"],["2019/05/06/decisiontree/index.html","edec1eb1570aaa4065faf75332ac02bd"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","8cdae708296860ce68bb78bf6c1ac213"],["2019/11/25/pycharm-import-error/index.html","f3070d4e2680f4b6c6f522475a7dd065"],["2020/01/20/intro-to-tex/1kH05d.png","a38b14bf9a202bf417263e7e79d68ed0"],["2020/01/20/intro-to-tex/1kHME4.png","5e35aed0de256c908c514204192a678e"],["2020/01/20/intro-to-tex/1kHVg0.png","0d7c8db9dbbed01ea2a185c3e06113b2"],["2020/01/20/intro-to-tex/1kHWVg.png","36526c991d8fc94ecbd613331a229d22"],["2020/01/20/intro-to-tex/1kHfaQ.png","5805e628a67f8962be7961b1b8837b5d"],["2020/01/20/intro-to-tex/1kHgr8.png","22f9326d1fa840d1331a0913c504ae67"],["2020/01/20/intro-to-tex/1kHh5j.png","f288902ec9ee0c4775e3cac7b5d22222"],["2020/01/20/intro-to-tex/1kHr8I.png","e14b90658392815bcb4f99f9697d8346"],["2020/01/20/intro-to-tex/1kHubF.png","005638d60b0f17ca636edac158108a61"],["2020/01/20/intro-to-tex/1kHwUH.png","efa8b85f13e3d2137142d8eafb12117e"],["2020/01/20/intro-to-tex/1kHzGR.png","97017fde23d1d641fd0f69f8a5c12c73"],["2020/01/20/intro-to-tex/1kLxiQ.png","78398ee4de7aba3ebaafed1c2e3e26a5"],["2020/01/20/intro-to-tex/1kO3dO.png","ce6ca1486a1c4a8d7b3e2f56ce5a58d7"],["2020/01/20/intro-to-tex/1kOO61.png","561a8f3b45fabe00b0dc275e183b74ae"],["2020/01/20/intro-to-tex/1kOQL6.png","04bb68d1f5eb7242da86e5c6eca38cc7"],["2020/01/20/intro-to-tex/1kOwOP.png","a8eb5a44a1788ae58f8423eab99019e6"],["2020/01/20/intro-to-tex/1kXF1A.png","441d868108f9c4ae537c78642012e30f"],["2020/01/20/intro-to-tex/1kXZ0f.png","8d401ea312c6f896abbe37cdc2a5ec32"],["2020/01/20/intro-to-tex/1kXipd.png","27c2a575d4cb08d46b6f21b566897efa"],["2020/01/20/intro-to-tex/1kb3dg.png","446ea6cf4bae02b9c6a56872dac63ec8"],["2020/01/20/intro-to-tex/1kb6Y9.png","1ee8176dda80e59ea7b4b6ed0d132693"],["2020/01/20/intro-to-tex/1kb8oQ.png","83f2b7738b3cfdc990911074635153bb"],["2020/01/20/intro-to-tex/1kbAde.png","2a28a6531705de2b726f1085b6f8b11e"],["2020/01/20/intro-to-tex/1kbDwF.png","223840a731e53fe3dbe6795481a38d3c"],["2020/01/20/intro-to-tex/1kbKQP.png","0d4feaddf406ca415acc9d552f37a098"],["2020/01/20/intro-to-tex/1kbPsK.png","6fd4d0339694da22b2ab948b5120e084"],["2020/01/20/intro-to-tex/1kbQL8.png","710149f24408223c3cf7e6d234673756"],["2020/01/20/intro-to-tex/1kbTFH.png","1769b8d50351d85edb5f5551ef04ef1a"],["2020/01/20/intro-to-tex/1kbWy6.png","5c7589b2c0c4e1c126c372582f570013"],["2020/01/20/intro-to-tex/1kbYJs.png","1f491ef9aaccb38bb591a88a2ac0a012"],["2020/01/20/intro-to-tex/1kbcWR.png","3a561b59b0ed3e4928a76008ee2836c7"],["2020/01/20/intro-to-tex/1kbro4.png","9b198e580aaefd112d2cf918d0c45801"],["2020/01/20/intro-to-tex/1kbvm8.png","98a0b9bc750991fd535d11b9b1bede69"],["2020/01/20/intro-to-tex/1kbwLT.png","6ae0553472042ee86094ae6b05246872"],["2020/01/20/intro-to-tex/1kq5j0.png","a97d8e75275780fbae4f3a7820cb39b2"],["2020/01/20/intro-to-tex/1kq9Yj.png","42504cc6eabe0282c460a72158a3bb11"],["2020/01/20/intro-to-tex/1kqutJ.png","9bc57bb62a7608ceba05fbe7f5c165d6"],["2020/01/20/intro-to-tex/index.html","5147e936fbd1669c24c003dbd5f46dc5"],["2020/01/28/TabOrSpace/index.html","89ebffeaea7876dca7219fbd120df449"],["archives/2016/03/index.html","4d91bddbb8cdbd820f00f7baa3147a99"],["archives/2016/index.html","d1824f213bfe24153a9037e536a4469b"],["archives/2018/02/index.html","b0dc3a07418b1b9a8316d20a09753cc7"],["archives/2018/03/index.html","5445cc28138da60fd58de18aaa4aff80"],["archives/2018/05/index.html","3f7fdfbc4747674664d6a45d3adb4ef8"],["archives/2018/08/index.html","d9c7e520a8f69be1b5733cdd32d4e03b"],["archives/2018/09/index.html","fb56f0542d71db7df52c23bb87d80fab"],["archives/2018/11/index.html","e94bd2c53d66aeda6d81fafcec50b27b"],["archives/2018/12/index.html","f6f260110e2c667a9736f8a44519dbb0"],["archives/2018/index.html","5eaede1da4eae9aa1aac566f51f3e6d5"],["archives/2018/page/2/index.html","053e9f8d2c20bb5660b67d8da429f3ff"],["archives/2019/02/index.html","68e2eaf0698f0e3751f96acc24ed1d14"],["archives/2019/03/index.html","2166b08959652802bd60164810b0aa5b"],["archives/2019/04/index.html","a90c03e13ee0c70b481c1296deaecfb3"],["archives/2019/05/index.html","4c4488d3af324ab27cab0963355f0c30"],["archives/2019/10/index.html","4be8cded8d9098b1d6db892d6d2615d9"],["archives/2019/11/index.html","aa78721500076b2dbc9b9a64bfdbe834"],["archives/2019/index.html","071b1520be0959149163f8fa92ea74d8"],["archives/2019/page/2/index.html","3ccdc481fb86ebbd875818739dccaa1a"],["archives/2020/01/index.html","62bbef9cc691122e92d4eb95db1bf5a9"],["archives/2020/index.html","c5277192c064b31c91b4c45fcc9e3850"],["archives/index.html","4274370f363fc7efc68849f20dc8de4c"],["archives/page/2/index.html","da269a40cda32b60fdf26190e5722d00"],["archives/page/3/index.html","9ca31fea703856a6fc9d9de11f767934"],["archives/page/4/index.html","589f579fadbd4f3e6c58e15f825d6ced"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/bg.png","5b948093c3931a073c8c9284a1a4726f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","8ddc8781b379bff87b9c6943ba0f8ad6"],["categories/代码/index.html","bf71f0660a55ddc715e3d85d0d17514b"],["categories/技术/index.html","1c834eaeec1cbda8f9dbc70ffc3b8a71"],["categories/技术/page/2/index.html","044b24d11e0fd00c17329979452cf160"],["categories/技术/page/3/index.html","5b40cc352a48a54c60c89479d5dabd80"],["categories/算法/index.html","e60bc474b6cd67866821f593b3a08140"],["categories/记录/index.html","49f588fb2f5b3b58a6fef8a5c00302ba"],["categories/论文/index.html","53a6dd083363520e550fed50417937ec"],["css/index.css","11972f66122fc14c2c626dc01f3454ab"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["googleb98281c0779d5d3c.html","86b8d6177f63a56ed6bcff55adbd0f51"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["index.html","23dd0280b31be6fe226977d6d6c18414"],["js/copy.js","10b58e108593f60eb272b8ecda1f2a27"],["js/fancybox.js","9cfc893a86a6bfc51f4db6293c4d2b08"],["js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scroll.js","e2433ba220e56fa03095f6164bac719e"],["js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","bd261a5dda799613501070ecc19d6e69"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","57531ba975e906741874157d9b18eb57"],["page/3/index.html","d1145e9c59616d3abf6cd798dfafc8d3"],["page/4/index.html","c12ffe9323eec26f15674c1f845afce0"],["tags/Android/index.html","db506dfdb97e328a082996c1cba37f5f"],["tags/Keras/index.html","a11f31d7e19de666535f047cb1ae8a30"],["tags/Latex/index.html","072d50f85e0a8792f2ad4bced365d089"],["tags/PyTorch/index.html","612e0f91b0c3d0362a44f8af8f7c22a4"],["tags/Python/index.html","fdd7ec18e42331a8d7f32688414f8c34"],["tags/TensorFlow/index.html","e3e4eb90cbf7fcd2d72f8887006bdf7b"],["tags/index.html","a23347b41c79b0057006e14329648dac"],["tags/代码记录/index.html","2fd1ceace58424fb12957753b9580fc9"],["tags/图像分割/index.html","7062654df995f1c11d7d0979eb9062fa"],["tags/基本概念/index.html","94cd3bf3315fe0bb08132832adf1e46d"],["tags/基本算法/index.html","e48046284416c4cbac65975631160ad2"],["tags/数据扩充/index.html","a40a1464f0101c27e5c94159b9dc87a3"],["tags/数据集/index.html","771c5fc948991c34466d8954252c26ba"],["tags/日记/index.html","676588397f2d190be82d107d7c47466a"],["tags/机器学习/index.html","940204844a36ba4183e7f2885cc79663"],["tags/深度学习/index.html","70015c17ff8675413c618d5864b84faa"],["tags/目标检测/index.html","e54fde0e93a9362f8776c162e95284d3"],["tags/神经网络/index.html","b856fc696867f508930ee14ed5024294"],["tags/组会分享/index.html","276a2ff237f21ea52f2d6ac47c9137f8"],["tags/行为识别/index.html","49e3cebdb38729f6108b4a80cad7ac3d"],["tags/论文阅读/index.html","abf6ad9542ebbb66c9513299dc1d7bd5"]];
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







