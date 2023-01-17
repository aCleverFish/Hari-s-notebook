(window.webpackJsonp=window.webpackJsonp||[]).push([[214],{2083:function(a,t,s){"use strict";s.r(t);var e=s(54),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#_1、观念"}},[a._v("1、观念")])]),e("li",[e("a",{attrs:{href:"#_2、操作"}},[a._v("2、操作")])]),e("li",[e("a",{attrs:{href:"#_3、在-web-工程中-编写测试代码"}},[a._v("3、在 Web 工程中，编写测试代码")]),e("ul",[e("li",[e("a",{attrs:{href:"#_1补充创建目录"}},[a._v("①补充创建目录")])]),e("li",[e("a",{attrs:{href:"#_2确认-web-工程依赖了-junit"}},[a._v("②确认 Web 工程依赖了 junit")])]),e("li",[e("a",{attrs:{href:"#_3创建测试类"}},[a._v("③创建测试类")])])])]),e("li",[e("a",{attrs:{href:"#_4、执行maven命令"}},[a._v("4、执行Maven命令")]),e("ul",[e("li",[e("a",{attrs:{href:"#_1测试命令"}},[a._v("①测试命令")])]),e("li",[e("a",{attrs:{href:"#_2打包命令"}},[a._v("②打包命令")])]),e("li",[e("a",{attrs:{href:"#_3查看当前-web-工程所依赖的-jar-包的列表"}},[a._v("③查看当前 Web 工程所依赖的 jar 包的列表")])]),e("li",[e("a",{attrs:{href:"#_4以树形结构查看当前-web-工程的依赖信息"}},[a._v("④以树形结构查看当前 Web 工程的依赖信息")])])])])])]),e("p"),a._v(" "),e("h1",{attrs:{id:"实验五-让-web-工程依赖-java-工程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实验五-让-web-工程依赖-java-工程"}},[a._v("#")]),a._v(" 实验五：让 Web 工程依赖 Java 工程")]),a._v(" "),e("h2",{attrs:{id:"_1、观念"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、观念"}},[a._v("#")]),a._v(" 1、观念")]),a._v(" "),e("p",[a._v("明确一个意识：从来只有 Web 工程依赖 Java 工程，没有反过来 Java 工程依赖 Web 工程。本质上来说，Web 工程依赖的 Java 工程其实就是 Web 工程里导入的 jar 包。最终 Java 工程会变成 jar 包，放在 Web 工程的 WEB-INF/lib 目录下。")]),a._v(" "),e("h2",{attrs:{id:"_2、操作"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、操作"}},[a._v("#")]),a._v(" 2、操作")]),a._v(" "),e("p",[a._v("在 pro02-maven-web 工程的 pom.xml 中，找到 dependencies 标签，在 dependencies 标签中做如下配置：")]),a._v(" "),e("div",{staticClass:"language-xml line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-xml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("\x3c!-- 配置对Java工程pro01-maven-java的依赖 --\x3e")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("\x3c!-- 具体的配置方式：在dependency标签内使用坐标实现依赖 --\x3e")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("dependency")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("groupId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("com.atguigu.maven"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("groupId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("artifactId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("pro01-maven-java"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("artifactId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("1.0-SNAPSHOT"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("dependency")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br"),e("span",{staticClass:"line-number"},[a._v("4")]),e("br"),e("span",{staticClass:"line-number"},[a._v("5")]),e("br"),e("span",{staticClass:"line-number"},[a._v("6")]),e("br"),e("span",{staticClass:"line-number"},[a._v("7")]),e("br")])]),e("h2",{attrs:{id:"_3、在-web-工程中-编写测试代码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、在-web-工程中-编写测试代码"}},[a._v("#")]),a._v(" 3、在 Web 工程中，编写测试代码")]),a._v(" "),e("h3",{attrs:{id:"_1补充创建目录"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1补充创建目录"}},[a._v("#")]),a._v(" ①补充创建目录")]),a._v(" "),e("p",[a._v("pro02-maven-web"),e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[a._v("\\src\\test\\java\\com\\atguigu\\maven")])]),a._v(" "),e("h3",{attrs:{id:"_2确认-web-工程依赖了-junit"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2确认-web-工程依赖了-junit"}},[a._v("#")]),a._v(" ②确认 Web 工程依赖了 junit")]),a._v(" "),e("div",{staticClass:"language-xml line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-xml"}},[e("code",[a._v("    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("dependency")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("groupId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("junit"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("groupId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("artifactId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("junit"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("artifactId")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("4.12"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n      "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("scope")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("test"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("scope")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("dependency")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br"),e("span",{staticClass:"line-number"},[a._v("4")]),e("br"),e("span",{staticClass:"line-number"},[a._v("5")]),e("br"),e("span",{staticClass:"line-number"},[a._v("6")]),e("br")])]),e("h3",{attrs:{id:"_3创建测试类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3创建测试类"}},[a._v("#")]),a._v(" ③创建测试类")]),a._v(" "),e("p",[a._v("把 Java 工程的 CalculatorTest.java 类复制到 pro02-maven-wb"),e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[a._v("\\src\\test\\java\\com\\atguigu\\maven")]),a._v(" 目录下")]),a._v(" "),e("h2",{attrs:{id:"_4、执行maven命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4、执行maven命令"}},[a._v("#")]),a._v(" 4、执行Maven命令")]),a._v(" "),e("h3",{attrs:{id:"_1测试命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1测试命令"}},[a._v("#")]),a._v(" ①测试命令")]),a._v(" "),e("p",[a._v("mvn test")]),a._v(" "),e("p",[a._v("说明：测试操作中会提前自动执行编译操作，测试成功就说明编译也是成功的。")]),a._v(" "),e("h3",{attrs:{id:"_2打包命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2打包命令"}},[a._v("#")]),a._v(" ②打包命令")]),a._v(" "),e("p",[a._v("mvn package")]),a._v(" "),e("p",[e("img",{attrs:{src:s(809),alt:"./images"}})]),a._v(" "),e("p",[a._v("通过查看 war 包内的结构，我们看到被 Web 工程依赖的 Java 工程确实是会变成 Web 工程的 WEB-INF/lib 目录下的 jar 包。")]),a._v(" "),e("p",[e("img",{attrs:{src:s(810),alt:"./images"}})]),a._v(" "),e("h3",{attrs:{id:"_3查看当前-web-工程所依赖的-jar-包的列表"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3查看当前-web-工程所依赖的-jar-包的列表"}},[a._v("#")]),a._v(" ③查看当前 Web 工程所依赖的 jar 包的列表")]),a._v(" "),e("p",[a._v("mvn dependency:list")]),a._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),e("p",[a._v("[INFO] The following files have been resolved:"),e("br"),a._v("\n[INFO]    org.hamcrest:hamcrest-core:jar:1.3:test"),e("br"),a._v("\n[INFO]    javax.servlet:javax.servlet-api:jar:3.1.0:provided"),e("br"),a._v("\n[INFO]    com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile"),e("br"),a._v("\n[INFO]    junit:junit:jar:4.12:test")])]),a._v(" "),e("p",[a._v("说明：javax.servlet:javax.servlet-api:jar:3.1.0:provided 格式显示的是一个 jar 包的坐标信息。格式是：")]),a._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),e("p",[a._v("groupId:artifactId:打包方式:version:依赖的范围")])]),a._v(" "),e("p",[a._v("这样的格式虽然和我们 XML 配置文件中坐标的格式不同，但是本质上还是坐标信息，大家需要能够认识这样的格式，将来从 Maven 命令的日志或错误信息中看到这样格式的信息，就能够识别出来这是坐标。进而根据坐标到Maven 仓库找到对应的jar包，用这样的方式解决我们遇到的报错的情况。")]),a._v(" "),e("h3",{attrs:{id:"_4以树形结构查看当前-web-工程的依赖信息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4以树形结构查看当前-web-工程的依赖信息"}},[a._v("#")]),a._v(" ④以树形结构查看当前 Web 工程的依赖信息")]),a._v(" "),e("p",[a._v("mvn dependency:tree")]),a._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),e("p",[a._v("[INFO] com.atguigu.maven:pro02-maven-web:war:1.0-SNAPSHOT"),e("br"),a._v("\n[INFO] +- junit:junit:jar:4.12:test"),e("br"),a._v("\n[INFO] |  \\- org.hamcrest:hamcrest-core:jar:1.3:test"),e("br"),a._v("\n[INFO] +- javax.servlet:javax.servlet-api:jar:3.1.0:provided"),e("br"),a._v("\n[INFO] \\- com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile"),e("br")])]),a._v(" "),e("p",[a._v("我们在 pom.xml 中并没有依赖 hamcrest-core，但是它却被加入了我们依赖的列表。原因是：junit 依赖了hamcrest-core，然后基于依赖的传递性，hamcrest-core 被传递到我们的工程了。")]),a._v(" "),e("p",[e("RouterLink",{attrs:{to:"/pro002-maven/chapter03/verse04.html"}},[a._v("上一节")]),a._v(" "),e("RouterLink",{attrs:{to:"/pro002-maven/chapter03/index.html"}},[a._v("回目录")]),a._v(" "),e("RouterLink",{attrs:{to:"/pro002-maven/chapter03/verse06.html"}},[a._v("下一节")])],1)])}),[],!1,null,null,null);t.default=n.exports},809:function(a,t,s){a.exports=s.p+"assets/img/img024.91b00e04.png"},810:function(a,t){a.exports="data:image/png;base64,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"}}]);