# Java技术储备（2022-10-12）

## SpringBoot项目配置Swagger（10.13）

### 1.引入依赖

在SpringBoot项目的pom.xml中引入Swagger3依赖：

```xml
<!-- Swagger3 -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

对于版本3.0.0只需要引入以上一个依赖即可

### 2. 编写application.properties/application.yaml文件

**application.properties**

```properties
# 生产环境需设置为false
springfox.documentation.swagger-ui.enabled=true
```

**application.yaml**

```yaml
# 生产环境需设置为false
springfox:
  documentation:
    swagger-ui:
      enabled: true
```

### 3.创建配置类

通过`@EnableOpenApi`注解启动`Swagger`的使用，同时在配置类中对Swagger的通用参数进行配置。

```java
@Bean
    public Docket createRestApi() {
        //返回文档概要信息
        return new Docket(DocumentationType.OAS_30)//这里DocumentationType.OAS_30配置的是swagger3.0)
                .apiInfo(apiInfo())
                .select()
                //⭐这里制指定swagger解析的包的路径，注意需要配置到自己的controller所在的包
                .apis(RequestHandlerSelectors.basePackage("com.gree.FirstDemo.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    /*
    生成接口信息，包括标题，联系人等
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("在此处填写文档标题 - Swagger3接口文档")
                .description("在此处填写文档描述")
            	//这里添加联系人、网址、邮箱
                .contact(new Contact("张三","http://www.baidu.com","baidu@qq.com"))
            	//版本号
                .version("1.0")
                .build();
    }
```

### 4.在业务逻辑中使用范例

![swagger配置详细信息](E:\Notes\JavaNotes\Java技术储备\Java技术储备\swagger配置详细信息.png)

**响应对象** 养护标准模型

```java
package com.gree.FirstDemo.domain.entity;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
@Data
@ApiModel("养护标准模型")
public class MaintainStandardNew {
    /**
    * 养护标准编号
    */
    @ApiModelProperty("养护标准编号")
    private String maintainStandardId;
    /**
    * 养护标准名称
    */
    @ApiModelProperty("养护标准名称")
    private String maintainStandardName;
    /**
    * 养护标准文档
    */
    @ApiModelProperty("养护标准文档")
    private String standardDocument;
    /**
    * 标准创建人
    */
    @ApiModelProperty("标准创建人")
    private String creator;
    /**
    * 养护标准要求
    */
    @ApiModelProperty("养护标准要求")
    private String standardRequirement;
    /**
    * 创建时间
    */
    @ApiModelProperty("创建时间")
    private Date createTime;
    /**
     * 养护项列表
     */
    @ApiModelProperty("养护项列表")
    private List<MaintainItem> maintainItemList;
}
```

**响应对象** 养护项模型 

```java
package com.gree.FirstDemo.domain.entity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
@Data
@ApiModel("养护项模型")
public class MaintainItem {
    /**
    * 养护项编号
    */
    @ApiModelProperty("养护项编号")
    private Integer itemId;
    /**
    * 养护类型
    */
    @ApiModelProperty("养护类型")
    private String maintainType;
    /**
    * 养护项内容
    */
    @ApiModelProperty("养护项内容")
    private String maintainItemContent;
    /**
    * 上限
    */
    @ApiModelProperty("上限")
    private Long upperLimit;
    /**
    * 下限
    */
    @ApiModelProperty("下限")
    private Long lowerLimit;
    /**
    * 参考值
    */
    @ApiModelProperty("参考值")
    private String referenceValue;
    /**
    * 养护标准编号
    */
    @ApiModelProperty("养护标准编号")
    private String maintainStandardId;
}
```

**请求对象** 通过线体编号、设备编号搜索

```java
@Data
@ApiModel("根据线体编号、设备编号搜索类")
public class MaintainSearchDTO extends Paging {

    @ApiModelProperty("线体编号")
    private String lineId;
    @ApiModelProperty("设备编号")
    private String deviceId;
}
```

通过在响应类和请求类中配置@ApiModel 和 @ApiModelProperty 对响应字段做对应说明

方便在后期导出API文档时，自动补充参数说明



针对controller层的接口来使用swagger对应的api

```java
@Api(tags = "养护标准接口old")
@RestController
//@RequestMapping("/yhy/mybatisDemo")
public class MaintainStandardController {
    @Autowired
    private MaintainStandardService maintainStandardService;

    @PostMapping("/selectByLineIdOrDeviceIdLambda")
    public List<MaintainStandardDO> selectByLineIdOrDeviceIdLambda(@RequestBody MaintainSearchDTO maintainSearchDTO){
        return maintainStandardService.selectByLineIdOrDeviceId(maintainSearchDTO);
    }

    @PostMapping("/selectByLineIdOrDeviceIdSql")
    public List<MaintainStandardVO> selectByLineIdOrDeviceIdSql(@RequestBody MaintainSearchDTO maintainSearchDTO){
        return maintainStandardService.selectByLineIdOrDeviceIdSql(maintainSearchDTO);
    }

    @GetMapping("/selectAll")
    public List<MaintainStandardDO> selectAll(){
        return maintainStandardService.selectAll();
    }

    @PostMapping("/insertMaintainStandard")
    public int insert(@RequestBody MaintainStandardDO maintainStandardDO){
        return maintainStandardService.insert(maintainStandardDO);
    }

    @GetMapping("/deleteByMaintainStandardId")
    public int delete(String maintainStandardId){
        return maintainStandardService.deleteByMaintainStandardId(maintainStandardId);
    }
}
```

### 5.查看结果

完成集成，启动SpringBoot项目，访问地址http://localhost:8000/swagger-ui/index.html

![swagger界面示例](E:\Notes\JavaNotes\Java技术储备\Java技术储备\swagger界面示例.PNG)

### 6.配置Kinfe4j以导出离线文档

#### 	1.引入依赖

```xml
<!-- 使用knife4j导出离线api文档-->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

#### 2.配置

​		在配置Swagger的配置文件中添加`@EnableKnife4j`的增强功能

```java
@Configuration
@EnableOpenApi //注解启动用Swagger的使用，同时在配置类中对Swagger的通用参数进行配置
@EnableKnife4j //启动Knife4j功能
public class SwaggerConfig {
    //...
}
```

此时，如果依旧访问http://localhost:8000/swagger-ui/index.html会发现显示并没有变化。这里我们需要访问http://localhost:8000/doc.html。

#### **3.界面展示**

![knife4j](E:\Notes\JavaNotes\Java技术储备\Java技术储备\knife4j.PNG)

**导出离线文档**

![离线文档](E:\Notes\JavaNotes\Java技术储备\Java技术储备\离线文档.PNG)



![离线文档1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\离线文档1.PNG)

## 入参校验 Validation

在实际项目中不仅仅前端需要做必填项等校验，为防止非法参数对业务造成影响，后端也需要对相关参数做校验，这里使用springbooo的validation进行参数校验

### 1.引入依赖

``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

### 2.约束性注解

|     注解     |                             功能                             |
| :----------: | :----------------------------------------------------------: |
| @AssertFalse |           可以为null，如果不为null的话必须为false            |
| @AssertTrue  |            可以为null,如果不为null的话必须为true             |
| @DecimalMax  |                      设置不能超过最大值                      |
| @DecimalMin  |                      设置不能超过最小值                      |
|   @Digits    |  设置必须是数字且数字整数的位数和小数的位数必须在指定范围内  |
|   @Future    |                   日期必须在当前日期的未来                   |
|    @Past     |                   日期必须在当前日期的过去                   |
|     @Max     |                     最大不得超过此最大值                     |
|     @Min     |                     最大不得小于此最小值                     |
|   @NotNull   |                     不能为null，可以是空                     |
|    @Null     |                          必须为null                          |
|   @Pattern   |                   必须满足指定的正则表达式                   |
|    @Size     |         集合、数组、map等的size()值必须在指定范围内          |
|    @Email    |                       必须是email格式                        |
|   @Length    |                     长度必须在指定范围内                     |
|  @NotBlank   |         字符串不能为null,字符串trim()后也不能等于“”          |
|  @NotEmpty   | 不能为null，集合、数组、map等size()不能为0；字符串trim()后可以等于“” |
|    @Range    |                      值必须在指定范围内                      |
|     @URL     |                        必须是一个URL                         |

### 3.@Validated的使用时机

**@validated的使用位置较多(可详见源码)，但其主流的使用位置是以下两种**：

**1.在Controller层中，放在模型参数对象前**

​	当Controller层中参数是一个对象模型时，只有将@Validated直接放在该模型前，该模型内部的字段才会被校验(如果有对该模型的字段进行约束的话)

**2.在Controller层中，放在类上**

​	当一些约束是直接出现在Controller层中的参数前时，只有将@Validated放在类上时，参数前的约束才会生效

``` java
package com.gree.FirstDemo.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.gree.FirstDemo.domain.dto.ValidationBeanModel;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.constraints.DecimalMax;

/**
 * Controller层 --- 初步简单测试 @Validated 的使用位置
 *
 * 对比测试过程:
 *    方案一 : 不在类上加@Validated注解，访问这六个接口
 *    方案二 : 在类上加@Validated注解，再次访问这六个接口
 *
 *    对比方案一和方案二，可初步得出@Validated的使用时机:
 *        1.当我们是在模型里面对模型字段添加约束注解，在Controller中使用模型接收数
 *          据时，@Validated要直接放在该模型参数前才有效。 如: "/test/one"
 *        2.当我们是直接在Controller层中的参数前，使用约束注解时，@Validated要直接放在类上，
 */
@Api(tags = "数据校验validation")
@RestController
@Validated
public class ValidationTestController {
	//校验生效
    @GetMapping(value = "/test/one")
    public String validationOne(@Validated ValidationBeanModel.AbcDecimalMax myDecimalMax){
        System.out.println(myDecimalMax.getMyDecimalMax());
        return "one pass";
    }
    //校验不生效
    @GetMapping(value = "/test/two")
    @Validated
    public String validationTwo(ValidationBeanModel.AbcDecimalMax decimalMax){
        System.out.println(decimalMax.getMyDecimalMax());
        return "pass two";
    }
    //校验不生效
    @GetMapping(value = "/test/three")
    public String validationThree(ValidationBeanModel.AbcDecimalMax decimalMax) {
        System.out.println(decimalMax.getMyDecimalMax());
        return "pass three";
    }
	//校验生效
    @GetMapping(value = "/test/four")
    public String validationFour(@Validated @DecimalMax(value = "12.3") String decimalMax) {
        System.out.println(decimalMax);
        return "pass four";
    }
	//校验生效
    @GetMapping(value = "/test/five")
    @Validated
    public String validationFive(@DecimalMax(value = "12.3") String decimalMax) {
        System.out.println(decimalMax);
        return "pass five";
    }
	//校验生效，但是注意在Controller外面加上了一层@Validated
    @GetMapping(value = "/test/six")
    public String validationSix(@DecimalMax(value = "12.3") String decimalMax) {
        System.out.println(decimalMax);
        return "pass six";
    }
}
```

根据测试结果可以进行总结：

​	当我们将校验条件写在传入对象的类中时，需要将`@Validated`写在传入的类对象的前面才会起作用，而将`@Validated`写在控制器方法上面和不写`@Validated`都不会起作用。

​	当我们将校验条件在Controller层中以参数约束的形式传入时，不管`@Validated`写在控制器方法上、参数前、还是不写都会起到约束作用，但需要注意把约束参数定好，如`@DecimalMax(value = "12.3")`

**@Validated与@Valid的简单对比说明**

> @Valid注解与@Validated注解功能大部分类似；两者的不同主要在于:@Valid属于javax下的，而@Validated属于spring下；@Valid支持嵌套校验、而@Validated不支持，@Validated支持分组，而@Valid不支持。

### 4.自定义注解

​	虽然Bean Validation和Hibernate Validator已经提供了非常丰富的校验注解，但是在实际业务中，难免会碰到一些现有注解不足以校验的情况；这时，我们可以考虑自定义Validation注解。

**自定义注解步骤**

1. 创建自定义注解

``` java
package com.gree.FirstDemo.util;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
@Target({FIELD, PARAMETER})
@Retention(RUNTIME)
@Documented
//指定此注解的实现，即：校验器
@Constraint(validatedBy = {CustomValidator.class})
public @interface CustomConstraints {
    //当验证不通过时的提示信息
    String message() default "入参必须包含特定值!";
    //根据实际需求指定的方法
    String contains() default "";
    //约束注解在验证时所属的组别
    Class<?>[] groups() default {};
    //负载
    Class<? extends Payload>[] payload() default {};
}
```

2. 编写第一部中校验器实现类，实现该注解

``` java
package com.gree.FirstDemo.util;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.annotation.Annotation;
/**
 * CustomConstraints注解 校验器 实现
 * 注：验证器需要实现ConstraintValidator<U, V>，其中U为对应的注解类，V为被该注解标记的字段的类型(或其父类型)
 *
 *     当项目启动后，会懒加载创建ConstraintValidator实例，在创建实例后会初始化调用
 *     {@link ConstraintValidator#initialize(Annotation)}方法
 *     所以，只有在第一次请求时，才会走initialize方法，后面的请求是不会走initialize方法的
 *     懒加载创建ConstrainValidator实例时，会走缓存；如果缓存中有，则直接使用相同的ConstrainValidator实例；
 *     如果缓存中没有，那么会创建新的ConstraintValidator实例
 *     由于缓存中的key是可以唯一定位的，且ConstraintValidator的实例属性只有在
 *     {@link ConstraintValidator#initialize(Annotation)}方法中才会写，
 *     在{@link ConstraintValidator#isValid(Object, ConstraintValidatorContext)}方法中只是读
 *     所以不用担心线程安全问题
 */
public class CustomValidator implements ConstraintValidator<CustomConstraints, Object> {
    /**错误提示信息**/
    private String contains;
    /**
    * 初始化方法，在懒加载创建一个当前类实例后，会马上执行此方法
    * 此方法只会执行一次，即：创建实例后马上执行
    * @param constraintAnnotation 注解信息模型，可以从该模型中获取注解类中定义的一些信息，如默认值等
    * */
    @Override
    public void initialize(CustomConstraints constraintAnnotation) {
        System.out.println(constraintAnnotation.contains());
        this.contains = constraintAnnotation.contains();
    }
    /**
     * 校验方法，每个需要校验的请求都会走这个方法
     * 注：这个方法可能会并发执行，需要根据实际情况看是否需要保证线程安全
     * @param value 被校验的对象
     * @param context 上下文
     * @return 校验是否通过
     */
    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        //如果入参值是空，则返回错误
        if (value == null){
            return false;
        }
        //如果入参是字符串,就直接使用字符串来比
        if (value instanceof String){
            String strMessage = (String) value;
            return strMessage.contains(contains);
        }
        //如果入参是Integer类型，先转成String
        else if (value instanceof Integer) {
            return contains.contains(String.valueOf(value));
        }
        return false;
    }
}
```

3.简单使用

在Controller层进行接口调用，并使用我们自定义的注解

``` java
package com.gree.FirstDemo.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.gree.FirstDemo.domain.dto.ValidationBeanModel;
import com.gree.FirstDemo.util.CustomConstraints;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.constraints.DecimalMax;
@Api(tags = "数据校验validation")
@RestController
@Validated
public class ValidationTestController {
    @GetMapping(value = "/test/customValidation")
    public String validationSeven(@CustomConstraints(contains = "格力手机") String str){
        System.out.println("输入值：" + str);
        return "seven pass";
    }
}
```

当根据上面的代码，我们可以知道我们自定义注解的作用是检查入参中的字段中是否包含"格力手机"这个字符串

现在入参为”格力手机真好用！“，包含“格力手机”，所以方法正常调用获得返回值

![自定义注解测试1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\自定义注解测试1.png)

当入参值不包含"格力手机"时，返回异常

![自定义注解测试2](E:\Notes\JavaNotes\Java技术储备\Java技术储备\自定义注解测试2.png)

同时后台拿到错误信息

![自定义注解测试3](E:\Notes\JavaNotes\Java技术储备\Java技术储备\自定义注解测试3.png)

#### 补充：springboot中的注解

**注解定义格式：**

``` java
public @interface 注解名 {定义体}
```

**定义一个注解**

``` java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@interface Todo {
    public enum Priority {LOW, MEDIUM, HIGH}
    public enum Status {STARTED, NOT_STARTED}

    //定义属性
    String value() default "";
    Priority priority() default Priority.LOW;
    Status status() default Status.NOT_STARTED;
}
```

说明：

> 1. 注解只有方法，没有成员，方法必须是public的，去掉public，默认也是public，因为注解也是一个接口interface
> 2. 注解方法必须有返回类型：返回值类型只能是基本类型、Class、String、enum
> 3. 注解方法运行提供默认值，但不是必需的
> 4. 一个注解方法其实就是一个参数，方法名就是参数名
> 5. 当注解没有方法时，即没有参数，表示一个标记注解
> 6. 当注解有一个方法时，即一个参数，最好把方法名改为“value”，这是默认的
> 7. 当使用自定义的注解时，参数类型可能是基本类型、Class、String、enum或者数组，如果是数组，通过paramname={value1,value2}传入

**interface**

声明一个Java接口，接口可以理解成一种特殊的类，在这个类中只能有常量和抽象方法；接口不可以实例化，接口中的方法没有方法体，继承接口的类必须实现接口中定义的方法。

**@interface**

一个继承了java.lang.annotation.Annotation接口的自定义注解，定义注解类型。

Java从1.5开始提供annotation（注解、标注），它用来修饰应用程序的元素（类、方法、属性、参数、本地变量、包、元数据），编译器将其与元数据一同存储在class文件中，运行期间通过Java的反射机制来处理其修饰的元素。

annotation仅仅用来修饰元素，并不能影响代码的执行。只有通过其配套的框架或工具才能对其进行访问和处理

- @interface是用来自定义注解类型的，可定义多个参数和默认值，核心参数使用value名称

- 必须设置@Target来指定Annotation可以应用的范围

- 应当设置@Retention(RetentionPolicy.RUNTIME)便于运行期读取该Annotation

**@Ducumented**

> @Documented是一个标记注解，没有方法，用于描述其它类型的annotation应该被作为被标注的程序成员的公共API

**@Inherited**

> @Inherited是一个标记注解，没有方法，是否允许子类继承该注解
> 如果一个使用了@Inherited修饰的annotation类型被用于一个class，则这个annotation将被用于该class的子类。

**@Target**

用来定义注解应用于什么地方，枚举类型ElementType表示@Target作用位置

|      字段       |                   说明                   |
| :-------------: | :--------------------------------------: |
|   CONSTRUCTOR   |             用于描述构造方法             |
|      FIELD      |     用于描述字段声明（包括枚举常量）     |
| LOCAL_VARIABLE  |             用于描述局部变量             |
|     METHOD      |               用于描述方法               |
|     PACKAGE     |                用于描述包                |
|      TYPE       | 用于描述类、接口(包括注解类型)或enum声明 |
|    PARAMETER    |             用于描述方法参数             |
| ANNOTATION_TYPE |             用于描述注解类型             |

使用：

> @Target只有一个方法，默认为value()，返回一个ElementType类型数组
> 所以使用时既可以带参数名，也可以不带参数名，参数为数组用花括号表示
>
> 1. @Target(ElementType.ANNOTATION_TYPE)
> 2. @Target(value = {ElementType.TYPE})
> 3. @Target({}) // 不能用来注解任何东西
> 4. @Target(value = {ElementType.TYPE，ElementType.METHOD})

**@Retention**

定义该注解在哪一个级别可用

|          属性           |                             说明                             |
| :---------------------: | :----------------------------------------------------------: |
| RetentionPolicy.SOURCE  | 这种类型的Annotations只在源代码级别保留，编译时就会被忽略。*仅出现在源代码中，在编译阶段丢弃。这些注解在编译结束之后就不再有任何意义，所以它们不会写入字节码。@Override, @SuppressWarnings都属于这类注解。* |
|  RetentionPolicy.CLASS  | 这种类型的Annotations编译时被保留，在class文件中存在，但JVM将会忽略。*被编译在class文件中，但在运行时不需要由JVM保留。在字节码文件的处理中有用。注解默认使用这种方式* |
| RetentionPolicy.RUNTIME | 这种类型的Annotations将被JVM保留，所以他们能在运行时被JVM或其他反射机制的代码所读取和使用。*始终不会丢弃，运行期也保留该注解，因此可以使用反射机制读取该注解的信息。我们自定义的注解通常使用这种方式* |

使用：

> @Retention只有一个方法，返回RetentionPolicy类型，所以直接这样使用
> @Retention(RetentionPolicy.RUNTIME)

## SpringBoot实现全局异常处理

SpringBoot的项目已经有一定的异常处理了，但是对于我们开发者而言可能就不太合适了，因此我们需要对这些异常进行统一的捕获并处理。

SpringBoot中有一个`@ControllerAdvice`的注解，使用该注解表示开启了全局异常的捕获，我们只需再自定义一个方法使用`@ExceptionHandler`注解然后定义捕获异常的类型即可对这些捕获的异常进行统一的处理。

实例代码如下：

``` java
package com.gree.FirstDemo.util.GlobalExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public String exceptionHandler(Exception e){
        System.out.println("未知异常 原因是：" + e);
        return e.getMessage();
    }
}
```

当使用此方式捕获到的异常结果如下：

![全局异常处理1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\全局异常处理1.png)

与上面未经过全局异常处理的情况进行一下对比：

![自定义注解测试3](E:\Notes\JavaNotes\Java技术储备\Java技术储备\自定义注解测试3.png)

可见使用此种方式可以全局捕获异常，并且输出简洁干净的错误信息

但是，虽然这种能够让我们知道异常的原因，但是在很多的情况下来说，可能还是不够人性化，不符合我们的要求。
那么我们这里可以==通过自定义的异常类以及枚举类==来实现我们想要的那种数据

### 1.自定义基础接口类

​	首先定义一个基础的接口类，自定义的错误描述枚举类需实现该接口

``` java
package com.gree.FirstDemo.util.GlobalExceptionHandler;

public interface BaseErrorInfo {
    //拿到错误码
    String getResultCode();
    //拿到错误描述
    String getResultMsg();
}
```

### 2.自定义枚举类

​	自定义枚举类，并实现该接口

```java
package com.gree.FirstDemo.util.GlobalExceptionHandler;

public enum CommonEnum implements BaseErrorInfo{
    //数据操作动作定义
    SUCCESS("200", "成功!"),
    BODY_NOT_MATCH("400", "请求数据格式不符!"),
    SIGNATURE_NOT_MATCH("401","请求的数字签名不匹配!"),
    NOT_FOUND("404", "未找到该资源!"),
    INTERNAL_SERVER_ERROR("500", "服务器内部错误!"),
    SERVER_BUSY("503","服务器正忙，请稍后再试!")
    ;
    //错误码
    private String resultCode;
    //错误信息
    private String resultMsg;
    CommonEnum(String resultCode, String resultMsg) {
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
    }
    @Override
    public String getResultCode() {
        return resultCode;
    }
    @Override
    public String getResultMsg() {
        return resultMsg;
    }
}
```

### 3.自定义异常类

自定义异常类，用于处理我们发生的业务异常

```java
package com.gree.FirstDemo.util.GlobalExceptionHandler;
public class BizException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    /**
     * 错误码
     */
    protected String errorCode;
    /**
     * 错误信息
     */
    protected String errorMsg;
    public BizException() {
        super();
    }
    public BizException(BaseErrorInfo errorInfoInterface) {
        super(errorInfoInterface.getResultCode());
        this.errorCode = errorInfoInterface.getResultCode();
        this.errorMsg = errorInfoInterface.getResultMsg();
    }
    public BizException(BaseErrorInfo errorInfoInterface, Throwable cause) {
        super(errorInfoInterface.getResultCode(), cause);
        this.errorCode = errorInfoInterface.getResultCode();
        this.errorMsg = errorInfoInterface.getResultMsg();
    }
    public BizException(String errorMsg) {
        super(errorMsg);
        this.errorMsg = errorMsg;
    }
    public BizException(String errorCode, String errorMsg) {
        super(errorCode);
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
    public BizException(String errorCode, String errorMsg, Throwable cause) {
        super(errorCode, cause);
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }
    public String getErrorCode() {
        return errorCode;
    }
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
    public String getErrorMsg() {
        return errorMsg;
    }
    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
    public String getMessage() {
        return errorMsg;
    }
    @Override
    public Throwable fillInStackTrace() {
        return this;
    }
}
```

### 4.自定义数据格式

自行定义一下数据的传输格式

```java
package com.gree.FirstDemo.util.GlobalExceptionHandler;
import com.alibaba.fastjson2.JSONObject;
public class ResultBody {
    /**
     * 响应代码
     */
    private String code;
    /**
     * 响应消息
     */
    private String message;
    /**
     * 响应结果
     */
    private Object result;
    public ResultBody() {
    }
    public ResultBody(BaseErrorInfo errorInfo) {
        this.code = errorInfo.getResultCode();
        this.message = errorInfo.getResultMsg();
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Object getResult() {
        return result;
    }
    public void setResult(Object result) {
        this.result = result;
    }
    /**
     * 成功
     *
     * @return
     */
    public static ResultBody success() {
        return success(null);
    }
    /**
     * 成功
     * @param data
     * @return
     */
    public static ResultBody success(Object data) {
        ResultBody rb = new ResultBody();
        rb.setCode(CommonEnum.SUCCESS.getResultCode());
        rb.setMessage(CommonEnum.SUCCESS.getResultMsg());
        rb.setResult(data);
        return rb;
    }
    /**
     * 失败
     */
    public static ResultBody error(BaseErrorInfo errorInfo) {
        ResultBody rb = new ResultBody();
        rb.setCode(errorInfo.getResultCode());
        rb.setMessage(errorInfo.getResultMsg());
        rb.setResult(null);
        return rb;
    }
    /**
     * 失败
     */
    public static ResultBody error(String code, String message) {
        ResultBody rb = new ResultBody();
        rb.setCode(code);
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }
    /**
     * 失败
     */
    public static ResultBody error( String message) {
        ResultBody rb = new ResultBody();
        rb.setCode("-1");
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }
    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
```

### 5.自定义全局异常处理类

编写自定义全局异常处理类，根据不同类型的异常做一些特定的异常处理或返回参数



在这里需要注意：

首先，`@ControllerAdvice`在这里开启全局异常处理的捕获

`@ExceptionHandler`注解中指定要处理的异常类是哪一个

这里有踩过一个小坑需要注意一下：

> 在处理json的时候需要用到spring框架特有的注解@ResponseBody或者@RestController注解，这两个注解都会处理返回的数据格式，使用了该类型注解后返回的不再是视图，不会进行转跳，而是返回json或xml数据格式，输出在页面上。
>
> ​	@ResponseBody，一般是使用在单独的方法上的，需要哪个方法返回json数据格式，就在哪个方法上使用，具有针对性。
>
> ​	@RestController，一般是使用在类上的，它表示的意思其实就是结合了@Controller和@ResponseBody两个注解
>
> 如果哪个类下的所有方法需要返回json数据格式的，就在哪个类上使用@RestController注解，具有统一性；
>
> 需要注意的是，使用了@RestController注解之后，其本质相当于在该类的所有方法上都统一使用了@ResponseBody注解，所以该类下的所有方法都会返回json数据格式，输出在页面上，而不会再返回视图。



``` java
package com.gree.FirstDemo.util.GlobalExceptionHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 全局异常处理类
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 处理自定义的业务异常
     * @param request
     * @param e
     * @return
     */
    @ExceptionHandler(value = BizException.class)
    @ResponseBody
    public ResultBody bizExceptionHandler(HttpServletRequest request, BizException e){
        logger.error("发生业务异常！原因是：{}", e.getErrorMsg());
        return ResultBody.error(e.getErrorCode(), e.getMessage());
    }

    /**
     * 处理空指针异常
     * @param request
     * @param e
     * @return
     */
    @ExceptionHandler(value = NullPointerException.class)
    @ResponseBody
    public ResultBody nullPointerExceptionHandler(HttpServletRequest request, NullPointerException e){
        logger.error("空指针异常！原因是：" + e);
        return ResultBody.error(CommonEnum.BODY_NOT_MATCH);
    }

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResultBody otherExceptionHandler(HttpServletRequest request, Exception e){
        logger.error("未知异常！原因是：" + e);
        return ResultBody.error(CommonEnum.INTERNAL_SERVER_ERROR);
    }
}
```

### 6.测试

**先建一个实体类**

```java
package com.gree.FirstDemo.domain.entity;

import com.alibaba.fastjson2.JSONObject;
import java.io.Serializable;

public class TestUser implements Serializable {
    private static final long serialVersionUID = 1L;
    /** 编号 */
    private int id;
    /** 姓名 */
    private String name;
    /** 年龄 */
    private int age;
    public TestUser(){
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
```

**测试使用的Controller**

```java
package com.gree.FirstDemo.controller;

import com.gree.FirstDemo.domain.User;
import com.gree.FirstDemo.domain.entity.TestUser;
import com.gree.FirstDemo.util.GlobalExceptionHandler.BizException;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(tags = "全局异常测试Controller")
public class UserRestController {
    @PostMapping("/user/insert")
    public boolean insert(@RequestBody TestUser user){
        System.out.println();
        //如果姓名为空手动抛出异常
        if (user.getName().isEmpty() || (user.getName() == "")){
            throw new BizException("-1", "用户名不能为空");
        }
        return true;
    }
    @PutMapping("/user/update")
    public boolean update(@RequestBody TestUser user){
        System.out.println("开始更新...");
        //这里产生一个空指针异常,并不进行处理
        String str = null;
        str.equals("1111");
        return true;
    }
    @DeleteMapping("/user/delete")
    public boolean delete(@RequestBody TestUser user){
        System.out.println("开始删除...");
        //这里造成一个异常，不处理，归类为未知异常
        Integer.parseInt("abc123");
        return true;
    }
    @GetMapping("/user/find")
    public List<User> findByUser(TestUser user){
        System.out.println("开始查询");
        List<User> users = new ArrayList<>();
        User user1 = new User();
        user1.setUsername("张三");
        user1.setPassword("123456");
        user1.setBirth(new Date(2022-9-30));
        users.add(user1);
        return users;
    }
}
```

### 7.功能测试

这里使用配置好的swagger进行测试

1.先测试自定义的业务异常

![全局异常测试1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\全局异常测试1.png)

可以看到结果，将我们抛出的异常进行数据封装，然后将异常返回出来

2.测试处理空指针异常

这里需要注意，我们除了定义空指针异常外，还定义了最高级别之一的Exception异常处理，在这里它返回的是空指针的异常处理，可以知道全局异常优先处理子类的异常。



![image-20221228095702238](C:\Users\601725\AppData\Roaming\Typora\typora-user-images\image-20221228095702238.png)

3.全局异常处理中的Exception

![全局异常处理3](E:\Notes\JavaNotes\Java技术储备\Java技术储备\全局异常处理3.png)

​	自义定全局异常处理除了可以处理上述的数据格式之外，也可以处理页面的跳转，只需在新增的异常方法的返回处理上填写该跳转的路径并不使用`ResponseBody` 注解即可。 在这里`GlobalExceptionHandler`类中使用的是`ControllerAdvice`注解，而非`RestControllerAdvice`注解，如果是用的`RestControllerAdvice`注解，它会将数据自动转换成JSON格式，这种于`Controller`和`RestController`类似，所以我们在使用全局异常处理的之后可以进行灵活的选择处理。

​	也就是说，如果在这里把GlobalExceptionHandler上的@ControllerAdvice改成@RestControllerAdvice就可以把下面的方法中的@ResponseBody删掉了

## Mybatis-plus XML文件内置标签功能汇总（10.14）

### 	XML 映射器

#### 概述

> MyBatis 的真正强大在于它的语句映射，这是它的魔力所在。由于它的异常强大，映射器的 XML 文件就显得相对简单。如果拿它跟具有相同功能的 JDBC 代码进行对比，你会立即发现省掉了将近 95% 的代码。MyBatis 致力于减少使用成本，让用户能更专注于 SQL 代码。

​	SQL 映射文件只有很少的几个顶级元素（按照应被定义的顺序列出）：

- `cache` – 该命名空间的缓存配置。
- `cache-ref` – 引用其它命名空间的缓存配置。
- `resultMap` – 描述如何从数据库结果集中加载对象，是最复杂也是最强大的元素。
- ~~`parameterMap`~~ – 老式风格的参数映射。此元素已被废弃，并可能在将来被移除！请使用行内参数映射。文档中不会介绍此元素。
- `sql` – 可被其它语句引用的可重用语句块。
- `insert` – 映射插入语句。
- `update` – 映射更新语句。
- `delete` – 映射删除语句。
- `select` – 映射查询语句。

#### select

查询语句是 MyBatis 中最常用的元素之一——光能把数据存到数据库中价值并不大，还要能重新取出来才有用，多数应用也都是查询比修改要频繁。 MyBatis 的基本原则之一是：在每个插入、更新或删除操作之间，通常会执行多个查询操作。因此，MyBatis 在查询和结果映射做了相当多的改进。一个简单查询的 select 元素是非常简单的。比如：

```xml
<select id="selectPerson" parameterType="int" resultType="hashmap">
  SELECT * FROM PERSON WHERE ID = #{id}
</select>
```

这个语句名为 selectPerson，接受一个 int（或 Integer）类型的参数，并返回一个 HashMap 类型的对象，其中的键是列名，值便是结果行中的对应值。

注意参数符号：

```xml
#{id}
```

select 元素允许你配置很多属性来配置每条语句的行为细节。

```xml
<select
  id="selectPerson"
  parameterType="int"
  parameterMap="deprecated"
  resultType="hashmap"
  resultMap="personResultMap"
  flushCache="false"
  useCache="true"
  timeout="10"
  fetchSize="256"
  statementType="PREPARED"
  resultSetType="FORWARD_ONLY">
```

**select的元素属性**

| 属性            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| `id`            | 在命名空间中唯一的标识符，可以被用来引用这条语句。           |
| `parameterType` | 将会传入这条语句的参数的类全限定名或别名。这个属性是可选的，因为 MyBatis 可以通过类型处理器（TypeHandler）推断出具体传入语句的参数，默认值为未设置（unset）。 |
| `resultType`    | 期望从这条语句中返回结果的类全限定名或别名。 注意，如果返回的是集合，那应该设置为集合包含的类型，而不是集合本身的类型。 resultType 和 resultMap 之间只能同时使用一个。 |
| `resultMap`     | 对外部 resultMap 的命名引用。结果映射是 MyBatis 最强大的特性，如果你对其理解透彻，许多复杂的映射问题都能迎刃而解。 resultType 和 resultMap 之间只能同时使用一个。 |
| `flushCache`    | 将其设置为 true 后，只要语句被调用，都会导致本地缓存和二级缓存被清空，默认值：false。 |
| `useCache`      | 将其设置为 true 后，将会导致本条语句的结果被二级缓存缓存起来，默认值：对 select 元素为 true。 |
| `timeout`       | 这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。默认值为未设置（unset）（依赖数据库驱动）。 |
| `fetchSize`     | 这是一个给驱动的建议值，尝试让驱动程序每次批量返回的结果行数等于这个设置值。 默认值为未设置（unset）（依赖驱动）。 |
| `statementType` | 可选 STATEMENT，PREPARED 或 CALLABLE。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。 |
| `resultSetType` | FORWARD_ONLY，SCROLL_SENSITIVE, SCROLL_INSENSITIVE 或 DEFAULT（等价于 unset） 中的一个，默认值为 unset （依赖数据库驱动）。 |
| `databaseId`    | 如果配置了数据库厂商标识（databaseIdProvider），MyBatis 会加载所有不带 databaseId 或匹配当前 databaseId 的语句；如果带和不带的语句都有，则不带的会被忽略。 |
| `resultOrdered` | 这个设置仅针对嵌套结果 select 语句：如果为 true，则假设结果集以正确顺序（排序后）执行映射，当返回新的主结果行时，将不再发生对以前结果行的引用。 这样可以减少内存消耗。默认值：`false`。 |
| `resultSets`    | 这个设置仅适用于多结果集的情况。它将列出语句执行后返回的结果集并赋予每个结果集一个名称，多个名称之间以逗号分隔。 |

####insert, update 和 delete

数据变更语句 insert，update 和 delete 的实现非常接近：

````xml
<insert
  id="insertAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  keyProperty=""
  keyColumn=""
  useGeneratedKeys=""
  timeout="20">

<update
  id="updateAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  timeout="20">

<delete
  id="deleteAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  timeout="20">
````

**Insert, Update, Delete 元素的属性**

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `id`               | 在命名空间中唯一的标识符，可以被用来引用这条语句。           |
| `parameterType`    | 将会传入这条语句的参数的类全限定名或别名。这个属性是可选的，因为 MyBatis 可以通过类型处理器（TypeHandler）推断出具体传入语句的参数，默认值为未设置（unset）。 |
| `flushCache`       | 将其设置为 true 后，只要语句被调用，都会导致本地缓存和二级缓存被清空，默认值：（对 insert、update 和 delete 语句）true。 |
| `timeout`          | 这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。默认值为未设置（unset）（依赖数据库驱动）。 |
| `statementType`    | 可选 STATEMENT，PREPARED 或 CALLABLE。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。 |
| `useGeneratedKeys` | （仅适用于 insert 和 update）这会令 MyBatis 使用 JDBC 的 getGeneratedKeys 方法来取出由数据库内部生成的主键（比如：像 MySQL 和 SQL Server 这样的关系型数据库管理系统的自动递增字段），默认值：false。 |
| `keyProperty`      | （仅适用于 insert 和 update）指定能够唯一识别对象的属性，MyBatis 会使用 getGeneratedKeys 的返回值或 insert 语句的 selectKey 子元素设置它的值，默认值：未设置（`unset`）。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| `keyColumn`        | （仅适用于 insert 和 update）设置生成键值在表中的列名，在某些数据库（像 PostgreSQL）中，当主键列不是表中的第一列的时候，是必须设置的。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| `databaseId`       | 如果配置了数据库厂商标识（databaseIdProvider），MyBatis 会加载所有不带 databaseId 或匹配当前 databaseId 的语句；如果带和不带的语句都有，则不带的会被忽略。 |

下面是 insert，update 和 delete 语句的示例：

```xml
<insert id="insertAuthor">
  insert into Author (id,username,password,email,bio)
  values (#{id},#{username},#{password},#{email},#{bio})
</insert>

<update id="updateAuthor">
  update Author set
    username = #{username},
    password = #{password},
    email = #{email},
    bio = #{bio}
  where id = #{id}
</update>

<delete id="deleteAuthor">
  delete from Author where id = #{id}
</delete>
```

如前所述，插入语句的配置规则更加丰富，在插入语句里面有一些额外的属性和子元素用来处理主键的生成，并且提供了多种生成方式。

首先，如果你的**数据库支持自动生成主键的字段**（比如 MySQL 和 SQL Server），那么你可以设置 useGeneratedKeys=”true”，然后再把 keyProperty 设置为目标属性就 OK 了。例如，如果上面的 Author 表已经在 id 列上使用了自动生成，那么语句可以修改为：

```xml
<insert id="insertAuthor" useGeneratedKeys="true"
    keyProperty="id">
  insert into Author (username,password,email,bio)
  values (#{username},#{password},#{email},#{bio})
</insert>
```

如果你的**数据库还支持多行插入**, 你也可以传入一个 `Author` 数组或集合，并返回自动生成的主键。

```xml
<insert id="insertAuthor" useGeneratedKeys="true"
    keyProperty="id">
  insert into Author (username, password, email, bio) values
  <foreach item="item" collection="list" separator=",">
    (#{item.username}, #{item.password}, #{item.email}, #{item.bio})
  </foreach>
</insert>
```

对于不支持自动生成主键列的数据库和可能不支持自动生成主键的 JDBC 驱动，MyBatis 有另外一种方法来生成主键。

这里有一个简单（也很傻）的示例，它可以生成一个随机 ID（不建议实际使用，这里只是为了展示 MyBatis 处理问题的灵活性和宽容度）：

```xml
<insert id="insertAuthor">
  <selectKey keyProperty="id" resultType="int" order="BEFORE">
    select CAST(RANDOM()*1000000 as INTEGER) a from SYSIBM.SYSDUMMY1
  </selectKey>
  insert into Author
    (id, username, password, email,bio, favourite_section)
  values
    (#{id}, #{username}, #{password}, #{email}, #{bio}, #{favouriteSection,jdbcType=VARCHAR})
</insert>
```

在上面的示例中，首先会运行 selectKey 元素中的语句，并设置 Author 的 id，然后才会调用插入语句。这样就实现了数据库自动生成主键类似的行为，同时保持了 Java 代码的简洁。

selectKey 元素描述如下：

```xml
<selectKey
  keyProperty="id"
  resultType="int"
  order="BEFORE"
  statementType="PREPARED">
```

**selectKey元素属性**

| 属性            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| `keyProperty`   | `selectKey` 语句结果应该被设置到的目标属性。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| `keyColumn`     | 返回结果集中生成列属性的列名。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| `resultType`    | 结果的类型。通常 MyBatis 可以推断出来，但是为了更加准确，写上也不会有什么问题。MyBatis 允许将任何简单类型用作主键的类型，包括字符串。如果生成列不止一个，则可以使用包含期望属性的 Object 或 Map。 |
| `order`         | 可以设置为 `BEFORE` 或 `AFTER`。如果设置为 `BEFORE`，那么它首先会生成主键，设置 `keyProperty` 再执行插入语句。如果设置为 `AFTER`，那么先执行插入语句，然后是 `selectKey` 中的语句 - 这和 Oracle 数据库的行为相似，在插入语句内部可能有嵌入索引调用。 |
| `statementType` | 和前面一样，MyBatis 支持 `STATEMENT`，`PREPARED` 和 `CALLABLE` 类型的映射语句，分别代表 `Statement`, `PreparedStatement` 和 `CallableStatement` 类型。 |

这个 SQL 片段可以在其它语句中使用，例如：

#### sql

这个元素可以用来定义可重用的 SQL 代码片段，以便在其它语句中使用。 参数可以静态地（在加载的时候）确定下来，并且可以在不同的 include 元素中定义不同的参数值。比如：

```xml
<sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>
```

这个 SQL 片段可以在其它语句中使用，例如：

```xml
<select id="selectUsers" resultType="map">
  select
    <include refid="userColumns"><property name="alias" value="t1"/></include>,
    <include refid="userColumns"><property name="alias" value="t2"/></include>
  from some_table t1
    cross join some_table t2
</select>
```

也可以在 include 元素的 refid 属性或内部语句中使用属性值，例如：

```xml
<sql id="sometable">
  ${prefix}Table
</sql>

<sql id="someinclude">
  from
    <include refid="${include_target}"/>
</sql>

<select id="select" resultType="map">
  select
    field1, field2, field3
  <include refid="someinclude">
    <property name="prefix" value="Some"/>
    <property name="include_target" value="sometable"/>
  </include>
</select>
```

#### 参数

之前见到的所有语句都使用了简单的参数形式。但实际上，参数是 MyBatis 非常强大的元素。对于大多数简单的使用场景，你都不需要使用复杂的参数，比如：

```xml
<select id="selectUsers" resultType="User">
  select id, username, password
  from users
  where id = #{id}
</select>
```

上面的这个示例说明了一个非常简单的命名参数映射。鉴于参数类型（parameterType）会被自动设置为 `int`，这个参数可以随意命名。原始类型或简单数据类型（比如 `Integer` 和 `String`）因为没有其它属性，会用它们的值来作为参数。 然而，如果传入一个复杂的对象，行为就会有点不一样了。比如：

```xml
<insert id="insertUser" parameterType="User">
  insert into users (id, username, password)
  values (#{id}, #{username}, #{password})
</insert>
```

如果 User 类型的参数对象传递到了语句中，会查找 id、username 和 password 属性，然后将它们的值传入预处理语句的参数中。

对传递语句参数来说，这种方式真是干脆利落。不过参数映射的功能远不止于此。

首先，和 MyBatis 的其它部分一样，参数也可以指定一个特殊的数据类型。

```xml
#{property,javaType=int,jdbcType=NUMERIC}
```

和 MyBatis 的其它部分一样，几乎总是可以根据参数对象的类型确定 javaType，除非该对象是一个 `HashMap`。这个时候，你需要显式指定 `javaType` 来确保正确的类型处理器（`TypeHandler`）被使用。

**提示**  

>  JDBC 要求，如果一个列允许使用 null 值，并且会使用值为 null 的参数，就必须要指定 JDBC 类型（jdbcType）。

对于数值类型，还可以设置 `numericScale` 指定小数点后保留的位数。

```xml
#{height,javaType=double,jdbcType=NUMERIC,numericScale=2}
```

#### 字符串替换

默认情况下，使用 `#{}` 参数语法时，MyBatis 会创建 `PreparedStatement` 参数占位符，并通过占位符安全地设置参数（就像使用 ? 一样）。 这样做更安全，更迅速，通常也是首选做法，不过有时你就是想直接在 SQL 语句中直接插入一个不转义的字符串。 比如 ORDER BY 子句，这时候你可以：

```xml
ORDER BY ${columnName}
```

这样，MyBatis 就不会修改或转义该字符串了。

当 SQL 语句中的元数据（如表名或列名）是动态生成的时候，字符串替换将会非常有用。 举个例子，如果你想 `select` 一个表任意一列的数据时，不需要这样写：

```java
@Select("select * from user where id = #{id}")
User findById(@Param("id") long id);

@Select("select * from user where name = #{name}")
User findByName(@Param("name") String name);

@Select("select * from user where email = #{email}")
User findByEmail(@Param("email") String email);

// 其它的 "findByXxx" 方法
```

而是可以只写这样一个方法：

```java
@Select("select * from user where ${column} = #{value}")
User findByColumn(@Param("column") String column, @Param("value") String value);
```

其中 `${column}` 会被直接替换，而 `#{value}` 会使用 `?` 预处理。 这样，就能完成同样的任务：

```
User userOfId1 = userMapper.findByColumn("id", 1L);
User userOfNameKid = userMapper.findByColumn("name", "kid");
User userOfEmail = userMapper.findByColumn("email", "noone@nowhere.com");
```

这种方式也同样适用于替换表名的情况。

**提示** 

> 用这种方式接受用户的输入，并用作语句参数是不安全的，会导致潜在的 SQL 注入攻击。因此，要么不允许用户输入这些字段，要么自行转义并检验这些参数。

#### 结果映射

`resultMap` 元素是 MyBatis 中最重要最强大的元素。它可以让你从 90% 的 JDBC `ResultSets` 数据提取代码中解放出来，并在一些情形下允许你进行一些 JDBC 不支持的操作。实际上，在为一些比如连接的复杂语句编写映射代码的时候，一份 `resultMap` 能够代替实现同等功能的数千行代码。ResultMap 的设计思想是，对简单的语句做到零配置，对于复杂一点的语句，只需要描述语句之间的关系就行了。

之前你已经见过简单映射语句的示例，它们没有显式指定 `resultMap`。比如：

```xml
<select id="selectUsers" resultType="map">
  select id, username, hashedPassword
  from some_table
  where id = #{id}
</select>
```

上述语句只是简单地将所有的列映射到 `HashMap` 的键上，这由 `resultType` 属性指定。虽然在大部分情况下都够用，但是 HashMap 并不是一个很好的领域模型。你的程序更可能会使用 JavaBean 或 POJO（Plain Old Java Objects，普通老式 Java 对象）作为领域模型。MyBatis 对两者都提供了支持。看看下面这个 JavaBean：

```java
package com.someapp.model;
public class User {
  private int id;
  private String username;
  private String hashedPassword;

  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getHashedPassword() {
    return hashedPassword;
  }
  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }
}
```

基于 JavaBean 的规范，上面这个类有 3 个属性：id，username 和 hashedPassword。这些属性会对应到 select 语句中的列名。

这样的一个 JavaBean 可以被映射到 `ResultSet`，就像映射到 `HashMap` 一样简单。

```xml
<select id="selectUsers" resultType="com.someapp.model.User">
  select id, username, hashedPassword
  from some_table
  where id = #{id}
</select>
```

类型别名是你的好帮手。使用它们，你就可以不用输入类的全限定名了。比如：

```xml
<!-- mybatis-config.xml 中 -->
<typeAlias type="com.someapp.model.User" alias="User"/>

<!-- SQL 映射 XML 中 -->
<select id="selectUsers" resultType="User">
  select id, username, hashedPassword
  from some_table
  where id = #{id}
</select>
```

在这些情况下，MyBatis 会在幕后自动创建一个 `ResultMap`，再根据属性名来映射列到 JavaBean 的属性上。如果列名和属性名不能匹配上，可以在 SELECT 语句中设置列别名（这是一个基本的 SQL 特性）来完成匹配。比如：

```xml
<select id="selectUsers" resultType="User">
  select
    user_id             as "id",
    user_name           as "userName",
    hashed_password     as "hashedPassword"
  from some_table
  where id = #{id}
</select>
```

在学习了上面的知识后，你会发现上面的例子没有一个需要显式配置 `ResultMap`，这就是 `ResultMap` 的优秀之处——你完全可以不用显式地配置它们。 虽然上面的例子不用显式配置 `ResultMap`。 但为了讲解，我们来看看如果在刚刚的示例中，显式使用外部的 `resultMap` 会怎样，这也是解决列名不匹配的另外一种方式。

```xml
<resultMap id="userResultMap" type="User">
  <id property="id" column="user_id" />
  <result property="username" column="user_name"/>
  <result property="password" column="hashed_password"/>
</resultMap>
```

然后在引用它的语句中设置 `resultMap` 属性就行了（注意我们去掉了 `resultType` 属性）。比如:

```xml
<select id="selectUsers" resultMap="userResultMap">
  select user_id, user_name, hashed_password
  from some_table
  where id = #{id}
</select>
```

#### 高级结果映射

MyBatis 创建时的一个思想是：数据库不可能永远是你所想或所需的那个样子。 我们希望每个数据库都具备良好的第三范式或 BCNF 范式，可惜它们并不都是那样。 如果能有一种数据库映射模式，完美适配所有的应用程序，那就太好了，但可惜也没有。 而 ResultMap 就是 MyBatis 对这个问题的答案。

比如，我们如何映射下面这个语句？

```xml
<!-- 非常复杂的语句 -->
<select id="selectBlogDetails" resultMap="detailedBlogResultMap">
  select
       B.id as blog_id,
       B.title as blog_title,
       B.author_id as blog_author_id,
       A.id as author_id,
       A.username as author_username,
       A.password as author_password,
       A.email as author_email,
       A.bio as author_bio,
       A.favourite_section as author_favourite_section,
       P.id as post_id,
       P.blog_id as post_blog_id,
       P.author_id as post_author_id,
       P.created_on as post_created_on,
       P.section as post_section,
       P.subject as post_subject,
       P.draft as draft,
       P.body as post_body,
       C.id as comment_id,
       C.post_id as comment_post_id,
       C.name as comment_name,
       C.comment as comment_text,
       T.id as tag_id,
       T.name as tag_name
  from Blog B
       left outer join Author A on B.author_id = A.id
       left outer join Post P on B.id = P.blog_id
       left outer join Comment C on P.id = C.post_id
       left outer join Post_Tag PT on PT.post_id = P.id
       left outer join Tag T on PT.tag_id = T.id
  where B.id = #{id}
</select>
```

你可能想把它映射到一个智能的对象模型，这个对象表示了一篇博客，它由某位作者所写，有很多的博文，每篇博文有零或多条的评论和标签。 我们先来看看下面这个完整的例子，它是一个非常复杂的结果映射（假设作者，博客，博文，评论和标签都是类型别名）。

```xml
<!-- 非常复杂的结果映射 -->
<resultMap id="detailedBlogResultMap" type="Blog">
  <constructor>
    <idArg column="blog_id" javaType="int"/>
  </constructor>
  <result property="title" column="blog_title"/>
  <association property="author" javaType="Author">
    <id property="id" column="author_id"/>
    <result property="username" column="author_username"/>
    <result property="password" column="author_password"/>
    <result property="email" column="author_email"/>
    <result property="bio" column="author_bio"/>
    <result property="favouriteSection" column="author_favourite_section"/>
  </association>
  <collection property="posts" ofType="Post">
    <id property="id" column="post_id"/>
    <result property="subject" column="post_subject"/>
    <association property="author" javaType="Author"/>
    <collection property="comments" ofType="Comment">
      <id property="id" column="comment_id"/>
    </collection>
    <collection property="tags" ofType="Tag" >
      <id property="id" column="tag_id"/>
    </collection>
    <discriminator javaType="int" column="draft">
      <case value="1" resultType="DraftPost"/>
    </discriminator>
  </collection>
</resultMap>
```

`resultMap` 元素有很多子元素和一个值得深入探讨的结构。 下面是`resultMap` 元素的概念视图。

#####结果映射（resultMap）

- `constructor` - 用于在实例化类时，注入结果到构造方法中
  - `idArg` - ID 参数；标记出作为 ID 的结果可以帮助提高整体性能
  - `arg` - 将被注入到构造方法的一个普通结果
- `id` – 一个 ID 结果；标记出作为 ID 的结果可以帮助提高整体性能
- `result` – 注入到字段或 JavaBean 属性的普通结果
- `association`– 一个复杂类型的关联；许多结果将包装成这种类型
  - 嵌套结果映射 – 关联可以是 `resultMap` 元素，或是对其它结果映射的引用
- `collection`– 一个复杂类型的集合
  - 嵌套结果映射 – 集合可以是 `resultMap` 元素，或是对其它结果映射的引用
- `discriminator`– 使用结果值来决定使用哪个`resultMap`
  - `case`– 基于某些值的结果映射
    - 嵌套结果映射 – `case` 也是一个结果映射，因此具有相同的结构和元素；或者引用其它的结果映射

| 属性          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `id`          | 当前命名空间中的一个唯一标识，用于标识一个结果映射。         |
| `type`        | 类的完全限定名, 或者一个类型别名（关于内置的类型别名，可以参考上面的表格）。 |
| `autoMapping` | 如果设置这个属性，MyBatis 将会为本结果映射开启或者关闭自动映射。 这个属性会覆盖全局的属性 autoMappingBehavior。默认值：未设置（unset）。 |

**最佳实践** 最好逐步建立结果映射。单元测试可以在这个过程中起到很大帮助。 如果你尝试一次性创建像上面示例那么巨大的结果映射，不仅容易出错，难度也会直线上升。 所以，从最简单的形态开始，逐步迭代。而且别忘了单元测试！ 有时候，框架的行为像是一个黑盒子（无论是否开源）。因此，为了确保实现的行为与你的期望相一致，最好编写单元测试。 并且单元测试在提交 bug 时也能起到很大的作用。

下一部分将详细说明每个元素。

##### id & result

```xml
<id property="id" column="post_id"/>
<result property="subject" column="post_subject"/>
```

这些元素是结果映射的基础。*id* 和 *result* 元素都将一个列的值映射到一个简单数据类型（String, int, double, Date 等）的属性或字段。

这两者之间的唯一不同是，*id* 元素对应的属性会被标记为对象的标识符，在比较对象实例时使用。 这样可以提高整体的性能，尤其是进行缓存和嵌套结果映射（也就是连接映射）的时候。

两个元素都有一些属性：

| 属性          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `property`    | 映射到列结果的字段或属性。如果 JavaBean 有这个名字的属性（property），会先使用该属性。否则 MyBatis 将会寻找给定名称的字段（field）。 无论是哪一种情形，你都可以使用常见的点式分隔形式进行复杂属性导航。 比如，你可以这样映射一些简单的东西：“username”，或者映射到一些复杂的东西上：“address.street.number”。 |
| `column`      | 数据库中的列名，或者是列的别名。一般情况下，这和传递给 `resultSet.getString(columnName)` 方法的参数一样。 |
| `javaType`    | 一个 Java 类的全限定名，或一个类型别名（关于内置的类型别名，可以参考上面的表格）。 如果你映射到一个 JavaBean，MyBatis 通常可以推断类型。然而，如果你映射到的是 HashMap，那么你应该明确地指定 javaType 来保证行为与期望的相一致。 |
| `jdbcType`    | JDBC 类型，所支持的 JDBC 类型参见这个表格之后的“支持的 JDBC 类型”。 只需要在可能执行插入、更新和删除的且允许空值的列上指定 JDBC 类型。这是 JDBC 的要求而非 MyBatis 的要求。如果你直接面向 JDBC 编程，你需要对可以为空值的列指定这个类型。 |
| `typeHandler` | 我们在前面讨论过默认的类型处理器。使用这个属性，你可以覆盖默认的类型处理器。 这个属性值是一个类型处理器实现类的全限定名，或者是类型别名。 |

##### 支持的 JDBC 类型

为了以后可能的使用场景，MyBatis 通过内置的 jdbcType 枚举类型支持下面的 JDBC 类型。

| `BIT`      | `FLOAT`   | `CHAR`        | `TIMESTAMP`     | `OTHER`   | `UNDEFINED` |
| ---------- | --------- | ------------- | --------------- | --------- | ----------- |
| `TINYINT`  | `REAL`    | `VARCHAR`     | `BINARY`        | `BLOB`    | `NVARCHAR`  |
| `SMALLINT` | `DOUBLE`  | `LONGVARCHAR` | `VARBINARY`     | `CLOB`    | `NCHAR`     |
| `INTEGER`  | `NUMERIC` | `DATE`        | `LONGVARBINARY` | `BOOLEAN` | `NCLOB`     |
| `BIGINT`   | `DECIMAL` | `TIME`        | `NULL`          | `CURSOR`  | `ARRAY`     |

##### 构造方法

通过修改对象属性的方式，可以满足大多数的数据传输对象（Data Transfer Object, DTO）以及绝大部分领域模型的要求。但有些情况下你想使用不可变类。 一般来说，很少改变或基本不变的包含引用或数据的表，很适合使用不可变类。 构造方法注入允许你在初始化时为类设置属性的值，而不用暴露出公有方法。MyBatis 也支持私有属性和私有 JavaBean 属性来完成注入，但有一些人更青睐于通过构造方法进行注入。 *constructor* 元素就是为此而生的。

看看下面这个构造方法:

```java
public class User {
   //...
   public User(Integer id, String username, int age) {
     //...
  }
//...
}
```

为了将结果注入构造方法，MyBatis 需要通过某种方式定位相应的构造方法。 在下面的例子中，MyBatis 搜索一个声明了三个形参的构造方法，参数类型以 `java.lang.Integer`, `java.lang.String` 和 `int` 的顺序给出。

```xml
<constructor>
   <idArg column="id" javaType="int"/>
   <arg column="username" javaType="String"/>
   <arg column="age" javaType="_int"/>
</constructor>
```

当你在处理一个带有多个形参的构造方法时，很容易搞乱 arg 元素的顺序。 从版本 3.4.3 开始，可以在指定参数名称的前提下，以任意顺序编写 arg 元素。 为了通过名称来引用构造方法参数，你可以添加 `@Param` 注解，或者使用 '-parameters' 编译选项并启用 `useActualParamName` 选项（默认开启）来编译项目。下面是一个等价的例子，尽管函数签名中第二和第三个形参的顺序与 constructor 元素中参数声明的顺序不匹配。

```xml
<constructor>
   <idArg column="id" javaType="int" name="id" />
   <arg column="age" javaType="_int" name="age" />
   <arg column="username" javaType="String" name="username" />
</constructor>
```

如果存在名称和类型相同的属性，那么可以省略 `javaType` 。

剩余的属性和规则和普通的 id 和 result 元素是一样的。

| 属性          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `column`      | 数据库中的列名，或者是列的别名。一般情况下，这和传递给 `resultSet.getString(columnName)` 方法的参数一样。 |
| `javaType`    | 一个 Java 类的完全限定名，或一个类型别名（关于内置的类型别名，可以参考上面的表格）。 如果你映射到一个 JavaBean，MyBatis 通常可以推断类型。然而，如果你映射到的是 HashMap，那么你应该明确地指定 javaType 来保证行为与期望的相一致。 |
| `jdbcType`    | JDBC 类型，所支持的 JDBC 类型参见这个表格之前的“支持的 JDBC 类型”。 只需要在可能执行插入、更新和删除的且允许空值的列上指定 JDBC 类型。这是 JDBC 的要求而非 MyBatis 的要求。如果你直接面向 JDBC 编程，你需要对可能存在空值的列指定这个类型。 |
| `typeHandler` | 我们在前面讨论过默认的类型处理器。使用这个属性，你可以覆盖默认的类型处理器。 这个属性值是一个类型处理器实现类的完全限定名，或者是类型别名。 |
| `select`      | 用于加载复杂类型属性的映射语句的 ID，它会从 column 属性中指定的列检索数据，作为参数传递给此 select 语句。具体请参考关联元素。 |
| `resultMap`   | 结果映射的 ID，可以将嵌套的结果集映射到一个合适的对象树中。 它可以作为使用额外 select 语句的替代方案。它可以将多表连接操作的结果映射成一个单一的 `ResultSet`。这样的 `ResultSet` 将会将包含重复或部分数据重复的结果集。为了将结果集正确地映射到嵌套的对象树中，MyBatis 允许你 “串联”结果映射，以便解决嵌套结果集的问题。想了解更多内容，请参考下面的关联元素。 |
| `name`        | 构造方法形参的名字。从 3.4.3 版本开始，通过指定具体的参数名，你可以以任意顺序写入 arg 元素。参看上面的解释。 |

##### 关联

```xml
<association property="author" column="blog_author_id" javaType="Author">
  <id property="id" column="author_id"/>
  <result property="username" column="author_username"/>
</association>
```

关联（association）元素处理“有一个”类型的关系。 比如，在我们的示例中，一个博客有一个用户。关联结果映射和其它类型的映射工作方式差不多。 你需要指定目标属性名以及属性的`javaType`（很多时候 MyBatis 可以自己推断出来），在必要的情况下你还可以设置 JDBC 类型，如果你想覆盖获取结果值的过程，还可以设置类型处理器。

关联的不同之处是，你需要告诉 MyBatis 如何加载关联。MyBatis 有两种不同的方式加载关联：

- 嵌套 Select 查询：通过执行另外一个 SQL 映射语句来加载期望的复杂类型。
- 嵌套结果映射：使用嵌套的结果映射来处理连接结果的重复子集。

首先，先让我们来看看这个元素的属性。你将会发现，和普通的结果映射相比，它只在 select 和 resultMap 属性上有所不同。

| 属性          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `property`    | 映射到列结果的字段或属性。如果用来匹配的 JavaBean 存在给定名字的属性，那么它将会被使用。否则 MyBatis 将会寻找给定名称的字段。 无论是哪一种情形，你都可以使用通常的点式分隔形式进行复杂属性导航。 比如，你可以这样映射一些简单的东西：“username”，或者映射到一些复杂的东西上：“address.street.number”。 |
| `javaType`    | 一个 Java 类的完全限定名，或一个类型别名（关于内置的类型别名，可以参考上面的表格）。 如果你映射到一个 JavaBean，MyBatis 通常可以推断类型。然而，如果你映射到的是 HashMap，那么你应该明确地指定 javaType 来保证行为与期望的相一致。 |
| `jdbcType`    | JDBC 类型，所支持的 JDBC 类型参见这个表格之前的“支持的 JDBC 类型”。 只需要在可能执行插入、更新和删除的且允许空值的列上指定 JDBC 类型。这是 JDBC 的要求而非 MyBatis 的要求。如果你直接面向 JDBC 编程，你需要对可能存在空值的列指定这个类型。 |
| `typeHandler` | 我们在前面讨论过默认的类型处理器。使用这个属性，你可以覆盖默认的类型处理器。 这个属性值是一个类型处理器实现类的完全限定名，或者是类型别名。 |

##### 关联的嵌套 Select 查询

| 属性        | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| `column`    | 数据库中的列名，或者是列的别名。一般情况下，这和传递给 `resultSet.getString(columnName)` 方法的参数一样。 注意：在使用复合主键的时候，你可以使用 `column="{prop1=col1,prop2=col2}"` 这样的语法来指定多个传递给嵌套 Select 查询语句的列名。这会使得 `prop1` 和 `prop2` 作为参数对象，被设置为对应嵌套 Select 语句的参数。 |
| `select`    | 用于加载复杂类型属性的映射语句的 ID，它会从 column 属性指定的列中检索数据，作为参数传递给目标 select 语句。 具体请参考下面的例子。注意：在使用复合主键的时候，你可以使用 `column="{prop1=col1,prop2=col2}"` 这样的语法来指定多个传递给嵌套 Select 查询语句的列名。这会使得 `prop1` 和 `prop2` 作为参数对象，被设置为对应嵌套 Select 语句的参数。 |
| `fetchType` | 可选的。有效值为 `lazy` 和 `eager`。 指定属性后，将在映射中忽略全局配置参数 `lazyLoadingEnabled`，使用属性的值。 |

示例：

```xml
<resultMap id="blogResult" type="Blog">
  <association property="author" column="author_id" javaType="Author" select="selectAuthor"/>
</resultMap>

<select id="selectBlog" resultMap="blogResult">
  SELECT * FROM BLOG WHERE ID = #{id}
</select>

<select id="selectAuthor" resultType="Author">
  SELECT * FROM AUTHOR WHERE ID = #{id}
</select>
```

就是这么简单。我们有两个 select 查询语句：一个用来加载博客（Blog），另外一个用来加载作者（Author），而且博客的结果映射描述了应该使用 `selectAuthor` 语句加载它的 author 属性。

其它所有的属性将会被自动加载，只要它们的列名和属性名相匹配。

这种方式虽然很简单，但在大型数据集或大型数据表上表现不佳。这个问题被称为“N+1 查询问题”。 概括地讲，N+1 查询问题是这样子的：

- 你执行了一个单独的 SQL 语句来获取结果的一个列表（就是“+1”）。
- 对列表返回的每条记录，你执行一个 select 查询语句来为每条记录加载详细信息（就是“N”）。

这个问题会导致成百上千的 SQL 语句被执行。有时候，我们不希望产生这样的后果。

好消息是，MyBatis 能够对这样的查询进行延迟加载，因此可以将大量语句同时运行的开销分散开来。 然而，如果你加载记录列表之后立刻就遍历列表以获取嵌套的数据，就会触发所有的延迟加载查询，性能可能会变得很糟糕。

所以还有另外一种方法。

##### 关联的嵌套结果映射

| 属性            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| `resultMap`     | 结果映射的 ID，可以将此关联的嵌套结果集映射到一个合适的对象树中。 它可以作为使用额外 select 语句的替代方案。它可以将多表连接操作的结果映射成一个单一的 `ResultSet`。这样的 `ResultSet` 有部分数据是重复的。 为了将结果集正确地映射到嵌套的对象树中, MyBatis 允许你“串联”结果映射，以便解决嵌套结果集的问题。使用嵌套结果映射的一个例子在表格以后。 |
| `columnPrefix`  | 当连接多个表时，你可能会不得不使用列别名来避免在 `ResultSet` 中产生重复的列名。指定 columnPrefix 列名前缀允许你将带有这些前缀的列映射到一个外部的结果映射中。 详细说明请参考后面的例子。 |
| `notNullColumn` | 默认情况下，在至少一个被映射到属性的列不为空时，子对象才会被创建。 你可以在这个属性上指定非空的列来改变默认行为，指定后，Mybatis 将只在这些列中任意一列非空时才创建一个子对象。可以使用逗号分隔来指定多个列。默认值：未设置（unset）。 |
| `autoMapping`   | 如果设置这个属性，MyBatis 将会为本结果映射开启或者关闭自动映射。 这个属性会覆盖全局的属性 autoMappingBehavior。注意，本属性对外部的结果映射无效，所以不能搭配 `select` 或 `resultMap` 元素使用。默认值：未设置（unset）。 |

之前，你已经看到了一个非常复杂的嵌套关联的例子。 下面的例子则是一个非常简单的例子，用于演示嵌套结果映射如何工作。 现在我们将博客表和作者表连接在一起，而不是执行一个独立的查询语句，就像这样：

```xml
<select id="selectBlog" resultMap="blogResult">
  select
    B.id            as blog_id,
    B.title         as blog_title,
    B.author_id     as blog_author_id,
    A.id            as author_id,
    A.username      as author_username,
    A.password      as author_password,
    A.email         as author_email,
    A.bio           as author_bio
  from Blog B left outer join Author A on B.author_id = A.id
  where B.id = #{id}
</select>
```

注意查询中的连接，以及为确保结果能够拥有唯一且清晰的名字，我们设置的别名。 这使得进行映射非常简单。现在我们可以映射这个结果：

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <association property="author" column="blog_author_id" javaType="Author" resultMap="authorResult"/>
</resultMap>

<resultMap id="authorResult" type="Author">
  <id property="id" column="author_id"/>
  <result property="username" column="author_username"/>
  <result property="password" column="author_password"/>
  <result property="email" column="author_email"/>
  <result property="bio" column="author_bio"/>
</resultMap>
```

在上面的例子中，你可以看到，博客（Blog）作者（author）的关联元素委托名为 “authorResult” 的结果映射来加载作者对象的实例。

非常重要： id 元素在嵌套结果映射中扮演着非常重要的角色。你应该总是指定一个或多个可以唯一标识结果的属性。 虽然，即使不指定这个属性，MyBatis 仍然可以工作，但是会产生严重的性能问题。 只需要指定可以唯一标识结果的最少属性。显然，你可以选择主键（复合主键也可以）。

现在，上面的示例使用了外部的结果映射元素来映射关联。这使得 Author 的结果映射可以被重用。 然而，如果你不打算重用它，或者你更喜欢将你所有的结果映射放在一个具有描述性的结果映射元素中。 你可以直接将结果映射作为子元素嵌套在内。这里给出使用这种方式的等效例子：

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <association property="author" javaType="Author">
    <id property="id" column="author_id"/>
    <result property="username" column="author_username"/>
    <result property="password" column="author_password"/>
    <result property="email" column="author_email"/>
    <result property="bio" column="author_bio"/>
  </association>
</resultMap>
```

那如果博客（blog）有一个共同作者（co-author）该怎么办？select 语句看起来会是这样的：

```xml
<select id="selectBlog" resultMap="blogResult">
  select
    B.id            as blog_id,
    B.title         as blog_title,
    A.id            as author_id,
    A.username      as author_username,
    A.password      as author_password,
    A.email         as author_email,
    A.bio           as author_bio,
    CA.id           as co_author_id,
    CA.username     as co_author_username,
    CA.password     as co_author_password,
    CA.email        as co_author_email,
    CA.bio          as co_author_bio
  from Blog B
  left outer join Author A on B.author_id = A.id
  left outer join Author CA on B.co_author_id = CA.id
  where B.id = #{id}
</select>
```

回忆一下，Author 的结果映射定义如下：

```xml
<resultMap id="authorResult" type="Author">
  <id property="id" column="author_id"/>
  <result property="username" column="author_username"/>
  <result property="password" column="author_password"/>
  <result property="email" column="author_email"/>
  <result property="bio" column="author_bio"/>
</resultMap>
```

由于结果中的列名与结果映射中的列名不同。你需要指定 `columnPrefix` 以便重复使用该结果映射来映射 co-author 的结果。

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <association property="author"
    resultMap="authorResult" />
  <association property="coAuthor"
    resultMap="authorResult"
    columnPrefix="co_" />
</resultMap>
```

##### 关联的多结果集（ResultSet）

| 属性            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| `column`        | 当使用多个结果集时，该属性指定结果集中用于与 `foreignColumn` 匹配的列（多个列名以逗号隔开），以识别关系中的父类型与子类型。 |
| `foreignColumn` | 指定外键对应的列名，指定的列将与父类型中 `column` 的给出的列进行匹配。 |
| `resultSet`     | 指定用于加载复杂类型的结果集名字。                           |

从版本 3.2.3 开始，MyBatis 提供了另一种解决 N+1 查询问题的方法。

某些数据库允许存储过程返回多个结果集，或一次性执行多个语句，每个语句返回一个结果集。 我们可以利用这个特性，在不使用连接的情况下，只访问数据库一次就能获得相关数据。

在例子中，存储过程执行下面的查询并返回两个结果集。第一个结果集会返回博客（Blog）的结果，第二个则返回作者（Author）的结果。

```
SELECT * FROM BLOG WHERE ID = #{id}

SELECT * FROM AUTHOR WHERE ID = #{id}
```

在映射语句中，必须通过 `resultSets` 属性为每个结果集指定一个名字，多个名字使用逗号隔开。

```
<select id="selectBlog" resultSets="blogs,authors" resultMap="blogResult" statementType="CALLABLE">
  {call getBlogsAndAuthors(#{id,jdbcType=INTEGER,mode=IN})}
</select>
```

现在我们可以指定使用 “authors” 结果集的数据来填充 “author” 关联：

```
<resultMap id="blogResult" type="Blog">
  <id property="id" column="id" />
  <result property="title" column="title"/>
  <association property="author" javaType="Author" resultSet="authors" column="author_id" foreignColumn="id">
    <id property="id" column="id"/>
    <result property="username" column="username"/>
    <result property="password" column="password"/>
    <result property="email" column="email"/>
    <result property="bio" column="bio"/>
  </association>
</resultMap>
```

你已经在上面看到了如何处理“有一个”类型的关联。但是该怎么处理“有很多个”类型的关联呢？这就是我们接下来要介绍的。

##### 集合

```xml
<collection property="posts" ofType="domain.blog.Post">
  <id property="id" column="post_id"/>
  <result property="subject" column="post_subject"/>
  <result property="body" column="post_body"/>
</collection>
```

集合元素和关联元素几乎是一样的，它们相似的程度之高，以致于没有必要再介绍集合元素的相似部分。 所以让我们来关注它们的不同之处吧。

我们来继续上面的示例，一个博客（Blog）只有一个作者（Author)。但一个博客有很多文章（Post)。 在博客类中，这可以用下面的写法来表示：

```java
private List<Post> posts;
```

要像上面这样，映射嵌套结果集合到一个 List 中，可以使用集合元素。 和关联元素一样，我们可以使用嵌套 Select 查询，或基于连接的嵌套结果映射集合。

#####集合的嵌套 Select 查询

首先，让我们看看如何使用嵌套 Select 查询来为博客加载文章。

```xml
<resultMap id="blogResult" type="Blog">
  <collection property="posts" javaType="ArrayList" column="id" ofType="Post" select="selectPostsForBlog"/>
</resultMap>

<select id="selectBlog" resultMap="blogResult">
  SELECT * FROM BLOG WHERE ID = #{id}
</select>

<select id="selectPostsForBlog" resultType="Post">
  SELECT * FROM POST WHERE BLOG_ID = #{id}
</select>
```

你可能会立刻注意到几个不同，但大部分都和我们上面学习过的关联元素非常相似。 首先，你会注意到我们使用的是集合元素。 接下来你会注意到有一个新的 “ofType” 属性。这个属性非常重要，它用来将 JavaBean（或字段）属性的类型和集合存储的类型区分开来。 所以你可以按照下面这样来阅读映射：

```xml
<collection property="posts" javaType="ArrayList" column="id" ofType="Post" select="selectPostsForBlog"/>
```

读作： “posts 是一个存储 Post 的 ArrayList 集合”

在一般情况下，MyBatis 可以推断 javaType 属性，因此并不需要填写。所以很多时候你可以简略成：

```xml
<collection property="posts" column="id" ofType="Post" select="selectPostsForBlog"/>
```

#####集合的嵌套结果映射

现在你可能已经猜到了集合的嵌套结果映射是怎样工作的——除了新增的 “ofType” 属性，它和关联的完全相同。

首先, 让我们看看对应的 SQL 语句：

```xml
<select id="selectBlog" resultMap="blogResult">
  select
  B.id as blog_id,
  B.title as blog_title,
  B.author_id as blog_author_id,
  P.id as post_id,
  P.subject as post_subject,
  P.body as post_body,
  from Blog B
  left outer join Post P on B.id = P.blog_id
  where B.id = #{id}
</select>
```

我们再次连接了博客表和文章表，并且为每一列都赋予了一个有意义的别名，以便映射保持简单。 要映射博客里面的文章集合，就这么简单：

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <collection property="posts" ofType="Post">
    <id property="id" column="post_id"/>
    <result property="subject" column="post_subject"/>
    <result property="body" column="post_body"/>
  </collection>
</resultMap>
```

再提醒一次，要记得上面 id 元素的重要性，如果你不记得了，请阅读关联部分的相关部分。

如果你喜欢更详略的、可重用的结果映射，你可以使用下面的等价形式：

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="blog_id" />
  <result property="title" column="blog_title"/>
  <collection property="posts" ofType="Post" resultMap="blogPostResult" columnPrefix="post_"/>
</resultMap>

<resultMap id="blogPostResult" type="Post">
  <id property="id" column="id"/>
  <result property="subject" column="subject"/>
  <result property="body" column="body"/>
</resultMap>
```

#####集合的多结果集（ResultSet）

像关联元素那样，我们可以通过执行存储过程实现，它会执行两个查询并返回两个结果集，一个是博客的结果集，另一个是文章的结果集：

```sql
SELECT * FROM BLOG WHERE ID = #{id}

SELECT * FROM POST WHERE BLOG_ID = #{id}
```

在映射语句中，必须通过 `resultSets` 属性为每个结果集指定一个名字，多个名字使用逗号隔开。

```xml
<select id="selectBlog" resultSets="blogs,posts" resultMap="blogResult">
  {call getBlogsAndPosts(#{id,jdbcType=INTEGER,mode=IN})}
</select>
```

我们指定 “posts” 集合将会使用存储在 “posts” 结果集中的数据进行填充：

```xml
<resultMap id="blogResult" type="Blog">
  <id property="id" column="id" />
  <result property="title" column="title"/>
  <collection property="posts" ofType="Post" resultSet="posts" column="id" foreignColumn="blog_id">
    <id property="id" column="id"/>
    <result property="subject" column="subject"/>
    <result property="body" column="body"/>
  </collection>
</resultMap>
```

**注意** 对关联或集合的映射，并没有深度、广度或组合上的要求。但在映射时要留意性能问题。 在探索最佳实践的过程中，应用的单元测试和性能测试会是你的好帮手。 而 MyBatis 的好处在于，可以在不对你的代码引入重大变更（如果有）的情况下，允许你之后改变你的想法。

高级关联和集合映射是一个深度话题。文档的介绍只能到此为止。配合少许的实践，你会很快了解全部的用法。

##### 鉴别器

```xml
<discriminator javaType="int" column="draft">
  <case value="1" resultType="DraftPost"/>
</discriminator>
```

有时候，一个数据库查询可能会返回多个不同的结果集（但总体上还是有一定的联系的）。 鉴别器（discriminator）元素就是被设计来应对这种情况的，另外也能处理其它情况，例如类的继承层次结构。 鉴别器的概念很好理解——它很像 Java 语言中的 switch 语句。

一个鉴别器的定义需要指定 column 和 javaType 属性。column 指定了 MyBatis 查询被比较值的地方。 而 javaType 用来确保使用正确的相等测试（虽然很多情况下字符串的相等测试都可以工作）。例如：

```xml
<resultMap id="vehicleResult" type="Vehicle">
  <id property="id" column="id" />
  <result property="vin" column="vin"/>
  <result property="year" column="year"/>
  <result property="make" column="make"/>
  <result property="model" column="model"/>
  <result property="color" column="color"/>
  <discriminator javaType="int" column="vehicle_type">
    <case value="1" resultMap="carResult"/>
    <case value="2" resultMap="truckResult"/>
    <case value="3" resultMap="vanResult"/>
    <case value="4" resultMap="suvResult"/>
  </discriminator>
</resultMap>
```

在这个示例中，MyBatis 会从结果集中得到每条记录，然后比较它的 vehicle type 值。 如果它匹配任意一个鉴别器的 case，就会使用这个 case 指定的结果映射。 这个过程是互斥的，也就是说，剩余的结果映射将被忽略（除非它是扩展的，我们将在稍后讨论它）。 如果不能匹配任何一个 case，MyBatis 就只会使用鉴别器块外定义的结果映射。 所以，如果 carResult 的声明如下：

```xml
<resultMap id="carResult" type="Car">
  <result property="doorCount" column="door_count" />
</resultMap>
```

那么只有 doorCount 属性会被加载。这是为了即使鉴别器的 case 之间都能分为完全独立的一组，尽管和父结果映射可能没有什么关系。在上面的例子中，我们当然知道 cars 和 vehicles 之间有关系，也就是 Car 是一个 Vehicle。因此，我们希望剩余的属性也能被加载。而这只需要一个小修改。

```xml
<resultMap id="carResult" type="Car" extends="vehicleResult">
  <result property="doorCount" column="door_count" />
</resultMap>
```

现在 vehicleResult 和 carResult 的属性都会被加载了。

可能有人又会觉得映射的外部定义有点太冗长了。 因此，对于那些更喜欢简洁的映射风格的人来说，还有另一种语法可以选择。例如：

```xml
<resultMap id="vehicleResult" type="Vehicle">
  <id property="id" column="id" />
  <result property="vin" column="vin"/>
  <result property="year" column="year"/>
  <result property="make" column="make"/>
  <result property="model" column="model"/>
  <result property="color" column="color"/>
  <discriminator javaType="int" column="vehicle_type">
    <case value="1" resultType="carResult">
      <result property="doorCount" column="door_count" />
    </case>
    <case value="2" resultType="truckResult">
      <result property="boxSize" column="box_size" />
      <result property="extendedCab" column="extended_cab" />
    </case>
    <case value="3" resultType="vanResult">
      <result property="powerSlidingDoor" column="power_sliding_door" />
    </case>
    <case value="4" resultType="suvResult">
      <result property="allWheelDrive" column="all_wheel_drive" />
    </case>
  </discriminator>
</resultMap>
```

**提示** 

> 请注意，这些都是结果映射，如果你完全不设置任何的 result 元素，MyBatis 将为你自动匹配列和属性。所以上面的例子大多都要比实际的更复杂。 这也表明，大多数数据库的复杂度都比较高，我们不太可能一直依赖于这种机制。

####自动映射

正如你在前面一节看到的，在简单的场景下，MyBatis 可以为你自动映射查询结果。但如果遇到复杂的场景，你需要构建一个结果映射。 但是在本节中，你将看到，你可以混合使用这两种策略。让我们深入了解一下自动映射是怎样工作的。

当自动映射查询结果时，MyBatis 会获取结果中返回的列名并在 Java 类中查找相同名字的属性（忽略大小写）。 这意味着如果发现了 *ID* 列和 *id* 属性，MyBatis 会将列 *ID* 的值赋给 *id* 属性。

通常数据库列使用大写字母组成的单词命名，单词间用下划线分隔；而 Java 属性一般遵循驼峰命名法约定。为了在这两种命名方式之间启用自动映射，需要将 `mapUnderscoreToCamelCase` 设置为 true。

甚至在提供了结果映射后，自动映射也能工作。在这种情况下，对于每一个结果映射，在 ResultSet 出现的列，如果没有设置手动映射，将被自动映射。在自动映射处理完毕后，再处理手动映射。 在下面的例子中，*id* 和 *userName* 列将被自动映射，*hashed_password* 列将根据配置进行映射。

```xml
<select id="selectUsers" resultMap="userResultMap">
  select
    user_id             as "id",
    user_name           as "userName",
    hashed_password
  from some_table
  where id = #{id}
</select>
<resultMap id="userResultMap" type="User">
  <result property="password" column="hashed_password"/>
</resultMap>
```

有三种自动映射等级：

- `NONE` - 禁用自动映射。仅对手动映射的属性进行映射。
- `PARTIAL` - 对除在内部定义了嵌套结果映射（也就是连接的属性）以外的属性进行映射
- `FULL` - 自动映射所有属性。

默认值是 `PARTIAL`，这是有原因的。当对连接查询的结果使用 `FULL` 时，连接查询会在同一行中获取多个不同实体的数据，因此可能导致非预期的映射。 下面的例子将展示这种风险：

```xml
<select id="selectBlog" resultMap="blogResult">
  select
    B.id,
    B.title,
    A.username,
  from Blog B left outer join Author A on B.author_id = A.id
  where B.id = #{id}
</select>
<resultMap id="blogResult" type="Blog">
  <association property="author" resultMap="authorResult"/>
</resultMap>

<resultMap id="authorResult" type="Author">
  <result property="username" column="author_username"/>
</resultMap>
```

在该结果映射中，*Blog* 和 *Author* 均将被自动映射。但是注意 *Author* 有一个 *id* 属性，在 ResultSet 中也有一个名为 *id* 的列，所以 Author 的 id 将填入 Blog 的 id，这可不是你期望的行为。 所以，要谨慎使用 `FULL`。

无论设置的自动映射等级是哪种，你都可以通过在结果映射上设置 `autoMapping` 属性来为指定的结果映射设置启用/禁用自动映射。

```xml
<resultMap id="userResultMap" type="User" autoMapping="false">
  <result property="password" column="hashed_password"/>
</resultMap>
```

####缓存

MyBatis 内置了一个强大的事务性查询缓存机制，它可以非常方便地配置和定制。 为了使它更加强大而且易于配置，我们对 MyBatis 3 中的缓存实现进行了许多改进。

默认情况下，只启用了本地的会话缓存，它仅仅对一个会话中的数据进行缓存。 要启用全局的二级缓存，只需要在你的 SQL 映射文件中添加一行：

```xml
<cache/>
```

基本上就是这样。这个简单语句的效果如下:

- 映射语句文件中的所有 select 语句的结果将会被缓存。
- 映射语句文件中的所有 insert、update 和 delete 语句会刷新缓存。
- 缓存会使用最近最少使用算法（LRU, Least Recently Used）算法来清除不需要的缓存。
- 缓存不会定时进行刷新（也就是说，没有刷新间隔）。
- 缓存会保存列表或对象（无论查询方法返回哪种）的 1024 个引用。
- 缓存会被视为读/写缓存，这意味着获取到的对象并不是共享的，可以安全地被调用者修改，而不干扰其他调用者或线程所做的潜在修改。

**提示** 缓存只作用于 cache 标签所在的映射文件中的语句。如果你混合使用 Java API 和 XML 映射文件，在共用接口中的语句将不会被默认缓存。你需要使用 @CacheNamespaceRef 注解指定缓存作用域。

这些属性可以通过 cache 元素的属性来修改。比如：

```xml
<cache
  eviction="FIFO"
  flushInterval="60000"
  size="512"
  readOnly="true"/>
```

这个更高级的配置创建了一个 FIFO 缓存，每隔 60 秒刷新，最多可以存储结果对象或列表的 512 个引用，而且返回的对象被认为是只读的，因此对它们进行修改可能会在不同线程中的调用者产生冲突。

可用的清除策略有：

- `LRU` – 最近最少使用：移除最长时间不被使用的对象。
- `FIFO` – 先进先出：按对象进入缓存的顺序来移除它们。
- `SOFT` – 软引用：基于垃圾回收器状态和软引用规则移除对象。
- `WEAK` – 弱引用：更积极地基于垃圾收集器状态和弱引用规则移除对象。

默认的清除策略是 LRU。

flushInterval（刷新间隔）属性可以被设置为任意的正整数，设置的值应该是一个以毫秒为单位的合理时间量。 默认情况是不设置，也就是没有刷新间隔，缓存仅仅会在调用语句时刷新。

size（引用数目）属性可以被设置为任意正整数，要注意欲缓存对象的大小和运行环境中可用的内存资源。默认值是 1024。

readOnly（只读）属性可以被设置为 true 或 false。只读的缓存会给所有调用者返回缓存对象的相同实例。 因此这些对象不能被修改。这就提供了可观的性能提升。而可读写的缓存会（通过序列化）返回缓存对象的拷贝。 速度上会慢一些，但是更安全，因此默认值是 false。

**提示** 二级缓存是事务性的。这意味着，当 SqlSession 完成并提交时，或是完成并回滚，但没有执行 flushCache=true 的 insert/delete/update 语句时，缓存会获得更新。

##### 使用自定义缓存

除了上述自定义缓存的方式，你也可以通过实现你自己的缓存，或为其他第三方缓存方案创建适配器，来完全覆盖缓存行为。

```xml
<cache type="com.domain.something.MyCustomCache"/>
```

这个示例展示了如何使用一个自定义的缓存实现。type 属性指定的类必须实现 org.apache.ibatis.cache.Cache 接口，且提供一个接受 String 参数作为 id 的构造器。 这个接口是 MyBatis 框架中许多复杂的接口之一，但是行为却非常简单。

```java
public interface Cache {
  String getId();
  int getSize();
  void putObject(Object key, Object value);
  Object getObject(Object key);
  boolean hasKey(Object key);
  Object removeObject(Object key);
  void clear();
}
```

为了对你的缓存进行配置，只需要简单地在你的缓存实现中添加公有的 JavaBean 属性，然后通过 cache 元素传递属性值，例如，下面的例子将在你的缓存实现上调用一个名为 `setCacheFile(String file)` 的方法：

```xml
<cache type="com.domain.something.MyCustomCache">
  <property name="cacheFile" value="/tmp/my-custom-cache.tmp"/>
</cache>
```

你可以使用所有简单类型作为 JavaBean 属性的类型，MyBatis 会进行转换。 你也可以使用占位符（如 `${cache.file}`），以便替换成在[配置文件属性](https://mybatis.org/mybatis-3/zh/configuration.html#properties)中定义的值。

从版本 3.4.2 开始，MyBatis 已经支持在所有属性设置完毕之后，调用一个初始化方法。 如果想要使用这个特性，请在你的自定义缓存类里实现 `org.apache.ibatis.builder.InitializingObject` 接口。

```java
public interface InitializingObject {
  void initialize() throws Exception;
}
```

**提示** 上一节中对缓存的配置（如清除策略、可读或可读写等），不能应用于自定义缓存。

请注意，缓存的配置和缓存实例会被绑定到 SQL 映射文件的命名空间中。 因此，同一命名空间中的所有语句和缓存将通过命名空间绑定在一起。 每条语句可以自定义与缓存交互的方式，或将它们完全排除于缓存之外，这可以通过在每条语句上使用两个简单属性来达成。 默认情况下，语句会这样来配置：

```xml
<select ... flushCache="false" useCache="true"/>
<insert ... flushCache="true"/>
<update ... flushCache="true"/>
<delete ... flushCache="true"/>
```

鉴于这是默认行为，显然你永远不应该以这样的方式显式配置一条语句。但如果你想改变默认的行为，只需要设置 flushCache 和 useCache 属性。比如，某些情况下你可能希望特定 select 语句的结果排除于缓存之外，或希望一条 select 语句清空缓存。类似地，你可能希望某些 update 语句执行时不要刷新缓存。

#####cache-ref

回想一下上一节的内容，对某一命名空间的语句，只会使用该命名空间的缓存进行缓存或刷新。 但你可能会想要在多个命名空间中共享相同的缓存配置和实例。要实现这种需求，你可以使用 cache-ref 元素来引用另一个缓存。

```xml
<cache-ref namespace="com.someone.application.data.SomeMapper"/>
```

###     MyBatis 动态SQL

####      概述

>动态 SQL 是 MyBatis 的强大特性之一。如果你使用过 JDBC 或其它类似的框架，你应该能理解根据不同条件拼接 SQL 语句有多痛苦，例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL，可以彻底摆脱这种痛苦。
>
>使用动态 SQL 并非一件易事，但借助可用于任何 SQL 映射语句中的强大的动态 SQL 语言，MyBatis 显著地提升了这一特性的易用性。
>
>如果你之前用过 JSTL 或任何基于类 XML 语言的文本处理器，你对动态 SQL 元素可能会感觉似曾相识。在 MyBatis 之前的版本中，需要花时间了解大量的元素。借助功能强大的基于 OGNL 的表达式，MyBatis 3 替换了之前的大部分元素，大大精简了元素种类，现在要学习的元素种类比原来的一半还要少。

- if
- choose(when、otherwise)
- trim(where、set)
- foreach

#### if

使用动态 SQL 最常见情景是根据条件包含 where 子句的一部分。比如：

```xml
<select id="findActiveBlogWithTitleLike"
     resultType="Blog">
  SELECT * FROM BLOG
  WHERE state = ‘ACTIVE’
  <if test="title != null">
    AND title like #{title}
  </if>
</select>
```

这条语句提供了可选的查找文本功能。如果不传入 “title”，那么所有处于 “ACTIVE” 状态的 BLOG 都会返回；如果传入了 “title” 参数，那么就会对 “title” 一列进行模糊查找并返回对应的 BLOG 结果（“title” 的参数值需要包含查找掩码或通配符字符）。

如果希望通过 “title” 和 “author” 两个参数进行可选搜索该怎么办呢？只需要加入另一个条件即可。

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <if test="title != null">
    AND title like #{title}
  </if>
  <if test="author != null and author.name != null">
    AND author_name like #{author.name}
  </if>
</select>
```

#### choose、when、otherwise

有时候，我们不想使用所有的条件，而只是想从多个条件中选择一个使用。针对这种情况，MyBatis 提供了 choose 元素，它有点像 Java 中的 switch 语句。

还是上面的例子，但是策略变为：传入了 “title” 就按 “title” 查找，传入了 “author” 就按 “author” 查找的情形。若两者都没有传入，就返回标记为 featured 的 BLOG（这可能是管理员认为，与其返回大量的无意义随机 Blog，还不如返回一些由管理员精选的 Blog）。

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <choose>
    <when test="title != null">
      AND title like #{title}
    </when>
    <when test="author != null and author.name != null">
      AND author_name like #{author.name}
    </when>
    <otherwise>
      AND featured = 1
    </otherwise>
  </choose>
</select>
```

#### trim、where、set

前面几个例子已经方便地解决了一个臭名昭著的动态 SQL 问题。现在回到之前的 “if” 示例，这次我们将 “state = ‘ACTIVE’” 设置成动态条件，看看会发生什么。

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG
  WHERE
  <if test="state != null">
    state = #{state}
  </if>
  <if test="title != null">
    AND title like #{title}
  </if>
  <if test="author != null and author.name != null">
    AND author_name like #{author.name}
  </if>
</select>
```

如果没有匹配的条件会怎么样？最终这条 SQL 会变成这样：

```sql
SELECT * FROM BLOG
WHERE
```

这会导致查询失败。如果匹配的只是第二个条件又会怎样？这条 SQL 会是这样:

```sql
SELECT * FROM BLOG
WHERE
AND title like ‘someTitle’
```

MyBatis 有一个简单且适合大多数场景的解决办法。而在其他场景中，可以对其进行自定义以符合需求。而这，只需要一处简单的

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG
  <where>
    <if test="state != null">
         state = #{state}
    </if>
    <if test="title != null">
        AND title like #{title}
    </if>
    <if test="author != null and author.name != null">
        AND author_name like #{author.name}
    </if>
  </where>
</select>
```

*where* 元素只会在子元素返回任何内容的情况下才插入 “WHERE” 子句。而且，若子句的开头为 “AND” 或 “OR”，*where* 元素也会将它们去除。

如果 *where* 元素与你期望的不太一样，你也可以通过自定义 trim 元素来定制 *where* 元素的功能。比如，和 *where* 元素等价的自定义 trim 元素为：

```xml
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  ...
</trim>
```

*prefixOverrides* 属性会忽略通过管道符分隔的文本序列（注意此例中的空格是必要的）。上述例子会移除所有 *prefixOverrides* 属性中指定的内容，并且插入 *prefix* 属性中指定的内容。

用于动态更新语句的类似解决方案叫做 *set*。*set* 元素可以用于动态包含需要更新的列，忽略其它不更新的列。比如：

```xml
<update id="updateAuthorIfNecessary">
  update Author
    <set>
      <if test="username != null">username=#{username},</if>
      <if test="password != null">password=#{password},</if>
      <if test="email != null">email=#{email},</if>
      <if test="bio != null">bio=#{bio}</if>
    </set>
  where id=#{id}
</update>
```

这个例子中，*set* 元素会动态地在行首插入 SET 关键字，并会删掉额外的逗号（这些逗号是在使用条件语句给列赋值时引入的）。

或者，你可以通过使用*trim*元素来达到同样的效果：

```xml
<trim prefix="SET" suffixOverrides=",">
  ...
</trim>
```

注意，我们覆盖了后缀值设置，并且自定义了前缀值。

#### foreach

动态 SQL 的另一个常见使用场景是对集合进行遍历（尤其是在构建 IN 条件语句的时候）。比如：

```xml
<select id="selectPostIn" resultType="domain.blog.Post">
  SELECT *
  FROM POST P
  <where>
    <foreach item="item" index="index" collection="list"
        open="ID in (" separator="," close=")" nullable="true">
          #{item}
    </foreach>
  </where>
</select>
```

*foreach* 元素的功能非常强大，它允许你指定一个集合，声明可以在元素体内使用的集合项（item）和索引（index）变量。它也允许你指定开头与结尾的字符串以及集合项迭代之间的分隔符。这个元素也不会错误地添加多余的分隔符。

**提示** 

> 你可以将任何可迭代对象（如 List、Set 等）、Map 对象或者数组对象作为集合参数传递给 *foreach*。当使用可迭代对象或者数组时，index 是当前迭代的序号，item 的值是本次迭代获取到的元素。当使用 Map 对象（或者 Map.Entry 对象的集合）时，index 是键，item 是值。

至此，我们已经完成了与 XML 配置及映射文件相关的讨论。

#### script

要在带注解的映射器接口类中使用动态 SQL，可以使用 *script* 元素。比如:

```xml
@Update({"<script>",
    "update Author",
    "  <set>",
    "    <if test='username != null'>username=#{username},</if>",
    "    <if test='password != null'>password=#{password},</if>",
    "    <if test='email != null'>email=#{email},</if>",
    "    <if test='bio != null'>bio=#{bio}</if>",
    "  </set>",
    "where id=#{id}",
    "</script>"})
void updateAuthorValues(Author author);
```

## SpringBoot配置Redis

### 简介

Redis是我们Java开发中，使用频次非常高的一个nosql数据库，数据以key-value键值对的形式存储在内存中。redis的常用使用场景，可以做缓存，分布式锁，自增序列等，使用redis的方式和我们使用数据库的方式差不多，首先我们要在自己的本机电脑或者服务器上安装一个redis的服务器，通过我们的java客户端在程序中进行集成，然后通过客户端完成对redis的增删改查操作。redis的Java客户端类型还是很多的，常见的有jedis, redission,lettuce等，所以我们在集成的时候，我们可以选择直接集成这些原生客户端。但是在springBoot中更常见的方式是集成spring-data-redis，这是spring提供的一个专门用来操作redis的项目，封装了对redis的常用操作，里边主要封装了jedis和lettuce两个客户端。相当于是在他们的基础上加了一层门面。

###集成步骤

#### 1.添加依赖

添加redis所需依赖

```xml
<!-- 集成redis依赖  -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

在配置时，如果需要添加连接池，还需要引入另一个依赖

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

#### 2.添加配置

然后需要配置连接redis所需的账号密码等信息，这里需要提前安装好redis，保证本机可以连接到redis

常规配置如下，在`application.yml`文件中配置连接redis的连接信息

```yml
spring:
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
```

如果有其他配置放到一起

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/springboot_learning?serverTimezone=Asia/Shanghai&characterEncoding=utf-8
    username: root
    password: root
  redis:
    host: localhost
    port: 6379
    password: 123456
    database: 0
    lettuce:
      pool:
        max-idle: 16
        max-active: 32
        min-idle: 8
  devtools:
    restart:
      enable: true
```

这样就可以直接在项目当中操作redis了，如果是集群，那么使用如下配置方式：

``` yml
spring:
  redis:
    password: 123456
    cluster:
      nodes: 10.255.144.115:7001,10.255.144.115:7002,10.255.144.115:7003,10.255.144.115:7004,10.255.144.115:7005,10.255.144.115:7006
      max-redirects: 3
```

#### 3.项目中使用

在配置工作完成后，我们就可以在项目中操作redis了，操作的话，使用`spring-data-redis`中为我们提供的RedisTemplate这个类，就可以操作了。

下面先举一个简单的例子，插入键值对（值为string）

``` java
package com.gree.FirstDemo.controller;

import com.gree.FirstDemo.util.GlobalExceptionHandler.ResultBody;
import com.gree.FirstDemo.util.RedisUtil;
import io.swagger.annotations.Api;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "redis 测试控制器")
public class RedisTestController {

    private final RedisTemplate redisTemplate;
    private final RedisUtil redisUtil;

    public RedisTestController(RedisTemplate redisTemplate, RedisUtil redisUtil) {
        this.redisTemplate = redisTemplate;
        this.redisUtil = redisUtil;
    }

    @GetMapping("/redisSave")
    public ResultBody save(String key, String value){
        redisTemplate.opsForValue().set(key, value);
        return ResultBody.success();
    }
}
```

#### 4.工具类封装

这里，redis中可以支持 string, list, hash,set, zset五种数据格式，这五种数据格式的常用操作，都在RedisTemplate这个类中进行了封装。

操作string类型就是用opsForValue,操作list类型是用listOps, 操作set类型是用setOps等等。

而这些功能都在这一个类中，使用起来其实并不是很方便，所有一般情况下，我们都是单独封装一个工具类，来把常用的一些方法进行抽象。

操作的时候，直接通过工具类来操作。

``` java
package com.gree.FirstDemo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
public class RedisUtil {

    @Autowired
    private RedisTemplate redisTemplate;
    /**
     * 给一个指定的 key 值附加过期时间
     *
     * @param key
     * @param time
     * @return
     */
    public boolean expire(String key, long time) {
        return redisTemplate.expire(key, time, TimeUnit.SECONDS);
    }
    /**
     * 根据key 获取过期时间
     *
     * @param key
     * @return
     */
    public long getTime(String key) {
        return redisTemplate.getExpire(key, TimeUnit.SECONDS);
    }
    /**
     * 根据key 获取过期时间
     *
     * @param key
     * @return
     */
    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
    /**
     * 移除指定key 的过期时间
     *
     * @param key
     * @return
     */
    public boolean persist(String key) {
        return redisTemplate.boundValueOps(key).persist();
    }

    //- - - - - - - - - - - - - - - - - - - - -  String类型 - - - - - - - - - - - - - - - - - - - -

    /**
     * 根据key获取值
     *
     * @param key 键
     * @return 值
     */
    public Object get(String key) {
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }

    /**
     * 将值放入缓存
     *
     * @param key   键
     * @param value 值
     * @return true成功 false 失败
     */
    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 将值放入缓存并设置时间
     *
     * @param key   键
     * @param value 值
     * @param time  时间(秒) -1为无期限
     * @return true成功 false 失败
     */
    public void set(String key, String value, long time) {
        if (time > 0) {
            redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
        } else {
            redisTemplate.opsForValue().set(key, value);
        }
    }

    /**
     * 批量添加 key (重复的键会覆盖)
     *
     * @param keyAndValue
     */
    public void batchSet(Map<String, String> keyAndValue) {
        redisTemplate.opsForValue().multiSet(keyAndValue);
    }

    /**
     * 批量添加 key-value 只有在键不存在时,才添加
     * map 中只要有一个key存在,则全部不添加
     *
     * @param keyAndValue
     */
    public void batchSetIfAbsent(Map<String, String> keyAndValue) {
        redisTemplate.opsForValue().multiSetIfAbsent(keyAndValue);
    }

    /**
     * 对一个 key-value 的值进行加减操作,
     * 如果该 key 不存在 将创建一个key 并赋值该 number
     * 如果 key 存在,但 value 不是长整型 ,将报错
     *
     * @param key
     * @param number
     */
    public Long increment(String key, long number) {
        return redisTemplate.opsForValue().increment(key, number);
    }

    /**
     * 对一个 key-value 的值进行加减操作,
     * 如果该 key 不存在 将创建一个key 并赋值该 number
     * 如果 key 存在,但 value 不是 纯数字 ,将报错
     *
     * @param key
     * @param number
     */
    public Double increment(String key, double number) {
        return redisTemplate.opsForValue().increment(key, number);
    }

    //- - - - - - - - - - - - - - - - - - - - -  set类型 - - - - - - - - - - - - - - - - - - - -

    /**
     * 将数据放入set缓存
     *
     * @param key 键
     * @return
     */
    public void sSet(String key, String value) {
        redisTemplate.opsForSet().add(key, value);
    }

    /**
     * 获取变量中的值
     *
     * @param key 键
     * @return
     */
    public Set<Object> members(String key) {
        return redisTemplate.opsForSet().members(key);
    }

    /**
     * 随机获取变量中指定个数的元素
     *
     * @param key   键
     * @param count 值
     * @return
     */
    public void randomMembers(String key, long count) {
        redisTemplate.opsForSet().randomMembers(key, count);
    }

    /**
     * 随机获取变量中的元素
     *
     * @param key 键
     * @return
     */
    public Object randomMember(String key) {
        return redisTemplate.opsForSet().randomMember(key);
    }

    /**
     * 弹出变量中的元素
     *
     * @param key 键
     * @return
     */
    public Object pop(String key) {
        return redisTemplate.opsForSet().pop("setValue");
    }

    /**
     * 获取变量中值的长度
     *
     * @param key 键
     * @return
     */
    public long size(String key) {
        return redisTemplate.opsForSet().size(key);
    }

    /**
     * 根据value从一个set中查询,是否存在
     *
     * @param key   键
     * @param value 值
     * @return true 存在 false不存在
     */
    public boolean sHasKey(String key, Object value) {
        return redisTemplate.opsForSet().isMember(key, value);
    }

    /**
     * 检查给定的元素是否在变量中。
     *
     * @param key 键
     * @param obj 元素对象
     * @return
     */
    public boolean isMember(String key, Object obj) {
        return redisTemplate.opsForSet().isMember(key, obj);
    }

    /**
     * 转移变量的元素值到目的变量。
     *
     * @param key     键
     * @param value   元素对象
     * @param destKey 元素对象
     * @return
     */
    public boolean move(String key, String value, String destKey) {
        return redisTemplate.opsForSet().move(key, value, destKey);
    }

    /**
     * 批量移除set缓存中元素
     *
     * @param key    键
     * @param values 值
     * @return
     */
    public void remove(String key, Object... values) {
        redisTemplate.opsForSet().remove(key, values);
    }

    /**
     * 通过给定的key求2个set变量的差值
     *
     * @param key     键
     * @param destKey 键
     * @return
     */
    public Set<Set> difference(String key, String destKey) {
        return redisTemplate.opsForSet().difference(key, destKey);
    }


    //- - - - - - - - - - - - - - - - - - - - -  hash类型 - - - - - - - - - - - - - - - - - - - -

    /**
     * 加入缓存
     *
     * @param key 键
     * @param map 键
     * @return
     */
    public void add(String key, Map<String, String> map) {
        redisTemplate.opsForHash().putAll(key, map);
    }

    /**
     * 获取 key 下的 所有  hashkey 和 value
     *
     * @param key 键
     * @return
     */
    public Map<Object, Object> getHashEntries(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * 验证指定 key 下 有没有指定的 hashkey
     *
     * @param key
     * @param hashKey
     * @return
     */
    public boolean hashKey(String key, String hashKey) {
        return redisTemplate.opsForHash().hasKey(key, hashKey);
    }

    /**
     * 获取指定key的值string
     *
     * @param key  键
     * @param key2 键
     * @return
     */
    public String getMapString(String key, String key2) {
        return redisTemplate.opsForHash().get("map1", "key1").toString();
    }

    /**
     * 获取指定的值Int
     *
     * @param key  键
     * @param key2 键
     * @return
     */
    public Integer getMapInt(String key, String key2) {
        return (Integer) redisTemplate.opsForHash().get("map1", "key1");
    }

    /**
     * 弹出元素并删除
     *
     * @param key 键
     * @return
     */
    public String popValue(String key) {
        return redisTemplate.opsForSet().pop(key).toString();
    }

    /**
     * 删除指定 hash 的 HashKey
     *
     * @param key
     * @param hashKeys
     * @return 删除成功的 数量
     */
    public Long delete(String key, String... hashKeys) {
        return redisTemplate.opsForHash().delete(key, hashKeys);
    }

    /**
     * 给指定 hash 的 hashkey 做增减操作
     *
     * @param key
     * @param hashKey
     * @param number
     * @return
     */
    public Long increment(String key, String hashKey, long number) {
        return redisTemplate.opsForHash().increment(key, hashKey, number);
    }

    /**
     * 给指定 hash 的 hashkey 做增减操作
     *
     * @param key
     * @param hashKey
     * @param number
     * @return
     */
    public Double increment(String key, String hashKey, Double number) {
        return redisTemplate.opsForHash().increment(key, hashKey, number);
    }

    /**
     * 获取 key 下的 所有 hashkey 字段
     *
     * @param key
     * @return
     */
    public Set<Object> hashKeys(String key) {
        return redisTemplate.opsForHash().keys(key);
    }

    /**
     * 获取指定 hash 下面的 键值对 数量
     *
     * @param key
     * @return
     */
    public Long hashSize(String key) {
        return redisTemplate.opsForHash().size(key);
    }

    //- - - - - - - - - - - - - - - - - - - - -  list类型 - - - - - - - - - - - - - - - - - - - -

    /**
     * 在变量左边添加元素值
     *
     * @param key
     * @param value
     * @return
     */
    public void leftPush(String key, Object value) {
        redisTemplate.opsForList().leftPush(key, value);
    }

    /**
     * 获取集合指定位置的值。
     *
     * @param key
     * @param index
     * @return
     */
    public Object index(String key, long index) {
        return redisTemplate.opsForList().index("list", 1);
    }

    /**
     * 获取指定区间的值。
     *
     * @param key
     * @param start
     * @param end
     * @return
     */
    public List<Object> range(String key, long start, long end) {
        return redisTemplate.opsForList().range(key, start, end);
    }

    /**
     * 把最后一个参数值放到指定集合的第一个出现中间参数的前面，
     * 如果中间参数值存在的话。
     *
     * @param key
     * @param pivot
     * @param value
     * @return
     */
    public void leftPush(String key, String pivot, String value) {
        redisTemplate.opsForList().leftPush(key, pivot, value);
    }

    /**
     * 向左边批量添加参数元素。
     *
     * @param key
     * @param values
     * @return
     */
    public void leftPushAll(String key, String... values) {
//        redisTemplate.opsForList().leftPushAll(key,"w","x","y");
        redisTemplate.opsForList().leftPushAll(key, values);
    }

    /**
     * 向集合最右边添加元素。
     *
     * @param key
     * @param value
     * @return
     */
    public void leftPushAll(String key, String value) {
        redisTemplate.opsForList().rightPush(key, value);
    }

    /**
     * 向左边批量添加参数元素。
     *
     * @param key
     * @param values
     * @return
     */
    public void rightPushAll(String key, String... values) {
        //redisTemplate.opsForList().leftPushAll(key,"w","x","y");
        redisTemplate.opsForList().rightPushAll(key, values);
    }

    /**
     * 向已存在的集合中添加元素。
     *
     * @param key
     * @param value
     * @return
     */
    public void rightPushIfPresent(String key, Object value) {
        redisTemplate.opsForList().rightPushIfPresent(key, value);
    }

    /**
     * 向已存在的集合中添加元素。
     *
     * @param key
     * @return
     */
    public long listLength(String key) {
        return redisTemplate.opsForList().size(key);
    }

    /**
     * 移除集合中的左边第一个元素。
     *
     * @param key
     * @return
     */
    public void leftPop(String key) {
        redisTemplate.opsForList().leftPop(key);
    }

    /**
     * 移除集合中左边的元素在等待的时间里，如果超过等待的时间仍没有元素则退出。
     *
     * @param key
     * @return
     */
    public void leftPop(String key, long timeout, TimeUnit unit) {
        redisTemplate.opsForList().leftPop(key, timeout, unit);
    }

    /**
     * 移除集合中右边的元素。
     *
     * @param key
     * @return
     */
    public void rightPop(String key) {
        redisTemplate.opsForList().rightPop(key);
    }

    /**
     * 移除集合中右边的元素在等待的时间里，如果超过等待的时间仍没有元素则退出。
     *
     * @param key
     * @return
     */
    public void rightPop(String key, long timeout, TimeUnit unit) {
        redisTemplate.opsForList().rightPop(key, timeout, unit);
    }
}
```









## mapstruct对象映射使用及总结（10.17）

### 1.引入依赖

​		使用maven引入依赖安装mapstruct

```xml
<dependencies>
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>${org.mapstruct.version}</version>
    </dependency>
</dependencies>
```

**注意**

> 这里mapstruct的版本${org.mapstruct.version}是在配置的properties中写好的，如下：

```xml
<properties>
    <java.version>1.8</java.version>
    <org.mapstruct.version>1.5.3.Final</org.mapstruct.version>
    <lombok-mapstruct-binding.version>0.2.0</lombok-mapstruct-binding.version>
</properties>
```

这个依赖项会导入MapStruct的核心注释。由于MapStruct在编译时工作，并且会集成到像Maven和Gradle这样的构建工具上，我们还必须在<build中/>标签中添加一个插件`maven-compiler-plugin`，并在其配置中添加`annotationProcessorPaths`，该插件会在构建时生成对应的代码。

如果使用了lombok还需要添加mapstruct绑定的插件,如下：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>${maven-compiler-plugin.version}</version>
    <configuration>
        <source>${java.version}</source>
        <target>${java.version}</target>
        <annotationProcessorPaths>
            <!-- MapStruct 注解处理器 -->
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>${org.mapstruct.version}</version>
            </path>
            <!-- Lombok 注解处理器 -->
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </path>
            <!-- MapStruct 和 Lombok 注解绑定处理器 -->
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok-mapstruct-binding</artifactId>
                <version>${lombok-mapstruct-binding.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

### 2.mapstruct基本使用

#### 映射

##### 基本映射

我们先从一些基本的映射开始。我们会创建一个Doctor对象和一个DoctorDto。为了方便起见，它们的属性字段都使用相同的名称：

```java
public class Doctor {
    private int id;
    private String name;
    // getters and setters or builder
}
复制代码
public class DoctorDto {
    private int id;
    private String name;
    // getters and setters or builder
}
复制代码
```

现在，为了在这两者之间进行映射，我们要创建一个`DoctorMapper`接口。对该接口使用`@Mapper`注解，MapStruct就会知道这是两个类之间的映射器。

```java
@Mapper
public interface DoctorMapper {
    DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class);
    DoctorDto toDto(Doctor doctor);
}
复制代码
```

这段代码中创建了一个`DoctorMapper`类型的实例`INSTANCE`，在生成对应的实现代码后，这就是我们调用的“入口”。

我们在接口中定义了`toDto()`方法，该方法接收一个`Doctor`实例为参数，并返回一个`DoctorDto`实例。这足以让MapStruct知道我们想把一个`Doctor`实例映射到一个`DoctorDto`实例。

当我们构建/编译应用程序时，MapStruct注解处理器插件会识别出DoctorMapper接口并为其生成一个实现类。

```java
public class DoctorMapperImpl implements DoctorMapper {
    @Override
    public DoctorDto toDto(Doctor doctor) {
        if ( doctor == null ) {
            return null;
        }
        DoctorDtoBuilder doctorDto = DoctorDto.builder();

        doctorDto.id(doctor.getId());
        doctorDto.name(doctor.getName());

        return doctorDto.build();
    }
}
复制代码
```

`DoctorMapperImpl`类中包含一个`toDto()`方法，将我们的`Doctor`属性值映射到`DoctorDto`的属性字段中。如果要将`Doctor`实例映射到一个`DoctorDto`实例，可以这样写：

```java
DoctorDto doctorDto = DoctorMapper.INSTANCE.toDto(doctor);
复制代码
```

**注意**：你可能也注意到了上面实现代码中的`DoctorDtoBuilder`。因为builder代码往往比较长，为了简洁起见，这里省略了builder模式的实现代码。如果你的类中包含Builder，MapStruct会尝试使用它来创建实例；如果没有的话，MapStruct将通过`new`关键字进行实例化。

##### 不同字段间映射

通常，模型和DTO的字段名不会完全相同。由于团队成员各自指定命名，以及针对不同的调用服务，开发者对返回信息的打包方式选择不同，名称可能会有轻微的变化。

MapStruct通过`@Mapping`注解对这类情况提供了支持。

##### 不同属性名称

我们先更新`Doctor`类，添加一个属性`specialty`：

```java
public class Doctor {
    private int id;
    private String name;
    private String specialty;
    // getters and setters or builder
}
复制代码
```

在`DoctorDto`类中添加一个`specialization`属性：

```java
public class DoctorDto {
    private int id;
    private String name;
    private String specialization;
    // getters and setters or builder
}
复制代码
```

现在，我们需要让 `DoctorMapper` 知道这里的不一致。我们可以使用 `@Mapping` 注解，并设置其内部的 `source` 和 `target` 标记分别指向不一致的两个字段。

```java
@Mapper
public interface DoctorMapper {
    DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class);

    @Mapping(source = "doctor.specialty", target = "specialization")
    DoctorDto toDto(Doctor doctor);
}
复制代码
```

这个注解代码的含义是：`Doctor`中的`specialty`字段对应于`DoctorDto`类的 `specialization` 。

编译之后，会生成如下实现代码：

```java
public class DoctorMapperImpl implements DoctorMapper {
@Override
    public DoctorDto toDto(Doctor doctor) {
        if (doctor == null) {
            return null;
        }

        DoctorDtoBuilder doctorDto = DoctorDto.builder();

        doctorDto.specialization(doctor.getSpecialty());
        doctorDto.id(doctor.getId());
        doctorDto.name(doctor.getName());

        return doctorDto.build();
    }
}
复制代码
```

##### 多个源类

有时，单个类不足以构建DTO，我们可能希望将多个类中的值聚合为一个DTO，供终端用户使用。这也可以通过在`@Mapping`注解中设置适当的标志来完成。

我们先新建另一个对象 `Education`:

```java
public class Education {
    private String degreeName;
    private String institute;
    private Integer yearOfPassing;
    // getters and setters or builder
}
复制代码
```

然后向 `DoctorDto`中添加一个新的字段：

```java
public class DoctorDto {
    private int id;
    private String name;
    private String degree;
    private String specialization;
    // getters and setters or builder
}
复制代码
```

接下来，将 `DoctorMapper` 接口更新为如下代码：

```java
@Mapper
public interface DoctorMapper {
    DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class);

    @Mapping(source = "doctor.specialty", target = "specialization")
    @Mapping(source = "education.degreeName", target = "degree")
    DoctorDto toDto(Doctor doctor, Education education);
}
复制代码
```

我们添加了另一个`@Mapping`注解，并将其`source`设置为`Education`类的`degreeName`，将`target`设置为`DoctorDto`类的`degree`字段。

如果 `Education` 类和 `Doctor` 类包含同名的字段，我们必须让映射器知道使用哪一个，否则它会抛出一个异常。举例来说，如果两个模型都包含一个`id`字段，我们就要选择将哪个类中的`id`映射到DTO属性中。

##### 子对象映射

多数情况下，POJO中不会*只*包含基本数据类型，其中往往会包含其它类。比如说，一个`Doctor`类中会有多个患者类：

```java
public class Patient {
    private int id;
    private String name;
    // getters and setters or builder
}
复制代码
```

在Doctor中添加一个患者列表`List`：

```java
public class Doctor {
    private int id;
    private String name;
    private String specialty;
    private List<Patient> patientList;
    // getters and setters or builder
}
复制代码
```

因为`Patient`需要转换，为其创建一个对应的DTO：

```java
public class PatientDto {
    private int id;
    private String name;
    // getters and setters or builder
}
复制代码
```

最后，在 `DoctorDto` 中新增一个存储 `PatientDto`的列表：

```java
public class DoctorDto {
    private int id;
    private String name;
    private String degree;
    private String specialization;
    private List<PatientDto> patientDtoList;
    // getters and setters or builder
}
复制代码
```

在修改 `DoctorMapper`之前，我们先创建一个支持 `Patient` 和 `PatientDto` 转换的映射器接口：

```java
@Mapper
public interface PatientMapper {
    PatientMapper INSTANCE = Mappers.getMapper(PatientMapper.class);
    PatientDto toDto(Patient patient);
}
复制代码
```

这是一个基本映射器，只会处理几个基本数据类型。

然后，我们再来修改 `DoctorMapper` 处理一下患者列表：

```java
@Mapper(uses = {PatientMapper.class})
public interface DoctorMapper {

    DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class);

    @Mapping(source = "doctor.patientList", target = "patientDtoList")
    @Mapping(source = "doctor.specialty", target = "specialization")
    DoctorDto toDto(Doctor doctor);
}
复制代码
```

因为我们要处理另一个需要映射的类，所以这里设置了`@Mapper`注解的`uses`标志，这样现在的 `@Mapper` 就可以使用另一个 `@Mapper`映射器。我们这里只加了一个，但你想在这里添加多少class/mapper都可以。

我们已经添加了`uses`标志，所以在为`DoctorMapper`接口生成映射器实现时，MapStruct 也会把 `Patient` 模型转换成 `PatientDto` ——因为我们已经为这个任务注册了 `PatientMapper`。

编译查看最新想实现代码：

```java
public class DoctorMapperImpl implements DoctorMapper {
    private final PatientMapper patientMapper = Mappers.getMapper( PatientMapper.class );

    @Override
    public DoctorDto toDto(Doctor doctor) {
        if ( doctor == null ) {
            return null;
        }

        DoctorDtoBuilder doctorDto = DoctorDto.builder();

        doctorDto.patientDtoList( patientListToPatientDtoList(doctor.getPatientList()));
        doctorDto.specialization( doctor.getSpecialty() );
        doctorDto.id( doctor.getId() );
        doctorDto.name( doctor.getName() );

        return doctorDto.build();
    }
    
    protected List<PatientDto> patientListToPatientDtoList(List<Patient> list) {
        if ( list == null ) {
            return null;
        }

        List<PatientDto> list1 = new ArrayList<PatientDto>( list.size() );
        for ( Patient patient : list ) {
            list1.add( patientMapper.toDto( patient ) );
        }

        return list1;
    }
}
复制代码
```

显然，除了`toDto()`映射方法外，最终实现中还添加了一个新的映射方法——` patientListToPatientDtoList()`。这个方法是在没有显式定义的情况下添加的，只是因为我们把`PatientMapper`添加到了`DoctorMapper`中。

该方法会遍历一个`Patient`列表，将每个元素转换为`PatientDto`，并将转换后的对象添加到`DoctorDto`对象内中的列表中。

##### 更新现有实例

有时，我们希望用DTO的最新值更新一个模型中的属性，对目标对象(我们的例子中是`DoctorDto`)使用`@MappingTarget`注解，就可以更新现有的实例.

```java
@Mapper(uses = {PatientMapper.class})
public interface DoctorMapper {

    DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class);

    @Mapping(source = "doctorDto.patientDtoList", target = "patientList")
    @Mapping(source = "doctorDto.specialization", target = "specialty")
    void updateModel(DoctorDto doctorDto, @MappingTarget Doctor doctor);
}
复制代码
```

重新生成实现代码，就可以得到`updateModel()`方法：

```java
public class DoctorMapperImpl implements DoctorMapper {

    @Override
    public void updateModel(DoctorDto doctorDto, Doctor doctor) {
        if (doctorDto == null) {
            return;
        }

        if (doctor.getPatientList() != null) {
            List<Patient> list = patientDtoListToPatientList(doctorDto.getPatientDtoList());
            if (list != null) {
                doctor.getPatientList().clear();
                doctor.getPatientList().addAll(list);
            }
            else {
                doctor.setPatientList(null);
            }
        }
        else {
            List<Patient> list = patientDtoListToPatientList(doctorDto.getPatientDtoList());
            if (list != null) {
                doctor.setPatientList(list);
            }
        }
        doctor.setSpecialty(doctorDto.getSpecialization());
        doctor.setId(doctorDto.getId());
        doctor.setName(doctorDto.getName());
    }
}
复制代码
```

值得注意的是，由于患者列表是该模型中的子实体，因此患者列表也会进行更新。

## SpringBoot 配置SpringBootSecurity + JWT权限认证（10.15）

为了更好地理解，我们将分阶段开发该项目
开发一个Spring Boot应用程序，通过映射/hello来公开一个简单的REST GET API。
为JWT配置Spring Security。通过映射/authenticate公开REST POST API，用户将获得一个有效的JSON Web Token。然后，只有当用户拥有有效的令牌时，才允许其访问api/hello。

###配置步骤

#### 1.引入依赖

```xml
<!--spring security 安全框架-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>


<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

####2.创建Controller

```java
package com.javainuse.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	@RequestMapping({ "/hello" })
	public String firstPage() {
		return "Hello World";
	}
}
```

#### 3.SpringSecurity + JWT 配置

我们将配置Spring Security和JWT来执行两个操作--
生成JWT--通过映射/authenticate来公开一个POST API。在传递正确的用户名和密码时，它将生成一个JSON Web Token（JWT）。
验证JWT--如果用户试图访问带有映射/hello的GET API。只有当请求有一个有效的JSON Web Token(JWT)，它才会允许访问。

##### 生成Token流程

![62-2-min](E:\Notes\JavaNotes\Java技术储备\Java技术储备\62-2-min.jpg)

##### 	用户认证

![62-11-min](E:\Notes\JavaNotes\Java技术储备\Java技术储备\62-11-min.jpg)

##### 	JWT认证流程

​	![62-3-min (1)](E:\Notes\JavaNotes\Java技术储备\Java技术储备\62-3-min (1).jpg)



- 定义application.properties/application.yaml。正如在之前的JWT教程中所看到的，我们指定了秘密密钥，我们将使用该密钥来进行散列算法。秘密密钥与头和有效载荷相结合，创建一个唯一的哈希值。只有当你拥有秘密密钥时，我们才能够验证这个哈希值。

```yaml
jwt:
  tokenType: 'Bearer ' #jwt负载开头
  tokenHeader: Authorization # jwt存储的请求头
  secret: cuAihCz53DZRjZwbsGcZJ2Ai6At+T142uphtJMsk7iQ= #JWT加解密密钥
  expiration: 604800 #JWT的超期限时间(60*60*24*7)
```

- #### JwtTokenUtil

JwtTokenUtil负责执行JWT操作，如创建和验证。它利用io.jsonwebtoken.Jwts来实现这一目标。

```java
package com.gree.FirstDemo.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil implements Serializable {
    private static final long serialVersionUID = -2550185165626007488L;

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    @Value("${jwt.secret}")
    private String secret;

    //从jwt令牌中检索用户名
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //从jwt令牌中检索到期日
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    //为了从令牌中获取任何信息，我们将需要密钥。
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    //检查令牌是否过期
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //给用户生成令牌
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    //在创建令牌时 -
    //1.定义令牌的要求，如发行者、到期日、主题和ID
    //2.使用HS512算法和秘密密钥签署JWT。
    //3.根据JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
    //将JWT压缩成一个URL安全的字符串
    private String doGenerateToken(Map<String, Object> claims, String subject) {

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    //验证令牌
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
```

- JWTUserDetailsService实现了Spring Security UserDetailsService接口。它重写了loadUserByUsername的方法，以使用用户名从数据库中获取用户信息。当验证用户提供的用户信息时，Spring安全认证管理器调用该方法从数据库中获取用户信息。在这里，我们从一个硬编码的用户列表中获取用户信息。在下一个教程中，我们将添加DAO实现，从数据库中获取用户详细信息。此外，用户的密码也是使用BCrypt以加密格式存储的。之前我们已经看过Spring Boot Security - 使用Bcrypt进行密码编码。在这里，使用在线Bcrypt生成器，你可以为密码生成Bcrypt。https://www.javainuse.com/onlineBcrypt

```java
package com.gree.FirstDemo.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class JwtUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("javainuse".equals(username)) {
            return new User("javainuse", "$2a$10$UmSy.DbyEjnYjGdBwrQej.SX12iYGkhbDWF75x1SBHc8IynBefRbm",
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}

```

- #### JwtAuthenticationController

使用JwtAuthenticationController暴露一个POST API/authenticate。POST API在正文中获得用户名和密码--使用Spring认证管理器，我们对用户名和密码进行认证。如果证书有效，就使用JWTTokenUtil创建一个JWT令牌并提供给客户端。

```java
package com.gree.FirstDemo.controller;

import com.gree.FirstDemo.config.JwtTokenUtil;
import com.gree.FirstDemo.domain.JwtRequest;
import com.gree.FirstDemo.domain.JwtResponse;
import com.gree.FirstDemo.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager  authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.GET)
    public ResponseEntity<?> testAuthenticateEndpoint() {
        return ResponseEntity.ok("Working!");
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        System.out.println("RCVD REQ FROM " + authenticationRequest.getUsername());
        //authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        System.out.println("LOADED USERDETAILS: " + userDetails.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        System.out.println("TOKEN: " + token);
        return ResponseEntity.ok(new JwtResponse(token));
    }
	
    //该方法是由我们自定义验证的鉴权方法
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    
}
```

- #### JwtRequest

这个类需要用来存储我们从客户那里收到的用户名和密码。

```java
package com.gree.FirstDemo.domain;

//这个类需要用来存储我们从客户那里收到的用户名和密码。
public class JwtRequest {
    private static final long serialVersionUID = 5926468583005150707L;

    private String username;
    private String password;

    //need default constructor for JSON Parsing
    public JwtRequest()
    {

    }

    public JwtRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

```

- #### JwtResponse

这个类是创建包含JWT返回给用户的响应所需要的。

```java
package com.javainuse.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;

	public JwtResponse(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public String getToken() {
		return this.jwttoken;
	}
}
```

- #### JwtRequestFilter

JwtRequestFilter扩展了Spring Web Filter OncePerRequestFilter类。对于任何传入的请求，这个过滤器类会被执行。它检查该请求是否有一个有效的JWT令牌。如果它有一个有效的JWT令牌，那么它将在上下文中设置认证，以指定当前用户已被认证。

```java
package com.gree.FirstDemo.config;

import com.gree.FirstDemo.service.JwtUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * JwtRequestFilter扩展了Spring Web Filter OncePerRequestFilter类。
 * 对于任何传入的请求，这个过滤器类会被执行。它检查该请求是否有一个有效的JWT令牌。
 * 如果它有一个有效的JWT令牌，那么它将在上下文中设置认证，以指定当前用户已被认证。
 */

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        // JWT令牌的形式是 "Bearer token"。
        // 删除Bearer字样，得到只有令牌
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        } else {
            logger.warn("JWT Token does not begin with Bearer String");
        }

        //一旦拿到令牌，就验证它
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);

            // if token is valid configure Spring Security to manually set
            // 如果令牌有效，则配置Spring Security来手动设置
            // authentication
            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // After setting the Authentication in the context, we specify
                // that the current user is authenticated. So it passes the
                // Spring Security Configurations successfully.
                // 在上下文中设置认证后，我们指定当前用户已被认证。
                // 所以它成功通过了Spring Security Configurations
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        chain.doFilter(request, response);
    }
}

```

- #### JwtAuthenticationEntryPoint

该类将扩展Spring的AuthenticationEntryPoint类，并重写其方法commence。它拒绝每一个未经认证的请求并发送错误代码401

```java
package com.gree.FirstDemo.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

/**
 * 该类将扩展Spring的AuthenticationEntryPoint类，并重写其方法commence。
 * 它拒绝每一个未经认证的请求并发送错误代码401
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}

```

- #### WebSecurityConfig

这个类扩展了WebSecurityConfigurerAdapter，是一个方便的类，允许对WebSecurity和HttpSecurity进行定制。

```java
package com.gree.FirstDemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
        // 配置AuthenticationManager，以便它知道从哪里加载匹配凭证的用户
        // 使用BCryptPasswordEncoder
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        // 在此例中不需要使用CSRF
        httpSecurity.csrf().disable()
                // dont authenticate this particular request
                // 不对这个特定的请求进行认证
                .authorizeRequests()
                .antMatchers("/authenticate").permitAll()
            	.antMatchers("/static/**",
                "/swagger-resources/**" //swagger需要的静态资源路径
                ,"/v3/**"
                ,"/swagger-ui/**"
                ,"**/upload/**","/index.jap").permitAll()//允许所有人访问swagger-ui
                .antMatchers("/doc.html",
                "/webjars/**",
                "/img.icons/**",
                "/swagger-resources/**",
                "/**","/v2/api-docs").permitAll() //
            
                // all other requests need to be authenticated
                // 所有其他的请求都需要经过认证
                .anyRequest().authenticated()
                .and().
                // make sure we use stateless session; session won't be used to
                // store user's state.
                //确保我们使用无状态会画；会话不会用来存储用户的状态
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // 增加过滤器去验证每一个token
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

**注意**

> 在SpringSecurity配置时，前期开发时为方便测试，需要在白名单中配置swagger-ui和knife4j
>
> 注意配置时也需要把它所使用的静态资源也配置允许访问

至此SpringBoot 应用配置成功

#### 4.测试

##### 	1. 未经授权的接口访问

![测试1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\测试1.PNG)

当访问未授权的接口时，请求被拦截，返回401

##### 	2. 生成JWT

![测试2](E:\Notes\JavaNotes\Java技术储备\Java技术储备\测试2.PNG)

##### 	3.使用携带JWT的请求访问接口

![测试4](E:\Notes\JavaNotes\Java技术储备\Java技术储备\测试4.PNG)

至此配置SpringSecurity完成

## 多线程（10.21）

### 线程创建

- Thread、Runnable、Callable

#### 三种创建方式

**Thread class**

继承Thread类*

**Runnable接口**

实现Runnable接口*

**Callable接口**

实现Callable接口



#### 实例与总结

- 继承Thread类
  - 子类继承Thread类具备多线程能力
  - 启动线程：子类对象.start()
  - 不建议使用：避免OOP单继承局限性(Java是单继承的，一旦继承了一个类，就不能继承其他类了)

```java
package com.gree.FirstDemo.util;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public class TestThreadDownLoad extends Thread{

    public String url; //url地址
    public String name; //文件名

    public TestThreadDownLoad(String url, String name){
        this.url = url;
        this.name = name;
    }

    //下载图片线程的执行体
    @Override
    public void run() {
        WebDownloader webDownloader = new WebDownloader();
        webDownloader.downloader(url, name);
        System.out.println("下载了文件名为：" + name);
    }

    public static void main(String[] args){
        //在程序主入口后开线程，下载图片

        TestThreadDownLoad t1 = new TestThreadDownLoad("https://www.gree.com/static/pc/img/icon/icon_New%20product-02@2x.png","pic1.png");
        TestThreadDownLoad t2 = new TestThreadDownLoad("https://www.gree.com/static/pc/img/icon/icon_Air-Conditioner-02@2x.png", "pic2.png");
        TestThreadDownLoad t3 = new TestThreadDownLoad("https://www.gree.com/static/pc/img/icon/icon_Home-central-air-conditioning-02@2x.png", "pic3.png");

        //根据打印出来的信息可以知道，它的实现顺序不固定
        t1.start();
        t2.start();
        t3.start();
    }
}

class WebDownloader{
    //下载方法
    public void downloader(String url, String name){
        try {
            FileUtils.copyURLToFile(new URL(url), new File(name));
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("IO异常，downloader方法出现问题。");
        }
    }
}
```

- 实现Runnable接口
  - 实现接口Runnable具有多线程能力
  - 启动线程传入目标对象+Thread对象.start(）
  - 推荐使用过：避免单继承局限性，灵活方便，方便同一个对象被多个线程使用

```java
package com.gree.FirstDemo.util;

import org.apache.commons.io.input.TaggedReader;

//创建线程的方法2：实现Runnable接口，重写run方法，执行线程需要丢入runnable接口实现类，调用start方法
public class TestTreadExtRunnable implements Runnable {

    public String url; //url地址
    public String name; //文件名

    public TestTreadExtRunnable(String url, String name){
        this.url = url;
        this.name = name;
    }

    @Override
    public void run() {
        WebDownloader webDownloader = new WebDownloader();
        webDownloader.downloader(url, name);
        System.out.println("下载了文件名为：" + name);
    }

    public static void main(String[] args){
        //创建线程
        //在程序主入口后开线程，下载图片

        TestTreadExtRunnable t1 = new TestTreadExtRunnable("https://www.gree.com/static/pc/img/icon/icon_New%20product-02@2x.png","pic1.png");
        TestTreadExtRunnable t2 = new TestTreadExtRunnable("https://www.gree.com/static/pc/img/icon/icon_Air-Conditioner-02@2x.png", "pic2.png");
        TestTreadExtRunnable t3 = new TestTreadExtRunnable("https://www.gree.com/static/pc/img/icon/icon_Home-central-air-conditioning-02@2x.png", "pic3.png");

        //创建线程对象，通过线程对象开启线程
        new Thread(t1).start();
        new Thread(t2).start();
        new Thread(t3).start();
    }
}
```

- 实现Callable接口
  - 1.实现Callable接口，需要返回值类型
  - 2.重写call方法，需要抛出异常
  - 3.创建目标对象
  - 4.创建执行服务  ExecutorService service = Executors.newFixedThreadPool(3);//创建线程池
  - 5.提交执行 Future<?> r1 = service.submit(t1);
  - 6.获取结果 boolean res1 = r1.get();
  - 7.关闭服务

```java
package com.gree.FirstDemo.util;

//线程创建方式三：实现Callable接口

import java.util.concurrent.*;

//callable
//好处：
public class TestThreadExtCallable implements Callable<Boolean> {

    public String url; //url地址
    public String name; //文件名

    public TestThreadExtCallable(String url, String name){
        this.url = url;
        this.name = name;
    }

    //下载图片线程的执行体
    @Override
    public Boolean call() throws Exception {
        WebDownloader webDownloader = new WebDownloader();
        webDownloader.downloader(url, name);
        System.out.println("下载了文件名为：" + name);
        return true;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        //在程序主入口后开线程，下载图片
        TestThreadDownLoad t1 = new TestThreadDownLoad("https://www.gree.com/static/pc/img/icon/icon_New%20product-02@2x.png","pic1.png");
        TestThreadDownLoad t2 = new TestThreadDownLoad("https://www.gree.com/static/pc/img/icon/icon_Air-Conditioner-02@2x.png", "pic2.png");
        TestThreadDownLoad t3 = new TestThreadDownLoad("https://www.gree.com/static/pc/img/icon/icon_Home-central-air-conditioning-02@2x.png", "pic3.png");

        //创建执行服务：
        ExecutorService service = Executors.newFixedThreadPool(3);//创建线程池
        //提交执行
        Future<?> r1 = service.submit(t1);
        Future<?> r2 = service.submit(t2);
        Future<?> r3 = service.submit(t3);

        //获取运行结果
        boolean res1 = r1.get();
        boolean res2 = (Boolean)r2.get();
        boolean res3 = (Boolean)r3.get();

//        System.out.println(res1);
//        System.out.println(res2);
//        System.out.println(res3);

        //关闭服务
        service.shutdownNow();
    }
}
```

#### 买票案例

```java
package com.gree.FirstDemo.util;

//多个线程同时操作一个对象
//买火车票的例子
//会出现问题：多个线程操作同一个资源的情况下，线程不安全
public class TestThread4 implements Runnable{
    //票数
    private Integer ticketNums = 10;

    @Override
    public void run() {
        while (true){
            if (ticketNums <= 0)
                break;
            //模拟延时
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName() + "拿到了第" + ticketNums-- + "张票");
        }
    }

    public static void main(String[] args){

        TestThread4 ticked = new TestThread4();

        new Thread(ticked, "小明").start();//这里是给每一个线程一个名字
        new Thread(ticked, "老师").start();
        new Thread(ticked, "小红").start();
    }
}
```

## 文件的上传与下载（10.24）

文件的上传与下载使用MinIO为例

此处详细说明搭建MinIO与基本文件上传与下载的方法

### MinIO简介

Minio 是个基于 Golang 编写的开源对象存储套件，虽然轻量，却拥有着不错的性能。

- 官网地址：[MinIO | High Performance, Kubernetes Native Object Storageopen in new window](https://min.io/)
- 官网文档地址：[MinIO | The MinIO Quickstart Guideopen in new window](https://docs.min.io/)
- 官网文档（ 中文 ）地址：[官网中文网址open in new window](http://docs.minio.org.cn/docs/) 中文文档对应的是上个版本，新版本中有些内容已发生了变化，所以最好是看英文文档。
- JAVA SDK API：[minio java sdk api 文档open in new window](https://docs.min.io/docs/java-client-api-reference.html)

何为对象存储？

对象存储服务（ Object Storage Service，OSS ）是一种海量、安全、低成本、高可靠的云存储服务，适合存放任意类型的文件。容量和处理能力弹性扩展，多种存储类型供选择，全面优化存储成本。

对于中小型企业，如果不选择存储上云，那么 Minio 是个不错的选择，麻雀虽小，五脏俱全。

### 第 1 步：下载安装

Windows 版下载地址：[windows-amd64 版open in new window](https://dl.min.io/server/minio/release/windows-amd64/minio.exe)

按惯例，我们将下载的 minio.exe 放在 D:\ProgramFiles\MinIO 下，因此，MINIO_HOME 就是 D:\ProgramFiles\MinIO 。

### 第 2 步：启动运行

1. 进入 MINIO_HOME 。
2. 打开 cmd 执行命令：`minio.exe server ./data`

启动后会打印出 AccessKey 和 SecretKey 等信息，类似如下：

```text
API: http://192.172.5.42:9000  http://192.168.154.1:9000  http://192.168.181.1:9000  http://127.0.0.1:9000              
RootUser: minioadmin
RootPass: minioadmin

