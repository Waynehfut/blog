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

var precacheConfig = [["2016/03/29/wheniwasyoung/index.html","d5c204e55897249b879d022c13c79c86"],["2018/02/27/mnist-mlp/index.html","36960d6d0ad28ae43b959886b4dae800"],["2018/02/28/mnist-cnn/index.html","f426f09309611f9ed898bed86bd9f1e6"],["2018/03/04/cifar10-cnn/index.html","8749732394ecca52eaba7481fad9f037"],["2018/03/04/cifar10-cnn/p1.png","9065d15ad88d5150f5f7c661a1ad7a5e"],["2018/03/04/cifar10-cnn/p2.png","bbd024d9e045f779d9ea09b661e51f64"],["2018/03/04/cifar10-cnn/p3.png","1600af18b0588b9dcda903bf5a17485d"],["2018/03/06/从零开始构建图像分割模型（一）/after_aug.png","093fbc5827ef792083cbd607e94537d6"],["2018/03/06/从零开始构建图像分割模型（一）/aug.png","a43a8247d4163b189c09514e7710b53e"],["2018/03/06/从零开始构建图像分割模型（一）/index.html","f5c22880e9c0a8326649576dd11815cd"],["2018/03/06/从零开始构建图像分割模型（一）/merge.png","905318e8ec2722edec0ffcfcc7b122a3"],["2018/03/06/从零开始构建图像分割模型（一）/p1.jpg","22c0101ef7ea2f2d9de1d723e84a5b6b"],["2018/03/06/从零开始构建图像分割模型（一）/split.png","265d6e97f1365082af5bdd0877ddc9c6"],["2018/03/23/从零开始构建图像分割模型（二）/index.html","cf30f4c1e70b6e5d47d816115d8aba74"],["2018/03/23/从零开始构建图像分割模型（二）/network.png","29e737678763d083ba5b5f1c270cd3ea"],["2018/03/23/从零开始构建图像分割模型（二）/npy.png","e37172291e1796e37ba0e3c1943239ae"],["2018/03/23/从零开始构建图像分割模型（二）/result.png","c93e3412125886e2015ea2d2aff1344d"],["2018/03/26/YOLOV3/cfg.png","0fb5479acc38efdf25ccf04b20a586f7"],["2018/03/26/YOLOV3/index.html","37fa92bc51ca3c44e4cd8f3deb274b36"],["2018/03/26/YOLOV3/overview.png","bb9904a5820e05f2ed4fa6388e95e053"],["2018/03/26/YOLOV3/tree1.png","b404528812a8963f0f7bb5006dc38431"],["2018/03/26/YOLOV3/vocname.png","ea25a850e8d3cc91d099ce28b4ff1fe8"],["2018/05/03/tensorflow-lite/index.html","f0a2dc3689e771ea8b6f68904d7dd7f8"],["2018/05/03/tensorflow-lite/sample.jpg","fd87e2eead3eda06d8985e065eee6b48"],["2018/05/03/tensorflow-lite/tflite-architecture.jpg","a9b2d23de591de14bf518dee3f7ed3ba"],["2018/08/23/ROCandAUC/clipboard.png","aceb2d46aa1eb04620036a01725190d4"],["2018/08/23/ROCandAUC/figure_1-1.png","45421431a419231e27c832fc21375856"],["2018/08/23/ROCandAUC/index.html","feef586f76c8d0406a12d1c0a279dc0c"],["2018/08/23/ROCandAUC/myplot.png","e7b9d573c76c9423208938a59016535c"],["2018/09/10/grandfather/date.jpg","c3cbe9bf92a52aa0be612f11c6ac4525"],["2018/09/10/grandfather/index.html","56315590c3102777500cf4999677f903"],["2018/11/22/Video-and-Language-ECCV-MM-2016-Tao-Mei-Pub/index.html","9800312058b378d0fd407b5148ae2010"],["2018/11/28/dropout/index.html","414d8343a14964a20d3110ba3da89f4a"],["2018/11/28/dropout/table1.png","787b53b0c25ba91d4fb3ad9ddffb338e"],["2018/11/28/dropout/table2.png","f9f246a7b9fd85180c49784f9d76d717"],["2018/12/26/Mask/index.html","5a4dd0d6bbeb0349adc89db373ca2387"],["2018/12/26/Mask/mask.jpg","ca6cb887f96be655b68bcd9e2b775a28"],["2018/12/26/Mask/masked.jpg","5e2ddd54eb9758382956391c86f9b848"],["2018/12/26/Mask/sample.jpg","d601bcd8bcddc5042c0fb068107769b9"],["2018/12/27/conda/index.html","7342d339a53f7603b3a5e009990a602d"],["2019/02/17/PRML/index.html","71532532992f61c4c96831f6236f638a"],["2019/02/25/challengefoMl/Image1.png","6bcd719ca85c3c2749a5e30447064df6"],["2019/02/25/challengefoMl/Image2.png","b1564a664fcd4ef580ecaee74a48c818"],["2019/02/25/challengefoMl/Image3.png","2f18029eb0e2e5be8e6ac2f69915cebb"],["2019/02/25/challengefoMl/Image4.png","7f5d0e7ed8bebdd26dbcfecb2fe0168d"],["2019/02/25/challengefoMl/Image5.png","9830012f490541d83626fb3fede17142"],["2019/02/25/challengefoMl/Image6.png","493453059d96845f9a6d45767caaa214"],["2019/02/25/challengefoMl/index.html","4cfd0062cf31076a9a46b623b33928a0"],["2019/03/09/MLExplainbility-1/index.html","19ec0e258e285264e7d97c59717f3b46"],["2019/03/10/MLExplainbility-2/1.png","c539d47b08c79ec084ccd4cc34b2d547"],["2019/03/10/MLExplainbility-2/2.png","63d460462a4b3d1add298d1a7948472c"],["2019/03/10/MLExplainbility-2/index.html","03d6b80a225e39cf69c2e1dd4105edfe"],["2019/03/18/XML解析简介/index.html","3032aff71a78442a5c5505b3b6768548"],["2019/03/19/MLExplainbility-3/index.html","d4845929ceb16235d02e6705fce7c185"],["2019/03/19/MLExplainbility-3/p1.png","c04771a8064dbd8fb057b18d489b34c1"],["2019/03/19/MLExplainbility-3/p2.png","60c392db3aa3d6a909ea72677cf8c8a9"],["2019/03/19/MLExplainbility-3/p3.png","892c232e7e847f0cf1d42830ee452043"],["2019/03/19/MLExplainbility-3/p4.png","3933ebbb2945f2440208a5a4b3fb422c"],["2019/03/19/MLExplainbility-3/p5.png","aff9076a0d590acd3aaf75db4af5c9bc"],["2019/03/23/MLExplainbility-4/index.html","81d3d1b819642adf655ba7c263f88312"],["2019/03/23/MLExplainbility-4/p1.png","4cc185d1e949f2eeaf8cfe09d02412a7"],["2019/03/23/MLExplainbility-4/p2.png","0a3201db88e78bdbe7467027db3322ab"],["2019/03/23/MLExplainbility-4/p3.png","73b7b04990a256072a228c63d78df252"],["2019/04/08/SurgicalVideo/index.html","958d452b72220e7d7763c17b8f5d2588"],["2019/04/10/dlenvwithconda/index.html","7688c855a32849dd255bef62a1659a22"],["2019/04/10/torch1/index.html","da80ff8f048a61ea3a4730093febd891"],["2019/04/10/torch2/index.html","dd72589524a9adeaa5f37a69b53b1a3d"],["2019/04/11/torch3/index.html","6694fbdbe975259277c02de1692740c8"],["2019/04/11/torch3/mnist.png","06a914f4ee93f25c0d6c924df9b4b4cb"],["2019/04/11/torch4/cifar10.png","2dcc41f9079d1abf5883a113c0d1ca31"],["2019/04/11/torch4/index.html","add467b4a50b5d4be34d24b09757f17c"],["2019/04/11/torch4/output_17_0.png","85c95a40adc9227180885f3194fbf138"],["2019/04/11/torch4/output_31_0.png","fe794a1a33ed381b4462c597bb01a7bc"],["2019/04/15/torch5/index.html","eee30aa1768a06580ad1a3ea9ec9e0e4"],["2019/05/06/decisiontree/index.html","6c26c5ccbc204071363956b6a3475eec"],["2019/05/06/decisiontree/tree1.png","fec4e42c7af9329a73d309f5bb0def85"],["2019/05/31/echonet/FreqGenSchema.png","44584bcc25918d8d0d0d86371f38fbd0"],["2019/05/31/echonet/FreqGenTestOverlay.png","4ff3956c52737aeee0befd1fb7bd292e"],["2019/05/31/echonet/initeco.png","3803f03b6091ea3215f80c967ecc5496"],["2019/05/31/echonet/workflow.png","d016f5ce2781132c23d6fdf7a3a2b67e"],["2019/10/24/optimizationfuncinML/index.html","09b2b978505fbacaa9dd216a079ce117"],["2019/11/25/pycharm-import-error/index.html","2d562cde74879330f719f5dfde119cfb"],["2020/01/20/intro-to-tex/1kH05d.png","a38b14bf9a202bf417263e7e79d68ed0"],["2020/01/20/intro-to-tex/1kHME4.png","5e35aed0de256c908c514204192a678e"],["2020/01/20/intro-to-tex/1kHVg0.png","0d7c8db9dbbed01ea2a185c3e06113b2"],["2020/01/20/intro-to-tex/1kHWVg.png","36526c991d8fc94ecbd613331a229d22"],["2020/01/20/intro-to-tex/1kHfaQ.png","5805e628a67f8962be7961b1b8837b5d"],["2020/01/20/intro-to-tex/1kHgr8.png","22f9326d1fa840d1331a0913c504ae67"],["2020/01/20/intro-to-tex/1kHh5j.png","f288902ec9ee0c4775e3cac7b5d22222"],["2020/01/20/intro-to-tex/1kHr8I.png","e14b90658392815bcb4f99f9697d8346"],["2020/01/20/intro-to-tex/1kHubF.png","005638d60b0f17ca636edac158108a61"],["2020/01/20/intro-to-tex/1kHwUH.png","efa8b85f13e3d2137142d8eafb12117e"],["2020/01/20/intro-to-tex/1kHzGR.png","97017fde23d1d641fd0f69f8a5c12c73"],["2020/01/20/intro-to-tex/1kLxiQ.png","78398ee4de7aba3ebaafed1c2e3e26a5"],["2020/01/20/intro-to-tex/1kO3dO.png","ce6ca1486a1c4a8d7b3e2f56ce5a58d7"],["2020/01/20/intro-to-tex/1kOO61.png","561a8f3b45fabe00b0dc275e183b74ae"],["2020/01/20/intro-to-tex/1kOQL6.png","04bb68d1f5eb7242da86e5c6eca38cc7"],["2020/01/20/intro-to-tex/1kOwOP.png","a8eb5a44a1788ae58f8423eab99019e6"],["2020/01/20/intro-to-tex/1kXF1A.png","441d868108f9c4ae537c78642012e30f"],["2020/01/20/intro-to-tex/1kXZ0f.png","8d401ea312c6f896abbe37cdc2a5ec32"],["2020/01/20/intro-to-tex/1kXipd.png","27c2a575d4cb08d46b6f21b566897efa"],["2020/01/20/intro-to-tex/1kb3dg.png","446ea6cf4bae02b9c6a56872dac63ec8"],["2020/01/20/intro-to-tex/1kb6Y9.png","1ee8176dda80e59ea7b4b6ed0d132693"],["2020/01/20/intro-to-tex/1kb8oQ.png","83f2b7738b3cfdc990911074635153bb"],["2020/01/20/intro-to-tex/1kbAde.png","2a28a6531705de2b726f1085b6f8b11e"],["2020/01/20/intro-to-tex/1kbDwF.png","223840a731e53fe3dbe6795481a38d3c"],["2020/01/20/intro-to-tex/1kbKQP.png","0d4feaddf406ca415acc9d552f37a098"],["2020/01/20/intro-to-tex/1kbPsK.png","6fd4d0339694da22b2ab948b5120e084"],["2020/01/20/intro-to-tex/1kbQL8.png","710149f24408223c3cf7e6d234673756"],["2020/01/20/intro-to-tex/1kbTFH.png","1769b8d50351d85edb5f5551ef04ef1a"],["2020/01/20/intro-to-tex/1kbWy6.png","5c7589b2c0c4e1c126c372582f570013"],["2020/01/20/intro-to-tex/1kbYJs.png","1f491ef9aaccb38bb591a88a2ac0a012"],["2020/01/20/intro-to-tex/1kbcWR.png","3a561b59b0ed3e4928a76008ee2836c7"],["2020/01/20/intro-to-tex/1kbro4.png","9b198e580aaefd112d2cf918d0c45801"],["2020/01/20/intro-to-tex/1kbvm8.png","98a0b9bc750991fd535d11b9b1bede69"],["2020/01/20/intro-to-tex/1kbwLT.png","6ae0553472042ee86094ae6b05246872"],["2020/01/20/intro-to-tex/1kq5j0.png","a97d8e75275780fbae4f3a7820cb39b2"],["2020/01/20/intro-to-tex/1kq9Yj.png","42504cc6eabe0282c460a72158a3bb11"],["2020/01/20/intro-to-tex/1kqutJ.png","9bc57bb62a7608ceba05fbe7f5c165d6"],["2020/01/20/intro-to-tex/index.html","23825ad8b461b4ba8fbe7367b2465c98"],["2020/01/28/TabOrSpace/index.html","7990f0cdc1c3e71d60c5d9d14e30f328"],["2020/02/03/SelectedMedPaperOnTopConf/index.html","5f9a65928843cf73468581a79726d23e"],["2020/02/20/quickgittur/index.html","aa880de5d3c92b5bb31ccc2e97d115ec"],["archives/2016/03/index.html","1059d729fff5a94cd527b295fbb5edf4"],["archives/2016/index.html","0c3ab152d3d038da1f26328c02011dcf"],["archives/2018/02/index.html","e2920411f9ed0e3726997db99f01f259"],["archives/2018/03/index.html","20da4c2201c83f9d9c582b9abd965c07"],["archives/2018/05/index.html","cbfd1a50f62ee3d491ddbc3938ff9b4f"],["archives/2018/08/index.html","53464870c1ea2cc04e12b2692b329824"],["archives/2018/09/index.html","de2c5fcba8821ab990e6795133bf3e35"],["archives/2018/11/index.html","72830d7592d1d97d61b4b9d14614ec70"],["archives/2018/12/index.html","5e6dc381448457850d46598f1b3ebaa6"],["archives/2018/index.html","d59391330e6daee69b43fa4b5f10af18"],["archives/2018/page/2/index.html","cc68ef34ef6649309ee3cacbb361db50"],["archives/2019/02/index.html","4df6d7d6a51ec4e51a393af4dea82316"],["archives/2019/03/index.html","a2c275a78e8e57b07c0627c82c18e94d"],["archives/2019/04/index.html","ac7a4212be5c6e42c09b384034f17afb"],["archives/2019/05/index.html","925f8f0b4cc9a7dd25ae956f5bb4ef2d"],["archives/2019/10/index.html","27d0b97d10e4474597583d143b88351e"],["archives/2019/11/index.html","6e832f0567d52de7fb6e4271691f8671"],["archives/2019/index.html","0ee40fcfca12c5c6bab6ec9f62ed71dd"],["archives/2019/page/2/index.html","cd92bb90ed4a11a2ca62360f9464d248"],["archives/2020/01/index.html","a2cf58402ce4a7bb1d2b606ddbc7f290"],["archives/2020/02/index.html","da71773842fb9637e6f970d0b8c76753"],["archives/2020/index.html","fc176a71559d549c80067df8c1b7825b"],["archives/index.html","0b527cff8f3fa4542aa482e431474dda"],["archives/page/2/index.html","04386057c51c529aeedfe556ea475487"],["archives/page/3/index.html","783a3962f40e214ead38c4f6899a348d"],["archives/page/4/index.html","e3e5bb74369aaea8d3284f7aa30ff444"],["assets/img/alipay.jpg","18172ea958b34d13a0a2670d145c969f"],["assets/img/bg.png","5b948093c3931a073c8c9284a1a4726f"],["assets/img/mysite.jpg","833164f840cf36d648d3966771263ca1"],["assets/img/wechat.jpg","16ac76bd1ea94886ec532abaad0ba848"],["categories/index.html","171370884584104d7126b39b5abdea26"],["categories/代码/index.html","b60ac466fbcdedad77b570885cf2e8e6"],["categories/技术/index.html","b51647bfd942a12c9d38856b7b8dc6e3"],["categories/技术/page/2/index.html","fa67e9c8ea0e1828f0ef02d22feaebb9"],["categories/技术/page/3/index.html","3ff55d4e7f56edf45f1adaaa8bb0d48b"],["categories/算法/index.html","1d07e16106fc98a2f1c17846b91703bc"],["categories/记录/index.html","86a65c9b81716ce286a8a2a5b98d58e3"],["categories/论文/index.html","e1b465b17ef7d5df1eddd163d8328b91"],["css/404.css","b1bb50e1fabe41adcec483f6427fb3aa"],["css/index.css","945061af083d94efa2cb1c4fcd801bcb"],["css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["googleb98281c0779d5d3c.html","ae6b1d1d680f703cc898c764b87eab9e"],["img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["img/avatar.png","6cc4a809d23e3d8946a299ae4ce4e4cd"],["index.html","b0a84a59866961c280fd5dd684c2cb65"],["js/copy.js","45aae54bf2e43ac27ecc41eb5e0bacf7"],["js/fancybox.js","f84d626654b9bbc05720952b3effe062"],["js/fireworks.js","35933ce61c158ef9c33b5e089fe757ac"],["js/head.js","347edd99f8e3921b45fa617e839d8182"],["js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["js/katex.js","d971ba8b8dee1120ef66744b89cfd2b1"],["js/scroll.js","a12ad7e37b9e325f8da3d0523d3757c7"],["js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["js/third-party/canvas-ribbon.js","09c181544ddff1db701db02ac30453e0"],["js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["js/transition.js","911db4268f0f6621073afcced9e1bfef"],["js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["page/2/index.html","502b28cc45f1f218887053ae31c65151"],["page/3/index.html","b6fc8189e0da2ef39f6ecf2b8033c14c"],["page/4/index.html","62467702fcd1ade9ea6a8d591eece9a8"],["tags/Android/index.html","b677c1d2ba988195dd70f78ca6a29ae9"],["tags/Keras/index.html","9adbb14d8327cd491232640c6c350792"],["tags/Latex/index.html","3a55724fa72b53d06e1db9524c6fc859"],["tags/PyTorch/index.html","bfb71bd027552e2325b68315e0fee359"],["tags/Python/index.html","402c9ee8514476e37585ab4ffe9d37af"],["tags/TensorFlow/index.html","6dbac408c9f979a45f4051f116f8a316"],["tags/index.html","3423e6fdb9b7f4007fb396e522119773"],["tags/代码记录/index.html","8fa9bbcd419668b2467a0fb8d9dd1307"],["tags/图像分割/index.html","17fad4eb64b413eabc381c1ce196c03d"],["tags/基本概念/index.html","b305b55b534db552a27c81138a1f2b50"],["tags/基本算法/index.html","27d3fb0336aa1c0f5589a682bd8af1c8"],["tags/数据扩充/index.html","a368ae7bf03db9e6c87f0868e18b2872"],["tags/数据集/index.html","28ab67537fe829b0f3027b525a3ed767"],["tags/日记/index.html","f1da7cf23d8b1f35364bae7cb2384dc5"],["tags/机器学习/index.html","34f1db778b8b2e449745a2b5f7386d7e"],["tags/深度学习/index.html","ec5d56e4c13cdd64c83fe34527bec875"],["tags/目标检测/index.html","48cdd6205e9aaa3fce948fb3bcca3936"],["tags/神经网络/index.html","fefd7df5d5811f4d60a5713206b04abf"],["tags/组会分享/index.html","9fdce83dec0b144fbd819b904ef3263c"],["tags/行为识别/index.html","875fc6b22944ec6764965f4412270301"],["tags/论文阅读/index.html","d8a1c48b7388bbfc767f395a895f3082"]];
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







