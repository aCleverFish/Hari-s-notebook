# c#知识点

## 1.理解C#中$符号的用法

C#中$符号的作用是C#6.0中的一个特性，即字符串拼接优化

语法格式：$"string{参数}"

解释：以$符号开头开始字符串，其中以{}来进行传参，可以多个参数累加

例：var result = $"Hello {Name}"

## 2.using的三种使用方法

###1.using指令 

​	using + 命名空间名字，这样可以在程序中直接用命令空间中的类型，而不必指定类型的详细命名空间，类似于Java的import，这个功能也是最常用的，几乎每个cs的程序都会用到。 
例如：using System; 一般都会出现在*.cs中。

###2.using别名

​	using + 别名 = 包括详细命名空间信息的具体的类型。 
这种做法有个好处就是当同一个cs引用了两个不同的命名空间，但两个命名空间都包括了一个相同名字的类型的时候。当需要用到这个类型的时候，就每个地方都要用详细命名空间的办法来区分这些相同名字的类型。而用别名的方法会更简洁，用到哪个类就给哪个类做别名声明就可以了。注意：并不是说两个名字重复，给其中一个用了别名，另外一个就不需要用别名了，如果两个都要使用，则两个都需要用using来定义别名的。 

###3.using语句

​	定义一个范围，在范围结束时处理对象。 
场景： 
当在某个代码段中使用了类的实例，而希望无论因为什么原因，只要离开了这个代码段就自动调用这个类实例的Dispose。 
要达到这样的目的，用try...catch来捕捉异常也是可以的，但用using也很方便。

## ConmmandBehavior.CloseConnection

解决了流读取数据模式下，数据库连接不能有效关闭的情况。当某个XXXDataReader对象在生成时使用了CommandBehavior.CloseConnection，那数据库连接将在XXXDataReader对象关闭时自动关闭。

## 静态类的作用

静态类的作用主要是共享，静态类内部成员必须是静态的

静态一般在程序加载的时候被构造

静态类使用最多的地方就是程序配置部分，可以在多个窗体中调用，在程序启动时初始化

静态类可以有构造函数，但是只能被初始化一次

静态类在程序结束后自动销毁，在销毁前一直驻留在内存中

## 3.@的3种作用

**1.忽略转义字符**
例如

```c#
string fileName = "D:\\文本文件\\text.txt";
```

使用@后

```c#
string fileName = @"D:\文本文件\text.txt";
```

**2.让字符串跨行**
例如

```c#
string strSQL = "SELECT * FROM HumanResources.Employee AS e"
   + " INNER JOIN Person.Contact AS c"
   + " ON e.ContactID = c.ContactID"
   + " ORDER BY c.LastName";
```

使用@后

```c#
string strSQL = @"SELECT * FROM HumanResources.Employee AS e
    INNER JOIN Person.Contact AS c
    ON e.ContactID = c.ContactID
    ORDER BY c.LastName";
```

**3.在标识符中的用法**

C#是不允许关键字作为标识符(类名、变量名、方法名、表空间名等)使用的，但如果加上@之后就可以了
例如

```c#
public static void @static(int @int)
 {
            if (@int > 0)
            {
                System.Console.WriteLine("Positive Integer");
            }
            else if (@int == 0)
            {
                System.Console.WriteLine("Zero");
            }
            else
            {
                System.Console.WriteLine("Negative Integer");
            }
}
```