Console: http://192.172.5.42:60880 http://192.168.154.1:60880 http://192.168.181.1:60880 http://127.0.0.1:60880
RootUser: minioadmin
RootPass: minioadmin

...
```

### 第 3 步：使用

MinIO Server 成功启动后访问 [http://127.0.0.1:9000open in new window](http://127.0.0.1:9000/) ，你会看到类似如下界面：

![MinIO登录](E:\Notes\JavaNotes\Java技术储备\Java技术储备\MinIO登录.PNG)

输入用户名/密码 `minioadmin/minioadmin` 可以进入 web 管理系统：

![MinIO1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\MinIO1.PNG)

### 其它：关停 MinIO

通过命令行启动 MioIO 后，命令行窗口就被占用了。关闭命令行窗口即关闭 MioIO ，也可以使用 `ctrl + c` 关闭。

### 其它：借助 WinSW 管理 MinIO

#### 第 1 步：下载 Windows Service Wrapper 工具

[WinSW github（ .NET 4.6.1 版 ）open in new window](https://github.com/winsw/winsw/releases/download/v2.11.0/WinSW.NET461.exe)

将下载好的 WinSW 放到 MINIO_HOME 目录下，并重命名。名字任意，例如：systemctl.exe 。

#### 第 2 步：为 WinSW 创建配置文件

在 MINIO_HOME 下为 WinSW 创建配置文件（ 配置文件与 WinSW 程序平级 ）。配置文件为 .xml 文件，且名字必须与 WinSW 程序相同。例如：systemctl.xml ，与上面的 systemctl.exe 相呼应。

systemctl.xml 配置文件内容如下：

```xml
<service>
  <id>minio-server</id>
  <name>MinIO Server</name>
  <description>MinIO Server</description>
 
  <executable>%BASE%\minio.exe</executable>
  <startargument>server</startargument>
  <startargument>%BASE%\data</startargument>

  <logpath>%BASE%\logs</logpath>
  <logmode>roll</logmode>
