# ACE DotNet

## 安装扩展

1.C#  核心扩展包

2.C# Extension 快捷新建类扩展包

3.NET Core Add Reference 添加相关依赖

4.C# XML Documentation Comments 自动添加注释模板

5.NuGet Gallery 搜索添加包引用

6.ASP.Net CORE Swicher 视图模型快捷跳转与新建controller对应视图

7.vscode-solution-explore 解决方案创建浏览器，快捷新建.sln文件不需要从控制台输入命令行创建

8.NuGet Package Manager GUI 搜索Nuget包，添加引用依赖



## 文件目录结构

1.先在工作区中排除掉bin文件夹和obj文件夹

``` c#
**/bin
**/obj
```

2.conroller 文件夹中新建的controller 与 views文件夹中的每个文件夹相对应

controller与view是强绑定关系

DTO：DomainToObject领域模型



##跨域问题的解决

### 1.什么是跨域



### 2.跨域会出现的情况



### 3.如何解决跨域



## APIController特性的功能

1.参数类型推断

​	这个特性是.net3.1开始出现的数据，该特性的作用是自动推导前端传过来的数据是什么类型

​	如果没有它的话，默认都是从query中传过来的数据

​	除非，我们在每一个数据传参过来的时候特别制定数据的传参方式它才能够识别出来

2.使用位置不同，使用方法不同

​	1.[ApiController]本质是一个类ApiControllerAttribute

​	在放在[]中使用时可省略Attribute但是如果在方法中使用时需要

3.属性路由要求

4.自动HTTP400响应

5.Multipart/form-data 请求推理

6.错误状态码的问题详细信息

## 请求数据的几种方式

| 特性          | 绑定源                     |
| ------------- | -------------------------- |
| [FromForm]    | 请求正文中的表单数据       |
| [FromBody]    | 请求正文                   |
| [FromQuery]   | 请求查询字符串             |
| [FromHeader]  | 请求标头                   |
| [FromRoute]   | 请求路由                   |
| [FromService] | 作为操作参数插入的请求服务 |

在传递参数的过程中，可以使用以上修饰符修饰每个需要传参的参数

若没有则会由[ApiController]自动读取识别，默认一般为[FromQuery]

## 路由属性要求

[Route("controller")] 该特性指定路由名称，也可以在方法前单独添加[Route("")]属性

类似于[HttpGet("extend")]，可以延申路由

``` c#
[HttpGet("get")]

//后端限制参数必须传递,如果没有，将会直接显示该网页无法正常操作
[HttpGet("{init}")]
public IEnumerable<WeatherForecast> Get(int init)
{
    ...
}
```

限制属性要求还可以在类对象中添加使用,当传入的数据是定义的对象类时，可在对象中限制传值要求

``` c#
public class UserCreateViewModel
{
    [Required]
    public int Id {get; set;}

    [MaxLength(4)]
    [MinLength(1)]
    public string Name {get; set;}
}
```

## 创建Restful风格的API（官方标准的示例）

| API                       | 描述             | 请求正文 | 响应正文                            |
| ------------------------- | ---------------- | -------- | ----------------------------------- |
| GET/api/todoitems         | 获取所有代办事项 | None     | 待办事项的数组                      |
| GET/api/todoitems/{id}    | 按ID获取项       | None     | 代办事项                            |
| POST/api/todoitems        | 添加新项         | 代办事项 | 代办事项                            |
| PUT/api/todoitems/{id}    | 更新现有项       | 代办事项 | None 没必要在返回，更新的数据前端有 |
| DELETE/api/todoitems/{id} | 删除项           | 无       | None                                |

>注意：
>
>POST/api/todoitems  插入的对象，传入的和返回的要保持一致

一个补充知识：所有进程之间的通信，都是要通过序列化去做的，转换成json格式数据去进行数据交互

## 返回值类型

ASP.NET Core 提供一下Web API 控制器操作返回类型选项：

- 特定类型（如自己自定义的类）
- IActionResult
- ActionResult

1.特定类型

​	最简单的操作返回基元或复杂数据类型(如string 或 自定义对象)

2.IActionResult 类型

​	当操作中可能有多个ActionResult 返回类型时，适合使用IActionResult 返回类型。ActionResult类型表示多种HTTP状态码。

​	此类别中的某些常见返回类型为BadRequestResult(400)、NotFoundResult(404)、OkObjectResult(200)

​	其中有两种可能的返回类型:

3.ActionResult 类型

​	ASP.NET Core包括面向Web API 控制器操作的ActionResult返回类型，这种返回值类型既能返回普通类型的返回值，又能返回指定状态码。

``` c#
[HttpGet("{id}")]
public ActionResult<Product> GetById(int id)
{
	if(id > 1)
        {
            return new UserCreateViewModel();
        }
        else
        {
            return NotFound();
        }
}
```

使用该返回类型既可以获得状态码，又可以查看到响应的是什么格式的数据（是什么类型）



> 一个小操作：
>
> ```
> 针对："2022-7-20T0:00:00"的处理可使用
> "2022-7-20T0:00:00".Replace("T"," ")
> ```
>
> ctrl + K + S 调出快捷键面板

2022-7-20 



2-6d答疑

添加包中的方法的引用，可以自动反编译出包中的方法

![捕获](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\捕获.PNG)



## Ref 和 Out的区别

1.值类型与引用类型

​	值类型传递的是一个值（如 int struct 这些类型），引用类型（如一个类）传递的是一个地址

​	所以在参数传参时，如果传入的参数是一个值类型，不管方法里面怎么变，外面的值类型是不会变的

​	如果传入的参数是一个引用类型，当在函数里面给这个对象赋值后，该对象的值会改变

2.约束参数类型

**ref**

``` c#
//类型“int”必须是引用类型才能用作泛型类型或方法“WeatherForecastController.ParamsTest2<T>(T)”中的参数“T”

[HttpDelete]
public void Remove()
{
    int i = 0;
    UserCreateViewModel create = new();
    ParamsTest1(ref i);
    ParamsTest2(create);
}

private void ParamsTest1(ref int i)
{
    i = 10;
}

在调用ParamsTest1方法时，Remove()方法内i的值也会随之变化
```

**out**

