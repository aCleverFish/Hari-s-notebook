

# Jeecg-Boot开发

## 目录结构

```
项目结构
├─jeecg-boot-parent（父POM： 项目依赖、modules组织）
│  ├─jeecg-boot-base-core（共通模块： 工具类、config、权限、查询过滤器、注解等）
│  ├─jeecg-module-demo    示例代码
│  ├─jeecg-module-system  System系统管理目录
│  │  ├─jeecg-system-biz    System系统管理权限等功能
│  │  ├─jeecg-system-start  System单体启动项目(8080）
│  │  ├─jeecg-system-api    System系统管理模块对外api
│  │  │  ├─jeecg-system-cloud-api   System模块对外提供的微服务接口
│  │  │  ├─jeecg-system-local-api   System模块对外提供的单体接口
│  ├─jeecg-server-cloud           --微服务模块
     ├─jeecg-cloud-gateway       --微服务网关模块(9999)
     ├─jeecg-cloud-nacos       --Nacos服务模块(8848)
     ├─jeecg-system-cloud-start  --System微服务启动项目(7001)
     ├─jeecg-demo-cloud-start    --Demo微服务启动项目(7002)
     ├─jeecg-visual
        ├─jeecg-cloud-monitor       --微服务监控模块 (9111)
        ├─jeecg-cloud-xxljob        --微服务xxljob定时任务服务端 (9080)
        ├─jeecg-cloud-sentinel     --sentinel服务端 (9000)
        ├─jeecg-cloud-test           -- 微服务测试示例（各种例子）
           ├─jeecg-cloud-test-more         -- 微服务测试示例（feign、熔断降级、xxljob、分布式锁）
           ├─jeecg-cloud-test-rabbitmq     -- 微服务测试示例（rabbitmq）
           ├─jeecg-cloud-test-seata          -- 微服务测试示例（seata分布式事务）
           ├─jeecg-cloud-test-shardingsphere    -- 微服务测试示例（分库分表）
```



## Online表单开发

### 表单配置

#### **主参数说明**

| 配置             | 配置说明                                                     |
| :--------------- | :----------------------------------------------------------- |
| 表名             | 数据库表名                                                   |
| 表描述           | 数据库表描述                                                 |
| 表类型           | 表的模型，分单表、一对多、树                                 |
| 表单分类         | 区分表种类的（不重要）                                       |
| 主键策略         | 主键策略：UUID/NATIVE(自增)/SEQUENCE（适合oracle）此处暂时统一使用UUID |
| PC表单风格       | PC端，表单添加页面和修改页面的风格 分为1/2/3/4列展示         |
| 查询模式         | 暂时系统内置为多字段查询                                     |
| 显示复选框       | 生成的表单数据列表，是否带着checkbox 系统内置为是            |
| 是否分页         | 生成的表单数据列表，是否分页展示 系统内置为是                |
| 是否树:          | 控制表单类型，树类型表单需要选择是                           |
| 树形表单父id     | 树类型表单，用于控制上下级父子关系字段                       |
| 是否有子节点字段 | 树类型表单，用于控制树节点是否能展开                         |
| 树开表单列       | 树类型表单，列表页面用于折叠展示的字段                       |

#### 	一对一单表

- 新建online表单

​	![1](E:\工作项目\jeecgboot笔记\pic\1.PNG)

- 表类型选择单表

![2](E:\工作项目\jeecgboot笔记\pic\2.PNG)

单表对应一对一关系，即只会在数据库中生成一张表

- 填写相应字段属性

![3](E:\工作项目\jeecgboot笔记\pic\3.PNG)

- 配置页面字段属性

![4](E:\工作项目\jeecgboot笔记\pic\4.PNG)

> **补充说明**
>
> 在页面属性栏可以自行配置该字段的控件类型
>
> 添加是否对该字段进行查询
>
> 可以对控件默认值进行一个配置
>
> 扩展参数、自定义转换器单独详解

- 校验字段配置

![5](E:\工作项目\jeecgboot笔记\pic\5.PNG)

对于一些需要校验的字段可以单独配置，其中可自定义校验规则，也可以使用已定义校验规则