</service>
```

在上述的配置文件中，我们「告知」了 WinSW 以什么命令启停 MinIO 。未来，我们不再亲自启停 MinIO ，而是通过 WinSW 间接启停 MinIO 。

#### 第 3 步：安装 MinIO 服务

在 MinIO_HOME 目录下打开 cmd 命令行执行如下命令：

```bash
# 安装服务。开机启动，当前未启动，重启后生效。
systemctl install

# 通过 windows 的 sc 命令，将启动规则调整为手动启动。
sc config minio-server start= demand    
# sc config minio-server start= auto      
# sc config minio-server start= disabled  
```

安装成功后，你可以在 Windows 系统的服务中看到 MinIO 。

图略。

install 的反向操作是 uninstall ，uninstall 之后在 Windows 服务中就看不到它了。

```bash
# uninstall 的前提是服务已停止
systemctl uninstall
```

注意，install 和 uninstall 的操作只用执行一次，在日常使用中并非反复执行（ 也无必要 ）。

#### 第 4 步：启动 minio-server 服务

提示

你在 Windows 的 `服务` 点点点，也能实现下述命令的功能。就看你偏好哪种方式了。

```bash
# 查看状态
systemctl status

# 启动服务
systemctl start
```

#### 其它：停止 minio-server 服务

```bash
# 查看状态
systemctl status

