(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{2005:function(t,a,s){"use strict";s.r(a);var e=s(54),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"第六章-http协议"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#第六章-http协议"}},[t._v("#")]),t._v(" 第六章 HTTP协议")]),t._v(" "),e("h2",{attrs:{id:"_1、介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、介绍"}},[t._v("#")]),t._v(" 1、介绍")]),t._v(" "),e("p",[t._v("HTTP："),e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("H")]),t._v("yper "),e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("T")]),t._v("ext "),e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("T")]),t._v("ransfer "),e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("P")]),t._v("rotocol超文本传输协议。HTTP最大的作用就是确定了请求和响应数据的格式。浏览器发送给服务器的数据：请求报文；服务器返回给浏览器的数据：响应报文。")]),t._v(" "),e("h2",{attrs:{id:"_2、请求报文"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、请求报文"}},[t._v("#")]),t._v(" 2、请求报文")]),t._v(" "),e("h3",{attrs:{id:"_1在开发者工具中浏览报文源码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1在开发者工具中浏览报文源码"}},[t._v("#")]),t._v(" ①在开发者工具中浏览报文源码")]),t._v(" "),e("p",[e("img",{attrs:{src:s(652),alt:"./images"}})]),t._v(" "),e("h3",{attrs:{id:"_2请求报文的三个部分"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2请求报文的三个部分"}},[t._v("#")]),t._v(" ②请求报文的三个部分")]),t._v(" "),e("p",[e("img",{attrs:{src:s(653),alt:"./images"}})]),t._v(" "),e("h3",{attrs:{id:"_3请求行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3请求行"}},[t._v("#")]),t._v(" ③请求行")]),t._v(" "),e("p",[t._v("作用：展示当前请求的最基本信息")]),t._v(" "),e("blockquote",[e("p",[t._v("POST /dynamic/target.jsp HTTP/1.1")])]),t._v(" "),e("ul",[e("li",[t._v("请求方式")]),t._v(" "),e("li",[t._v("访问地址")]),t._v(" "),e("li",[t._v("HTTP协议的版本")])]),t._v(" "),e("h3",{attrs:{id:"_4请求消息头"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4请求消息头"}},[t._v("#")]),t._v(" ④请求消息头")]),t._v(" "),e("p",[t._v("作用：通过具体的参数对本次请求进行详细的说明")]),t._v(" "),e("p",[t._v("格式：键值对，键和值之间使用冒号隔开")]),t._v(" "),e("p",[t._v("相对比较重要的请求消息头：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("名称")]),t._v(" "),e("th",[t._v("功能")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("Host")]),t._v(" "),e("td",[t._v("服务器的主机地址")])]),t._v(" "),e("tr",[e("td",[t._v("Accept")]),t._v(" "),e("td",[t._v("声明当前请求能够接受的『媒体类型』")])]),t._v(" "),e("tr",[e("td",[t._v("Referer")]),t._v(" "),e("td",[t._v("当前请求来源页面的地址")])]),t._v(" "),e("tr",[e("td",[t._v("Content-Length")]),t._v(" "),e("td",[t._v("请求体内容的长度")])]),t._v(" "),e("tr",[e("td",[t._v("Content-Type")]),t._v(" "),e("td",[t._v("请求体的内容类型，这一项的具体值是媒体类型中的某一种")])]),t._v(" "),e("tr",[e("td",[t._v("Cookie")]),t._v(" "),e("td",[t._v("浏览器访问服务器时携带的Cookie数据")])])])]),t._v(" "),e("h3",{attrs:{id:"_5请求体"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5请求体"}},[t._v("#")]),t._v(" ⑤请求体")]),t._v(" "),e("p",[t._v("作用：作为请求的主体，发送数据给服务器。具体来说其实就是POST请求方式下的请求参数。")]),t._v(" "),e("p",[t._v("格式：")]),t._v(" "),e("h4",{attrs:{id:"_1-form-data"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-form-data"}},[t._v("#")]),t._v(" [1]form data")]),t._v(" "),e("p",[t._v("含义：当前请求体是一个表单提交的请求参数。")]),t._v(" "),e("p",[e("img",{attrs:{src:s(654),alt:"./images"}})]),t._v(" "),e("p",[t._v("查看源码后，发现格式如下：")]),t._v(" "),e("blockquote",[e("p",[t._v("username=tom&password=123456")])]),t._v(" "),e("ul",[e("li",[t._v("每一组请求参数是一个键值对")]),t._v(" "),e("li",[t._v("键和值中间是等号")]),t._v(" "),e("li",[t._v("键值对之间是&号")])]),t._v(" "),e("h4",{attrs:{id:"_2-request-payload"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-request-payload"}},[t._v("#")]),t._v(" [2]Request Payload")]),t._v(" "),e("p",[t._v("含义：整个请求体以某种特定格式来组织数据，例如JSON格式。")]),t._v(" "),e("p",[e("img",{attrs:{src:s(655),alt:"./images"}})]),t._v(" "),e("h2",{attrs:{id:"_3、请求方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、请求方式"}},[t._v("#")]),t._v(" 3、请求方式")]),t._v(" "),e("h3",{attrs:{id:"_1http协议已定义的请求方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1http协议已定义的请求方式"}},[t._v("#")]),t._v(" ①HTTP协议已定义的请求方式")]),t._v(" "),e("p",[t._v("HTTP1.1中共定义了八种请求方式：")]),t._v(" "),e("ul",[e("li",[e("span",{staticStyle:{color:"red","font-weight":"bold"}},[t._v("GET")]),t._v("：从服务器端获取数据")]),t._v(" "),e("li",[e("span",{staticStyle:{color:"red","font-weight":"bold"}},[t._v("POST")]),t._v("：将数据保存到服务器端")]),t._v(" "),e("li",[e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("PUT")]),t._v("：命令服务器对数据执行更新")]),t._v(" "),e("li",[e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("DELETE")]),t._v("：命令服务器删除数据")]),t._v(" "),e("li",[t._v("HEAD")]),t._v(" "),e("li",[t._v("CONNECT")]),t._v(" "),e("li",[t._v("OPTIONS")]),t._v(" "),e("li",[t._v("TRACE")])]),t._v(" "),e("h3",{attrs:{id:"_2get请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2get请求"}},[t._v("#")]),t._v(" ②GET请求")]),t._v(" "),e("ul",[e("li",[t._v("特征1：没有请求体")]),t._v(" "),e("li",[t._v("特征2：请求参数附着在URL地址后面")]),t._v(" "),e("li",[t._v("特征3：请求参数在浏览器地址栏能够直接被看到，存在安全隐患")]),t._v(" "),e("li",[t._v("特征4：在URL地址后面携带请求参数，数据容量非常有限。如果数据量大，那么超出容量的数据会丢失")]),t._v(" "),e("li",[t._v("特征5：从报文角度分析，请求参数是在请求行中携带的，因为访问地址在请求行")])]),t._v(" "),e("h3",{attrs:{id:"_3post请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3post请求"}},[t._v("#")]),t._v(" ③POST请求")]),t._v(" "),e("ul",[e("li",[t._v("特征1：有请求体")]),t._v(" "),e("li",[t._v("特征2：请求参数放在请求体中")]),t._v(" "),e("li",[t._v("特征3：请求体发送数据的空间没有限制")]),t._v(" "),e("li",[t._v("特征4：可以发送各种不同类型的数据")]),t._v(" "),e("li",[t._v("特征5：从报文角度分析，请求参数是在请求体中携带的")]),t._v(" "),e("li",[t._v("特征6：由于请求参数是放在请求体中，所以浏览器地址栏看不到")])]),t._v(" "),e("h2",{attrs:{id:"_4、媒体类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4、媒体类型"}},[t._v("#")]),t._v(" 4、媒体类型")]),t._v(" "),e("h3",{attrs:{id:"_1http协议中的mime类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1http协议中的mime类型"}},[t._v("#")]),t._v(" ①HTTP协议中的MIME类型")]),t._v(" "),e("p",[t._v("Multipurpose Internet Mail Extensions")]),t._v(" "),e("h3",{attrs:{id:"_2用途"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2用途"}},[t._v("#")]),t._v(" ②用途")]),t._v(" "),e("p",[t._v("为了让用户通过浏览器和服务器端交互的过程中有更好、更丰富的体验，HTTP协议需要支持丰富的数据类型。")]),t._v(" "),e("h3",{attrs:{id:"_3mime类型定义参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3mime类型定义参考"}},[t._v("#")]),t._v(" ③MIME类型定义参考")]),t._v(" "),e("p",[t._v("我们可以通过查看Tomcat解压目录下conf/web.xml配置文件，了解HTTP协议中定义的MIME类型。")]),t._v(" "),e("div",{staticClass:"language-xml line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-xml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("mp4"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("video/mp4"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("doc"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("application/msword"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("json"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("application/json"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("html"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("extension")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("text/html"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("mime-mapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br"),e("span",{staticClass:"line-number"},[t._v("15")]),e("br"),e("span",{staticClass:"line-number"},[t._v("16")]),e("br")])]),e("p",[t._v("从上面的例子中可以看出：MIME的基本格式是")]),t._v(" "),e("blockquote",[e("p",[t._v("大类/具体类型")])]),t._v(" "),e("p",[t._v("MIME类型在HTTP报文中对应的是内容类型：Content-type")]),t._v(" "),e("h2",{attrs:{id:"_5、响应报文"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5、响应报文"}},[t._v("#")]),t._v(" 5、响应报文")]),t._v(" "),e("p",[e("img",{attrs:{src:s(656),alt:"./images"}})]),t._v(" "),e("h3",{attrs:{id:"_1响应状态行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1响应状态行"}},[t._v("#")]),t._v(" ①响应状态行")]),t._v(" "),e("blockquote",[e("p",[t._v("HTTP/1.1 200 OK")])]),t._v(" "),e("ul",[e("li",[t._v("HTTP协议版本")]),t._v(" "),e("li",[e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("响应状态码")])]),t._v(" "),e("li",[t._v("响应状态的说明文字")])]),t._v(" "),e("h3",{attrs:{id:"_2响应消息头"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2响应消息头"}},[t._v("#")]),t._v(" ②响应消息头")]),t._v(" "),e("ul",[e("li",[t._v("响应体的说明书。")]),t._v(" "),e("li",[t._v("服务器端对浏览器端设置数据，例如：服务器端返回Cookie信息。")])]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("名称")]),t._v(" "),e("th",[t._v("功能")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("Content-Type")]),t._v(" "),e("td",[t._v("响应体的内容类型")])]),t._v(" "),e("tr",[e("td",[t._v("Content-Length")]),t._v(" "),e("td",[t._v("响应体的内容长度")])]),t._v(" "),e("tr",[e("td",[t._v("Set-Cookie")]),t._v(" "),e("td",[t._v("服务器返回新的Cookie信息给浏览器")])]),t._v(" "),e("tr",[e("td",[t._v("location")]),t._v(" "),e("td",[t._v("在"),e("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("重定向")]),t._v("的情况下，告诉浏览器访问下一个资源的地址")])])])]),t._v(" "),e("h3",{attrs:{id:"_3响应体"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3响应体"}},[t._v("#")]),t._v(" ③响应体")]),t._v(" "),e("p",[t._v("服务器返回的数据主体，有可能是各种数据类型。")]),t._v(" "),e("ul",[e("li",[t._v("HTML页面")]),t._v(" "),e("li",[t._v("图片")]),t._v(" "),e("li",[t._v("视频")]),t._v(" "),e("li",[t._v("以下载形式返回的文件")]),t._v(" "),e("li",[t._v("CSS文件")]),t._v(" "),e("li",[t._v("JavaScript文件")])]),t._v(" "),e("h3",{attrs:{id:"_4响应状态码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4响应状态码"}},[t._v("#")]),t._v(" ④响应状态码")]),t._v(" "),e("p",[t._v("作用：以编码的形式告诉浏览器当前请求处理的结果")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("状态码")]),t._v(" "),e("th",[t._v("含义")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("200")]),t._v(" "),e("td",[t._v("服务器成功处理了当前请求，成功返回响应")])]),t._v(" "),e("tr",[e("td",[t._v("302")]),t._v(" "),e("td",[t._v("重定向")])]),t._v(" "),e("tr",[e("td",[t._v("400")]),t._v(" "),e("td",[t._v("[SpringMVC特定环境]请求参数问题")])]),t._v(" "),e("tr",[e("td",[t._v("403")]),t._v(" "),e("td",[t._v("没有权限")])]),t._v(" "),e("tr",[e("td",[t._v("404")]),t._v(" "),e("td",[t._v("找不到目标资源")])]),t._v(" "),e("tr",[e("td",[t._v("405")]),t._v(" "),e("td",[t._v("请求方式和服务器端对应的处理方式不一致")])]),t._v(" "),e("tr",[e("td",[t._v("406")]),t._v(" "),e("td",[t._v("[SpringMVC特定环境]请求扩展名和实际返回的响应体类型不一致")])]),t._v(" "),e("tr",[e("td",[t._v("50X")]),t._v(" "),e("td",[t._v("服务器端内部错误，通常都是服务器端抛异常了")])])])]),t._v(" "),e("p",[t._v("404产生的具体原因：")]),t._v(" "),e("ul",[e("li",[t._v("访问地址写错了，确实是没有这个资源")]),t._v(" "),e("li",[t._v("访问了WEB-INF目录下的资源")]),t._v(" "),e("li",[t._v("Web应用启动的时候，控制台已经抛出异常，导致整个Web应用不可用，访问任何资源都是404")]),t._v(" "),e("li",[t._v("服务器端缓存")])]),t._v(" "),e("p",[e("RouterLink",{attrs:{to:"/pro001-javaweb/lecture/chapter05/index.html"}},[t._v("上一章")]),t._v(" "),e("RouterLink",{attrs:{to:"/pro001-javaweb/lecture/index.html"}},[t._v("回目录")]),t._v(" "),e("RouterLink",{attrs:{to:"/pro001-javaweb/lecture/chapter07/index.html"}},[t._v("下一章")])],1)])}),[],!1,null,null,null);a.default=n.exports},652:function(t,a){t.exports="data:image/png;base64,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"},653:function(t,a,s){t.exports=s.p+"assets/img/img002.16e080e9.png"},654:function(t,a){t.exports="data:image/png;base64,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"},655:function(t,a,s){t.exports=s.p+"assets/img/img005.35d6260c.png"},656:function(t,a,s){t.exports=s.p+"assets/img/img007.a6ab27cd.png"}}]);