``` c#
[HttpDelete]
    public void Remove()
    {
        int i = 0;
        UserCreateViewModel create = new();
        ParamsTestRef(ref i);
        //这里在传参的时候定义了一个变量类型x， 表示这里执行方法后，就有新类型x获得该值
        //本质上这个out表名该参数是一个可返回的参数,out可以实现一个多参数返回，out在被调用的方法中必须赋值
        //同时也可以使用元组来完成多参数返回
        //ref表示的是把地址返回给我们的方法
        ParamsTestOut(out int x);
        ParamsTest2(create);
    }

    private void ParamsTestRef(ref int i)
    {
        i = 10;
    }

    private void ParamsTestOut(out int i)
    {
        i = 10;
    }
```

## wwwroot在webApi中的使用

在MVC项目中，项目会自带wwwroot文件夹

而在webApi项目中，不会自带wwwroot文件夹，但可以自己创建wwwroot文件夹，并在项目中配置好始终发布到项目中即可

```xml
//这段话需要配置在webapi项目中，这样在发布后，才能向wwwroot中去存文件，否则找不到这个文件夹

<ItemGroup>
    <Folder Include="wwwroot\"/>
</ItemGroup>

<ItemGroup>
    <Content Update="wwwroot">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </Content>
</ItemGroup>
```



``` c#
public WeatherForecastController(ILogger<WeatherForecastController> logger, IWebHostEnvironment env)
{
    var path = env.ContentRootPath;//拿到当前项目所在的路径
    var res = env.WebRootPath;//拿到当前项目的wwwroot路径
    _logger = logger;
}
获取当前项目路径有两种方式
```

**tips**

如果新建项目没有提示需要重启ominisharp

定时任务



## 权限设计模块思路解析

1.菜单权限通道

​	ex.通过拿路由信息判断用户是否有该权限，

​			如果没有权限，将会返回给前端，不给他展示某些界面

​			如果有权限，根据拥有的权限前端给他展示相应的界面

2.数据权限通道

​	可通过jwt获取token中获取用户信息，根据用户信息来判断是否给该用户传递数据



每个用户对应多个权限，就有些太复杂，我们就可以采取给用户分组的方式（即给用户分角色）

​	多个用户对应一组角色（如养护员、点检员）=> 对应一个权限

![Authorization](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\Authorization.png)



## MinimalAPIs

最小的API包括：

- 新承载的API
- WebApplication和WebApplicationBuilder
- 新的路由API

代码：

```c#
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");//第一个参数表示为一个路由地址，第二个参数表示一个已lambda表达式存在的方法体


app.Run();
```

可以通过命令行上的 dotnet new web 或者在Visual Studio 中选择“空 Web” 模板来创建前面的代码

以下代码创建WebApplication(app),而无需显示创建WebApplicationBuilder

```c#
var app = WebApplication.Create(args);

string Hello(string name) => $"{name}Yhy";
//这四个方法也是可以传参的
app.MapGet("/mini/{name}", () => Hello);//1.以委托的形式传递方法

app.MapGet("/", () => "Hello World!");

app.MapGet("/mini/{name}", () => Hello);//1.以委托的形式传递方法
app.MapGet("/mini", MethodHelper.Hello);
app.MapGet("/todos/{text}", (string text) => text);

app.MapGet("/mini", (ILogger<WeatherForecast> logger) => {logger.LogWarning("This a loggWarning!"); return "test";});//依赖注入这个Ilogger

app.MapPost("/", () => "Hello World!");
app.MapPut("/", () => "Hello World!");
app.MapDelete("/", () => "Hello World!");

app.Run();

class Helloworld()
{
	public static string Hello
    {
        return "Hello World";
    }    
}
```



> 从以上案例可以发现，方法体其实是一个委托，那么既然是委托，就有一些技巧
>
> 可以自己定义方法在minimalAPI中调用
>
> 参数的传递可以使用委托的方式传入，也可以使用依赖注入

## IOC概念

1.理解依赖注入

​	IOC (Inversion of Ctroller)即控制反转如何理解？

生活中的例子：

一般，当我们想要喝奶茶时，会去到奶茶店中点一杯奶茶，这时候是你去找店员要东西

当我们在餐厅里时，服务员会主动过来给你菜单，询问你要点什么，这是时服务员主动上门服务你

这就是完成了一个控制反转



该场景就是构造函数注入

​	通过构造函数注入的方式，让我的类拥有服务对象



构造函数与依赖注入的关系？

​	依赖注入时实现控制反转的一种手段或方式

也可以使用反射，拿到构造函数，看这些参数中有些什么东西



### 概念

依赖注入（DI：Dependency Injection） 我们首先要理清 **谁依赖谁、为什么需要依赖、谁注入谁、注入了什么**

- 谁依赖谁：应用程序依赖于IOC容器
- 为什么需要依赖：应用程序需要IOC容器来提供对象需要的外部资源
- 谁注入谁：IOC容器注入应用程序某个对象，应用程序依赖的对象
- 注入了什么：就是注入某个对象所需要的的外部资源（包括对象、资源、常量数据）

### ASP.NET Core6 IOC 容器

上文多次提到IOC容器，那么IOC容器是什么？

在ASP NET Core 6 的IOC容器就是 ServiceCollection， 从字面意思理解就是==服务收集器==或者==服务集合==

他相当于就是一个存放服务的容器罐子，这里所谓的服务就是开发过程中需要使用的各种类的统称

注意：ServiceCollection不光只能在web项目中使用

### 服务生命周期

服务生命周期分为三类

- Transient瞬时生命周期 ：

  在类中new一个对象，这个对象new完之后，再要调用时a中的user对象都要创建一次，用完之后user对象就释放了

- Singleton单例生命周期

  用完之后，可以把这个东西存起来，不释放

```c#
private static UserCreateViewModel user;
public void Remove()
{
    for(int i = 0; i < 10; i++){
        //user在首次被创建之后，就会存到上面的静态变量中，不管循环多少次都还是这个静态的user
        //也就是说在程序启动后，第一次实例化成功后，静态的UserCreateViewModel是一直保存着的
        //这是单例
        var user = A();
    }
}


private UserCreateViewModel A()
{
    if(user == null)
    {
        user = new UserCreateViewModel();
    }
    return user;
}
```