# 停止服务
systemctl stop
```

### MinIO Java SDK

#### 1.引入依赖

```xml
<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>4.8.1</version> <!-- minio 依赖于 okhttp 且版本较高。注意，spring-boot-dependencies 中的不够高 -->
</dependency>
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.3.9</version>
</dependency>
```

#### 2.具体操作

在测试模块中编写一个测试方法：

```java
/**
 * 相较于以前，现在的 MinIO Java SDK 变得“复杂”了一些。
 */
@Test
public void demo() throws Exception {

        // 使用 MinIO 服务的 URL 和端口，Access key 和 Secret key 创建一个 MinioClient 对象。
        MinioClient minioClient = MinioClient.builder()
                .endpoint("http://127.0.0.1:9000")
                .credentials("minioadmin", "minioadmin")
                .build();

        // 检查存储桶是否已经存在
        boolean isExist = minioClient.bucketExists(BucketExistsArgs.builder().bucket("asiatrip").build());
        if (isExist) {
            System.out.println("Bucket already exists.");
        } else {
            // 创建一个名为 asiatrip 的存储桶，用于存储文件。
            minioClient.makeBucket(MakeBucketArgs.builder().bucket("asiatrip").build());
        }

        // 使用 putObject 上传一个文件到存储桶中。
        File file = new File("D:/new_schema.png");
        InputStream inputStream = new FileInputStream(file);

        PutObjectArgs args = PutObjectArgs.builder()
                .bucket("asiatrip")
                .object("new_schema.png")
                .contentType("image/png")
                .stream(inputStream, inputStream.available(), -1)
                .build();

        minioClient.putObject(args);
        System.out.println("D:\\new_schema.png is successfully uploaded as new_schema.png to `asiatrip` bucket.");
}
```

### MinIo工具类封装及完整文件上传demo

#### 1.添加依赖

注意这里包含上面部分没有的依赖

```xml
<!-- minio依赖       -->
    <dependency>
        <groupId>io.minio</groupId>
        <artifactId>minio</artifactId>
        <version>8.2.1</version>
    </dependency>

    <!-- hutool工具类       -->
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>5.1.2</version>
    </dependency>

    <!-- 压缩图片       -->
    <dependency>
        <groupId>net.coobird</groupId>
        <artifactId>thumbnailator</artifactId>
        <version>0.4.8</version>
    </dependency>

    <!--    工具类依赖    -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-lang3</artifactId>
        <version>3.12.0</version>
    </dependency>

    <dependency>
        <groupId>com.github.davidcarboni</groupId>
        <artifactId>encrypted-</artifactId>
        <version>1.0.0</version>
    </dependency>
