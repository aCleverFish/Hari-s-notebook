# EFCore的使用

## 1.EFcore DBFirst

	### 	1.项目建立完成后通过NuGet安装所需依赖

```
        （1）Microsoft.EntityFrameworkCore 
        （2）Microsoft.EntityFrameworkCore.Design 
        （3）Microsoft.EntityFrameworkCore.SqlServer 
        （4）Microsoft.EntityFrameworkCore.SqlServer.Design 
        （5）Microsoft.EntityFrameworkCore.Tools
```

		### 	2.建立好项目数据库

​		打开程序包管理控制台

​		工具—》Nuget包管理器—》程序包管理器控制台

###	3.根据现有数据库生成实体和上下文，同样在程序包管理控制台运行命令

```
Scaffold-DbContext -Connection "Server=.;Database=SWJTUInformationize;uid=sa;pwd=Yhy990912" Microsoft.EntityFrameworkCore.SqlServer -OutputDir "MyModels"
```

​	   Server ：服务器名称

​	   DataBase：数据库名

​	   uid：用户名

​	   pwd：密码

​	   -OutputDir "MyModels"：需要输出的文件夹名称

![2021-11-03_01](E:\笔记\EFCore学习笔记截图\2021-11-03_01.png)

​	命令执行完后生成如图对象类型，可执行

### 		4.在appsettings.json中配置连接字符串

```json
"ConnectionStrings": {
    "SqlServer": "Server=DQ60-11;database=SWJTUInformationize;uid=sa;pwd=Yhy990912;"
  }
```

			### 		5.在ConfigureService()方法中注入，代码如下

```
public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            //在ConfigService()中配置注入代码
            services.AddDbContext<DbContext>(options =>
            {
                options.UseSqlServer(GlobalString.SqlServer);//读取配置文件中的链接字符串
            });
            services.AddMvc();
        }
```