- Scoped 作用域生命周期

  我们把每一次请求称作一个作用域，每一次请求后又会初始化新的值

  每一次请求中，我在这次请求中是单例的，但下一次请求又会重置

### 注册服务

针对以上三种提到的生命周期，自然就应对了三种服务注册的方式，分别是

AddTransient()

AddSingleton()

AddScoped()

```c#
//具体注册方式如下
service.AddTransient<IUser, User>()
service.AddTransient(typeof(IUser), typeof(User)) //微服务与微服务之间会使用RPC去交互，首先得遵循同一个规则，符合同一个接口，就能够进行交互

service.AddScoped<IUser, User>()
service.AddTransient(typeof(IUser), typeof(User))
    
service.Singleton<IUsser, User>()
service.Singleton(typeof(IUser), typeof(User))
service.Singleton<IUser>(user) //单例注册第一次调用时一旦实现，之后就都不需要再创建了，这样可以在项目创建的时候直接创建它
    
    
//以下res1 和 res2 都是拿到的这个传入类的名称这两个
var res1 = myHelper.GetMyType<UserCreateViewModel>();
//使用该方法依赖注入时可以注册传入泛型类型的接口
var res2 = myHelper.GetMyType(typeof(UserCreateViewModel));
```

## 三种服务类型辨析

接口的作用：

​	1.规范和约束当前方法里可以公开的方法的名称

​	2.让大家都可以遵循和使用同一套规则



三种容器在项目调用中分别呈现什么状态 并且这种方式在什么情况下，什么场景下，用什么方法很重要

**三种生命周期在什么情况下使用**

![三种服务关系](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\三种服务关系.png)



```c#
示例代码：


//创建三个容器的接口
public class ScopedService : IScopedService
{
    public ScopedService()
    {

    }
}

public class SingletonService : ISingletonService
{
    public SingletonService()
    {

    }
}


public class TransientService : ITransientService
{
    public TransientService()
    {

    }
}

//将三个方法注入到iocService
public class IocService1 : IIocService1
{
    //依赖注入分别调用三个service
    public IocService1(
    ISingletonService singletonService,
    IScopedService scopedService,
    ITransientService transientService
    )
    {

    }
}

public class IocService2 : IIocService2
{
    public IocService2(
        ISingletonService singletonService,
        IScopedService scopedService,
        ITransientService transientService
    )
    {

    }
}

//在program中注册服务
builder.Services.AddTransient<ITransientService, TransientService>();
builder.Services.AddScoped<IScopedService, ScopedService>();
builder.Services.AddSingleton<ISingletonService, SingletonService>();

builder.Services.AddTransient<IIocService1, IocService1>();
builder.Services.AddTransient<IIocService2, IocService2>();


//在controller中进行依赖注入
public WeatherForecastController(
    ILogger<WeatherForecastController> logger, 
    IWebHostEnvironment env,
    IUserService service,    //在这里注册了以后，就会在注册表里去找注册时的服务类型

    IIocService1 iocService1,
    IIocService2 iocService2
)
{
    var path = env.ContentRootPath;
    var res = env.WebRootPath;
    _logger = logger;
    this.service = service; //成员变量赋值了service以后，我们就可以在任意的地方去使用他
}

```



## 容器增强、WPF容器集成

**Autofac**

依赖包：Autofac.Extension.DependencyInjection

![安装依赖](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\安装依赖.PNG)





**替换容器**

对于.NET5和.NET6 中实际上是有不同的使用方法，

```c#
//对于.net3或者.net5中需要如下配置
public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .UseServiceProviderFactory(new AutofacProviderFactory());
//这样才能替换掉它原本的容器
```



而在.net6中，

找到Program文件

在创建了builder之后添加

```c#
//替换默认容器，保守起见将这个替换写在builder.Build()之上，以免使自己的注入失效
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
var app = builder.Build();
```



```c#
public WeatherForecastController(
        ILogger<WeatherForecastController> logger, 
        IWebHostEnvironment env,
        IUserService service,    //在这里注册了以后，就会在注册表里去找注册时的服务类型

        IIocService1 iocService1,
        IIocService2 iocService2,
        IServiceProvider provider
    )
    {
        var path = env.ContentRootPath;
        var res = env.WebRootPath;
        _logger = logger;
        this.service = service; //成员变量赋值了service以后，我们就可以在任意的地方去使用他
    }
```

> 1.替换成功后，依赖注入进来的就会是{Autofac.Extensions.DependencyInjection.AutofacServiceProvider}
>
> 2.而若不替换使用的是{Microsoft.Extensions.DependencyInjection.ServiceLookup.ServiceProviderEngineScope}
>
> 它的原生容器引擎

像WPF这样的窗体应用也能够集成容器 4-4 中有讲解

## 网站架构-Nginx-iis 为什么要配置跨域

![Nginx为什么要配置跨域](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\Nginx为什么要配置跨域.png)

这样在读取图片的时候就不会让图片占用了读取数据的流量

==所以有些网站会出现数据先出来，图片后加载的情况==



## Autofac属性注入

配置：

在.NET6中运行时，直接在program.cs添加

```c#
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.ConfigureContainer<>
```

在NET5中运行时，需要在startup.cs文件中新增方法配置

```c#
//ConfigureContainer这个方法是自带的一个扩展方法，用来添加第三方容器
builder.Host.ConfigureContainer<ContainerBuilder>(builder =>{
    //使用Autofac进行服务的注入
    builder.RegisterType<IocService1>().As<IIocService1>()
    .InstancePerLifetimeScope() //这里就把它注册成了一个单例生命周期的服务
    .PropertiesAutowired();     //支持属性注入,这里的含义是让IocService1它的里面允许属性注入
    //builder.RegisterType<IocService2>().As<IIocService2>().SingleInstance();//注册成为singleon
});
```



//.PropertiesAutowired();的作用是使该类可以使用属性注入，而不是把它当作属性去注入

属性注入的示例

```c#
public class IocService1 : IIocService1
{
    //属性注入
    public ITransientService TransientService {get; set; }
    public ISingletonService SingletonService {get; set; }
    public IScopedService ScopedService {get; set;}


    //依赖注入分别调用三个service
    // public IocService1(
    //     ISingletonService singletonService,
    //     IScopedService scopedService,
    //     ITransientService transientService
    // )
    // {
    // }
}
```