```

#### 2.配置

```yaml
spring:
  servlet:
    multipart:
      enabled: true #默认支持文件上传
      max-file-size: 200MB # 最大支持文件大小
      max-request-size: 30MB # 最大支持请求大小
      
minio:
  endpoint: http://127.0.0.1:9000 #http://你的ip:9001
  accessKey: minioadmin #这里根据你在minio中创建的账号而定
  secretKey: minioadmin
  bucketName: mybucket #桶名
  nginxHost: http://你的域名
```

- 创建配置文件类

```java
package com.gree.FirstDemo.MinIO;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "minio")
public class MinIoProperties {

    /**
     * minio地址+端口号
     */
    private String endpoint;

    /**
     * minio用户名
     */
    private String accessKey;

    /**
     * minio密码
     */
    private String secretKey;

    /**
     * 文件桶的名称
     */
    private String bucketName;

    /**
     * 域名
     */
    private String nginxHost;
}
```

`@ConfigurationProperties(prefix = "minio")`通过它来解析yaml文件中自己所配置的minio参数

#### 3.相关类编写

- 创建MinIo客户端

```java
package com.gree.FirstDemo.MinIO;

import io.minio.MinioClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Configuration
@EnableConfigurationProperties(MinIoProperties.class)
public class MinIoConfig {

