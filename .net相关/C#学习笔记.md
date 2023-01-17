# 1. 核心C#

本章节为C#的基础知识

## 1.1 C#中的hello world

```c#
using System;     //指定名称空间，与import语句类似,包含常用的.NET类型

namespace Lesan   //namespace关键字声明了应与类相关的名称空间
{
    public class MyFirstClass    //声明一个类，位于Lesan名称空间内
    {
        static void Main()     //C#可执行文件的入口点
        {
            Console.WriteLine("hello world"); //若没有using，需写成System.Console.WriteLine
            Console.ReadLine();    //等待用户按回车健，之后退出程序
            return;     //此方法要么没有返回值，要么返回一个整数
        }
    }
}
```



对源文件运行C#命令行编译器方式：

1. csc 名称.cs
2. 名称.exe

## 1.2 变量

声明变量语法：`datatype identifier;`

例如：`int i;`

> 声明变量后，需要通过赋值运算符(=)赋值**初始化**后才能在表达式中使用这个变量

或者可以使用**声明加初始化**，可同时声明和初始化多个变量：`int i=10,y=20;`

> C#将未初始化当作错误来看
>
> C#的两个方法确保变量在使用前进行了初始化：
>
> 1. 变量是类或结构中的字段，没有显式初始化的话，会有默认值
> 2. 方法的局部变量必须在代码中显式初始化

### 类型推断

类型推断（type inference）使用var关键字，编译器可通过变量的初始化值推断变量的类型。

```c#
int someNumber=0;
var someNumber=0;
//编译后，上面两个语句是等价的
```

> 类型判断需要遵循一些规则：
>
> 1. 变量必须初始化
> 2. 初始化器不能为空
> 3. 初始化器必须放在表达式中
> 4. 不能把初始化器设置为一个对象

### 变量的作用域

规则：

只要类在某个作用域，其字段也在该作用域

1. 局部变量存在于表示声明该变量的块语句或方法结束的右花括号前
2. 在循环中的局部变量存在于该循环体内

### 常量

关键字const定义一个常量：

`const int a=100;`

> 常量的特点：
>
> 1. 必须初始化，不能更改
> 2. 常量的值必须能在编译时计算
> 3. 常量总是静态的，static
> 4. 常量使程序更易于修改
> 5. 常量易于避免程序出现错误

## 1.3  预定义数据类型

### 值类型与引用类型

值类型：直接存储其值

引用类型：存储对值的引用，使用new关键字

### 预定义的值类型

1. **整型**：sbyte（8位有符号）、short（16位有符号）、int（32位有符号）、long（64位有符号）、byte（8位无符号）、ushort（16位无符号）、uint（32位无符号）、ulong（64位无符号）

2. **浮点类型**：float（32位单精度）、double（64位双精度）
3. **decimal**：128位高精度十进制
4. **bool**：true or false
5. **字符**：char（16位的Unicode字符）

### 预定义的引用类型

**object**：最终的父类型，可以引用绑定任何子类型的对象；有许多一般用途的基本方法

**string**：字符串类型，在字符串字面量前加@可以表示所以字符串看作原来的含义

## 1.4 流控制

### 条件控制

**if语句**

**switch语句**



### 循环

**for循环**

**while循环**

**do...while循环**

**foreach循环**：

可以迭代集合中的每一项，不必考虑集合的概念

foreach(var temp in arrayOfInts)   foreach循环不能改变集合中各项的值



### 跳转语句

**goto语句**：

直接跳转到程序标签指定的另一行（标签是一个标识符，后面跟一个冒号）

**break语句**

**continue语句**

**return语句**



### 枚举

枚举是用户定义的整数类型

```c#
public enum TimeOfDay
{
    Morning = 0,
    Afternoon = 1,
    Evening = 2
}
```



## 1.6 名称空间

**namespace**

```c#
namespace Lesan.ProCsharp.Basics
{
	class NamespaceExample
	{
	
	}
}
```



**using**

```c#
using System;
using Introduction = Wrox.ProCsharp.Basics;   //名称空间的别名
//：：别名修饰符， Introduction::NamespaceExample
```

公司应花一些时间开发一种名称空间模式,这样其开发人员才能快速定位他们需要的功能,而且公司内部使用的类名也不会与现有的类库相冲突。

## Main()方法

`public static int Main(string[] args)`



## 1.9 控制台I/O

```c#
Console.Write();
Console.WriteLine();
Console.ReadLine();

conso1e.WriteLine("{0} plus {1} equals {2}", i , j , i + j);   //格式化输出结果
```