使用：

```c#
public class IocService2 : IIocService2
{
    public IocService2(
        ISingletonService singletonService,
        IScopedService scopedService,
        ITransientService transientService
    )
    {

    }
}


//这样可以使代码简洁也就是说IocService2可以使用IocService1里面注入的那几个方法了
public class IocService2 : IocService1, IIocService2 //IocService2继承IocService1，并实现IIocService2接口 
{
    // public IocService2(
    //     ISingletonService singletonService,
    //     IScopedService scopedService,
    //     ITransientService transientService
    // )
    // {
    // }
}
```

**将控制器作为属性注入**

1.控制器的创建方式是不一样的，不是通过容器去创建的，在.net6中，本身自带的controller是通过反射去创建的，不是把controller注册到容器中，从容器中取出来，它是从前端的路由拿到controler的名字，通过createInstance()反射出controller类型，让我们去使用

2.所以要实现将控制器注入，需要改变我们原本生成controller的方式，换成容器的方式生成

在program中添加

```c#
//以添加服务的方式生成控制器，而不是像以前一样使用反射去生成了
builder.Services.AddControllers().AddControllersAsServices();


//ConfigureContainer这个方法是自带的一个扩展方法，用来添加第三方容器
builder.Host.ConfigureContainer<ContainerBuilder>(builder =>{
    //将控制器以属性的方式注入
    builder.RegisterType<WeatherForecastController>()
    .InstancePerLifetimeScope()
    .PropertiesAutowired();
    //使用Autofac进行服务的注入
    builder.RegisterType<IocService1>().As<IIocService1>()
    .InstancePerLifetimeScope() //这里就把它注册成了一个单例生命周期的服务
    .PropertiesAutowired();     //支持属性注入,这里的含义是让IocService1它的里面允许属性注入
    //builder.RegisterType<IocService2>().As<IIocService2>().SingleInstance();          //注册成为singleton
});
```

这样做的意义，就是我们可以在controller中进行属性注入了

## 三个生命周期对应的使用场景



- Transient 访问的是无状态的

  对controller的访问，一般是进行一次访问就够了，也不需要记住什么东西，所以该方式进行无状态的访问就够了

  数据库必须保证一个请求完成后进行关闭

- Scoped 

  在一次访问中，需要记下某些状态，在方法中或者类中调用时，能够共享一些状态

  1.如dbConnection、dbContext、完善用户信息：第一次请求中有一个类里面填用户密码，第二次请求填写用户所在部门，这时候用户的service就需要一个共享，这时候不能第一次new了一个，第二次再用的时候就没了

- Singleton

  对于一些属性，每一次都是访问这一个值就是单例的

  一般是redis，连接一次就保存了，一直保持连接。



## Autofac模块化

通过一个扩展方法完成Autofac模块化

新建类ServiceExtensions.cs

定义新方法

``` c#
public static void AutofacExtension(this ContainerBuilder builder){
            //将控制器以属性的方式注入
            builder.RegisterType<WeatherForecastController>()
            .PropertiesAutowired();
            //使用Autofac进行服务的注入
            builder.RegisterType<IocService1>().As<IIocService1>()
            .InstancePerLifetimeScope() //这里就把它注册成了一个单例生命周期的服务
            .PropertiesAutowired();     //支持属性注入,这里的含义是让IocService1它的里面允许属性注入
            //builder.RegisterType<IocService2>().As<IIocService2>().SingleInstance();          //注册成为singleton
        }
```

注意这里：1.方法使用静态方法 2.入参需加关键字this 3.ContainerBuilder

扩展方法使你能够向现有类型“添加”方法，而无需创建新的派生类型、重新编译或以其他方式修改原始类型。 扩展方法是一种静态方法，但可以像扩展类型上的实例方法一样进行调用。

> ## 定义和调用扩展方法
>
> 1. 定义包含扩展方法的静态[类](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members)。
>
>    此类必须对客户端代码可见。 有关可访问性规则的详细信息，请参阅[访问修饰符](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers)。
>
> 2. 将扩展方法实现为静态方法，并且使其可见性至少与所在类的可见性相同。
>
> 3. 此方法的第一个参数指定方法所操作的类型；此参数前面必须加上 [this](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/this) 修饰符。
>
> 4. 在调用代码中，添加 `using` 指令，用于指定包含扩展方法类的[命名空间](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/namespace)。
>
> 5. 和调用类型的实例方法那样调用这些方法。
>
>    请注意，第一个参数并不是由调用代码指定，因为它表示要在其上应用运算符的类型，并且编译器已经知道对象的类型。 你只需通过 `n` 提供形参 2 的实参。



- 抽取写法 

  **方式一**

  在utility文件夹中新建ApiModel.cs如下

``` c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using TestAPI.Controllers;
using TestAPI.IocService;
using TestAPI.IocService.IServices;

namespace TestAPI.Utility
{
    //autofac自己提供了一套模块化的方法
    public class ApiModel : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //将控制器以属性的方式注入
            builder.RegisterType<WeatherForecastController>()
            .PropertiesAutowired();
            //使用Autofac进行服务的注入
            builder.RegisterType<IocService1>().As<IIocService1>()
            .InstancePerLifetimeScope() //这里就把它注册成了一个单例生命周期的服务
            .PropertiesAutowired();     //支持属性注入,这里的含义是让IocService1它的里面允许属性注入
            //builder.RegisterType<IocService2>().As<IIocService2>().SingleInstance();          //注册成为singleton
        }
    }
}
```

上面注意继承Autofac.Module并重写Load方法，所有的注入都写入Load方法内

然后再在program中配置

```c#
builder.Host.ConfigureContainer<ContainerBuilder>(builder =>{
    //这里所有的容器配置都会在AutofacExtension中进行配置
    //builder.AutofacExtension();
    //以模块的方式注入
    builder.RegisterModule<ApiModel>();
});
```

​	**方式二**

​	新建一个新的空项目，修改引入，在csproj文件中引入

```xml
<ItemGroup>
		<PackageReference Include="Autofac.Extensions.DependencyInjection" Version="8.0.0" />
</ItemGroup>
```

​	重新restore项目，再使用ominisharp重新启动以下程序即可再新项目中解析出该包