    @Autowired
    MinIoProperties minIoProperties;

    @Bean
    public MinioClient minioClient(){
        return MinioClient.builder()
                .endpoint(minIoProperties.getEndpoint())
                .credentials(minIoProperties.getAccessKey(), minIoProperties.getSecretKey())
                .build();
    }
}
```

- 创建文件返回路径实体类

```java
package com.gree.FirstDemo.MinIO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 文件地址返回路径实体类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadResponse {

    private String minIoUrl;

    private String nginxUrl;

}
```

- 创建上传文件工具类

```java
package com.gree.FirstDemo.MinIO;

import cn.hutool.core.date.DateUtil;
import io.minio.*;
import io.minio.errors.*;
import io.minio.messages.Bucket;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Component
@Slf4j
public class MinIoUtil {

    @Autowired
    private MinIoProperties minIoProperties;

    @Autowired
    private MinioClient minioClient;

    private final Long maxSize = (long) (1024 * 1024);

    /**
     * 创建bucket
     */
    public void createBucket(String bucketName) throws Exception {
        //如果该桶不存在就创建该桶
        if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())){
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }
    }

    public UploadResponse uploadFile(MultipartFile file, String bucketName) throws Exception{
        //判断文件是否为空
        if (null == file || 0 == file.getSize()){
            return null;
        }

        //判断存储桶是否存在，不存在则创建
        createBucket(bucketName);

        //文件名
        String originalFilename = file.getOriginalFilename();
        //新的文件名 = 时间戳_随机数_后缀名
        /**
         * 断言是一种调试方式，断言失败会抛出AssertionError，只能在开发和测试阶段启用断言；
         * 对可恢复的错误不能使用断言，而应该抛出异常；
         * 断言很少被使用，更好的方法是编写单元测试。
         */
        assert originalFilename != null;//这里使用一个断言保证文件名不为空

        long now = System.currentTimeMillis() / 1000;

        String fileName = DateUtil.format(DateUtil.date(), "yyyyMMdd") + "_" + now +
                                          new Random().nextInt(1000) + originalFilename.substring(originalFilename.lastIndexOf("."));

        //开始上传
        log.info("file压缩前大小：{}", file.getSize());
        if (file.getSize() > maxSize){
            FileItemFactory fileItemFactory = new DiskFileItemFactory();

            FileItem fileItem = fileItemFactory.createItem(fileName, "text/plain", true, fileName);
            OutputStream outputStream = fileItem.getOutputStream();
            //进行文件压缩
            Thumbnails.of(file.getInputStream()).scale(1f).outputFormat(originalFilename.substring(originalFilename.lastIndexOf(".")+1)).outputQuality(0.25f).toOutputStream(outputStream);
            file = new CommonsMultipartFile(fileItem);
        }
        log.info("file压缩后大小：{}", file.getSize());

        //向minio上传文件
        minioClient.putObject(
                PutObjectArgs.builder().bucket(bucketName).object(fileName).stream(
                        file.getInputStream(), file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build());

        String url = minIoProperties.getEndpoint() + "/" + bucketName + "/" + fileName;
        String urlHost = minIoProperties.getNginxHost() + "/" + bucketName + "/" + fileName;

        return new UploadResponse(url, urlHost);
    }

    /**
     * 获取所有bucket
     * @return
     * @throws Exception
     */
    public List<Bucket> getAllBuckets() throws Exception{
        return minioClient.listBuckets();
    }

    /**
     * 根据bucketName获取信息
     * @param bucketName bucket名称
     * @return
     * @throws IOException
     * @throws InvalidKeyException
     * @throws NoSuchAlgorithmException
     * @throws InsufficientDataException
     * @throws InvalidResponseException
     * @throws InternalException
     * @throws ServerException
     * @throws ErrorResponseException
     * @throws XmlParserException
     */
    public Optional<Bucket> getBucket(String bucketName) throws IOException, InvalidKeyException, NoSuchAlgorithmException, InsufficientDataException, InvalidResponseException, InternalException, ServerException, ErrorResponseException, XmlParserException {
        return minioClient.listBuckets().stream().filter(b -> b.name().equals(bucketName)).findFirst();
    }

    /**
     * 根据bucketName删除信息
     * @param bucketName bucket名称
     */
    public void removeBucket(String bucketName) throws Exception {
        minioClient.removeBucket(RemoveBucketArgs.builder().bucket(bucketName).build());
    }

    /**
     * 获取文件外链
     * @param bucketName bucket名称
     * @param objectName 文件名称
     * @param expires 过期时间 <= 7
     * @return
     * @throws Exception
     */
    public String getObjectURL(String bucketName, String objectName, Integer expires) throws Exception {
        return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder().bucket(bucketName).object(objectName).expiry(expires).build());
    }

    /**
     * 获取文件
     * @param bucketName bucket名称
     * @param objectName 文件名称
     * @return 二进制流
     * @throws Exception
     */
    public InputStream getObject(String bucketName, String objectName) throws Exception {
        return minioClient.getObject(GetObjectArgs.builder().bucket(bucketName).object(objectName).build());
    }

    /**
     * 上传文件
     * @param bucketName bucket名称
     * @param objectName 文件名称
     * @param stream 文件流
     * @throws Exception
     */
    public void putObject(String bucketName, String objectName, InputStream stream) throws
            Exception {
        minioClient.putObject(PutObjectArgs.builder().bucket(bucketName).object(objectName).stream(stream, stream.available(), -1).contentType(objectName.substring(objectName.lastIndexOf("."))).build());
    }

    /**
     * 上传文件
     * @param bucketName bucket名称
     * @param objectName 文件名称
     * @param stream 文件流
     * @param size 文件大小
     * @param contextType 文件类型
     * @throws Exception
     */
    public void putObject(String bucketName, String objectName, InputStream stream, long
            size, String contextType) throws Exception {
        minioClient.putObject(PutObjectArgs.builder().bucket(bucketName).object(objectName).stream(stream, size, -1).contentType(contextType).build());
    }

    /**
     * 获取文件信息
     * @param bucketName bucket名称
     * @param objectName 文件名称
     * @return
     * @throws Exception
     */
    public StatObjectResponse getObjectInfo(String bucketName, String objectName) throws Exception {
        return minioClient.statObject(StatObjectArgs.builder().bucket(bucketName).object(objectName).build());
    }

    /**
     * 删除文件
     * @param bucketName bucket名称
     * @param objectName 文件名称
     * @throws Exception
     */
    public void removeObject(String bucketName, String objectName) throws Exception {
        minioClient.removeObject(RemoveObjectArgs.builder().bucket(bucketName).object(objectName).build());
    }

    /**
     * 上传视频
     * @param file
     * @param bucketName
     * @return
     * @throws Exception
     */
    public UploadResponse uploadVideo(MultipartFile file, String bucketName) throws Exception {
        //判断文件是否为空
        if (null == file || 0 == file.getSize()) {
            return null;
        }
        //判断存储桶是否存在  不存在则创建
        createBucket(bucketName);
        //文件名
        String originalFilename = file.getOriginalFilename();
        //新的文件名 = 时间戳_随机数.后缀名
        assert originalFilename != null;
        long now = System.currentTimeMillis() / 1000;
        String fileName = DateUtil.format(DateUtil.date(),"yyyyMMdd")+"_"+ now + "_" + new Random().nextInt(1000) +
                originalFilename.substring(originalFilename.lastIndexOf("."));
        //开始上传
        log.info("file大小:{}",file.getSize());
        minioClient.putObject(
                PutObjectArgs.builder().bucket(bucketName).object(fileName).stream(
                                file.getInputStream(), file.getSize(), -1)
                        .contentType("video/mp4")
                        .build());
        String url = minIoProperties.getEndpoint() + "/" + bucketName + "/" + fileName;
        String urlHost = minIoProperties.getNginxHost() + "/" + bucketName + "/" + fileName;
        return new UploadResponse(url, urlHost);
    }
}
```

- 上传文件测试类

```java
package com.gree.FirstDemo.controller;