![6](E:\工作项目\jeecgboot笔记\pic\6.png)

对于需要校验的字段可以预先自定义配置字典![7](E:\工作项目\jeecgboot笔记\pic\7.png)

在查询配置中，也可以对查询项进行预定义查询

![8](E:\工作项目\jeecgboot笔记\pic\8.png)

保存后，可以点击更多-》功能测试，进行功能预览

![9](E:\工作项目\jeecgboot笔记\pic\9.png)

预览情况如下，其中包括已配置好的查询栏界面，导入、导出按钮

![10](E:\工作项目\jeecgboot笔记\pic\10.png)

可对单条数据进行新增、编辑、查看详情

![11](E:\工作项目\jeecgboot笔记\pic\11.png)

#### 一对多单表

一对多表单与一对一表单设计基本一致，区别在于在定义表类型时**需要先新建一张主表，再新建附表，实现表的嵌套**

新建主表、选择主表

![13](E:\工作项目\jeecgboot笔记\pic\13.png)

新建附表、附表选择一对多，同时可以设计附表的展示序号

![14](E:\工作项目\jeecgboot笔记\pic\14.png)



**在设置主表时**，需要定义一个字段作为附表的外键与附表进行关联

​	此例中，以order_number作为主表的

![12](E:\工作项目\jeecgboot笔记\pic\12.PNG)

**在设置附表时**，需要定义与主表预设外键字段名称相同的字段，并在外键选项中配置

![15](E:\工作项目\jeecgboot笔记\pic\15.png)

主表和附表配置好后，可以点击功能测试查看结果

![16](E:\工作项目\jeecgboot笔记\pic\16.png)

#### 树形结构表单

- 新建树形结构表单，表单类型选择单表，在下面选项配置选项

> 是否为树：是
>
> 树表单父ID：作为表单id的字段（pid）
>
> 树开表单列：作为树开字段的名称

![17](E:\工作项目\jeecgboot笔记\pic\17.png)



![18](E:\工作项目\jeecgboot笔记\pic\18.png)

> **设置树结构排序规则**
>
> ​	在扩展参数中设置：{"orderRule": "asc"}
>
> ![19](E:\工作项目\jeecgboot笔记\pic\19.png)

支持多个字段，多个字段即`order by field_axx, field_bxx`

如不勾选字段，online列表查询默认以id倒序排

- 结果

![20](E:\工作项目\jeecgboot笔记\pic\20.png)

#### 联合查询配置

Online表单**主表**支持配置是否联合查询

在未配置时，默认只能查询主表字段

![23](E:\工作项目\jeecgboot笔记\pic\23.png)

启用联合查询后，主子表查询字段都遵循规则：列表显示 勾选即查询

即可以配置子表字段是否列表显示从而控制字段是否被查询

也就是说，在配置好主表和附表后，开启主表的启用联合查询，即可在所有表的配置页面勾选列表显示，进行联合查询的字段展示

**注意**

> 若主表设置为一对多主题，无法开启联合查询

![24](E:\工作项目\jeecgboot笔记\pic\24.png)

结果：展示结果为在主表中可以查询到子表的字段值并展示

![25](E:\工作项目\jeecgboot笔记\pic\25.png)

#### 菜单配置

在我们设置好每个菜单中的子功能后，需要创建菜单并进行配置

- 在菜单管理部分点击新增菜单

![21](E:\工作项目\jeecgboot笔记\pic\21.png)

- 新增一级菜单

![22](E:\工作项目\jeecgboot笔记\pic\22.png)

1.进入菜单【在线开发】-->【online表单开发】，找到需要配置成菜单的表单记录，[更多]->[配置地址]，复制地址
 2.进入菜单【系统管理】-->【菜单管理】 新增菜单

> - 名称，自定义
> - 上级菜单，自定义
> - 菜单路径，填写上述复制地址
> - 前端组件，自定义，不要重复
> - **是否路由菜单** 一定要设置成否

3.进入菜单【系统管理】 -->【角色管理】,确定自己用户对应的角色，在该角色上操作：[更多] -->[授权] 勾选配置的菜单保存，刷新页面重新加载菜单即可访问。