​	可新建FirstDemoUtilityModule.cs  INewService.cs NewService.cs

```c#
namespace FirstDemo.Utility
{
    public class FirstDemoUtilityModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<NewService>().As<INewService>();
        }
    }
}
```

在该类中实现容器注入，将该project添加到主项目TestAPI的依赖包中去，在TestAPI的csproj文件下右键选择Addference，将之前的FirstDemo.Utility选中即可在新项目中添加依赖，一层一层引用属性注入

## 区分生命周期的反射注入

简单来说：反射即从我们的项目中，把所有的相应的项目类型给找出来，然后通过注入的方式给它统一的输入进去



该部分对应5-5 有些不懂可再次复习

## 手写IOC容器

遗留问题解答：

​	对于容器的使用，在wpf中一般点开第一个窗体是不会再关的，只要主窗体不释放，他的容器都不会再释放。

新建类库指令：

```c#
dotnet new classlib -o StringLibrary
```

见项目中IocDemo，简单实现并执行了IOC容器的一个基本流程

结合代码做以下总结：

![IocDemo](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\IocDemo.png)



```c#
public class MyServiceCollection : List<MyServiceDiscriptor> 1.这里简化了一下，实际上是一个list需要遍历
{
    /// <summary>
    /// 添加瞬时
    /// </summary>
    /// <typeparam name="TService"></typeparam>
    /// <typeparam name="TImplement"></typeparam>
    /// <returns></returns>
    public void AddTransient<TService, TImplement>()
        where TService : class
        where TImplement : class
        {
            AddTransient(typeof(TService), typeof(TImplement));
        }

    public void AddTransient(Type serviceType, Type implementType)
    {
        var discriptor = new MyServiceDiscriptor()
        {
            Life = MyServiceLife.Transient,
            ServiceType = serviceType,
            ImplementType = implementType,
        };
        AddIfNotContent(discriptor);
    }

    /// <summary>
    /// 添加作用域单例
    /// </summary>
    /// <typeparam name="TService"></typeparam>
    /// <typeparam name="TImplement"></typeparam>
    /// <returns></returns>
    public void AddScoped<TService, TImplement>()
        where TService : class
        where TImplement : class
        {
            AddScoped(typeof(TService), typeof(TImplement));
        }

    public void AddScoped(Type serviceTye, Type implementType)
    {
        var discriptor = new MyServiceDiscriptor()
        {
            Life = MyServiceLife.Scoped,
            ServiceType = serviceTye,
            ImplementType = implementType,
        };
        AddIfNotContent(discriptor);
    }

    /// <summary>
    /// 添加单例
    /// </summary>
    /// <typeparam name="TService"></typeparam>
    /// <typeparam name="TImplement"></typeparam>
    /// <returns></returns>
    public void AddSingleton<TService, TImplement>() //TImplement instance
        where TService : class
        where TImplement : class
        {
            AddSingleton(typeof(TService), typeof(TImplement));
        }

    //这样写就可以在单例这直接传一个实例
    public void AddSingleton(Type serviceTye, Type implementType)
    {
        AddSingleton(serviceTye, implementType, null);
    }

    public void AddSingleton(Type serviceTye, Type implementType, object instance)
    {
        var discriptor = new MyServiceDiscriptor()
        {
            Life = MyServiceLife.Singleton,
            ServiceType = serviceTye,
            ImplementType = implementType,
            ImplementInstance = instance
        };
        AddIfNotContent(discriptor);
    }


    /// <summary>
    /// 往集合添加类型
    /// </summary>
    /// <param name="discriptor"></param>
    private void AddIfNotContent(MyServiceDiscriptor discriptor)
    {
        if(!this.Any(m => m.ServiceType == discriptor.ServiceType && m.ImplementType == m.ImplementType))
        {
            this.Add(discriptor);
        }
    }
}
```

## Filter 过滤器

要了解Filter过滤器，首先要知道什么是AOP，AOP即面向切面编程

何为AOP：

我们先回顾一下OOP：Object Oriented Programming，OOP作为面向对象编程的模式，获得了巨大的成功，OOP的主要功能是数据封装、继承和多态。

而AOP是一种新的编程方式，它和OOP不同，OOP把系统看作多个对象的交互，AOP把系统分解为不同的关注点，或者称之为切面（Aspect）。

要理解AOP的概念，我们先用OOP举例，比如一个业务组件`BookService`，它有几个业务方法：

- createBook：添加新的Book；
- updateBook：修改Book；
- deleteBook：删除Book。

对每个业务方法，例如，`createBook()`，除了业务逻辑，还需要安全检查、日志记录和事务处理，代码举例如下：

```c#
public class BookService {
    public void createBook(Book book) {
        securityCheck();
        Transaction tx = startTransaction();
        try {
            // 核心业务逻辑
            tx.commit();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
        }
        log("created book: " + book);
    }
}
```

对于安全检查、日志、事务等代码，它们会重复出现在每个业务方法中。使用OOP，我们很难将这些四处分散的代码模块化。

考察业务模型可以发现，`BookService`关心的是自身的核心逻辑，但整个系统还要求关注安全检查、日志、事务等功能，这些功能实际上“横跨”多个业务方法，为了实现这些功能，不得不在每个业务方法上重复编写代码。

如果我们以AOP的视角来编写上述业务，可以依次实现：

1. 核心逻辑，即BookService；
2. 切面逻辑，即：
3. 权限检查的Aspect；
4. 日志的Aspect；
5. 事务的Aspect。

然后，以某种方式，让框架来把上述3个Aspect以Proxy的方式“织入”到`BookService`中

**实际上，AOP的本质就是一个动态代理，让我们把一些常用功能如权限检查、日志、事务等，从每个业务方法中剥离出来**



### Filter的类型

从以上案例中我们理解了什么是AOP，那么Filter就是实现AOP的一种方式，在ASP.NET Core中一共有5大Filter

- AuthorizationFilter 授权过滤器
- ResourceFilter 资源管理过滤器
- ActionFilter 行为过滤器
- ExceptionFilter 异常过滤器
- ResultFilter 结果过滤器

执行顺序：

​	![Filter执行顺序管道](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\Filter执行顺序管道.png)

​	