import com.gree.FirstDemo.MinIO.MinIoUtil;
import com.gree.FirstDemo.MinIO.UploadResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
public class MinIoTestController {

    @Autowired
    private MinIoUtil minIoUtil;

    @PostMapping("/upload")
    public UploadResponse minIoUpload(@RequestParam(value = "file")MultipartFile file){
        UploadResponse response = null;

        try {
            response = minIoUtil.uploadFile(file, "bucket01");
        } catch (Exception e) {
            log.error("上传失败");
        }

        return response;
    }

    @PostMapping("/uploadVideo")
    public UploadResponse uploadVideo(@RequestParam(value = "file") MultipartFile file){
        UploadResponse response = null;
        try {
            response = minIoUtil.uploadVideo(file, "video-test");
        } catch (Exception e) {
            log.error("上传失败",e);
        }
        return response;
    }
}
```

**补充**

> 到这部分为止， 基本的文件上传完整流程已实现
>
> 但有一个部分需要注意，在实际项目中，会出现对于上传文件大小的限制的问题：
>
> ​		1.SpringBoot对于MultipartFile对象本身会自带一个对文件大小限制的过滤
>
> ​				若需要限制文件大小可以在property或yaml文件中进行配置，可以见上例中的yaml文件

```yaml
spring:
  servlet:
    multipart:
      enabled: true #默认支持文件上传
      max-file-size: 200MB # 最大支持文件大小
      max-request-size: 30MB # 最大支持请求大小
      
      #设置文件上传大小不进行限制
      max-file-size: -1
	  max-request-size: -1
