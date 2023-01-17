# Transact -SQL 程序设计

## 一.变量

​	1.全局变量

- 全局变量是sqlSever系统内部使用的变量，其作用范围并不局限于某一程序，而是==任何程序均可随时调用==。
- 全局变量通常存储一些SQL-Server 2012的==配置设定值和效能统计数据==，用户可在程序中用全局变量来测试系统的设定值或Transact-SQL命令执行后的状态
- 全局变量由==系统定义和维护==
- 全局变量是==只读的==，不能对其进行修改和管理
- 使用全局变量时必须==以“@@”开头==

​	2.局部变量

- 局部变量是用户==可自定义==的变量，==不区分大小写==

- 局部变量名称==不能与全局变量名称相同==

- ==作用范围==仅在其声明的==批处理、存储过程或触发器中==

  ​	（1）局部变量声明方式

  ```sql
  DECLARE @变量名 变量类型[, @变量名 变量类型，...] --变量类型是sqlSever可以支持的所有变量类型
  ```

  ​	（2）局部变量的赋值

  赋值应该使用SELECT 或SET 命令来给局部变量赋值

  ```sql
  SELECT @变量名=变量值
  SET @变量名=变量值
  ```
  

​    3.注释符

```sql
-- 该部分是单行注释
/*
	多行注释
*/
```

## 二.运算符

​	算数运算符对两个表达式执行数学运算，参与运算的表达式必须是数值数据类型或能够进行算数运算的其他数据类型

​	+和-运算符也可用于对datetime、smalldatetime、money和smallmoney类型的值执行算数运算

​	5.赋值运算符

​	等号（=）是唯一的Transanct-SQL运算符

​	6.字符串连接运算符

​	加号（+）是字符串连接运算符

​																												 比较运算符

| 运算符 | 含义     |
| ------ | -------- |
| =      | 等于     |
| >      | 大于     |
| <      | 小于     |
| >=     | 大于等于 |
| <=     | 小于等于 |
| <>     | 不等于   |
| !=     | 不等于   |
| !<     | 不小于   |
| !>     | 不大于   |

​																												  逻辑运算符

| 运算符  | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| ALL     | 如果一组比较中都为True，运算结果就为True                     |
| AND     | 如果两个表达式都为True，运算结果就为True                     |
| ANY     | 如果一组的比较中任何一个为True，运算结果就为True             |
| BETWEEN | 如果操作数在某个范围之内，运算结果就为True                   |
| EXISTS  | 如果子查询包含一些行，运算结果就为True                       |
| IN      | 如果操作数等于表达式列表中的一个，运算结果就为True           |
| LIKE    | 如果操作数与一种模式相匹配，运算结果就为True                 |
| NOT     | 对逻辑值取反，即如果操作数的值为True，运算结果为False，否则为True |
| OR      | 如果两个布尔表达式中的一个为True，运算结果就为True           |
| SOME    | 如果一系列操作数中有些值为True，运算结果为True               |

​																												    按位运算符

| 运算符 | 含义     | 运算规则                                                     |
| ------ | -------- | ------------------------------------------------------------ |
| &      | 按位与   | 两个数对应的二进制位上都为1时，该位上的运算结果为1，否则为0  |
| \|     | 按位或   | 两个数对应的二进制位上有一个为1时，该位上的运算结果为1，否则为0 |
| ^      | 按位异或 | 两个数对应的二进制位上不同时，该位上的运算结果为1，否则为0   |

​                                                                                                                   运算符优先级

| 优先级（从高到低） | 运算符                                | 说明               |
| ------------------ | ------------------------------------- | ------------------ |
| 1                  | （）                                  | 小括号             |
| 2                  | +、-、~                               | 正、负、按位取反   |
| 3                  | *、/、%                               | 乘、除、求余数     |
| 4                  | +、-、+                               | 加、减、字符串连接 |
| 5                  | =、>、<、>=、<=、<>、!=、!>、!<       | 各种比较运算符     |
| 6                  | ^、&、\|                              | 位运算符           |
| 7                  | NOT                                   | 逻辑非             |
| 8                  | AND                                   | 逻辑与             |
| 9                  | ALL、ANY、BETWEEN、IN、LIKE、OR、SOME | 逻辑运算符         |
| 10                 | =                                     | 赋值运算符         |

##三.批处理

批处理是包含一个或多个T-SQL语句的组，批处理所有语句被整合成一个执行计划。一个批处理内的所有语句要么被放在一起通过解析，要么没有一句能够执行。

批处理是使用GO语句，将多条SQL语句进行分隔，其中每两个GO之间的SQL语句就是一个批处理单元

##四.流程控制语句

T-SQL使用流程控制语句与常见的程序设计语言类似

1.BEGIN ... END

​	BEGIN

​	<命令行或程序行>

​	END

2.IF...ELSE

​	IF <条件表达式>

​		<命令行或程序行>

​	[ELSE

​		<命令行或程序块>]

3.IF[NOT] EXIST 语句

​	IF[NOT] EXIST (SELECT 子查询)

​			<命令行或程序块>

​	[ELSE 

​			<命令行或程序块>]

3.CASE

​	格式1：

​	CASE <表达式>

​			  WHEN <表达式> THEN <表达式>

​			  ...

​			  WHEN <表达式> THEN <表达式>

​			  [ELSE <表达式>]

​	 END

将CASE后面表达式的值和WHEN后面表达式的值进行比较，如果二者相等，则返回THEN后面的表达式的值，然后跳出CASE语句否则返回ELSE子句中的表达式的值

​	格式2：

​	CASE

​			WHEN <表达式> THEN <表达式>

​			...

​			WHEN <表达式> THEN <表达式>

​			[ELSE   <表达式>]

​	 END