**注意**

1.进入菜单【在线开发】-->【online表单开发】，找到需要配置成菜单的表单记录，[更多]->[配置地址]，复制地址
 2.进入菜单【系统管理】-->【菜单管理】 新增菜单

> - 名称，自定义
> - 上级菜单，自定义
> - 菜单路径，填写上述复制地址
> - 前端组件，自定义，不要重复
> - **是否路由菜单** 一定要设置成否

3.进入菜单【系统管理】 -->【角色管理】,确定自己用户对应的角色，在该角色上操作：[更多] -->[授权] 勾选配置的菜单保存，刷新页面重新加载菜单即可访问。



### 表单控件配置

#### 下拉框（单选/多选）

字典用法：表单字段，通过配置系统字典或者表字典，实现下拉、Checkbox、Radio等效果。
支持模型： 系统字典 和表字典（通过数据库表的配置）——不支持popup

- 1.先需要配置数据字典

系统管理—》数据字典

![26](E:\工作项目\jeecgboot笔记\pic\26.png)

- 2.编辑字典项

![27](E:\工作项目\jeecgboot笔记\pic\27.png)

- 3.在对应的字段下拉框中对字典值进行配置

![28](E:\工作项目\jeecgboot笔记\pic\28.png)

这里的字典code和配置的字典中的编码一样

![29](E:\工作项目\jeecgboot笔记\pic\29.png)

在查询框中也可以进行查询字段的配置，同时可以预设默认值

#### 下拉多选

实现功能： 表单字段，通过系统配置字典，展示下拉，支持多选
支持模型: 支持系统数据字典和表字典（不支持popup）

- 配置控件类型

![30](E:\工作项目\jeecgboot笔记\pic\30.png)

- 配置字典

![31](E:\工作项目\jeecgboot笔记\pic\31.png)

- 结果

![image-20221102100311087](C:\Users\601725\AppData\Roaming\Typora\typora-user-images\image-20221102100311087.png)

- 通过表字典进行配置

![image-20221102102550068](C:\Users\601725\AppData\Roaming\Typora\typora-user-images\image-20221102102550068.png)

![34](E:\工作项目\jeecgboot笔记\pic\34.png)

在需要配置下拉多选框的校验字段处，配置自定义查询的字段值

其中

> 字典Table：填写筛选的sql语句，order_main 为表名
>
> 字典Code：填写需要筛选的表的一个字段值，其中 order_number 为对应查出来要作为字典value的字段值
>
> 字典Text：填写需要筛选的表的一个字段值，其中order_name 为对应查出来要作为字典Text的字段值
>
> 同时可以对这张表做复杂筛选

#### popup控件

使用pop控件时，pop的选择框依赖于Online报表

- 1.在使用pop控件之前先创建一个Online报表来提供数据列表的数据集

![36](E:\工作项目\jeecgboot笔记\pic\36.png)



![35](E:\工作项目\jeecgboot笔记\pic\35.png)

这里的报表sql可以使用sql语句查询出原始的报表，==点击SQL解析==可以自动解析出你sql语句中所查询出来的字段，就不需要手动添加输入了

以这张报表为基础为pop栏提供数据源

- 2.选择控件类型为popup弹出框

![37](E:\工作项目\jeecgboot笔记\pic\37.png)

新建需要使用到popup控件的字段

- 3.在校验字段上上进行字段的配置

字典Table、字典Code、字典Text项填写对应的Online报表信息

> 字典Table : 填写Online报表编码
> 字典Code:  填写Online报表中的字段名（多个逗号隔开）
> 字典Text:   填写表单中字段名 （多个逗号隔开）
> 如下设置：
> 把报表user_msg查出的字段 realname,username 选择后分别写入表单中popupok和popback

![38](E:\工作项目\jeecgboot笔记\pic\38.png)

注意这里的填写规则和从数据库生成表单不同，这里字典table填写的是新建的online报表的报表编码

字典code填写的是从数据库中查询出来的字段，字典Text填写的是所需要映射到的字段

- 效果展示

![39](E:\工作项目\jeecgboot笔记\pic\39.png)

​	pop弹出框