```

> ​		2.在此基础上，若需要进一步限制可自定义类

@Slf4j
@Component
public class MultipartFileUtil {

private final static Integer FILE_SIZE = 5;//文件上传限制大小
private final static String FILE_UNIT = "M";//文件上传限制单位（B,K,M,G）

```java
/**
 * @param len  文件长度
 * @param size 限制大小
 * @param unit 限制单位（B,K,M,G）
 * @描述 判断文件大小
 */
public static boolean isExceed(Long len, int size, String unit) {
    double fileSize = 0;
    if ("B".equalsIgnoreCase(unit)) {
        fileSize = (double) len;
    } else if ("K".equalsIgnoreCase(unit)) {
        fileSize = (double) len / 1024;
    } else if ("M".equalsIgnoreCase(unit)) {
        fileSize = (double) len / 1048576;
    } else if ("G".equalsIgnoreCase(unit)) {
        fileSize = (double) len / 1073741824;
    }
    return fileSize > size;
}

//文件上传调用
public static String upload(MultipartFile file) {
    boolean flag = isExceed(file.getSize(), FILE_SIZE, FILE_UNIT);
    if (flag) {
        throw new RuntimeException("上传文件大小超出限制");
    }
}
```

#### 4.演示

**注意**

> 在我们第一次安装完minio后，若需再次启动minio服务只需找到我们之前配置好的systemctl.exe所在的位置，打开cmd进行启动
>
> 如图

![minio启动](E:\Notes\JavaNotes\Java技术储备\Java技术储备\minio启动.PNG)

- 登录minio

  账号密码见上流程

![minio 主页](E:\Notes\JavaNotes\Java技术储备\Java技术储备\minio 主页.PNG)

- 测试上传图片文件

![minio测试请求1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\minio测试请求1.PNG)

- 服务端返回结果

![上传1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\上传1.PNG)

​	服务端向前端返回文件存放路径

​	同时，在minio的管理界面中，也新增/更新了bucket中的图片，可进行预览

![minio主页面](E:\Notes\JavaNotes\Java技术储备\Java技术储备\minio主页面.PNG)

- 测试上传视频

  注意请求接口修改为：uploadVideo?file

![请求1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\请求1.PNG)

​	结果:

​	文件上传成果且可预览

![视频1](E:\Notes\JavaNotes\Java技术储备\Java技术储备\视频1.PNG)

至此，minio基本配置完成，该demo稍加优化可加入正式项目



## 分页插件的使用（10.18）

### Pagehelper简介

​	PageHelper是一款好用的开源免费的Mybatis第三方物理分页插件

### 1.引入依赖

- pagehelper 的依赖包如下

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.3.0</version>
</dependency>
```

**注意**

> 在这里注意有一个坑，在引入pagehelper后，会出现报错，报错信息如下

```
***************************
APPLICATION FAILED TO START
***************************

Description:

An attempt was made to call a method that does not exist. The attempt was made from the following location:

    com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor.<clinit>(PaginationInnerInterceptor.java:70)

The following method did not exist:

    net.sf.jsqlparser.schema.Column.withColumnName(Ljava/lang/String;)Lnet/sf/jsqlparser/schema/Column;

The method's class, net.sf.jsqlparser.schema.Column, is available from the following locations:

    jar:file:/Users/meng/.m2/repository/com/github/jsqlparser/jsqlparser/1.0/jsqlparser-1.0.jar!/net/sf/jsqlparser/schema/Column.class

The class hierarchy was loaded from the following locations:

    net.sf.jsqlparser.schema.Column: file:/Users/meng/.m2/repository/com/github/jsqlparser/jsqlparser/1.0/jsqlparser-1.0.jar
    net.sf.jsqlparser.parser.ASTNodeAccessImpl: file:/Users/meng/.m2/repository/com/github/jsqlparser/jsqlparser/1.0/jsqlparser-1.0.jar

Action:

Correct the classpath of your application so that it contains a single, compatible version of net.sf.jsqlparser.schema.Column

Process finished with exit code 1
```

出错直接原因是：找不到包jsqlparser中的方法

根本原因是：

​	在引入pagehelper依赖的同时也引入了mybatis-plus的包，而这样做会造成依赖冲突，系统自动引用了mybatis-plus的包而未使用pagehelper中的

**解决方法**

所以我们只需要在引入依赖时将响应的包排除即可

```xml
<!-- 由于这里pagehelper中的依赖包和mybatis中的依赖冲突自动加载了mybatis中的包，这里就只需要把冲突部分排除 -->
<exclusions>
    <exclusion>
        <artifactId>mybatis</artifactId>
        <groupId>org.mybatis</groupId>
    </exclusion>
    <exclusion>
        <artifactId>mybatis-spring</artifactId>
        <groupId>org.mybatis</groupId>
    </exclusion>
    <!--<exclusion>
     <artifactId>mybatis-spring-boot-starter</artifactId>
     <groupId>org.mybatis.spring.boot</groupId>
    </exclusion>-->
    <exclusion>
        <artifactId>jsqlparser</artifactId>
        <groupId>com.github.jsqlparser</groupId>
    </exclusion>
</exclusions>
```

### 2.分页插件使用

- 新建Controller

```java
@GetMapping("/queryMaintainListPaged")
public PageInfo<MaintainStandardDO> queryMaintainListPaged(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "5") Integer pageSize){
    PageInfo<MaintainStandardDO> pageInfo = new PageInfo<>(maintainStandardService.queryMaintainListPaged(pageNo, pageSize));
    return pageInfo;
}
```

在这里引入了`com.github.pagehelper.PageInfo`类封装`Page<MaintainStandardDO>`数据，同时给入参添加了两个默认值

- 新建相应的接口和service

```java
public interface MaintainStandardService {
    Page<MaintainStandardDO> queryMaintainListPaged(Integer pageNo, Integer pageSize);
}
```



```java
@Service
public class MaintainStandardServiceImpl implements MaintainStandardService {
    @Autowired
    private MaintainStandardMapper standardMapper;
    @Override
    public com.github.pagehelper.Page<MaintainStandardDO> queryMaintainListPaged(Integer pageNo, Integer pageSize) {
        //使用这句话开启分页，注意分页代码只对其后的第一个查询有效
        PageHelper.startPage(pageNo, pageSize);
        return standardMapper.selectAll();
    }
}
```

**注意**

> 使用PageHelper.startPage(pageNo, pageSize);开启分页后，分页代码只对其后的第一个查询有效

- 结果

```json
{
  "total": 7,
  "list": [
    {
      "maintainStandardId": "11111",
      "deviceId": "11111",
      "standardVersion": null,
      "standardName": null,
      "standardDocument": null,
      "creator": null,
      "maintainCycle": 1,
      "createTime": null,
      "updateTime": null,
      "isAbandon": null,
      "creatorId": null
    },
    {
      "maintainStandardId": "111111",
      "deviceId": "111111",
      "standardVersion": null,
      "standardName": null,
      "standardDocument": null,
      "creator": null,
      "maintainCycle": 1,
      "createTime": null,
      "updateTime": null,
      "isAbandon": null,
      "creatorId": null
    },
    {
      "maintainStandardId": "YHS20220829144605",
      "deviceId": "KBSB.59.K.260-A01",
      "standardVersion": "A1",
      "standardName": "换料机养护标准",
      "standardDocument": "/app/wwwroot/maintain/YHS20220829144606/YHS20220829144606_A1.pdf",
      "creator": "781257",
      "maintainCycle": 15,
      "createTime": "2022-08-29T14:51:34.000+00:00",
      "updateTime": "2022-08-29T14:51:34.000+00:00",
      "isAbandon": 0,
      "creatorId": "178"
    },
    {
      "maintainStandardId": "YHS20220829144606",
      "deviceId": "KBSB.59.K.260-A02",
      "standardVersion": "A1",
      "standardName": "换料机养护标准",
      "standardDocument": "/app/wwwroot/maintain/YHS20220829144606/YHS20220829144606_A1.pdf",
      "creator": "781257",
      "maintainCycle": 15,
      "createTime": "2022-08-29T14:51:34.000+00:00",
      "updateTime": "2022-08-29T14:51:34.000+00:00",
      "isAbandon": 0,
      "creatorId": "178"
    },
    {
      "maintainStandardId": "YHS20220829144607",
      "deviceId": "KBSB.59.K.260-A03",
      "standardVersion": "A1",
      "standardName": "换料机养护标准",
      "standardDocument": "/app/wwwroot/maintain/YHS20220829144606/YHS20220829144606_A1.pdf",
      "creator": "781257",
      "maintainCycle": 15,
      "createTime": "2022-08-29T14:51:34.000+00:00",
      "updateTime": "2022-08-29T14:51:34.000+00:00",
      "isAbandon": 0,
      "creatorId": "178"
    }
  ],
  "pageNum": 1,
  "pageSize": 5,
  "size": 5,
  "startRow": 1,
  "endRow": 5,
  "pages": 2,
  "prePage": 0,
  "nextPage": 2,
  "isFirstPage": true,
  "isLastPage": false,
  "hasPreviousPage": false,
  "hasNextPage": true,
  "navigatePages": 8,
  "navigatepageNums": [
    1,
    2
  ],
  "navigateFirstPage": 1,
  "navigateLastPage": 2
}
```

经过PageInfo的包装后，将会返回分页的详细信息如上代码。

## JSON解析（10.18）

### 1.引入依赖

```xml
<dependency>
   <groupId>com.alibaba.fastjson2</groupId>
   <artifactId>fastjson2</artifactId>
   <version>2.0.15</version>
</dependency>
```

### 2.介绍

`fastjson`的使用主要是三个对象：

> - JSON
> - JSONObject
> - JSONArray

JSONArray和JSONObject继承JSON.

#### JSON

JSON这个类主要用于**转换**：

- 将Java对象序列化为JSON字符串
- 将JSON字符串反序列化为Java对象

所以，有三个方法我们用得特别多：

- `parseObject(String text, Classclazz)`
- `parseArray(String text, Classclazz)`
- `toJSONString(Object object)`



#### JSONObject

JSON对象(JSONObject)中的数据都是以`key-value`形式出现，所以它实现了`Map`接口

使用起来也很简单，跟使用`Map`就没多大的区别（因为它底层实际上就是操作`Map`)，常用的方法：

- `getString(String key)`
- `remove(Object key)`



#### JSONArray

JSONArray则是JSON数组，JSON数组对象中存储的是一个个JSON对象，所以类中的方法主要用于**直接操作JSON对象**

最常用的方法：

- `getJSONObject(int index)`

### 3.使用案例

- 新建测试实体类

```java
/**
 * User测试类
 */
public class User {
    private String username;
    private String password;
    public User(){}
    public User(String username,String password){
        this.username = username;
        this.password = password;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "User [username=" + username + ", password=" + password + "]";
    }
}
```



```java
import java.util.ArrayList;
import java.util.List;

/**
 * 用户组测试类
 */
public class UserGroup {
    private String name;
    private List<User> users = new ArrayList<User>();
    public UserGroup(){}
    public UserGroup(String name,List<User> users){
        this.name = name;
        this.users = users;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<User> getUsers() {
        return users;
    }
    public void setUsers(List<User> users) {
        this.users = users;
    }
    @Override
    public String toString() {
        return "UserGroup [name=" + name + ", users=" + users + "]";
    }
}
```

实际使用案例测试类

```java
/**
 * fastJson测试类
 * @author dmego
 *
 */
@SpringBootTest
public class TestFastJosn {
    /**
     * java对象转 json字符串
     */
    @Test
    public void objectTOJson(){
        //简单java类转json字符串
        User user = new User("dmego", "123456");
        String UserJson = JSON.toJSONString(user);
        System.out.println("简单java类转json字符串:"+UserJson);

        //List<Object>转json字符串
        User user1 = new User("zhangsan", "123123");
        User user2 = new User("lisi", "321321");
        List<User> users = new ArrayList<User>();
        users.add(user1);
        users.add(user2);
        String ListUserJson = JSON.toJSONString(users);
        System.out.println("List<Object>转json字符串:"+ListUserJson);

        //复杂java类转json字符串
        UserGroup userGroup = new UserGroup("userGroup", users);
        String userGroupJson = JSON.toJSONString(userGroup);
        System.out.println("复杂java类转json字符串:"+userGroupJson);

    }

    /**
     * json字符串转java对象
     * 注：字符串中使用双引号需要转义 (" --> \"),这里使用的是单引号
     */
    @Test
    public void JsonTOObject(){
        /* json字符串转简单java对象
         * 字符串：{"password":"123456","username":"dmego"}*/

        String jsonStr1 = "{'password':'123456','username':'dmego'}";
        User user = JSON.parseObject(jsonStr1, User.class);
        System.out.println("json字符串转简单java对象:"+user.toString());

        /*
         * json字符串转List<Object>对象
         * 字符串：[{"password":"123123","username":"zhangsan"},{"password":"321321","username":"lisi"}]
         */
        String jsonStr2 = "[{'password':'123123','username':'zhangsan'},{'password':'321321','username':'lisi'}]";
        List<User> users = JSON.parseArray(jsonStr2, User.class);
        System.out.println("json字符串转List<Object>对象:"+users.toString());

        /*json字符串转复杂java对象
         * 字符串：{"name":"userGroup","users":[{"password":"123123","username":"zhangsan"},{"password":"321321","username":"lisi"}]}
         * */
        String jsonStr3 = "{'name':'userGroup','users':[{'password':'123123','username':'zhangsan'},{'password':'321321','username':'lisi'}]}";
        UserGroup userGroup = JSON.parseObject(jsonStr3, UserGroup.class);
        System.out.println("json字符串转复杂java对象:"+userGroup);
    }
}
```

## hutool工具集使用（10.25）

常用工具类及例子

- ###### [字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)工具

- ###### 时间操作、转化、对比工具

- ###### 文件读取、写入、下载等

- ###### 数据库链接、增删改查

- ###### HTTP客户端、网络请求、响应

- ###### JSON解析、格式化、调用

- ###### 图片操作、缩放、裁剪

- ###### [加密](https://so.csdn.net/so/search?q=加密&spm=1001.2101.3001.7020)、解密、MD5、RSA、AES、DES

- ###### 邮件工具

- ###### 二维码工具

- ###### Excel工具

- ###### 图形验证码

### 引入依赖

**Maven环境**

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.5.9</version>
</dependency>
```

**Gradle环境**

```text
compile 'cn.hutool:hutool-all:5.5.9'
```

#### 常用工具及使用案例

- 字符串工具

```java
String s = " ";
StrUtil.isBlank(s);//判断是否为空,null,"",不可见字符(空格)都为空
StrUtil.isNotBlank(s);//上面的反例
StrUtil.lowerFirst(s);//首字母小写
StrUtil.maxLength(s, 10);//限制字符串长度，如果超过指定长度，截取指定长度并在末尾加"..."
StrUtil.uuid();//生成随机UUID
```

- 时间操作、转化、对比工具

```java
Date date = DateUtil.date();//当前时间
Date date2 = DateUtil.date(System.currentTimeMillis());//当前时间
String now = DateUtil.now();//当前时间字符串，格式：yyyy-MM-dd HH:mm:ss
String today= DateUtil.today();//当前日期字符串，格式：yyyy-MM-dd
String dateStr = "2017-03-01";
date = DateUtil.parse(dateStr);//字符串转日期,方法会自动识别一些常用格式,yyyy-MM-dd HH:mm:ss,yyyy-MM-dd
DateTime newDate = DateUtil.offsetDay(date, 3);//时间偏移,当前时间+3天
DateTime newDate2 = DateUtil.offsetHour(date, -3);//时间偏移，当前时间-3小时
long betweenDay = DateUtil.between(date, date2, DateUnit.DAY);//计算时间差，单位可自定义
String zodiac = DateUtil.getZodiac(1, 19);//获取星座
int age = DateUtil.ageOfNow("1990-01-30");//计算年龄
```

- 数据库链接、增删改查

```java
//使用前先配置数据源,引入JDBC jar包
Entity record = new Entity();
record.setTableName("table_name");
record.set("field", "value");
Db.use().insert(record);//插入
Entity where = new Entity();
where.set("id", 1);
Db.use().del(where);//删除
Db.use().update(record, where);//修改
List<Entity> records = Db.use().find(where);//查询
```

- HTTP客户端、网络请求、响应
```java
//Get请求
String result1= HttpUtil.get("url");
String result2= HttpUtil.get("url", CharsetUtil.CHARSET_UTF_8);
//Post请求
HashMap<String, Object> paramMap = new HashMap<>();
paramMap.put("city", "北京");
String result= HttpUtil.post("url", paramMap);
//下载文件
HttpUtil.downloadFile("url", "目录/文件名");
//自定义请求
HttpCookie cookie = new HttpCookie("cookieKey", "cookieValue");
HttpCookie cookie2 = new HttpCookie("cookieKey", "cookieValue");
HttpResponse res = HttpUtil.createGet("url").header("headerKey","headerValue").cookie(cookie,cookie2).execute();
int httpStatus = res.getStatus();
String body = res.body();
```

- 加密、解密

```java
SecureUtil.md5("需要加密的信息");
SecureUtil.des().encrypt("需要加密的信息");
SecureUtil.des().decrypt("需要解密的信息");
SecureUtil.aes().encrypt("需要加密的信息");
SecureUtil.aes().decrypt("需要解密的信息");

RSA rsa = new RSA();
//获得私钥
rsa.getPrivateKey();
rsa.getPrivateKeyBase64();
//获得公钥
rsa.getPublicKey();
rsa.getPublicKeyBase64();
//公钥加密，私钥解密
byte[] encrypt = rsa.encrypt(StrUtil.bytes("我是一段测试aaaa", CharsetUtil.CHARSET_UTF_8), KeyType.PublicKey);
byte[] decrypt = rsa.decrypt(encrypt, KeyType.PrivateKey);
//私钥加密，公钥解密
byte[] encrypt2 = rsa.encrypt(StrUtil.bytes("我是一段测试aaaa", CharsetUtil.CHARSET_UTF_8), KeyType.PrivateKey);
byte[] decrypt2 = rsa.decrypt(encrypt2, KeyType.PublicKey);
```

- 二维码工具

```xml
//需要引入二维码依赖
<dependency>
    <groupId>com.google.zxing</groupId>
    <artifactId>core</artifactId>
    <version>3.3.3</version>
</dependency>
```

```java
QrConfig config = new QrConfig(300, 300);
// 设置边距，既二维码和背景之间的边距
config.setMargin(3);
// 设置前景色，既二维码颜色（青色）
config.setForeColor(Color.CYAN.getRGB());
// 设置背景色（灰色）
config.setBackColor(Color.GRAY.getRGB());
// 生成二维码到文件，也可以到流
QrCodeUtil.generate("http://hutool.cn/", config, FileUtil.file("e:/qrcode.jpg"));
//附带logo小图标二维码
QrCodeUtil.generate(//
    "二维码内容", //二维码内容
    QrConfig.create().setImg("c:/logo.jpg"), //附带logo
    FileUtil.file("c:/qrcode.jpg")//写出到的文件
);
//解析二维码文件
String decode = QrCodeUtil.decode(FileUtil.file("c:/qrcode.jpg"));
```

- 图形验证码

```java
图形验证码
//定义图形验证码的长和宽
LineCaptcha lineCaptcha = CaptchaUtil.createLineCaptcha(200, 100);
//图形验证码写出，可以写出到文件，也可以写出到流
lineCaptcha.write("d:/line.png");
//输出code
Console.log(lineCaptcha.getCode());
//验证图形验证码的有效性，返回boolean值
lineCaptcha.verify("1234");
```

## Ruoyi框架分析总结（10.25）