>在ActionFilter中现在能获取到哪些东西：
>
>​	1.获取资源 
>
>​	2.请求参数
>
>​	3.action的信息（action方法名称、controller方法名称）
>
>​	4.用户信息（通过鉴权授权后可以得到用户的请求信息）
>
>​	5.请求信息

**注意部分Filter分前置和后置**

​	1.ResourceFilter

​	2.ActionFilter

​	3.ResultFilter

### 注册方式

注册方式分为：

- 方法注册

  直接在调用的方法前添加特性

```c#
[HttpGet()]
[ActionFilter]
public IEnumerable<WeatherForecast> Get()
{
    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
                                         {
                                             Date = DateTime.Now.AddDays(index),
                                             TemperatureC = Random.Shared.Next(-20, 55),
                                             Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                                         })
        .ToArray();
}
```

- 类注册

  直接在类前加特性调用

```c#
[Route("[controller]")]
[CtmActionFilter]
public class DoHomeWorkController : ControllerBase
{
    //单一职责原则
    //一个方法只应该承担与其业务相关的事情，不宜承担其他业务逻辑
    //如果有其他前置的业务逻辑存在，我们应该在进入这个方法之前执行前置业务逻辑
    ...
}
```

- 全局注册

**所有的特性必须都以Atrribute结尾，虽然在标注特性时不需要加Atrribute（可省略），类似于controller，在非特性的部分使用时不加Atrribute会报错**

在编写特性类时，需要实现IActionFilter并实现两个接口

```c#
//在program里面添加,这样就给全局添加了一个ActionFilter
builer.Services.AddConrollers(o => o.Filters(o=>o.Filters.Add(typeof(CtmActionFilterOnProgramAttribute))))  
```

**attribute类编写**

```c#
public class CtmActionFilterOnActionAttribute : Attribute, IActionFilter
{
    public void OnActionExecuted(ActionExecutedContext context)
    {
        System.Console.WriteLine("OnActionExecuted   Action");
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        System.Console.WriteLine("OnActionExecuting    Action");
    }
}
```

ActionExecutingContext 提供一下属性：

- ActionArgument - 用于读取操作方法的输入
- Controller - 用于控制器实例
- Result - 设置Result会使操作方法后续操作过滤器的执行短路

在操作方法中引发异常：

- 防止运行后续过滤器
- 与设置Result不同，结果被视为失败而不是成功



这里的执行顺序：

​	先进入program的OnActionExecuting 再进入Class的OnActionExecuting再进入Action的OnActionExecuting

​	然后进入到Action的OnActionExecuted 再进入Class的OnActionExecuted再进入program的OnActionExecuted



## 授权过滤器（Authorization Filter）

- 是过滤器管道中运行的第一个过滤器（节约资源）

  每一次进行controller的访问，都相当于是瞬态的创建，需要消耗资源，而如果你的鉴权都没过，就不允许你访问

- 控制对操作方法的访问

- 具有在它之前的执行的方法，但没有之后执行的方法

  也就是说它没有后置授权的策略

  

自定义授权过滤器需要自定义授权框架。建议配置授权策略或编写自定义授权策略，而不是编写自定义过滤器。

内置授权过滤器：

- 调用授权系统
- 不授权请求

不会在授权过滤器中引发异常：

- 不会处理异常
- 异常过滤器不会处理异常

在授权过滤器出现异常时请小心应对



在AuthorizationFilterContext 能够拿到几乎想要的所有东西

## 资源过滤器（Resource Filter）

- 实现IResourceFilter 或 IAsyncResourceFilter 接口
- 执行会覆盖过滤管道的绝大部分
- 只有授权过滤器在资源过滤器之前运行

### 管道短路器

- 可以防止模型绑定访问表单数据
- 用于上传大型文件，以防止表单数据被读入内存

```c#
public class CtmResourceFilterAttribute : Attribute, IResourceFilter
{
    public void OnResourceExecuted(ResourceExecutedContext context)
    {
        value = ((ObjectResult)context.Result).Value.ToString();
    }

    static string? value = null;
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        if(value != null)
        {
            context.Result = new ContentResult{
                Content = value
            };
        }
    }
}
```



见course7-4 理解有一些问题

> 基本思路为：
>
> ​	只要context中的的Result有值了，那么它就会跳过后面的所有步骤直接拐回来执行OnResultExecuted方法，然后出去
>
> 这一点可以用来当作缓存使用
>
> 即第一次进来没有值，但进来一次后这个部分的值就可以存到ResourceFilter中了，如果此时需要的那么此时就不会再进入后端了
>
> 再次进来的时候会发现context.Result已经有值了，那么会直接跨过后面的管道部分

**Resource过滤器更适合短路，它的执行顺序是在创建Controller之前**

行为过滤器 (Action Filter) 用作模型验证，因为他在之前进行了modelBinding



## 异常处理过滤器（ExeptionFilter）

- 实现IExeptionFilter 或 IAsyncExceptionFilter
- 可用于实现常见的错误处理策略

下面的异常过滤器示例显示在开发应用时发生的异常的相关详细信息：

```c#
public class CtmExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        context.Result = new ContentResult{
            Content = context.Exception.Message 
                //这里只返回抛出异常的异常信息
        };
    }
}
```

这里context.Result既能作为短路器，又能传出返回值。

实际上：这里的Result本身就是用作来返回值，而它只要有值了就会返回出来，所以可以作为一个短路器

异常过滤器：

- 没有之前和之后的事件
- 实现OnException或OnExceptionAsync
- 处理Razor页面或控制器创建、Razor、操作过滤器或操作方法中发生的未经处理的异常
- 请不要捕获资源过滤器、结果过滤器或MVC结果执行中发生的异常

异常过滤器：

- 非常适合捕获发生在操作中的异常
- 并不像错误处理中间件那么灵活



## 结果过滤器 （ResultFilter）

​	当授权过滤器或资源过滤器使请求短路以阻止动作的执行时，IResultFilter和IAsyncResultFilter实例不会执行。IResultFilter。当异常过滤器通过产生操作结果来处理异常时，IResultFilter和IAsyncResultFilter实现也不会被执行。

​	要创建一个围绕所有操作结果执行的结果过滤器，请实现IAlwaysRunResultFilter或IAsyncAlwaysRunResultFilter接口。