## 1.10 注释

可以通过XML文档进行注释

```c#
///<summary>
///
///
///
///</summary>
```



## 1.11 预处理器指令

这些命令不会转化成可执行代码，但会影响编译过程的各个方面



## 1.12 编程规则

**命名规则**

必须以字母和下划线开头，可以包含数字，不能用关键字



# 2. 对象和类型

### 2.1 类和结构

> 结构与类的区别是它们在内存中的存储方式、访问方式（类是存储在堆上的引用类型，而结构是存储在栈上的值类型）和它们的一些特征（如结构不支持继承）

struct为结构关键字，class为类关键字

对于类和结构，都是用**关键字new**来声明实例

### 2.2 类

数据成员与函数成员（不仅包含方法，也包含非数据成员，索引器、运算符、构造函数、析构函数）

**ref参数**：迫使值参数通过引用传送给方法，方法定义时要带ref，调用方法时也需要带ref

**out参数**：使传递给方法的变量可以不初始化

**可选参数**：必须为可选参数提供默认值，可选参数必须是方法定义的最后一个参数

**方法的重载**：声明同名但是参数个数或类型不同的方法

**属性**：

```c#
//属性：它是一个方法或者一对方法，在客户端代码来看，它们是一个字段,如mainForm.Height = 400;。
public string SomeProperty
{
    get
    {
        return "This is the Property value."
    }
    set
    {
        //do whatever needs to be done to set the property
    }
}
//自动实现的属性,set和get访问器中没有任何逻辑
public int Age {get; set;}
```

**静态构造函数**：

```c#
class MyClass
{
    static MyClass(){
        
    }
}//这种构造函数只会执行一次，而普通构造函数是实例构造函数，只要创建类的对象，就会执行
/*通常在第一次调用类的任何成员之前执行静态构造函数*/
```

**从构造函数中调用其他构造函数**：

```c#
public Car(string description): this(description,4){
    
}
```

**只读字段**：

readonly关键字比const灵活的多，允许把一个字段设置为常量，但还需执行一些计算，以确定它的初始值



## 1.3 匿名类型

var关键字用于表示隐式类型化的变量。var与new关键字一起使用时，可以创建匿名类型

```c#
var captain = new {FirstName = "James", MiddleName = "T", LastName = "kirk"};
//生成一个包含属性的对象
var doctor = new {FirstName = "James", MiddleName = "T", LastName = "kirk"};
//captain与doctor类型相同，可以设置captain=doctor
var captain = new {person.FirstName, person.MiddleName, person.LastName};
//通过person对象的属性名投射到新对象名captain
```



## 2.4 结构

类的性能消耗大于结构，当我们需要一个小的数据结构时，最好使用结构

结构也包含数据、函数、属性、构造函数

结构是**值类型**，存储在栈中或内联，其生存期与简单数据类型一样

1. 结构不支持继承
2. 编译器提供一个无参数的默认构造函数，不允许替换
3. 可以指定字段如何在内存中的布局

> 可以用new也可以像普通变量一样声明
>
> 用一个结构作为参数传递或者赋值时，方式是所有内容复制，而对于类，只是复制引用，这样有性能损失，可以用ref作为参数传递

## 2.5 部分类

partial关键字允许把类、结构、接口放在多个文件中

```c#
//BigClassPart1.cs
partial class TheBigClass{
    
}
//BigClassPart2.cs
partial class TheBig Class{
    
}
//编译包含这两个源文件项目时，会创建一个TheBigClass类
//带有public private protected internal abstract sealed new 一般约束 必须在同一个类中
```

## 2.6 静态类

```c#
static class StaticUtilities{
    public static void HelperMethod(){
        
    }
}
//不能创建静态类的实例，如果类只包含静态的方法和属性，该类就是静态的
StaticUtilities.HelperMethod();
//调用方法不需要StaticUtilities类型的对象，使用类型名即可调用
```

## 2.7 Object类

System.Object()方法：

ToString() GetHashTable() Equals() Finalize() GetType() MemberwiseClone()



## 2.8 扩展方法

如果有类的源代码，继承就是给对象添加功能的好方法。

没有源代码时，可以通过扩展方法，它是类的一部分，但没有放在类的源代码中

```c#
//创建扩展方法
namespace Lesan
{
    public static class MoneyExtension    //首先创建一个静态类
    {
        public static void AddToAmount(this Money money,decimal amoutToAdd){  //再创建一个静态方法
            
        }
    }
}
//即使扩展方法是静态的，也要使用标准的实例方法语法
```