​	![40](E:\工作项目\jeecgboot笔记\pic\40.png)

选择后数据带入表单

![41](E:\工作项目\jeecgboot笔记\pic\41.png)

#### 分类字典树控件

**简述：**
1.分类字典树控件是基于 系统表分类字典设计的，为online提供一个树控件，用于选择分类字典的数据。
2.分类字典的数据维护见菜单【系统管理】-->【分类字典】：

![42](E:\工作项目\jeecgboot笔记\pic\42.png)

**使用：**

（有两种类型，用户请根据自己需求不同场景采用适用的方法）

- 一、只保存ID，列表及表单回显数据需要系统翻译，适用于小数据量，可保证当前表数据及分类字典表数据一致。

  online配置：

![43](E:\工作项目\jeecgboot笔记\pic\43.png)

​		此方案需要配置字典code的值，该值实际是分类字典的**类型编码**，此处配置成B01即表示当前这个树控件，只加载B01节点以下的数据

- 演示

![44](E:\工作项目\jeecgboot笔记\pic\44.png)

- 二、保存ID和text ，列表及表单展示text，适用于大数据量，但是若分类字典表数据text被修改，当前表则难以保证数据一致性

  第一步同上，在分类字典中先建立好分类

  第二步，页面属性配置控件类型

  ![45](E:\工作项目\jeecgboot笔记\pic\45.png)

  ​	此方法，

  > 数据库属性配置两个字段，一个存储树text一个存储树id
  >
  > 页面属性配置成分类字典树，列表表单显示，text为文本框，列表表单不显示

  ​	注意分类字典存储所在的表为sys_category，如图

  ​	![47](E:\工作项目\jeecgboot笔记\pic\47.png)

  第三步，校验字段配置字典

  ![46](E:\工作项目\jeecgboot笔记\pic\46.png)

  这里需注意：

  > 字典code配置成分类字典的**类型编码**，同一；字典text配置存储树text字段的名称

  这样当我们在tree_control该字段添加完分类值后，tree_controll字段存储的是分类字典的id，tree_text存储的是分类字典该分类项的名称

  数据库存储如下：

  ![48](E:\工作项目\jeecgboot笔记\pic\48.png)

	#### 自定义树控件

- 1.页面属性配置控件类型

- 2.校验字段配置字典

  ![49](E:\工作项目\jeecgboot笔记\pic\49.png)

备注：
1、字典table 填写树控件对应的表名 { 例如：sys_category }
2、字典code填写树控件根节点的父ID的值，不填则为空
3、字典text填写4个表字段的名称，以逗号隔开，依次是：**ID列,父ID列,显示列,是否有子节点列** { 例如：id,pid,name,has_child}

> 字段顺序解释说明：
> a. ID列和PID列用于记录数据的父子关系，且ID列是该树控件最终保存到数据库的值
> b. 显示列表示树控件展示的数据，
> c. 是否有子节点列是树形表需要的特例列，详细看 online表单树形表单开发 ，该列为字符串类型系统默认1为是 0为否，不支持其他数据格式。

- 3.演示
  ![50](E:\工作项目\jeecgboot笔记\pic\50.png)



#### 	下拉联动

例如：省市区的三级联动下拉选择框

**首先**，联动组件的数据来源需要有相应的层级关系 ，如 ：新建一张表`test_online_link`，数据如下：

| id   | pid  | name   |
| :--- | :--- | :----- |
| 1    |      | 中国   |
| 2    | 1    | 山东省 |
| 3    | 2    | 济南市 |
| 4    | 3    | 历城区 |
| 5    | 3    | 长青区 |
| 6    | 2    | 青岛市 |
| 7    | 1    | 安徽省 |
| 8    | 7    | 合肥市 |
| 9    | 8    | 包河区 |
| 10   | 8    | 庐阳区 |
| 11   | 7    | 黄山市 |

- online配置

> 新增字段，province，city，area
> 在级联下拉的第一个字段province上配置，
> 页面属性 -----> 控件类型 -----> 联动组件
> 校验字段 ----> 字典table --->配置json，格式如下

对照数据库表结构来看：

![55](E:\工作项目\jeecgboot笔记\pic\55.png)

