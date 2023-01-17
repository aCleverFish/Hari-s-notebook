# Guid 与 Uuid 的区别

# GUID

## 什么是GUID(Global Unique Identifier)

​	GUID（全局唯一标识符）是一个 128 位的文本字符串，表示标识 (ID)。当需要唯一的参考号来识别计算机或网络上的信息时，组织会生成 GUID。GUID 可用于标识硬件、软件、帐户、文档和其他项目。该术语也经常用于 Microsoft 创建的软件。

​	当需要重复概率非常低的唯一标识符时，GUID 很有用。文本字符串可用于所有计算机和网络。GUID 就像序列号，因为组织使用它们来确保数据库记录不重复，并且所有数据都有一个在不同数据库中唯一的 ID。

​	*GUID*是 Microsoft 首次使用的术语，用于指代类似术语*Universally Unique Identifier*或*[UUID](https://www.techtarget.com/searchapparchitecture/definition/UUID-Universal-Unique-Identifier)*的特定变体。从那时起，这些术语被组合在一起，RFC 4122 规范将它们作为同义词使用。不同版本的 GUID 遵循 RFC 4122 规范。

##GUID 是如何工作的？

​	GUID 由等于 128 位的数字序列构成。ID 是[十六进制](https://www.techtarget.com/whatis/definition/hexadecimal)数字，这意味着它使用数字 0 到 9 和字母 A 到 F。十六进制数字以 36 个字符长的格式分组——32 个十六进制字符分组为 8-4-4-4-12并用四个连字符分隔：{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}。

​	用户不需要依赖集中的权限来管理 GUID，因为任何人都可以使用生成算法来创建 GUID。个人和组织可以使用在线提供的免费 GUID 生成器创建 GUID。在线生成器根据 RFC 4122 构建唯一的 GUID。创建 GUID 时，用户应注意时间戳、时钟序列和节点 ID——例如媒体访问控制 ( [MAC](https://www.techtarget.com/searchnetworking/definition/MAC-address) ) 地址。

## GUID是做什么用的？

GUID 旨在几乎在需要唯一标识符的任何地方使用。例如，它们可用于唯一标识 Windows 上的 COM 实体，也可用于标识以下内容：

- 用户帐户；
- 标识作为最终产品（例如汽车）一部分的零部件的组件标识符；
- 用于合并数据库记录的数据库键；
- 文档，例如 Word 文档和桌面文件；
- 硬件，例如服务器或监视器；
- 接口，例如操作系统；和
- 软件应用程序。

## GUID的类型和变体

有五种不同版本的 GUID，其中大部分遵循 RFC 4122 规范。

- **日期时间和 MAC 地址。**此版本生成具有当前时间和客户端 MAC 的 ID

- **分布式计算环境安全。**此版本的构造类似于日期时间和 MAC 地址 GUID 格式，但将时间戳的前 4 个字节替换为用户的[便携式操作系统接口](https://www.techtarget.com/whatis/definition/POSIX-Portable-Operating-System-Interface)UID。它是在 1990 年代初定义的，很少使用。此版本也未在 RFC4122 中定义。

- **消息摘要算法 (MD5) 哈希和命名空间。**[此版本使用MD5](https://www.techtarget.com/searchsecurity/definition/MD5)哈希和转换为十六进制的命名空间生成 ID 。从同一命名空间生成的 GUID 在此格式中是相同的。
- **随机生成的数字。**除了引用版本和变体位的 6 位外，此版本是使用随机位生成的。没有关于如何生成随机数字的规范，这意味着可以使用[伪随机生成器](https://www.techtarget.com/whatis/definition/pseudo-random-number-generator-PRNG)。
- **安全散列算法 1 (SHA-1) 散列和命名空间。**此版本的构造类似于 MD5 哈希和命名空间，但使用 SHA-1而非 MD5进行[哈希。](https://searchsqlserver.techtarget.com/definition/hashing)

## GUID的好处

GUID 带来的一些潜在好处包括：

- 不需要中央权威，这意味着可以在内部为不同的用途生成 GUID。
- 128 位的大小足够大，极不可能获得重复的 ID。
- 使用 GUID 合并数据库是可能的，因为两个项目共享相同 ID 的可能性极小。
- GUID 可以快速离线生成。



# UUID

## 什么是UUID(Universal Unique Identifier)

UUID (通用唯一标识符)是一个128位的值，用于唯一标识互联网上的一个对象或实体。根据所使用的特定机制，UUID要么保证不同，要么至少极有可能不同于公元3400年前生成的任何其他UUID。

可以生成uuid来引用几乎所有可以想象到的东西。例如，它们可以识别数据库、系统实例、主键、蓝牙配置文件或生命周期较短的对象。

UUID是一个类似于GUID的术语。最初，GUID指的是微软使用的UUID的一种变体，但在RFC 4122规范中，这两个术语成为了同义词。UUID由开放软件基金会(OSF)标准化，成为分布式计算环境(DCE)的一部分。UUID的不同版本遵循RFC 4122规范。

uuid是使用基于时间戳和其他因素(如网络地址)的算法生成的。免费的UUID生成工具包括uidtools和Online UUID Generator。

## UUID是如何工作的？

UUID依赖于组件的组合来确保惟一性。uuid构建在等于128位的数字序列中。XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX是32个十六进制字符组成的字符串，由4个连字符组成:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX。连字符的数目是8-4-4-12。4的最后一部分，也就是N位置，表示1位到3位的格式和编码。

例如，基于时间的uuid有不同的时间戳，用表示低、中、中时间和版本的连字符分隔段，用于标识UID。最后一部分(节点)下面的数字表示MAC地址。

![example_guid-f-uuid](E:\笔记\.NET 6 Tutorials\其他\picture\example_guid-f-uuid.png)

## UUID有三种变体

变体0。此变体保留用于向后兼容1980年代后期过时的Apollo网络计算系统。它具有与今天使用的版本1 uuid相似的结构。

变体1。变体1是今天使用的主要变体。这些变体被称为RFC 4122/DCE 1.1 UUID，或Internet工程任务组定义UUID规范的工作文档的作者的Leach-Salz UUID。以guid为例，guid为变体1 uuid。

变种2。变体2是为微软向后兼容而保留的。尽管微软使用的许多guid是变体1 uuid，但Windows平台上的早期guid使用的是变体2。变体1和变体2的区别在于N位置的比特数。变体1 uuid使用两位，而变体2 uuid使用三位。

## UUID版本

UUID的当前变体变体1由五个不同的版本组成。这些版本在构造方式上有所不同。uuid类型包括:

版本1 - 该版本根据指定的时间和节点生成。它是基于时间戳的唯一的终端标识符。

版本2 - 这个版本的生成类似于版本1，但是，较低的有效位会被替换。也就是说，8位的时钟序列被替换为本地域编号，32位的时间戳被替换为指定的本地域编号。这些是为DCE安全uuid保留的。

版本3 - 这个版本是通过哈希命名空间标识符和名称生成的。版本3和5的构造类似;然而，版本3使用消息摘要算法5 (MD5)作为哈希算法。

版本4 - 这个版本的UUID是随机生成的。尽管随机UUID使用随机字节，但使用4位表示版本4，而使用2到3位表示变体。这些可以使用随机或伪随机数生成器创建。在这个版本中使用更多的位，因此UUID组合更少。但是，仍然有足够的UUID组合来避免碰撞的可能性。

版本5 - 版本5的生成方式与版本3相同。但是，它是使用安全哈希算法1 (Secure Hash Algorithm 1，简称SHA-1)生成的，而版本3使用MD5进行哈希。版本3和5非常适合用作系统名称空间内信息和数据的唯一标识符。

## UUID碰撞

碰撞是指同一个UUID产生多次，并分配给不同的对象。即使这是可能的，128位的值也极不可能被任何其他UUID重复。从实际意义上讲，这种可能性几乎为零，可以忽略不计。即使在版本4 UUID中(UUID组合更少)，发生碰撞的几率也很低，可以忽略。