# 3. 继承

## 3.1 继承类型

**实现继承**：一个类型派生于一个基类型，它拥有该类型的所有成员字段和函数

**接口继承**：一个类型只继承了函数的签名，没有继承任何实现代码

**多重继承**：C#不支持多重实现继承，允许<u>多重接口继承</u>



## 3.2 实现继承

```c#
class MyDerivedClass: MyBaseClass, Interface1, Interface2
{
    
}
```



**虚方法**：

把一个基类函数声明为virtual，就可以在任何派生类中重写该函数，属性也有着相同规则：

```c#
class MyBaseClass{
    public virtual string VirtualMethon(){
	}
}
public virtual string ForeName{ get; set;}
```

在派生类的函数重写另一个函数时，要使用override关键字显式声明：

```c#
class MyDerivedClass: MyBaseClass{
    public override string VirtualMethod(){
        
    }
}
```

> 成员字段和静态函数没有virtual，只对类中的实例函数成员有意义



**隐藏方法**

如果签名相同的方法在基类和派生类中都进行了声明，但该方法没有分别声明为virtual和override，派生类方法就会隐藏基类方法

要隐藏一个方法应使用new关键字声明，`public new int MyGroovyMethod()`



**抽象类抽象函数**

```c#
abstract class Building{ //关键字为abstract，抽象类不能实例化，抽象函数不能直接实现，必须在非抽象派生类中重写
    public abstract decimal CalculateHeatingCost();
}//如果类包含抽象函数，则类也是抽象的，必须声明为抽象的
```



**密封类和密封方法**

```c#
sealed class FinalClass{
    
}
//当类和方法声明为sealed。对于类，这表示不能继承该类；对于方法，这表示不能重写
```



**派生类的构造函数**

总是最先调用的是基类的构造函数



## 3.3 修饰符

| public             | 所有类型或成员           | 任何代码均可访问                                 |
| ------------------ | :----------------------- | ------------------------------------------------ |
| protected          | 类型和内嵌类型的所有成员 | 只有派生类型能访问                               |
| internal           | 所有类型或成员           | 只能在包含它的程序集中访问该项                   |
| private            | 类型和内嵌类型的所有成员 | 只能在它所属的类型中访问该项                     |
| protected internal | 类型和内嵌类型的所有成员 | 只能在包含它的程序集和派生类的任何代码中访问该项 |

| new      | 函数成员       | 成员用相同的签名隐藏继承的成员                               |
| -------- | -------------- | ------------------------------------------------------------ |
| static   | 所有成员       | 成员不作用于类的具体实例                                     |
| virtual  | 仅函数成员     | 成员可以由派生类重写                                         |
| abstract | 仅函数成员     | 虚拟成员定义了成员的签名，但没有提供实现代码                 |
| override | 仅函数成员     | 成员重写了继承的虚拟或抽象成员                               |
| scaled   | 类、方法和属性 | 对于类，不能继承密封类。对于属性和方法，成员重写已继承的虚拟成员，但任何派生类中的任何成员都不能重写该成员。于override一起使用 |
| extern   | 仅静态方法     | 成员在外部用另一种语言实现                                   |



## 3.4 接口

```c#
namespace Lesan.ProCSharp
{
    public interface IBankAccount
    {
        void PayIn(decimal amount);
        bool Withdraw(decimal amount);
        decimal Balance{ get;}
    }
}
```



# 4. 泛型

泛型的一个主要优点就是性能

值类型存储在栈上，引用类型存储在堆上。从值类型转换为引用类型称为装箱，装箱的值类型可以使用拆箱操作转换为值类型，在拆箱时，需要使用类型强制转换运算符。



# 5. 数组

声明和初始化数组

`int[] myArray = new int[4];`



**锯齿数组**

```c#
int[][] jagged = new int[3][];
jagged[0] = new int[2] {1,2};
jagged[1] = new int[6] {3,4,5,6,7};
jagged[2] = new int[3] {9,10,11};
```



**数组作为参数**

```c#
static Person[] GetPersons() {
    return new Person[] {};
}
static void DisplayPersons(Person[] persons){}
```



**数组协变**

```c#
static void DisplayArray(object[] data){   //可以通过声明基类，其派生类型的元素可以赋予数组元素
    
}
```



**yield语句**

```c#
//使用foreach语句可以轻松迭代集合
//使用yield语句，以便于创建枚举器。yield return语句返回集合的一个元素，并移动到下一个元素上，yield break可以停止迭代

```