```json
{
	table: "sys_test_link",
	txt: "name",
	key: "id",
	linkField: "city,area",
	idField: "id",
	pidField: "pid",
	condition:"pid = '1'"
}
```

配置描述：

| 名称      | 描述                                           |
| :-------- | :--------------------------------------------- |
| table     | 数据库表名                                     |
| txt       | 控件显示的值                                   |
| key       | 控件需要存储的值                               |
| linkField | 级联组件的其他字段名称，上例配置了市，区字段名 |
| idField   | 数据的标识                                     |
| pidField  | 上下级关系的表示字段                           |
| condition | 联动组件 第一个下拉框的数据查询条件            |

**示例**

- 1.配置三个字段

![52](E:\工作项目\jeecgboot笔记\pic\52.png)

- 2.配置第一个为联动控件

![53](E:\工作项目\jeecgboot笔记\pic\53.png)

- 3.配置联动参数

```json
{
	table: "sys_test_link",
	txt: "name",
	key: "id",
	linkField: "city,area",
	idField: "id",
	pidField: "pid",
	condition: "pid= '1'"
}
```

- 测试效果

![54](E:\工作项目\jeecgboot笔记\pic\54.png)

#### 开关控件

用于场景：只有两个选项且只能选一个
默认选项值： Y/N (即数据库字段存储为Y或N)

![56](E:\工作项目\jeecgboot笔记\pic\56.png)

配置注意：

- 控件类型选择：开关
- 扩展参数：如果不想使用默认的选项值(Y/N)保存到数据库，支持自定义,配置一个数组即可,

例如：配置数组 `[1,2]` 则第一个参数(1)对应是，第二个参数(2) 对应否 那么保存在数据库的字段值为1/2

在开关的使用时，包括一对一子表、一对多子表可以使用

#### 控件配置href

- 效果演示

配置了href的字段将会显示为超链接，可以跳转至你配置的界面，如图

![59](E:\工作项目\jeecgboot笔记\pic\59.png)

- 配置位置

  Online表单

![61](E:\工作项目\jeecgboot笔记\pic\61.png)

​	  Online报表

![62](E:\工作项目\jeecgboot笔记\pic\62.png)

- 配置方式

  直接在输入框里输入你要跳转的地址即可，可以传递参数，目前支持三种跳转方式，分别为

1. http或https链接跳转

2. 路由(router)地址跳转

3. 内部组件跳转

   **配置实例：http或https链接跳转**

   假如说我想跳转到百度页面，可以在字段href里填写 `https://www.baidu.com`，注意，开头的`http`或`https`一定要填写，如果不填就会被识别成“路由地址跳转”。

   **配置实例：路由(router)地址跳转**

   假如说我想跳转到菜单里配置的某个页面，就输入该菜单的路径即可
   比如首页的路径为`/dashboard/analysis`
   那么只需填写到输入框里即可

   **内部组件跳转、详见文档**

 #### 字段校验规则

在设定表字段时，可以对字段的检验设置正则表达式即可，同时它也预设了一些正则表达式，这些可以在系统校验规则中预设置

![63](E:\工作项目\jeecgboot笔记\pic\63.png)

### 开发增强

#### 	自定义按钮

- 1.功能简述：
  	通过自定义按钮功能，可以为智能表单列表添加按钮，实现扩展功能。

> 自定义按钮是在线开发概念，不支持代码生成器生成。

- 2.操作步骤：

  ![64](E:\工作项目\jeecgboot笔记\pic\64.png)

  注意在新建按钮时需要：先选中一张表，再进行自定义按钮的创建

  ![65](E:\工作项目\jeecgboot笔记\pic\65.png)