4.WAITFOR 用来暂时停止程序执行，知道所设定的等待时间已过或所设定的时间已到才继续往下执行

5.PRINT 打印

## 五.字符串函数

1. ASCII 函数

​	返回字符表达式最左端的ASCII码值

​	ASCII(character_expression)

2. CHAR函数

​	将ASCII码转换为对应的字符

​	CHAR(integer_expression)

3. LOWER函数

​    将字符串全部转换为小写

​	LOWER(character_expression)

   4.UPPER函数

​	UPPER(character_expression)

   5.STR函数

​	用于把数值型数据转换为字符型数据

   6.去空格函数

​	LTRIM(character_expression) 去掉函数头部的空格

​	RTRIM(character_expression)去掉函数尾部的空格

   



​	数据类型转换函数

​	1.CAST函数

​		CAST(<expression> AS <data_type>  [length])

​	2.CONVERT函数

​		CONVERT(<data_type>[(length)], <expression> [, style])

​		其中data_type为SQLServer 系统定义的数据类型，表示转换后的目标数据类型，参数length用于指定数据的长度，缺省值是30

​		==GETDATE()==是获取系统当前时间

```sql
select CONVERT(CHAR,GETDATE(),1)的结果为字符串“02/22/2017”（年份为两位）
select CONVERT(CHAR,GETDATE(),101)的结果为字符串“02/22/2017”（年份为四位）
```

​	3.日期函数

​		(1) DAY函数

​		DAY(<date_expression>) 返回date_expression中的日期值

​		(2)MONTH函数

​		MONTH(<date_expression>)返回date_expression中的月份值

​		(3)YEAR函数

​		YEAR(<date_expression>)返回date_expression中的年份值

​		(4)DATEADD

​		DATEADD(<depart>, <number>, <date>)

​		函数返回指定日期date加上指定的额外日期间隔number产生的新日期。参数"datepart"在日期中经常被使用它用来指定构成日期类型数据的各组件，如年、季、月、日、星期等。

​		假设系统当前日期是2017年2月22日，则

​		SELECT DATEADD（MONTH，1，CONVERT(DATE,GETDATE(),101)）或 SELECT DATEADD(MM,1,CONVERT(DATE,GETDATE(),101))

​		的结果为日期“2017-03-22”即输出当前日期加上一个月以后的日期

​		SELECT DATEADD（YEAR，1，CONVERT(DATE,GETDATE(),101)）或 SELECT DATEADD(YYYY,1,CONVERT(DATE,GETDATE(),101))

​		的结果为日期“2018-03-22”即输出当前日期加上一年以后的日期

​		

​																								日期函数中depart参数的取值及含义

| 参数depart取值 | 参数depart取值缩写 | 含义           |
| -------------- | ------------------ | -------------- |
| YEAR           | YY或YYYY           | 年             |
| QUARTER        | QQ或Q              | 季度           |
| MONTH          | MM或M              | 月             |
| DAYOFYEAR      | DY或Y              | 一年内的天     |
| DAY            | DD或D              | 天             |
| WEEK           | WK或WW             | 星期           |
| WEEKDAY        | DW                 | 一个星期内的天 |
| HOUR           | HH                 | 小时           |
| MINUTE         | MI或N              | 分钟           |
| SECOND         | SS或S              | 秒             |
| MILLISECOND    | MS                 | 毫秒           |

4.DATEDIFF函数	

​	DATEDIFF(<depart>,<date1>,<date2>)函数返回两个在指定日期在depart方面的不同之处，即date2超过date1的差距值，其结果值是一个带有正负号的整数值

```sql
select datediff(dd或d或day或,'2017-01-01','2017-02-01')  --输出31
select datediff(yy或y或year,'2017-01-01','2017-02-01')  --输出0
select datediff(ww或w或week,'2017-01-01','2017-02-01')  --输出4
```

5.DATEPART函数

​	DATEPART(<depart>,<date>)

​	DATEPART以整数值的形式返回日期的指定部分，此部分由depart决定

​	DATEPART(dd,date)等同于DAY(date)

​	DATEPART(mm,date)等同于MONTH(date)

​	DATEPART(yy,date)等同于YEAR(date)

```sql
SELECT DATEPART(DAY,'2017-02-22') -- 输出日期‘2017-02-22’中的天数
```

6.GETDATE()

​	函数以DATETIME的缺省格式返回系统当前的日期和时间，常作为其他函数或命令的参数使用

​	

## 六.游标

​	游标可以理解成一个定义在特定数据集上的指针，我们可以控制这个指针遍历数据集，或者仅仅是指特定的行，所以游标是定义在以select开始的数据集上的

​	假设：我们写一条select语句，会一下把所有查询结果都给我们显示出来，这时候我想对每一条查询的结果数据进行一条条获取并筛选，这时候相当于==对查询的结果集进行筛选==，那么这个过程就是游标

​	

​	**如何使用游标**

​	1.申明/定义游标

​	declare 声明；declare 游标名 cursor for select_statement

​	2.打开一个游标

​	open 打开；open 游标名

​	3.取值

​	fetch 取值；fetch 游标名 into var1，var2[,...]

​	4.关闭一个游标

​	close 关闭;close 游标名

@@fetch_status是MSSQL的一个全局变量，其值有以下三种，分别表示不同的含义

0 FETCH 语句成功

1 FETCH 语句失败或此行不在结果集中

2 FETCH 被提取的行不存在

@@fetch_status 值的改变是通过fetch next from实现的

“FETCH NEXT FROM Cursor”

## 函数补充

​	1.ISNULL(value1,value2)

- ​		value1和value2的数据类型必须一致
- ​		如果value1的值不为null，结果返回value1
- ​		如果value1为null，结果返回value2的值，value2是你设定的值