```c#
public class CtmResultFilterAttribute : Attribute, IResultFilter
    {
        public void OnResultExecuted(ResultExecutedContext context)
        {
            //结果执行后执行
            throw new NotImplementedException();
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            //结果执行前执行
            throw new NotImplementedException();
        }
    }
```

仅当操作或操作过滤器生成操作结果时，才会执行结果过滤器。不会再以下情况下执行结果过滤器：

- 授权过滤器或资源通过滤器使管道短路
- 异常过滤器通过生成操作来处理异常

如果在IResultFilter.OnResultExecuting中引发异常，则会导致：

- 阻止操作结果和后续过滤器的执行
- 结果被视为失败而不是成功

## Filter依赖注入

对于在Attribute中使用Filter

我们只能够通过

```c#
[TypeFilter(typeof(CtmActionFilterOnActionAttribute))]
```

通过TypeFilter包裹的内容，可以通过依赖注入直接拿到



## 不同生命周期嵌套问题

1.在生命周期嵌套时，可以使用

​	singleton套transient

​	也可以tansient套singleton

==但注意scoped不能套在singleton里面==这样会报错

实际上，在开发中我们使用scoped的时候也是比较少的，一般情况下，每一次请求去调用controller都是使用transient，不需要记住什么状态，只需要调用完就释放即可。

一般singleton使用的时候，比如要记住网站的访问量等，可以使用singleton



## DDD 领域思想初探

DDD是从需求分析的角度去思考，从一个部分引申到全部

软件开发并没有一个完全的架构标准

见文档：