- 新建按钮配置

  ![66](E:\工作项目\jeecgboot笔记\pic\66.png)

  **注意**

  这个部分的按钮，分为不同样式，对于样式设置不同，按钮显示在不同的位置

  按钮配置说明（很重要）

  > 按钮编码：该编码在一个智能表单配置中唯一，同时js增强中定义的函数名和该编码的值需要保持一致(详见js增强描述)
  > 按钮名称：按钮上面显示的文本.

  > 按钮样式：可选button/link/form。
  > button:即生成的按钮显示在导航工具栏上；
  > link:显示在每一条数据的操作列。
  >
  > form:显示在编辑/查看该条数据的表单内部
  >
  > ​	其中选择在form表单的按钮样式后，又可选择侧面和底部
  >
  > ​	![68](E:\工作项目\jeecgboot笔记\pic\68.png)

  > 动作类型：可选action/js。
  > action:该按钮会触发通用入口，挂接到SQL增强上（前提是SQL增强配置中配置了按钮编码对应的sql语句）。

#### sql增强

​		![69](E:\工作项目\jeecgboot笔记\pic\69.png)

​	对于action类型按钮会激活sql增强

​	在这里sql增强执行的是

```sql
update material_category set category_name = 'sql增强' where id = '#{id}'
```

​	点击按钮

​	即可执行表sql增强中自定义的sql语句，在这里表示的意思是，点击自定义按钮后，将物料类别表的名称修改为sql增强

> **注意**
>
> 1.这里选择的按钮一定要是按钮类型是action的,因为js类型的是走的js增强，而按钮样式未作限制
> 2.这边我将按钮点击后触发的sql定义为,修改demo表的性别字段为1
> 3.#{id}是一种规范,id可以是任何当前表中的字段名
> 4.如果数据库定义的字段是数值类型的，这边是不需要加单引号('')的
> 5.sqlServer数据库插入修改sql遇到中文乱码时，需在sql前加N
> 例1：insert into test_one2 (id,username,sex) values('1',N'大王巡山','1')
> 例2：update test_one2 set name=N'张三' where id=N'#{id}'

- sql增强中可以定义系统变量(如下)

| 变量名称         | 变量释义                   |
| :--------------- | :------------------------- |
| #{sys_user_code} | 登陆用户的账号名           |
| #{sys_org_code}  | 登陆用户所属机构编码       |
| #{sys_date}      | 系统日期"yyyy-MM-dd"       |
| #{sys_time}      | 系统时间"yyyy-MM-dd HH:mm" |
| #{sys_user_name} | 登录用户真实姓名           |

示例SQL： update demo set content= '#{sys_user_name}' where id = '#{id}' (设置个人简介的内容为当前用户真实姓名)

**注意：**

上述增强sql中取表单的值（如`#{id}`）和取系统变量的值(如`#{sys_user_code}`)用的都是#{},如果两者的参数名相同，以表单的值为准，若表单中未取到,会从系统变量中取值

#### js增强

所谓JS增强，即通过在线编写JS脚本实现表单动态效果。
通过按钮触发事件、或绑定内置钩子函数，或监听表单字段改变事件来触发JS代码。

> JS增强是在线开发概念，不支持代码生成器生成。

![70](E:\工作项目\jeecgboot笔记\pic\70.png)

录入自定义的js代码，选择类型 `form(表单)`/`list(列表)` 点击确定保存

![71](E:\工作项目\jeecgboot笔记\pic\71.png)



```
buttonOne(){
  console.log('列表上方按钮点击获取选中行id',that.table.selectedRowKeys);
}
linkButtonTest(row){
  console.log('操作列按钮点击获取当前行数据', row)
}
beforeDelete(row){
  console.log('删除数据之前执行', row)
}
```

##### 配置说明

- js增强方法定义：不要使用function test(){}的形式 ,一律使用funname(){}的形式
- 如果方法需要绑定`自定义按钮`，请先创建`自定义按钮`
- js增强方法名规范：方法名唯一,需要和自定义按钮的buttonCode保持一致，如上述代码`buttonOne`，`linkButtonTest`,或者遵循内置方法名（如下列表 ）

| 列表JS增强方法名 | 描述                                                         |
| :--------------- | :----------------------------------------------------------- |
| beforeAdd        | 在新增之前调用,后续扩展after方法                             |
| beforeEdit       | 在编辑之前调用,该方法可以携带一个参数row，表示当前记录，后续扩展after方法 |
| beforeDelete     | 在删除之前调用,该方法可以携带一个参数row，表示当前记录,后续扩展after方法 |
| created          | 在对应页面vue钩子函数created中调用                           |

