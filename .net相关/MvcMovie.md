# 添加验证

DataAnnotations 命名空间提供一组内置验证特性，可通过声明方式应用于类或属性。

DataAnnotations 还包含 `DataType` 等格式特性，有助于格式设置但不提供任何验证。

| 数据注解          | 含义                                               |
| ----------------- | -------------------------------------------------- |
| Required          | 属性必须有值                                       |
| MinimumLength     | 最小长度                                           |
| RegularExpression | 正则表达式自定义规则                               |
| Range             | 将值限定在指定范围内                               |
| StringLength      | 你能够设置字符串属性的最大长度，以及可选的最小长度 |
|                   |                                                    |

从本质上来说，需要值类型（如 `decimal`、`int`、`float`、`DateTime`），但不需要 `[Required]` 特性。

## 使用DataType特性

​	`DataType` 属性仅提供相关提示来帮助视图引擎设置数据格式（并提供元素/属性，例如向 URL 提供 `<a>` 和向电子邮件提供 `<a href="mailto:EmailAddress.com">`） 可以使用 `RegularExpression` 特性验证数据的格式。

​	 `DataType` 属性用于指定比数据库内部类型更具体的数据类型，它们不是验证属性。 在此示例中，我们只想跟踪日期，而不是时间。 `DataType` 枚举提供了多种数据类型，例如日期、时间、电话号码、货币、电子邮件地址等。