[实现领域驱动设计DDD](https://docs.abp.io/zh-Hans/abp/latest/Domain-Driven-Design-Implementation-Guide#%E5%AE%9E%E7%8E%B0%E9%A2%86%E5%9F%9F%E9%A9%B1%E5%8A%A8%E8%AE%BE%E8%AE%A1)

## 资源过滤器的使用场景

1.缓存，命中缓存时绕过其他管道

### 缓存的使用

1.注入缓存

​	缓存可使用两种

​	一般缓存：

​	`builder.Services.AddSingleton<IMemoryCache, MemoryCache>()`

​	异步缓存：

​	`builder.Services.AddSingleton<IDistributedCache, MemoryDistributedCache>();`

```c#
//这里在使用缓存的时候，应该使用Singleton的方式注入，因为这里的状态要一直保存下来，而不是scoped，是scoped的话每一次请求都是一个新的缓存
builder.Services.AddSingleton<IMemoryCache, MemoryCache>();//一般的缓存
```

2.将缓存注入到资源过滤器

```c#
private readonly IMemoryCache _cache;

public CtmResourceFilterAttribute(IMemoryCache cache)
{
    this._cache = cache;
}
```

3.设置管道短路

```c#
public void OnResourceExecuted(ResourceExecutedContext context)
        {
            //这里拿到路由
            var path = context.HttpContext.Request.Path.ToString();
            if(context != null)
            {
                //这里拿到该路由的返回值
                var pathValue = JsonConvert.SerializeObject((context.Result as ObjectResult).Value);
                //放到缓存中
                _cache.Set(path, pathValue, TimeSpan.FromHours(1));//这里第三个参数是设置缓存过期时间
            }
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            var path = context.HttpContext.Request.Path;
            //当缓存里有值的时候
            var hasValue = _cache.TryGetValue(path, out object pathValue);
            if(hasValue)
            {
                //就将值赋值Result里面，以达到管道短路的功能，跳过后面的过滤器
                context.Result = new ContentResult{
                    Content = pathValue.ToString()
                };
            }
        }
```

## ActionFilter 的使用场景

1.ActionFilter的使用场景一般未日志记录

操作方法：

1.拿到logger

```c#
var logger = context.HttpContext.RequestServices.GetService<ILogger<CtmActionFilterAttribute>>();
```

2.从Context中拿到需要的相关信息

```c#
var path = context.HttpContext.Request.Path;
var controller = context.RouteData.Values["controller"];
var action = context.RouteData.Values["action"];
var arguments = string.Join(",", context.ActionArguments);//这里arguments也是键值对
logger.LogInformation($"访问的路由：{path}, 控制器是：{controller}, 行为方法是：{action}, 传入参数是：{arguments}");
logger.LogWarning("logInformation");
```



## ExceptionFilter的作用域

经检验，实际上在ExceptionFilter中不能捕获到AuthorizationFilter和ResourceFilter中的异常

它能够捕获actonFilter中的异常

上面管道的那张图实际上是有问题的



## 管道模型初识

![中间件01](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\中间件01.PNG)

每一个next()实际上都是下一个中间件方法的一个委托，相当于在嵌套调用

**中间件顺序**

![中间件顺序](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\中间件顺序.PNG)

这里的ExceptionHandler在最开始，目的是可以捕获到中间全部过程的异常

逐层执行下来，之后能够从后面逐层往上执行

![末端结点](E:\笔记\.NET 6 Tutorials\ACE DotNet Capture\末端结点.PNG)

这里的Endpoint之后，才会执行管道过滤器，在这里管道过滤器

在.NET5 的项目中，是EndPoint



**包还原错误**

严重性	代码	说明	项目	文件	行	禁止显示状态
错误		Unexpected character encountered while parsing value: w. Path '', line 0, position 0.

该错误出现的原因主要是nuget包根节点损坏，一般需要重新下载该nuget包



可更换NuGet.target文件



## 什么是中间件

中间件是组装到应用程序管道中以处理请求和响应的软件。 每个组件：

- 选择是否将请求传递给管道中的下一个组件。
- 可以在调用管道中的下一个组件之前和之后执行工作。

请求委托（Request delegates）用于构建请求管道，处理每个HTTP请求。



## 异常处理方法中间件

​	**异常处理中间件的位置**

​		异常处理中间件应该在项目最开始的地方以捕获所有地方的异常



**一个补充，关键是要了解框架的基本结构，业务逻辑是根据具体的业务和需求自己去写，但重点是要符合框架的思维**

自定义中间件,在program中

**方法一**

```c#
app.UseExceptionHandler(configure => {
    //这里是一个applicationBuilder
    configure.Run(async context =>{
        var exHandler = context.Features.Get<IExceptionHandlerPathFeature>();//拿到具有请求原始路径的exceptionHandler
        //拿到异常中的错误,这里捕获了一个异常
        var ex = exHandler.Error;
        if(ex != null)
        {
            context.Response.ContentType = "text/plain;charset=utf-8";
            //把错误的字符串返回出来
            await context.Response.WriteAsync(ex.ToString());
        }
    });
});
```

**方法二**

```c#
app.UseExceptionHandler(new ExceptionHandlerOptions{
    //这里实际和上面一样，是一个delegateexception
    ExceptionHandler = async context =>{
        var exHandler = context.Features.Get<IExceptionHandlerFeature>();
        var ex = exHandler.Error;
        if(ex != null){
            context.Response.ContentType = "text/plain;charset=utf-8";
            //把错误的字符串返回出来
            await context.Response.WriteAsync(ex.ToString());
        }
    }
});
```

**方法三**

```c#
app.UseExceptionHandler(new ExceptionHandlerOptions{
    ExceptionHandlingPath = new PathString("/error")
});
```

**注意**

当方法中的异常一旦被捕获（try catch）时，exceptionHandler无法被检查出来

## 手写异常处理中间件

1.新建中间件类

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using CustomMiddleWareDemo.MiddleWares;
using Newtonsoft.Json;

namespace CustomMiddleWareDemo.MiddleWares
{
    public class ExceptionHandlerMiddleWares : IMiddleWare
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlerMiddleWares> _logger;

        public ExceptionHandlerMiddleWares(RequestDelegate next, ILogger<ExceptionHandlerMiddleWares> logger)
        {
            this._next = next;
            this._logger = logger;
        }

        //到此为止该类都还是一个通配的中间件
        //如果是要自定义中间件则需要进行判断
        public async Task InvokeAsync(HttpContext context)//注意这里的上下文是一直传下来的
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await ExceptionHandle(context, exception);
            }
        }

        private async Task ExceptionHandle(HttpContext context, Exception exception)
        {
            //所有的异常处理在这里执行
            context.Response.ContentType = "application/json"; //定义响应内容返回json类型
            var response = context.Response;

            var path = context.Request.Path;

            var errorResponse = new ErrorResponse
            {
                Success = false,
            };

            switch (exception)
            {
                //这里针对不同的异常可以进行不同处理，但默认是直接拿异常里的提示信息
                case ApplicationException ex:
                    {
                        break;
                    }
                case KeyNotFoundException ex:
                    {
                        break;
                    }
                default:
                    {
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        errorResponse.Message = exception.Message;
                        break;
                    }
            }
            _logger.LogError(exception.Message);//往我们的elasticSearch中记一份
            var res = $"出错位置：{path}  " + JsonConvert.SerializeObject(errorResponse);
            await context.Response.WriteAsync(res);
        }
    }

    public class ErrorResponse{
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
```

2.定义接口 实现Task InvokeAsync(HttpContext context);方法



3.在program中配置中间件

```c#
app.UseMiddleware<ExceptionHandlerMiddleWares>();
```

## Session 原理与Cookie的写入验证

见项目中的markdown文件

## 启动页面配置

1.进入vscode自动生成的模板文件launch.json

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            // Use IntelliSense to find out which attributes exist for C# debugging
            // Use hover for the description of the existing attributes
            // For further information visit https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger-launchjson.md
            "name": ".NET Core Launch (web)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            // If you have changed target frameworks, make sure to update the program path.
            "program": "${workspaceFolder}/AuthDemo.Api/bin/Debug/net6.0/AuthDemo.Api.dll",
            "args": [],
            "cwd": "${workspaceFolder}/AuthDemo.Api",
            "stopAtEntry": false,
            // Enable launching a web browser when ASP.NET Core starts. For more information: https://aka.ms/VSCode-CS-LaunchJson-WebBrowser
            
            //这里注释掉，不会蹦出注释页面
            // "serverReadyAction": {
            //     "action": "openExternally",
            //     "pattern": "\\bNow listening on:\\s+(https?://\\S+)"
            // },
            "env": {
                "ASPNETCORE_ENVIRONMENT": "Development"
            },
            "sourceFileMap": {
                "/Views": "${workspaceFolder}/Views"
            },

            //这里添加进来直接跳转进入到swagger
            "launchBrowser": {
                "enabled": true,
                "windows": {
                    "command": "cmd.exe",
                    "args": "/C start ${auto-detect-url}/swagger"
                }
            }
            
        },
        {
            "name": ".NET Core Attach",
            "type": "coreclr",
            "request": "attach"
        }
    ]
}
```

## 鉴权授权

见AuthDemo.md



## Linq与通常方法的对比和使用

linq 是.net3.5后引入的东西，可以理解为直接嵌入c#语言的一种强类型查询语言

可以构建与sql查询类似的表达式，linq查询可用于多种数据存储，甚至xml也可以用linq查询

## IEnumerable<T> 与 IQeuryable<T> 的区别

```c#
IEnumerable<Person> people = GetEnumerablePeople();
Person person = people.Where(x => x.Age > 18).FirstOrDefault();

IQueryable<Person> people = GetQueryablePeople();
Person person = people.Where(x => x.Age > 18).FirstOrDefault();
```

​	在第一部分中，`x => x.Age > 18` 是一个匿名方法（Func<Person, bool>），可以像一个其他方法一样执行，`Enumerable.Where` 将会为每一个Person执行一次该方法，生成方法返回true的值

​	在第二部分中，`x => x.Age > 18` 是一个表达式目录树（Expression<Func<Person, bool>>），可以被认为是is the 'Age' property > 18

这使得LINQ-to-SQL之类的东西得以存在，因为它们可以解析表达式树并将其转换为等价的SQL。而且因为提供者在IQueryable被枚举之前不需要执行(毕竟它实现了IEnumerable&lt;T&gt;)，所以它可以组合多个查询操作符(在上面的示例Where和FirstOrDefault中)，以便在如何对底层数据源执行整个查询时做出更明智的选择(比如在SQL中使用SELECT TOP 1)。



1.tolist()立即执行，把结果存到内存里

2.IEnumerable是把动作存进去，需要的时候做这个动作而已

3.IQueryable是一直拼接sql语句，然后tolist()发送给到数据库中,从数据库里面拿