| 表单JS增强方法名 | 描述                                                      |
| :--------------- | :-------------------------------------------------------- |
| loaded           | 表单数据加载完成后触发 （支持获取表单数据）               |
| beforeSubmit     | 表单数据提交之前 [详细文档](http://doc.jeecg.com/2061290) |

- js增强关键字：在任意方法内，可使用that关键字,该关键字指向当前页面的vue实例,那就意味着可以用that调用任何当前页面的实例方法/属性,如加载数据that.loadData(),获取查询对象that.queryParam或是that.getQueryParams()等等。
- js增强中发起后台请求： 和前端开发保持一致,使用`postAction`,`getAction`,`deleteAction`(参考下例)

备注：
什么情况下定义的js增强方法会携带参数row？js增强最终还是挂载在按钮上或是挂在vue钩子函数中，我们列表按钮按按钮样式划分有两种,一种在列表上方，一种在列表操作列下，在操作列下的按钮，其对应的方法都会携带一个参数row,指向当前行记录，如上述示例linkButtonTest方法。

##### 示例

1.后台定义请求方法

![74](E:\工作项目\jeecgboot笔记\pic\74.png)

2.定义js增强（此处是直接在created中发起了一个请求）

![73](E:\工作项目\jeecgboot笔记\pic\73.png)

3.测试页面如下

![75](E:\工作项目\jeecgboot笔记\pic\75.png)

4.后台接收参数

![76](E:\工作项目\jeecgboot笔记\pic\76.png)

更详细可见JS文档增强

#### Java增强

1.功能简述：

> 通过Java增强可在表单的增加、修改、和删除数据时实现额外的功能，类似spring中的AOP切面编程。
> 可实现的功能：
> 1、添加数据库之前，对数据进行校验，不通过的话，通过抛出异常即可。
> 2、添加数据库之前，对数据进行处理、转换值等。
> 3、进行其他业务逻辑代码。

**可使用Java增强的部分**

导入、导出、查询

##### 导入

> online导入数据 可以通过配置 java增强判断 每一条数据是新增还是修改还是丢弃·

**定义java类：**

```java
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.jeecg.modules.online.cgform.enhance.CgformEnhanceJavaImportInter;
import org.jeecg.modules.online.cgform.util.CgformUtil;
import org.jeecg.modules.online.config.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.jeecg.modules.online.cgform.enums.EnhanceDataEnum;

/**
 * Excel导入增强，针对导入数据进行check或者数据转换
 */
@Slf4j
@Component("cgformEnhanceImportDemo")
public class CgformEnhanceImportDemo implements CgformEnhanceJavaImportInter{

   /**
    * 这个testService是自定义的 用于查询数据
    */
   @Autowired
   private TestService testService;

   @Override
   public EnhanceDataEnum execute(String tableName, JSONObject json) throws BusinessException {
      // 从json中获取excel里面的数据
      String name = json.getString("name");
      if(name==null || "".equals(name)){
         // 常量值为：0 表示丢弃数据
         return EnhanceDataEnum.ABANDON;
      }

      // 拿到excel中的name 去数据库查询
      Demo demo = testService.getDataByName(name);
      if(demo!=null){
         // 假定这个name是demo表的唯一标识，那么如果excel中的name 在数据库中已经存在，则根据excel中的数据走修改逻辑
         // 修改逻辑需要设置原数据的ID
         json.put("id", demo.getId());
         // 常量值为：2 表示需要走修改逻辑
         return EnhanceDataEnum.UPDATE;
      }

      // 常量值为：1 表示走新增逻辑
      return EnhanceDataEnum.INSERT;
   }

}
```

**增强配置：**

![77](E:\工作项目\jeecgboot笔记\pic\77.png)

> 注：version3.0之后，java增强-导入不需要配置事件状态(开始/结束)，且不支持http-api

**导入增强总结：**

- 1.java类实现接口`CgformEnhanceJavaImportInter`
- 2.重写方法`execute`
- 3.方法返回一个枚举，返回值说明如下：

```
// return EnhanceDataEnum.ABANDON = 丢弃
// return EnhanceDataEnum.INSERT = 新增
// return EnhanceDataEnum.UPDATE = 修改
```



##### 导出

**功能描述：**

> online导出数据 可以通过配置 java增强**修改导出的数据**，e.g.数据库存的是编码，导出excel需要展示具体的名称，这个时候就可以使用导出增强。

**定义java类：**

```java
import lombok.extern.slf4j.Slf4j;
import org.jeecg.modules.online.cgform.enhance.CgformEnhanceJavaListInter;
import org.jeecg.modules.online.config.exception.BusinessException;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;

/**
 * Excel导出增强简单示例-数据转换
 */
@Slf4j
@Component("cgformEnhanceExportDemo")
public class CgformEnhanceExportDemo implements CgformEnhanceJavaListInter {

    @Override
    public void execute(String tableName, List<Map<String, Object>> data) throws BusinessException {
        for (Map<String, Object> map : data) {
            // 获取项目名称字段的值
            Object projectName = map.get("project_name");
            if(projectName!=null){
                // 满足一定的条件 将值替换成自定义的格式
                if(projectName.toString().equalsIgnoreCase("abc")){
                    map.put("project_name", "这是字母abc");
                }else if(projectName.toString().equalsIgnoreCase("123")){
                    map.put("project_name", "这是数字123");
                }
            }
        }
    }
}
```

> 注：java增强-导出，需要实现的接口是：CgformEnhanceJavaListInter与常规的JAVA增强不同。

**增强配置**

![img](https://img.kancloud.cn/d1/37/d1370bc5a0a02cf28003f96169797777_787x356.png)

**效果展示：**

- 访问online表数据
  ![img](https://img.kancloud.cn/67/b6/67b640b9ba77ba91381c8c97c91a1f8b_1608x357.png)
- 导出excel数据显示如下：
  ![img](https://img.kancloud.cn/57/29/57290cad6fc9e2c7eedfe8c549d5faef_552x335.png)

**导出增强总结：**

- 1.java类实现接口`CgformEnhanceJavaListInter`
- 2.重写方法`execute`

##### 查询

**功能描述：**

> online列表查询数据 可以通过配置 java增强 修改最终需要展示的数据

**定义java类：**

```java
import org.jeecg.modules.online.cgform.enhance.CgformEnhanceJavaListInter;
import org.jeecg.modules.online.config.exception.BusinessException;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component("cgformEnhanceQueryDemo")
public class CgformEnhanceQueryDemo implements CgformEnhanceJavaListInter {

   @Override
   public void execute(String tableName, List<Map<String, Object>> data) throws BusinessException {
      List<VirtualDict> dict = virtualDictData();
      for (Map<String, Object> map : data) {
         Object db = map.get("province");
         if(db==null){
            continue;
         }
         String text = dict.stream()
               .filter(p -> db.toString().equals(p.getValue()))
               .map(VirtualDict::getText)
               .findAny()
               .orElse("");
         map.put("province",text);
      }
   }

   /**
    * 模拟字典数据
    * @return
    */
   private List<VirtualDict> virtualDictData(){
      List<VirtualDict> dict = new ArrayList<VirtualDict>();
      dict.add(new VirtualDict("bj","北京"));
      dict.add(new VirtualDict("sd","山东"));
      dict.add(new VirtualDict("ah","安徽"));
      return dict;
   }

   class VirtualDict {
      String value;
      String text;

      public VirtualDict(String value,String text){
         this.value = value;
         this.text = text;
      }

      public String getValue(){
         return value;
      }


      public String getText(){
         return text;
      }
   }
}
```

> 注：java增强导出，需要实现的接口是：CgformEnhanceJavaListInter与常规的JAVA增强不同。

**增强配置**

![78](E:\工作项目\jeecgboot笔记\pic\78.png)

**效果展示：**

- 没有配置增强之前，访问online表数据
  ![79](E:\工作项目\jeecgboot笔记\pic\79.png)
- 配置增强之后，访问online表数据
  ![80](E:\工作项目\jeecgboot笔记\pic\80.png)

**查询增强总结：**

- 1.java类实现接口`CgformEnhanceJavaListInter`
- 2.重写方法`execute`

























