# 6. 运算符和类型强制转换

**checked和unchecked运算符**

```c#
byte b = 255;
checked    //CLR就会执行溢出检查
{
    b++;
}
Console.WriteLine(b.ToString);
```



**is运算符**

```c#
//符可以检查对象是否于特定的类型兼容
int i=10;
if(i is object){
    Console.WriteLine("i is an object");
}
```



**as运算符**

```c#
//as运算符用于执行引用类型的显式类型转换
object o1 = "Some String";
object o2 = 5;
string s1 = o1 as string;    //s1 = "Some String"
string s2 = o2 as string;    //s2 = null，as允许在一步进行安全的类型转换
```



**可空类型**

```c#
int? a = null;
int? b = a+4;   //b=null
int? c = a*5;   //c=null
//在比较可空类型时，只要有一个操作数是null，比较的结果就是false
```



**空合并运算符**

```c#
//可以在处理可空类型和引用类型时表示null可能的值
//这个运算符放在两个操作数之间,第一个操作数必须是一个可空类型或引用类型;第二个操作数必须与第一个操作数的类型相同,或者可以隐含地转换为第一个操作数的类型。
int? a = null;
int b;
b = a??10;  // b -> 10
a=3;
b = a??10;  // b -> 3
```



**装箱和拆箱**

装箱和拆箱可以把值类型转换为引用类型，并把引用类型转换回值类型。



**运算符重载**

```c#
public static Vector operator + (Vector lhs, Vector rhs)
(
    Vector result = neW Veotor(lhs);
    result.x += rhs.X;
    resu1t.y += rhs.y;
    result.z += rhs.z;
    return result;
)
```



# 7. 委托、Lambda表达式和事件

**委托**

当要把方法传送给其他方法时，需要使用委托

定义委托的语法如下：

`delegate void IntMethodInvoker(int x);`

```c#
delegate double DoubleOp(double x);
DoubleOp[] operations = {
    MathOperations.MultiplyByTwo,      //定义了的方法
    MathOperations.Square
}
```



**Lambda表达式**

```c#
Func<string,string> oneParam = s =>String.Format("change uppercase {0}", s.ToUpper());
oneParam("test");
Func<double,double,double> twoParam = (x,y) => x*y;

Func<string,string> lambda = param =>{
    param+= mid;
    param+= "hello";
    return param;
}
```



# 8. 字符串和正则表达式

> String类型的对象在进行连接和替换字符串时，是创建一个新的字符串实例，给它分配足够的内存，以存储合并的文本。这样就会产生未使用的对象，需要等到垃圾收集器来清理它们。会产生严重的性能问题。

使用**StringBuilder类**可以解决这类问题，但是它不具备非常多的方法，其替换、追加、删除字符串的文本工作方式**非常高效**，处理多个字符串时使用，只是两个字符串，用String类更好。

初始化StringBuilder实例时，可以指定字符串实际长度，分配内存中的最大长度。



**格式化字符串**

string.format



**正则表达式**

```c#
const string myText = @"";
const string pattern = "ion";
MatchCollection myMatches = Regex.Matches(myText, pattern, RegexOptions.IgnoreCase | RegexOptions.ExplicitCapture);
foreach(Match nextMatch in myMatches){
    Console.WriteLine(nextMatch.Index);
}
```



# 9. 集合

| 列表     | `var intList = new List<int>() {1,2};` `List<int> intList = new List<int>(10);` | `Add(); Insert(); RemoveAt(); IndexOf(); Sort();  `          |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 队列     | `var docQueue = new Queue<Document>();`                      | `Count; Enqueue(); Dequeue(); Peek(); TrimExcess();`         |
| 栈       | `var alpahabet = new Stack<char>();`                         | `Count; Push(); Pop(); Peek(); Contains();`                  |
| 链表     | `var docList = new LinkedList<Document>();`                  |                                                              |
| 有序列表 | `var books = new SortedList<string,string>();`               | 键值对形式，这个类按照键给元素排序  `KeyValuePair<stirng,string>` |
| 字典     | `Dictionary<TKey,TValue>`                                    |                                                              |
| 集       | `HashSet<T>无序列表 SortedSet<T>有序列表`                    | 包含不重复元素的集合                                         |



# 10. LINQ查询

```c#
var query = from r in table
    		where r.Country == "Brazil"
    		orderby r.Wins descending
    		select r;
//查询表达式必须以from子句开头,以select或group子句结束。在这两个子句之间,可以使用where、orderby、Join、let和其他from子句。
```
















